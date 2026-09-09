// Auto-generated TinyML Sensor Scaler for ESP32-S3
// Generated for Schema: 2.0_TINYML_MQ135
#ifndef EDGE_SCALER_H
#define EDGE_SCALER_H

#define NUM_FEATURES 11

static const float SENSOR_MEANS[NUM_FEATURES] = {
    30.00582f, 58.73944f, 1001.80627f, 1436.59341f, 170.33682f, 2.73515f, 1.00754f, 42.48761f, 775.02262f, 549.36536f, 0.07141f
};

static const float SENSOR_STDS[NUM_FEATURES] = {
    7.73139f, 23.12324f, 6.76623f, 1228.61219f, 65.90501f, 2.06489f, 0.03812f, 30.49561f, 1239.79732f, 269.38841f, 0.25750f
};

// In-place normalization function (sub-microsecond execution on ESP32-S3)
static inline void normalize_sensor_reading(const float* raw_input, float* normalized_output) {
    for (int i = 0; i < NUM_FEATURES; i++) {
        normalized_output[i] = (raw_input[i] - SENSOR_MEANS[i]) / SENSOR_STDS[i];
    }
}

#endif // EDGE_SCALER_H
