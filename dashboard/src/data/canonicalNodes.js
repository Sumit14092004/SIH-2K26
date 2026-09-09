import { formatIstTime } from '../utils/istTime.js';

// Helper generating pure IST timestamp relative to reference time
const createRecentTimestamp = (minsAgo, secsAgo = 0) => {
  const d = new Date(Date.now() - (minsAgo * 60 + secsAgo) * 1000);
  return formatIstTime(d);
};

export const CANONICAL_NODES = [
  {
    id: 'GJ-RRU-001',
    displayId: 'RRU-001',
    name: 'RRU Main Campus Environmental Node',
    location: 'Rashtriya Raksha University, Lavad, Ta. Dehgam, Gandhinagar District, Gujarat',
    state: 'Gujarat',
    pincode: '382305',
    regionCluster: 'Gujarat // Gandhinagar Institutional Sector',
    coordinates: { lat: 23.1544554, lng: 72.884999 },
    elevation: '82m ASL',
    hazard: 'Multi-Hazard Integrated Station',
    hazardType: 'MULTI',
    sensorType: 'multi-hazard',
    isMultiSensor: true,
    severity: 'nominal',
    keyMetric: 'All sensors nominal (TinyML Edge AI)',
    subtext: 'RRU multi-sensor tactical array. Live ESP32 hardware telemetry via USB serial bridge.',
    status: 'online',
    network: {
      backhaul: 'Campus Gigabit Wi-Fi / USB Serial Ingestion',
      rssi: '-65 dBm',
      packetDelivery: '99.9%',
      latency: '18ms',
    },
    power: {
      batteryPct: 95.0,
      voltage: '4.12 V',
      solarInput: '1.2 W',
      source: 'ESP32 USB Bus / 3.7V LiPo',
    },
    readings: [
      {
        id: 'aqi',
        hazard_type: 'aqi',
        label: 'Air Quality Index',
        value: 35,
        unit: 'AQI',
        sensor_model: 'MQ-135 Gas / Air Quality',
        thresholdRange: 'Nominal: ≤ 100 | Warning: 101-250 | Abnormal: 251-400 | Critical: > 400',
      },
      {
        id: 'temperature',
        hazard_type: 'fire',
        label: 'Ambient Temperature',
        value: 28.0,
        unit: '°C',
        sensor_model: 'DHT22 Temp & Humidity',
        thresholdRange: 'Safe: < 40°C | Warning: 40-50°C | Abnormal: 50-60°C | Critical: ≥ 60°C',
      },
      {
        id: 'humidity',
        hazard_type: 'humidity',
        label: 'Relative Humidity',
        value: 51.5,
        unit: '%',
        sensor_model: 'DHT22 Temp & Humidity',
        thresholdRange: 'Normal: 30-80% | Advisory: > 85%',
      },
      {
        id: 'pressure',
        hazard_type: 'pressure',
        label: 'Atmospheric Pressure',
        value: 1013.2,
        unit: 'hPa',
        sensor_model: 'BMP280 Barometric Pressure',
        thresholdRange: 'Nominal: 980-1030 hPa | Warning: 960-980 hPa | Critical: < 960 hPa',
      },
      {
        id: 'dist_cm',
        hazard_type: 'distance',
        label: 'HC-SR04 Bat Radar',
        value: 172.6,
        unit: 'cm',
        sensor_model: 'HC-SR04 Ultrasonic Clearance',
        thresholdRange: 'Safe: > 50 cm | Warning: 25-50 cm | Abnormal: 10-25 cm | Critical: < 10 cm',
      },
      {
        id: 'tds',
        hazard_type: 'water_quality',
        label: 'TDS Water Quality',
        value: 0,
        unit: 'ppm',
        sensor_model: 'Analog TDS / Water Purity Probe',
        thresholdRange: 'Optimal: < 300 ppm | Good: 300-600 | Warning: 600-900 | Critical: > 1200 ppm',
      },
      {
        id: 'soil_moisture',
        hazard_type: 'landslide',
        label: 'Soil Moisture',
        value: 0.0,
        unit: '%',
        sensor_model: 'Capacitive Soil Probe',
        thresholdRange: 'Nominal: < 60% | Warning: 60-75% | Saturated: ≥ 75%',
      },
      {
        id: 'vibration',
        hazard_type: 'seismic',
        label: 'Seismic / Vibration',
        value: 0.05,
        unit: 'mm/s',
        sensor_model: 'MPU-6050 Accelerometer',
        thresholdRange: 'Stable: < 0.5 mm/s | Warning: 0.5-1.5 mm/s | Critical: ≥ 2.5 mm/s',
      },
      {
        id: 'rainfall',
        hazard_type: 'rainfall',
        label: 'Rainfall / Wetness',
        value: 0.0,
        unit: '%',
        sensor_model: 'MH-RD Optical Rain Plate',
        thresholdRange: 'Dry: < 15% | Light: 15-50% | Moderate: 50-80% | Heavy: ≥ 80%',
      },
    ],
    latestSensors: {
      primaryValue: 'NOMINAL',
      primaryUnit: '',
      primaryLabel: 'QUALCOMM TINYML EDGE AI',
      aqi: 35,
      temperature: 28.0,
      humidity: 51.5,
      pressure: 1013.2,
      pres: 1013.2,
      dist_cm: 172.6,
      distance: 172.6,
      crest_m: 0.27,
      water_level_m: 0.27,
      tds: 0,
      tds_ppm: 0,
      soil_moisture: 0.0,
      vibration: 0.05,
      rainfall: 0.0,
    },
    directive: 'Live hardware telemetry uplink operational from RRU Gandhinagar station.',
    populationAtRisk: '35K',
    riskScore: 12,
    lastUpdated: 'LIVE',
  },
];

// Helper Selectors
export const getNodeById = (nodeId) => {
  if (!nodeId) return CANONICAL_NODES[0];
  const cleaned = nodeId.trim().toUpperCase();
  return (
    CANONICAL_NODES.find(
      (n) =>
        n.id.toUpperCase() === cleaned ||
        n.displayId.toUpperCase() === cleaned ||
        n.name.toUpperCase().includes(cleaned)
    ) || CANONICAL_NODES[0]
  );
};

export const getActiveHazards = () => {
  return CANONICAL_NODES.filter((n) => n.severity !== 'nominal' && n.severity !== 'offline');
};

export const getNodesBySeverity = (severity) => {
  if (!severity || severity === 'ALL') return CANONICAL_NODES;
  return CANONICAL_NODES.filter((n) => n.severity.toLowerCase() === severity.toLowerCase());
};

export const getNodesByHazardType = (hazardType) => {
  if (!hazardType || hazardType === 'ALL') return CANONICAL_NODES;
  return CANONICAL_NODES.filter((n) => {
    if (n.hazardType === hazardType) return true;
    if (n.isMultiSensor && n.readings) {
      return n.readings.some(
        (r) => r.hazard_type && r.hazard_type.toLowerCase() === hazardType.toLowerCase()
      );
    }
    return false;
  });
};
