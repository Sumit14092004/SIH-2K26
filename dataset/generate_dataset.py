import csv
import random
import math
from datetime import datetime, timedelta

def generate_environmental_dataset(num_samples=5000, random_seed=42):
    random.seed(random_seed)
    
    classes = [
        "NORMAL", 
        "FLASH_FLOOD", 
        "LANDSLIDE_PRECURSOR", 
        "WILDFIRE", 
        "HAZARDOUS_AIR_POLLUTION", 
        "WATER_CONTAMINATION"
    ]
    
    # Probabilities: 35% normal, 16% flood, 15% landslide, 12% wildfire, 11% air pollution, 11% water contamination
    p_weights = [35, 16, 15, 12, 11, 11]
    hazard_pool = []
    for code, weight in enumerate(p_weights):
        hazard_pool.extend([code] * weight)
        
    start_time = datetime(2026, 9, 1, 0, 0, 0)
    
    fieldnames = [
        "timestamp",
        "node_id",
        "temperature_c",
        "humidity_pct",
        "heat_index_c",
        "pressure_hpa",
        "altitude_m",
        "accel_x",
        "accel_y",
        "accel_z",
        "accel_total",
        "seismic_dev",
        "mq135_raw",
        "co2_eq_ppm",
        "soil_raw",
        "soil_moisture_pct",
        "tds_raw",
        "tds_ppm",
        "rain_raw",
        "rain_wetness_pct",
        "distance_cm",
        "water_rate_cm_min",
        "pir_motion",
        "hazard_code",
        "hazard_label",
        "severity",
        "risk_score",
        "confidence_pct"
    ]
    
    rows = []
    
    for i in range(num_samples):
        h_code = random.choice(hazard_pool)
        h_label = classes[h_code]
        ts = (start_time + timedelta(seconds=i * 5)).strftime("%Y-%m-%d %H:%M:%S")
        
        # 0: NORMAL BASELINE (Indoors / Clear Weather / Standard Operations)
        if h_code == 0:
            temp = random.gauss(27.5, 1.8)
            hum = random.gauss(52.0, 4.5)
            pres = random.gauss(1001.0, 1.2)
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            ax = random.gauss(1.05, 0.08)
            ay = random.gauss(-0.18, 0.06)
            az = random.gauss(10.75, 0.12)
            
            mq_raw = int(min(25, max(0, random.expovariate(1.0 / 4.0))))
            mq_ppm = 400 + int(mq_raw * 3.5)
            
            soil_raw = int(min(4095, max(3800, random.gauss(4050, 35))))
            soil_pct = max(0, int((4095 - soil_raw) / (4095 - 1300) * 100))
            
            tds_raw = int(min(35, max(0, random.gauss(10, 6))))
            tds_ppm = max(0.0, round(tds_raw * 1.5, 1))
            
            rain_raw = int(min(4095, max(3950, random.gauss(4070, 20))))
            rain_pct = max(0, int((4095 - rain_raw) / (4095 - 1200) * 100))
            
            dist_cm = round(min(220.0, max(160.0, random.gauss(182.0, 7.0))), 1)
            dist_rate = round(random.gauss(0.0, 0.15), 2)
            pir_active = 1 if random.random() < 0.08 else 0
            
            severity = "None"
            risk_score = round(random.uniform(2.0, 18.0), 1)
            confidence = round(random.uniform(92.0, 99.0), 1)

        # 1: FLASH FLOOD / INUNDATION (Severe Monsoon / River Overflow / Cloudburst)
        elif h_code == 1:
            temp = random.gauss(23.0, 1.2)
            hum = min(99.0, max(85.0, random.gauss(93.0, 3.0)))
            pres = random.gauss(988.0, 2.5) # Depressive storm trough
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            ax = random.gauss(1.10, 0.14)
            ay = random.gauss(-0.20, 0.14)
            az = random.gauss(10.80, 0.18)
            
            mq_raw = int(min(40, max(0, random.gauss(14, 5))))
            mq_ppm = 400 + int(mq_raw * 3.5)
            
            # Ground saturated
            soil_raw = int(min(1600, max(1150, random.gauss(1350, 60))))
            soil_pct = max(0, min(100, int((4095 - soil_raw) / (4095 - 1300) * 100)))
            
            # Silt and runoff ions
            tds_raw = int(min(500, max(180, random.gauss(320, 50))))
            tds_ppm = round(float(tds_raw * 1.8), 1)
            
            # Heavy rain on plate
            rain_raw = int(min(1600, max(900, random.gauss(1250, 75))))
            rain_pct = max(0, min(100, int((4095 - rain_raw) / (4095 - 1200) * 100)))
            
            # Rapid water cresting towards ultrasonic sensor
            dist_cm = round(min(95.0, max(15.0, random.gauss(45.0, 18.0))), 1)
            dist_rate = round(random.gauss(-12.5, 3.5), 2)
            pir_active = 1 if random.random() < 0.35 else 0
            
            severity = "Severe" if dist_cm > 30 else "Extreme"
            risk_score = round(min(99.5, max(75.0, 80.0 + (100.0 - dist_cm) * 0.2)), 1)
            confidence = round(random.uniform(88.0, 97.5), 1)

        # 2: LANDSLIDE PRECURSOR / GROUND SLIP (Wayanad / Chamoli Steep Slopes)
        elif h_code == 2:
            temp = random.gauss(22.0, 1.8)
            hum = min(98.0, max(80.0, random.gauss(88.0, 3.5)))
            pres = random.gauss(992.0, 2.2)
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            tilt_shift = random.choice([-1, 1]) * random.uniform(2.5, 6.0)
            ax = random.gauss(1.05 + tilt_shift, 0.7)
            ay = random.gauss(-0.18 + (tilt_shift * 0.5), 0.6)
            az = random.gauss(10.75, 1.1)
            
            mq_raw = int(min(35, max(0, random.gauss(12, 4))))
            mq_ppm = 400 + int(mq_raw * 3.5)
            
            # Saturated liquefaction soil (> 75%)
            soil_raw = int(min(1450, max(1100, random.gauss(1280, 45))))
            soil_pct = max(0, min(100, int((4095 - soil_raw) / (4095 - 1300) * 100)))
            
            tds_raw = int(min(380, max(80, random.gauss(220, 40))))
            tds_ppm = round(float(tds_raw * 1.6), 1)
            
            rain_raw = int(min(2200, max(1100, random.gauss(1600, 140))))
            rain_pct = max(0, min(100, int((4095 - rain_raw) / (4095 - 1200) * 100)))
            
            dist_cm = round(min(180.0, max(80.0, random.gauss(130.0, 22.0))), 1)
            dist_rate = round(random.gauss(-4.0, 2.0), 2)
            pir_active = 1 if random.random() < 0.20 else 0
            
            severity = "Extreme"
            risk_score = round(random.uniform(85.0, 99.0), 1)
            confidence = round(random.uniform(86.0, 96.5), 1)

        # 3: WILDFIRE PRE-IGNITION / DRY HEAT (Himachal / Uttarakhand Forest Edge)
        elif h_code == 3:
            temp = random.gauss(41.5, 2.2) # High dry heat
            hum = max(10.0, min(28.0, random.gauss(18.0, 3.0))) # Ultra dry
            pres = random.gauss(997.0, 1.8)
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            ax = random.gauss(1.05, 0.08)
            ay = random.gauss(-0.18, 0.07)
            az = random.gauss(10.75, 0.09)
            
            # Smoke, CO, and VOC elevation
            mq_raw = int(min(260, max(65, random.gauss(120, 30))))
            mq_ppm = 400 + int(mq_raw * 8.5)
            
            soil_raw = int(min(4095, max(4060, random.gauss(4085, 8))))
            soil_pct = max(0, int((4095 - soil_raw) / (4095 - 1300) * 100))
            
            tds_raw = int(min(20, max(0, random.gauss(5, 4))))
            tds_ppm = max(0.0, round(tds_raw * 1.5, 1))
            
            rain_raw = 4095
            rain_pct = 0
            
            dist_cm = round(min(200.0, max(175.0, random.gauss(188.0, 4.0))), 1)
            dist_rate = 0.0
            pir_active = 1 if random.random() < 0.15 else 0
            
            severity = "Severe" if temp < 42 else "Extreme"
            risk_score = round(min(98.0, max(75.0, 78.0 + (temp - 38.0) * 3.5)), 1)
            confidence = round(random.uniform(87.0, 98.0), 1)

        # 4: HAZARDOUS AIR POLLUTION / TOXIC INVERSION (Delhi NCR Smog / Industrial Leaks)
        elif h_code == 4:
            temp = random.gauss(26.0, 2.5)
            hum = random.gauss(62.0, 6.0)
            pres = random.gauss(1006.0, 1.8) # Trapped winter inversion
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            ax = random.gauss(1.05, 0.07)
            ay = random.gauss(-0.18, 0.05)
            az = random.gauss(10.75, 0.10)
            
            # Toxic VOC / Solvent / Smog plume
            mq_raw = int(min(340, max(85, random.gauss(160, 40))))
            mq_ppm = 400 + int(mq_raw * 12.0)
            
            soil_raw = int(min(4080, max(3850, random.gauss(3980, 45))))
            soil_pct = max(0, int((4095 - soil_raw) / (4095 - 1300) * 100))
            
            tds_raw = int(min(45, max(0, random.gauss(15, 8))))
            tds_ppm = max(0.0, round(tds_raw * 1.5, 1))
            
            rain_raw = int(min(4095, max(3980, random.gauss(4060, 20))))
            rain_pct = max(0, int((4095 - rain_raw) / (4095 - 1200) * 100))
            
            dist_cm = round(min(195.0, max(165.0, random.gauss(180.0, 5.0))), 1)
            dist_rate = 0.0
            pir_active = 1 if random.random() < 0.40 else 0
            
            severity = "Severe" if mq_raw < 180 else "Extreme"
            risk_score = round(min(99.0, max(70.0, 72.0 + mq_raw * 0.12)), 1)
            confidence = round(random.uniform(90.0, 98.5), 1)

        # 5: WATER CONTAMINATION / DISSOLVED TOXINS (Chemical Effluent / Post-Flood Runoff)
        elif h_code == 5:
            temp = random.gauss(25.0, 1.8)
            hum = random.gauss(68.0, 5.0)
            pres = random.gauss(1001.0, 1.8)
            alt = 110.0 + (1013.25 - pres) * 8.43
            
            ax = random.gauss(1.05, 0.07)
            ay = random.gauss(-0.18, 0.05)
            az = random.gauss(10.75, 0.09)
            
            mq_raw = int(min(55, max(5, random.gauss(20, 7))))
            mq_ppm = 400 + int(mq_raw * 4.0)
            
            soil_raw = int(min(2500, max(1400, random.gauss(1900, 180))))
            soil_pct = max(0, min(100, int((4095 - soil_raw) / (4095 - 1300) * 100)))
            
            # Massive spike in TDS: contaminated water supply (> 500 - 1500 ppm)
            tds_raw = int(min(980, max(350, random.gauss(620, 110))))
            tds_ppm = round(float(tds_raw * 1.95), 1)
            
            rain_raw = int(min(4095, max(2000, random.gauss(3200, 350))))
            rain_pct = max(0, min(100, int((4095 - rain_raw) / (4095 - 1200) * 100)))
            
            dist_cm = round(min(130.0, max(30.0, random.gauss(70.0, 18.0))), 1)
            dist_rate = round(random.gauss(-1.5, 0.8), 2)
            pir_active = 1 if random.random() < 0.25 else 0
            
            severity = "Moderate" if tds_ppm < 750 else "Severe"
            risk_score = round(min(96.0, max(65.0, 65.0 + (tds_ppm / 1500.0) * 30.0)), 1)
            confidence = round(random.uniform(85.0, 95.0), 1)

        accel_total = round(math.sqrt(ax**2 + ay**2 + az**2), 2)
        seismic_dev = round(abs(accel_total - 9.81), 2)
        
        # Heat Index approximation formula
        heat_index = round(temp + 0.33 * (hum / 100.0 * 6.105 * math.exp(17.27 * temp / (237.7 + temp))) - 0.70 * 0.5 - 4.0, 1)
        heat_index = max(temp, heat_index)
        
        rows.append({
            "timestamp": ts,
            "node_id": "IN-DELHI-01",
            "temperature_c": round(temp, 1),
            "humidity_pct": round(hum, 1),
            "heat_index_c": round(heat_index, 1),
            "pressure_hpa": round(pres, 1),
            "altitude_m": round(alt, 1),
            "accel_x": round(ax, 2),
            "accel_y": round(ay, 2),
            "accel_z": round(az, 2),
            "accel_total": accel_total,
            "seismic_dev": seismic_dev,
            "mq135_raw": mq_raw,
            "co2_eq_ppm": mq_ppm,
            "soil_raw": soil_raw,
            "soil_moisture_pct": soil_pct,
            "tds_raw": tds_raw,
            "tds_ppm": tds_ppm,
            "rain_raw": rain_raw,
            "rain_wetness_pct": rain_pct,
            "distance_cm": dist_cm,
            "water_rate_cm_min": dist_rate,
            "pir_motion": pir_active,
            "hazard_code": h_code,
            "hazard_label": h_label,
            "severity": severity,
            "risk_score": risk_score,
            "confidence_pct": confidence
        })
        
    return fieldnames, rows

if __name__ == "__main__":
    out_csv = "/Users/sumitpandey/Desktop/SIH2026/dataset/environmental_multihazard_dataset.csv"
    fields, records = generate_environmental_dataset(num_samples=5000)
    with open(out_csv, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(records)
    print(f"Successfully generated {len(records)} samples saved to {out_csv}")
