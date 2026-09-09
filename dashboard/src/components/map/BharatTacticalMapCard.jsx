import React, { useState, useEffect, useRef } from 'react';
import { sirenManager } from '../audio/SirenManager';
import { useHazardAlerts } from '../../context/HazardAlertContext';

export const DISASTER_SIMULATIONS = [
  {
    id: 'sim-flood-assam',
    name: '🌊 Assam Brahmaputra Flood',
    shortName: 'Assam Flood',
    hazardType: 'FLOOD',
    region: 'Dibrugarh Basin, Assam',
    nodeId: 'IN-ASM-042',
    center: [27.4728, 94.912],
    zoom: 10,
    color: '#0284c7',
    hoverBorder: '#38bdf8',
    evacuationRadiusMeters: 18000,
    boundaryPolygon: [
      [27.65, 94.68],
      [27.72, 94.95],
      [27.68, 95.22],
      [27.52, 95.34],
      [27.38, 95.12],
      [27.34, 94.82],
      [27.46, 94.62],
    ],
    backendPayload: {
      node_id: 'IN-ASM-042',
      hazard: 'flash_flood',
      confidence: 98.5,
      water_level_cm: 218.0,
      rainfall_intensity: 72.0,
    },
    metric: '+4.2m Crest Breach',
    directive: 'Level-3 Emergency Evacuation for Brahmaputra lowlands. NDRF Battalion 1 deployed.',
  },
  {
    id: 'sim-fire-simlipal',
    name: '🔥 Simlipal Wildfire',
    shortName: 'Simlipal Fire',
    hazardType: 'FIRE',
    region: 'Mayurbhanj, Simlipal Biosphere, Odisha',
    nodeId: 'NODE_FOREST_01',
    center: [21.6833, 86.35],
    zoom: 10,
    color: '#ef4444',
    hoverBorder: '#f87171',
    evacuationRadiusMeters: 14000,
    boundaryPolygon: [
      [21.84, 86.22],
      [21.88, 86.41],
      [21.79, 86.52],
      [21.62, 86.49],
      [21.52, 86.36],
      [21.56, 86.2],
      [21.71, 86.17],
    ],
    backendPayload: {
      node_id: 'NODE_FOREST_01',
      hazard: 'forest_fire',
      confidence: 96.0,
      temperature: 64.8,
      humidity: 11.5,
      mq135_ppm: 690.0,
    },
    metric: '64.8°C Extreme Thermal',
    directive: 'Active canopy fire advancing SW toward tiger reserve. ODRAF fire containment active.',
  },
  {
    id: 'sim-landslide-wayanad',
    name: '⛰️ Wayanad Landslide Runout',
    shortName: 'Wayanad Landslide',
    hazardType: 'SEISMIC',
    region: 'Meppadi / Chooralmala, Wayanad, Kerala',
    nodeId: 'IN-KL-071',
    center: [11.58, 76.15],
    zoom: 11,
    color: '#f59e0b',
    hoverBorder: '#fbbf24',
    evacuationRadiusMeters: 9500,
    boundaryPolygon: [
      [11.66, 76.09],
      [11.68, 76.21],
      [11.59, 76.24],
      [11.51, 76.17],
      [11.53, 76.07],
    ],
    backendPayload: {
      node_id: 'NODE_HILL_02',
      hazard: 'landslide',
      confidence: 94.0,
      vibration_g: 1.85,
      soil_moisture: 95.0,
      tilt_angle_deg: 39.0,
    },
    metric: '182 kPa Pore Pressure',
    directive: 'Geotechnical creep exceeded threshold. Immediate red-alert hillside evacuation.',
  },
  {
    id: 'sim-aqi-delhi',
    name: '💨 Delhi Toxic AQI Smog',
    shortName: 'Delhi Toxic AQI',
    hazardType: 'AQI',
    region: 'Anand Vihar & NCR Perimeter',
    nodeId: 'IN-DL-004',
    center: [28.62, 77.26],
    zoom: 10,
    color: '#ea580c',
    hoverBorder: '#fb923c',
    evacuationRadiusMeters: 16000,
    boundaryPolygon: [
      [28.82, 77.08],
      [28.81, 77.45],
      [28.51, 77.48],
      [28.44, 77.19],
      [28.52, 77.01],
    ],
    backendPayload: {
      node_id: 'NODE_URBAN_01',
      hazard: 'hazardous_air_pollution',
      confidence: 97.5,
      pm25: 485.0,
      pm10: 540.0,
      mq135_ppm: 790.0,
    },
    metric: 'AQI 482 (PM2.5: 485)',
    directive: 'Cold-inversion particulate cap. GRAP Stage IV emergency measures enforced across NCR.',
  },
  {
    id: 'sim-flood-kosi',
    name: '🌊 Kosi Embankment Breach',
    shortName: 'Kosi Flood',
    hazardType: 'FLOOD',
    region: 'Supaul Embankment, Bihar',
    nodeId: 'IN-BR-019',
    center: [26.126, 86.605],
    zoom: 10,
    color: '#0ea5e9',
    hoverBorder: '#38bdf8',
    evacuationRadiusMeters: 13000,
    boundaryPolygon: [
      [26.28, 86.44],
      [26.32, 86.76],
      [26.04, 86.8],
      [25.96, 86.52],
    ],
    backendPayload: {
      node_id: 'NODE_RIVER_02',
      hazard: 'flash_flood',
      confidence: 91.5,
      water_level_cm: 198.0,
      rainfall_intensity: 54.0,
    },
    metric: '+1.95m Crest Surge',
    directive: 'Discharge 245,000 cusecs at Birpur barrage. Reinforce Spur-3 embankment protection.',
  },
  {
    id: 'sim-slip-joshimath',
    name: '🏔️ Joshimath Subsurface Slip',
    shortName: 'Joshimath Slip',
    hazardType: 'SEISMIC',
    region: 'Alaknanda Valley, Chamoli, Uttarakhand',
    nodeId: 'IN-UK-012',
    center: [30.5564, 79.5647],
    zoom: 11,
    color: '#8b5cf6',
    hoverBorder: '#a78bfa',
    evacuationRadiusMeters: 8000,
    boundaryPolygon: [
      [30.6, 79.51],
      [30.62, 79.61],
      [30.52, 79.63],
      [30.5, 79.52],
    ],
    backendPayload: {
      node_id: 'NODE_HILL_01',
      hazard: 'landslide',
      confidence: 90.0,
      vibration_g: 1.45,
      soil_moisture: 88.0,
      tilt_angle_deg: 22.0,
    },
    metric: '2.8 mm/hr Crest Slip',
    directive: 'Subsurface shear movement active along Sunil ward. Evacuate red zone structures.',
  },
  {
    id: 'sim-cyclone-paradip',
    name: '🌀 Paradip Cyclonic Surge',
    shortName: 'Paradip Cyclone',
    hazardType: 'FLOOD',
    region: 'Paradip Deep Offshore, Odisha',
    nodeId: 'IN-OD-055',
    center: [20.3165, 86.6114],
    zoom: 10,
    color: '#06b6d4',
    hoverBorder: '#22d3ee',
    evacuationRadiusMeters: 22000,
    boundaryPolygon: [
      [20.52, 86.42],
      [20.56, 86.78],
      [20.14, 86.86],
      [20.08, 86.48],
    ],
    backendPayload: {
      node_id: 'NODE_COAST_01',
      hazard: 'flash_flood',
      confidence: 95.5,
      pressure_drop_hpa: 984.0,
      wind_speed_kmh: 115.0,
    },
    metric: '984 hPa / 115 km/h',
    directive: 'Severe cyclonic storm making landfall within 4 hours. 22km coastal clearance ordered.',
  },
];

const SENSOR_NODES = [
  {
    id: 'IN-ASM-042',
    code: 'ASM-042',
    name: 'Dibrugarh Brahmaputra Basin',
    state: 'Assam',
    lat: 27.4728,
    lng: 94.912,
    elevation: '108m ASL',
    hazardType: 'FLOOD',
    severity: 'critical',
    metric: '+4.2m OVER DANGER',
    subtext: 'Brahmaputra Flood Basin Breach',
    threatRadiusMeters: 18000,
    isPulsing: true,
  },
  {
    id: 'IN-DL-004',
    code: 'DL-004',
    name: 'Anand Vihar NCR Sensor Pod',
    state: 'Delhi NCT',
    lat: 28.6139,
    lng: 77.209,
    elevation: '216m ASL',
    hazardType: 'AQI',
    severity: 'warning',
    metric: 'AQI 482 SEVERE',
    subtext: 'PM2.5: 485 µg/m³ (GRAP-IV)',
    threatRadiusMeters: 12000,
    isPulsing: true,
  },
  {
    id: 'IN-UK-012',
    code: 'UK-012',
    name: 'Joshimath Subsurface Inclinometer',
    state: 'Uttarakhand',
    lat: 30.5564,
    lng: 79.5647,
    elevation: '1,890m ASL',
    hazardType: 'SEISMIC',
    severity: 'seismic',
    metric: '2.8 mm/hr CREST SLIP',
    subtext: 'Alaknanda Valley Shear Fracture',
    threatRadiusMeters: 9000,
    isPulsing: true,
  },
  {
    id: 'IN-OD-055',
    code: 'OD-055',
    name: 'Paradip Deep Offshore Buoy 02',
    state: 'Odisha',
    lat: 20.3165,
    lng: 86.6114,
    elevation: 'Sea Level',
    hazardType: 'FLOOD',
    severity: 'warning',
    metric: '984 hPa DROP / 82 km/h',
    subtext: 'Bay of Bengal Cyclonic Surge',
    threatRadiusMeters: 15000,
    isPulsing: true,
  },
  {
    id: 'IN-KL-071',
    code: 'KL-071',
    name: 'Wayanad Hillcrest Acoustic Pod',
    state: 'Kerala',
    lat: 11.6854,
    lng: 76.132,
    elevation: '780m ASL',
    hazardType: 'SEISMIC',
    severity: 'warning',
    metric: 'PORE PRESSURE 182 kPa',
    subtext: 'Western Ghats Debris Flow Risk',
    threatRadiusMeters: 8500,
    isPulsing: true,
  },
  {
    id: 'IN-HP-001',
    code: 'HP-001',
    name: 'Shimla Ridge Landslide Radar',
    state: 'Himachal Pradesh',
    lat: 31.1048,
    lng: 77.1734,
    elevation: '2,276m ASL',
    hazardType: 'SEISMIC',
    severity: 'nominal',
    metric: '0.04g VIBRATION STABLE',
    subtext: 'Himalayan Faultline Array',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
  {
    id: 'IN-BR-019',
    code: 'BR-019',
    name: 'Kosi River Embankment Monitor',
    state: 'Bihar',
    lat: 26.126,
    lng: 86.605,
    elevation: '54m ASL',
    hazardType: 'FLOOD',
    severity: 'warning',
    metric: '+1.95m CREST SURGE',
    subtext: 'Supaul Inundation Watch',
    threatRadiusMeters: 11000,
    isPulsing: true,
  },
  {
    id: 'IN-MH-023',
    code: 'MH-023',
    name: 'Mumbai Coastal Sluice Mithi',
    state: 'Maharashtra',
    lat: 19.076,
    lng: 72.8777,
    elevation: '4m ASL',
    hazardType: 'FLOOD',
    severity: 'nominal',
    metric: '4.48m SPRING TIDE',
    subtext: 'MMR Coastal Inflow Nominal',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
  {
    id: 'IN-WB-031',
    code: 'WB-031',
    name: 'Sundarbans Sagar Island Gauge',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    elevation: '3m ASL',
    hazardType: 'FLOOD',
    severity: 'nominal',
    metric: 'HIGH TIDE 3.8m',
    subtext: 'Deltaic Tidal Gauge Synchronized',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
  {
    id: 'IN-TS-088',
    code: 'TS-088',
    name: 'Hyderabad Deccan Gateway',
    state: 'Telangana',
    lat: 17.385,
    lng: 78.4867,
    elevation: '542m ASL',
    hazardType: 'NOMINAL',
    severity: 'nominal',
    metric: 'DECCAN RELAY ACTIVE',
    subtext: 'Central Mesh Backbone 100%',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
  {
    id: 'IN-JK-001',
    code: 'JK-001',
    name: 'Siachen Glacial Basecamp',
    state: 'Ladakh / J&K',
    lat: 35.4212,
    lng: 77.1095,
    elevation: '5,400m ASL',
    hazardType: 'SEISMIC',
    severity: 'nominal',
    metric: '-18.4°C STABLE',
    subtext: 'Karakoram Deep Cryo-Telemetry',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
  {
    id: 'IN-TN-018',
    code: 'TN-018',
    name: 'Kanyakumari Marine Tidal Rim',
    state: 'Tamil Nadu',
    lat: 8.0883,
    lng: 77.5385,
    elevation: '2m ASL',
    hazardType: 'NOMINAL',
    severity: 'nominal',
    metric: 'CURRENT 1.2 kt',
    subtext: 'Indian Ocean Convergence Node',
    threatRadiusMeters: 0,
    isPulsing: false,
  },
];

const INDIA_BOUNDS = [
  [7.5, 68.0],
  [36.0, 97.5],
];

export default function BharatTacticalMapCard({
  onInspectNode,
  onTriggerNotification,
  showSimulationConsole = true,
  searchQuery: propSearchQuery,
  selectedState: propSelectedState,
  selectedHazard: propSelectedHazard,
  onResetFilters: propResetFilters,
}) {
  const [selectedLayer, setSelectedLayer] = useState('ALL');
  const [mapStyle, setMapStyle] = useState('topo'); // 'topo' | 'dark' | 'satellite'
  const [cursorCoords, setCursorCoords] = useState({ lat: 22.5937, lng: 78.9629 });
  const [activeSimulationId, setActiveSimulationId] = useState(null);
  const [simulationStatus, setSimulationStatus] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [filteredCount, setFilteredCount] = useState(12);

  const {
    allNodesList,
    getNodeSeverity,
    offlineCount,
    warningCount,
    abnormalCount,
    criticalCount,
    nominalCount,
    triggerHazardAlert,
    searchQuery: contextSearchQuery,
    selectedState: contextSelectedState,
    selectedHazard: contextSelectedHazard,
    clearFilters: contextClearFilters,
    isFilterActive: contextIsFilterActive,
  } = useHazardAlerts();

  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : (contextSearchQuery || '');
  const selectedState = propSelectedState !== undefined ? propSelectedState : (contextSelectedState || 'ALL');
  const selectedHazard = propSelectedHazard !== undefined ? propSelectedHazard : (contextSelectedHazard || 'ALL');
  const onResetFilters = propResetFilters || contextClearFilters;
  const isFilterActive = contextIsFilterActive || Boolean((searchQuery || '').trim() || (selectedState && selectedState !== 'ALL') || (selectedHazard && selectedHazard !== 'ALL'));

  // Synchronize top hazard dropdown with map layer buttons
  useEffect(() => {
    if (selectedHazard && selectedHazard !== 'ALL') {
      if (['FLOOD', 'AQI', 'SEISMIC'].includes(selectedHazard)) {
        setSelectedLayer(selectedHazard);
      }
    } else if (selectedHazard === 'ALL') {
      setSelectedLayer('ALL');
    }
  }, [selectedHazard]);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const nodeLayerGroupRef = useRef(null);
  const meshLayerGroupRef = useRef(null);
  const zonesLayerGroupRef = useRef(null);
  const simulationLayerGroupRef = useRef(null);

  // 1. Initialize Map
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const L = window.L;

    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.2],
      zoom: 5,
      minZoom: 4,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
    });

    map.fitBounds(INDIA_BOUNDS, { padding: [24, 24] });

    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4)),
      });
    });

    zonesLayerGroupRef.current = L.layerGroup().addTo(map);
    meshLayerGroupRef.current = L.layerGroup().addTo(map);
    nodeLayerGroupRef.current = L.layerGroup().addTo(map);
    simulationLayerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    const timer1 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 150);
    const timer2 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 500);

    const handleResize = () => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Manage Tile Layer based on mapStyle
  useEffect(() => {
    if (!window.L || !mapInstanceRef.current) return;
    const L = window.L;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = '';
    let options = { maxZoom: 18 };

    if (mapStyle === 'topo') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      options = { maxZoom: 18, subdomains: ['a', 'b', 'c'] };
    } else if (mapStyle === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      options = { maxZoom: 18 };
    } else {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      options = { maxZoom: 18, subdomains: ['a', 'b', 'c'] };
    }

    const newTileLayer = L.tileLayer(url, options).addTo(map);
    tileLayerRef.current = newTileLayer;

    setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 100);
  }, [mapStyle]);

  // 3. Render Location Pointers & Mesh
  useEffect(() => {
    if (
      !window.L ||
      !mapInstanceRef.current ||
      !nodeLayerGroupRef.current ||
      !meshLayerGroupRef.current ||
      !zonesLayerGroupRef.current
    )
      return;

    const L = window.L;
    const map = mapInstanceRef.current;
    const nodeLayer = nodeLayerGroupRef.current;
    const meshLayer = meshLayerGroupRef.current;
    const zonesLayer = zonesLayerGroupRef.current;

    nodeLayer.clearLayers();
    meshLayer.clearLayers();
    zonesLayer.clearLayers();

    const visibleNodes = allNodesList.map((node) => {
      const assessment = getNodeSeverity(node);
      const tier = assessment.activeTier;
      const isCritical = tier === 'critical';
      const isAbnormal = tier === 'abnormal';
      const isWarning = tier === 'warning';
      const isOffline = tier === 'offline';

      const lat = node.coordinates?.lat || node.lat || 20.5937;
      const lng = node.coordinates?.lng || node.lng || 78.9629;
      const code = node.displayId || node.code || node.id;
      const metric = node.keyMetric || assessment.readingValue;

      let threatRadiusMeters = 0;
      if (isCritical) {
        threatRadiusMeters = node.hazardType === 'FLOOD' ? 18000 : 14000;
      } else if (isAbnormal) {
        threatRadiusMeters = 10000;
      } else if (isWarning) {
        threatRadiusMeters = 7000;
      }

      return {
        ...node,
        lat,
        lng,
        code,
        severity: tier,
        metric,
        isPulsing: isCritical,
        threatRadiusMeters,
      };
    }).filter((node) => {
      // 1. Text Search Filter (node ID, code, displayId, name, location, state, hazard)
      const q = (searchQuery || '').trim().toLowerCase();
      if (q) {
        const matchesQuery =
          (node.id && node.id.toLowerCase().includes(q)) ||
          (node.code && node.code.toLowerCase().includes(q)) ||
          (node.displayId && node.displayId.toLowerCase().includes(q)) ||
          (node.name && node.name.toLowerCase().includes(q)) ||
          (node.location && node.location.toLowerCase().includes(q)) ||
          (node.state && node.state.toLowerCase().includes(q)) ||
          (node.hazard && node.hazard.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. State Filter
      if (selectedState && selectedState !== 'ALL') {
        const targetState = selectedState.toLowerCase();
        const nodeState = (node.state || '').toLowerCase();
        const nodeLocation = (node.location || '').toLowerCase();
        const matchesState = nodeState.includes(targetState) || nodeLocation.includes(targetState);
        if (!matchesState) return false;
      }

      // 3. Hazard Filter (selectedHazard or layer toggle)
      const activeHazard = selectedHazard && selectedHazard !== 'ALL' ? selectedHazard : selectedLayer;
      if (activeHazard !== 'ALL') {
        if (node.hazardType !== activeHazard) return false;
      }

      return true;
    });

    setFilteredCount(visibleNodes.length);

    // Auto-focus if user is filtering to specific search query or state
    const hasFilter = Boolean((searchQuery || '').trim() || (selectedState && selectedState !== 'ALL'));
    if (hasFilter && map && visibleNodes.length > 0) {
      try {
        if (visibleNodes.length === 1) {
          map.setView([visibleNodes[0].lat, visibleNodes[0].lng], 8, { animate: false });
        } else {
          const bounds = L.latLngBounds(visibleNodes.map((n) => [n.lat, n.lng]));
          if (bounds.isValid && bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: false });
          }
        }
      } catch (err) {
        console.warn('Map bounds fit warning:', err);
      }
    }

    // Mesh Network Topology
    if (visibleNodes.length >= 2) {
      const sortedBackbone = [
        [35.4212, 77.1095],
        [31.1048, 77.1734],
        [30.5564, 79.5647],
        [28.6139, 77.209],
        [26.126, 86.605],
        [27.4728, 94.912],
        [22.5726, 88.3639],
        [20.3165, 86.6114],
        [17.385, 78.4867],
        [8.0883, 77.5385],
        [11.6854, 76.132],
        [19.076, 72.8777],
        [28.6139, 77.209],
      ];

      L.polyline(sortedBackbone, {
        color: mapStyle === 'dark' ? '#00d4ff' : '#0284c7',
        weight: 1.8,
        dashArray: '5, 8',
        opacity: mapStyle === 'dark' ? 0.75 : 0.6,
      }).addTo(meshLayer);

      L.polyline(
        [
          [17.385, 78.4867],
          [20.3165, 86.6114],
        ],
        {
          color: mapStyle === 'dark' ? '#00d4ff' : '#0284c7',
          weight: 1.2,
          dashArray: '3, 6',
          opacity: 0.45,
        }
      ).addTo(meshLayer);

      L.polyline(
        [
          [17.385, 78.4867],
          [19.076, 72.8777],
        ],
        {
          color: mapStyle === 'dark' ? '#00d4ff' : '#0284c7',
          weight: 1.2,
          dashArray: '3, 6',
          opacity: 0.45,
        }
      ).addTo(meshLayer);
    }

    // Render Location Pointers Across 5 Tiers
    visibleNodes.forEach((node) => {
      if (node.threatRadiusMeters > 0) {
        const circleColor =
          node.severity === 'critical'
            ? '#ef4444'
            : node.severity === 'abnormal'
            ? '#ea580c'
            : '#f59e0b';

        L.circle([node.lat, node.lng], {
          radius: node.threatRadiusMeters,
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: node.severity === 'critical' ? 0.22 : node.severity === 'abnormal' ? 0.16 : 0.10,
          weight: 1.5,
          dashArray: '4, 6',
        }).addTo(zonesLayer);
      }

      let markerHtml = '';

      if (node.severity === 'critical') {
        markerHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute w-12 h-12 rounded-full bg-red-500/40 animate-ping"></span>
            <span class="absolute w-8 h-8 rounded-full border border-red-500/60 animate-ping" style="animation-delay: 0.3s;"></span>
            
            <div class="w-6 h-6 rounded-full bg-[#dc2626] border-2 border-white shadow-xl flex items-center justify-center text-[12px] font-black text-white relative z-10">
              !
            </div>

            <div class="absolute bottom-7 left-1/2 -translate-x-1/2 bg-[#0f172a]/95 border border-red-500/80 shadow-2xl px-2 py-0.5 rounded text-[10.5px] whitespace-nowrap z-20 flex items-center gap-1">
              <span class="text-red-400 font-bold font-mono">${node.code}</span>
              <span class="text-white font-semibold">${node.name.split(' ')[0]}</span>
              <span class="text-red-300 font-bold font-mono text-[9.5px]">(${node.metric})</span>
            </div>
          </div>
        `;
      } else if (node.severity === 'abnormal') {
        markerHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute w-10 h-10 rounded-full bg-orange-500/35 animate-ping"></span>
            
            <div class="w-5 h-5 rounded-full bg-[#ea580c] border-2 border-white shadow-lg flex items-center justify-center text-[11px] font-bold text-white relative z-10">
              !
            </div>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0f172a]/95 border border-orange-500/60 shadow-xl px-2 py-0.5 rounded text-[10.5px] whitespace-nowrap z-20 flex items-center gap-1">
              <span class="text-orange-400 font-bold font-mono">${node.code}</span>
              <span class="text-white font-semibold">${node.name.split(' ')[0]}</span>
              <span class="text-orange-200 font-mono text-[9px]">${node.metric}</span>
            </div>
          </div>
        `;
      } else if (node.severity === 'warning') {
        markerHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute w-8 h-8 rounded-full bg-amber-500/25 animate-pulse"></span>
            
            <div class="w-4.5 h-4.5 rounded-full bg-[#d97706] border-2 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white relative z-10">
              !
            </div>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0f172a]/95 border border-amber-500/60 shadow-xl px-2 py-0.5 rounded text-[10.5px] whitespace-nowrap z-20 flex items-center gap-1">
              <span class="text-amber-400 font-bold font-mono">${node.code}</span>
              <span class="text-white font-semibold">${node.name.split(' ')[0]}</span>
              <span class="text-amber-200 font-mono text-[9px]">${node.metric}</span>
            </div>
          </div>
        `;
      } else if (node.severity === 'offline') {
        markerHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <div class="w-3.5 h-3.5 rounded-full bg-[#64748b] border-2 border-white shadow-md relative z-10"></div>

            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#0f172a]/90 border border-slate-600 shadow-md px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap z-20 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <span class="text-slate-400 font-bold font-mono">${node.code}</span>
              <span class="text-slate-300">${node.name.split(' ')[0]} (OFFLINE)</span>
            </div>
          </div>
        `;
      } else {
        // NOMINAL (Clean Green Marker)
        markerHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <div class="w-3.5 h-3.5 rounded-full bg-[#10b981] border-2 border-white shadow-md relative z-10"></div>

            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#0f172a]/90 border border-[#334155] shadow-md px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
              <span class="text-emerald-400 font-bold font-mono">${node.code}</span>
              <span class="text-slate-200">${node.name.split(' ')[0]}</span>
            </div>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-div-icon',
        iconSize: [0, 0],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(nodeLayer);

      marker.on('click', () => {
        if (onInspectNode) {
          onInspectNode(node.id);
        }
      });

      marker.bindPopup(`
        <div style="font-family: 'IBM Plex Sans', sans-serif; min-width: 210px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 4px; margin-bottom: 6px;">
            <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: ${
              node.severity === 'critical'
                ? '#f87171'
                : node.severity === 'abnormal'
                ? '#fb923c'
                : node.severity === 'warning'
                ? '#fbbf24'
                : node.severity === 'offline'
                ? '#94a3b8'
                : '#34d399'
            };">${node.code}</span>
            <span style="font-size: 9.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase;">${node.state || ''}</span>
          </div>

          <div style="font-size: 13px; font-weight: 700; color: #f1f5f9; margin-bottom: 4px; line-height: 1.2;">
            ${node.name}
          </div>

          <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 2px;">
            Status: <strong style="color: ${
              node.severity === 'critical' ? '#ef4444' : node.severity === 'abnormal' ? '#f97316' : node.severity === 'warning' ? '#f59e0b' : '#10b981'
            }; text-transform: uppercase;">${node.severity}</strong> — <span>${node.metric}</span>
          </div>

          <div style="font-size: 10px; color: #94a3b8; margin-bottom: 8px;">
            Coordinates: <span>${node.lat.toFixed(2)}°N, ${node.lng.toFixed(2)}°E</span>
          </div>

          <button
            onclick="window.dispatchEvent(new CustomEvent('inspect-node-event', { detail: '${node.id}' }))"
            style="background: #00507d; color: white; border: none; border-radius: 6px; padding: 6px 10px; font-size: 11px; font-weight: 600; cursor: pointer; width: 100%; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; gap: 4px;"
          >
            <span>Inspect Sensor Telemetry</span>
          </button>
        </div>
      `);
    });
  }, [selectedLayer, mapStyle, onInspectNode, allNodesList, getNodeSeverity, searchQuery, selectedState, selectedHazard]);

  // 4. Render Active Simulation Boundaries
  useEffect(() => {
    if (!window.L || !mapInstanceRef.current || !simulationLayerGroupRef.current) return;
    const L = window.L;
    const map = mapInstanceRef.current;
    const simLayer = simulationLayerGroupRef.current;

    simLayer.clearLayers();

    if (!activeSimulationId) return;

    if (activeSimulationId === 'ALL') {
      // Draw all boundaries simultaneously
      DISASTER_SIMULATIONS.forEach((sim) => {
        // Impact Polygon
        const poly = L.polygon(sim.boundaryPolygon, {
          color: sim.color,
          weight: 2,
          dashArray: '5, 5',
          fillColor: sim.color,
          fillOpacity: 0.25,
        }).addTo(simLayer);

        poly.bindTooltip(
          `<div style="font-family: monospace; font-size: 11px; font-weight: bold; color: ${sim.color};">${sim.shortName} BOUNDARY</div>`,
          { sticky: true }
        );

        // Evacuation Perimeter Circle
        L.circle(sim.center, {
          radius: sim.evacuationRadiusMeters,
          color: sim.color,
          weight: 1.5,
          dashArray: '3, 6',
          fillColor: sim.color,
          fillOpacity: 0.08,
        }).addTo(simLayer);
      });

      map.flyToBounds(INDIA_BOUNDS, { duration: 1.2, padding: [30, 30] });
    } else {
      const sim = DISASTER_SIMULATIONS.find((s) => s.id === activeSimulationId);
      if (sim) {
        // Draw primary impact boundary polygon
        const poly = L.polygon(sim.boundaryPolygon, {
          color: sim.color,
          weight: 3,
          dashArray: '6, 6',
          fillColor: sim.color,
          fillOpacity: 0.35,
        }).addTo(simLayer);

        poly.bindTooltip(
          `
          <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 4px;">
            <div style="font-weight: bold; color: #fff; background: ${sim.color}; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-bottom: 2px;">
              ${sim.name}
            </div>
            <div style="font-size: 10px; color: #334155; font-weight: 600;">
              Impact Zone: ${sim.region}
            </div>
            <div style="font-size: 9.5px; color: #64748b;">
              Evacuation Buffer: ${(sim.evacuationRadiusMeters / 1000).toFixed(0)} KM
            </div>
          </div>
        `,
          { sticky: true }
        );

        // Draw evacuation perimeter circle
        L.circle(sim.center, {
          radius: sim.evacuationRadiusMeters,
          color: sim.color,
          weight: 2,
          dashArray: '4, 8',
          fillColor: sim.color,
          fillOpacity: 0.12,
        }).addTo(simLayer);

        // Add animated epicenter beacon
        const beaconIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center cursor-pointer" style="transform: translate(-50%, -50%);">
              <span class="absolute w-16 h-16 rounded-full animate-ping" style="background-color: ${sim.color}; opacity: 0.35;"></span>
              <span class="absolute w-10 h-10 rounded-full animate-ping" style="border: 2px solid ${sim.color}; animation-delay: 0.2s;"></span>
              <div class="w-8 h-8 rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-[13px] font-black text-white relative z-20" style="background-color: ${sim.color};">
                !
              </div>
            </div>
          `,
          className: 'custom-div-icon',
          iconSize: [0, 0],
        });

        const beacon = L.marker(sim.center, { icon: beaconIcon }).addTo(simLayer);
        beacon.bindPopup(`
          <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 4px;">
            <div style="font-weight: bold; color: ${sim.color}; font-size: 12px; margin-bottom: 2px;">
              [ACTIVE SIMULATION] ${sim.name}
            </div>
            <div style="font-size: 11px; color: #e2e8f0; margin-bottom: 4px;">
              Region: <strong>${sim.region}</strong>
            </div>
            <div style="font-size: 10.5px; color: #94a3b8; margin-bottom: 6px;">
              Directive: <em>${sim.directive}</em>
            </div>
          </div>
        `);

        // Fly directly to simulation area
        map.flyTo(sim.center, sim.zoom, { duration: 1.4 });
      }
    }
  }, [activeSimulationId]);

  // Global popup inspect event bridge
  useEffect(() => {
    const handleInspectEvent = (e) => {
      if (onInspectNode && e.detail) {
        onInspectNode(e.detail);
      }
    };
    window.addEventListener('inspect-node-event', handleInspectEvent);
    return () => window.removeEventListener('inspect-node-event', handleInspectEvent);
  }, [onInspectNode]);

  // Recenter Handler
  const handleRecenter = () => {
    setActiveSimulationId(null);
    setSimulationStatus('');
    sirenManager.stop();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyToBounds(INDIA_BOUNDS, {
        duration: 1.2,
        padding: [24, 24],
      });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Trigger Disaster Simulation Scenario
  const handleTriggerSimulation = async (scenario) => {
    setIsSimulating(true);
    setActiveSimulationId(scenario.id);
    setSimulationStatus(`Deploying ${scenario.name} at ${scenario.region}...`);

    // Unified Alert Trigger: feeds dynamic feed, plays siren klaxon, triggers visual flash, and sends emergency SMS
    if (triggerHazardAlert) {
      triggerHazardAlert({
        nodeId: scenario.nodeId || 'IN-ASM-042',
        hazardType: scenario.hazardType || 'FLOOD',
        severity: 'critical',
        metric: scenario.metric,
        location: scenario.region,
        directive: scenario.directive,
        subtext: `Simulated disaster boundary projected (${(scenario.evacuationRadiusMeters / 1000).toFixed(0)}km evacuation radius).`,
        source: 'simulation',
        rawSensors: scenario.backendPayload,
      });
    }

    if (onTriggerNotification) {
      onTriggerNotification({
        title: `CRITICAL ALERT: ${scenario.shortName.toUpperCase()}`,
        message: `${scenario.directive} Boundaries & Evacuation Zone plotted. Emergency SMS broadcast sent.`,
      });
    }

    setSimulationStatus(`[LIVE CRITICAL INJECTION] ${scenario.name} Active — NDMA CAP & SMS Broadcast Dispatched`);
    setTimeout(() => setIsSimulating(false), 500);
  };

  const handleShowAllBoundaries = () => {
    setActiveSimulationId('ALL');
    setSimulationStatus('Displaying Multi-Hazard Disaster Boundaries across all 7 Indian sectors');
    if (onTriggerNotification) {
      onTriggerNotification({
        title: 'MULTI-HAZARD BOUNDARIES PROJECTED',
        message: 'All 7 Nationwide Hazard Impact Zones & Evacuation Radii active on map.',
      });
    }
  };

  return (
    <div className="bg-[#0f172a] border border-[#25314C] rounded-xl overflow-hidden shadow-sm flex flex-col w-full text-slate-100">
      {/* 1. Tactical HUD Header Bar */}
      <div className="bg-[#141c2e] border-b border-[#25314C] px-md py-xs flex flex-wrap items-center justify-between gap-sm">
        <div className="flex items-center gap-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00d4ff] animate-pulse" />
          <h3 className="font-headline-md text-[13px] font-bold tracking-wider text-[#f1f5f9] uppercase">
            Bharat Tactical Geospatial Overview
          </h3>
          <span className="hidden sm:inline-block font-label-code text-[11px] text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/30 px-xs py-0.5 rounded font-mono">
            EPSG:4326 // WGS84
          </span>
          <span className="hidden md:inline-block font-label-code text-[11px] text-slate-400 font-mono">
            LAT {cursorCoords.lat}° N, LON {cursorCoords.lng}° E
          </span>
          {isFilterActive && (
            <div className="flex items-center gap-xs px-xs py-0.5 rounded bg-sky-950/80 border border-sky-400/40 text-sky-300 text-[10.5px] font-mono">
              <span className="font-bold">MATCH: {filteredCount} OF {allNodesList.length} NODES</span>
              <button
                onClick={onResetFilters}
                className="text-sky-200 hover:text-red-300 font-bold ml-1 cursor-pointer bg-sky-900/60 px-1 rounded text-[9.5px] uppercase"
                title="Clear all filters and show entire fleet"
              >
                ✕ Clear
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          {/* Basemap Style Switcher */}
          <div className="flex items-center bg-[#090d16] border border-[#25314C] p-0.5 rounded-lg text-slate-300 text-[11px] font-semibold">
            <button
              onClick={() => setMapStyle('topo')}
              className={`px-xs py-0.5 rounded transition-all flex items-center gap-1 ${
                mapStyle === 'topo'
                  ? 'bg-[#00507d] text-white shadow-xs font-bold'
                  : 'hover:text-white'
              }`}
              title="Topographic contours, elevation, river basins & terrain relief"
            >
              <span>⛰️ TOPOLOGY</span>
            </button>
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-xs py-0.5 rounded transition-all flex items-center gap-1 ${
                mapStyle === 'dark'
                  ? 'bg-[#00507d] text-white shadow-xs font-bold'
                  : 'hover:text-white'
              }`}
              title="Tactical dark radar mode"
            >
              <span>📡 DARK RADAR</span>
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-xs py-0.5 rounded transition-all flex items-center gap-1 ${
                mapStyle === 'satellite'
                  ? 'bg-[#00507d] text-white shadow-xs font-bold'
                  : 'hover:text-white'
              }`}
              title="Esri high-res satellite imagery"
            >
              <span>🛰️ SATELLITE</span>
            </button>
          </div>

          {/* Layer Filter Toggle */}
          <div className="flex items-center bg-[#090d16] border border-[#25314C] p-0.5 rounded-lg text-slate-300 text-[11px] font-semibold">
            {['ALL', 'FLOOD', 'AQI', 'SEISMIC'].map((layer) => (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`px-xs py-0.5 rounded transition-all ${
                  selectedLayer === layer
                    ? 'bg-[#00d4ff] text-[#090d16] font-bold shadow-xs'
                    : 'hover:text-white'
                }`}
              >
                {layer === 'ALL' ? 'ALL LAYERS' : layer}
              </button>
            ))}
          </div>

          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            className="bg-[#141c2e] hover:bg-[#1e293b] text-[#00d4ff] border border-[#25314C] p-1.5 rounded-lg flex items-center justify-center transition-all shadow-xs"
            title="Recenter & Fit India"
          >
            <span className="material-symbols-outlined text-[18px]">crop_free</span>
          </button>
        </div>
      </div>

      {/* 2. Map Canvas Viewport */}
      <div
        className={`relative w-full h-[540px] xl:h-[620px] overflow-hidden ${
          mapStyle === 'dark' ? 'tactical-map-dark' : ''
        }`}
      >
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Active Simulation Top HUD Banner */}
        {activeSimulationId && (
          <div className="absolute top-3 left-3 right-16 z-20 bg-[#0f172a]/95 border border-red-500/80 backdrop-blur-md px-md py-xs rounded-xl shadow-2xl flex items-center justify-between gap-sm animate-pulse-subtle">
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0" />
              <div className="flex flex-col">
                <span className="font-label-code text-[11px] text-red-400 font-bold uppercase tracking-wider">
                  {activeSimulationId === 'ALL'
                    ? 'MULTI-HAZARD BOUNDARY INJECTION ACTIVE'
                    : `ACTIVE SIMULATION // ${DISASTER_SIMULATIONS.find((s) => s.id === activeSimulationId)?.shortName.toUpperCase()}`}
                </span>
                <span className="text-[11px] text-slate-200">
                  {simulationStatus || 'Threat perimeter & evacuation buffer drawn on terrain'}
                </span>
              </div>
            </div>
            <button
              onClick={handleRecenter}
              className="px-sm py-1 bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/50 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              <span>Dismiss</span>
            </button>
          </div>
        )}

        {/* Floating Zoom Controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-[#141c2e]/95 border border-[#25314C] backdrop-blur-md p-1 rounded-lg shadow-xl pointer-events-auto">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#25314c] rounded transition-all font-bold text-base"
            title="Zoom In"
          >
            +
          </button>
          <div className="w-full h-[1px] bg-[#25314c]" />
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#25314c] rounded transition-all font-bold text-base"
            title="Zoom Out"
          >
            −
          </button>
          <div className="w-full h-[1px] bg-[#25314c]" />
          <button
            onClick={handleRecenter}
            className="w-7 h-7 flex items-center justify-center text-[#00d4ff] hover:bg-[#25314c] rounded transition-all"
            title="Fit India View"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
          </button>
        </div>

        {/* Tactical HUD Map Scale Overlay */}
        <div className="absolute bottom-16 right-3 z-20 bg-[#141c2e]/95 backdrop-blur-md p-xs rounded-lg border border-[#25314C] flex flex-col gap-xxs shadow-2xl pointer-events-none hidden sm:flex">
          <div className="flex items-center justify-between gap-md">
            <span className="font-label-code text-[10px] text-slate-400 font-bold">
              MAP SCALE (SURVEY OF INDIA)
            </span>
            <span className="font-label-code text-[10px] text-[#00d4ff] font-bold">
              1 : 4,500,000
            </span>
          </div>
          <div className="w-32 h-1 bg-[#070b14] rounded overflow-hidden flex">
            <div className="w-1/2 h-full bg-[#00d4ff]" />
            <div className="w-1/2 h-full bg-white/20" />
          </div>
          <div className="flex justify-between font-label-code text-[9px] text-slate-400 font-semibold">
            <span>0 KM</span>
            <span>500 KM</span>
            <span>1,000 KM</span>
          </div>
        </div>

        {/* Bottom Tactical Status Legend Dock */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-[#141c2e]/95 border border-[#25314C] backdrop-blur-md px-md py-xs rounded-lg shadow-2xl flex flex-wrap items-center justify-between gap-sm pointer-events-auto">
          <div className="flex items-center gap-md flex-wrap">
            <div className="flex items-center gap-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span className="text-[12px] text-slate-300 font-medium">Nominal ({nominalCount})</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
              <span className="text-[12px] text-amber-300 font-medium">Warning ({warningCount})</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
              <span className="text-[12px] text-orange-300 font-medium">Abnormal ({abnormalCount})</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-ping" />
              <span className="text-[12px] text-red-400 font-bold">Critical ({criticalCount})</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]" />
              <span className="text-[12px] text-slate-400 font-medium">Offline ({offlineCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-xs font-label-code text-[11px] text-slate-400">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">
              verified
            </span>
            <span className="font-semibold text-slate-200">
              ISRO Satellite Link Synchronized ({allNodesList.length - offlineCount} Nodes Online)
            </span>
          </div>
        </div>
      </div>

      {/* 3. DISASTER SIMULATION & BOUNDARIES CONTROL CONSOLE (Re-skinned with Design Tokens) */}
      {showSimulationConsole && (
        <div className="bg-surface-card border-t border-border-grid p-md flex flex-col gap-sm">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-alert-warning text-[20px]">
              crisis_alert
            </span>
            <span className="font-headline-md text-[13px] font-bold text-text-primary uppercase tracking-wider">
              Disaster Scenario Simulation &amp; Hazard Boundaries
            </span>
            <span className="font-label-code text-[10px] text-alert-warning bg-alert-warning-subtle border border-alert-warning/30 px-xs py-0.5 rounded font-mono font-semibold">
              STAGE PITCH EVALUATION BAR
            </span>
          </div>

          <div className="flex items-center gap-xs">
            {/* Audio Klaxon Toggle */}
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (!nextState) sirenManager.stop();
              }}
              className={`px-sm py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1 transition-colors ${
                soundEnabled
                  ? 'bg-alert-critical-subtle text-alert-critical border-alert-critical'
                  : 'bg-canvas-subtle text-text-secondary border-border-grid hover:bg-border-grid'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span>{soundEnabled ? 'Klaxon Audio ON' : 'Klaxon Audio OFF'}</span>
            </button>

            {/* Show All Boundaries */}
            <button
              onClick={handleShowAllBoundaries}
              className={`px-sm py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition-all ${
                activeSimulationId === 'ALL'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-canvas-subtle text-primary border-border-grid hover:bg-border-grid'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">public</span>
              <span>Show All 7 Boundaries</span>
            </button>

            {/* Clear Button */}
            {activeSimulationId && (
              <button
                onClick={handleRecenter}
                className="px-sm py-1 rounded-lg text-[11px] font-bold bg-canvas-subtle text-text-secondary hover:text-text-primary border border-border-grid flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                <span>Reset Map</span>
              </button>
            )}
          </div>
        </div>

        {/* Clickable Disaster Scenario Simulation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-xs">
          {DISASTER_SIMULATIONS.map((scenario) => {
            const isActive = activeSimulationId === scenario.id;
            return (
              <button
                key={scenario.id}
                disabled={isSimulating}
                onClick={() => handleTriggerSimulation(scenario)}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-2 shadow-sm scale-[1.02] bg-surface-card'
                    : 'bg-canvas-subtle border-border-grid hover:bg-surface-card hover:border-border-strong'
                }`}
                style={{
                  borderColor: isActive ? scenario.color : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[12px] font-bold text-text-primary truncate">
                    {scenario.shortName}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: scenario.color }}
                  />
                </div>
                <div className="text-[10px] text-text-muted truncate">{scenario.region}</div>
                <div className="mt-1 pt-1 border-t border-border-grid flex items-center justify-between">
                  <span className="text-[9.5px] font-mono text-text-secondary font-semibold">
                    {scenario.metric}
                  </span>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: scenario.color }}
                  >
                    {isActive ? 'ACTIVE' : 'DRAW'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Feedback Status Line */}
        {simulationStatus && (
          <div className="flex items-center gap-xs font-mono text-[11px] text-text-primary bg-canvas-subtle px-sm py-1 rounded-lg border border-border-grid">
            <span className="material-symbols-outlined text-[14px] text-status-nominal">
              check_circle
            </span>
            <span className="font-semibold">{simulationStatus}</span>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
