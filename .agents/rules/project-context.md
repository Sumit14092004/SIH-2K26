---
name: Environmental Network Context
description: Core tech stack and architecture for the SIH project
---
When writing code for this project:
- **Edge Nodes (`hardware_node/`)**: Use C++ for ESP32. Focus on low power, deep sleep, and TinyML (TensorFlow Lite / Edge Impulse). Assume PlatformIO is the build system.
- **Backend (`backend/`)**: Use Python FastAPI with MQTT for sensor data ingestion.
- **Frontend (`dashboard/`)**: Use React with mapping libraries (e.g., Mapbox or Leaflet) for geospatial visualization.
