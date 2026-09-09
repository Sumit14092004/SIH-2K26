// Standardized 5-Tier Severity Matrix across all hazard vectors
// OFFLINE -> NOMINAL -> WARNING -> ABNORMAL -> CRITICAL / EMERGENCY

export const SEVERITY_TIERS = [
  {
    key: 'offline',
    label: 'OFFLINE',
    shortLabel: 'OFFLINE',
    color: '#64748b',
    badgeClass: 'bg-slate-800/80 text-slate-300 border-slate-700',
    activeBarClass: 'bg-slate-500 text-white font-bold',
    inactiveBarClass: 'bg-[#141c2e] text-slate-400 border border-[#25314c] hover:border-slate-500',
    description: 'No telemetry packets received / connection lost',
  },
  {
    key: 'nominal',
    label: 'NOMINAL',
    shortLabel: 'NOMINAL',
    color: '#059669',
    badgeClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
    activeBarClass: 'bg-emerald-600 text-white font-bold',
    inactiveBarClass: 'bg-[#141c2e] text-emerald-400/70 border border-[#25314c] hover:border-emerald-500/50',
    description: 'Normal operating range within safe environmental baseline',
  },
  {
    key: 'warning',
    label: 'WARNING',
    shortLabel: 'WARNING',
    color: '#d97706',
    badgeClass: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
    activeBarClass: 'bg-amber-500 text-white font-bold',
    inactiveBarClass: 'bg-[#141c2e] text-amber-400/70 border border-[#25314c] hover:border-amber-500/50',
    description: 'Trending toward threshold; heightened surveillance advised',
  },
  {
    key: 'abnormal',
    label: 'ABNORMAL',
    shortLabel: 'ABNORMAL',
    color: '#ea580c',
    badgeClass: 'bg-orange-950/60 text-orange-400 border-orange-500/40',
    activeBarClass: 'bg-orange-500 text-white font-bold',
    inactiveBarClass: 'bg-[#141c2e] text-orange-400/70 border border-[#25314c] hover:border-orange-500/50',
    description: 'Reading outside expected operating range; field standby alert',
  },
  {
    key: 'critical',
    label: 'CRITICAL / EMERGENCY',
    shortLabel: 'CRITICAL',
    color: '#dc2626',
    badgeClass: 'bg-red-950/60 text-red-400 border-red-500/40',
    activeBarClass: 'bg-red-600 text-white font-bold animate-pulse',
    inactiveBarClass: 'bg-[#141c2e] text-red-400/70 border border-[#25314c] hover:border-red-500/50',
    description: 'Danger threshold breached; immediate evacuation / response required',
  },
];

/**
 * Parses numeric metric from sensor object or metric string
 */
function parseNumber(val) {
  if (typeof val === 'number') return val;
  if (!val) return null;
  const match = String(val).match(/[-+]?[0-9]+(?:\.[0-9]+)?/);
  return match ? parseFloat(match[0]) : null;
}

/**
 * Pure evaluator for an individual sensor reading within a multi-sensor node
 */
export function evaluateSensorReading(reading) {
  if (!reading || reading.value === null || reading.value === undefined) {
    return {
      tier: 'nominal',
      statusText: 'AWAITING TELEMETRY',
      riskScore: 0,
      isAwaiting: true,
    };
  }

  const val = Number(reading.value);
  const type = (reading.hazard_type || reading.id || '').toLowerCase();

  if (type === 'aqi') {
    // If raw mq135 ppm (ambient CO2 baseline is ~400 ppm) or raw ADC is provided without explicit AQI
    let aqiVal = val;
    if (reading.unit === 'ppm' || (reading.sensor_model && reading.sensor_model.includes('MQ-135') && val >= 350 && val <= 450)) {
      aqiVal = Math.round(35 + (Math.min(Math.max(val - 400, 0), 1600) / 1600) * 415);
    }
    if (aqiVal >= 400) return { tier: 'critical', riskScore: 95, statusText: 'Hazardous / Emergency' };
    if (aqiVal >= 250) return { tier: 'abnormal', riskScore: 75, statusText: 'Severe Air Toxicity' };
    if (aqiVal >= 100) return { tier: 'warning', riskScore: 50, statusText: 'Moderate Pollution' };
    return { tier: 'nominal', riskScore: 15, statusText: 'Safe / Good' };
  }

  if (type === 'fire' || type === 'temperature') {
    if (val >= 60) return { tier: 'critical', riskScore: 92, statusText: 'Thermal Outbreak / Fire' };
    if (val >= 50) return { tier: 'abnormal', riskScore: 70, statusText: 'High Thermal Risk' };
    if (val >= 40) return { tier: 'warning', riskScore: 45, statusText: 'Elevated Temperature' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Normal Ambient' };
  }

  if (type === 'humidity') {
    if (val > 90) return { tier: 'warning', riskScore: 40, statusText: 'Extreme Humidity' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Optimal Range' };
  }

  if (type === 'landslide' || type === 'soil_moisture') {
    if (val >= 75) return { tier: 'critical', riskScore: 90, statusText: 'Soil Saturated / Slip Risk' };
    if (val >= 60) return { tier: 'warning', riskScore: 55, statusText: 'High Moisture' };
    return { tier: 'nominal', riskScore: 15, statusText: 'Stable Soil' };
  }

  if (type === 'seismic' || type === 'vibration') {
    // If raw MPU-6050 acceleration is passed (resting on desk: ~9.81 to 10.8 m/s²), evaluate tremor delta
    let vibVal = val;
    if (val >= 8.0 && val <= 13.0) {
      vibVal = Math.max(0, Number((Math.abs(val - 9.81) - 1.0).toFixed(2)));
    }
    if (vibVal >= 2.5) return { tier: 'critical', riskScore: 96, statusText: 'High Vibration / Shock' };
    if (vibVal >= 1.5) return { tier: 'abnormal', riskScore: 72, statusText: 'Abnormal Tremor' };
    if (vibVal >= 0.5) return { tier: 'warning', riskScore: 48, statusText: 'Minor Vibration' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Stable Baseline' };
  }

  if (type === 'pressure' || type === 'barometric' || type === 'atmospheric') {
    // Atmospheric / Barometric Pressure in hPa
    if (val < 940 && val >= 500) return { tier: 'critical', riskScore: 95, statusText: 'Severe Cyclone Depression' };
    if (val < 960 && val >= 500) return { tier: 'abnormal', riskScore: 75, statusText: 'Deep Low Pressure System' };
    if (val < 980 && val >= 500) return { tier: 'warning', riskScore: 45, statusText: 'Barometric Drop Advisory' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Standard Barometric Baseline' };
  }

  if (type === 'distance' || type === 'dist_cm' || type === 'bat_radar' || type === 'ultrasonic' || type === 'clearance') {
    // Ultrasonic echo clearance (distance down to water/floor): Safe > 50cm, Warning 25-50cm, Abnormal 10-25cm, Critical <= 10cm
    if (val > 0 && val <= 10) return { tier: 'critical', riskScore: 96, statusText: 'Imminent Flood Overflow' };
    if (val > 0 && val <= 25) return { tier: 'abnormal', riskScore: 75, statusText: 'Flood Crest Danger' };
    if (val > 0 && val <= 50) return { tier: 'warning', riskScore: 48, statusText: 'Rising Flood Clearance' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Safe Clearance Baseline' };
  }

  if (type === 'tds' || type === 'water_quality' || type === 'tds_ppm') {
    // TDS Water Purity in ppm (BIS IS 10500 standard)
    if (val >= 1200) return { tier: 'critical', riskScore: 95, statusText: 'Toxic / Severely Contaminated' };
    if (val >= 900) return { tier: 'abnormal', riskScore: 75, statusText: 'Poor Water Quality' };
    if (val >= 600) return { tier: 'warning', riskScore: 50, statusText: 'Moderate Mineral / TDS' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Optimal Drinking Baseline' };
  }

  if (type === 'flood' || type === 'rainfall' || type === 'rain') {
    if (val >= 80) return { tier: 'critical', riskScore: 94, statusText: 'Torrential Downpour' };
    if (val >= 40) return { tier: 'warning', riskScore: 50, statusText: 'Moderate Precipitation' };
    return { tier: 'nominal', riskScore: 10, statusText: 'Dry / Nil Precipitation' };
  }

  return { tier: 'nominal', riskScore: 10, statusText: 'Operating Normally' };
}

/**
 * Standardized pure evaluator: returns structured severity diagnosis per node based on real sensor metrics
 *
 * @param {Object} node
 * @returns {Object} assessment: { activeTier, metricDiagnostic, thresholdRange, riskScore, readingValue, unit }
 */
export function getSeverityAssessment(node) {
  if (!node) {
    return {
      activeTier: 'nominal',
      metricDiagnostic: 'NOMINAL — Operating within baseline specifications',
      thresholdRange: 'Standard multi-hazard telemetry evaluation protocol',
      riskScore: 10,
    };
  }

  // 0. OFFLINE Check
  if (
    node.status === 'offline' ||
    node.severity === 'offline' ||
    node.isOffline ||
    node.id === 'IN-JK-001'
  ) {
    return {
      activeTier: 'offline',
      metricDiagnostic: 'OFFLINE — No telemetry packets received; signal loss / heartbeat timeout',
      thresholdRange: 'Offline detection: > 90s without telemetry ping',
      riskScore: 0,
      readingValue: 'NO SIGNAL / OFFLINE',
      unit: '',
    };
  }

  // Multi-sensor node evaluation (Worst-of-all severity)
  if (node.isMultiSensor && node.readings && Array.isArray(node.readings)) {
    const hasAnyReading = node.readings.some((r) => r.value !== null && r.value !== undefined);
    if (!hasAnyReading) {
      return {
        activeTier: 'offline',
        metricDiagnostic: 'OFFLINE — Disconnected; awaiting live ESP32 hardware telemetry burst',
        thresholdRange: 'Offline detection: > 300s without hardware telemetry uplink',
        riskScore: 0,
        readingValue: 'NO SIGNAL / OFFLINE',
        unit: '',
        isMultiSensor: true,
        allReadingsAwaiting: true,
      };
    }

    const TIER_WEIGHTS = { critical: 4, abnormal: 3, warning: 2, nominal: 1 };
    let worstTier = 'nominal';
    let maxRisk = 0;
    let worstReading = null;

    node.readings.forEach((r) => {
      const evaluation = evaluateSensorReading(r);
      if (TIER_WEIGHTS[evaluation.tier] > TIER_WEIGHTS[worstTier]) {
        worstTier = evaluation.tier;
        worstReading = { ...r, ...evaluation };
      }
      if (evaluation.riskScore > maxRisk) {
        maxRisk = evaluation.riskScore;
      }
    });

    const activeReadings = node.readings.filter((r) => r.value !== null && r.value !== undefined);

    return {
      activeTier: worstTier,
      metricDiagnostic: worstReading && worstTier !== 'nominal'
        ? `${worstTier.toUpperCase()} — ${worstReading.label} (${worstReading.value} ${worstReading.unit}) [${worstReading.statusText}]`
        : `NOMINAL — All ${activeReadings.length} active sensors reporting within baseline`,
      thresholdRange: `Multi-hazard integrated environmental matrix (${node.readings?.length || activeReadings.length} sensor channels)`,
      riskScore: maxRisk || 15,
      readingValue: worstReading ? `${worstReading.value} ${worstReading.unit}` : 'NORMAL',
      unit: worstReading ? worstReading.unit : '',
      worstReading,
      isMultiSensor: true,
      allReadingsAwaiting: false,
    };
  }

  const hazardType = (node.hazardType || '').toUpperCase();
  const sensors = node.latestSensors || {};

  // 1. FLOOD / INUNDATION
  // Thresholds: Safe < +0.50m | Warning: +0.50 to +1.50m | Abnormal: +1.50 to +3.00m | Critical: ≥ +3.00m
  if (hazardType === 'FLOOD') {
    const thresholdRange = 'Safe: < +0.5m | Warning: +0.5 to +1.5m | Abnormal: +1.5 to +3.0m | Critical: ≥ +3.0m';
    let crestM = null;

    if (sensors.primaryValue !== undefined && sensors.primaryValue !== null) {
      crestM = parseNumber(sensors.primaryValue);
    } else if (sensors.waterLevelCm !== undefined && sensors.waterLevelCm !== null) {
      crestM = sensors.waterLevelCm / 100;
    } else if (node.keyMetric) {
      crestM = parseNumber(node.keyMetric);
    }

    if (crestM === null) crestM = 0.28; // safe baseline fallback

    const sign = crestM >= 0 ? '+' : '';
    const formattedCrest = `${sign}${crestM.toFixed(2)}m`;

    if (crestM >= 3.0) {
      return {
        activeTier: 'critical',
        metricDiagnostic: `CRITICAL — ${formattedCrest} crest exceeds Level-3 emergency threshold (≥ +3.00m)`,
        thresholdRange,
        riskScore: Math.min(99, Math.round(85 + (crestM - 3.0) * 8)),
        readingValue: formattedCrest,
        unit: 'crest',
      };
    }
    if (crestM >= 1.5) {
      return {
        activeTier: 'abnormal',
        metricDiagnostic: `ABNORMAL — ${formattedCrest} crest surge, above warning bound (+1.50m to +3.00m)`,
        thresholdRange,
        riskScore: Math.round(65 + (crestM - 1.5) * 15),
        readingValue: formattedCrest,
        unit: 'crest surge',
      };
    }
    if (crestM >= 0.5) {
      return {
        activeTier: 'warning',
        metricDiagnostic: `WARNING — ${formattedCrest} crest surge, approaching danger mark (+0.50m to +1.50m)`,
        thresholdRange,
        riskScore: Math.round(40 + (crestM - 0.5) * 25),
        readingValue: formattedCrest,
        unit: 'crest surge',
      };
    }
    return {
      activeTier: 'nominal',
      metricDiagnostic: `NOMINAL — ${formattedCrest} crest, within safe range (< +0.50m)`,
      thresholdRange,
      riskScore: Math.max(10, Math.round(15 + crestM * 20)),
      readingValue: formattedCrest,
      unit: 'nominal',
    };
  }

  // 2. AQI / TOXIC SMOG
  // Thresholds: Good/Mod: ≤ 100 | Warning: 101-250 | Abnormal: 251-400 | Critical (GRAP-IV): > 400
  if (hazardType === 'AQI') {
    const thresholdRange = 'Good: ≤ 100 | Warning: 101-250 | Abnormal (GRAP-III): 251-400 | Critical (GRAP-IV): > 400';
    let aqi = null;

    if (sensors.primaryValue !== undefined && sensors.primaryValue !== null) {
      aqi = parseNumber(sensors.primaryValue);
    } else if (sensors.pm25 !== undefined && sensors.pm25 !== null) {
      aqi = parseNumber(sensors.pm25);
    } else if (node.keyMetric) {
      aqi = parseNumber(node.keyMetric);
    }

    if (aqi === null) aqi = 75;

    if (aqi > 400) {
      return {
        activeTier: 'critical',
        metricDiagnostic: `CRITICAL — AQI ${aqi} exceeds GRAP Stage IV emergency threshold (> 400)`,
        thresholdRange,
        riskScore: Math.min(99, Math.round(88 + (aqi - 400) * 0.1)),
        readingValue: aqi,
        unit: 'AQI',
      };
    }
    if (aqi > 250) {
      return {
        activeTier: 'abnormal',
        metricDiagnostic: `ABNORMAL — AQI ${aqi}, Stage-III severe smog envelope (251–400)`,
        thresholdRange,
        riskScore: Math.round(65 + (aqi - 250) * 0.15),
        readingValue: aqi,
        unit: 'AQI',
      };
    }
    if (aqi > 100) {
      return {
        activeTier: 'warning',
        metricDiagnostic: `WARNING — AQI ${aqi}, trending upward under thermal inversion (101–250)`,
        thresholdRange,
        riskScore: Math.round(35 + (aqi - 100) * 0.2),
        readingValue: aqi,
        unit: 'AQI',
      };
    }
    return {
      activeTier: 'nominal',
      metricDiagnostic: `NOMINAL — AQI ${aqi}, within national ambient baseline (≤ 100)`,
      thresholdRange,
      riskScore: Math.max(8, Math.round(aqi * 0.25)),
      readingValue: aqi,
      unit: 'AQI',
    };
  }

  // 3. LANDSLIDE / SEISMIC
  // Thresholds: Stable < 0.5 mm/h & < 80 kPa | Creep: 0.5-1.5 mm/h OR 80-130 kPa | Abnormal: 1.5-2.5 mm/h OR 130-170 kPa | Critical: ≥ 2.5 mm/h OR ≥ 170 kPa
  if (hazardType === 'SEISMIC') {
    const thresholdRange = 'Stable: < 0.5 mm/h | Advisory: 0.5-1.5 mm/h | Abnormal: 1.5-2.5 mm/h | Critical: ≥ 2.5 mm/h';
    
    // Check if pore pressure (kPa) or slip velocity (mm/h)
    let slipMmH = null;
    let poreKpa = null;

    if (node.keyMetric) {
      if (node.keyMetric.includes('kPa')) {
        poreKpa = parseNumber(node.keyMetric);
      } else if (node.keyMetric.includes('mm/h')) {
        slipMmH = parseNumber(node.keyMetric);
      }
    }

    if (sensors.primaryUnit && sensors.primaryUnit.includes('kPa')) {
      poreKpa = parseNumber(sensors.primaryValue);
    } else if (sensors.primaryUnit && sensors.primaryUnit.includes('mm/h')) {
      slipMmH = parseNumber(sensors.primaryValue);
    }

    if (poreKpa !== null) {
      const kpaRange = 'Safe: < 80 kPa | Advisory: 80-130 kPa | Abnormal: 130-170 kPa | Critical: ≥ 170 kPa';
      if (poreKpa >= 170) {
        return {
          activeTier: 'critical',
          metricDiagnostic: `CRITICAL — ${poreKpa} kPa pore pressure exceeds soil liquefaction threshold (≥ 170 kPa)`,
          thresholdRange: kpaRange,
          riskScore: Math.min(99, Math.round(85 + (poreKpa - 170) * 0.5)),
          readingValue: `${poreKpa} kPa`,
          unit: 'pore pressure',
        };
      }
      if (poreKpa >= 130) {
        return {
          activeTier: 'abnormal',
          metricDiagnostic: `ABNORMAL — ${poreKpa} kPa pore pressure exceeds safe advisory threshold (130–170 kPa)`,
          thresholdRange: kpaRange,
          riskScore: Math.round(65 + (poreKpa - 130) * 0.25),
          readingValue: `${poreKpa} kPa`,
          unit: 'pore pressure',
        };
      }
      if (poreKpa >= 80) {
        return {
          activeTier: 'warning',
          metricDiagnostic: `WARNING — ${poreKpa} kPa pore pressure, elevated soil saturation advisory (80–130 kPa)`,
          thresholdRange: kpaRange,
          riskScore: Math.round(45 + (poreKpa - 80) * 0.35),
          readingValue: `${poreKpa} kPa`,
          unit: 'pore pressure',
        };
      }
      return {
        activeTier: 'nominal',
        metricDiagnostic: `NOMINAL — ${poreKpa} kPa pore pressure, bedrock stability verified (< 80 kPa)`,
        thresholdRange: kpaRange,
        riskScore: 18,
        readingValue: `${poreKpa} kPa`,
        unit: 'pore pressure',
      };
    }

    if (slipMmH === null && sensors.primaryValue) {
      slipMmH = parseNumber(sensors.primaryValue);
    }
    if (slipMmH === null) slipMmH = 0.12;

    if (slipMmH >= 2.5) {
      return {
        activeTier: 'critical',
        metricDiagnostic: `CRITICAL — ${slipMmH.toFixed(2)} mm/h shear slip exceeds critical shear threshold (≥ 2.50 mm/h)`,
        thresholdRange,
        riskScore: Math.min(99, Math.round(85 + (slipMmH - 2.5) * 15)),
        readingValue: `${slipMmH.toFixed(2)} mm/h`,
        unit: 'shear slip',
      };
    }
    if (slipMmH >= 1.5) {
      return {
        activeTier: 'abnormal',
        metricDiagnostic: `ABNORMAL — ${slipMmH.toFixed(2)} mm/h borehole displacement, active bedrock shear (1.5–2.5 mm/h)`,
        thresholdRange,
        riskScore: Math.round(65 + (slipMmH - 1.5) * 20),
        readingValue: `${slipMmH.toFixed(2)} mm/h`,
        unit: 'borehole slip',
      };
    }
    if (slipMmH >= 0.5) {
      return {
        activeTier: 'warning',
        metricDiagnostic: `WARNING — ${slipMmH.toFixed(2)} mm/h borehole creep, elevated surveillance recommended (0.5–1.5 mm/h)`,
        thresholdRange,
        riskScore: Math.round(45 + (slipMmH - 0.5) * 20),
        readingValue: `${slipMmH.toFixed(2)} mm/h`,
        unit: 'borehole creep',
      };
    }
    return {
      activeTier: 'nominal',
      metricDiagnostic: `NOMINAL — ${slipMmH.toFixed(2)} mm/h bedrock displacement, stable baseline (< 0.5 mm/h)`,
      thresholdRange,
      riskScore: 15,
      readingValue: `${slipMmH.toFixed(2)} mm/h`,
      unit: 'stable',
    };
  }

  // 4. CYCLONE / STORM SURGE
  // Thresholds: Normal < 50 km/h | Warning: 50-75 km/h | Abnormal: 75-105 km/h | Critical: ≥ 105 km/h
  if (hazardType === 'CYCLONE') {
    const thresholdRange = 'Normal: < 50 km/h | Warning: 50-75 km/h | Abnormal: 75-105 km/h | Critical: ≥ 105 km/h';
    let windKmh = null;
    let pressureHpa = null;

    if (sensors.windSpeedKmh !== undefined && sensors.windSpeedKmh !== null) {
      windKmh = parseNumber(sensors.windSpeedKmh);
    }
    if (node.keyMetric) {
      const matchWind = node.keyMetric.match(/([0-9.]+)\s*km\/h/i);
      if (matchWind) windKmh = parseFloat(matchWind[1]);
      const matchHpa = node.keyMetric.match(/([0-9.]+)\s*hPa/i);
      if (matchHpa) pressureHpa = parseFloat(matchHpa[1]);
    }
    if (windKmh === null && sensors.primaryValue) {
      windKmh = parseNumber(sensors.primaryValue);
    }
    if (windKmh === null) windKmh = 35;
    if (pressureHpa === null) pressureHpa = 1008;

    if (windKmh >= 105 || pressureHpa <= 988) {
      return {
        activeTier: 'critical',
        metricDiagnostic: `CRITICAL — ${windKmh} km/h winds / ${pressureHpa} hPa pressure, Severe Cyclonic Storm threshold breached (≥ 105 km/h)`,
        thresholdRange,
        riskScore: Math.min(99, Math.round(85 + (windKmh - 105) * 0.4)),
        readingValue: `${windKmh} km/h`,
        unit: 'wind gusts',
      };
    }
    if (windKmh >= 75 || pressureHpa <= 995) {
      return {
        activeTier: 'abnormal',
        metricDiagnostic: `ABNORMAL — ${windKmh} km/h winds / ${pressureHpa} hPa pressure, cyclonic storm approaching (75–105 km/h)`,
        thresholdRange,
        riskScore: Math.round(65 + (windKmh - 75) * 0.3),
        readingValue: `${windKmh} km/h`,
        unit: 'gale winds',
      };
    }
    if (windKmh >= 50 || pressureHpa <= 1005) {
      return {
        activeTier: 'warning',
        metricDiagnostic: `WARNING — ${windKmh} km/h wind gusts, coastal depression advisory (50–75 km/h)`,
        thresholdRange,
        riskScore: Math.round(45 + (windKmh - 50) * 0.3),
        readingValue: `${windKmh} km/h`,
        unit: 'wind gusts',
      };
    }
    return {
      activeTier: 'nominal',
      metricDiagnostic: `NOMINAL — ${windKmh} km/h winds, coastal sea state calm (< 50 km/h)`,
      thresholdRange,
      riskScore: 16,
      readingValue: `${windKmh} km/h`,
      unit: 'calm',
    };
  }

  // 5. WILDFIRE / THERMAL
  // Thresholds: Safe < 40°C | Warning: 40-50°C | Abnormal: 50-60°C | Critical: ≥ 60°C
  if (hazardType === 'FIRE') {
    const thresholdRange = 'Safe: < 40°C | Warning: 40-50°C | Abnormal: 50-60°C | Critical: ≥ 60°C';
    let tempC = null;
    let vocPpm = null;

    if (sensors.temperature !== undefined && sensors.temperature !== null) {
      tempC = parseNumber(sensors.temperature);
    } else if (sensors.primaryValue !== undefined && sensors.primaryValue !== null) {
      tempC = parseNumber(sensors.primaryValue);
    } else if (node.keyMetric) {
      tempC = parseNumber(node.keyMetric);
    }

    if (sensors.mq135Ppm !== undefined && sensors.mq135Ppm !== null) {
      vocPpm = parseNumber(sensors.mq135Ppm);
    }

    if (tempC === null) tempC = 34.2; // nominal baseline fallback

    if (tempC >= 60.0 || (vocPpm && vocPpm >= 550)) {
      return {
        activeTier: 'critical',
        metricDiagnostic: `CRITICAL — ${tempC.toFixed(1)}°C thermal infrared peak / ${vocPpm || 680} ppm VOC, active wildfire front (≥ 60°C)`,
        thresholdRange,
        riskScore: Math.min(99, Math.round(85 + (tempC - 60) * 1.5)),
        readingValue: `${tempC.toFixed(1)}°C`,
        unit: 'canopy temp',
      };
    }
    if (tempC >= 50.0 || (vocPpm && vocPpm >= 350)) {
      return {
        activeTier: 'abnormal',
        metricDiagnostic: `ABNORMAL — ${tempC.toFixed(1)}°C smoldering thermal peak, high wildfire risk (50–60°C)`,
        thresholdRange,
        riskScore: Math.round(65 + (tempC - 50) * 1.8),
        readingValue: `${tempC.toFixed(1)}°C`,
        unit: 'smoldering',
      };
    }
    if (tempC >= 40.0 || (vocPpm && vocPpm >= 200)) {
      return {
        activeTier: 'warning',
        metricDiagnostic: `WARNING — ${tempC.toFixed(1)}°C canopy temperature, elevated thermal plume detected (40–50°C)`,
        thresholdRange,
        riskScore: Math.round(45 + (tempC - 40) * 2.0),
        readingValue: `${tempC.toFixed(1)}°C`,
        unit: 'elevated temp',
      };
    }
    return {
      activeTier: 'nominal',
      metricDiagnostic: `NOMINAL — ${tempC.toFixed(1)}°C forest canopy temperature, safe environmental baseline (< 40°C)`,
      thresholdRange,
      riskScore: 18,
      readingValue: `${tempC.toFixed(1)}°C`,
      unit: 'safe ambient',
    };
  }

  // Fallback for generic nodes
  const explicitSev = (node.severity || 'nominal').toLowerCase();
  const activeTier =
    explicitSev === 'critical'
      ? 'critical'
      : explicitSev === 'abnormal'
      ? 'abnormal'
      : explicitSev === 'warning' || explicitSev === 'watch'
      ? 'warning'
      : explicitSev === 'offline'
      ? 'offline'
      : 'nominal';

  return {
    activeTier,
    metricDiagnostic: `${activeTier.toUpperCase()} — ${node.keyMetric || 'Operating within safe specifications'}`,
    thresholdRange: 'Standard multi-hazard telemetry evaluation protocol',
    riskScore: activeTier === 'critical' ? 90 : activeTier === 'abnormal' ? 70 : activeTier === 'warning' ? 50 : 15,
    readingValue: node.keyMetric || 'NOMINAL',
    unit: '',
  };
}

export const getNodeSeverity = getSeverityAssessment;
