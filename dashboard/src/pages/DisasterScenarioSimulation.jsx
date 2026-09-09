import React, { useState } from 'react';
import BharatTacticalMapCard, { DISASTER_SIMULATIONS } from '../components/map/BharatTacticalMapCard';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function DisasterScenarioSimulation({
  onInspectNode,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [testingBackend, setTestingBackend] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null);

  const { triggerHazardAlert } = useHazardAlerts();

  const selectedScenario = DISASTER_SIMULATIONS.find((s) => s.id === selectedScenarioId) || DISASTER_SIMULATIONS[0];

  const handleQuickBackendTrigger = async (scenario) => {
    setTestingBackend(true);
    setBackendResponse(null);

    // Unified Alert Trigger
    if (triggerHazardAlert) {
      await triggerHazardAlert({
        nodeId: scenario.nodeId || 'IN-ASM-042',
        hazardType: scenario.hazardType || 'FLOOD',
        severity: 'critical',
        metric: scenario.metric,
        location: scenario.region,
        directive: scenario.directive,
        subtext: `Simulated injection with ${scenario.metric}`,
        source: 'simulation',
        rawSensors: scenario.backendPayload,
      });
    }

    setBackendResponse({
      success: true,
      message: `[CRITICAL DISPATCH] Twilio SMS / CAP Broadcast Triggered for ${scenario.shortName}`,
    });

    if (onTriggerNotification) {
      onTriggerNotification({
        title: `SIMULATION DISPATCH: ${scenario.shortName.toUpperCase()}`,
        message: `Disaster pipeline executed for ${scenario.region}. Alert broadcast dispatched.`,
      });
    }
    setTestingBackend(false);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scroll') === 'profiles') {
      setTimeout(() => {
        const el = document.getElementById('scenario-profiles-section');
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 400);
    }
  }, []);

  return (
    <div className="flex flex-col w-full space-y-3 pb-8">
      {/* 1. Cockpit Header */}
      <div className="bg-surface border border-subtle rounded-md p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">
              crisis_alert
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-primary">
                Disaster Scenario Simulation &amp; Hazard Boundaries
              </h1>
              <span className="text-[10.5px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.5 rounded">
                Evaluation Mode
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Multi-hazard boundary injection, evacuation radius computation, and emergency CAP/SMS transmission verification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-muted">
            Configured:
          </span>
          <span className="text-xs font-mono font-medium text-primary bg-surface-alt border border-subtle px-2 py-0.5 rounded">
            7 Regional Profiles
          </span>
        </div>
      </div>

      {/* 2. Primary Interactive Simulation Map Engine */}
      <div className="w-full h-[460px]">
        <BharatTacticalMapCard
          onInspectNode={onInspectNode}
          onTriggerNotification={onTriggerNotification}
          showSimulationConsole={true}
        />
      </div>

      {/* 3. Deep-Dive Scenario Specifications Grid */}
      <div id="scenario-profiles-section" className="bg-surface border border-subtle rounded-md p-3.5 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-subtle">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              science
            </span>
            <h3 className="text-sm font-semibold text-primary">
              Simulation Scenario Profiles &amp; Test Injections
            </h3>
          </div>
          <span className="text-xs text-muted">
            Select a profile to inspect parameters or trigger emergency pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {DISASTER_SIMULATIONS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`p-3.5 rounded-md border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'border-accent bg-surface-alt/40 shadow-xs'
                    : 'border-subtle bg-surface hover:bg-surface-alt/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-primary">
                      {scenario.name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-2xs font-mono uppercase font-medium"
                      style={{
                        backgroundColor: `${scenario.color}15`,
                        color: scenario.color,
                        border: `1px solid ${scenario.color}35`,
                      }}
                    >
                      {scenario.hazardType}
                    </span>
                  </div>

                  <p className="text-xs text-secondary">
                    <span className="text-muted">Region:</span> {scenario.region}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    <span className="text-muted">Node ID:</span> {scenario.nodeId}
                  </p>
                  <p className="text-xs text-secondary mt-1">
                    <span className="text-muted">Key Metric:</span>{' '}
                    <span className="font-medium text-primary">{scenario.metric}</span>
                  </p>
                  <p className="text-xs text-muted italic mt-1.5 bg-surface-alt p-2 rounded border border-subtle leading-relaxed">
                    "{scenario.directive}"
                  </p>
                </div>

                <div className="pt-2 border-t border-subtle flex items-center justify-between gap-2">
                  <span className="text-2xs font-mono text-muted">
                    Radius: {(scenario.evacuationRadiusMeters / 1000).toFixed(0)} km
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      className="px-2.5 py-1 bg-accent hover:bg-accent-hover text-accent-contrast text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickBackendTrigger(scenario);
                      }}
                      disabled={testingBackend}
                    >
                      <span className="material-symbols-outlined text-[14px]">send</span>
                      <span>Test Trigger</span>
                    </button>

                    <button
                      className="px-2.5 py-1 border border-subtle hover:bg-surface-alt text-secondary hover:text-primary text-xs font-medium rounded transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInspectNode) onInspectNode(scenario.nodeId);
                      }}
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Backend Response Feedback */}
        {backendResponse && (
          <div
            className={`p-2 rounded border font-mono text-xs flex items-center gap-1.5 ${
              backendResponse.success
                ? 'bg-status-nominal/10 border-status-nominal/30 text-status-nominal'
                : 'bg-status-warning/10 border-status-warning/30 text-status-warning'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {backendResponse.success ? 'check_circle' : 'warning'}
            </span>
            <span>{backendResponse.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
