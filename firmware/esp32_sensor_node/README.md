# 📟 ESP32 Physical Sensor Node Setup & Flashing Guide

This directory contains the production-ready firmware to connect real physical ESP32 boards (Flood, AQI, Landslide, Cyclone, Fire) to the **SIH 2026 NDMA Environmental Intelligence Tactical Dashboard**.

---

## 📋 Pre-Flashing Checklist

### 1. Required Hardware
- **ESP32 Board**: ESP32-WROOM-32, ESP32-S3, or ESP32-C3
- **Micro-USB / Type-C Data Cable** (ensure cable has data lines, not charging-only)
- **Sensor Hardware** (plugged into designated GPIO pins):
  - **Flood Node**: HC-SR04 or JSN-SR04T waterproof ultrasonic sensor
  - **AQI Node**: MQ-135 or PMS5003 laser particulate sensor
  - **Landslide Node**: MPU-6050 accelerometer/gyroscope or analog piezometer
  - **Cyclone Node**: Anemometer / BMP280 barometric sensor
  - **Fire Node**: MLX90614 infrared pyrometer / MQ-2 / IR flame detector

---

## 🛠️ Step 1: Install Required Libraries

### Using Arduino IDE
Open Arduino IDE -> **Tools** -> **Manage Libraries...** (`Ctrl + Shift + I`) and install:
1. **`PubSubClient`** by *Nick O'Leary* (v2.8.0 or higher)
2. **`ArduinoJson`** by *Benoit Blanchon* (v6.21.0 or higher)

### Using PlatformIO (`platformio.ini`)
```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
lib_deps =
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^6.21.0
```

---

## ⚙️ Step 2: Configure Device Settings

Open `esp32_sensor_node.ino` and configure the constants at the top:

```cpp
// 1. Station ID (Matches our dashboard canonical fleet):
// "IN-ASM-042" (Flood) | "IN-DL-004" (AQI) | "KL-871" (Landslide) | "OD-855" (Cyclone) | "UT-012" (Fire)
#define NODE_ID "IN-ASM-042"

// 2. Hazard Vector: "flood" | "aqi" | "landslide" | "cyclone" | "fire"
#define HAZARD_TYPE "flood"

// 3. Your Wi-Fi Credentials
const char* WIFI_SSID     = "YOUR_WIFI_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// 4. Ingestion Broker IP (Your laptop's Wi-Fi IP on the same network)
const char* MQTT_BROKER   = "12.10.11.54"; 
const int   MQTT_PORT     = 1883;
```

---

## 🔐 Step 3: Security & Identity Setup

1. **Unique Client ID**:
   - The firmware automatically hashes your ESP32's unique factory MAC address:
     `ESP32_<NODE_ID>_<MAC_HEX>`
   - This ensures multiple nodes on the same network never clash or overwrite each other's session.
2. **Broker Authentication**:
   - If your broker requires authentication, fill in `MQTT_USER` and `MQTT_PASSWORD`.
3. **Last Will & Testament (LWT) Security**:
   - The firmware registers an automatic LWT with the Mosquitto broker:
     `Topic: sih/nodes/<NODE_ID>/health`
     `Payload: {"status":"offline","reason":"lwt_disconnect"}`
   - If an ESP32 is unplugged, loses power, or drops signal, the broker instantly marks it `OFFLINE` on the dashboard.
4. **TLS / MQTTS (Optional for public broker)**:
   - To enable TLS on port 8883, replace `WiFiClient` with `WiFiClientSecure` and attach your broker's root CA certificate using `espClient.setCACert(root_ca);`.

---

## 🔌 Step 4: Default Pin Connections

| Function | Default ESP32 Pin | Sensor / Module Connection |
| :--- | :--- | :--- |
| **Status Indicator** | GPIO 2 | Onboard Blue LED |
| **Battery Voltage** | GPIO 34 (ADC1_CH6) | Voltage divider midpoint (100k/100k) |
| **Ultrasonic Trigger (Flood)** | GPIO 18 | `TRIG` pin on HC-SR04 |
| **Ultrasonic Echo (Flood)** | GPIO 19 | `ECHO` pin on HC-SR04 (via 1k resistor) |
| **Gas / VOC Analog (AQI/Fire)** | GPIO 35 (ADC1_CH7) | `A0` pin on MQ-135 / MQ-2 |
| **Flame Digital Out (Fire)** | GPIO 15 | `D0` pin on Flame Sensor |

---

## 🚀 Step 5: Flash & Verify

1. Connect your ESP32 via USB.
2. In Arduino IDE:
   - Board: **ESP32 Dev Module**
   - Port: Select your COM port (e.g. `COM3` / `COM4`)
   - Speed: **115200 baud**
3. Click **Upload** (`Ctrl + U`).
4. Open the Serial Monitor (`Ctrl + Shift + M`) at **115200 baud**.
5. You should see:
   ```text
   [WIFI] Connecting to SSID: ...
   [WIFI SUCCESS] Connected! Node IP: 12.10.11.x
   [MQTT] Attempting connection to broker 12.10.11.54...
   [MQTT SUCCESS] Connected to SIH Ingestion Broker!
   📡 [TELEMETRY PUBLISHED] Topic: sih/nodes/IN-ASM-042/telemetry
   ```
6. Open your Tactical Dashboard at **`http://12.10.11.54:5173`**.
   - The node will update in real time with the actual hardware readings.
