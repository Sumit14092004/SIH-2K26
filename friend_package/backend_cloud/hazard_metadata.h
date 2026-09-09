// Auto-generated Hazard Metadata & Action Advisories for ESP32 Dev Module
#ifndef HAZARD_METADATA_H
#define HAZARD_METADATA_H

#define NUM_HAZARD_CLASSES 8

struct HazardInfo {
    const char* id_name;
    const char* display_name;
    int severity_level;       // 0: Normal, 1: Advisory, 2: Warning, 3: Critical
    bool trigger_siren;       // True: Turn on local buzzer/strobe
    const char* action_advisory;
};

static const HazardInfo HAZARD_METADATA[NUM_HAZARD_CLASSES] = {
    // 0: extreme_heat
    {"extreme_heat", "Extreme Heat Wave", 2, false, "Stay hydrated. Avoid direct sun exposure."},
    // 1: flash_flood
    {"flash_flood", "Flash Flood Inundation", 3, true, "CRITICAL: Seek immediate higher ground! Evacuate drainage areas."},
    // 2: forest_fire
    {"forest_fire", "Wildfire / Forest Fire", 3, true, "CRITICAL: Wildfire detected! Evacuate opposite to wind direction."},
    // 3: hazardous_air
    {"hazardous_air", "Toxic Smog / Severe AQI", 2, false, "AQI Severe. Seal indoor ventilation; wear N95/protective respirators."},
    // 4: industrial_leak
    {"industrial_leak", "Chemical / Gas Leak", 3, true, "CRITICAL: Toxic gas cloud detected. Move upwind immediately."},
    // 5: landslide_precursor
    {"landslide_precursor", "Landslide Slope Failure", 3, true, "CRITICAL: Soil liquefaction and slope creep detected. Evacuate base of slope."},
    // 6: normal
    {"normal", "Normal Ambient", 0, false, "All environmental channels within safe baseline."},
    // 7: water_quality_degradation
    {"water_quality_degradation", "Water Contamination", 2, false, "High TDS detected. Do not consume local tap or surface water."}
};

#endif // HAZARD_METADATA_H
