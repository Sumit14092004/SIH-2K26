"""
SIH 2026 - Edge Node & Disaster Simulator (Qualcomm Evaluation Suite)
Supports:
1. Periodic Telemetry (sih/nodes/{id}/telemetry)
2. AI Hazard Anomaly Triggers (sih/nodes/{id}/alert)
3. Node Health & Heartbeats (sih/nodes/{id}/health)
4. Cross-Node Multi-Node Correlation Demo (triggers cluster escalation to Emergency)
"""
import argparse
import json
import time
from datetime import datetime
import paho.mqtt.client as mqtt

def get_mqtt_client(broker: str, port: int):
    try:
        client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    except AttributeError:
        client = mqtt.Client()
    client.connect(broker, port, 60)
    client.loop_start()
    time.sleep(0.3)
    return client

def simulate_telemetry(client, node_id: str, lat: float, lon: float):
    topic = f"sih/nodes/{node_id}/telemetry"
    payload = {
        "node_id": node_id,
        "timestamp": datetime.now().isoformat(),
        "lat": lat,
        "lon": lon,
        "sensors": {
            "temperature": 34.2,
            "humidity": 42.0,
            "pressure": 1008.5,
            "pm25": 55.0,
            "pm10": 78.0,
            "mq135_ppm": 240.0,
            "soil_moisture": 38.0,
            "water_level_cm": 22.0,
            "vibration_g": 0.02,
            "rainfall_intensity": 0.0
        }
    }
    client.publish(topic, json.dumps(payload))
    print(f"📡 [TELEMETRY SENT] Published 30s readings to {topic}")

def simulate_health(client, node_id: str, battery: float = 94.0, rssi: int = -65):
    topic = f"sih/nodes/{node_id}/health"
    payload = {
        "node_id": node_id,
        "timestamp": datetime.now().isoformat(),
        "battery_pct": battery,
        "rssi_dbm": rssi,
        "uptime_seconds": 18450
    }
    client.publish(topic, json.dumps(payload))
    print(f"💓 [HEARTBEAT SENT] Published node health to {topic}")

def simulate_alert(client, node_id: str, hazard: str, confidence: float, lat: float, lon: float):
    topic = f"sih/nodes/{node_id}/alert"
    payload = {
        "node_id": node_id,
        "timestamp": datetime.now().isoformat(),
        "hazard": hazard,
        "confidence": confidence,
        "lat": lat,
        "lon": lon,
        "location": f"Zone Sector ({lat}, {lon})",
        "sensors": {
            "temperature": 58.5 if "fire" in hazard or "heat" in hazard else 28.0,
            "humidity": 14.0 if "fire" in hazard else 70.0,
            "mq135_ppm": 750.0 if "fire" in hazard or "chemical" in hazard else 210.0,
            "pm25": 380.0 if "pollution" in hazard else 45.0,
            "water_level_cm": 190.0 if "flood" in hazard else 15.0,
            "vibration_g": 1.6 if "landslide" in hazard else 0.02,
            "soil_moisture": 85.0 if "landslide" in hazard else 30.0,
            "turbidity_ntu": 85.0 if "water" in hazard else 12.0
        }
    }
    client.publish(topic, json.dumps(payload))
    print(f"\n🚨 [AI ALERT SENT] Published {hazard.upper()} ({confidence}%) to {topic}")
    print(json.dumps(payload, indent=2))

def simulate_cluster_escalation(client):
    """Demonstrates cross-node correlation by firing 2 adjacent nodes within 5km and 2 seconds."""
    print("\n" + "="*60)
    print("🔥 INITIATING MULTI-NODE CLUSTER CORRELATION DEMO")
    print("Node 1: Simlipal Core (21.6833, 86.3500)")
    print("Node 2: Simlipal Buffer (21.7200, 86.3800) [Distance: ~5.2 km]")
    print("="*60)
    
    # Node 1 Trigger
    simulate_alert(client, "NODE_FOREST_01", "forest_fire", 91.0, 21.6833, 86.3500)
    time.sleep(2)
    
    # Node 2 Trigger (Adjacent)
    simulate_alert(client, "NODE_FOREST_02", "forest_fire", 94.0, 21.7200, 86.3800)
    print("\n✅ Sent 2 correlated triggers. The backend correlation engine will escalate this to [EMERGENCY]!")

def main():
    parser = argparse.ArgumentParser(description="SIH 2026 Qualcomm Evaluation Simulator")
    parser.add_argument("--broker", default="localhost")
    parser.add_argument("--port", type=int, default=1883)
    parser.add_argument("--mode", default="alert", choices=["telemetry", "health", "alert", "cluster"], help="Simulation mode")
    parser.add_argument("--hazard", default="forest_fire", choices=[
        "forest_fire", "flash_flood", "hazardous_air_pollution", 
        "extreme_heat", "landslide", "industrial_chemical_leak", "water_quality_degradation", "rescue"
    ])
    parser.add_argument("--confidence", type=float, default=93.5)
    parser.add_argument("--node", default="NODE_FOREST_01")
    parser.add_argument("--lat", type=float, default=21.6833)
    parser.add_argument("--lon", type=float, default=86.3500)

    args = parser.parse_args()

    try:
        client = get_mqtt_client(args.broker, args.port)
    except Exception as e:
        print(f"❌ Failed to connect to MQTT broker at {args.broker}:{args.port}: {e}")
        print("Make sure Docker container 'sih_mqtt_broker' is up via 'docker compose up -d'.")
        return

    if args.mode == "telemetry":
        simulate_telemetry(client, args.node, args.lat, args.lon)
    elif args.mode == "health":
        simulate_health(client, args.node)
    elif args.mode == "alert":
        simulate_alert(client, args.node, args.hazard, args.confidence, args.lat, args.lon)
    elif args.mode == "cluster":
        simulate_cluster_escalation(client)

    time.sleep(1)
    client.loop_stop()
    client.disconnect()

if __name__ == "__main__":
    main()
