#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include "friend_package/firmware_esp32/edge_scaler.h"
#include "friend_package/firmware_esp32/hazard_metadata.h"
#include "friend_package/firmware_esp32/hazard_tree.h"

void test_scenario(const char* name, float raw_features[11]) {
    float norm_features[11];
    normalize_sensor_reading(raw_features, norm_features);
    
    double input_double[11];
    for(int i = 0; i < 11; i++) {
        input_double[i] = (double)norm_features[i];
    }
    
    double output_probs[8];
    score(input_double, output_probs);
    
    int best_class = 0;
    double max_prob = -1.0;
    for(int i = 0; i < 8; i++) {
        if(output_probs[i] > max_prob) {
            max_prob = output_probs[i];
            best_class = i;
        }
    }
    
    printf("\n=== Scenario: %s ===\n", name);
    printf("Predicted: [%d] %s (%s)\n", best_class, HAZARD_METADATA[best_class].id_name, HAZARD_METADATA[best_class].display_name);
    printf("Confidence: %.1f%%\n", max_prob * 100.0);
    printf("Severity: %d | Siren: %s\n", HAZARD_METADATA[best_class].severity_level, HAZARD_METADATA[best_class].trigger_siren ? "YES" : "NO");
    printf("Advisory: %s\n", HAZARD_METADATA[best_class].action_advisory);
    printf("Top Probabilities: ");
    for(int i = 0; i < 8; i++) {
        if (output_probs[i] > 0.05) {
            printf("%s:%.0f%% ", HAZARD_METADATA[i].id_name, output_probs[i]*100.0);
        }
    }
    printf("\n");
}

int main() {
    // True schema_v2.py order:
    // 0: temp_c (28.2)
    // 1: hum (54.5)
    // 2: pres (1000.1)
    // 3: mq135_raw (400)
    // 4: water_level_cm (178.0)
    // 5: tilt_deg (2.5)
    // 6: vibration_g (1.00)
    // 7: soil_moisture_pct (15.0)
    // 8: rain_intensity (50.0)
    // 9: tds_ppm (120.0)
    // 10: motion_flag (0)
    
    // 1. Normal Room Baseline
    float normal_reading[11] = {
        28.2f,  // 0: temp
        54.5f,  // 1: hum
        1000.1f,// 2: pres
        400.0f, // 3: mq135_raw
        178.0f, // 4: water_level_cm
        2.5f,   // 5: tilt_deg
        1.00f,  // 6: vibration_g
        15.0f,  // 7: soil_moisture_pct
        50.0f,  // 8: rain_intensity
        120.0f, // 9: tds_ppm
        0.0f    // 10: motion_flag
    };
    test_scenario("Current Room Baseline", normal_reading);

    // 2. Flash Flood (water level high / distance drops to 25cm, heavy rain, saturated soil)
    float flood_reading[11] = {
        24.0f,  // temp
        92.0f,  // hum
        990.0f, // pres
        450.0f, // mq135_raw
        25.0f,  // water_level_cm (very high water / small distance)
        2.5f,   // tilt_deg
        1.01f,  // vibration_g
        88.0f,  // soil_moisture_pct
        3200.0f,// rain_intensity
        350.0f, // tds_ppm
        0.0f    // motion_flag
    };
    test_scenario("Flash Flood Surge", flood_reading);

    // 3. Landslide Precursor (High soil moisture + huge tilt + high vibration)
    float landslide_reading[11] = {
        22.0f,  // temp
        90.0f,  // hum
        995.0f, // pres
        380.0f, // mq135_raw
        150.0f, // water_level_cm
        28.0f,  // tilt_deg (steep tilt!)
        1.25f,  // vibration_g (seismic shake!)
        92.0f,  // soil_moisture_pct
        2100.0f,// rain_intensity
        280.0f, // tds_ppm
        0.0f    // motion_flag
    };
    test_scenario("Landslide Precursor", landslide_reading);

    // 4. Wildfire / Forest Fire (High temp, very low humidity, high smoke)
    float fire_reading[11] = {
        44.0f,  // temp (44°C)
        15.0f,  // hum (15%)
        996.0f, // pres
        2800.0f,// mq135_raw (heavy smoke/gas)
        185.0f, // water_level_cm
        2.5f,   // tilt_deg
        1.00f,  // vibration_g
        5.0f,   // soil_moisture_pct (bone dry)
        0.0f,   // rain_intensity
        30.0f,  // tds_ppm
        0.0f    // motion_flag
    };
    test_scenario("Wildfire / Forest Fire", fire_reading);

    // 5. Chemical / Toxic Gas Leak
    float gas_leak_reading[11] = {
        27.0f,  // temp
        55.0f,  // hum
        1004.0f,// pres
        3600.0f,// mq135_raw (MASSIVE VOC spike)
        180.0f, // water_level_cm
        2.5f,   // tilt_deg
        1.00f,  // vibration_g
        12.0f,  // soil_moisture_pct
        0.0f,   // rain_intensity
        45.0f,  // tds_ppm
        1.0f    // motion_flag
    };
    test_scenario("Industrial Chemical Gas Leak", gas_leak_reading);

    // 6. Water Contamination (Extremely high TDS)
    float water_contam_reading[11] = {
        26.0f,  // temp
        65.0f,  // hum
        1001.0f,// pres
        420.0f, // mq135_raw
        70.0f,  // water_level_cm
        2.5f,   // tilt_deg
        1.00f,  // vibration_g
        65.0f,  // soil_moisture_pct
        200.0f, // rain_intensity
        1450.0f,// tds_ppm (EXTREME TDS)
        0.0f    // motion_flag
    };
    test_scenario("Water Contamination", water_contam_reading);

    return 0;
}
