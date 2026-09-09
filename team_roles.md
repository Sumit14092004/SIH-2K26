# SIH 2026: Team Roles & Responsibilities

## Technical Team (The 5 Third-Years)

### 1. Hardware & Firmware Engineer (The Node Builder)
**Responsibilities:**
- Wires the ESP32 to the BME680, MQ-135, and Ultrasonic sensors.
- Builds the power management circuit (18650 Battery + TP4056 + Solar Panel).
- Writes the C++ (PlatformIO) code to read sensors, manage deep sleep, and connect to WiFi/MQTT.
- **Key Challenge:** Keeping power consumption as low as possible.

### 2. Edge AI Engineer (The TinyML Specialist)
**Responsibilities:**
- Uses Edge Impulse (or TensorFlow Lite for Microcontrollers).
- Works with the Hardware Engineer to collect baseline data (normal conditions) and anomaly data (e.g., introducing smoke/heat).
- Trains the machine learning model to detect floods/fires.
- Flashes the trained `.tflite` model or C++ library onto the ESP32.
- **Key Challenge:** Fitting the ML model into the ESP32's limited RAM.

### 3. Cloud & Backend Architect (The Data Pipeline)
**Responsibilities:**
- Sets up the MQTT Broker (e.g., Eclipse Mosquitto or AWS IoT).
- Builds the backend server (Python FastAPI or Node.js).
- Sets up the database (InfluxDB for time-series data or standard PostgreSQL).
- Writes the logic that triggers SMS/Email alerts to authorities when a critical flag is received.
- **Key Challenge:** Handling concurrent data streams if multiple nodes send data at once.

### 4. Frontend Web Developer (The Command Center)
**Responsibilities:**
- Builds the React.js / Next.js web application.
- Integrates a geospatial mapping library (Mapbox or Leaflet).
- Plots the sensor nodes on the map using GPS coordinates.
- Creates dynamic heatmaps or "Risk Zones" based on incoming data.
- **Key Challenge:** Making the dashboard look like a professional, high-stakes disaster management tool.

### 5. Systems Integrator & DevOps (The Glue)
**Responsibilities:**
- Connects the Frontend to the Backend (API integration).
- Ensures the MQTT data is flowing smoothly from the Hardware to the Cloud.
- Manages the Git repository and Antigravity IDE setups for the team.
- Handles deploying the backend and frontend to the web (e.g., Vercel, Render, AWS).
- **Key Challenge:** Debugging cross-platform issues (e.g., "Why is the hardware sending data but the dashboard isn't updating?").

---

## Strategy & Presentation

### 6. Project Manager & Pitch Specialist (First-Year Member)
**Responsibilities:**
- **Deep Understanding:** Studies the architecture end-to-end. Knows *how* the ESP32 talks to MQTT, and *why* TinyML is being used.
- **Qualcomm Alignment:** Constantly checks the team's work against the Qualcomm problem statement requirements to ensure no points are missed.
- **The Pitch Deck:** Designs a stunning PowerPoint presentation that explains the problem, the architecture, the cost (BOM), and the scalability.
- **Demo Flow:** Scripts and directs the live demo for the judges (e.g., "Now, I will hold a lighter near the node to simulate a fire, watch the dashboard...").
- **Key Challenge:** Translating complex technical jargon into a compelling, 3-minute business and impact story for the judges.
