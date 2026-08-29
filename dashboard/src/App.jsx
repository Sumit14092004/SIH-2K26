import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [alerts, setAlerts] = useState([])
  const [status, setStatus] = useState("Connected to SIH Command Center")

  // Simulating incoming MQTT data for the demo
  useEffect(() => {
    const timer = setInterval(() => {
      const hazards = ['🔥 Forest Fire Detected', '🌊 Rapid Water Level Rise', '💨 Hazardous AQI Drop']
      const regions = ['Sector 4, North Forest', 'River Gauge 02', 'Industrial Zone B']
      
      const newAlert = {
        id: Date.now(),
        hazard: hazards[Math.floor(Math.random() * hazards.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        time: new Date().toLocaleTimeString(),
        confidence: (Math.random() * (99 - 85) + 85).toFixed(1)
      }
      
      setAlerts(prev => [newAlert, ...prev].slice(0, 5)) // Keep last 5
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🌍 Environmental Intelligence Network</h1>
        <div className="status-badge pulse">{status}</div>
      </header>

      <main className="main-grid">
        <section className="map-panel">
          <div className="placeholder-map">
            <h2>Live Geospatial Map</h2>
            <p>(Mapbox integration goes here)</p>
            <div className="mock-node node-1"></div>
            <div className="mock-node node-2 alert-node"></div>
            <div className="mock-node node-3"></div>
          </div>
        </section>

        <section className="alerts-panel">
          <h2>🚨 Live Hazard Feed</h2>
          <div className="alert-list">
            {alerts.length === 0 ? <p>No active threats.</p> : null}
            {alerts.map(alert => (
              <div key={alert.id} className="alert-card">
                <div className="alert-header">
                  <span className="hazard-type">{alert.hazard}</span>
                  <span className="time">{alert.time}</span>
                </div>
                <div className="alert-details">
                  <p><strong>Location:</strong> {alert.region}</p>
                  <p><strong>AI Confidence:</strong> {alert.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
