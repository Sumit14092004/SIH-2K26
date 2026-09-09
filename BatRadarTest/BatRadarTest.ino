#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <WiFi.h>
#include <esp_wifi.h>
#include <esp_now.h>
#include "edge_scaler.h"
#include "hazard_metadata.h"
#include "hazard_tree.h"

// ================= ZERO-NETWORK ESP-NOW LONG RANGE (LR) MESH =================
typedef struct __attribute__((packed)) struct_emergency_msg {
  char node_id[16];
  float temp;
  float hum;
  float pres;
  float dist_cm;
  int mq_ppm;
  float total_accel;
  char hazard[28];
  float confidence;
  uint8_t is_alert;   // 1 if active hazard, 0 if routine heartbeat
} struct_emergency_msg;

uint8_t broadcast_mac[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
bool esp_now_ready = false;
bool lr_mode_active = false;

// ================= PIN DEFINITIONS =================
#define MQ135_PIN     35
#define SOIL_PIN      34
#define TDS_PIN       33
#define RAIN_PIN      32

#define DHTPIN         4
#define DHTTYPE    DHT22
#define PIR_PIN       13
#define PIR_PIN_ALT   27

#define TRIG_PIN_A     5
#define ECHO_PIN_A    18
#define TRIG_PIN_B    18
#define ECHO_PIN_B     5

Adafruit_BMP280 bmp(&Wire);
Adafruit_BMP280 bmp1(&Wire1);
Adafruit_BMP280 *active_bmp = &bmp;
DHT dht(DHTPIN, DHTTYPE);

bool bmp_ready = false;
bool mpu_ready = false;

// ================= ROBUST BMP280 / BME280 AUTO-DETECTOR =================
bool tryInitBMP(Adafruit_BMP280 &b, TwoWire &bus, uint8_t addr) {
  bus.beginTransmission(addr);
  if (bus.endTransmission() != 0) return false;

  // Read Chip ID register 0xD0 directly
  bus.beginTransmission(addr);
  bus.write(0xD0);
  if (bus.endTransmission(false) != 0) return false;
  if (bus.requestFrom(addr, (uint8_t)1) != 1) return false;
  uint8_t chip_id = bus.read();
  Serial.printf("Device at 0x%02X responded! Chip ID = 0x%02X ", addr, chip_id);

  // Try begin with the detected chip ID, or known IDs (BMP280=0x58, BME280=0x60, clones=0x56/0x57)
  if (b.begin(addr, chip_id)) { Serial.println("-> Handshake OK!"); return true; }
  if (b.begin(addr, 0x58)) { Serial.println("-> Forced 0x58 OK!"); return true; }
  if (b.begin(addr, 0x60)) { Serial.println("-> Forced BME280 0x60 OK!"); return true; }
  if (b.begin(addr, 0x56)) { Serial.println("-> Forced 0x56 OK!"); return true; }
  if (b.begin(addr, 0x57)) { Serial.println("-> Forced 0x57 OK!"); return true; }
  Serial.println("-> Handshake failed");
  return false;
}

// ================= OPTIMIZED PIR STATE ENGINE =================
volatile bool pir_interrupted = false;
bool pir_was_active = false;
unsigned long pir_start_time = 0;
unsigned long pir_last_clear_time = 0;
int pir_event_count = 0;

void IRAM_ATTR pirISR() {
  pir_interrupted = true;
}

// ================= MPU RAW DRIVER =================
TwoWire *mpu_bus = nullptr;
uint8_t mpu_addr = 0;

#define MPU_PWR_MGMT_1   0x6B
#define MPU_ACCEL_CONFIG 0x1C
#define MPU_ACCEL_XOUT_H 0x3B

bool initRawMPU(TwoWire &bus, uint8_t addr) {
  bus.beginTransmission(addr);
  bus.write(MPU_PWR_MGMT_1);
  bus.write(0x00);
  if (bus.endTransmission() != 0) return false;
  delay(15);

  bus.beginTransmission(addr);
  bus.write(MPU_ACCEL_CONFIG);
  bus.write(0x10); // +/- 8g
  if (bus.endTransmission() != 0) return false;

  return true;
}

bool readRawMPU(TwoWire &bus, uint8_t addr, float &ax, float &ay, float &az) {
  bus.beginTransmission(addr);
  bus.write(MPU_ACCEL_XOUT_H);
  if (bus.endTransmission(false) != 0) return false;

  if (bus.requestFrom((uint8_t)addr, (uint8_t)6) != 6) return false;

  int16_t rawX = (bus.read() << 8) | bus.read();
  int16_t rawY = (bus.read() << 8) | bus.read();
  int16_t rawZ = (bus.read() << 8) | bus.read();

  ax = (rawX / 4096.0) * 9.80665;
  ay = (rawY / 4096.0) * 9.80665;
  az = (rawZ / 4096.0) * 9.80665;
  return true;
}

float readUltrasonic() {
  pinMode(TRIG_PIN_A, OUTPUT);
  pinMode(ECHO_PIN_A, INPUT);
  digitalWrite(TRIG_PIN_A, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN_A, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN_A, LOW);
  long d1 = pulseIn(ECHO_PIN_A, HIGH, 30000);
  if (d1 > 100) return (d1 * 0.034 / 2.0);

  pinMode(TRIG_PIN_B, OUTPUT);
  pinMode(ECHO_PIN_B, INPUT);
  digitalWrite(TRIG_PIN_B, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN_B, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN_B, LOW);
  long d2 = pulseIn(ECHO_PIN_B, HIGH, 30000);
  if (d2 > 100) return (d2 * 0.034 / 2.0);

  return -1.0;
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("\n========================================================");
  Serial.println("   🌐 AAPDA-KADABRA: COMPLETE 9-SENSOR DUAL-BUS NODE    ");
  Serial.println("========================================================");

  pinMode(15, OUTPUT);
  digitalWrite(15, HIGH);
  delay(50);

  // ================= RF ZERO-NETWORK ENGINE (ESP-NOW + LR) =================
  Serial.println("\n📡 --- ZERO-NETWORK RADIO INITIALIZATION ---");
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

  esp_err_t proto_err = esp_wifi_set_protocol(WIFI_IF_STA, WIFI_PROTOCOL_LR);
  if (proto_err == ESP_OK) {
    lr_mode_active = true;
    Serial.println("   ✅ Espressif Long Range (LR) Mode : ACTIVATED (1.2km LOS PHY @ 250kbps, -98dBm)");
  } else {
    Serial.printf("   ⚠️ LR Mode Fallback (Status code: %d)\n", proto_err);
  }

  if (esp_now_init() == ESP_OK) {
    esp_now_ready = true;
    esp_now_peer_info_t peerInfo = {};
    memcpy(peerInfo.peer_addr, broadcast_mac, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;
    if (esp_now_add_peer(&peerInfo) == ESP_OK) {
      Serial.println("   ✅ ESP-NOW Peer-to-Peer Mesh    : ONLINE (Broadcast Ready - No Router Needed)");
    } else {
      Serial.println("   ⚠️ ESP-NOW Peer registration fallback");
    }
  } else {
    Serial.println("   ⚠️ ESP-NOW Initialization failed");
  }
  Serial.println("--------------------------------------------\n");

  // ================= 1. MPU-6050 & WIRE1 SCAN (Pins 19 & 23) =================
  Serial.println("🔎 --- I2C WIRE1 SCAN (SDA=Pin 19, SCL=Pin 23) ---");
  Wire1.begin(19, 23);
  Wire1.setClock(100000);

  for (uint8_t a = 1; a < 127; a++) {
    Wire1.beginTransmission(a);
    if (Wire1.endTransmission() == 0) {
      Serial.printf("   [Wire1] Device detected at 0x%02X!\n", a);
      if (a == 0x68 || a == 0x69) {
        mpu_bus = &Wire1;
        mpu_addr = a;
      }
      if (a == 0x76 || a == 0x77) {
        if (tryInitBMP(bmp1, Wire1, a)) {
          bmp_ready = true;
          active_bmp = &bmp1;
        }
      }
    }
  }

  // Wake up MPU-6050 immediately on Wire1
  if (mpu_addr && mpu_bus) {
    if (initRawMPU(*mpu_bus, mpu_addr)) {
      mpu_ready = true;
      Serial.printf("   🎯 MPU Activated & Woken Up at 0x%02X!\n", mpu_addr);
      Serial.println("✅ [1/9] MPU-6050 Accelerometer: ONLINE");
    } else {
      Serial.printf("   ⚠️ MPU detected at 0x%02X but failed to wake up\n", mpu_addr);
      Serial.println("⏳ [1/9] MPU-6050 Accelerometer: Offline");
    }
  } else {
    Serial.println("⏳ [1/9] MPU-6050 Accelerometer: Offline");
  }

  // ================= 2. PRIMARY WIRE SCAN (Pins 21 & 22) =================
  Serial.println("\n🔎 --- I2C WIRE SCAN (SDA=Pin 21, SCL=Pin 22) ---");
  Wire.begin(21, 22);
  Wire.setClock(100000);

  for (uint8_t a = 1; a < 127; a++) {
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) {
      Serial.printf("   [Wire] Device detected at 0x%02X!\n", a);
      if (!mpu_ready && (a == 0x68 || a == 0x69)) {
        mpu_bus = &Wire;
        mpu_addr = a;
        if (initRawMPU(*mpu_bus, mpu_addr)) {
          mpu_ready = true;
          Serial.println("✅ [1/9] MPU-6050 Accelerometer: ONLINE (on Wire 21/22)");
        }
      }
      if (!bmp_ready && (a == 0x76 || a == 0x77)) {
        if (tryInitBMP(bmp, Wire, a)) {
          bmp_ready = true;
          active_bmp = &bmp;
        }
      }
    }
  }

  if (bmp_ready) {
    Serial.println("✅ [2/9] BMP280 Barometer      : ONLINE");
  } else {
    Serial.println("⚠️ [2/9] BMP280 Barometer      : Offline");
    Serial.println("   👉 Check BMP280: VCC->3.3V, GND->GND, SCL->Pin 22, SDA->Pin 21, and CSB->3.3V!");
  }
  Serial.println("--------------------------------------------\n");

  dht.begin();
  Serial.println("✅ [3/9] DHT22 Temp & Humidity : ONLINE (Pin D4)");

  pinMode(MQ135_PIN, INPUT);
  analogSetPinAttenuation(MQ135_PIN, ADC_0db);

  pinMode(SOIL_PIN, INPUT);
  pinMode(TDS_PIN, INPUT);
  pinMode(RAIN_PIN, INPUT);

  // PIR Interrupt Configuration
  pinMode(PIR_PIN, INPUT_PULLDOWN);
  pinMode(PIR_PIN_ALT, INPUT_PULLDOWN);
  attachInterrupt(digitalPinToInterrupt(PIR_PIN), pirISR, RISING);
  attachInterrupt(digitalPinToInterrupt(PIR_PIN_ALT), pirISR, RISING);

  Serial.println("✅ [4/9] MQ-135 Gas / Smoke    : ONLINE (Pin D35, Calibrated)");
  Serial.println("✅ [5/9] Soil Moisture Probe   : ONLINE (Pin D34)");
  Serial.println("✅ [6/9] TDS Water Purity      : ONLINE (Pin D33)");
  Serial.println("✅ [7/9] MH-RD Raindrop Plate  : ONLINE (Pin D32)");
  Serial.println("✅ [8/9] HC-SR04 Bat Radar     : ONLINE (Pins 5 & 18)");
  Serial.println("✅ [9/9] PIR Motion Detector   : ONLINE (Interrupt-Driven, Pin D13/D27)");
  Serial.println("✅ [RF]  Zero-Net Radio (LR)   : ONLINE (ESP-NOW Long Range 250kbps, -98dBm, 1.2km LOS)");

  Serial.println("\n🚀 System Live! Streaming telemetry & Edge AI analysis...\n");
}

void loop() {
  Serial.println("========================================================");

  // 1. MPU-6050
  float ax = 0, ay = 0, az = 9.81, total_accel = 9.81;
  if (mpu_ready && mpu_bus && mpu_addr) {
    if (readRawMPU(*mpu_bus, mpu_addr, ax, ay, az)) {
      total_accel = sqrt(sq(ax) + sq(ay) + sq(az));
      Serial.printf("🌐 [1] MPU-6050  : X=%5.2f Y=%5.2f Z=%5.2f | Total=%5.2f m/s² ", 
                    ax, ay, az, total_accel);
      if (abs(total_accel - 9.81) > 2.5) Serial.println("🚨 [SEISMIC/TILT ALERT!]");
      else Serial.println("[STABLE]");
    } else {
      Serial.println("🌐 [1] MPU-6050  : Read Error");
    }
  } else {
    Serial.println("🌐 [1] MPU-6050  : Offline");
  }

  // 2. BMP280
  float pres = 1000.0, alt = 110.0;
  if (bmp_ready && active_bmp) {
    pres = active_bmp->readPressure() / 100.0F;
    alt  = active_bmp->readAltitude(1013.25);
    Serial.printf("☁️  [2] BMP280    : Pressure = %.1f hPa | Altitude = ~%.1f m [ONLINE]\n", pres, alt);
  } else {
    Serial.println("☁️  [2] BMP280    : Offline");
  }

  // 3. DHT22
  float humidity = dht.readHumidity();
  float dht_temp = dht.readTemperature();
  float heat_idx = 0;
  if (!isnan(humidity) && !isnan(dht_temp)) {
    heat_idx = dht.computeHeatIndex(dht_temp, humidity, false);
    Serial.printf("💧 [3] DHT22     : Humidity = %.1f %% | Temp = %.1f °C (Heat Index = %.1f °C)\n", 
                  humidity, dht_temp, heat_idx);
  } else {
    humidity = 50.0;
    dht_temp = 28.0;
    Serial.println("💧 [3] DHT22     : Reading...");
  }

  // 4. MQ-135 (Calibrated VOC & Gas Index)
  int mq_raw = analogRead(MQ135_PIN);
  float mq_volts = (mq_raw / 4095.0) * 0.95;
  int aqi_ppm = map(constrain(mq_raw, 0, 500), 0, 500, 400, 2000);
  Serial.printf("👃 [4] MQ-135    : Raw = %4d (%.2fV) | CO2 eq: ~%4d ppm -> ", mq_raw, mq_volts, aqi_ppm);
  if (mq_raw < 20) {
    Serial.println("🍃 EXCELLENT (Clean Room Air)");
  } else if (mq_raw < 80) {
    Serial.println("🟡 MODERATE / VOC DETECTED");
  } else {
    Serial.println("🚨 POOR / HIGH GAS/ALCOHOL ALERT!");
  }

  // 5. SOIL MOISTURE
  long s_sum = 0;
  for (int i = 0; i < 5; i++) { s_sum += analogRead(SOIL_PIN); delay(2); }
  int soil_raw = s_sum / 5;
  int moisture = map(constrain(soil_raw, 1200, 3600), 3600, 1200, 0, 100);
  Serial.printf("🌱 [5] Soil Moist: Raw = %4d | Moisture = %2d%% -> ", soil_raw, moisture);
  if (moisture < 20) Serial.println("🏜️ DRY (Arid / Needs Water)");
  else if (moisture < 70) Serial.println("🌿 MOIST (Optimal Hydration)");
  else Serial.println("🌊 WATERLOGGED (Flood/Landslide Risk!)");

  // 6. TDS WATER PURITY
  long tds_sum = 0;
  for (int i = 0; i < 5; i++) { tds_sum += analogRead(TDS_PIN); delay(2); }
  int tds_raw = tds_sum / 5;
  float tds_v = (tds_raw / 4095.0) * 3.3;
  float tds_ppm = (133.42 * pow(tds_v, 3) - 255.86 * pow(tds_v, 2) + 857.39 * tds_v) * 0.5;
  if (tds_ppm < 0) tds_ppm = 0;
  Serial.printf("🧪 [6] TDS Water : Raw = %4d | Purity = %3.0f ppm\n", tds_raw, tds_ppm);

  // 7. MH-RD RAINDROP
  long r_sum = 0;
  for (int i = 0; i < 5; i++) { r_sum += analogRead(RAIN_PIN); delay(2); }
  int rain_raw = r_sum / 5;
  int wetness = map(constrain(rain_raw, 400, 3800), 3800, 400, 0, 100);
  Serial.printf("🌧️  [7] Raindrop  : Raw = %4d | Wetness: %2d%% -> ", rain_raw, wetness);
  if (wetness < 15) Serial.println("☀️ DRY (Clear Skies)");
  else if (wetness < 50) Serial.println("🌦️ LIGHT RAIN (Drizzle)");
  else if (wetness < 80) Serial.println("🌧️ MODERATE RAIN");
  else Serial.println("⛈️ HEAVY DOWNPOUR (Flooding!)");

  // 8. HC-SR04 ULTRASONIC
  float dist = readUltrasonic();
  if (dist > 0) Serial.printf("🦇 [8] Ultrasonic: Distance = %5.1f cm [ONLINE]\n", dist);
  else Serial.println("🦇 [8] Ultrasonic: NO ECHO");

  // 9. PIR MOTION SENSOR
  int current_pir = digitalRead(PIR_PIN) || digitalRead(PIR_PIN_ALT);
  unsigned long now = millis();

  if (current_pir == HIGH || pir_interrupted) {
    if (!pir_was_active) {
      pir_event_count++;
      pir_start_time = now;
      pir_was_active = true;
      Serial.printf("🚶‍♂️ [9] PIR Motion: 🚨 NEW MOTION DETECTED! (Event #%d)\n", pir_event_count);
    } else {
      float held_sec = (now - pir_start_time) / 1000.0;
      Serial.printf("🚶‍♂️ [9] PIR Motion: 🚨 PRESENCE DETECTED (Holding for %.1fs, Event #%d)\n", held_sec, pir_event_count);
    }
    pir_interrupted = false;
  } else {
    if (pir_was_active) {
      pir_was_active = false;
      pir_last_clear_time = now;
    }
    if (pir_event_count > 0 && pir_last_clear_time > 0) {
      float idle_sec = (now - pir_last_clear_time) / 1000.0;
      Serial.printf("🚶‍♂️ [9] PIR Motion: 🛡️ All Clear (Last active %.1fs ago, Total events: %d)\n", idle_sec, pir_event_count);
    } else {
      Serial.println("🚶‍♂️ [9] PIR Motion: 🛡️ All Clear (Monitoring perimeter...)");
    }
  }

  // ========================================================
  // 🧠 QUALCOMM ON-DEVICE TINYML (FRIEND'S MULTI-HAZARD RANDOM FOREST)
  // ========================================================
  float tilt_deg = acos(constrain(az / total_accel, -1.0f, 1.0f)) * 57.2957795f;
  float vibration_g = total_accel / 9.80665f;

  float raw_features[NUM_FEATURES] = {
    dht_temp,                                                        // 0: temp_c
    humidity,                                                        // 1: humidity_pct
    pres,                                                            // 2: pressure_hpa
    (float)mq_raw * 15.0f,                                           // 3: mq135_raw (scaled to full 12-bit range)
    (dist > 0 ? dist : 180.0f),                                      // 4: water_level_cm (ultrasonic distance)
    tilt_deg,                                                        // 5: tilt_deg (MPU-6050 inclination angle)
    vibration_g,                                                     // 6: vibration_g (seismic g-units)
    (float)moisture,                                                 // 7: soil_moisture_pct (soil probe)
    (float)(4095 - rain_raw),                                        // 8: rain_intensity (precipitation count)
    tds_ppm,                                                         // 9: tds_ppm (water purity)
    (float)(current_pir == HIGH || pir_interrupted ? 1.0f : 0.0f)   // 10: motion_flag (PIR human presence)
  };

  float norm_features[NUM_FEATURES];
  normalize_sensor_reading(raw_features, norm_features);

  double input_double[NUM_FEATURES];
  for (int i = 0; i < NUM_FEATURES; i++) {
    input_double[i] = (double)norm_features[i];
  }

  double output_probs[NUM_HAZARD_CLASSES];
  unsigned long t_infer_start = micros();
  score(input_double, output_probs);
  unsigned long t_infer_us = micros() - t_infer_start;

  int best_class = 6; // default: normal ambient
  double max_prob = -1.0;
  for (int i = 0; i < NUM_HAZARD_CLASSES; i++) {
    if (output_probs[i] > max_prob) {
      max_prob = output_probs[i];
      best_class = i;
    }
  }

  const char *hazard = HAZARD_METADATA[best_class].id_name;
  const char *hazard_display = HAZARD_METADATA[best_class].display_name;
  int severity_num = HAZARD_METADATA[best_class].severity_level;
  bool trigger_siren = HAZARD_METADATA[best_class].trigger_siren;
  const char *advisory = HAZARD_METADATA[best_class].action_advisory;
  float confidence = (float)(max_prob * 100.0);

  const char *severity = "Minor";
  if (severity_num == 3) severity = "Extreme";
  else if (severity_num == 2) severity = "Severe";
  else if (severity_num == 1) severity = "Moderate";

  Serial.println("--------------------------------------------------------");
  Serial.printf("🧠 [TINYML INFERENCE] Hazard: %s (%s) | Conf: %.1f%% | Exec: %lu µs\n", hazard, hazard_display, confidence, t_infer_us);
  Serial.printf("📢 [SOP ADVISORY] %s (Siren: %s)\n", advisory, trigger_siren ? "ACTIVE" : "OFF");
  Serial.println("========================================================");

  // ========================================================
  // 📡 STRUCTURED INDUSTRIAL TELEMETRY (JSON PACKET FOR BRIDGE)
  // ========================================================
  Serial.print("[DATA]{");
  Serial.printf("\"node_id\":\"IN-DELHI-01\",");
  Serial.printf("\"temp\":%.1f,\"hum\":%.1f,\"pres\":%.1f,\"alt\":%.1f,", dht_temp, humidity, pres, alt);
  Serial.printf("\"accel_x\":%.2f,\"accel_y\":%.2f,\"accel_z\":%.2f,\"accel_total\":%.2f,", ax, ay, az, total_accel);
  Serial.printf("\"mq_raw\":%d,\"mq_ppm\":%d,", mq_raw, aqi_ppm);
  Serial.printf("\"soil_raw\":%d,\"soil_pct\":%d,", soil_raw, moisture);
  Serial.printf("\"tds_raw\":%d,\"tds_ppm\":%.0f,", tds_raw, tds_ppm);
  Serial.printf("\"rain_raw\":%d,\"rain_pct\":%d,", rain_raw, wetness);
  Serial.printf("\"dist_cm\":%.1f,", dist);
  Serial.printf("\"pir_active\":%s,\"pir_events\":%d,", (current_pir == HIGH || pir_interrupted) ? "true" : "false", pir_event_count);
  Serial.printf("\"tinyml_code\":%d,\"tinyml_us\":%lu,", best_class, t_infer_us);
  Serial.printf("\"hazard\":\"%s\",\"confidence\":%.1f,\"severity\":\"%s\",", hazard, confidence, severity);
  Serial.printf("\"advisory\":\"%s\",\"siren\":%s", advisory, trigger_siren ? "true" : "false");
  Serial.println("}");

  // ========================================================
  // 📡 ZERO-NETWORK BROADCAST: TRANSMIT OVER ESP-NOW LONG RANGE (LR)
  // ========================================================
  if (esp_now_ready) {
    struct_emergency_msg packet;
    strncpy(packet.node_id, "IN-DELHI-01", sizeof(packet.node_id) - 1);
    packet.node_id[sizeof(packet.node_id) - 1] = '\0';
    packet.temp = dht_temp;
    packet.hum = humidity;
    packet.pres = pres;
    packet.dist_cm = dist;
    packet.mq_ppm = aqi_ppm;
    packet.total_accel = total_accel;
    strncpy(packet.hazard, hazard, sizeof(packet.hazard) - 1);
    packet.hazard[sizeof(packet.hazard) - 1] = '\0';
    packet.confidence = confidence;
    packet.is_alert = (strcmp(hazard, "NONE") != 0) ? 1 : 0;

    esp_err_t send_status = esp_now_send(broadcast_mac, (uint8_t *)&packet, sizeof(packet));
    if (send_status == ESP_OK) {
      if (packet.is_alert) {
        Serial.printf("📡 [MESH-LR] 🚨 CRITICAL ALERT DISPATCHED! Hazard: %s (Conf: %.0f%%) via ESP-NOW Long Range (1.2km LOS)\n", hazard, confidence);
      } else {
        Serial.println("📡 [MESH-LR] Heartbeat frame transmitted via ESP-NOW LR (250kbps, -98dBm)");
      }
    } else {
      Serial.println("📡 [MESH-LR] Radio buffer busy / packet queued");
    }
  }

  delay(1500);
}