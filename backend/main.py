import os
import sys
import json
import time
import math

# Force UTF-8 for console output on Windows to prevent charmap crashes
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from contextlib import asynccontextmanager
import pytz
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, Query, Path, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import paho.mqtt.client as mqtt

# Load environment variables
load_dotenv()

# ==========================================
# 1. Configuration & Constants
# ==========================================
MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))

# Topic Subscriptions
MQTT_WILDCARD_TOPIC = "sih/#"
SENSOR_TELEMETRY_TOPIC = "sih/nodes/{node_id}/telemetry"
SENSOR_ALERT_TOPIC = "sih/nodes/{node_id}/alert"
SENSOR_HEALTH_TOPIC = "sih/nodes/{node_id}/health"
LEGACY_SENSOR_TOPIC = "sih/sensors"
LEGACY_TRIGGER_TOPIC = "sih/edge_nodes/trigger"

# Publish Topics
NDMA_DASHBOARD_TOPIC = "sih/dashboard/ndma_alerts"
NODE_STATUS_TOPIC = "sih/dashboard/node_status"

# InfluxDB Configuration
INFLUXDB_URL = os.getenv("INFLUXDB_URL", "http://localhost:8086")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN", "sih_super_secret_admin_token_2026")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG", "sih_team")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET", "sensor_data")

# Twilio SMS Configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
ALERT_RECIPIENT_PHONE = os.getenv("ALERT_RECIPIENT_PHONE") or os.getenv("ALERT_PHONE_NUMBER", "")
ALERT_PHONE_NUMBER = ALERT_RECIPIENT_PHONE  # Backward compatibility alias

# Evaluation Thresholds
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", 70.0))
SMS_COOLDOWN_SECONDS = int(os.getenv("SMS_COOLDOWN_SECONDS", 900))       # 15 minutes
CORRELATION_WINDOW_SECONDS = int(os.getenv("CORRELATION_WINDOW_SECONDS", 300)) # 5 minutes
CORRELATION_RADIUS_KM = float(os.getenv("CORRELATION_RADIUS_KM", 15.0))
HEARTBEAT_TIMEOUT_SECONDS = int(os.getenv("HEARTBEAT_TIMEOUT_SECONDS", 90)) # 3 missed 30s heartbeats

IST = pytz.timezone("Asia/Kolkata")

# ==========================================
# 2. InfluxDB Time-Series Client
# ==========================================
class DatabaseManager:
    """Manages writing and querying time-series data from InfluxDB 2.7 with graceful in-memory fallback."""
    def __init__(self):
        self.client = None
        self.write_api = None
        self.query_api = None
        self.connected = False
        self.in_memory_telemetry: Dict[str, List[dict]] = {}
        self.init_client()

    def init_client(self):
        try:
            from influxdb_client import InfluxDBClient
            from influxdb_client.client.write_api import SYNCHRONOUS
            self.client = InfluxDBClient(
                url=INFLUXDB_URL,
                token=INFLUXDB_TOKEN,
                org=INFLUXDB_ORG,
                timeout=3000
            )
            # Test ping
            health = self.client.health()
            if health and health.status == "pass":
                self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
                self.query_api = self.client.query_api()
                self.connected = True
                print(f"[DATABASE] Connected successfully to InfluxDB at {INFLUXDB_URL} (bucket: {INFLUXDB_BUCKET})")
            else:
                print(f"[DATABASE] InfluxDB health check not ready. Fallback to resilient in-memory ring-buffer.")
        except Exception as e:
            print(f"[DATABASE] InfluxDB connection skipped ({e}). Using in-memory time-series store.")
            self.connected = False

    def write_telemetry(self, node_id: str, lat: float, lon: float, sensors: dict, timestamp: str):
        record = {
            "node_id": node_id,
            "timestamp": timestamp,
            "lat": lat,
            "lon": lon,
            "sensors": sensors
        }
        # In-memory buffer
        if node_id not in self.in_memory_telemetry:
            self.in_memory_telemetry[node_id] = []
        self.in_memory_telemetry[node_id].insert(0, record)
        if len(self.in_memory_telemetry[node_id]) > 500:
            self.in_memory_telemetry[node_id].pop()

        # InfluxDB write
        if self.connected and self.write_api:
            try:
                from influxdb_client import Point
                point = Point("environmental_telemetry") \
                    .tag("node_id", node_id) \
                    .field("lat", float(lat)) \
                    .field("lon", float(lon))
                
                for key, val in sensors.items():
                    if val is not None and isinstance(val, (int, float)):
                        point.field(key, float(val))
                
                self.write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
            except Exception as e:
                print(f"[DATABASE ERROR] Influx write failure: {e}")

    def query_history(self, node_id: str, range_str: str = "24h") -> List[dict]:
        if self.connected and self.query_api:
            try:
                query = f'''
                from(bucket: "{INFLUXDB_BUCKET}")
                  |> range(start: -{range_str})
                  |> filter(fn: (r) => r["_measurement"] == "environmental_telemetry")
                  |> filter(fn: (r) => r["node_id"] == "{node_id}")
                  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
                  |> sort(columns: ["_time"], desc: true)
                  |> limit(n: 100)
                '''
                tables = self.query_api.query(query, org=INFLUXDB_ORG)
                results = []
                for table in tables:
                    for record in table.records:
                        values = record.values
                        sensors = {k: v for k, v in values.items() if k not in ("_start", "_stop", "_time", "_measurement", "node_id", "result", "table", "lat", "lon")}
                        results.append({
                            "node_id": node_id,
                            "timestamp": record.get_time().isoformat(),
                            "lat": values.get("lat"),
                            "lon": values.get("lon"),
                            "sensors": sensors
                        })
                if results:
                    return results
            except Exception as e:
                print(f"[DATABASE QUERY ERROR] Falling back to memory: {e}")

        # In-memory fallback
        return self.in_memory_telemetry.get(node_id, [])

db_manager = DatabaseManager()

# ==========================================
# 3. Node Registry & Heartbeat Health Monitor
# ==========================================
class NodeRegistry:
    """Tracks state, GPS, battery %, signal strength, and offline detection for all nodes."""
    def __init__(self):
        self.nodes: Dict[str, dict] = {
            "NODE_FOREST_01": {
                "node_id": "NODE_FOREST_01",
                "name": "Simlipal Core Reserve Node 1",
                "lat": 21.6833,
                "lon": 86.3500,
                "region": "Simlipal, Odisha",
                "battery_pct": 92.0,
                "rssi_dbm": -68,
                "uptime_seconds": 14200,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 32.4,
                    "humidity": 45.0,
                    "mq135_ppm": 210,
                    "pm25": 48.0,
                    "soil_moisture": 35.0,
                    "water_level_cm": 15.0,
                    "vibration_g": 0.02
                }
            },
            "NODE_FOREST_02": {
                "node_id": "NODE_FOREST_02",
                "name": "Jim Corbett Wildfire Watch",
                "lat": 29.5300,
                "lon": 78.7747,
                "region": "Nainital, Uttarakhand",
                "battery_pct": 89.0,
                "rssi_dbm": -71,
                "uptime_seconds": 18900,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 34.1,
                    "humidity": 38.0,
                    "mq135_ppm": 240,
                    "pm25": 54.0,
                    "soil_moisture": 28.0,
                    "water_level_cm": 12.0,
                    "vibration_g": 0.01
                }
            },
            "NODE_RIVER_01": {
                "node_id": "NODE_RIVER_01",
                "name": "Brahmaputra Flood Gauge Node 1",
                "lat": 26.1850,
                "lon": 91.7450,
                "region": "Guwahati, Assam",
                "battery_pct": 95.0,
                "rssi_dbm": -65,
                "uptime_seconds": 28400,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 27.5,
                    "humidity": 78.0,
                    "water_level_cm": 120.0,
                    "rainfall_intensity": 12.0,
                    "turbidity_ntu": 18.0
                }
            },
            "NODE_RIVER_02": {
                "node_id": "NODE_RIVER_02",
                "name": "Kosi River Embankment Monitor",
                "lat": 26.1260,
                "lon": 86.6050,
                "region": "Supaul, Bihar",
                "battery_pct": 91.0,
                "rssi_dbm": -69,
                "uptime_seconds": 22100,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 29.0,
                    "humidity": 82.0,
                    "water_level_cm": 135.0,
                    "rainfall_intensity": 25.0,
                    "turbidity_ntu": 32.0
                }
            },
            "NODE_HILL_01": {
                "node_id": "NODE_HILL_01",
                "name": "Shimla Ridge Landslide Radar",
                "lat": 31.1048,
                "lon": 77.1734,
                "region": "Shimla, Himachal Pradesh",
                "battery_pct": 86.0,
                "rssi_dbm": -74,
                "uptime_seconds": 16400,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 18.5,
                    "humidity": 65.0,
                    "vibration_g": 0.04,
                    "soil_moisture": 42.0,
                    "tilt_angle_deg": 4.2
                }
            },
            "NODE_HILL_02": {
                "node_id": "NODE_HILL_02",
                "name": "Wayanad Slope Stability Node",
                "lat": 11.6854,
                "lon": 76.1320,
                "region": "Wayanad, Kerala",
                "battery_pct": 93.0,
                "rssi_dbm": -67,
                "uptime_seconds": 31000,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 23.2,
                    "humidity": 88.0,
                    "vibration_g": 0.05,
                    "soil_moisture": 62.0,
                    "rainfall_intensity": 38.0
                }
            },
            "NODE_URBAN_01": {
                "node_id": "NODE_URBAN_01",
                "name": "Anand Vihar Hazardous Air Node",
                "lat": 28.6469,
                "lon": 77.3160,
                "region": "Delhi NCR",
                "battery_pct": 98.0,
                "rssi_dbm": -58,
                "uptime_seconds": 45000,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 36.5,
                    "humidity": 32.0,
                    "pm25": 145.0,
                    "pm10": 210.0,
                    "mq135_ppm": 380.0
                }
            },
            "NODE_COAST_01": {
                "node_id": "NODE_COAST_01",
                "name": "Sundarbans Storm Surge Sensor",
                "lat": 21.9497,
                "lon": 89.1833,
                "region": "Sundarbans, West Bengal",
                "battery_pct": 84.0,
                "rssi_dbm": -76,
                "uptime_seconds": 11200,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "latest_sensors": {
                    "temperature": 30.1,
                    "humidity": 86.0,
                    "water_level_cm": 95.0,
                    "turbidity_ntu": 45.0,
                    "wind_speed_kmh": 42.0
                }
            }
        }

    def update_health(self, node_id: str, data: dict):
        current_time = datetime.now(IST).isoformat()
        if node_id not in self.nodes:
            self.nodes[node_id] = {
                "node_id": node_id,
                "name": f"Discovered Sensor Node ({node_id})",
                "lat": data.get("lat", 20.5937),
                "lon": data.get("lon", 78.9629),
                "region": data.get("region", "India Sector"),
                "latest_sensors": {}
            }
        node = self.nodes[node_id]
        node["battery_pct"] = data.get("battery_pct", node.get("battery_pct", 100))
        node["rssi_dbm"] = data.get("rssi_dbm", node.get("rssi_dbm", -70))
        node["uptime_seconds"] = data.get("uptime_seconds", node.get("uptime_seconds", 0))
        node["last_seen"] = current_time
        node["status"] = "online"

    def update_telemetry(self, node_id: str, data: dict):
        current_time = data.get("timestamp") or datetime.now(IST).isoformat()
        if node_id not in self.nodes:
            self.nodes[node_id] = {
                "node_id": node_id,
                "name": f"Sensor Node ({node_id})",
                "lat": data.get("lat", 20.5937),
                "lon": data.get("lon", 78.9629),
                "region": data.get("region", "Unassigned Zone"),
                "battery_pct": 90.0,
                "rssi_dbm": -70,
                "uptime_seconds": 0
            }
        node = self.nodes[node_id]
        if "lat" in data and data["lat"]:
            node["lat"] = float(data["lat"])
        if "lon" in data and data["lon"]:
            node["lon"] = float(data["lon"])
        node["last_seen"] = current_time
        node["status"] = "online"
        
        sensors = data.get("sensors", {})
        if not sensors:
            sensors = {k: v for k, v in data.items() if k not in ("node_id", "timestamp", "lat", "lon", "hazard", "confidence", "location", "region")}
        node["latest_sensors"] = sensors

    def get_all(self) -> List[dict]:
        now = datetime.now(IST)
        result = []
        for nid, node in self.nodes.items():
            last_dt = datetime.fromisoformat(node["last_seen"]) if isinstance(node["last_seen"], str) else node["last_seen"]
            if last_dt.tzinfo is None:
                last_dt = IST.localize(last_dt)
            seconds_since = (now - last_dt).total_seconds()
            
            # Check for silent offline failure (Qualcomm Section 1.1)
            if seconds_since > HEARTBEAT_TIMEOUT_SECONDS:
                node["status"] = "offline"
                node["missed_heartbeats"] = int(seconds_since // 30)
            else:
                node["status"] = "online"
                node["missed_heartbeats"] = 0
            
            result.append(node)
        return result

    def get(self, node_id: str) -> Optional[dict]:
        for node in self.get_all():
            if node["node_id"] == node_id:
                return node
        return None

node_registry = NodeRegistry()

# ==========================================
# 4. Multi-Hazard Alert & NDMA CAP Engine
# ==========================================
class HazardDefinition:
    FOREST_FIRE = "forest_fire"
    FLASH_FLOOD = "flash_flood"
    AIR_POLLUTION = "hazardous_air_pollution"
    EXTREME_HEAT = "extreme_heat"
    LANDSLIDE = "landslide"
    CHEMICAL_LEAK = "industrial_chemical_leak"
    WATER_QUALITY = "water_quality_degradation"
    RESCUE = "search_and_rescue_motion"

# Normalize various aliases into the official 7 hazard types
HAZARD_ALIASES = {
    "fire": HazardDefinition.FOREST_FIRE,
    "forest_fire": HazardDefinition.FOREST_FIRE,
    "flood": HazardDefinition.FLASH_FLOOD,
    "flash_flood": HazardDefinition.FLASH_FLOOD,
    "pollution": HazardDefinition.AIR_POLLUTION,
    "air_pollution": HazardDefinition.AIR_POLLUTION,
    "pm25": HazardDefinition.AIR_POLLUTION,
    "heat": HazardDefinition.EXTREME_HEAT,
    "extreme_heat": HazardDefinition.EXTREME_HEAT,
    "landslide": HazardDefinition.LANDSLIDE,
    "chemical": HazardDefinition.CHEMICAL_LEAK,
    "chemical_leak": HazardDefinition.CHEMICAL_LEAK,
    "industrial": HazardDefinition.CHEMICAL_LEAK,
    "water": HazardDefinition.WATER_QUALITY,
    "water_quality": HazardDefinition.WATER_QUALITY,
    "rescue": HazardDefinition.RESCUE,
    "pir": HazardDefinition.RESCUE,
    "human_presence": HazardDefinition.RESCUE
}

# 4-Tier Warning Levels
WARNING_LEVELS = ["Advisory", "Watch", "Warning", "Emergency"]

def compute_warning_tier(hazard: str, confidence: float, sensors: dict) -> str:
    """Calculates prioritized 4-tier warning level (Advisory -> Watch -> Warning -> Emergency)"""
    if confidence >= 92.0:
        return "Warning"
    elif confidence >= 80.0:
        return "Watch"
    else:
        return "Advisory"

def generate_ndma_cap_alert(node_id: str, raw_hazard: str, confidence: float, payload: dict) -> dict:
    """
    Generates standard Common Alerting Protocol (CAP 1.2) message
    covering all 7 Qualcomm hazard categories.
    """
    hazard = HAZARD_ALIASES.get(raw_hazard.lower().strip(), raw_hazard.lower())
    now_ist = datetime.now(IST)
    current_time = now_ist.isoformat()
    alert_id = f"NDMA-{node_id}-{int(now_ist.timestamp())}"
    
    sensors = payload.get("sensors", {})
    if not sensors:
        sensors = {k: v for k, v in payload.items() if k not in ("node_id", "timestamp", "lat", "lon", "hazard", "confidence", "location", "region")}

    warning_tier = compute_warning_tier(hazard, confidence, sensors)
    
    node_meta = node_registry.get(node_id) or {}
    lat = payload.get("lat") or node_meta.get("lat", 21.6833)
    lon = payload.get("lon") or node_meta.get("lon", 86.3500)
    region_name = payload.get("location") or payload.get("region") or node_meta.get("region", "Designated Sensor Sector")

    # Base CAP schema
    alert = {
        "identifier": alert_id,
        "sender": "SIH-Environmental-Intelligence-Network/NDMA",
        "sent": current_time,
        "status": "Actual",
        "msgType": "Alert",
        "scope": "Public",
        "warning_tier": warning_tier,     # Advisory | Watch | Warning | Emergency
        "hazard_type": hazard,
        "confidence": confidence,
        "node_id": node_id,
        "lat": lat,
        "lon": lon,
        "acknowledged": False,
        "acknowledged_at": None,
        "acknowledged_by": None,
        "info": {
            "category": "Env",
            "event": "Environmental Anomaly",
            "urgency": "Expected",
            "severity": "Moderate",
            "certainty": "Possible",
            "headline": f"Environmental alert triggered at {node_id}",
            "description": f"Sensor anomaly reported with {confidence}% AI confidence.",
            "instruction": "Monitor status via local emergency management dashboard.",
            "area": {
                "areaDesc": region_name,
                "circle": f"{lat},{lon},5.0" # 5km radius
            },
            "parameters": sensors
        }
    }

    info = alert["info"]

    # 1. Forest Fire
    if hazard == HazardDefinition.FOREST_FIRE:
        info["category"] = "Env"
        info["event"] = "Forest Fire Precursor / Wildfire"
        info["urgency"] = "Immediate"
        info["severity"] = "Severe"
        info["certainty"] = "Observed" if confidence >= 85 else "Likely"
        info["headline"] = f"CRITICAL FIRE WARNING: High combustion risk detected near {node_id} ({region_name})"
        info["description"] = (
            f"Edge TinyML model detected {confidence}% probability of active or impending fire. "
            f"BME680 VOC sensors & MQ-135 recorded gas spike ({sensors.get('mq135_ppm', 'N/A')} ppm) "
            f"with ambient temperature at {sensors.get('temperature', 'N/A')}°C and humidity at {sensors.get('humidity', 'N/A')}%."
        )
        info["instruction"] = "Deploy rapid forestry quick-response units. Establish firebreaks and prepare 2km radius evacuation."

    # 2. Flash Flood
    elif hazard == HazardDefinition.FLASH_FLOOD:
        info["category"] = "Met"
        info["event"] = "Flash Flood / Rapid River Inundation"
        info["urgency"] = "Immediate"
        info["severity"] = "Extreme" if sensors.get("water_level_cm", 0) > 150 else "Severe"
        info["certainty"] = "Observed"
        info["headline"] = f"FLASH FLOOD ALERT: Rapid water level surge at {node_id} ({region_name})"
        info["description"] = (
            f"HC-SR04 ultrasonic sensor and raindrop detector confirm critical flood conditions ({confidence}% confidence). "
            f"Water level: {sensors.get('water_level_cm', 'N/A')} cm, rainfall rate: {sensors.get('rainfall_intensity', 'N/A')} mm/hr."
        )
        info["instruction"] = "Sound village flood sirens. Order immediate evacuation of low-lying riverbanks to elevated shelters."

    # 3. Hazardous Air Pollution
    elif hazard == HazardDefinition.AIR_POLLUTION:
        info["category"] = "Env"
        info["event"] = "Severe Hazardous Air Pollution Episode"
        info["urgency"] = "Expected"
        info["severity"] = "Severe"
        info["certainty"] = "Observed"
        info["headline"] = f"AIR QUALITY EMERGENCY: Dangerous PM2.5/PM10 spike at {node_id} ({region_name})"
        info["description"] = (
            f"PMS5003 laser sensor recorded PM2.5: {sensors.get('pm25', 'N/A')} µg/m³, PM10: {sensors.get('pm10', 'N/A')} µg/m³. "
            f"AQI is in the 'Severe' category, posing grave respiratory hazards."
        )
        info["instruction"] = "Issue citizen health advisory. Halt non-essential industrial activity and construction. Advise N95 mask usage."

    # 4. Extreme Heat
    elif hazard == HazardDefinition.EXTREME_HEAT:
        info["category"] = "Met"
        info["event"] = "Extreme Heatwave Anomaly"
        info["urgency"] = "Expected"
        info["severity"] = "Severe"
        info["certainty"] = "Observed"
        info["headline"] = f"HEATWAVE WARNING: Temperature exceeding critical threshold at {node_id} ({region_name})"
        info["description"] = f"BME680 sensor recorded sustained temperature of {sensors.get('temperature', 'N/A')}°C. Risk of heatstroke and grid strain."
        info["instruction"] = "Open public cooling centers. Ensure municipal water supplies and emergency medical readiness."

    # 5. Landslide
    elif hazard == HazardDefinition.LANDSLIDE:
        info["category"] = "Geo"
        info["event"] = "Imminent Landslide / Slope Failure"
        info["urgency"] = "Immediate"
        info["severity"] = "Extreme"
        info["certainty"] = "Observed"
        info["headline"] = f"EXTREME LANDSLIDE WARNING: Critical slope vibration and soil saturation at {node_id} ({region_name})"
        info["description"] = (
            f"MPU6050 accelerometer recorded vibration anomaly ({sensors.get('vibration_g', 'N/A')}g) "
            f"with soil saturation at {sensors.get('soil_moisture', 'N/A')}%. High risk of structural slope collapse."
        )
        info["instruction"] = "Close vulnerable mountain roads and highways. Evacuate downstream settlements immediately."

    # 6. Industrial Emission / Chemical Leak
    elif hazard == HazardDefinition.CHEMICAL_LEAK:
        info["category"] = "Safety"
        info["event"] = "Hazardous Chemical / Toxic Gas Leak"
        info["urgency"] = "Immediate"
        info["severity"] = "Severe"
        info["certainty"] = "Observed"
        info["headline"] = f"TOXIC GAS RELEASE WARNING: Abnormal chemical concentration detected at {node_id} ({region_name})"
        info["description"] = (
            f"MQ-135 sensor detected dangerous toxic gas concentration ({sensors.get('mq135_ppm', 'N/A')} ppm) "
            f"with VOC index {sensors.get('voc_iaq', 'N/A')}. Potential industrial breach."
        )
        info["instruction"] = "Dispatch HAZMAT units with SCBA equipment. Order upwind evacuation for nearby residents."

    # 7. Water Quality Degradation
    elif hazard == HazardDefinition.WATER_QUALITY:
        info["category"] = "Env"
        info["event"] = "Water Quality Contamination"
        info["urgency"] = "Expected"
        info["severity"] = "Moderate"
        info["certainty"] = "Likely"
        info["headline"] = f"WATER CONTAMINATION WARNING: High turbidity recorded at {node_id} ({region_name})"
        info["description"] = f"Turbidity sensor measured {sensors.get('turbidity_ntu', 'N/A')} NTU, indicating runoff sediment or contamination."
        info["instruction"] = "Shut down municipal intake pumps from this source. Conduct lab testing before resuming supply."

    # Search & Rescue bonus
    elif hazard == HazardDefinition.RESCUE:
        info["category"] = "Safety"
        info["event"] = "Human Presence in Hazard Zone"
        info["urgency"] = "Immediate"
        info["severity"] = "Severe"
        info["certainty"] = "Observed"
        info["headline"] = f"SEARCH & RESCUE TRIGGER: Human motion detected in restricted perimeter near {node_id}"
        info["description"] = "PIR infrared sensor registered movement inside an active disaster evacuation zone."
        info["instruction"] = "Dispatch drone reconnaissance / rescue teams to GPS coordinates."

    return alert

# ==========================================
# 5. Spatial-Temporal Cross-Node Correlation Engine
# ==========================================
def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Computes great-circle distance between two GPS coordinates in kilometers."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class CorrelationEngine:
    """
    Maintains a 5-minute sliding window of alerts.
    If >= 2 nodes in the same geographic cluster (<= 15 km) detect the same hazard,
    automatically escalates the alert to 'Emergency' status.
    """
    def __init__(self):
        self.active_alert_window: List[dict] = []

    def evaluate_and_correlate(self, new_alert: dict) -> dict:
        now = datetime.now(IST)
        cutoff = now - timedelta(seconds=CORRELATION_WINDOW_SECONDS)
        
        # Purge stale alerts outside the 5-min window
        self.active_alert_window = [
            a for a in self.active_alert_window
            if datetime.fromisoformat(a["sent"]) >= cutoff
        ]

        hazard = new_alert["hazard_type"]
        node_id = new_alert["node_id"]
        lat = new_alert["lat"]
        lon = new_alert["lon"]

        correlated_nodes = {node_id}

        for existing in self.active_alert_window:
            if existing["hazard_type"] == hazard and existing["node_id"] != node_id:
                dist = haversine_distance_km(lat, lon, existing["lat"], existing["lon"])
                if dist <= CORRELATION_RADIUS_KM:
                    correlated_nodes.add(existing["node_id"])

        self.active_alert_window.append(new_alert)

        if len(correlated_nodes) >= 2:
            print(f"\n[CROSS-NODE CORRELATION ENGINE] Multiple nodes ({list(correlated_nodes)}) detected {hazard.upper()} within {CORRELATION_RADIUS_KM}km!")
            new_alert["warning_tier"] = "Emergency"
            new_alert["info"]["severity"] = "Extreme"
            new_alert["info"]["headline"] = (
                f"[CLUSTER ESCALATION: EMERGENCY] Correlated disaster front detected across {len(correlated_nodes)} nodes: {list(correlated_nodes)}"
            )
            new_alert["info"]["description"] += (
                f" Cross-node correlation engine confirmed disaster propagation across {len(correlated_nodes)} adjacent edge nodes within 5 minutes."
            )
            new_alert["correlated_nodes"] = list(correlated_nodes)

        return new_alert

correlation_engine = CorrelationEngine()

# ==========================================
# 6. Notification Dispatcher (Twilio SMS & Email)
# ==========================================
last_sms_sent_times: Dict[str, float] = {}

def dispatch_authority_notifications(alert: dict):
    """
    Pushes emergency alerts to authorities via SMS (Twilio) and Dashboard (WebSocket).
    Applies a 15-minute de-duplication cooldown per (node, hazard).
    """
    warning_tier = alert.get("warning_tier", "Advisory")
    hazard = alert.get("hazard_type", "unknown")
    node_id = alert.get("node_id", "UNKNOWN")
    confidence = alert.get("confidence", 0)

    # Only send SMS for high-severity tiers (Warning or Emergency)
    if warning_tier not in ("Warning", "Emergency"):
        return {"status": "skipped", "reason": f"Warning tier is {warning_tier}; SMS reserved for Warning & Emergency"}

    throttle_key = f"{node_id}:{hazard}"
    now = time.time()
    last_sent = last_sms_sent_times.get(throttle_key, 0)
    
    if now - last_sent < SMS_COOLDOWN_SECONDS:
        remaining = int(SMS_COOLDOWN_SECONDS - (now - last_sent))
        print(f"[SMS THROTTLED] Suppressed duplicate SMS for {throttle_key}. Cooldown remaining: {remaining}s")
        return {"status": "throttled", "cooldown_remaining": remaining}

    sms_body = (
        f"🚨 [SIH 2026 NDMA {warning_tier.upper()} ALERT] 🚨\n"
        f"Hazard: {hazard.replace('_', ' ').upper()}\n"
        f"Tier: {warning_tier} | Conf: {confidence}%\n"
        f"Node: {node_id} ({alert.get('info', {}).get('area', {}).get('areaDesc', 'Zone')})\n"
        f"Action: {alert.get('info', {}).get('instruction', 'Take immediate action.')}\n"
        f"Time: {datetime.now(IST).strftime('%H:%M:%S IST')}"
    )

    has_credentials = (
        TWILIO_ACCOUNT_SID and not TWILIO_ACCOUNT_SID.startswith("your_")
        and TWILIO_AUTH_TOKEN and not TWILIO_AUTH_TOKEN.startswith("your_")
        and TWILIO_FROM_NUMBER and ALERT_PHONE_NUMBER
    )

    if not has_credentials:
        print("\n" + "="*60)
        print(f"[TWILIO SIMULATION / DISASTER SMS - {warning_tier.upper()}]")
        print(f"Target Phone: {ALERT_PHONE_NUMBER or 'Not configured (check .env)'}")
        print("Message Preview:\n" + sms_body)
        print("="*60 + "\n")
        last_sms_sent_times[throttle_key] = now
        return {"status": "mock_sent", "preview": sms_body}

    try:
        from twilio.rest import Client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        msg_sid = None

        # 1. Dispatch SMS
        try:
            msg = client.messages.create(
                body=sms_body,
                from_=TWILIO_FROM_NUMBER,
                to=ALERT_PHONE_NUMBER
            )
            msg_sid = msg.sid
            print(f"[TWILIO SUCCESS] Dispatched emergency custom SMS to {ALERT_PHONE_NUMBER} (SID: {msg.sid})")
        except Exception as custom_err:
            err_str = str(custom_err)
            print(f"[TWILIO SMS NOTICE] {err_str}")
            if "Trial accounts can only use predefined SMS templates" in err_str or "572006" in err_str:
                print(f"[TWILIO TRIAL] Retrying with approved trial template ('sms_appointment_reminders')...")
                msg = client.messages.create(
                    body="sms_appointment_reminders",
                    from_=TWILIO_FROM_NUMBER,
                    to=ALERT_PHONE_NUMBER
                )
                msg_sid = msg.sid
                print(f"[TWILIO SUCCESS] Dispatched trial template SMS to {ALERT_PHONE_NUMBER} (SID: {msg.sid})")
            else:
                print(f"[TWILIO ERROR] Custom SMS error: {custom_err}")

        # 2. Also dispatch to WhatsApp Sandbox
        try:
            wa_to = f"whatsapp:{ALERT_PHONE_NUMBER}" if not ALERT_PHONE_NUMBER.startswith("whatsapp:") else ALERT_PHONE_NUMBER
            wa_from = f"whatsapp:{TWILIO_FROM_NUMBER}" if not TWILIO_FROM_NUMBER.startswith("whatsapp:") else TWILIO_FROM_NUMBER
            wa_msg = client.messages.create(
                body=sms_body,
                from_=wa_from,
                to=wa_to
            )
            print(f"[TWILIO WHATSAPP SUCCESS] Dispatched emergency WhatsApp alert to {wa_to} (SID: {wa_msg.sid})")
        except Exception as wa_err:
            pass

        last_sms_sent_times[throttle_key] = now
        return {"status": "sent", "sid": msg_sid or "dispatched"}
    except Exception as e:
        print(f"[TWILIO ERROR] SMS dispatch failure: {e}")
        return {"status": "error", "error": str(e)}

# ==========================================
# 7. Central Storage for Alerts
# ==========================================
stored_alerts: List[dict] = []

def record_and_publish_alert(client, alert: dict):
    # Store in memory
    stored_alerts.insert(0, alert)
    if len(stored_alerts) > 500:
        stored_alerts.pop()
    
    # Republish NDMA alert to MQTT for React Dashboard
    if client:
        try:
            client.publish(NDMA_DASHBOARD_TOPIC, json.dumps(alert))
            print(f"[MQTT] Published NDMA CAP alert ({alert['identifier']}) to {NDMA_DASHBOARD_TOPIC}")
        except Exception as e:
            print(f"[MQTT PUBLISH ERROR] {e}")

    # Trigger SMS if Warning or Emergency
    dispatch_authority_notifications(alert)

# ==========================================
# 8. MQTT Ingestion Layer
# ==========================================
def on_connect(client, userdata, flags, rc, *args):
    if rc == 0:
        print(f"[MQTT INGESTION] Connected to Mosquitto broker at {MQTT_BROKER}:{MQTT_PORT}")
        # Subscribe to wildcard topic hierarchy
        client.subscribe(MQTT_WILDCARD_TOPIC)
        print(f"[MQTT INGESTION] Subscribed to topic pattern: {MQTT_WILDCARD_TOPIC}")
        print("  - sih/nodes/{node_id}/telemetry")
        print("  - sih/nodes/{node_id}/alert")
        print("  - sih/nodes/{node_id}/health")
        print("  - sih/sensors (backward compatibility)")
    else:
        print(f"[MQTT INGESTION] Connection failed with error code {rc}")

def on_message(client, userdata, msg):
    try:
        topic = msg.topic
        payload_str = msg.payload.decode()
        data = json.loads(payload_str)
        parts = topic.split("/")

        # Format 1: sih/nodes/{node_id}/telemetry
        if len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "telemetry":
            node_id = parts[2]
            print(f"[TELEMETRY] Received 30s telemetry from node {node_id}")
            node_registry.update_telemetry(node_id, data)
            db_manager.write_telemetry(
                node_id=node_id,
                lat=data.get("lat", 20.5937),
                lon=data.get("lon", 78.9629),
                sensors=data.get("sensors", {}),
                timestamp=data.get("timestamp", datetime.now(IST).isoformat())
            )

        # Format 2: sih/nodes/{node_id}/health
        elif len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "health":
            node_id = parts[2]
            print(f"[HEARTBEAT] Node {node_id} health: Battery={data.get('battery_pct')}%, RSSI={data.get('rssi_dbm')}dBm")
            node_registry.update_health(node_id, data)

        # Format 3: sih/nodes/{node_id}/alert
        elif len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "alert":
            node_id = parts[2]
            confidence = float(data.get("confidence", 0))
            hazard = str(data.get("hazard", "anomaly"))
            
            # Confidence Threshold Gating (Qualcomm Section 3.2)
            if confidence < CONFIDENCE_THRESHOLD:
                print(f"[ALERT SUPPRESSED] Alert from {node_id} dropped: {confidence}% is below threshold ({CONFIDENCE_THRESHOLD}%).")
                return

            print(f"\n[AI TRIGGER] Node {node_id} flagged {hazard.upper()} with {confidence}% confidence.")
            alert = generate_ndma_cap_alert(node_id, hazard, confidence, data)
            correlated_alert = correlation_engine.evaluate_and_correlate(alert)
            record_and_publish_alert(client, correlated_alert)

        # Format 4: Legacy flat topic 'sih/sensors' or 'sih/edge_nodes/trigger'
        elif topic in (LEGACY_SENSOR_TOPIC, LEGACY_TRIGGER_TOPIC):
            node_id = str(data.get("node_id", "NODE_GENERIC"))
            hazard = str(data.get("hazard", ""))
            confidence = float(data.get("confidence", 85.0))
            
            # If payload contains a hazard trigger
            if hazard:
                if confidence < CONFIDENCE_THRESHOLD:
                    print(f"[LEGACY ALERT SUPPRESSED] {confidence}% below {CONFIDENCE_THRESHOLD}%.")
                    return
                print(f"[LEGACY TRIGGER] Received hazard '{hazard}' from {node_id} on {topic}")
                alert = generate_ndma_cap_alert(node_id, hazard, confidence, data)
                correlated_alert = correlation_engine.evaluate_and_correlate(alert)
                record_and_publish_alert(client, correlated_alert)
            else:
                # Regular telemetry
                node_registry.update_telemetry(node_id, data)
                db_manager.write_telemetry(
                    node_id=node_id,
                    lat=data.get("lat", 20.5937),
                    lon=data.get("lon", 78.9629),
                    sensors=data.get("sensors", data),
                    timestamp=data.get("timestamp", datetime.now(IST).isoformat())
                )

    except json.JSONDecodeError:
        print(f"[MQTT ERROR] Non-JSON payload received on {msg.topic}: {msg.payload}")
    except Exception as e:
        print(f"[MQTT PROCESS ERROR] {e}")

try:
    mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
except AttributeError:
    mqtt_client = mqtt.Client()

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# ==========================================
# 9. FastAPI Lifespan & Application Setup
# ==========================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=========================================================")
    print("🚀 Initializing SIH 2026 Environmental Intelligence Hub")
    print(f"📡 MQTT Broker Target: {MQTT_BROKER}:{MQTT_PORT}")
    print(f"📊 InfluxDB Time-Series: {INFLUXDB_URL}")
    print("=========================================================")
    try:
        mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
        mqtt_client.loop_start()
    except Exception as e:
        print(f"⚠️ [MQTT WARN] Could not reach MQTT broker at {MQTT_BROKER}:{MQTT_PORT} ({e}).")
        print("Tip: Run 'docker compose up -d' to start the Mosquitto broker container.")
    
    yield

    print("🛑 Shutting down SIH 2026 Backend...")
    try:
        mqtt_client.loop_stop()
        mqtt_client.disconnect()
    except Exception:
        pass

app = FastAPI(
    title="SIH 2026 Environmental Intelligence Network",
    description="NDMA Common Alerting Protocol (CAP) Hub, Multi-Hazard Time-Series Engine & Geospatial Emergency Dispatch",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 10. REST API Layer (Qualcomm Section 4)
# ==========================================

# --- Node Management Endpoints ---
@app.get("/api/nodes", tags=["Node Management"], summary="List all registered sensor nodes and health status")
def list_nodes():
    """Returns real-time status of all nodes including battery %, RSSI, GPS coordinates, and online/offline detection."""
    nodes = node_registry.get_all()
    return {
        "total_nodes": len(nodes),
        "online_nodes": sum(1 for n in nodes if n["status"] == "online"),
        "offline_nodes": sum(1 for n in nodes if n["status"] == "offline"),
        "nodes": nodes
    }

@app.get("/api/nodes/{node_id}", tags=["Node Management"], summary="Get details for a specific node")
def get_node(node_id: str = Path(..., description="The unique node identifier")):
    node = node_registry.get(node_id)
    if not node:
        raise HTTPException(status_code=404, detail=f"Node '{node_id}' not found")
    return node

@app.get("/api/nodes/{node_id}/history", tags=["Node Management"], summary="Query historical telemetry from InfluxDB")
def get_node_history(
    node_id: str = Path(..., description="Node ID"),
    range: str = Query("24h", description="Time window (e.g. 1h, 6h, 24h, 7d)")
):
    """Fetches high-resolution historical telemetry points from InfluxDB for time-series graphing."""
    history = db_manager.query_history(node_id, range_str=range)
    return {
        "node_id": node_id,
        "range": range,
        "count": len(history),
        "telemetry": history
    }

# --- Alert Management Endpoints ---
@app.get("/api/alerts", tags=["Alert Management"], summary="List NDMA CAP alerts with filters")
def list_alerts(
    hazard: Optional[str] = Query(None, description="Filter by hazard (e.g. forest_fire, flash_flood, landslide)"),
    warning_tier: Optional[str] = Query(None, description="Filter by tier: Advisory, Watch, Warning, Emergency"),
    acknowledged: Optional[bool] = Query(None, description="Filter by acknowledged status"),
    limit: int = Query(50, ge=1, le=200)
):
    """Returns list of generated NDMA CAP alerts, sorted from newest to oldest."""
    results = stored_alerts
    if hazard:
        results = [a for a in results if a.get("hazard_type") == hazard or a.get("info", {}).get("event", "").lower().find(hazard.lower()) != -1]
    if warning_tier:
        results = [a for a in results if a.get("warning_tier", "").lower() == warning_tier.lower()]
    if acknowledged is not None:
        results = [a for a in results if a.get("acknowledged") == acknowledged]
    return {
        "total": len(results),
        "alerts": results[:limit]
    }

@app.get("/api/alerts/{alert_id}", tags=["Alert Management"], summary="Get specific CAP alert by ID")
def get_alert_by_id(alert_id: str = Path(...)):
    for a in stored_alerts:
        if a.get("identifier") == alert_id:
            return a
    raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")

class AckPayload(BaseModel):
    officer_name: str = Field(..., example="Officer R. Sharma, NDMA")
    notes: Optional[str] = Field(None, example="Rapid response team deployed to coordinate.")

@app.patch("/api/alerts/{alert_id}/ack", tags=["Alert Management"], summary="Acknowledge an alert (Disaster Authority)")
def acknowledge_alert(alert_id: str = Path(...), payload: AckPayload = Body(...)):
    """Allows a disaster management official to mark an alert as seen/acknowledged on the React dashboard."""
    for a in stored_alerts:
        if a.get("identifier") == alert_id:
            a["acknowledged"] = True
            a["acknowledged_at"] = datetime.now(IST).isoformat()
            a["acknowledged_by"] = payload.officer_name
            a["ack_notes"] = payload.notes
            return {
                "message": f"Alert {alert_id} acknowledged successfully",
                "alert": a
            }
    raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")

# --- Risk Analytics & Heatmap Endpoints ---
@app.get("/api/risk-map", tags=["Risk Analytics"], summary="Aggregated risk scores for geospatial heatmap")
def get_risk_map():
    """
    Computes an aggregated risk index (0.0 - 100.0) for every registered node/region
    based on real-time sensor levels (VOC, temperature, soil moisture, PM2.5, flood height).
    """
    nodes = node_registry.get_all()
    risk_points = []
    
    for n in nodes:
        sensors = n.get("latest_sensors", {})
        temp = float(sensors.get("temperature", 25))
        gas = float(sensors.get("mq135_ppm", 150))
        pm25 = float(sensors.get("pm25", 30))
        water = float(sensors.get("water_level_cm", 10))
        
        # Calculate composite risk score
        score = 10.0
        if temp > 40: score += 25
        if gas > 400: score += 30
        if pm25 > 250: score += 20
        if water > 100: score += 35
        score = min(100.0, score)

        risk_level = "Low"
        if score > 75: risk_level = "Critical"
        elif score > 50: risk_level = "High"
        elif score > 30: risk_level = "Moderate"

        risk_points.append({
            "node_id": n["node_id"],
            "region": n.get("region", "Zone"),
            "lat": n["lat"],
            "lon": n["lon"],
            "risk_score": round(score, 1),
            "risk_level": risk_level,
            "status": n["status"]
        })
    return {"timestamp": datetime.now(IST).isoformat(), "risk_map": risk_points}

@app.get("/api/trends/{node_id}", tags=["Risk Analytics"], summary="24-hour sensor trends for frontend charts")
def get_sensor_trends(node_id: str = Path(...)):
    """
    Returns structured data points tailored for the React dashboard charts
    (Temperature, PM2.5, MQ-135, and Water Level over the last 24 hours).
    """
    history = db_manager.query_history(node_id, range_str="24h")
    points = []
    
    # If historical data is sparse, synthesize 12 timeline points from latest data for demo display
    if len(history) < 3:
        node = node_registry.get(node_id) or {}
        sensors = node.get("latest_sensors", {})
        base_temp = float(sensors.get("temperature", 32.0))
        base_pm25 = float(sensors.get("pm25", 60.0))
        base_gas = float(sensors.get("mq135_ppm", 220.0))
        
        for hour in range(12, 0, -1):
            time_label = (datetime.now(IST) - timedelta(hours=hour)).strftime("%H:00")
            points.append({
                "time": time_label,
                "temperature": round(base_temp + (hour % 3) - 1.5, 1),
                "pm25": round(base_pm25 + (hour * 2.5) - 5.0, 1),
                "mq135_ppm": round(base_gas + (hour * 4.0) - 10.0, 1)
            })
    else:
        for item in reversed(history[:24]):
            ts = item.get("timestamp", "")
            time_label = ts[11:16] if len(ts) >= 16 else ts
            sensors = item.get("sensors", {})
            points.append({
                "time": time_label,
                "temperature": sensors.get("temperature"),
                "pm25": sensors.get("pm25"),
                "mq135_ppm": sensors.get("mq135_ppm"),
                "water_level_cm": sensors.get("water_level_cm")
            })

    return {"node_id": node_id, "timeline": points}

# --- System Health Endpoint ---
@app.get("/api/health", tags=["Diagnostics"], summary="System diagnostics and backend health")
def backend_health():
    return {
        "status": "operational",
        "service": "SIH 2026 NDMA Environmental Intelligence Backend",
        "version": "2.0.0",
        "timestamp": datetime.now(IST).isoformat(),
        "mqtt_broker": {
            "target": f"{MQTT_BROKER}:{MQTT_PORT}",
            "listening_topics": [MQTT_WILDCARD_TOPIC, "sih/nodes/+/telemetry", "sih/nodes/+/alert", "sih/nodes/+/health"]
        },
        "influxdb": {
            "connected": db_manager.connected,
            "url": INFLUXDB_URL,
            "bucket": INFLUXDB_BUCKET
        },
        "twilio_sms": {
            "configured": bool(TWILIO_ACCOUNT_SID and not TWILIO_ACCOUNT_SID.startswith("your_")),
            "from_number": TWILIO_FROM_NUMBER or "None",
            "alert_recipient": ALERT_PHONE_NUMBER or "None"
        },
        "engine_parameters": {
            "confidence_threshold": CONFIDENCE_THRESHOLD,
            "sms_cooldown_seconds": SMS_COOLDOWN_SECONDS,
            "correlation_window_seconds": CORRELATION_WINDOW_SECONDS,
            "correlation_radius_km": CORRELATION_RADIUS_KM
        }
    }

# --- Live Demo Trigger Endpoint (Qualcomm Demonstration) ---
class DemoTriggerPayload(BaseModel):
    node_id: str = Field("NODE_FOREST_01", example="NODE_FOREST_01")
    hazard: str = Field("forest_fire", example="forest_fire", description="forest_fire | flash_flood | hazardous_air_pollution | extreme_heat | landslide | industrial_chemical_leak | water_quality_degradation")
    confidence: float = Field(94.5, example=94.5)
    temperature: Optional[float] = 58.2
    humidity: Optional[float] = 14.5
    mq135_ppm: Optional[float] = 620.0
    pm25: Optional[float] = 310.0
    water_level_cm: Optional[float] = 180.0
    vibration_g: Optional[float] = 1.4

@app.post("/api/test/trigger", tags=["Live Demo Trigger"], summary="Simulate an edge node hazard trigger for live evaluation")
def test_hazard_trigger(payload: DemoTriggerPayload):
    """
    Directly injects an alert into the backend pipeline to demonstrate CAP alert generation,
    cross-node correlation, and Twilio SMS dispatch in front of the Qualcomm judges!
    """
    data = payload.dict()
    alert = generate_ndma_cap_alert(payload.node_id, payload.hazard, payload.confidence, data)
    correlated_alert = correlation_engine.evaluate_and_correlate(alert)
    record_and_publish_alert(mqtt_client, correlated_alert)
    return {
        "status": "success",
        "message": f"Hazard '{payload.hazard}' processed through NDMA pipeline",
        "alert": correlated_alert
    }

# Deduplication cache for critical emergency SMS alerts
critical_sms_sent_tracker: Dict[str, float] = {}

# --- Twilio Emergency Alert Notification Endpoint ---
class NotifyPayload(BaseModel):
    node_id: str = Field("IN-ASM-042", example="IN-ASM-042")
    location: str = Field("Dibrugarh Basin, Assam", example="Dibrugarh Basin, Assam")
    hazard_type: str = Field("FLOOD", example="FLOOD")
    severity: str = Field("critical", example="critical")
    key_metric: str = Field("+4.2m crest (Level-3 Critical)", example="+4.2m crest (Level-3 Critical)")
    action_type: str = Field("emergency_critical", example="emergency_critical", description="emergency_critical | alert_ndrf | send_dispatch")
    notes: Optional[str] = Field(None, example="Automated critical emergency trigger")
    recipient_numbers: Optional[List[str]] = None

@app.post("/api/notify", tags=["Notification Engine"], summary="Dispatch Twilio SMS alert for Emergency Critical Detections")
def notify_authorities(payload: NotifyPayload):
    """
    Receives notification requests. As per operational specifications:
    - SMS sending is strictly restricted to automatic CRITICAL / EMERGENCY detections.
    - 'send_dispatch' and routine dispatch actions do NOT send any SMS.
    - Sends to a single configured recipient phone (ALERT_RECIPIENT_PHONE).
    - Deduplication prevents repeated SMS alerts for the same ongoing critical node.
    """
    # 1. Reject SMS for dispatch actions
    if payload.action_type == "send_dispatch":
        print(f"[SMS SUPPRESSED] Dispatch action requested for {payload.node_id}. SMS disabled for field dispatches.")
        return {
            "status": "skipped",
            "message": "Twilio SMS is disabled on field dispatch action.",
            "node_id": payload.node_id
        }

    # 2. Only allow critical/emergency severity for automated SMS
    if payload.severity.lower() != "critical" and payload.action_type != "alert_ndrf":
        return {
            "status": "skipped",
            "message": f"SMS reserved for CRITICAL / EMERGENCY tier only (received: {payload.severity})",
            "node_id": payload.node_id
        }

    # 3. Deduplication: One SMS per ongoing critical alert on this node
    now = time.time()
    dedup_key = f"critical:{payload.node_id.strip().upper()}"
    last_sent = critical_sms_sent_tracker.get(dedup_key, 0)
    
    # 15-minute cooldown per ongoing critical node to prevent spamming
    if now - last_sent < SMS_COOLDOWN_SECONDS:
        remaining = int(SMS_COOLDOWN_SECONDS - (now - last_sent))
        print(f"[TWILIO DEDUP] Suppressed duplicate SMS for {payload.node_id}. Cooldown active: {remaining}s remaining.")
        return {
            "status": "deduplicated",
            "message": f"Alert already sent for node {payload.node_id}. Cooldown active ({remaining}s remaining).",
            "cooldown_remaining": remaining
        }

    current_time_ist = datetime.now(IST).strftime("%H:%M:%S IST")
    
    sms_body = (
        f"🚨 [AAPDA-KADABRA CRITICAL DISASTER ALERT] 🚨\n"
        f"Hazard: {payload.hazard_type.upper()} BREACH\n"
        f"Node: #{payload.node_id} ({payload.location})\n"
        f"Metric: {payload.key_metric}\n"
        f"Status: CRITICAL / EMERGENCY LEVEL\n"
        f"Time: {current_time_ist}"
    )
    if payload.notes:
        sms_body += f"\nNote: {payload.notes}"

    # Target single fixed recipient phone number
    target_phone = ALERT_RECIPIENT_PHONE or ALERT_PHONE_NUMBER or "+918669923983"
    target_numbers = [target_phone]

    has_credentials = (
        TWILIO_ACCOUNT_SID and not TWILIO_ACCOUNT_SID.startswith("your_")
        and TWILIO_AUTH_TOKEN and not TWILIO_AUTH_TOKEN.startswith("your_")
        and TWILIO_FROM_NUMBER
    )

    if not has_credentials:
        print("\n" + "="*60)
        print(f"[TWILIO SIMULATION // CRITICAL EMERGENCY ALERT]")
        print(f"Target Recipient: {target_phone}")
        print("Message Preview:\n" + sms_body)
        print("="*60 + "\n")
        critical_sms_sent_tracker[dedup_key] = now
        return {
            "status": "simulated",
            "message": "Twilio credentials not configured; simulated in logs",
            "action_type": payload.action_type,
            "recipient": target_phone,
            "sms_body": sms_body,
            "timestamp": datetime.now(IST).isoformat()
        }

    # Dispatch via Twilio Client
    critical_sms_sent_tracker[dedup_key] = now
    dispatched_sids = []
    errors = []
    try:
        from twilio.rest import Client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        for phone in target_numbers:
            try:
                msg = client.messages.create(
                    body=sms_body,
                    from_=TWILIO_FROM_NUMBER,
                    to=phone
                )
                dispatched_sids.append({"phone": phone, "sid": msg.sid})
                print(f"[TWILIO DISPATCH SUCCESS] Dispatched to {phone} (SID: {msg.sid})")
            except Exception as send_err:
                err_str = str(send_err)
                print(f"[TWILIO ERROR on {phone}]: {err_str}")
                # Retry with trial template if trial account restriction
                if "Trial accounts can only use predefined SMS templates" in err_str or "572006" in err_str:
                    try:
                        msg = client.messages.create(
                            body="sms_appointment_reminders",
                            from_=TWILIO_FROM_NUMBER,
                            to=phone
                        )
                        dispatched_sids.append({"phone": phone, "sid": msg.sid, "mode": "trial_template"})
                        print(f"[TWILIO TRIAL DISPATCH SUCCESS] Dispatched to {phone} (SID: {msg.sid})")
                    except Exception as trial_err:
                        errors.append({"phone": phone, "error": str(trial_err)})
                else:
                    errors.append({"phone": phone, "error": err_str})

        # Also forward to WhatsApp sandbox if available
        for phone in target_numbers:
            try:
                wa_to = f"whatsapp:{phone}" if not phone.startswith("whatsapp:") else phone
                wa_from = f"whatsapp:{TWILIO_FROM_NUMBER}" if not TWILIO_FROM_NUMBER.startswith("whatsapp:") else TWILIO_FROM_NUMBER
                client.messages.create(body=sms_body, from_=wa_from, to=wa_to)
            except Exception:
                pass

        return {
            "status": "success" if dispatched_sids else "failed",
            "message": f"Twilio SMS processed for {len(dispatched_sids)} recipient(s)",
            "action_type": payload.action_type,
            "recipients": target_numbers,
            "dispatched": dispatched_sids,
            "errors": errors,
            "sms_body": sms_body,
            "timestamp": datetime.now(IST).isoformat()
        }
    except Exception as general_err:
        print(f"[TWILIO FATAL ERROR]: {general_err}")
        return {
            "status": "error",
            "message": str(general_err),
            "sms_body": sms_body,
            "timestamp": datetime.now(IST).isoformat()
        }

if __name__ == "__main__":
    import uvicorn
    print("Starting SIH 2026 NDMA Environmental Intelligence Backend on http://127.0.0.1:8000 ...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

