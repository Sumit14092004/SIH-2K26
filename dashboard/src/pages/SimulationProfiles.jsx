import React, { useState, useMemo } from 'react';
import { DISASTER_SIMULATIONS } from '../components/map/BharatTacticalMapCard';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function SimulationProfiles({
  onInspectNode,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedScenarioId, setExpandedScenarioId] = useState(null);
  const [injectingId, setInjectingId] = useState(null);
  const [lastInjected, setLastInjected] = useState(null);

  const { triggerHazardAlert } = useHazardAlerts();

  const filteredScenarios = useMemo(() => {
    if (selectedCategory === 'ALL') return DISASTER_SIMULATIONS;
    return DISASTER_SIMULATIONS.filter(
      (s) => s.hazardType && s.hazardType.toUpperCase() === selectedCategory.toUpperCase()
    );
  }, [selectedCategory]);

  const handleTrigger = async (scenario, e) => {
    if (e) e.stopPropagation();
    setInjectingId(scenario.id);

    try {
      if (triggerHazardAlert) {
        await triggerHazardAlert({
          nodeId: scenario.nodeId || 'IN-ASM-042',
          hazardType: scenario.hazardType || 'FLOOD',
          severity: 'critical',
          metric: scenario.metric,
          location: scenario.region,
          directive: scenario.directive,
          subtext: `Simulated injection: ${scenario.metric}`,
          source: 'simulation',
          rawSensors: scenario.backendPayload,
        });
      }

      setLastInjected(scenario.id);

      if (onTriggerNotification) {
        onTriggerNotification({
          title: `INJECTION EXECUTED: ${scenario.shortName.toUpperCase()}`,
          message: `Disaster simulation dispatched for ${scenario.region}. Alert broadcast & Twilio pipeline active.`,
        });
      }
    } catch {
      // Ignore network errors
    } finally {
      setTimeout(() => setInjectingId(null), 800);
    }
  };

  const toggleExpand = (id) => {
    setExpandedScenarioId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Cockpit Header & Filter Bar */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">biotech</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-semibold text-primary">
                Simulation Scenario Profiles &amp; Test Injections
              </h1>
              <span className="text-[10px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                7 Pre-Calibrated Profiles
              </span>
            </div>
            <p className="text-2xs text-muted">
              Click any row to reveal NDMA response directives, telemetry payloads, and CAP parameters.
            </p>
          </div>
        </div>

        {/* Hazard Category Filter Tabs */}
        <div className="flex items-center bg-surface-alt border border-subtle p-0.5 rounded text-xs gap-0.5">
          {['ALL', 'FLOOD', 'AQI', 'FIRE', 'SEISMIC', 'CYCLONE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-accent text-accent-contrast font-medium'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Scrollable Scenario Rows Container (Internal Scroll Only) */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1">
        {filteredScenarios.map((scenario) => {
          const isExpanded = expandedScenarioId === scenario.id;
          const isInjecting = injectingId === scenario.id;
          const wasInjected = lastInjected === scenario.id;

          return (
            <div
              key={scenario.id}
              className={`bg-surface border rounded-md transition-all ${
                isExpanded ? 'border-accent shadow-xs' : 'border-subtle hover:border-strong'
              }`}
            >
              {/* Summary Row */}
              <div
                onClick={() => toggleExpand(scenario.id)}
                className="p-2.5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                {/* Left: Hazard Badge + Title + Location */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: scenario.color }}
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-primary truncate">
                        {scenario.name}
                      </span>
                      <span
                        className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase font-medium"
                        style={{
                          backgroundColor: `${scenario.color}15`,
                          color: scenario.color,
                          border: `1px solid ${scenario.color}35`,
                        }}
                      >
                        {scenario.hazardType}
                      </span>
                    </div>
                    <span className="text-2xs text-muted truncate">
                      {scenario.region} &middot; Target Node:{' '}
                      <span className="font-mono text-secondary">{scenario.nodeId}</span>
                    </span>
                  </div>
                </div>

                {/* Center: Breach Metric & Radius */}
                <div className="hidden sm:flex items-center gap-3 shrink-0 font-mono text-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-muted text-[10px]">Breach Metric</span>
                    <span className="text-status-critical font-medium">{scenario.metric}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-subtle" />
                  <div className="flex flex-col text-right">
                    <span className="text-muted text-[10px]">Evac Radius</span>
                    <span className="text-primary font-medium">{scenario.radiusKm} km</span>
                  </div>
                </div>

                {/* Right: Quick Inject Button + Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleTrigger(scenario, e)}
                    disabled={isInjecting}
                    className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border ${
                      wasInjected
                        ? 'bg-status-nominal/10 text-status-nominal border-status-nominal/30'
                        : isInjecting
                        ? 'bg-accent/70 text-white cursor-wait'
                        : 'bg-accent hover:bg-accent-hover text-accent-contrast border-accent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isInjecting ? 'sync' : wasInjected ? 'check' : 'bolt'}
                    </span>
                    <span>{isInjecting ? 'Injecting...' : wasInjected ? 'Injected' : 'Inject Test'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(scenario.id);
                    }}
                    className="p-1 text-muted hover:text-primary rounded hover:bg-surface-alt transition-transform cursor-pointer"
                    aria-label="Toggle details"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-accent' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                </div>
              </div>

              {/* Click-to-Expand Disclosure Drawer */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-subtle bg-surface-alt/30 flex flex-col gap-2.5 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                    <div className="bg-surface border border-subtle p-2 rounded flex flex-col gap-1">
                      <span className="text-[10px] text-muted font-mono uppercase">
                        NDMA Response Directive
                      </span>
                      <p className="text-2xs text-primary font-medium leading-relaxed">
                        {scenario.directive}
                      </p>
                    </div>

                    <div className="bg-surface border border-subtle p-2 rounded flex flex-col gap-1">
                      <span className="text-[10px] text-muted font-mono uppercase">
                        Simulated Sensor Breach Vector
                      </span>
                      <p className="text-2xs text-secondary leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-2xs font-mono">
                    <div className="bg-surface border border-subtle p-1.5 rounded">
                      <span className="text-muted block text-[10px]">TARGET NODE</span>
                      <span className="text-primary font-medium">{scenario.nodeId}</span>
                    </div>
                    <div className="bg-surface border border-subtle p-1.5 rounded">
                      <span className="text-muted block text-[10px]">HAZARD VECTOR</span>
                      <span className="text-primary font-medium">{scenario.hazardType}</span>
                    </div>
                    <div className="bg-surface border border-subtle p-1.5 rounded">
                      <span className="text-muted block text-[10px]">THRESHOLD REACHED</span>
                      <span className="text-status-critical font-medium">{scenario.metric}</span>
                    </div>
                    <div className="bg-surface border border-subtle p-1.5 rounded">
                      <span className="text-muted block text-[10px]">EST. EVACUATION ZONE</span>
                      <span className="text-primary font-medium">{scenario.radiusKm} km radius</span>
                    </div>
                  </div>

                  {scenario.backendPayload && (
                    <div className="bg-surface border border-subtle rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-muted uppercase">
                          Telemetric Payload Injected to Edge Engine:
                        </span>
                        <span className="text-[10px] font-mono text-muted">JSON / MQTT-SN</span>
                      </div>
                      <pre className="text-[11px] font-mono text-secondary bg-surface-alt p-1.5 rounded overflow-x-auto">
                        {JSON.stringify(scenario.backendPayload, null, 2)}
                      </pre>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-subtle">
                    <button
                      onClick={() => onInspectNode && onInspectNode(scenario.nodeId)}
                      className="px-2 py-1 text-2xs font-medium rounded border border-subtle bg-surface hover:bg-surface-alt text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      Inspect Station Telemetry
                    </button>
                    <button
                      onClick={(e) => handleTrigger(scenario, e)}
                      className="px-3 py-1 text-2xs font-medium rounded bg-status-critical hover:bg-status-critical/90 text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">bolt</span>
                      <span>Trigger Critical Scenario</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
