import React, { useState, useEffect } from 'react';
import BharatTacticalMapCard from '../components/map/BharatTacticalMapCard';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function LiveCommandCenter({
  onInspectNode,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [liveNodes, setLiveNodes] = useState(158);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedHazard, setSelectedHazard] = useState('ALL');

  const {
    activeAlerts,
    activeHazardsCount,
    criticalCount,
    abnormalCount,
    warningCount,
    offlineCount,
    nominalCount,
    resolveHazardAlert,
  } = useHazardAlerts();

  // Simulated node count jitter
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setLiveNodes((prev) => (prev === 158 ? 159 : 158));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter dispatch stream based on search and filters
  const filteredHazards = activeAlerts.filter((node) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      node.id.toLowerCase().includes(query) ||
      (node.name && node.name.toLowerCase().includes(query)) ||
      (node.location && node.location.toLowerCase().includes(query)) ||
      (node.state && node.state.toLowerCase().includes(query)) ||
      (node.hazard && node.hazard.toLowerCase().includes(query));

    const matchesState =
      selectedState === 'ALL' ||
      (node.state && node.state.toLowerCase().includes(selectedState.toLowerCase()));

    const matchesHazard =
      selectedHazard === 'ALL' ||
      node.hazardType === selectedHazard;

    return matchesQuery && matchesState && matchesHazard;
  });

  const handleExportCSV = () => {
    const header = 'Node_ID,Location,State,Hazard,Key_Metric,Severity,Status,Battery,Backhaul\n';
    const rows = CANONICAL_NODES.map(
      (n) =>
        `"${n.id}","${n.location}","${n.state}","${n.hazard}","${n.keyMetric}","${n.severity}","${n.status}","${n.power.batteryPct}%","${n.network.backhaul}"`
    ).join('\n');
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + header + rows);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'AAPDA_KADABRA_Canonical_Telemetry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full space-y-md pb-xl">
      {/* 1. Operational Overview Telemetry Bar (Standard Design Tokens) */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-md pt-xs">
        {/* Active Node Mesh */}
        <div className="bg-surface-card border border-border-grid shadow-xs rounded-xl p-md flex flex-col justify-between hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-status-nominal" />
              <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
                Active Node Mesh
              </span>
            </div>
            <span className="font-label-code text-label-code text-status-nominal bg-status-nominal-subtle border border-status-nominal/30 px-xs py-0.5 rounded font-semibold">
              98.7% ONLINE
            </span>
          </div>
          <div className="my-sm flex items-baseline gap-xs">
            <span className="font-metric-display text-[26px] text-text-primary font-bold tracking-tight">
              {liveNodes}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              of 160 active devices
            </span>
          </div>
          <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm">
            <span>ISRO GAGAN Linked</span>
            <span className="text-status-nominal font-medium font-label-code text-label-code">
              +2 DEPLOYED TODAY
            </span>
          </div>
        </div>

        {/* 5-State Severity Distribution Card */}
        <div className="bg-surface-card border border-border-grid shadow-xs rounded-xl p-md flex flex-col justify-between hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className={`w-2 h-2 rounded-full ${criticalCount > 0 ? 'bg-alert-critical animate-pulse' : 'bg-status-nominal'}`} />
              <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
                Severity Status Distribution
              </span>
            </div>
            <span className={`font-label-code text-label-code px-xs py-0.5 rounded font-bold border ${
              activeHazardsCount > 0
                ? 'text-alert-critical bg-alert-critical-subtle border-alert-critical/30 animate-pulse'
                : 'text-status-nominal bg-status-nominal-subtle border-status-nominal/30'
            }`}>
              {activeHazardsCount} ACTIVE HAZARDS
            </span>
          </div>
          <div className="my-sm flex items-baseline gap-xs flex-wrap">
            <span className={`font-metric-display text-[26px] font-bold tracking-tight ${
              criticalCount > 0 ? 'text-alert-critical' : 'text-status-nominal'
            }`}>
              {criticalCount}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              Crit &middot; <strong className="text-orange-600">{abnormalCount}</strong> Abn &middot; <strong className="text-amber-600">{warningCount}</strong> Warn
            </span>
          </div>
          <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm">
            <span className="font-label-code text-[11px] truncate">
              {nominalCount} Nom / {warningCount} Warn / {abnormalCount} Abn / {criticalCount} Crit / {offlineCount} Off
            </span>
            <span className={`font-medium font-label-code text-label-code shrink-0 ${
              criticalCount > 0 ? 'text-alert-critical' : 'text-status-nominal'
            }`}>
              {criticalCount > 0 ? 'NDRF ESCALATED' : 'NOMINAL BASELINE'}
            </span>
          </div>
        </div>

        {/* Edge Ingestion Latency */}
        <div className="bg-surface-card border border-border-grid shadow-xs rounded-xl p-md flex flex-col justify-between hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-telemetry-cobalt">
                bolt
              </span>
              <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
                Edge Ingestion Latency
              </span>
            </div>
            <span className="font-label-code text-label-code text-primary bg-primary-fixed/30 border border-primary/20 px-xs py-0.5 rounded font-semibold">
              ISRO INSAT-L
            </span>
          </div>
          <div className="my-sm flex items-baseline gap-xs">
            <span className="font-metric-display text-[26px] text-primary font-bold tracking-tight">
              1.42
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              seconds mean edge dispatch
            </span>
          </div>
          <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm">
            <span>Zero queue buffer latency</span>
            <span className="text-status-nominal font-medium font-label-code text-label-code">
              OPTIMAL SYNC
            </span>
          </div>
        </div>
      </section>

      {/* 2. Query & Geo Filter Toolbar */}
      <section className="w-full bg-surface-card border border-border-grid shadow-xs rounded-xl px-md py-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-md">
        <div className="flex flex-wrap items-center gap-sm flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-xs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary w-full sm:w-80 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-[18px] text-primary">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Basin, State, or Station ID..."
              className="bg-transparent text-text-primary font-body-sm text-body-sm placeholder:text-text-muted focus:outline-none w-full"
            />
            <span className="font-label-code text-label-code text-text-muted bg-surface-card border border-border-grid px-xxs py-0.5 rounded shadow-2xs">
              ⌘K
            </span>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-xxs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary">
            <span className="font-label-code text-label-code text-text-muted font-semibold">STATE:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent font-body-sm text-body-sm text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All India Coverage</option>
              <option value="Assam">Assam Basin</option>
              <option value="Delhi">Delhi NCT / NCR</option>
              <option value="Uttarakhand">Uttarakhand Spine</option>
              <option value="Bihar">Bihar Floodplain</option>
              <option value="Odisha">Odisha Coastal Rim</option>
              <option value="Kerala">Kerala Western Ghats</option>
            </select>
          </div>

          {/* Hazard Vector Filter */}
          <div className="flex items-center gap-xxs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary">
            <span className="font-label-code text-label-code text-text-muted font-semibold">HAZARD:</span>
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="bg-transparent font-body-sm text-body-sm text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All Vectors</option>
              <option value="FLOOD">Hydrological (Flood / Surge)</option>
              <option value="AQI">Atmospheric (Smog / AQI)</option>
              <option value="SEISMIC">Geotechnical (Landslide)</option>
              <option value="FIRE">Thermal (Wildfire)</option>
              <option value="CYCLONE">Coastal Cyclone</option>
            </select>
          </div>
        </div>

        {/* Right Action Counters & CSV Export */}
        <div className="flex items-center gap-sm ml-auto shrink-0">
          <div className="flex items-center gap-xs text-body-sm text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-status-nominal" />
            <span className="font-medium">{nominalCount} Nominal</span>
            <span className="text-border-strong">|</span>
            <span className={`w-2 h-2 rounded-full ${activeHazardsCount > 0 ? 'bg-alert-critical animate-pulse' : 'bg-status-nominal'}`} />
            <span className={`font-semibold ${activeHazardsCount > 0 ? 'text-alert-critical' : 'text-status-nominal'}`}>
              {activeHazardsCount} Active Hazards
            </span>
          </div>
          <button
            onClick={handleExportCSV}
            className="bg-primary hover:bg-primary-container text-white font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg flex items-center gap-xs shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span className="font-label-code text-label-code uppercase tracking-wider">Export CSV</span>
          </button>
        </div>
      </section>

      {/* 3. Main Center Console: Tactical Map Canvas + Live Hazard Stream */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-md items-start">
        {/* Geospatial Tactical Command Canvas (Col 8) — Canvas & Markers UNTOUCHED */}
        <div className="xl:col-span-8">
          <BharatTacticalMapCard
            onInspectNode={onInspectNode}
            onTriggerNotification={onTriggerNotification}
            showSimulationConsole={false}
          />
        </div>

        {/* Live Real-Time Hazard Alert Stream Sidebar (Col 4) — Sourced from CANONICAL_NODES */}
        <div className="xl:col-span-4 flex flex-col h-[670px] gap-sm">
          {/* Header Card */}
          <div className="bg-surface-card border border-border-grid shadow-xs rounded-xl p-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-lg bg-alert-critical-subtle border border-alert-critical/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-alert-critical text-[20px]">
                  emergency
                </span>
              </div>
              <div>
                <h2 className="font-headline-md text-body-md text-text-primary font-bold">
                  Tactical Hazard Dispatch
                </h2>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Canonical Multi-Hazard Stream ({filteredHazards.length})
                </p>
              </div>
            </div>
            <span className="font-label-code text-label-code text-alert-critical font-bold bg-alert-critical-subtle border border-alert-critical/30 px-xs py-0.5 rounded-full animate-pulse">
              LIVE STREAM
            </span>
          </div>

          {/* Dynamic Hazard Cards mapped directly from live alerts — Scrollable, Non-clipping */}
          <div className="flex flex-col gap-sm flex-1 min-h-0 overflow-y-auto pr-1.5 pb-1">
            {filteredHazards.length === 0 ? (
              <div className="bg-surface-card border border-border-grid rounded-xl p-lg flex flex-col items-center justify-center text-center h-full min-h-[320px] gap-sm">
                <div className="w-14 h-14 rounded-full bg-status-nominal-subtle border border-status-nominal/30 flex items-center justify-center text-status-nominal">
                  <span className="material-symbols-outlined text-[32px]">verified</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-body-md text-text-primary font-bold">
                    Zero Active Emergency Dispatches
                  </h3>
                  <p className="font-body-sm text-body-sm text-text-muted max-w-xs mt-1">
                    All 160 Bharat sensor nodes are operating within nominal environmental thresholds.
                  </p>
                </div>
                <div className="inline-flex items-center gap-xs font-label-code text-[11px] text-status-nominal bg-status-nominal-subtle border border-status-nominal/30 px-sm py-1 rounded-full font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-nominal animate-pulse" />
                  ISRO GAGAN TELEMETRY NOMINAL
                </div>
              </div>
            ) : (
              filteredHazards.map((hazardNode) => {
                const isCritical = hazardNode.severity === 'critical';
                const isRemoving = hazardNode.isRemoving;

                return (
                  <div
                    key={hazardNode.alertId || hazardNode.id}
                    onClick={() => onInspectNode(hazardNode.id)}
                    className={`bg-surface-card border border-border-grid shadow-xs hover:border-primary/50 hover:shadow-md hover:bg-canvas-subtle/30 rounded-xl p-md flex flex-col gap-sm relative overflow-hidden cursor-pointer group shrink-0 transition-all duration-300 ${
                      isRemoving
                        ? 'opacity-0 -translate-x-6 scale-95 pointer-events-none'
                        : 'opacity-100 translate-x-0 scale-100'
                    }`}
                    title={`Click to inspect telemetry for Node #${hazardNode.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-xs py-0.5 rounded font-label-code text-label-code font-bold uppercase tracking-wider flex items-center gap-1 border ${
                          isCritical
                            ? 'bg-alert-critical-subtle border-alert-critical/30 text-alert-critical'
                            : 'bg-alert-warning-subtle border-alert-warning/30 text-alert-warning'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCritical ? 'bg-alert-critical animate-pulse' : 'bg-alert-warning'
                          }`}
                        />
                        {hazardNode.hazard.toUpperCase()}
                      </span>
                      <span className="font-label-code text-label-code text-text-muted">
                        {hazardNode.lastUpdated}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-headline-md text-body-md text-text-primary group-hover:text-primary transition-colors font-bold flex items-center justify-between">
                        <span>{hazardNode.location}</span>
                        <span className="material-symbols-outlined text-[16px] text-text-muted group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_forward
                        </span>
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                        Node #{hazardNode.id}: {hazardNode.keyMetric}. {hazardNode.subtext}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-xs border-t border-border-grid">
                      <button
                        className="text-primary hover:text-primary-container font-body-sm text-body-sm font-semibold flex items-center gap-xxs transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectNode(hazardNode.id);
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Telemetry</span>
                      </button>

                      {/* Dispatch Action: Resolves alert from feed, reverts node to nominal, NO SMS */}
                      <button
                        className={`font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg flex items-center gap-xxs shadow-xs transition-all active:scale-95 ${
                          isCritical
                            ? 'bg-alert-critical hover:brightness-110 text-white'
                            : 'bg-alert-warning hover:brightness-110 text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Resolve alert via context (fades card out, resets node to nominal, NO SMS)
                          resolveHazardAlert(hazardNode.id);
                          if (onTriggerNotification) {
                            onTriggerNotification({
                              title: `ALERT RESOLVED [${hazardNode.id}]`,
                              message: `Ground dispatch authorized for ${hazardNode.location}. Node reverted to Nominal.`,
                            });
                          }
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Dispatch Action</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
