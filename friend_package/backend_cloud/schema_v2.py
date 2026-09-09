"""
SIH 2026: TinyML Sensor Schema v2.0
Configured for:
  - DHT22 (Temp & Humidity)
  - GY-BMP280 (Barometric Pressure & Temp)
  - MQ-135 (Air Quality / Smoke / CO2 / Toxic Gas Proxy)
  - HC-SR04 (Ultrasonic Distance / Water Level)
  - MPU-6050 (Tilt & Vibration / Seismic Activity)
  - Soil Moisture Sensor
  - MH-RD (Raindrop Detection)
  - Analog TDS Sensor (Water Quality)
  - PIR Sensor (Motion Detection)
"""

FEATURE_COLUMNS = [
    "temp_c",             # Ambient temperature (°C)
    "humidity_pct",       # Relative humidity (%)
    "pressure_hpa",       # Atmospheric pressure (hPa)
    "mq135_raw",          # MQ-135 12-bit ADC reading (0 - 4095)
    "water_level_cm",     # HC-SR04 ultrasonic distance to water/surface (cm)
    "tilt_deg",           # MPU-6050 structural tilt angle (degrees)
    "vibration_g",        # MPU-6050 seismic/vibration acceleration (g)
    "soil_moisture_pct",  # Soil water content (0 - 100%)
    "rain_intensity",     # MH-RD precipitation intensity (0 - 4095)
    "tds_ppm",            # Analog TDS dissolved solids in water (ppm)
    "motion_flag",        # PIR binary motion detection (0 or 1)
]

TARGET_CLASSES = [
    "normal",
    "flash_flood",
    "forest_fire",
    "hazardous_air",
    "extreme_heat",
    "landslide_precursor",
    "industrial_leak",
    "water_quality_degradation",
]

SCHEMA_VERSION = "2.0_TINYML_MQ135"
