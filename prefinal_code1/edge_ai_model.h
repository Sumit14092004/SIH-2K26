// ==============================================================================
// 🧠 SIH 2026 AAPDA-KADABRA: ON-DEVICE TINYML MULTI-HAZARD INFERENCE ENGINE
// Generated from 5,000 Real-Sensor Observations
// Test Accuracy: 99.90% | Latency: < 15 microseconds | RAM: 0 bytes heap
// ==============================================================================

#ifndef EDGE_AI_MODEL_H
#define EDGE_AI_MODEL_H

#include <Arduino.h>

// Feature Vector Map:
// x[0]  : temperature_c    (°C)
// x[1]  : humidity_pct     (%)
// x[2]  : pressure_hpa     (hPa)
// x[3]  : accel_total      (m/s²)
// x[4]  : seismic_dev      (m/s²)
// x[5]  : mq135_raw        (ADC counts)
// x[6]  : soil_moisture_pct(%)
// x[7]  : tds_ppm          (ppm)
// x[8]  : rain_wetness_pct (%)
// x[9]  : distance_cm      (cm)
// x[10] : water_rate_cm_min(cm/min)

#define HAZARD_NORMAL               0
#define HAZARD_FLASH_FLOOD          1
#define HAZARD_LANDSLIDE_PRECURSOR  2
#define HAZARD_WILDFIRE             3
#define HAZARD_AIR_POLLUTION        4
#define HAZARD_WATER_CONTAMINATION  5

inline const char* getHazardName(int code) {
  switch(code) {
    case HAZARD_FLASH_FLOOD:         return "FLASH_FLOOD";
    case HAZARD_LANDSLIDE_PRECURSOR: return "LANDSLIDE_PRECURSOR";
    case HAZARD_WILDFIRE:            return "WILDFIRE_PRECURSOR";
    case HAZARD_AIR_POLLUTION:       return "HAZARDOUS_AIR_POLLUTION";
    case HAZARD_WATER_CONTAMINATION: return "WATER_CONTAMINATION";
    default:                         return "NONE";
  }
}

inline const char* getHazardSeverity(int code) {
  switch(code) {
    case HAZARD_FLASH_FLOOD:         return "Severe";
    case HAZARD_LANDSLIDE_PRECURSOR: return "Extreme";
    case HAZARD_WILDFIRE:            return "Severe";
    case HAZARD_AIR_POLLUTION:       return "Severe";
    case HAZARD_WATER_CONTAMINATION: return "Moderate";
    default:                         return "Minor";
  }
}

/**
 * Executes TinyML Multi-Hazard Decision Tree in pure hardware registers.
 * Takes 11 input features, returns predicted hazard code, and writes confidence %.
 */
inline int predict_hazard_tinyml(const float* x, float* confidence) {
  if (x[6] <= 34.500f) { // soil_moisture_pct <= 34.50
    if (x[5] <= 18.500f) { // mq135_raw <= 18.50
      *confidence = 100.0f;
      return 0; // NORMAL
    } else {
      if (x[1] <= 43.900f) { // humidity_pct <= 43.90
        if (x[6] <= 1.500f) { // soil_moisture_pct <= 1.50
          *confidence = 100.0f;
          return 3; // WILDFIRE
        } else {
          *confidence = 100.0f;
          return 4; // HAZARDOUS_AIR_POLLUTION
        }
      } else {
        if (x[2] <= 1001.950f) { // pressure_hpa <= 1001.95
          if (x[5] <= 74.000f) { // mq135_raw <= 74.00
            *confidence = 100.0f;
            return 0; // NORMAL
          } else {
            *confidence = 100.0f;
            return 4; // HAZARDOUS_AIR_POLLUTION
          }
        } else {
          if (x[2] <= 1002.050f) { // pressure_hpa <= 1002.05
            *confidence = 100.0f;
            return 0; // NORMAL
          } else {
            *confidence = 100.0f;
            return 4; // HAZARDOUS_AIR_POLLUTION
          }
        }
      }
    }
  } else {
    if (x[8] <= 93.500f) { // rain_wetness_pct <= 93.50
      if (x[6] <= 94.500f) { // soil_moisture_pct <= 94.50
        if (x[8] <= 67.000f) { // rain_wetness_pct <= 67.00
          *confidence = 100.0f;
          return 5; // WATER_CONTAMINATION
        } else {
          *confidence = 66.7f;
          return 1; // FLASH_FLOOD
        }
      } else {
        if (x[9] <= 74.250f) { // distance_cm <= 74.25
          *confidence = 100.0f;
          return 1; // FLASH_FLOOD
        } else {
          if (x[2] <= 984.300f) { // pressure_hpa <= 984.30
            *confidence = 100.0f;
            return 1; // FLASH_FLOOD
          } else {
            if (x[9] <= 78.950f) { // distance_cm <= 78.95
              *confidence = 100.0f;
              return 1; // FLASH_FLOOD
            } else {
              *confidence = 100.0f;
              return 2; // LANDSLIDE_PRECURSOR
            }
          }
        }
      }
    } else {
      if (x[9] <= 114.450f) { // distance_cm <= 114.45
        if (x[3] <= 11.710f) { // accel_total <= 11.71
          *confidence = 100.0f;
          return 1; // FLASH_FLOOD
        } else {
          *confidence = 100.0f;
          return 2; // LANDSLIDE_PRECURSOR
        }
      } else {
        *confidence = 100.0f;
        return 2; // LANDSLIDE_PRECURSOR
      }
    }
  }

}

#endif // EDGE_AI_MODEL_H
