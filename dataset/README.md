# SIH 2026: Aapda-Kadabra Multi-Hazard Environmental Dataset

## 1. Overview
This dataset contains **5,000 realistic, time-series calibrated environmental observations** generated from the physical sensor array and calibration curves of the **ESP32 Edge Node** for SIH 2026.

- **File Name:** `environmental_multihazard_dataset.csv`
- **Total Samples:** 5,000 rows
- **Time Step:** 5.0 seconds interval
- **Node ID:** `IN-DELHI-01` (Primary Physical Station)

---

## 2. Feature Data Dictionary (28 Columns)

| Column | Unit / Range | Hardware Source | Description |
| :--- | :--- | :--- | :--- |
| `timestamp` | `YYYY-MM-DD HH:MM:SS` | RTC / Chrono | Synchronized epoch timestamp |
| `node_id` | String | Station ID | Station identifier (`IN-DELHI-01`) |
| `temperature_c` | °C (15.0 – 50.0) | DHT22 (Pin D4) | Ambient air temperature |
| `humidity_pct` | % RH (10.0 – 100.0) | DHT22 (Pin D4) | Relative humidity |
| `heat_index_c` | °C (15.0 – 55.0) | Derived DHT22 | Steadman perceived heat index |
| `pressure_hpa` | hPa (980.0 – 1015.0) | BMP280 (I2C) | Barometric surface atmospheric pressure |
| `altitude_m` | Meters (90 – 320) | BMP280 (I2C) | Calculated barometric altitude ASL |
| `accel_x` | m/s² (-8.0 to +8.0) | MPU-6050 (I2C) | Lateral seismic acceleration |
| `accel_y` | m/s² (-8.0 to +8.0) | MPU-6050 (I2C) | Transverse seismic acceleration |
| `accel_z` | m/s² (8.0 to 14.0) | MPU-6050 (I2C) | Vertical acceleration (including gravity) |
| `accel_total` | m/s² (9.5 to 22.0) | MPU-6050 | Euclidean norm $\|\vec{a}\| = \sqrt{x^2+y^2+z^2}$ |
| `seismic_dev` | m/s² (0.0 to 12.0) | MPU-6050 | Dynamic seismic jerk $\|a_{total} - 9.81\|$ |
| `mq135_raw` | 12-bit ADC (0 – 400) | MQ-135 (Pin D35) | Raw gas/VOC analog sensor count |
| `co2_eq_ppm` | ppm (400 – 6000) | MQ-135 (Pin D35) | Approximate CO₂ equivalent / VOC index |
| `soil_raw` | 12-bit ADC (1000 – 4095) | Soil Probe (Pin D34)| Raw moisture count (4095=dry, 1200=wet) |
| `soil_moisture_pct`| % (0 – 100) | Soil Probe (Pin D34)| Volumetric soil water saturation |
| `tds_raw` | 12-bit ADC (0 – 1000) | TDS Sensor (Pin D33)| Raw analog water conductivity count |
| `tds_ppm` | ppm (0 – 2000) | TDS Sensor (Pin D33)| Total Dissolved Solids / Water purity |
| `rain_raw` | 12-bit ADC (900 – 4095) | Raindrop (Pin D32) | Rainplate surface resistance |
| `rain_wetness_pct`| % (0 – 100) | Raindrop (Pin D32) | Surface precipitation intensity |
| `distance_cm` | cm (15.0 – 220.0) | Ultrasonic (D5/D18) | Clearance to water level / ground plane |
| `water_rate_cm_min`| cm/min (-25 to +5) | Ultrasonic (D5/D18) | Rate of water level rise/fall |
| `pir_motion` | Binary (0 or 1) | PIR (Pin D13) | Human / Wildlife motion in hazard zone |
| `hazard_code` | Integer (0 to 5) | **Ground Truth** | Target numeric multi-hazard classification |
| `hazard_label` | String | **Ground Truth** | Target categorical hazard name |
| `severity` | String | EWS Matrix | Threat level (`None`, `Moderate`, `Severe`, `Extreme`) |
| `risk_score` | 0.0 – 100.0 | Edge AI Fusion | Calculated composite risk index |
| `confidence_pct`| % (85.0 – 99.0) | Inference Target | Model target inference confidence |

---

## 3. Class Codes & Labels

| Code | Label | Indian Regional Context | Dominant Sensor Signals |
| :---: | :--- | :--- | :--- |
| **0** | `NORMAL` | Standard baseline operations | Dry ground, low VOC, clear sky, stable IMU |
| **1** | `FLASH_FLOOD` | Assam / Chamoli cloudbursts | Rain $>60\%$, Soil $>85\%$, Ultrasonic Distance $<60\text{cm}$ |
| **2** | `LANDSLIDE_PRECURSOR` | Wayanad / Uttarakhand slopes | Soil $>80\%$, Rain active, Seismic Jerk $\sigma > 1.8\text{ m/s}^2$ |
| **3** | `WILDFIRE` | Himachal / Central forests | Temp $>38^\circ\text{C}$, Hum $<25\%$, Soil $0\%$, MQ-135 Gas spike |
| **4** | `HAZARDOUS_AIR_POLLUTION`| Delhi-NCR winter smog | MQ-135 Gas raw $>85$ (ppm $>1200$), Inversion Pressure |
| **5** | `WATER_CONTAMINATION` | Flood runoff / Industrial spill | TDS $>550\text{ ppm}$, Water present (Distance $<100\text{cm}$) |

---

## 4. How to Train and Export to ESP32 (Python Quickstart)

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 1. Load Dataset
df = pd.read_csv("environmental_multihazard_dataset.csv")

# 2. Select Features for On-Device Inference
features = [
    "temperature_c", "humidity_pct", "pressure_hpa",
    "accel_total", "seismic_dev", "mq135_raw",
    "soil_moisture_pct", "tds_ppm", "rain_wetness_pct",
    "distance_cm", "water_rate_cm_min"
]

X = df[features]
y = df["hazard_code"]

# 3. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 4. Train Model
clf = RandomForestClassifier(n_estimators=20, max_depth=8, random_state=42)
clf.fit(X_train, y_train)

# 5. Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# 6. Export to Pure C for ESP32 (Zero dependency!)
# pip install m2cgen
import m2cgen as m2c
c_code = m2c.export_to_c(clf)
with open("edge_ai_model.h", "w") as f:
    f.write(c_code)
print("Saved edge_ai_model.h for Arduino IDE!")
```
