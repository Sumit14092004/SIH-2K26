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
        value: 28.5,
        unit: '°C',
        sensor_model: 'DHT22 Temp & Humidity',
        thresholdRange: 'Safe: < 40°C | Warning: 40-50°C | Abnormal: 50-60°C | Critical: ≥ 60°C',
      },
      {
        id: 'humidity',
        hazard_type: 'humidity',
        label: 'Relative Humidity',
        value: 50.8,
        unit: '%',
        sensor_model: 'DHT22 Temp & Humidity',
        thresholdRange: 'Normal: 30-80% | Advisory: > 85%',
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
        label: 'Seismic / Structural Vibration',
        value: 0.08,
        unit: 'mm/s',
        sensor_model: 'MPU-6050 Accelerometer',
        thresholdRange: 'Stable: < 0.5 mm/s | Warning: 0.5-1.5 mm/s | Critical: ≥ 2.5 mm/s',
      },
      {
        id: 'rainfall',
        hazard_type: 'flood',
        label: 'Flood Crest / Clearance',
        value: 0.28,
        unit: 'm',
        sensor_model: 'HC-SR04 Bat Radar / Rain Plate',
        thresholdRange: 'Safe: < 0.5m | Warning: 0.5-1.5m | Abnormal: 1.5-3.0m | Critical: ≥ 3.0m',
      },
    ],
    latestSensors: {
      primaryValue: 'NOMINAL',
      primaryUnit: '',
      primaryLabel: 'QUALCOMM TINYML EDGE AI',
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
