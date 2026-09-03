from fastapi import FastAPI
import paho.mqtt.client as mqtt
import json
from datetime import datetime
import pytz

app = FastAPI(title="SIH 2026 Backend API - NDMA CAP Generator")

# MQTT Setup
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
ESP32_TOPIC = "sih/edge_nodes/trigger"
NDMA_DASHBOARD_TOPIC = "sih/dashboard/ndma_alerts"

# Helper function to generate NDMA CAP Message
def generate_ndma_cap_alert(node_data):
    ist = pytz.timezone('Asia/Kolkata')
    current_time = datetime.now(ist).isoformat()
    
    hazard_type = node_data.get("hazard", "unknown").lower()
    confidence = node_data.get("confidence", 0)
    node_id = node_data.get("node_id", "UNKNOWN_NODE")
    
    # Default alert structure
    alert = {
        "identifier": f"NDMA-{node_id}-{int(datetime.now().timestamp())}",
        "sender": "SIH-Environmental-Intelligence-Network",
        "sent": current_time,
        "status": "Actual",
        "msgType": "Alert",
        "scope": "Public",
        "info": {
            "category": "Env",
            "event": "Unknown Environmental Anomaly",
            "urgency": "Expected",
            "severity": "Moderate",
            "certainty": "Possible",
            "headline": f"Anomaly detected at {node_id}",
            "description": f"Raw data triggers anomaly at {confidence}% confidence.",
            "instruction": "Standby for further analysis.",
            "area": {
                "areaDesc": "Designated Sensor Zone",
            }
        }
    }

    # Customize based on hazard type
    if hazard_type == "fire":
        alert["info"]["event"] = "Forest Fire Precursor Detected"
        alert["info"]["urgency"] = "Immediate"
        alert["info"]["severity"] = "Severe"
        alert["info"]["certainty"] = "Observed"
        alert["info"]["headline"] = f"SEVERE ALERT: High probability of spontaneous ignition near {node_id}"
        alert["info"]["description"] = f"Edge AI indicates {confidence}% confidence of fire conditions. Elevated VOCs and high temperatures detected."
        alert["info"]["instruction"] = "Deploy local rapid response team immediately. Evacuate surrounding 2km radius."
    
    elif hazard_type == "landslide":
        alert["info"]["category"] = "Geo"
        alert["info"]["event"] = "Imminent Landslide Warning"
        alert["info"]["urgency"] = "Immediate"
        alert["info"]["severity"] = "Extreme"
        alert["info"]["headline"] = f"EXTREME ALERT: Critical soil shifting detected at {node_id}"
        alert["info"]["description"] = f"MPU6050 accelerometer and soil moisture data indicate {confidence}% confidence of slope failure."
        alert["info"]["instruction"] = "Halt all traffic on nearby roads. Initiate emergency evacuation of downhill settlements."

    return alert

def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT broker with result code {rc}")
    client.subscribe(ESP32_TOPIC)
    print(f"Listening for raw ESP32 triggers on: {ESP32_TOPIC}")

def on_message(client, userdata, msg):
    print(f"\n--- Raw ESP32 Trigger Received ---")
    try:
        # 1. Receive the tiny, raw JSON from ESP32
        payload = msg.payload.decode()
        print(f"Raw Payload: {payload}")
        node_data = json.loads(payload)
        
        # 2. Transform it into a massive NDMA CAP message
        ndma_alert = generate_ndma_cap_alert(node_data)
        
        # 3. Publish the official NDMA alert for the React Dashboard to consume
        ndma_json = json.dumps(ndma_alert, indent=2)
        print("Generated NDMA CAP Alert:")
        print(ndma_json)
        
        client.publish(NDMA_DASHBOARD_TOPIC, json.dumps(ndma_alert))
        print(f"Successfully published NDMA alert to {NDMA_DASHBOARD_TOPIC}")
        
    except Exception as e:
        print(f"Error processing message: {e}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

@app.on_event("startup")
def startup_event():
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()

@app.get("/")
def read_root():
    return {"status": "NDMA Backend is running and converting ESP32 triggers into CAP alerts."}
