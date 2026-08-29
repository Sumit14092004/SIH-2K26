# SIH 2026: Team Execution & Workflow Plan

This document outlines the exact, step-by-step workflow for how all 6 team members will execute their roles in parallel without stepping on each other's toes.

## Phase 0: The Universal First Step (Everyone)
Before anyone writes a single line of code, every technical member must do the following on their own laptop:
1. Open terminal and run: `git clone https://github.com/Sumit14092004/SIH-2K26.git`
2. Open the cloned `SIH-2K26` folder in **Antigravity IDE**.
3. *Rule:* Never push broken code to the `main` branch. If you are experimenting, create a new branch (`git checkout -b feature/my-new-idea`).

---

## Member 1: Hardware & Firmware Engineer
**Workspace:** `hardware_node/`

*   **Step 1:** In Antigravity IDE, install the **PlatformIO** extension.
*   **Step 2:** Open the `hardware_node/` folder. PlatformIO will automatically read the `platformio.ini` file and download the required libraries.
*   **Step 3:** Wire the ESP32 to the BME680 (Temp/Humidity) and MQ-135 (Gas) sensors on a breadboard.
*   **Step 4:** Ask the Antigravity Agent: *"Write the C++ `main.cpp` code to read data from the BME680 and MQ135 every 2 seconds and print it to the Serial Monitor."*
*   **Step 5:** Once sensor data is printing, update the code to connect to a local WiFi network and publish that data as JSON to the MQTT broker.

## Member 2: Edge AI Engineer
**Workspace:** Edge Impulse (Web) + `hardware_node/`

*   **Step 1:** Create a free account on **Edge Impulse**.
*   **Step 2 (Data Collection):** Sit next to Member 1. Modify the ESP32 code to output sensor data in a clean CSV format over the Serial port.
*   **Step 3:** Forward that serial data into Edge Impulse using their Data Forwarder tool. Collect 10 minutes of "Normal" room data. Then, light a match or use a hairdryer to collect 5 minutes of "Fire/Anomaly" data.
*   **Step 4:** Train an Anomaly Detection model in Edge Impulse.
*   **Step 5:** Export the model as an **Arduino Library**. Unzip it into the `hardware_node/lib/` folder.
*   **Step 6:** Work with Member 1 to implement the `model.predict()` function so the ESP32 only sends MQTT messages when an anomaly is detected.

## Member 3: Cloud Backend Architect
**Workspace:** `backend/` and Docker

*   **Step 1:** Install **Docker Desktop** on your laptop.
*   **Step 2:** In the root of the project, run `docker compose up -d`. This starts the MQTT Broker (Mosquitto) and the Database (InfluxDB) silently in the background.
*   **Step 3:** Open the `backend/` folder in the terminal. Run `pip install -r requirements.txt` (preferably inside a python virtual environment).
*   **Step 4:** Run the backend using `uvicorn main:app --reload`.
*   **Step 5:** Create a free Twilio account (for SMS) or SendGrid account (for Email).
*   **Step 6:** Ask the Antigravity Agent: *"Update `main.py` so that when a message is received on the MQTT topic 'sih/sensors' with the hazard 'fire', it triggers a Twilio SMS to my phone."*

## Member 4: Frontend Web Developer
**Workspace:** `dashboard/`

*   **Step 1:** Open the `dashboard/` folder in the terminal. Run `npm install` and then `npm run dev`.
*   **Step 2:** Create a free account at **Mapbox.com** and get a public API key.
*   **Step 3:** Ask the Antigravity Agent: *"I want to replace the placeholder map in `App.jsx` with `react-map-gl`. Here is my Mapbox API key. Make the map center on India."*
*   **Step 4:** Update the UI to visually flash red or display a warning banner whenever a new alert arrives in the MQTT WebSocket stream.
*   **Step 5:** Refine the CSS. Make it look like a high-tech government dashboard (dark mode, glowing borders, crisp fonts).

## Member 5: Systems Integrator & DevOps (Sumit)
**Workspace:** The entire repository

*   **Step 1 (Local Testing):** Ensure your laptop and Member 1's (Hardware) laptop are on the same WiFi network. Tell Member 1 to point their ESP32 MQTT code to *your* laptop's local IP address (e.g., `192.168.1.5`).
*   **Step 2:** Run the Docker containers, the FastAPI backend, and the React frontend on your machine.
*   **Step 3:** Have Member 1 trigger a sensor (e.g., blow smoke on it). Watch the data travel from their ESP32 -> Your WiFi -> Your Docker MQTT -> Your Python Backend (sends SMS) -> Your React Dashboard (flashes red).
*   **Step 4 (Deployment):** For the final judging, running off a local IP is risky. You will deploy the Mosquitto Broker to a cheap cloud server (like DigitalOcean or AWS EC2), deploy the React app to Vercel, and deploy the FastAPI backend to Render. Update the URLs in the code accordingly.

## Member 6: Project Manager & Pitch Specialist
**Workspace:** PowerPoint / Canva / Word

*   **Step 1:** Read the `qualcomm_evaluation_rubric.md`.
*   **Step 2:** Interview the team. Ask Member 2 *how* Edge Impulse works. Ask Member 1 *how much power* the ESP32 uses. You need these answers for the judges.
*   **Step 3:** Design the Architecture Diagram for the PPT (showing ESP32 -> MQTT -> Cloud -> Dashboard).
*   **Step 4:** Script the 3-minute pitch. 
    *   *Minute 1:* The Problem (Disasters in India) & The Architecture.
    *   *Minute 2:* The Live Demo (Coordinating with Member 5 to trigger the hardware live on stage).
    *   *Minute 3:* The BOM Cost, Power Efficiency, and Scalability.
*   **Step 5:** Keep the team on schedule. If Member 4 is spending 3 hours changing a button color while the map is broken, tell them to focus on the map!
