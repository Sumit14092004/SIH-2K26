import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sirenManager } from '../audio/SirenManager';
import { useHazardAlerts } from '../../context/HazardAlertContext';
import { CANONICAL_NODES } from '../../data/canonicalNodes';

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
      node_id: 'IN-KL-071',
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
      node_id: 'IN-DL-004',
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
      node_id: 'IN-BR-019',
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
      node_id: 'IN-UK-012',
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
      node_id: 'IN-OD-055',
      hazard: 'flash_flood',
      confidence: 95.5,
      pressure_drop_hpa: 984.0,
      wind_speed_kmh: 115.0,
    },
    metric: '984 hPa / 115 km/h',
    directive: 'Severe cyclonic storm making landfall within 4 hours. 22km coastal clearance ordered.',
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
  focusedNodeId,
}) {
  const [selectedLayer, setSelectedLayer] = useState('ALL');
  const [mapStyle, setMapStyle] = useState('topo'); // 'topo' | 'dark' | 'satellite'
  const [cursorCoords, setCursorCoords] = useState({ lat: 22.5937, lng: 78.9629 });
  const [activeSimulationId, setActiveSimulationId] = useState(null);
  const [simulationStatus, setSimulationStatus] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [filteredCount, setFilteredCount] = useState(12);

  // OpenWeather Layout Elements State
  const [activePopupNode, setActivePopupNode] = useState(() => CANONICAL_NODES[0] || null);

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
      if (['FLOOD', 'AQI', 'SEISMIC', 'FIRE', 'CYCLONE', 'PRESSURE'].includes(selectedHazard)) {
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

  const [leafletReady, setLeafletReady] = useState(() => typeof window !== 'undefined' && !!window.L);

  useEffect(() => {
    if (leafletReady) return;
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.L) {
        setLeafletReady(true);
        clearInterval(checkInterval);
      }
    }, 100);
    return () => clearInterval(checkInterval);
  }, [leafletReady]);

  // 1. Initialize Map
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const L = window.L;

    const map = L.map(mapContainerRef.current, {
      center: [23.1544554, 72.884999],
      zoom: 12,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
    });

    map.setView([23.1544554, 72.884999], 12);

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
  }, [leafletReady]);

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
      // 1. Text Search Filter
      const q = (searchQuery || '').trim().toLowerCase();
      if (q) {
        const matchesQuery =
          (node.id && node.id.toLowerCase().includes(q)) ||
          (node.code && node.code.toLowerCase().includes(q)) ||
          (node.displayId && node.displayId.toLowerCase().includes(q)) ||
          (node.name && node.name.toLowerCase().includes(q)) ||
          (node.location && node.location.toLowerCase().includes(q)) ||
          (node.state && node.state.toLowerCase().includes(q)) ||
          (node.hazard && node.hazard.toLowerCase().includes(q)) ||
          (node.pincode && String(node.pincode).includes(q));
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

      // 3. Hazard Filter
      const activeHazard = selectedHazard && selectedHazard !== 'ALL' ? selectedHazard : selectedLayer;
      if (activeHazard !== 'ALL') {
        if (node.isMultiSensor && node.readings) {
          const matchesAnySensor = node.readings.some(
            (r) => r.hazard_type && r.hazard_type.toLowerCase() === activeHazard.toLowerCase()
          );
          if (!matchesAnySensor && node.hazardType !== activeHazard) return false;
        } else if (node.hazardType !== activeHazard) {
          return false;
        }
      }

      return true;
    });

    setFilteredCount(visibleNodes.length);

    // Auto-focus if user is filtering
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

    // Render Location Pointers
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
        // NOMINAL
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

      // Selecting node updates the OpenWeather-style floating detail card
      marker.on('click', () => {
        setActivePopupNode(node);
        if (onInspectNode) {
          onInspectNode(node.id);
        }
      });

      marker.on('mouseover', () => {
        setActivePopupNode(node);
      });
    });
  }, [selectedLayer, mapStyle, onInspectNode, allNodesList, getNodeSeverity, searchQuery, selectedState, selectedHazard]);

  // 4. Focus target node when passed from parent (e.g. from Right Timeline Event click)
  useEffect(() => {
    if (!focusedNodeId) return;
    const target =
      allNodesList.find((n) => n.id === focusedNodeId || n.displayId === focusedNodeId) ||
      CANONICAL_NODES.find((n) => n.id === focusedNodeId || n.displayId === focusedNodeId);

    if (target) {
      const assessment = getNodeSeverity ? getNodeSeverity(target) : { activeTier: target.severity || 'nominal', readingValue: target.keyMetric };
      const targetWithSeverity = {
        ...target,
        lat: target.coordinates?.lat || target.lat || 20.5937,
        lng: target.coordinates?.lng || target.lng || 78.9629,
        code: target.displayId || target.code || target.id,
        severity: assessment.activeTier,
        metric: target.keyMetric || assessment.readingValue,
      };
      setActivePopupNode(targetWithSeverity);
      if (mapInstanceRef.current && targetWithSeverity.lat && targetWithSeverity.lng) {
        mapInstanceRef.current.flyTo([targetWithSeverity.lat, targetWithSeverity.lng], 9, { duration: 1.2 });
      }
    }
  }, [focusedNodeId, allNodesList, getNodeSeverity]);


  // 6. Active Simulation Boundaries
  useEffect(() => {
    if (!window.L || !mapInstanceRef.current || !simulationLayerGroupRef.current) return;
    const L = window.L;
    const map = mapInstanceRef.current;
    const simLayer = simulationLayerGroupRef.current;

    simLayer.clearLayers();

    if (!activeSimulationId) return;

    if (activeSimulationId === 'ALL') {
      DISASTER_SIMULATIONS.forEach((sim) => {
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

        L.circle(sim.center, {
          radius: sim.evacuationRadiusMeters,
          color: sim.color,
          weight: 2,
          dashArray: '4, 8',
          fillColor: sim.color,
          fillOpacity: 0.12,
        }).addTo(simLayer);

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

        L.marker(sim.center, { icon: beaconIcon }).addTo(simLayer);
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
      mapInstanceRef.current.flyTo([23.1544554, 72.884999], 12, {
        duration: 1.0,
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

  const handleTriggerSimulation = async (scenario) => {
    setIsSimulating(true);
    setActiveSimulationId(scenario.id);
    setSimulationStatus(`Deploying ${scenario.name} at ${scenario.region}...`);

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
    <div className="bg-surface border border-subtle rounded-md overflow-hidden flex flex-col w-full h-full min-h-0 text-primary">
      {/* 1. Tactical HUD Header Bar with Segmented Pill Row */}
      <div className="bg-surface-alt border-b border-subtle px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Left Title & Geo Context */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-status-nominal" />
          <h3 className="text-xs font-semibold text-primary">
            National Early Warning Geospatial Grid
          </h3>
          <span className="hidden sm:inline-block text-[10px] text-muted font-mono bg-surface border border-subtle px-1.5 py-0.5 rounded">
            WGS84
          </span>
          <span className="hidden md:inline-block text-[10px] text-muted font-mono">
            {cursorCoords.lat}° N, {cursorCoords.lng}° E
          </span>
          {isFilterActive && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface border border-subtle text-secondary text-[10px] font-mono">
              <span className="font-medium">Filter: {filteredCount}/{allNodesList.length}</span>
              <button
                onClick={onResetFilters}
                className="text-muted hover:text-status-critical font-bold ml-1 cursor-pointer"
                title="Clear all filters and show entire fleet"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right Segmented Layer-Toggle Pill Row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Hazard Layer Filter Pills */}
          <div className="flex items-center gap-1 bg-surface border border-subtle p-0.5 rounded flex-wrap">
            {[
              { id: 'ALL', label: 'All', icon: 'layers' },
              { id: 'FLOOD', label: 'Flood', icon: 'water' },
              { id: 'AQI', label: 'AQI', icon: 'air' },
              { id: 'PRESSURE', label: 'Pressure', icon: 'compress' },
              { id: 'SEISMIC', label: 'Seismic', icon: 'landscape' },
              { id: 'FIRE', label: 'Fire', icon: 'local_fire_department' },
              { id: 'CYCLONE', label: 'Cyclone', icon: 'cyclone' },
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  selectedLayer === layer.id
                    ? 'bg-accent text-white'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">{layer.icon}</span>
                <span>{layer.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-subtle mx-0.5 hidden sm:block" />

          {/* Basemap Switcher Pills */}
          <div className="flex items-center gap-1 bg-surface border border-subtle p-0.5 rounded">
            <button
              onClick={() => setMapStyle('topo')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                mapStyle === 'topo'
                  ? 'bg-accent text-white'
                  : 'text-secondary hover:text-primary'
              }`}
              title="Topographic contours, elevation, river basins & terrain relief"
            >
              <span className="material-symbols-outlined text-[13px]">terrain</span>
              <span>Topo</span>
            </button>
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                mapStyle === 'dark'
                  ? 'bg-accent text-white'
                  : 'text-secondary hover:text-primary'
              }`}
              title="Tactical dark radar mode"
            >
              <span className="material-symbols-outlined text-[13px]">dark_mode</span>
              <span>Dark</span>
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                mapStyle === 'satellite'
                  ? 'bg-accent text-white'
                  : 'text-secondary hover:text-primary'
              }`}
              title="Esri satellite imagery"
            >
              <span className="material-symbols-outlined text-[13px]">satellite_alt</span>
              <span>Sat</span>
            </button>
          </div>

          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            className="bg-surface hover:bg-surface-alt text-secondary hover:text-primary border border-subtle p-1 rounded flex items-center justify-center transition-all cursor-pointer"
            title="Recenter & Fit India"
          >
            <span className="material-symbols-outlined text-[15px]">crop_free</span>
          </button>
        </div>
      </div>

      {/* 2. Map Canvas Viewport with Floating Detail Card */}
      <div
        className={`relative w-full flex-1 min-h-[300px] overflow-hidden ${
          mapStyle === 'dark' ? 'tactical-map-dark' : ''
        }`}
      >
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Active Simulation Top HUD Banner */}
        {activeSimulationId && (
          <div className="absolute top-2 left-2 right-14 z-20 bg-surface/95 border border-status-critical/60 backdrop-blur-md px-3 py-1.5 rounded shadow-md flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-critical shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-status-critical font-bold uppercase tracking-wider">
                  {activeSimulationId === 'ALL'
                    ? 'Multi-Hazard Threat Envelope Active'
                    : `Active Scenario: ${DISASTER_SIMULATIONS.find((s) => s.id === activeSimulationId)?.shortName}`}
                </span>
                <span className="text-[10.5px] text-secondary">
                  {simulationStatus || 'Perimeter & evacuation buffer drawn on geospatial grid'}
                </span>
              </div>
            </div>
            <button
              onClick={handleRecenter}
              className="px-2 py-0.5 bg-status-critical/10 hover:bg-status-critical/20 text-status-critical border border-status-critical/30 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
              <span>Dismiss</span>
            </button>
          </div>
        )}

        {/* Floating Zoom Controls */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-0.5 bg-surface/95 border border-subtle backdrop-blur-md p-0.5 rounded shadow-sm pointer-events-auto">
          <button
            onClick={handleZoomIn}
            className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors text-xs font-bold"
            title="Zoom In"
          >
            +
          </button>
          <div className="w-full h-[1px] bg-subtle" />
          <button
            onClick={handleZoomOut}
            className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors text-xs font-bold"
            title="Zoom Out"
          >
            −
          </button>
          <div className="w-full h-[1px] bg-subtle" />
          <button
            onClick={handleRecenter}
            className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors"
            title="Fit India View"
          >
            <span className="material-symbols-outlined text-[14px]">my_location</span>
          </button>
        </div>

        {/* FLOATING DETAIL CARD */}
        {activePopupNode && (
          <div className="absolute top-2 right-10 z-30 w-72 sm:w-80 bg-surface/95 backdrop-blur-md border border-subtle rounded-md shadow-lg p-3 text-primary flex flex-col gap-2 pointer-events-auto transition-all">
            {/* Card Top Strip */}
            <div className="flex items-start justify-between border-b border-subtle pb-1.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10.5px] font-semibold text-secondary bg-surface-alt px-1.5 py-0.2 rounded border border-subtle">
                    {activePopupNode.code || activePopupNode.displayId || activePopupNode.id}
                  </span>
                  <span className="text-[10px] text-muted uppercase tracking-wider">
                    {activePopupNode.state || 'India Sector'}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-primary mt-0.5 leading-tight line-clamp-1">
                  {activePopupNode.name}
                </h4>
              </div>
              <button
                onClick={() => setActivePopupNode(null)}
                className="text-muted hover:text-primary p-0.5 rounded hover:bg-surface-alt transition-colors cursor-pointer"
                title="Dismiss Card"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>

            {/* Hero Metric Banner */}
            <div className="flex items-baseline justify-between bg-surface-alt p-2 rounded border border-subtle">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-mono tracking-wider text-muted">
                  Primary Sensor Metric
                </span>
                <span className="text-base font-semibold tracking-tight text-primary font-mono">
                  {activePopupNode.metric || activePopupNode.keyMetric || (activePopupNode.severity === 'offline' ? 'OFFLINE' : 'NOMINAL')}
                </span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider border ${
                  activePopupNode.severity === 'critical'
                    ? 'bg-status-critical/10 text-status-critical border-status-critical/30'
                    : activePopupNode.severity === 'abnormal'
                    ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                    : activePopupNode.severity === 'warning'
                    ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                    : activePopupNode.severity === 'offline'
                    ? 'bg-surface-alt text-muted border-subtle'
                    : 'bg-status-nominal/10 text-status-nominal border-status-nominal/30'
                }`}
              >
                {activePopupNode.severity || 'nominal'}
              </span>
            </div>

            {/* Labeled Spec Rows */}
            <div className="flex flex-col gap-1 text-[11px]">
              <div className="flex items-center justify-between border-b border-subtle/50 pb-0.5">
                <span className="text-muted">Hazard Vector</span>
                <span className="font-medium text-secondary">
                  {activePopupNode.hazardType || activePopupNode.hazard || 'Hydrological'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-subtle/50 pb-0.5">
                <span className="text-muted">Elevation / Coords</span>
                <span className="font-mono text-secondary text-[10px]">
                  {activePopupNode.elevation || '108m ASL'} • {activePopupNode.lat?.toFixed(2)}°N, {activePopupNode.lng?.toFixed(2)}°E
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-subtle/50 pb-0.5">
                <span className="text-muted">Power &amp; Battery</span>
                <span className="font-medium text-secondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-nominal" />
                  {activePopupNode.power?.batteryPct ?? 94}% • Solar Nominal
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-subtle/50 pb-0.5">
                <span className="text-muted">Mesh &amp; Latency</span>
                <span className="font-mono text-secondary text-[10px]">
                  {activePopupNode.network?.rssi || '-68 dBm'} • {activePopupNode.network?.latency || '38ms'}
                </span>
              </div>
            </div>

            {/* Full Inspection Action */}
            <button
              onClick={() => {
                if (onInspectNode) onInspectNode(activePopupNode.id);
              }}
              className="w-full bg-accent hover:bg-accent/90 text-white text-[11px] font-medium py-1.5 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">query_stats</span>
              <span>Inspect Full Node Telemetry</span>
            </button>
          </div>
        )}

        {/* Bottom Tactical Status Legend Dock */}
        <div className="absolute bottom-2 left-2 z-20 bg-surface/95 border border-subtle backdrop-blur-md px-3 py-1 rounded shadow-xs flex items-center gap-3 flex-wrap pointer-events-auto">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-status-nominal" />
            <span className="text-xs text-secondary font-medium">Nominal ({nominalCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-status-warning" />
            <span className="text-xs text-secondary font-medium">Warning ({warningCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-secondary font-medium">Abnormal ({abnormalCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-status-critical" />
            <span className="text-xs text-status-critical font-medium">Critical ({criticalCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-muted" />
            <span className="text-xs text-muted font-medium">Offline ({offlineCount})</span>
          </div>
        </div>
      </div>

      {/* 5. Disaster Simulation Console (Shown when enabled) */}
      {showSimulationConsole && (
        <div className="bg-surface-alt border-t border-subtle p-2.5 flex flex-col gap-2 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                crisis_alert
              </span>
              <span className="text-xs font-semibold text-primary">
                Disaster Scenario Simulation
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const nextState = !soundEnabled;
                  setSoundEnabled(nextState);
                  if (!nextState) sirenManager.stop();
                }}
                className={`px-2 py-0.5 rounded text-[10.5px] font-medium border flex items-center gap-1 transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-status-critical/10 text-status-critical border-status-critical/40'
                    : 'bg-surface text-secondary border-subtle hover:bg-surface-alt'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {soundEnabled ? 'volume_up' : 'volume_off'}
                </span>
                <span>{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
              </button>

              <button
                onClick={handleShowAllBoundaries}
                className={`px-2 py-0.5 rounded text-[10.5px] font-medium border flex items-center gap-1 transition-colors cursor-pointer ${
                  activeSimulationId === 'ALL'
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface text-secondary border-subtle hover:bg-surface-alt'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">public</span>
                <span>All 7 Scenarios</span>
              </button>

              {activeSimulationId && (
                <button
                  onClick={handleRecenter}
                  className="px-2 py-0.5 rounded text-[10.5px] font-medium bg-surface text-secondary hover:text-primary border border-subtle flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">restart_alt</span>
                  <span>Reset Map</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1.5">
            {DISASTER_SIMULATIONS.map((scenario) => {
              const isActive = activeSimulationId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  disabled={isSimulating}
                  onClick={() => handleTriggerSimulation(scenario)}
                  className={`p-1.5 rounded border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'border-accent bg-surface font-medium'
                      : 'bg-surface border-subtle hover:bg-surface-alt'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[11px] font-medium text-primary truncate">
                      {scenario.shortName}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: scenario.color }}
                    />
                  </div>
                  <div className="text-[9.5px] text-muted truncate">{scenario.region}</div>
                  <div className="mt-1 pt-0.5 border-t border-subtle flex items-center justify-between">
                    <span className="text-[9px] font-mono text-secondary">
                      {scenario.metric}
                    </span>
                    <span
                      className="text-[8.5px] font-medium uppercase"
                      style={{ color: scenario.color }}
                    >
                      {isActive ? 'Active' : 'Draw'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {simulationStatus && (
            <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-primary bg-surface px-2 py-0.5 rounded border border-subtle">
              <span className="material-symbols-outlined text-[13px] text-status-nominal">
                check_circle
              </span>
              <span className="font-medium">{simulationStatus}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
