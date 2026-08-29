from fastapi import FastAPI
import paho.mqtt.client as mqtt

app = FastAPI(title="SIH 2026 Backend API")

# MQTT Setup
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
MQTT_TOPIC = "sih/sensors/#"

def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT broker with result code {rc}")
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    print(f"Received message on topic {msg.topic}: {msg.payload.decode()}")
    # Here the Cloud Architect will add logic to save to InfluxDB and trigger alerts

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

@app.on_event("startup")
def startup_event():
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()

@app.get("/")
def read_root():
    return {"status": "Backend is running and listening to MQTT"}
