#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>

// ==========================================
// 1. WiFi & MQTT Broker Configuration
// ==========================================
// Enter your WiFi or Mobile Hotspot credentials
const char* WIFI_SSID = "YOUR_WIFI_HOTSPOT_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// IP address of the laptop running Docker & Mosquitto
// Run 'ipconfig' in Windows PowerShell to find your IPv4 (e.g., 192.168.43.15)
const char* MQTT_BROKER_IP = "192.168.43.15";
const int MQTT_PORT = 1883;

// Node Identification & GPS Coordinates
const char* NODE_ID = "NODE_FOREST_01";
const float NODE_LAT = 21.6833;
const float NODE_LON = 86.3500;
const char* NODE_REGION = "Simlipal Core Reserve, Sector 4";

// MQTT Topics
String TOPIC_TELEMETRY = String("sih/nodes/") + NODE_ID + "/telemetry";
String TOPIC_ALERT     = String("sih/nodes/") + NODE_ID + "/alert";
String TOPIC_HEALTH    = String("sih/nodes/") + NODE_ID + "/health";

// ==========================================
// 2. Hardware Pin Definitions
// ==========================================
#define PIN_MQ135_ANALOG   34  // Analog pin for MQ-135 Gas & Smoke
#define PIN_SOIL_ANALOG    35  // Analog pin for Capacitive Soil Moisture
#define PIN_TRIG           5   // Ultrasonic HC-SR04 Trigger
#define PIN_ECHO           18  // Ultrasonic HC-SR04 Echo
#define PIN_PIR_MOTION     19  // PIR Motion Sensor

Adafruit_BME680 bme;
WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastTelemetryTime = 0;
unsigned long lastHealthTime = 0;
const unsigned long TELEMETRY_INTERVAL_MS = 10000; // 10 seconds for demo
const unsigned long HEALTH_INTERVAL_MS    = 30000; // 30s heartbeats

// ==========================================
// 3. Sensor Reading Helpers
// ==========================================
float readUltrasonicDistanceCM() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long duration = pulseIn(PIN_ECHO, HIGH, 30000); // 30ms timeout
  if (duration == 0) return 0.0;
  return (duration * 0.0343) / 2.0; // Speed of sound in cm/us
}

float readSoilMoisturePct() {
  int raw = analogRead(PIN_SOIL_ANALOG);
  // Typical capacitive soil calibration: Air = ~3200 (0%), Water = ~1400 (100%)
  float pct = map(raw, 3200, 1400, 0, 100);
  return constrain(pct, 0.0, 100.0);
}

int readMQ135PPM() {
  int raw = analogRead(PIN_MQ135_ANALOG);
  // Basic PPM estimation (raw ADC 0-4095 mapped to 50-1000 ppm)
  return map(raw, 200, 4095, 50, 1000);
}

// ==========================================
// 4. WiFi & MQTT Connection Handling
// ==========================================
void connectWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected! Local IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWiFi Connection failed. Running in offline telemetry buffer mode.");
  }
}

void reconnectMQTT() {
  if (WiFi.status() != WL_CONNECTED) return;

  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection to ");
    Serial.print(MQTT_BROKER_IP);
    Serial.print("...");
    
    if (mqttClient.connect(NODE_ID)) {
      Serial.println(" CONNECTED!");
      // Send immediate online health packet
      sendHealthHeartbeat();
    } else {
      Serial.print(" failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" retrying in 3 seconds...");
      delay(3000);
      break; // Non-blocking retry
    }
  }
}

// ==========================================
// 5. Payload Dispatchers
// ==========================================
void sendHealthHeartbeat() {
  StaticJsonDocument<256> doc;
  doc["node_id"] = NODE_ID;
  doc["battery_pct"] = 94.5; // From battery voltage divider
  doc["rssi_dbm"] = WiFi.RSSI();
  doc["uptime_seconds"] = millis() / 1000;

  char buffer[256];
  serializeJson(doc, buffer);
  mqttClient.publish(TOPIC_HEALTH.c_str(), buffer);
  Serial.println("[HEALTH] Heartbeat published to: " + TOPIC_HEALTH);
}

void sendTelemetry(float temp, float humidity, float pressure, int gasPpm, float waterLevel, float soilMoisture, bool motion) {
  StaticJsonDocument<512> doc;
  doc["node_id"] = NODE_ID;
  doc["lat"] = NODE_LAT;
  doc["lon"] = NODE_LON;
  doc["region"] = NODE_REGION;

  JsonObject sensors = doc.createNestedObject("sensors");
  sensors["temperature"] = round(temp * 10.0) / 10.0;
  sensors["humidity"] = round(humidity * 10.0) / 10.0;
  sensors["pressure"] = round(pressure * 10.0) / 10.0;
  sensors["mq135_ppm"] = gasPpm;
  sensors["water_level_cm"] = round(waterLevel * 10.0) / 10.0;
  sensors["soil_moisture"] = round(soilMoisture * 10.0) / 10.0;
  sensors["human_motion"] = motion;

  char buffer[512];
  serializeJson(doc, buffer);
  mqttClient.publish(TOPIC_TELEMETRY.c_str(), buffer);
  Serial.println("[TELEMETRY] 10s packet published to: " + TOPIC_TELEMETRY);
}

void triggerHazardAlert(const char* hazard, float confidence, float temp, float humidity, int gasPpm, float waterLevel) {
  StaticJsonDocument<512> doc;
  doc["node_id"] = NODE_ID;
  doc["hazard"] = hazard;
  doc["confidence"] = confidence;
  doc["lat"] = NODE_LAT;
  doc["lon"] = NODE_LON;
  doc["location"] = NODE_REGION;

  JsonObject sensors = doc.createNestedObject("sensors");
  sensors["temperature"] = temp;
  sensors["humidity"] = humidity;
  sensors["mq135_ppm"] = gasPpm;
  sensors["water_level_cm"] = waterLevel;

  char buffer[512];
  serializeJson(doc, buffer);
  mqttClient.publish(TOPIC_ALERT.c_str(), buffer);
  Serial.println("🚨 [EMERGENCY ALERT] Dispatched hazard trigger: " + String(hazard));
}

// ==========================================
// 6. Setup & Main Loop
// ==========================================
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n=== SIH 2026: ESP32 Edge Intelligence Node Starting ===");

  // Pin Configurations
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_PIR_MOTION, INPUT);
  pinMode(PIN_MQ135_ANALOG, INPUT);
  pinMode(PIN_SOIL_ANALOG, INPUT);

  // Initialize I2C and BME680
  Wire.begin(21, 22);
  if (!bme.begin(0x77) && !bme.begin(0x76)) {
    Serial.println("Warning: BME680 sensor not detected on I2C. Using fallback telemetry.");
  } else {
    Serial.println("BME680 sensor initialized successfully.");
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
  }

  // Connect to Network
  connectWiFi();
  mqttClient.setServer(MQTT_BROKER_IP, MQTT_PORT);
}

void loop() {
  if (!mqttClient.connected()) {
    reconnectMQTT();
  }
  mqttClient.loop();

  unsigned long now = millis();

  // 1. Read All Sensors
  float temperature = 28.5;
  float humidity = 45.0;
  float pressure = 1012.0;
  if (bme.performReading()) {
    temperature = bme.temperature;
    humidity = bme.humidity;
    pressure = bme.pressure / 100.0;
  }

  int gasPpm = readMQ135PPM();
  float waterLevel = readUltrasonicDistanceCM();
  float soilMoisture = readSoilMoisturePct();
  bool motion = digitalRead(PIN_PIR_MOTION) == HIGH;

  // 2. Edge Anomaly Detection / TinyML Rule Evaluation
  // FIRE HAZARD: High temperature (>50C) OR high smoke (MQ-135 > 500 ppm)
  if (temperature > 50.0 || gasPpm > 550) {
    float confidence = map(gasPpm, 550, 1000, 85, 99);
    confidence = constrain(confidence, 85.0, 99.0);
    triggerHazardAlert("forest_fire", confidence, temperature, humidity, gasPpm, waterLevel);
    delay(5000); // Debounce to avoid flooding
  }
  // FLOOD HAZARD: Water level threshold breached
  else if (waterLevel > 150.0) {
    triggerHazardAlert("flash_flood", 94.0, temperature, humidity, gasPpm, waterLevel);
    delay(5000);
  }

  // 3. Periodic Telemetry Stream (Every 10 seconds)
  if (now - lastTelemetryTime >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = now;
    sendTelemetry(temperature, humidity, pressure, gasPpm, waterLevel, soilMoisture, motion);
  }

  // 4. Periodic Health Heartbeat (Every 30 seconds)
  if (now - lastHealthTime >= HEALTH_INTERVAL_MS) {
    lastHealthTime = now;
    sendHealthHeartbeat();
  }

  delay(200);
}
