import React, { useEffect, useRef } from 'react';

const NODES = [
  {
    id: 'IN-ASM-042',
    name: 'Dibrugarh Basin',
    state: 'Assam',
    lat: 27.4728,
    lng: 94.9120,
    type: 'flood',
    reading: '+4.2m Crest Breach',
    severity: 'critical',
  },
  {
    id: 'IN-DL-004',
    name: 'Anand Vihar NCR',
    state: 'Delhi',
    lat: 28.6139,
    lng: 77.2090,
    type: 'aqi',
    reading: 'AQI 482 (PM2.5: 485)',
    severity: 'warning',
  },
  {
    id: 'IN-UK-012',
    name: 'Joshimath Slopes',
    state: 'Uttarakhand',
    lat: 30.5564,
    lng: 79.5647,
    type: 'seismic',
    reading: '2.8 mm/hr Shear',
    severity: 'seismic',
  },
  {
    id: 'IN-OD-055',
    name: 'Paradip Coastal Rim',
    state: 'Odisha',
    lat: 20.3165,
    lng: 86.6114,
    type: 'flood',
    reading: '82 km/h Coastal Surge',
    severity: 'cobalt',
  },
  {
    id: 'IN-TS-088',
    name: 'Hyderabad Deccan Gateway',
    state: 'Telangana',
    lat: 17.3850,
    lng: 78.4867,
    type: 'nominal',
    reading: 'Nominal Float',
    severity: 'nominal',
  },
  {
    id: 'IN-KL-021',
    name: 'Kochi Western Ghats',
    state: 'Kerala',
    lat: 9.9312,
    lng: 76.2673,
    type: 'flood',
    reading: 'Monsoon Runoff Nominal',
    severity: 'nominal',
  },
  {
    id: 'IN-MH-015',
    name: 'Mumbai Coastal Node',
    state: 'Maharashtra',
    lat: 19.0760,
    lng: 72.8777,
    type: 'aqi',
    reading: 'AQI 118 Moderate',
    severity: 'nominal',
  },
  {
    id: 'IN-WB-062',
    name: 'Kolkata Deltaic Outpost',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    type: 'flood',
    reading: 'Tidal Swell Nominal',
    severity: 'nominal',
  },
];

export default function TacticalGeospatialMap({
  selectedLayer = 'ALL',
  onInspectNode,
  recenterTrigger = 0
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const L = window.L;

    // Create Leaflet Map instance
    const map = L.map(mapContainerRef.current, {
      center: [22.5937, 82.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    // High-contrast clean institutional light tiles (CartoDB Positron)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Recenter trigger
  useEffect(() => {
    if (mapInstanceRef.current && recenterTrigger > 0) {
      mapInstanceRef.current.flyTo([22.5937, 82.0], 5, { duration: 1.2 });
    }
  }, [recenterTrigger]);

  // Update Markers & Mesh Polyline on layer changes
  useEffect(() => {
    if (!window.L || !mapInstanceRef.current || !layerGroupRef.current) return;
    const L = window.L;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // Filter nodes by layer
    const visibleNodes = NODES.filter((n) => {
      if (selectedLayer === 'ALL') return true;
      if (selectedLayer === 'FLOOD') return n.type === 'flood';
      if (selectedLayer === 'AQI') return n.type === 'aqi';
      return true;
    });

    // Draw telemetry mesh links if ALL layers selected
    if (selectedLayer === 'ALL') {
      const meshCoords = [
        [28.6139, 77.2090], // Delhi
        [30.5564, 79.5647], // Joshimath
        [27.4728, 94.9120], // Assam
        [22.5726, 88.3639], // Kolkata
        [20.3165, 86.6114], // Paradip
        [17.3850, 78.4867], // Hyderabad
        [9.9312, 76.2673],  // Kochi
        [19.0760, 72.8777], // Mumbai
        [28.6139, 77.2090], // Back to Delhi
      ];

      L.polyline(meshCoords, {
        color: '#0284c7',
        weight: 1.5,
        dashArray: '4, 8',
        opacity: 0.65,
      }).addTo(layerGroup);
    }

    // Add node markers
    visibleNodes.forEach((node) => {
      let iconHtml = '';

      if (node.severity === 'critical') {
        iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute w-10 h-10 rounded-full bg-red-500/35 animate-ping"></span>
            <span class="w-6 h-6 rounded-full bg-[#dc2626] border-2 border-white flex items-center justify-center text-[11px] font-bold text-white shadow-lg">!</span>
            <div class="absolute bottom-7 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e8f0] shadow-md px-2 py-0.5 rounded text-[11px] whitespace-nowrap pointer-events-none">
              <span class="text-red-700 font-bold font-mono">${node.id.replace('IN-', '')}</span>
              <span class="text-[#0f172a] font-semibold ml-1">${node.name}</span>
            </div>
          </div>
        `;
      } else if (node.severity === 'warning') {
        iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute w-9 h-9 rounded-full bg-amber-500/35 animate-ping"></span>
            <span class="w-5 h-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md">!</span>
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e8f0] shadow-md px-2 py-0.5 rounded text-[11px] whitespace-nowrap pointer-events-none">
              <span class="text-amber-700 font-bold font-mono">${node.id.replace('IN-', '')}</span>
              <span class="text-[#0f172a] font-semibold ml-1">${node.name}</span>
            </div>
          </div>
        `;
      } else if (node.severity === 'seismic') {
        iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer" style="transform: translate(-50%, -50%);">
            <span class="w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-md"></span>
            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e8f0] shadow-sm px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap text-indigo-700 font-bold font-mono pointer-events-none">
              ${node.id.replace('IN-', '')}
            </div>
          </div>
        `;
      } else if (node.severity === 'cobalt') {
        iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer" style="transform: translate(-50%, -50%);">
            <span class="w-4 h-4 rounded-full bg-[#0284c7] border-2 border-white shadow-md"></span>
            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 border border-[#e2e8f0] shadow-sm px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap text-[#0284c7] font-bold font-mono pointer-events-none">
              ${node.id.replace('IN-', '')}
            </div>
          </div>
        `;
      } else {
        // Nominal
        iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer" style="transform: translate(-50%, -50%);">
            <span class="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-sm"></span>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-tactical-marker',
        iconSize: [0, 0],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(layerGroup);

      marker.on('click', () => {
        if (onInspectNode) {
          onInspectNode(node.id);
        }
      });

      // Bind popup with tactical telemetry preview
      marker.bindPopup(`
        <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 4px;">
          <div style="font-size: 11px; font-weight: bold; color: #00507d; font-family: monospace;">
            STATION ${node.id} // ${node.state.toUpperCase()}
          </div>
          <div style="font-size: 13px; font-weight: bold; color: #0f172a; margin: 2px 0;">
            ${node.name}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
            Status: <strong>${node.reading}</strong>
          </div>
          <button
            onclick="window.dispatchEvent(new CustomEvent('inspect-node-event', { detail: '${node.id}' }))"
            style="background: #00507d; color: white; border: none; border-radius: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; cursor: pointer; width: 100%;"
          >
            OPEN TELEMETRY INSPECTOR
          </button>
        </div>
      `);
    });
  }, [selectedLayer, onInspectNode]);

  // Global event listener for marker popup inspection button
  useEffect(() => {
    const handleInspectEvent = (e) => {
      if (onInspectNode && e.detail) {
        onInspectNode(e.detail);
      }
    };
    window.addEventListener('inspect-node-event', handleInspectEvent);
    return () => window.removeEventListener('inspect-node-event', handleInspectEvent);
  }, [onInspectNode]);

  return (
    <div className="relative w-full h-[620px] xl:h-[700px] overflow-hidden rounded-b-xl">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 border border-[#e2e8f0] backdrop-blur-md px-md py-xs rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-sm pointer-events-auto">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-body-sm text-body-sm text-slate-600 font-medium">
              Nominal (154)
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="font-body-sm text-body-sm text-slate-600 font-medium">
              Watch / Advisory (2)
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse"></span>
            <span className="font-body-sm text-body-sm text-red-700 font-semibold">
              Critical Threat (2)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-xs font-label-code text-label-code text-slate-500">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">
            verified
          </span>
          <span className="font-semibold text-slate-700">
            ISRO Satellite Link Synchronized
          </span>
        </div>
      </div>
    </div>
  );
}
