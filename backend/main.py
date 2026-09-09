import os
import sys
import json
import time
import math
import urllib.parse

# Force UTF-8 for console output on Windows to prevent charmap crashes
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from contextlib import asynccontextmanager
import asyncio
import pytz
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, Query, Path, Body, WebSocket, WebSocketDisconnect, Response, Request
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

# Direct hardware ingestion topics
ALT_TELEMETRY_TOPIC = "sensors/+/telemetry"
ALT_ALERT_TOPIC = "sensors/+/alert"
ALT_HEALTH_TOPIC = "sensors/+/health"

# Publish Topics
NDMA_DASHBOARD_TOPIC = "sih/dashboard/ndma_alerts"
NODE_STATUS_TOPIC = "sih/dashboard/node_status"

# InfluxDB Configuration
INFLUXDB_URL = os.getenv("INFLUXDB_URL", "http://localhost:8086")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN", "sih_super_secret_admin_token_2026")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG", "sih_team")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET", "sensor_data")

# Twilio SMS & Voice Configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
ALERT_RECIPIENT_PHONE = os.getenv("ALERT_RECIPIENT_PHONE") or os.getenv("ALERT_PHONE_NUMBER", "")
ALERT_PHONE_NUMBER = ALERT_RECIPIENT_PHONE  # Backward compatibility alias
TWILIO_CALL_ENABLED = os.getenv("TWILIO_CALL_ENABLED", "true").lower() in ("true", "1", "yes")
CALL_COOLDOWN_SECONDS = int(os.getenv("CALL_COOLDOWN_SECONDS", 60))  # 1 minute cooldown between calls

# Evaluation Thresholds
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", 70.0))
SMS_COOLDOWN_SECONDS = int(os.getenv("SMS_COOLDOWN_SECONDS", 900))       # 15 minutes
CORRELATION_WINDOW_SECONDS = int(os.getenv("CORRELATION_WINDOW_SECONDS", 300)) # 5 minutes
CORRELATION_RADIUS_KM = float(os.getenv("CORRELATION_RADIUS_KM", 15.0))
HEARTBEAT_TIMEOUT_SECONDS = int(os.getenv("HEARTBEAT_TIMEOUT_SECONDS", 300)) # 5 minutes timeout for offline transition

IST = pytz.timezone("Asia/Kolkata")

# Reference to the main asyncio event loop for thread-safe WebSocket broadcasts from MQTT thread
main_event_loop: Optional[asyncio.AbstractEventLoop] = None

class ConnectionManager:
    """Manages active WebSocket connections for low-latency live telemetry push (< 50ms)."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"[WEBSOCKET] React client connected ({len(self.active_connections)} active)")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"[WEBSOCKET] React client disconnected ({len(self.active_connections)} active)")

    async def broadcast(self, message: dict):
        if not self.active_connections:
            return
        payload = json.dumps(message)
        dead = []
        for connection in list(self.active_connections):
            try:
                await connection.send_text(payload)
            except Exception:
                dead.append(connection)
        for d in dead:
            self.disconnect(d)

ws_manager = ConnectionManager()

def broadcast_live_event(event_type: str, data: dict):
    """Thread-safe event dispatcher pushing backend events to connected WebSockets."""
    msg = {
        "type": event_type,
        "timestamp": datetime.now(IST).isoformat(),
        "data": data
    }
    if main_event_loop and main_event_loop.is_running():
        try:
            asyncio.run_coroutine_threadsafe(ws_manager.broadcast(msg), main_event_loop)
        except Exception as e:
            print(f"[BROADCAST ERROR] {e}")


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
            },
            "IN-ASM-042": {
                "node_id": "IN-ASM-042",
                "name": "Dibrugarh Brahmaputra Basin",
                "lat": 27.4728,
                "lon": 94.9120,
                "region": "Dibrugarh Basin, Assam",
                "hazard_type": "FLOOD",
                "battery_pct": 95.0,
                "rssi_dbm": -65,
                "uptime_seconds": 28400,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "+0.28m crest (Safe)",
                "latest_sensors": {
                    "water_level_m": 0.28,
                    "crest_m": 0.28,
                    "water_level_cm": 28.0,
                    "flow_velocity_ms": 1.45,
                    "rainfall_intensity": 4.0,
                    "temperature": 27.5,
                    "humidity": 84.0
                }
            },
            "IN-DL-004": {
                "node_id": "IN-DL-004",
                "name": "Anand Vihar NCR Sensor Pod",
                "lat": 28.6139,
                "lon": 77.2090,
                "region": "Anand Vihar, Delhi NCT",
                "hazard_type": "AQI",
                "battery_pct": 98.0,
                "rssi_dbm": -58,
                "uptime_seconds": 45000,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "AQI 75 (Good)",
                "latest_sensors": {
                    "aqi": 75,
                    "pm25": 42.0,
                    "pm10": 85.0,
                    "mq135_ppm": 210.0,
                    "temperature": 32.0,
                    "humidity": 45.0
                }
            },
            "BR-019": {
                "node_id": "BR-019",
                "name": "Kosi River Embankment Monitor",
                "lat": 26.1260,
                "lon": 86.6050,
                "region": "Kosi Embankment, Supaul, Bihar",
                "hazard_type": "FLOOD",
                "battery_pct": 89.0,
                "rssi_dbm": -72,
                "uptime_seconds": 22100,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "+0.35m crest (Safe)",
                "latest_sensors": {
                    "water_level_m": 0.35,
                    "crest_m": 0.35,
                    "water_level_cm": 35.0,
                    "flow_velocity_ms": 1.80,
                    "rainfall_intensity": 8.0,
                    "temperature": 29.4,
                    "humidity": 82.0
                }
            },
            "KL-871": {
                "node_id": "KL-871",
                "name": "Wayanad Hillcrest Acoustic Telemetry",
                "lat": 11.6854,
                "lon": 76.1320,
                "region": "Wayanad, Kerala",
                "hazard_type": "SEISMIC",
                "battery_pct": 88.0,
                "rssi_dbm": -74,
                "uptime_seconds": 31000,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "42.0 kPa pore pressure (Safe)",
                "latest_sensors": {
                    "pore_pressure_kpa": 42.0,
                    "slip_velocity_mmh": 0.15,
                    "tilt_angle_deg": 1.2,
                    "vibration_g": 0.02,
                    "soil_moisture_pct": 45.0,
                    "temperature": 22.4,
                    "humidity": 75.0
                }
            },
            "IN-UK-012": {
                "node_id": "IN-UK-012",
                "name": "Joshimath Subsurface Inclinometer",
                "lat": 30.5564,
                "lon": 79.5647,
                "region": "Joshimath Slopes, Uttarakhand",
                "hazard_type": "SEISMIC",
                "battery_pct": 91.0,
                "rssi_dbm": -78,
                "uptime_seconds": 16400,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "0.18 mm/hr creep (Stable)",
                "latest_sensors": {
                    "pore_pressure_kpa": 38.0,
                    "slip_velocity_mmh": 0.18,
                    "tilt_angle_deg": 1.1,
                    "vibration_g": 0.015,
                    "soil_moisture_pct": 42.0,
                    "temperature": 14.8,
                    "humidity": 55.0
                }
            },
            "OD-855": {
                "node_id": "OD-855",
                "name": "Paradip Deep Offshore Buoy 02",
                "lat": 20.3165,
                "lon": 86.6114,
                "region": "Paradip Deep Offshore, Odisha",
                "hazard_type": "CYCLONE",
                "battery_pct": 93.5,
                "rssi_dbm": -68,
                "uptime_seconds": 22100,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "32 km/h calm (1008 hPa)",
                "latest_sensors": {
                    "wind_speed_kmh": 32.0,
                    "barometric_pressure_hpa": 1008.0,
                    "gust_kmh": 40.0,
                    "temperature": 28.1,
                    "humidity": 88.0
                }
            },
            "UT-012": {
                "node_id": "UT-012",
                "name": "Jim Corbett Wildfire Watch",
                "lat": 29.5300,
                "lon": 78.7747,
                "region": "Nainital / Corbett, Uttarakhand",
                "hazard_type": "FIRE",
                "battery_pct": 89.0,
                "rssi_dbm": -71,
                "uptime_seconds": 18900,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "online",
                "severity": "nominal",
                "key_metric": "34.2°C forest canopy (Safe)",
                "latest_sensors": {
                    "temperature": 34.2,
                    "humidity": 45.0,
                    "mq135_ppm": 180.0,
                    "flame_detected": False
                }
            },
            "GJ-RRU-001": {
                "node_id": "GJ-RRU-001",
                "name": "RRU Main Campus Environmental Node",
                "lat": 23.1544554,
                "lon": 72.884999,
                "region": "Rashtriya Raksha University, Lavad, Gandhinagar, Gujarat",
                "hazard_type": "MULTI",
                "is_multi_sensor": True,
                "battery_pct": 0.0,
                "rssi_dbm": -99,
                "uptime_seconds": 0,
                "last_seen": datetime.now(IST).isoformat(),
                "status": "offline",
                "severity": "offline",
                "key_metric": "OFFLINE — Awaiting Uplink",
                "latest_sensors": {
                    "aqi": None,
                    "temperature": None,
                    "humidity": None,
                    "soil_moisture": None,
                    "vibration": None,
                    "rainfall": None
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

def get_node_severity_python(hazard_type: str, sensors: dict) -> dict:
    """
    Standardized multi-hazard evaluation matrix matching severityTiers.js.
    Returns: { active_tier, key_metric, risk_score, diagnostic }
    Tiers: nominal | warning | abnormal | critical
    """
    hazard = (hazard_type or "").lower().strip()
    
    # 0. MULTI-HAZARD (Aggregated Rig - Worst-of-all evaluation)
    if "multi" in hazard:
        if not sensors or all(v is None for v in sensors.values()):
            return {
                "active_tier": "nominal",
                "risk_score": 0,
                "key_metric": "AWAITING FIRST TELEMETRY",
                "diagnostic": "STANDBY — Awaiting initial ESP32 hardware telemetry burst"
            }
        
        tier_weights = {"critical": 4, "abnormal": 3, "warning": 2, "nominal": 1}
        worst_tier = "nominal"
        max_risk = 0
        worst_metric = "All sensors nominal"
        worst_diag = "NOMINAL — All rig channels within safe threshold"

        # Check AQI
        if sensors.get("aqi") is not None:
            res = get_node_severity_python("aqi", sensors)
            if tier_weights.get(res["active_tier"], 1) > tier_weights.get(worst_tier, 1):
                worst_tier = res["active_tier"]
                worst_metric = res["key_metric"]
                worst_diag = res["diagnostic"]
            max_risk = max(max_risk, res["risk_score"])

        # Check Temperature
        if sensors.get("temperature") is not None:
            res = get_node_severity_python("fire", sensors)
            if tier_weights.get(res["active_tier"], 1) > tier_weights.get(worst_tier, 1):
                worst_tier = res["active_tier"]
                worst_metric = res["key_metric"]
                worst_diag = res["diagnostic"]
            max_risk = max(max_risk, res["risk_score"])

        # Check Vibration
        if sensors.get("vibration") is not None:
            try:
                vib = float(sensors["vibration"])
                if vib >= 2.5:
                    v_tier, v_risk = "critical", 96
                    v_met = f"{vib:.2f} mm/s shock tremor"
                    v_diag = f"CRITICAL — {vib:.2f} mm/s structural shock (≥ 2.5 mm/s)"
                elif vib >= 1.5:
                    v_tier, v_risk = "abnormal", 72
                    v_met = f"{vib:.2f} mm/s elevated vibration"
                    v_diag = f"ABNORMAL — {vib:.2f} mm/s structural vibration (1.5-2.5 mm/s)"
                elif vib >= 0.5:
                    v_tier, v_risk = "warning", 48
                    v_met = f"{vib:.2f} mm/s minor tremor"
                    v_diag = f"WARNING — {vib:.2f} mm/s tremor (0.5-1.5 mm/s)"
                else:
                    v_tier, v_risk = "nominal", 10
                    v_met = f"{vib:.2f} mm/s stable"
                    v_diag = f"NOMINAL — {vib:.2f} mm/s baseline vibration"
                
                if tier_weights.get(v_tier, 1) > tier_weights.get(worst_tier, 1):
                    worst_tier = v_tier
                    worst_metric = v_met
                    worst_diag = v_diag
                max_risk = max(max_risk, v_risk)
            except (ValueError, TypeError):
                pass

        # Check Soil Moisture
        if sensors.get("soil_moisture") is not None:
            try:
                sm = float(sensors["soil_moisture"])
                if sm >= 75.0:
                    s_tier, s_risk = "critical", 90
                    s_met = f"{sm:.1f}% soil saturated"
                    s_diag = f"CRITICAL — {sm:.1f}% soil saturation, slip risk (≥ 75%)"
                elif sm >= 60.0:
                    s_tier, s_risk = "warning", 55
                    s_met = f"{sm:.1f}% elevated moisture"
                    s_diag = f"WARNING — {sm:.1f}% high soil moisture (60-75%)"
                else:
                    s_tier, s_risk = "nominal", 15
                    s_met = f"{sm:.1f}% soil moisture"
                    s_diag = f"NOMINAL — {sm:.1f}% stable soil moisture"

                if tier_weights.get(s_tier, 1) > tier_weights.get(worst_tier, 1):
                    worst_tier = s_tier
                    worst_metric = s_met
                    worst_diag = s_diag
                max_risk = max(max_risk, s_risk)
            except (ValueError, TypeError):
                pass

        # Check Rainfall
        if sensors.get("rainfall") is not None:
            try:
                rf = float(sensors["rainfall"])
                if rf >= 35.0:
                    r_tier, r_risk = "critical", 94
                    r_met = f"{rf:.1f} mm/h torrential rain"
                    r_diag = f"CRITICAL — {rf:.1f} mm/h torrential downpour (≥ 35 mm/h)"
                elif rf >= 7.5:
                    r_tier, r_risk = "warning", 50
                    r_met = f"{rf:.1f} mm/h moderate rain"
                    r_diag = f"WARNING — {rf:.1f} mm/h moderate rainfall (7.5-35 mm/h)"
                else:
                    r_tier, r_risk = "nominal", 10
                    r_met = f"{rf:.1f} mm/h rain"
                    r_diag = f"NOMINAL — {rf:.1f} mm/h light/nil rain"

                if tier_weights.get(r_tier, 1) > tier_weights.get(worst_tier, 1):
                    worst_tier = r_tier
                    worst_metric = r_met
                    worst_diag = r_diag
                max_risk = max(max_risk, r_risk)
            except (ValueError, TypeError):
                pass

        return {
            "active_tier": worst_tier,
            "risk_score": max_risk or 15,
            "key_metric": worst_metric,
            "diagnostic": worst_diag
        }

    # 1. FLOOD
    if "flood" in hazard or "water" in hazard or "river" in hazard:
        crest_m = None
        if "crest_m" in sensors and sensors["crest_m"] is not None:
            crest_m = float(sensors["crest_m"])
        elif "water_level_m" in sensors and sensors["water_level_m"] is not None:
            crest_m = float(sensors["water_level_m"])
        elif "water_level_cm" in sensors and sensors["water_level_cm"] is not None:
            crest_m = float(sensors["water_level_cm"]) / 100.0
        
        if crest_m is None:
            crest_m = 0.28
        
        sign = "+" if crest_m >= 0 else ""
        formatted = f"{sign}{crest_m:.2f}m"
        
        if crest_m >= 3.0:
            return {
                "active_tier": "critical",
                "risk_score": min(99, round(85 + (crest_m - 3.0) * 8)),
                "key_metric": f"{formatted} crest (Level-3 Critical)",
                "diagnostic": f"CRITICAL — {formatted} crest exceeds Level-3 emergency threshold (≥ +3.00m)"
            }
        elif crest_m >= 1.5:
            return {
                "active_tier": "abnormal",
                "risk_score": round(65 + (crest_m - 1.5) * 15),
                "key_metric": f"{formatted} crest surge",
                "diagnostic": f"ABNORMAL — {formatted} crest surge, above warning bound (+1.50m to +3.00m)"
            }
        elif crest_m >= 0.5:
            return {
                "active_tier": "warning",
                "risk_score": round(40 + (crest_m - 0.5) * 25),
                "key_metric": f"{formatted} crest surge",
                "diagnostic": f"WARNING — {formatted} crest surge, approaching danger mark (+0.50m to +1.50m)"
            }
        else:
            return {
                "active_tier": "nominal",
                "risk_score": max(10, round(15 + crest_m * 20)),
                "key_metric": f"{formatted} crest (Safe)",
                "diagnostic": f"NOMINAL — {formatted} crest, within safe range (< +0.50m)"
            }
            
    # 2. AQI / SMOG
    elif "aqi" in hazard or "pollution" in hazard or "smog" in hazard or "air" in hazard:
        aqi = None
        if "aqi" in sensors and sensors["aqi"] is not None:
            aqi = float(sensors["aqi"])
        elif "pm25" in sensors and sensors["pm25"] is not None:
            aqi = float(sensors["pm25"])
        if aqi is None:
            aqi = 65.0
            
        if aqi > 400:
            return {
                "active_tier": "critical",
                "risk_score": min(99, round(88 + (aqi - 400) * 0.1)),
                "key_metric": f"AQI {int(aqi)} (GRAP Stage IV)",
                "diagnostic": f"CRITICAL — AQI {int(aqi)} exceeds GRAP Stage IV emergency threshold (> 400)"
            }
        elif aqi > 250:
            return {
                "active_tier": "abnormal",
                "risk_score": round(65 + (aqi - 250) * 0.15),
                "key_metric": f"AQI {int(aqi)} (Severe Smog)",
                "diagnostic": f"ABNORMAL — AQI {int(aqi)}, Stage-III severe smog envelope (251–400)"
            }
        elif aqi > 100:
            return {
                "active_tier": "warning",
                "risk_score": round(35 + (aqi - 100) * 0.2),
                "key_metric": f"AQI {int(aqi)} (Moderate-Poor)",
                "diagnostic": f"WARNING — AQI {int(aqi)}, trending upward under thermal inversion (101–250)"
            }
        else:
            return {
                "active_tier": "nominal",
                "risk_score": max(8, round(aqi * 0.25)),
                "key_metric": f"AQI {int(aqi)} (Good)",
                "diagnostic": f"NOMINAL — AQI {int(aqi)}, within national ambient baseline (≤ 100)"
            }

    # 3. LANDSLIDE / SEISMIC
    elif "landslide" in hazard or "seismic" in hazard or "rock" in hazard:
        pore_kpa = float(sensors.get("pore_pressure_kpa")) if sensors.get("pore_pressure_kpa") is not None else None
        slip_mmh = float(sensors.get("slip_velocity_mmh")) if sensors.get("slip_velocity_mmh") is not None else None
        
        if pore_kpa is not None:
            if pore_kpa >= 170.0:
                return {
                    "active_tier": "critical",
                    "risk_score": min(99, round(85 + (pore_kpa - 170) * 0.5)),
                    "key_metric": f"{pore_kpa:.1f} kPa pore pressure (Critical)",
                    "diagnostic": f"CRITICAL — {pore_kpa:.1f} kPa pore pressure exceeds soil liquefaction threshold (≥ 170 kPa)"
                }
            elif pore_kpa >= 130.0:
                return {
                    "active_tier": "abnormal",
                    "risk_score": round(65 + (pore_kpa - 130) * 0.25),
                    "key_metric": f"{pore_kpa:.1f} kPa pore pressure",
                    "diagnostic": f"ABNORMAL — {pore_kpa:.1f} kPa pore pressure exceeds safe advisory threshold (130–170 kPa)"
                }
            elif pore_kpa >= 80.0:
                return {
                    "active_tier": "warning",
                    "risk_score": round(45 + (pore_kpa - 80) * 0.35),
                    "key_metric": f"{pore_kpa:.1f} kPa pore pressure",
                    "diagnostic": f"WARNING — {pore_kpa:.1f} kPa pore pressure, elevated soil saturation advisory (80–130 kPa)"
                }
            else:
                return {
                    "active_tier": "nominal",
                    "risk_score": 18,
                    "key_metric": f"{pore_kpa:.1f} kPa pore pressure (Safe)",
                    "diagnostic": f"NOMINAL — {pore_kpa:.1f} kPa pore pressure, bedrock stability verified (< 80 kPa)"
                }
        else:
            if slip_mmh is None: slip_mmh = 0.12
            if slip_mmh >= 2.5:
                return {
                    "active_tier": "critical",
                    "risk_score": min(99, round(85 + (slip_mmh - 2.5) * 15)),
                    "key_metric": f"{slip_mmh:.2f} mm/h shear slip (Critical)",
                    "diagnostic": f"CRITICAL — {slip_mmh:.2f} mm/h shear slip exceeds critical shear threshold (≥ 2.50 mm/h)"
                }
            elif slip_mmh >= 1.5:
                return {
                    "active_tier": "abnormal",
                    "risk_score": round(65 + (slip_mmh - 1.5) * 20),
                    "key_metric": f"{slip_mmh:.2f} mm/h shear slip",
                    "diagnostic": f"ABNORMAL — {slip_mmh:.2f} mm/h borehole displacement (1.5–2.5 mm/h)"
                }
            elif slip_mmh >= 0.5:
                return {
                    "active_tier": "warning",
                    "risk_score": round(45 + (slip_mmh - 0.5) * 20),
                    "key_metric": f"{slip_mmh:.2f} mm/h shear slip",
                    "diagnostic": f"WARNING — {slip_mmh:.2f} mm/h borehole creep (0.5–1.5 mm/h)"
                }
            else:
                return {
                    "active_tier": "nominal",
                    "risk_score": 15,
                    "key_metric": f"{slip_mmh:.2f} mm/h creep (Stable)",
                    "diagnostic": f"NOMINAL — {slip_mmh:.2f} mm/h bedrock displacement, stable baseline (< 0.5 mm/h)"
                }

    # 4. CYCLONE
    elif "cyclone" in hazard or "storm" in hazard or "surge" in hazard:
        wind_kmh = float(sensors.get("wind_speed_kmh")) if sensors.get("wind_speed_kmh") is not None else None
        hpa = float(sensors.get("barometric_pressure_hpa")) if sensors.get("barometric_pressure_hpa") is not None else 1013.0
        if wind_kmh is None: wind_kmh = 32.0

        if wind_kmh >= 105.0 or hpa <= 988.0:
            return {
                "active_tier": "critical",
                "risk_score": min(99, round(85 + (wind_kmh - 105) * 0.4)),
                "key_metric": f"{wind_kmh:.0f} km/h wind / {hpa:.0f} hPa (Severe Cyclone)",
                "diagnostic": f"CRITICAL — {wind_kmh:.0f} km/h winds / {hpa:.0f} hPa pressure, Severe Cyclonic Storm (≥ 105 km/h)"
            }
        elif wind_kmh >= 75.0 or hpa <= 995.0:
            return {
                "active_tier": "abnormal",
                "risk_score": round(65 + (wind_kmh - 75) * 0.3),
                "key_metric": f"{wind_kmh:.0f} km/h gale winds",
                "diagnostic": f"ABNORMAL — {wind_kmh:.0f} km/h winds, cyclonic storm approaching (75–105 km/h)"
            }
        elif wind_kmh >= 50.0 or hpa <= 1005.0:
            return {
                "active_tier": "warning",
                "risk_score": round(45 + (wind_kmh - 50) * 0.3),
                "key_metric": f"{wind_kmh:.0f} km/h gusts (Advisory)",
                "diagnostic": f"WARNING — {wind_kmh:.0f} km/h wind gusts, coastal depression advisory (50–75 km/h)"
            }
        else:
            return {
                "active_tier": "nominal",
                "risk_score": 16,
                "key_metric": f"{wind_kmh:.0f} km/h calm ({hpa:.0f} hPa)",
                "diagnostic": f"NOMINAL — {wind_kmh:.0f} km/h winds, coastal sea state calm (< 50 km/h)"
            }

    # 5. FIRE / THERMAL
    elif "fire" in hazard or "thermal" in hazard or "wildfire" in hazard:
        temp_c = float(sensors.get("temperature", 34.0)) if sensors.get("temperature") is not None else 34.0
        voc_ppm = float(sensors.get("mq135_ppm")) if sensors.get("mq135_ppm") is not None else None
        flame = bool(sensors.get("flame_detected", False))

        if temp_c >= 60.0 or (voc_ppm and voc_ppm >= 550.0) or flame:
            metric_label = f"{temp_c:.1f}°C canopy" + (" / FLAME DETECTED" if flame else "")
            return {
                "active_tier": "critical",
                "risk_score": min(99, round(85 + (temp_c - 60) * 1.5)),
                "key_metric": f"{metric_label} (Critical Fire)",
                "diagnostic": f"CRITICAL — {temp_c:.1f}°C thermal peak / flame detected, active wildfire front (≥ 60°C)"
            }
        elif temp_c >= 50.0 or (voc_ppm and voc_ppm >= 350.0):
            return {
                "active_tier": "abnormal",
                "risk_score": round(65 + (temp_c - 50) * 1.8),
                "key_metric": f"{temp_c:.1f}°C smoldering peak",
                "diagnostic": f"ABNORMAL — {temp_c:.1f}°C smoldering thermal peak, high wildfire risk (50–60°C)"
            }
        elif temp_c >= 40.0 or (voc_ppm and voc_ppm >= 200.0):
            return {
                "active_tier": "warning",
                "risk_score": round(45 + (temp_c - 40) * 2.0),
                "key_metric": f"{temp_c:.1f}°C elevated temp",
                "diagnostic": f"WARNING — {temp_c:.1f}°C canopy temperature, elevated thermal plume (40–50°C)"
            }
        else:
            return {
                "active_tier": "nominal",
                "risk_score": 18,
                "key_metric": f"{temp_c:.1f}°C forest canopy (Safe)",
                "diagnostic": f"NOMINAL — {temp_c:.1f}°C forest canopy temperature, safe ambient (< 40°C)"
            }

    # Default fallback
    return {
        "active_tier": "nominal",
        "risk_score": 15,
        "key_metric": "Nominal Telemetry",
        "diagnostic": "NOMINAL — Operating within standard operating envelope"
    }


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
# 6. Notification Dispatcher (Twilio SMS, Voice & WhatsApp)
# ==========================================
last_sms_sent_times: Dict[str, float] = {}

# --- Automated Emergency Voice Call Alert System (Twilio Voice API) ---
critical_voice_call_tracker: Dict[str, float] = {}
voice_call_logs: List[dict] = []

def build_emergency_speech(node_id: str, hazard_type: str, location: str, key_metric: str) -> str:
    """
    Constructs crisp, authoritative emergency text-to-speech announcement for NDMA responders.
    Formula: alert prefix -> hazard + location -> metric value -> call to action (check dashboard).
    """
    clean_hazard = str(hazard_type).replace('_', ' ').title()
    clean_loc = str(location).strip() or "designated sector"
    metric_str = str(key_metric).strip()
    return (
        f"Emergency alert from the AAPDA-KADABRA National Disaster Network. "
        f"Critical {clean_hazard} detected at node {node_id}, {clean_loc}. "
        f"Reading: {metric_str}, exceeding danger threshold. "
        f"Level 3 evacuation protocol active. Tactical NDRF response deployed. "
        f"Please check your command dashboard immediately."
    )

def build_twiml_xml(speech_text: str) -> str:
    """
    Builds standard TwiML XML payload for Twilio Voice text-to-speech with natural Indian cadence.
    Uses Polly.Aditi voice for clear en-IN pronunciation of Indian geographic regions.
    """
    escaped_speech = speech_text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
    return (
        f'<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<Response>\n'
        f'    <Pause length="1"/>\n'
        f'    <Say voice="Polly.Aditi" language="en-IN">{escaped_speech}</Say>\n'
        f'    <Pause length="2"/>\n'
        f'    <Say voice="Polly.Aditi" language="en-IN">Repeating: {escaped_speech}</Say>\n'
        f'    <Pause length="1"/>\n'
        f'    <Say voice="Polly.Aditi" language="en-IN">Please check your emergency dashboard immediately. Disconnecting now.</Say>\n'
        f'</Response>'
    )

def trigger_voice_call(node_data: dict) -> dict:
    """
    Places an automated emergency voice call via Twilio's Voice API to the responder phone.
    - Strictly reserved for CRITICAL / EMERGENCY severity events (Warning events are SMS-only).
    - Uses one-shot deduplication with CALL_COOLDOWN_SECONDS per station.
    - Employs dynamic TwiML text-to-speech (<Say>) with station-specific telemetry.
    - Logs each call event into audit records and broadcasts via WebSocket.
    - Handles unreachable / failed calls gracefully without interrupting SMS pipeline.
    """
    node_id = str(node_data.get("node_id", "UNKNOWN")).strip().upper()
    severity = str(node_data.get("severity", "critical")).strip().lower()
    hazard_type = str(node_data.get("hazard_type", "FLOOD")).strip().upper()
    location = str(node_data.get("location") or node_data.get("region") or "Designated Sector").strip()
    key_metric = str(node_data.get("key_metric") or "Critical threshold breached").strip()

    # Rule 1: STRICTLY CRITICAL / EMERGENCY ONLY. Warning-tier events are SMS-only.
    if severity not in ("critical", "emergency") and node_data.get("action_type") != "alert_ndrf":
        return {
            "status": "skipped",
            "reason": f"Voice calls reserved strictly for Critical/Emergency tier (received: {severity})."
        }

    # Rule 2: Verify if calling is enabled
    if not TWILIO_CALL_ENABLED:
        return {
            "status": "skipped",
            "reason": "Twilio Voice calling disabled via TWILIO_CALL_ENABLED=false."
        }

    # Rule 3: Deduplication check (one call per transition / cooldown period)
    dedup_key = f"call:{node_id}"
    now = time.time()
    last_call = critical_voice_call_tracker.get(dedup_key, 0)
    cooldown = max(30, CALL_COOLDOWN_SECONDS)

    if now - last_call < cooldown:
        remaining = int(cooldown - (now - last_call))
        print(f"[VOICE DEDUP] Suppressed duplicate voice call for {node_id}. Cooldown remaining: {remaining}s")
        return {
            "status": "deduplicated",
            "message": f"Voice call already placed for {node_id}. Cooldown active ({remaining}s remaining).",
            "cooldown_remaining": remaining
        }

    target_phone = ALERT_RECIPIENT_PHONE or ALERT_PHONE_NUMBER or "+918669923983"
    speech_text = build_emergency_speech(node_id, hazard_type, location, key_metric)
    twiml_xml = build_twiml_xml(speech_text)

    has_credentials = (
        TWILIO_ACCOUNT_SID and not TWILIO_ACCOUNT_SID.startswith("your_")
        and TWILIO_AUTH_TOKEN and not TWILIO_AUTH_TOKEN.startswith("your_")
        and TWILIO_FROM_NUMBER and target_phone
    )

    if not has_credentials:
        critical_voice_call_tracker[dedup_key] = now
        print("\n" + "="*60)
        print(f"[TWILIO VOICE SIMULATION // CRITICAL EMERGENCY CALL]")
        print(f"Target Responder: {target_phone}")
        print(f"Spoken Announcement:\n{speech_text}")
        print("="*60 + "\n")

        sim_record = {
            "call_sid": f"CA_SIM_{int(now)}",
            "node_id": node_id,
            "location": location,
            "hazard_type": hazard_type,
            "recipient": target_phone,
            "status": "simulated",
            "speech": speech_text,
            "timestamp": datetime.now(IST).isoformat()
        }
        voice_call_logs.insert(0, sim_record)
        broadcast_live_event("voice_call_dispatched", sim_record)
        return {
            "status": "simulated",
            "message": "Twilio credentials not configured; emergency voice call simulated.",
            "call_sid": sim_record["call_sid"],
            "recipient": target_phone,
            "speech": speech_text
        }

    # Dispatch outbound call via Twilio Client
    critical_voice_call_tracker[dedup_key] = now
    try:
        from twilio.rest import Client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        # Dynamic TwiML URL via tested twimlets echo (works universally without public port exposure)
        twiml_url = f"https://twimlets.com/echo?Twiml={urllib.parse.quote(twiml_xml)}"

        call = client.calls.create(
            to=target_phone,
            from_=TWILIO_FROM_NUMBER,
            url=twiml_url
        )

        call_record = {
            "call_sid": call.sid,
            "node_id": node_id,
            "location": location,
            "hazard_type": hazard_type,
            "recipient": target_phone,
            "status": call.status,
            "speech": speech_text,
            "timestamp": datetime.now(IST).isoformat()
        }
        voice_call_logs.insert(0, call_record)
        if len(voice_call_logs) > 100:
            voice_call_logs.pop()

        print(f"[TWILIO VOICE SUCCESS] Emergency voice call initiated to {target_phone} (Call SID: {call.sid}, Status: {call.status})")
        broadcast_live_event("voice_call_dispatched", call_record)

        return {
            "status": "success",
            "call_sid": call.sid,
            "call_status": call.status,
            "recipient": target_phone,
            "speech": speech_text,
            "timestamp": datetime.now(IST).isoformat()
        }
    except Exception as e:
        err_msg = str(e)
        print(f"[TWILIO VOICE ERROR] Failed to place emergency call to {target_phone}: {err_msg}")
        fail_record = {
            "call_sid": None,
            "node_id": node_id,
            "location": location,
            "hazard_type": hazard_type,
            "recipient": target_phone,
            "status": "failed",
            "error": err_msg,
            "speech": speech_text,
            "timestamp": datetime.now(IST).isoformat()
        }
        voice_call_logs.insert(0, fail_record)
        return {
            "status": "error",
            "error": err_msg,
            "recipient": target_phone
        }

def dispatch_authority_notifications(alert: dict):
    """
    Pushes emergency alerts to authorities via SMS (Twilio), automated Voice Call (Twilio),
    and Dashboard (WebSocket).
    Applies de-duplication cooldown per (node, hazard).
    Warning tier: SMS-only.
    Critical/Emergency tier: SMS + Automated Voice Call.
    """
    warning_tier = alert.get("warning_tier", "Advisory")
    hazard = alert.get("hazard_type", "unknown")
    node_id = alert.get("node_id", "UNKNOWN")
    confidence = alert.get("confidence", 0)

    # Only send SMS/Call for high-severity tiers (Warning or Emergency)
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

        # Place simulated voice call if Emergency/Critical
        voice_res = None
        if warning_tier in ("Emergency", "Critical"):
            voice_res = trigger_voice_call({
                "node_id": node_id,
                "hazard_type": hazard,
                "location": alert.get("info", {}).get("area", {}).get("areaDesc", "Zone"),
                "key_metric": alert.get("info", {}).get("headline", "Critical Level Breached"),
                "severity": "critical"
            })
        return {"status": "mock_sent", "preview": sms_body, "voice_call": voice_res}

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
        except Exception:
            pass

        last_sms_sent_times[throttle_key] = now

        # 3. For Emergency/Critical tier: place automated Voice Call alongside SMS
        voice_res = None
        if warning_tier in ("Emergency", "Critical") or alert.get("severity") == "critical":
            try:
                node_meta = node_registry.get(node_id) or {}
                voice_res = trigger_voice_call({
                    "node_id": node_id,
                    "hazard_type": hazard,
                    "location": alert.get("info", {}).get("area", {}).get("areaDesc") or node_meta.get("region", "Designated Sector"),
                    "key_metric": node_meta.get("key_metric") or alert.get("info", {}).get("headline", "Critical Threshold Breached"),
                    "severity": "critical"
                })
            except Exception as vc_err:
                print(f"[TWILIO VOICE ERROR in dispatch_authority_notifications]: {vc_err}")

        return {"status": "sent", "sid": msg_sid or "dispatched", "voice_call": voice_res}
    except Exception as e:
        print(f"[TWILIO ERROR] Notification dispatch failure: {e}")
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
# 7.1 Unified ESP32 Hardware Ingestion & Evaluation
# ==========================================
def process_esp32_reading(payload: dict) -> dict:
    """
    Unified Ingestion & Severity Engine for Real ESP32 Hardware:
    - Ingests readings from MQTT or REST POST
    - Validates payload structure and normalizes fields
    - Evaluates 5-tier multi-hazard severity (Nominal, Warning, Abnormal, Critical)
    - Updates central node registry and historical time-series database
    - Triggers NDMA CAP alerting, correlation engine, and Twilio SMS for Critical states
    - Dispatches real-time WebSocket push (< 50ms) to connected React dashboard clients
    """
    raw_node_id = str(payload.get("node_id", "NODE_UNKNOWN")).strip()
    node_id = raw_node_id.upper()
    
    # Extract sensors dictionary or gather flat keys
    sensors = payload.get("sensors", {})
    if not isinstance(sensors, dict):
        sensors = {}
    
    # If flat sensor keys were sent (e.g. water_level_m, aqi, temperature, etc.)
    for k, v in payload.items():
        if k not in ("node_id", "timestamp", "hazard_type", "hazard", "battery_voltage",
                     "battery_pct", "signal_strength_dbm", "rssi_dbm", "status",
                     "lat", "lon", "location", "region", "sensors", "unit", "value") and isinstance(v, (int, float, bool)):
            if k not in sensors:
                sensors[k] = v

    # If simple value + unit was sent
    if "value" in payload and payload["value"] is not None:
        try:
            val = float(payload["value"])
            ht = str(payload.get("hazard_type", "")).lower()
            if "flood" in ht:
                sensors["water_level_m"] = val
                sensors["crest_m"] = val
            elif "aqi" in ht:
                sensors["aqi"] = val
            elif "fire" in ht:
                sensors["temperature"] = val
            elif "landslide" in ht or "seismic" in ht:
                sensors["pore_pressure_kpa"] = val
            elif "cyclone" in ht:
                sensors["wind_speed_kmh"] = val
        except (ValueError, TypeError):
            pass

    # Determine hazard type
    existing_node = node_registry.nodes.get(node_id) or node_registry.nodes.get(raw_node_id)
    hazard_type = payload.get("hazard_type") or payload.get("hazard")
    if not hazard_type:
        hazard_type = existing_node.get("hazard_type", "FLOOD") if existing_node else "FLOOD"
    hazard_type = str(hazard_type).upper()

    # Calculate battery % and RSSI
    battery_pct = payload.get("battery_pct")
    if battery_pct is None and payload.get("battery_voltage"):
        try:
            v = float(payload.get("battery_voltage"))
            # Standard Li-ion battery curve approx: 3.3V = 0%, 4.2V = 100%
            battery_pct = max(0.0, min(100.0, round(((v - 3.3) / 0.9) * 100, 1)))
        except Exception:
            battery_pct = 92.0
    elif battery_pct is not None:
        battery_pct = float(battery_pct)
    else:
        battery_pct = existing_node.get("battery_pct", 95.0) if existing_node else 95.0

    rssi = payload.get("signal_strength_dbm") or payload.get("rssi_dbm")
    if rssi is None:
        rssi = existing_node.get("rssi_dbm", -65) if existing_node else -65
    else:
        rssi = int(rssi)

    timestamp = payload.get("timestamp") or datetime.now(IST).isoformat()
    lat = float(payload.get("lat")) if payload.get("lat") is not None else (existing_node.get("lat", 26.1850) if existing_node else 26.1850)
    lon = float(payload.get("lon")) if payload.get("lon") is not None else (existing_node.get("lon", 91.7450) if existing_node else 91.7450)
    region = payload.get("region") or payload.get("location") or (existing_node.get("region", "Field Sensor Sector") if existing_node else "Field Sensor Sector")

    # Run through standardized 5-tier multi-hazard severity evaluation
    eval_result = get_node_severity_python(hazard_type, sensors)
    active_tier = eval_result["active_tier"]   # nominal | warning | abnormal | critical
    key_metric = eval_result["key_metric"]
    risk_score = eval_result["risk_score"]
    diagnostic = eval_result["diagnostic"]

    # Register or update node in registry
    if node_id not in node_registry.nodes:
        node_registry.nodes[node_id] = {
            "node_id": node_id,
            "name": f"ESP32 {hazard_type.capitalize()} Node ({node_id})",
            "lat": lat,
            "lon": lon,
            "region": region,
            "hazard_type": hazard_type,
            "battery_pct": battery_pct,
            "rssi_dbm": rssi,
            "uptime_seconds": 0,
            "latest_sensors": {}
        }
    
    node = node_registry.nodes[node_id]
    node["lat"] = lat
    node["lon"] = lon
    node["region"] = region
    node["hazard_type"] = hazard_type
    node["battery_pct"] = battery_pct
    if payload.get("battery_voltage"):
        node["battery_voltage"] = payload.get("battery_voltage")
    node["rssi_dbm"] = rssi
    node["last_seen"] = timestamp
    node["status"] = "online"
    node["severity"] = active_tier
    node["key_metric"] = key_metric
    node["risk_score"] = risk_score
    if "latest_sensors" not in node:
        node["latest_sensors"] = {}
    node["latest_sensors"].update(sensors)

    # Persist to time-series storage (InfluxDB / in-memory buffer)
    db_manager.write_telemetry(
        node_id=node_id,
        lat=node["lat"],
        lon=node["lon"],
        sensors=node["latest_sensors"],
        timestamp=timestamp
    )

    # Alert pipeline: trigger NDMA CAP alert and Twilio SMS for elevated readings
    generated_alert = None
    if active_tier in ("warning", "abnormal", "critical"):
        conf = 96.0 if active_tier == "critical" else (84.0 if active_tier == "abnormal" else 74.0)
        alert = generate_ndma_cap_alert(node_id, hazard_type, conf, {
            "lat": node["lat"],
            "lon": node["lon"],
            "region": node.get("region"),
            "sensors": node["latest_sensors"]
        })
        correlated_alert = correlation_engine.evaluate_and_correlate(alert)
        record_and_publish_alert(mqtt_client, correlated_alert)
        generated_alert = correlated_alert
    elif active_tier == "nominal":
        # Reset alert dedup trackers when node normalizes to re-arm future transitions
        warning_sms_sent_tracker.pop(f"warning:{node_id}", None)
        critical_sms_sent_tracker.pop(f"critical:{node_id}", None)
        critical_voice_call_tracker.pop(f"call:{node_id}", None)

    # Broadcast real-time update to all connected React WebSocket clients
    broadcast_live_event("telemetry_update", {
        "node_id": node_id,
        "name": node.get("name"),
        "location": node.get("region"),
        "hazard_type": hazard_type,
        "severity": active_tier,
        "key_metric": key_metric,
        "risk_score": risk_score,
        "diagnostic": diagnostic,
        "battery_pct": battery_pct,
        "battery_voltage": payload.get("battery_voltage"),
        "signal_strength_dbm": rssi,
        "sensors": node["latest_sensors"],
        "timestamp": timestamp,
        "status": "online",
        "alert": generated_alert
    })

    return {
        "status": "success",
        "node_id": node_id,
        "hazard_type": hazard_type,
        "severity": active_tier,
        "key_metric": key_metric,
        "risk_score": risk_score,
        "alert_triggered": bool(generated_alert),
        "alert_id": generated_alert["identifier"] if generated_alert else None
    }

# ==========================================
# 8. MQTT Ingestion Layer
# ==========================================
def on_connect(client, userdata, flags, rc, *args):
    if rc == 0:
        print(f"[MQTT INGESTION] Connected to Mosquitto broker at {MQTT_BROKER}:{MQTT_PORT}")
        # Subscribe to wildcard topic hierarchy
        client.subscribe(MQTT_WILDCARD_TOPIC)
        client.subscribe(ALT_TELEMETRY_TOPIC)
        client.subscribe(ALT_ALERT_TOPIC)
        client.subscribe(ALT_HEALTH_TOPIC)
        print(f"[MQTT INGESTION] Subscribed to topic patterns: {MQTT_WILDCARD_TOPIC}, {ALT_TELEMETRY_TOPIC}")
        print("  - sih/nodes/{node_id}/telemetry  |  sensors/{node_id}/telemetry")
        print("  - sih/nodes/{node_id}/alert      |  sensors/{node_id}/alert")
        print("  - sih/nodes/{node_id}/health     |  sensors/{node_id}/health")
        print("  - sih/sensors (backward compatibility)")
    else:
        print(f"[MQTT INGESTION] Connection failed with error code {rc}")

def on_message(client, userdata, msg):
    try:
        topic = msg.topic
        payload_str = msg.payload.decode()
        data = json.loads(payload_str)
        parts = topic.split("/")

        # Format 1: sih/nodes/{node_id}/telemetry OR sensors/{node_id}/telemetry
        if (len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "telemetry") or \
           (len(parts) == 3 and parts[0] == "sensors" and parts[2] == "telemetry"):
            node_id = parts[2] if len(parts) == 4 else parts[1]
            data["node_id"] = data.get("node_id") or node_id
            print(f"[MQTT TELEMETRY] Ingested reading from node {node_id} on {topic}")
            process_esp32_reading(data)

        # Format 2: sih/nodes/{node_id}/health OR sensors/{node_id}/health (Heartbeats & LWT)
        elif (len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "health") or \
             (len(parts) == 3 and parts[0] == "sensors" and parts[2] == "health"):
            node_id = parts[2] if len(parts) == 4 else parts[1]
            status_val = str(data.get("status", "online")).lower()
            if status_val == "offline":
                print(f"[MQTT LWT OFFLINE] Node {node_id} disconnected via Last Will and Testament ({data.get('reason', 'lwt')})")
                if node_id in node_registry.nodes:
                    node_registry.nodes[node_id]["status"] = "offline"
                    node_registry.nodes[node_id]["severity"] = "offline"
                broadcast_live_event("node_offline", {
                    "node_id": node_id,
                    "status": "offline",
                    "reason": data.get("reason", "MQTT Last Will and Testament trigger"),
                    "last_seen": datetime.now(IST).isoformat()
                })
            else:
                print(f"[HEARTBEAT] Node {node_id} health: Battery={data.get('battery_pct')}%, RSSI={data.get('rssi_dbm') or data.get('signal_strength_dbm')}dBm")
                node_registry.update_health(node_id, data)
                broadcast_live_event("node_health", {
                    "node_id": node_id,
                    "battery_pct": data.get("battery_pct"),
                    "rssi_dbm": data.get("rssi_dbm") or data.get("signal_strength_dbm"),
                    "status": "online"
                })

        # Format 3: sih/nodes/{node_id}/alert OR sensors/{node_id}/alert
        elif (len(parts) == 4 and parts[0] == "sih" and parts[1] == "nodes" and parts[3] == "alert") or \
             (len(parts) == 3 and parts[0] == "sensors" and parts[2] == "alert"):
            node_id = parts[2] if len(parts) == 4 else parts[1]
            confidence = float(data.get("confidence", 85.0))
            hazard = str(data.get("hazard") or data.get("hazard_type") or "anomaly")
            
            # Confidence Threshold Gating (Qualcomm Section 3.2)
            if confidence < CONFIDENCE_THRESHOLD:
                print(f"[ALERT SUPPRESSED] Alert from {node_id} dropped: {confidence}% is below threshold ({CONFIDENCE_THRESHOLD}%).")
                return

            print(f"\n[AI TRIGGER] Node {node_id} flagged {hazard.upper()} with {confidence}% confidence.")
            alert = generate_ndma_cap_alert(node_id, hazard, confidence, data)
            correlated_alert = correlation_engine.evaluate_and_correlate(alert)
            record_and_publish_alert(client, correlated_alert)
            broadcast_live_event("alert_trigger", correlated_alert)

        # Format 4: Legacy flat topic 'sih/sensors' or 'sih/edge_nodes/trigger'
        elif topic in (LEGACY_SENSOR_TOPIC, LEGACY_TRIGGER_TOPIC):
            node_id = str(data.get("node_id", "NODE_GENERIC"))
            hazard = str(data.get("hazard", ""))
            confidence = float(data.get("confidence", 85.0))
            
            if hazard:
                if confidence < CONFIDENCE_THRESHOLD:
                    print(f"[LEGACY ALERT SUPPRESSED] {confidence}% below {CONFIDENCE_THRESHOLD}%.")
                    return
                print(f"[LEGACY TRIGGER] Received hazard '{hazard}' from {node_id} on {topic}")
                alert = generate_ndma_cap_alert(node_id, hazard, confidence, data)
                correlated_alert = correlation_engine.evaluate_and_correlate(alert)
                record_and_publish_alert(client, correlated_alert)
                broadcast_live_event("alert_trigger", correlated_alert)
            else:
                data["node_id"] = node_id
                process_esp32_reading(data)

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
async def heartbeat_watchdog():
    """Background watchdog running every 15s checking for nodes exceeding 5-minute timeout."""
    print(f"[WATCHDOG STARTED] Node heartbeat timeout set to {HEARTBEAT_TIMEOUT_SECONDS}s (5 minutes)")
    while True:
        try:
            await asyncio.sleep(15)
            now = datetime.now(IST)
            for nid, node in list(node_registry.nodes.items()):
                if node.get("status") == "online":
                    last_seen_val = node.get("last_seen")
                    if not last_seen_val:
                        continue
                    last_dt = datetime.fromisoformat(last_seen_val) if isinstance(last_seen_val, str) else last_seen_val
                    if last_dt.tzinfo is None:
                        last_dt = IST.localize(last_dt)
                    elapsed = (now - last_dt).total_seconds()
                    if elapsed > HEARTBEAT_TIMEOUT_SECONDS:
                        node["status"] = "offline"
                        node["severity"] = "offline"
                        print(f"[WATCHDOG] Node {nid} timed out ({int(elapsed)}s > {HEARTBEAT_TIMEOUT_SECONDS}s). Marked OFFLINE.")
                        broadcast_live_event("node_offline", {
                            "node_id": nid,
                            "status": "offline",
                            "reason": f"Heartbeat timeout (> {HEARTBEAT_TIMEOUT_SECONDS}s without telemetry ping)",
                            "last_seen": last_seen_val
                        })
        except asyncio.CancelledError:
            break
        except Exception as e:
            print(f"[WATCHDOG ERROR] {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    global main_event_loop
    main_event_loop = asyncio.get_running_loop()
    print("=========================================================")
    print("🚀 Initializing SIH 2026 Environmental Intelligence Hub")
    print(f"📡 MQTT Broker Target: {MQTT_BROKER}:{MQTT_PORT}")
    print(f"📊 InfluxDB Time-Series: {INFLUXDB_URL}")
    print(f"⏱️ Heartbeat Timeout: {HEARTBEAT_TIMEOUT_SECONDS}s (5 minutes)")
    print("=========================================================")
    try:
        mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
        mqtt_client.loop_start()
    except Exception as e:
        print(f"⚠️ [MQTT WARN] Could not reach MQTT broker at {MQTT_BROKER}:{MQTT_PORT} ({e}).")
        print("Tip: Run 'docker compose up -d' to start the Mosquitto broker container.")
    
    # Start background heartbeat watchdog task
    watchdog_task = asyncio.create_task(heartbeat_watchdog())

    yield

    print("🛑 Shutting down SIH 2026 Backend...")
    watchdog_task.cancel()
    try:
        await watchdog_task
    except asyncio.CancelledError:
        pass
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

# --- WebSocket & Hardware Ingestion Endpoints ---
class ESP32TelemetryPayload(BaseModel):
    node_id: str = Field(..., example="IN-ASM-042", description="Unique station or ESP32 node identifier")
    timestamp: Optional[str] = Field(None, example="2026-09-09T16:30:00+05:30")
    hazard_type: Optional[str] = Field("flood", example="flood", description="flood | aqi | landslide | seismic | cyclone | fire")
    battery_voltage: Optional[float] = Field(None, example=3.84)
    battery_pct: Optional[float] = Field(None, example=92.0)
    signal_strength_dbm: Optional[int] = Field(None, example=-65)
    rssi_dbm: Optional[int] = Field(None, example=-65)
    status: Optional[str] = Field("online", example="online")
    lat: Optional[float] = None
    lon: Optional[float] = None
    value: Optional[float] = None
    unit: Optional[str] = None
    sensors: Optional[Dict[str, Any]] = Field(default_factory=dict)

@app.post("/api/telemetry", tags=["Hardware Ingestion"], summary="Ingest real ESP32 sensor reading via REST (Dual MQTT/HTTP pipeline)")
def ingest_esp32_telemetry(payload: ESP32TelemetryPayload):
    """
    Ingests live telemetry from physical ESP32 sensor nodes.
    Validates data, classifies severity (Nominal, Warning, Abnormal, Critical),
    persists reading, evaluates alerts, and pushes instant WebSocket update to dashboard.
    """
    data = payload.dict()
    result = process_esp32_reading(data)
    return result

@app.websocket("/ws/telemetry")
async def websocket_telemetry_stream(websocket: WebSocket):
    """
    Real-time bi-directional WebSocket push endpoint for React dashboard.
    Delivers instantaneous sensor reading updates, severity transitions,
    and hazard alerts with sub-50ms latency.
    """
    await ws_manager.connect(websocket)
    try:
        # Send initial snapshot of all registered nodes upon connection
        await websocket.send_text(json.dumps({
            "type": "init_snapshot",
            "timestamp": datetime.now(IST).isoformat(),
            "nodes": node_registry.get_all(),
            "active_alerts": stored_alerts[:10]
        }))
        while True:
            msg = await websocket.receive_text()
            if msg == "ping":
                await websocket.send_text(json.dumps({
                    "type": "pong",
                    "timestamp": datetime.now(IST).isoformat()
                }))
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception:
        ws_manager.disconnect(websocket)


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

# Deduplication caches for emergency SMS alerts
critical_sms_sent_tracker: Dict[str, float] = {}
warning_sms_sent_tracker: Dict[str, float] = {}

# --- Twilio Emergency Alert Notification Endpoint ---
class NotifyPayload(BaseModel):
    node_id: str = Field("IN-ASM-042", example="IN-ASM-042")
    location: str = Field("Dibrugarh Basin, Assam", example="Dibrugarh Basin, Assam")
    hazard_type: str = Field("FLOOD", example="FLOOD")
    severity: str = Field("critical", example="critical")
    key_metric: str = Field("+4.2m crest (Level-3 Critical)", example="+4.2m crest (Level-3 Critical)")
    action_type: str = Field("emergency_critical", example="emergency_critical", description="emergency_critical | warning_advisory | alert_ndrf | send_dispatch")
    notes: Optional[str] = Field(None, example="Automated critical emergency trigger")
    recipient_numbers: Optional[List[str]] = None

@app.post("/api/notify", tags=["Notification Engine"], summary="Dispatch Twilio SMS alert for Warning & Critical Detections")
def notify_authorities(payload: NotifyPayload):
    """
    Receives notification requests. As per operational specifications:
    - SMS sending triggers on WARNING (advisory) and CRITICAL / EMERGENCY detections.
    - 'send_dispatch' and routine dispatch actions do NOT send any SMS.
    - Sends to a single configured recipient phone (ALERT_RECIPIENT_PHONE).
    - Distinct deduplication prevents repeated SMS alerts for the same ongoing tier.
    - Escalation from Warning to Critical fires immediately without suppression.
    """
    # 1. Reject SMS for dispatch actions
    if payload.action_type == "send_dispatch":
        print(f"[SMS SUPPRESSED] Dispatch action requested for {payload.node_id}. SMS disabled for field dispatches.")
        return {
            "status": "skipped",
            "message": "Twilio SMS is disabled on field dispatch action.",
            "node_id": payload.node_id
        }

    # 2. Allow warning, abnormal, critical, and alert_ndrf
    sev = payload.severity.lower()
    if sev not in ("warning", "abnormal", "critical") and payload.action_type != "alert_ndrf":
        return {
            "status": "skipped",
            "message": f"SMS reserved for WARNING and CRITICAL tiers (received: {payload.severity})",
            "node_id": payload.node_id
        }

    is_warning = (sev == "warning")
    clean_nid = payload.node_id.strip().upper()
    now = time.time()

    # 3. Deduplication: One SMS per ongoing tier on this node
    if is_warning:
        dedup_key = f"warning:{clean_nid}"
        last_sent = warning_sms_sent_tracker.get(dedup_key, 0)
    else:
        dedup_key = f"critical:{clean_nid}"
        last_sent = critical_sms_sent_tracker.get(dedup_key, 0)
    
    # 15-minute cooldown per ongoing state to prevent spamming
    if now - last_sent < SMS_COOLDOWN_SECONDS:
        remaining = int(SMS_COOLDOWN_SECONDS - (now - last_sent))
        print(f"[TWILIO DEDUP] Suppressed duplicate {sev.upper()} SMS for {payload.node_id}. Cooldown active: {remaining}s remaining.")
        return {
            "status": "deduplicated",
            "message": f"{sev.capitalize()} alert already sent for node {payload.node_id}. Cooldown active ({remaining}s remaining).",
            "cooldown_remaining": remaining
        }

    current_time_ist = datetime.now(IST).strftime("%H:%M:%S IST")
    
    # Tiered SMS templates
    if is_warning:
        sms_body = (
            f"⚠️ [AAPDA-KADABRA WARNING ADVISORY] ⚠️\n"
            f"Hazard: {payload.hazard_type.upper()} — ELEVATED\n"
            f"Node: #{payload.node_id} ({payload.location})\n"
            f"Metric: {payload.key_metric}\n"
            f"Status: WARNING LEVEL — ELEVATED SURVEILLANCE\n"
            f"Time: {current_time_ist}\n"
            f"Directive: Reading trending toward danger threshold. Field standby and enhanced sensor polling advised."
        )
    else:
        sms_body = (
            f"🚨 [AAPDA-KADABRA CRITICAL DISASTER ALERT] 🚨\n"
            f"Hazard: {payload.hazard_type.upper()} — DANGER BREACH\n"
            f"Node: #{payload.node_id} ({payload.location})\n"
            f"Metric: {payload.key_metric}\n"
            f"Status: CRITICAL / EMERGENCY LEVEL\n"
            f"Time: {current_time_ist}\n"
            f"Directive: Danger threshold breached. Immediate evacuation ordered. Tactical NDRF response deployed."
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
        banner_title = "WARNING ADVISORY" if is_warning else "CRITICAL EMERGENCY ALERT"
        print("\n" + "="*60)
        print(f"[TWILIO SIMULATION // {banner_title}]")
        print(f"Target Recipient: {target_phone}")
        print("Message Preview:\n" + sms_body)
        print("="*60 + "\n")
        
        if is_warning:
            warning_sms_sent_tracker[dedup_key] = now
        else:
            critical_sms_sent_tracker[dedup_key] = now

        voice_result = None
        if not is_warning:
            voice_result = trigger_voice_call({
                "node_id": payload.node_id,
                "hazard_type": payload.hazard_type,
                "location": payload.location,
                "key_metric": payload.key_metric,
                "severity": sev,
                "action_type": payload.action_type
            })

        return {
            "status": "simulated",
            "message": f"Twilio credentials not configured; {sev.upper()} alert simulated in logs",
            "action_type": payload.action_type,
            "severity": sev,
            "recipient": target_phone,
            "sms_body": sms_body,
            "voice_call": voice_result,
            "timestamp": datetime.now(IST).isoformat()
        }

    # Dispatch via Twilio Client
    if is_warning:
        warning_sms_sent_tracker[dedup_key] = now
    else:
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

        # For Critical/Emergency and NDRF alerts: place automated Voice Call alongside SMS
        voice_result = None
        if not is_warning:
            voice_result = trigger_voice_call({
                "node_id": payload.node_id,
                "hazard_type": payload.hazard_type,
                "location": payload.location,
                "key_metric": payload.key_metric,
                "severity": sev,
                "action_type": payload.action_type
            })
        else:
            voice_result = {
                "status": "skipped",
                "reason": "Warning tier events are SMS-only (no voice call)"
            }

        return {
            "status": "success" if dispatched_sids else "failed",
            "message": f"Twilio SMS & Alert pipeline processed for {len(dispatched_sids)} recipient(s)",
            "action_type": payload.action_type,
            "recipients": target_numbers,
            "dispatched": dispatched_sids,
            "voice_call": voice_result,
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

# --- Dynamic Voice Alert & Webhook Endpoints ---
@app.get("/api/voice-alert/{node_id}", response_class=Response, tags=["Notification Engine"], summary="Dynamic TwiML endpoint for emergency voice calls")
def get_voice_alert_twiml(node_id: str):
    """
    Returns dynamic TwiML XML speech for a specific node station.
    Matches node's current hazard, location, and key metric.
    """
    clean_id = node_id.strip().upper()
    node = node_registry.get(clean_id) or {}
    hazard = node.get("hazard_type") or "FLOOD"
    loc = node.get("region") or node.get("location") or "Tactical Sector"
    metric = node.get("key_metric") or "Critical threshold breached"
    speech = build_emergency_speech(clean_id, hazard, loc, metric)
    twiml = build_twiml_xml(speech)
    return Response(content=twiml, media_type="application/xml")

@app.post("/api/twilio/voice-status", tags=["Notification Engine"], summary="Twilio Voice call status callback webhook")
async def twilio_voice_status_webhook(request: Request):
    """
    Receives Twilio call lifecycle status callbacks (initiated, ringing, in-progress, completed, busy, no-answer, failed).
    Updates internal dispatch audit log and broadcasts to dashboard.
    """
    try:
        form = await request.form()
        call_sid = form.get("CallSid")
        call_status = form.get("CallStatus", "unknown")
        call_duration = form.get("CallDuration")
        to_phone = form.get("To", "")

        print(f"[TWILIO VOICE STATUS] Call {call_sid} -> Status: {call_status} (Duration: {call_duration}s)")

        # Update in-memory log
        for rec in voice_call_logs:
            if rec.get("call_sid") == call_sid:
                rec["status"] = call_status
                if call_duration:
                    rec["duration_seconds"] = int(call_duration)
                break

        # Broadcast update over WebSocket
        broadcast_live_event("voice_call_status_update", {
            "call_sid": call_sid,
            "status": call_status,
            "duration": call_duration,
            "recipient": to_phone
        })

        if call_status in ("busy", "no-answer", "failed", "canceled"):
            print(f"[TWILIO VOICE WARNING] Emergency call {call_sid} to {to_phone} was not answered ({call_status}). Backup SMS remains primary delivery.")

        return {"status": "recorded", "call_sid": call_sid, "call_status": call_status}
    except Exception as e:
        print(f"[TWILIO VOICE STATUS ERROR] {e}")
        return {"status": "error", "message": str(e)}

@app.get("/api/voice-call-logs", tags=["Notification Engine"], summary="Retrieve emergency voice call audit trail")
def get_voice_call_logs():
    """Returns the central audit trail of all automated emergency voice calls placed."""
    return {
        "total": len(voice_call_logs),
        "logs": voice_call_logs[:50]
    }

class DirectVoiceTriggerPayload(BaseModel):
    node_id: str = Field("IN-ASM-042", example="IN-ASM-042")
    hazard_type: str = Field("FLOOD", example="FLOOD")
    location: str = Field("Dibrugarh Basin, Assam", example="Dibrugarh Basin, Assam")
    key_metric: str = Field("+4.2m crest (Level-3 Critical)", example="+4.2m crest (Level-3 Critical)")
    severity: str = Field("critical", example="critical")

@app.post("/api/trigger-voice-call", tags=["Notification Engine"], summary="Directly trigger an emergency automated voice call")
def manual_voice_call_trigger(payload: DirectVoiceTriggerPayload):
    """Allows manual/programmatic invocation of the automated voice call pipeline for testing & NDRF command."""
    return trigger_voice_call(payload.model_dump())

@app.post("/api/reset-node/{node_id}", tags=["Notification Engine"], summary="Reset node deduplication trackers")
def reset_node_state(node_id: str):
    """Resets SMS and Voice call deduplication trackers when an alert is resolved."""
    clean_id = node_id.strip().upper()
    warning_sms_sent_tracker.pop(f"warning:{clean_id}", None)
    critical_sms_sent_tracker.pop(f"critical:{clean_id}", None)
    critical_voice_call_tracker.pop(f"call:{clean_id}", None)
    return {"status": "reset", "node_id": clean_id}

if __name__ == "__main__":
    import uvicorn
    print("Starting SIH 2026 NDMA Environmental Intelligence Backend on http://127.0.0.1:8000 ...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

