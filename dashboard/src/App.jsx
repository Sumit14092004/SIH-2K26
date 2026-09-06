import { useState, useEffect, useRef } from 'react'
import './App.css'

// Automatically uses the laptop's hotspot IP when accessed from other devices
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8000'
  : `http://${window.location.hostname}:8000`

// Web Audio API Synthesizer for Authentic Emergency Siren
class EmergencyAudioAlert {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.osc1 = null
    this.osc2 = null
    this.gainNode = null
    this.interval = null
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
  }

  startSiren() {
    this.init()
    if (!this.ctx || this.isPlaying) return
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    this.isPlaying = true
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime) // Safe pleasant volume
    this.gainNode.connect(this.ctx.destination)

    this.osc1 = this.ctx.createOscillator()
    this.osc1.type = 'sawtooth'
    this.osc1.frequency.setValueAtTime(780, this.ctx.currentTime)
    this.osc1.connect(this.gainNode)
    this.osc1.start()

    // Alternating two-tone siren effect (780Hz -> 580Hz)
    let high = true
    this.interval = setInterval(() => {
      if (!this.ctx || !this.osc1) return
      const targetFreq = high ? 580 : 780
      this.osc1.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08)
      high = !high
    }, 250)
  }

  stopSiren() {
    if (!this.isPlaying) return
    if (this.interval) clearInterval(this.interval)
    if (this.osc1) {
      try {
        this.osc1.stop()
        this.osc1.disconnect()
      } catch (e) {}
      this.osc1 = null
    }
    this.isPlaying = false
  }
}

const sirenPlayer = new EmergencyAudioAlert()

function App() {
  const [alerts, setAlerts] = useState([])
  const [nodes, setNodes] = useState([])
  const [systemHealth, setSystemHealth] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [filterTier, setFilterTier] = useState('ALL')
  const [isTriggering, setIsTriggering] = useState(false)
  const [triggerStatus, setTriggerStatus] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeBannerAlert, setActiveBannerAlert] = useState(null)
  
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})
  const circlesRef = useRef({})
  const prevAlertCountRef = useRef(0)

  // Fetch real data from the FastAPI backend
  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Health Status
      const healthRes = await fetch(`${API_BASE}/api/health`).catch(() => null)
      if (healthRes && healthRes.ok) {
        const healthData = await healthRes.json()
        setSystemHealth(healthData)
      } else {
        setSystemHealth(null)
      }

      // 2. Fetch Active Sensor Nodes
      const nodesRes = await fetch(`${API_BASE}/api/nodes`).catch(() => null)
      if (nodesRes && nodesRes.ok) {
        const nodesData = await nodesRes.json()
        setNodes(nodesData.nodes || [])
      }

      // 3. Fetch NDMA CAP Alerts
      const alertsRes = await fetch(`${API_BASE}/api/alerts?limit=25`).catch(() => null)
      if (alertsRes && alertsRes.ok) {
        const alertsData = await alertsRes.json()
        const newAlerts = alertsData.alerts || []
        setAlerts(newAlerts)

        // Check for active high-severity unacknowledged alerts
        const activeCritical = newAlerts.find(
          a => (a.warning_tier === 'Emergency' || a.warning_tier === 'Warning') && !a.acknowledged
        )

        if (activeCritical) {
          setActiveBannerAlert(activeCritical)
          // Play sound if a new alert just arrived and sound is enabled
          if (soundEnabled && newAlerts.length > prevAlertCountRef.current) {
            sirenPlayer.startSiren()
            // Auto-stop siren sound after 4.5 seconds
            setTimeout(() => sirenPlayer.stopSiren(), 4500)
          }
        } else {
          setActiveBannerAlert(null)
          sirenPlayer.stopSiren()
        }

        prevAlertCountRef.current = newAlerts.length
      }
    } catch (err) {
      console.warn('Backend polling error:', err)
    }
  }

  // Periodic polling every 3 seconds
  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 3000)
    return () => clearInterval(interval)
  }, [soundEnabled])

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapRef.current) return
    const L = window.L
    if (!L) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [22.5, 82.5],
        zoom: 5,
        zoomControl: true,
        attributionControl: false
      })

      // Clean OpenStreetMap tiles styled with our dark radar CSS filter
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        subdomains: ['a', 'b', 'c']
      }).addTo(map)

      mapInstanceRef.current = map
    }

    const map = mapInstanceRef.current

    // Render markers for all 8 nationwide nodes
    nodes.forEach(node => {
      const lat = parseFloat(node.lat)
      const lon = parseFloat(node.lon)
      if (isNaN(lat) || isNaN(lon)) return

      const hasActiveAlert = alerts.some(
        a => a.node_id === node.node_id && !a.acknowledged
      )

      const markerClass = hasActiveAlert ? 'map-marker marker-alert' : 'map-marker marker-online'
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="${markerClass}"><span></span><div class="marker-label">${node.name.split(' ')[0]}</div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })

      if (markersRef.current[node.node_id]) {
        markersRef.current[node.node_id].setLatLng([lat, lon])
        markersRef.current[node.node_id].setIcon(customIcon)
      } else {
        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map)
        marker.on('click', () => setSelectedNode(node))
        markersRef.current[node.node_id] = marker
      }

      // Threat perimeter circle overlay
      if (hasActiveAlert) {
        if (!circlesRef.current[node.node_id]) {
          const circle = L.circle([lat, lon], {
            radius: 12000, // 12 km disaster threat radius
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.25,
            weight: 2,
            dashArray: '5, 8'
          }).addTo(map)
          circlesRef.current[node.node_id] = circle
        }
      } else {
        if (circlesRef.current[node.node_id]) {
          map.removeLayer(circlesRef.current[node.node_id])
          delete circlesRef.current[node.node_id]
        }
      }
    })
  }, [nodes, alerts])

  // Authority Acknowledge Action
  const handleAcknowledgeAlert = async (alertId) => {
    sirenPlayer.stopSiren()
    try {
      const res = await fetch(`${API_BASE}/api/alerts/${alertId}/ack`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officer_name: 'NDMA Incident Command',
          notes: 'Emergency unit dispatched to coordinates.'
        })
      })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Failed to acknowledge alert:', err)
    }
  }

  // Live Demo Hazard Injection across multiple Indian regions
  const handleTriggerHazard = async (nodeId, hazardType, customData = {}) => {
    setIsTriggering(true)
    setTriggerStatus(`Deploying ${hazardType.toUpperCase()} at ${nodeId}...`)
    
    // Play sound alert immediately if enabled
    if (soundEnabled) {
      sirenPlayer.startSiren()
      setTimeout(() => sirenPlayer.stopSiren(), 4000)
    }

    try {
      const payload = {
        node_id: nodeId,
        hazard: hazardType,
        confidence: 96.0,
        ...customData
      }

      const res = await fetch(`${API_BASE}/api/test/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        const data = await res.json()
        setTriggerStatus(`Dispatched: ${data.alert.warning_tier} Alert generated!`)
        fetchDashboardData()

        if (mapInstanceRef.current && data.alert.lat && data.alert.lon) {
          mapInstanceRef.current.flyTo([data.alert.lat, data.alert.lon], 7.5, { duration: 1.2 })
        }
      }
    } catch (err) {
      setTriggerStatus('Trigger error (check backend)')
    } finally {
      setTimeout(() => {
        setIsTriggering(false)
        setTriggerStatus(null)
      }, 4000)
    }
  }

  const toggleSound = () => {
    if (soundEnabled) {
      sirenPlayer.stopSiren()
      setSoundEnabled(false)
    } else {
      setSoundEnabled(true)
      sirenPlayer.startSiren()
      setTimeout(() => sirenPlayer.stopSiren(), 800) // Brief chirp test
    }
  }

  // Filter alerts by Warning Tier
  const filteredAlerts = alerts.filter(a => {
    if (filterTier === 'ALL') return true
    return a.warning_tier === filterTier
  })

  const emergencyCount = alerts.filter(a => a.warning_tier === 'Emergency' && !a.acknowledged).length
  const warningCount = alerts.filter(a => a.warning_tier === 'Warning' && !a.acknowledged).length

  return (
    <div className="dashboard-container">
      {/* Flashing Emergency Siren Banner */}
      {activeBannerAlert && (
        <div className={`emergency-siren-banner banner-${activeBannerAlert.warning_tier.toLowerCase()}`}>
          <div className="siren-content">
            <span className="siren-beacon">🚨</span>
            <div className="siren-text">
              <strong>CRITICAL NDMA {activeBannerAlert.warning_tier.toUpperCase()} ALARM:</strong>{' '}
              {activeBannerAlert.info?.headline}
            </div>
          </div>
          <div className="siren-actions">
            <button
              className="banner-silence-btn"
              onClick={() => sirenPlayer.stopSiren()}
            >
              🔇 Silence Alarm
            </button>
            <button
              className="banner-ack-btn"
              onClick={() => handleAcknowledgeAlert(activeBannerAlert.identifier)}
            >
              ✓ Acknowledge & Deploy
            </button>
          </div>
        </div>
      )}

      {/* Top Command Bar */}
      <header className="command-header">
        <div className="brand-zone">
          <div className="radar-icon"></div>
          <div>
            <h1>NDMA Environmental Intelligence Hub</h1>
            <span className="subhead">National Disaster Management Early Warning & Geospatial Telemetry</span>
          </div>
        </div>

        <div className="header-metrics">
          <button className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`} onClick={toggleSound}>
            {soundEnabled ? '🔊 Siren: ACTIVE' : '🔇 Siren: MUTED'}
          </button>

          <div className="metric-box">
            <span className="metric-label">Monitored Nodes</span>
            <span className="metric-value text-emerald">
              {nodes.filter(n => n.status === 'online').length} / {nodes.length || 8} Online
            </span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Threat Status</span>
            <span className={`metric-value ${emergencyCount > 0 ? 'text-danger pulse-text' : warningCount > 0 ? 'text-amber' : 'text-emerald'}`}>
              {emergencyCount > 0 ? `${emergencyCount} EMERGENCY` : warningCount > 0 ? `${warningCount} WARNING` : 'NORMAL'}
            </span>
          </div>

          <div className={`connection-badge ${systemHealth ? 'badge-online' : 'badge-offline'}`}>
            <span className="indicator-dot"></span>
            {systemHealth ? 'LIVE BACKEND & MQTT' : 'CONNECTING TO BACKEND...'}
          </div>
        </div>
      </header>

      {/* Main Grid: Map & Alerts */}
      <main className="dashboard-grid">
        {/* Left Side: Geospatial Map Panel */}
        <section className="map-card">
          <div className="panel-title-bar">
            <h2>Geospatial Disaster Radar (8 Indian Monitoring Zones)</h2>
            <div className="map-legend">
              <span className="legend-item"><span className="dot dot-green"></span> Online Node</span>
              <span className="legend-item"><span className="dot dot-red"></span> Disaster Anomaly</span>
              <span className="legend-item"><span className="dot dot-zone"></span> 12km Evacuation Radius</span>
            </div>
          </div>

          <div className="map-wrapper">
            <div ref={mapRef} id="leaflet-map" className="map-view"></div>

            {/* Overlay: Node Quick Inspector */}
            {selectedNode && (
              <div className="node-inspector-card">
                <div className="inspector-header">
                  <h3>{selectedNode.name}</h3>
                  <button className="close-btn" onClick={() => setSelectedNode(null)}>×</button>
                </div>
                <p className="inspector-meta">
                  <strong>ID:</strong> {selectedNode.node_id} | <strong>Region:</strong> {selectedNode.region}
                </p>
                <div className="inspector-stats">
                  <div><strong>Battery:</strong> {selectedNode.battery_pct}%</div>
                  <div><strong>Signal:</strong> {selectedNode.rssi_dbm} dBm</div>
                  <div><strong>Status:</strong> <span className={selectedNode.status === 'online' ? 'text-emerald' : 'text-danger'}>{selectedNode.status.toUpperCase()}</span></div>
                </div>
                {selectedNode.latest_sensors && (
                  <div className="telemetry-chip-list">
                    {Object.entries(selectedNode.latest_sensors).slice(0, 6).map(([k, v]) => (
                      <span key={k} className="telemetry-chip">{k}: <strong>{v}</strong></span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Side: NDMA CAP Live Hazard Feed */}
        <section className="alerts-card">
          <div className="panel-title-bar">
            <h2>Live NDMA CAP Hazard Stream</h2>
            <span className="feed-counter">{filteredAlerts.length} Recorded</span>
          </div>

          {/* Filter Chips */}
          <div className="filter-chips">
            {['ALL', 'Emergency', 'Warning', 'Watch', 'Advisory'].map(tier => (
              <button
                key={tier}
                className={`filter-btn ${filterTier === tier ? 'active' : ''}`}
                onClick={() => setFilterTier(tier)}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Alert Cards Container */}
          <div className="alert-scroll-stream">
            {filteredAlerts.length === 0 ? (
              <div className="empty-state">
                <p>No active anomalies reported in this tier.</p>
                <span className="empty-hint">Use the regional evaluation bar below to trigger a live disaster.</span>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const tier = alert.warning_tier || 'Advisory'
                const isAck = alert.acknowledged

                return (
                  <div key={alert.identifier} className={`cap-card tier-${tier.toLowerCase()} ${isAck ? 'card-ack' : ''}`}>
                    <div className="cap-card-header">
                      <div className="badge-row">
                        <span className={`tier-badge badge-${tier.toLowerCase()}`}>
                          {tier.toUpperCase()}
                        </span>
                        <span className="hazard-title">{alert.info?.event || alert.hazard_type}</span>
                      </div>
                      <span className="timestamp">{alert.sent ? new Date(alert.sent).toLocaleTimeString('en-IN') : 'Just Now'}</span>
                    </div>

                    <p className="cap-headline">{alert.info?.headline}</p>

                    <div className="cap-meta-grid">
                      <div><strong>Node:</strong> {alert.node_id}</div>
                      <div><strong>Confidence:</strong> {alert.confidence}%</div>
                      <div><strong>Zone:</strong> {alert.info?.area?.areaDesc || 'Designated Perimeter'}</div>
                      <div><strong>Urgency:</strong> {alert.info?.urgency}</div>
                    </div>

                    {alert.info?.instruction && (
                      <div className="action-directive">
                        <strong>NDMA Action Directive:</strong> {alert.info.instruction}
                      </div>
                    )}

                    {/* Sensor Telemetry Badges */}
                    {alert.info?.parameters && (
                      <div className="param-pills">
                        {Object.entries(alert.info.parameters)
                          .filter(([_, val]) => val !== null && val !== undefined)
                          .slice(0, 4)
                          .map(([param, val]) => (
                            <span key={param} className="param-pill">
                              {param}: <strong>{val}</strong>
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Acknowledge Button */}
                    <div className="cap-card-footer">
                      {isAck ? (
                        <span className="ack-status-tag">
                          ✓ Acknowledged ({alert.acknowledged_by || 'NDMA Incident Command'})
                        </span>
                      ) : (
                        <button
                          className="ack-button"
                          onClick={() => handleAcknowledgeAlert(alert.identifier)}
                        >
                          Acknowledge & Dispatch Unit
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>
      </main>

      {/* Floating Demo Trigger Bar for Stage Pitch (Multi-Location) */}
      <footer className="demo-control-bar">
        <div className="demo-bar-inner">
          <span className="demo-label">Live Regional Triggers:</span>
          
          <button
            className="demo-btn btn-fire"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_FOREST_01', 'forest_fire', { temperature: 64.2, humidity: 12.0, mq135_ppm: 680 })}
          >
            🔥 Simlipal Fire (Odisha)
          </button>

          <button
            className="demo-btn btn-flood"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_RIVER_01', 'flash_flood', { water_level_cm: 210.0, rainfall_intensity: 65.0 })}
          >
            🌊 Assam Flood (Brahmaputra)
          </button>

          <button
            className="demo-btn btn-landslide"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_HILL_02', 'landslide', { vibration_g: 1.8, soil_moisture: 92.0, tilt_angle_deg: 38.0 })}
          >
            ⛰️ Wayanad Landslide (Kerala)
          </button>

          <button
            className="demo-btn btn-pollution"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_URBAN_01', 'hazardous_air_pollution', { pm25: 395.0, pm10: 490.0, mq135_ppm: 780 })}
          >
            💨 Delhi Toxic AQI (NCR)
          </button>

          <button
            className="demo-btn btn-flood"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_RIVER_02', 'flash_flood', { water_level_cm: 195.0, rainfall_intensity: 48.0 })}
          >
            🌊 Kosi Flash Flood (Bihar)
          </button>

          <button
            className="demo-btn btn-landslide"
            disabled={isTriggering}
            onClick={() => handleTriggerHazard('NODE_HILL_01', 'landslide', { vibration_g: 1.4, soil_moisture: 88.0 })}
          >
            ⛰️ Shimla Rockfall (HP)
          </button>

          {triggerStatus && <span className="trigger-status-badge">{triggerStatus}</span>}
        </div>
      </footer>
    </div>
  )
}

export default App
