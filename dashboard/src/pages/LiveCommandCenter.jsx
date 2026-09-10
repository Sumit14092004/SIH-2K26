import React, { useState, useEffect, useMemo } from 'react';
import BharatTacticalMapCard from '../components/map/BharatTacticalMapCard';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function LiveCommandCenter({
  onInspectNode,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [liveNodes, setLiveNodes] = useState(1);
  const [focusedNodeId, setFocusedNodeId] = useState('GJ-RRU-001');
  const [timelineCategory, setTimelineCategory] = useState('ALL'); // 'ALL' | 'ALERTS' | 'DISPATCHES' | 'SMS' | 'TRIGGERS'
  const [expandedTimelineId, setExpandedTimelineId] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const {
    activeAlerts,
    activeHazardsCount,
    criticalCount,
    abnormalCount,
    warningCount,
    offlineCount,
    nominalCount,
    totalNodesCount,
    resolveHazardAlert,
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
    selectedHazard,
    setSelectedHazard,
    clearFilters,
    isFilterActive,
  } = useHazardAlerts();

  // Filter alerts based on global search & filters
  const filteredAlerts = useMemo(() => {
    return activeAlerts.filter((node) => {
      if (!node) return false;
      const query = (searchQuery || '').trim().toLowerCase();
      const matchesQuery =
        !query ||
        (node.id && node.id.toLowerCase().includes(query)) ||
        (node.name && node.name.toLowerCase().includes(query)) ||
        (node.location && node.location.toLowerCase().includes(query)) ||
        (node.state && node.state.toLowerCase().includes(query)) ||
        (node.hazard && node.hazard.toLowerCase().includes(query));

      const matchesState =
        !selectedState ||
        selectedState === 'ALL' ||
        (node.state && node.state.toLowerCase().includes(selectedState.toLowerCase()));

      const matchesHazard =
        !selectedHazard ||
        selectedHazard === 'ALL' ||
        node.hazardType === selectedHazard;

      return matchesQuery && matchesState && matchesHazard;
    });
  }, [activeAlerts, searchQuery, selectedState, selectedHazard]);

  // Comprehensive Dated Timeline Feed combining alerts, NDRF dispatches, Twilio SMS, and system triggers
  const timelineEvents = useMemo(() => {
    const events = [];

    // 1. Dynamic Live Alerts from activeAlerts
    filteredAlerts.forEach((a) => {
      events.push({
        id: `alert-${a.alertId || a.id}`,
        nodeId: a.id,
        category: 'ALERT',
        time: a.lastUpdated || '11:42 IST',
        title: `${a.displayId || a.id} • ${(a.hazard || a.hazardType || 'HAZARD').toUpperCase()}`,
        location: a.location,
        metric: a.keyMetric,
        description: a.subtext || `Sensors recorded threshold breach (${a.keyMetric}).`,
        directive: a.directive,
        severity: a.severity,
        isAlert: true,
      });
    });

    // 2. Operational Dispatches
    events.push({
      id: 'disp-01',
      nodeId: 'GJ-RRU-001',
      category: 'DISPATCH',
      time: '11:30 IST',
      title: 'NDRF Campus Sector Staging Armed',
      location: 'Rashtriya Raksha University, Lavad, Gujarat',
      metric: 'Tactical Team Staged',
      description: 'Staged at RRU tactical research facility. Emergency protocols calibrated to edge TinyML triggers.',
      directive: 'Tactical perimeter monitoring synchronized with hardware array.',
      severity: 'nominal',
      isAlert: false,
    });

    // 3. SMS Broadcasts (Twilio CAP)
    events.push({
      id: 'sms-01',
      nodeId: 'GJ-RRU-001',
      category: 'SMS',
      time: '10:15 IST',
      title: 'Common Alerting Protocol (CAP) Gateway Armed',
      location: 'Rashtriya Raksha University, Gujarat',
      metric: 'Twilio SMS Armed',
      description: 'Twilio Multi-Hazard CAP Gateway linked with sub-1.2s delivery latency test.',
      directive: 'Emergency dispatch ready for real-time trigger.',
      severity: 'nominal',
      isAlert: false,
    });

    // 4. Ingestion / Trigger Events
    events.push({
      id: 'trig-01',
      nodeId: 'GJ-RRU-001',
      category: 'TRIGGER',
      time: '09:45 IST',
      title: 'Qualcomm TinyML Edge AI Inference Active',
      location: 'RRU Main Campus, Lavad, Gujarat',
      metric: '292 µs Latency',
      description: 'On-device Random Forest classifier running at 292 microseconds execution time.',
      directive: 'Hardware Edge AI decision pipeline active.',
      severity: 'nominal',
      isAlert: false,
    });

    events.push({
      id: 'trig-02',
      nodeId: 'GJ-RRU-001',
      category: 'TRIGGER',
      time: '09:10 IST',
      title: 'ESP32 USB Serial Telemetry Linked',
      location: 'RRU Main Campus, Lavad, Gujarat',
      metric: '115200 Baud Stream',
      description: 'Physical ESP32 hardware node streaming real-time sensor packets via USB serial.',
      directive: 'Live hardware ingestion pipeline active.',
      severity: 'nominal',
      isAlert: false,
    });

    // Filter by timeline category
    if (timelineCategory === 'ALERTS') {
      return events.filter((e) => e.category === 'ALERT');
    }
    if (timelineCategory === 'DISPATCHES') {
      return events.filter((e) => e.category === 'DISPATCH');
    }
    if (timelineCategory === 'SMS') {
      return events.filter((e) => e.category === 'SMS');
    }
    if (timelineCategory === 'TRIGGERS') {
      return events.filter((e) => e.category === 'TRIGGER');
    }
    return events;
  }, [filteredAlerts, timelineCategory]);

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
    <div className="flex flex-col w-full h-full min-h-0 space-y-2">
      {/* 1. Operational Overview Summary Strip */}
      <section className="w-full bg-surface border border-subtle rounded-md px-3.5 py-1.5 flex flex-wrap items-center justify-between text-xs text-muted gap-2 shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-nominal" />
            <span className="text-secondary font-medium">Fleet:</span>
            <span className="font-mono text-primary font-medium">{liveNodes}/{totalNodesCount || 1} Online (RRU Rig)</span>
          </div>
          <div className="w-[1px] h-3.5 bg-subtle hidden md:block" />
          <div className="relative flex items-center gap-1.5 cursor-pointer select-none" onClick={() => setShowBreakdown((p) => !p)} title="Click to view sensor fleet breakdown">
            <span className={`w-2 h-2 rounded-full ${criticalCount > 0 ? 'bg-status-critical' : warningCount > 0 ? 'bg-status-warning' : 'bg-status-nominal'}`} />
            <span className="text-secondary font-medium">Threat Status:</span>
            <span className="font-mono text-primary flex items-center gap-1">
              {criticalCount > 0 ? (
                <span><strong className="text-status-critical font-medium">{criticalCount} Critical</strong> &middot; {warningCount} Warning</span>
              ) : warningCount > 0 ? (
                <span><strong className="text-status-warning font-medium">{warningCount} Warning</strong></span>
              ) : (
                <span className="text-status-nominal font-medium">Baseline Nominal</span>
              )}
              <span className="material-symbols-outlined text-[13px] text-muted">info</span>
            </span>

            {/* Click-to-Expand Popover */}
            {showBreakdown && (
              <div className="absolute top-full left-0 mt-1.5 z-30 bg-surface border border-subtle shadow-md rounded p-2 text-2xs font-mono whitespace-nowrap flex flex-col gap-1">
                <span className="text-muted text-[10px] uppercase font-semibold">Sensor Fleet Breakdown:</span>
                <div className="flex items-center gap-2">
                  <span className="text-status-nominal">{nominalCount} Nominal</span>
                  <span>&middot;</span>
                  <span className="text-status-warning">{warningCount} Warning</span>
                  <span>&middot;</span>
                  <span className="text-status-critical">{criticalCount} Critical</span>
                  <span>&middot;</span>
                  <span className="text-muted">{offlineCount} Offline</span>
                </div>
              </div>
            )}
          </div>
          <div className="w-[1px] h-3.5 bg-subtle hidden md:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-secondary font-medium">Latency:</span>
            <span className="font-mono text-primary font-medium">1.42s</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className={`font-mono text-2xs px-2 py-0.5 rounded border font-semibold ${
            criticalCount > 0
              ? 'text-status-critical bg-status-critical/10 border-status-critical/30'
              : 'text-status-nominal bg-status-nominal/10 border-status-nominal/30'
          }`}>
            {criticalCount > 0 ? `${activeHazardsCount} ACTIVE HAZARDS` : 'NOMINAL BASELINE'}
          </span>
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1 text-xs font-medium rounded border border-subtle bg-surface-alt hover:bg-subtle text-primary flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </section>

      {/* 2. Query & Geo Filter Toolbar */}
      <section className="w-full bg-surface border border-subtle rounded-md px-3 py-1 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-1.5 bg-surface-alt border border-subtle px-2 py-1 rounded text-secondary w-full sm:w-72 focus-within:border-accent transition-colors">
            <span className="material-symbols-outlined text-[16px] text-muted">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Basin, State, or Station ID..."
              className="bg-transparent text-primary text-xs placeholder:text-muted focus:outline-none w-full"
            />
            <span className="text-[10px] text-muted bg-surface border border-subtle px-1 py-0.2 rounded font-mono">
              ⌘K
            </span>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-1 rounded text-secondary">
            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL" className="bg-surface text-primary">All India Coverage</option>
              <option value="Assam" className="bg-surface text-primary">Assam Basin</option>
              <option value="Delhi" className="bg-surface text-primary">Delhi NCT / NCR</option>
              <option value="Uttarakhand" className="bg-surface text-primary">Uttarakhand Spine</option>
              <option value="Bihar" className="bg-surface text-primary">Bihar Floodplain</option>
              <option value="Odisha" className="bg-surface text-primary">Odisha Coastal Rim</option>
              <option value="Kerala" className="bg-surface text-primary">Kerala Western Ghats</option>
              <option value="Maharashtra" className="bg-surface text-primary">Maharashtra / Mumbai</option>
              <option value="West Bengal" className="bg-surface text-primary">West Bengal Delta</option>
              <option value="Telangana" className="bg-surface text-primary">Telangana / Deccan</option>
              <option value="Ladakh" className="bg-surface text-primary">Ladakh / Karakoram</option>
              <option value="Tamil Nadu" className="bg-surface text-primary">Tamil Nadu / Tidal Rim</option>
            </select>
          </div>

          {/* Hazard Vector Filter */}
          <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-1 rounded text-secondary">
            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Hazard:</span>
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL" className="bg-surface text-primary">All Hazards</option>
              <option value="FLOOD" className="bg-surface text-primary">Hydrological (Flood / Surge)</option>
              <option value="AQI" className="bg-surface text-primary">Atmospheric (Smog / AQI)</option>
              <option value="PRESSURE" className="bg-surface text-primary">Barometric (Atmospheric Pressure)</option>
              <option value="WATER_QUALITY" className="bg-surface text-primary">Water Quality (TDS Purity)</option>
              <option value="SEISMIC" className="bg-surface text-primary">Geotechnical (Landslide)</option>
              <option value="FIRE" className="bg-surface text-primary">Thermal (Wildfire)</option>
              <option value="CYCLONE" className="bg-surface text-primary">Coastal Cyclone</option>
            </select>
          </div>

          {/* Reset Filters Chip */}
          {isFilterActive && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-status-critical border border-subtle hover:border-status-critical/40 bg-surface-alt px-2 py-1 rounded transition-colors cursor-pointer"
              title="Clear all active filters"
            >
              <span className="material-symbols-outlined text-[13px]">filter_alt_off</span>
              <span>Clear</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. Main Center Console: Tactical Map Canvas + Dated Timeline Panel */}
      <div className="w-full flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-2.5 items-stretch">
        {/* Tactical Map with Segmented Pills, Floating Card, Scrubber & Forecast (Col 8) */}
        <div className="xl:col-span-8 h-full min-h-0">
          <BharatTacticalMapCard
            onInspectNode={onInspectNode}
            onTriggerNotification={onTriggerNotification}
            showSimulationConsole={false}
            searchQuery={searchQuery}
            selectedState={selectedState}
            selectedHazard={selectedHazard}
            onResetFilters={clearFilters}
            focusedNodeId={focusedNodeId}
          />
        </div>

        {/* Dated Activity & Alerts Timeline Panel (Col 4) */}
        <div className="xl:col-span-4 flex flex-col h-full min-h-0 bg-surface border border-subtle rounded-md overflow-hidden">
          {/* Timeline Header */}
          <div className="bg-surface-alt border-b border-subtle px-3 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-muted text-[18px]">
                calendar_month
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-semibold text-primary">
                    09 September 2026
                  </h3>
                </div>
                <p className="text-[10.5px] text-muted">
                  Operational Activity Stream ({timelineEvents.length} events)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-nominal" />
              <span className="text-[10px] text-status-nominal font-mono font-medium px-1.5 py-0.5 rounded bg-status-nominal/10 border border-status-nominal/30">
                LIVE IST
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="bg-surface border-b border-subtle px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'ALERTS', label: 'Alerts' },
              { id: 'DISPATCHES', label: 'Dispatches' },
              { id: 'SMS', label: 'SMS Sent' },
              { id: 'TRIGGERS', label: 'Triggers' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTimelineCategory(cat.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  timelineCategory === cat.id
                    ? 'bg-accent text-white'
                    : 'bg-surface-alt border border-subtle text-secondary hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Reverse-Chronological Event List */}
          <div className="flex-1 min-h-0 overflow-y-auto p-2.5 flex flex-col gap-2">
            {timelineEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[200px] gap-2 p-4 text-muted">
                <span className="material-symbols-outlined text-[28px] text-status-nominal">
                  task_alt
                </span>
                <p className="text-xs font-medium text-primary">No Events in this Category</p>
                <p className="text-[11px] text-muted">All regional stations operating in nominal parameter envelope.</p>
              </div>
            ) : (
              timelineEvents.map((evt) => {
                const isSelected = focusedNodeId === evt.nodeId;
                const isExpanded = expandedTimelineId === evt.id;

                return (
                  <div
                    key={evt.id}
                    onClick={() => {
                      setFocusedNodeId(evt.nodeId);
                      setExpandedTimelineId((p) => (p === evt.id ? null : evt.id));
                    }}
                    className={`rounded border p-2 transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-surface-alt border-accent/70'
                        : 'bg-surface border-subtle hover:bg-surface-alt'
                    }`}
                  >
                    {/* Timestamp & Category Badge */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-muted">
                          {evt.time}
                        </span>
                        <span
                          className={`px-1 py-0.2 rounded text-[9.5px] font-mono uppercase tracking-wider border ${
                            evt.category === 'ALERT'
                              ? 'bg-status-critical/10 text-status-critical border-status-critical/30'
                              : evt.category === 'DISPATCH'
                              ? 'bg-accent/10 text-accent border-accent/30'
                              : evt.category === 'SMS'
                              ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                              : 'bg-surface-alt text-muted border-subtle'
                          }`}
                        >
                          {evt.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-secondary bg-surface-alt px-1.5 py-0.2 rounded border border-subtle">
                          {evt.nodeId}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[15px] text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-accent' : ''
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <h4 className="text-xs font-medium text-primary leading-tight">
                        {evt.title}
                      </h4>
                      <p className="text-[10.5px] text-muted font-normal truncate mt-0.5">
                        {evt.location}
                      </p>
                    </div>

                    {/* Expanded Detail Disclosure */}
                    {isExpanded && (
                      <div className="mt-2 pt-1.5 border-t border-subtle flex flex-col gap-1.5">
                        <p className="text-2xs text-secondary leading-relaxed">
                          {evt.description}
                        </p>

                        <div className="bg-surface-alt px-2 py-1 rounded border border-subtle flex items-center justify-between">
                          <span className="font-mono text-2xs text-status-warning truncate max-w-[160px]">
                            {evt.metric}
                          </span>
                          <span className="text-[10px] text-muted font-mono uppercase">
                            {evt.severity || 'INFO'}
                          </span>
                        </div>

                        {evt.directive && (
                          <div className="bg-surface border border-subtle p-1.5 rounded text-2xs">
                            <span className="text-[9.5px] text-muted font-mono uppercase block">Directive:</span>
                            <span className="text-primary font-medium">{evt.directive}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-subtle">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFocusedNodeId(evt.nodeId);
                              if (onInspectNode) onInspectNode(evt.nodeId);
                            }}
                            className="text-accent hover:underline text-2xs font-medium flex items-center gap-0.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">visibility</span>
                            <span>Inspect Telemetry</span>
                          </button>

                          {evt.isAlert && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                resolveHazardAlert(evt.nodeId);
                                if (onTriggerNotification) {
                                  onTriggerNotification({
                                    title: `ALERT RESOLVED [${evt.nodeId}]`,
                                    message: `Ground dispatch authorized for ${evt.location}. Reverted to Nominal.`,
                                  });
                                }
                              }}
                              className="bg-accent hover:bg-accent-hover text-accent-contrast px-2 py-0.5 rounded text-2xs font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[13px]">check_circle</span>
                              <span>Dispatch Action</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
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
