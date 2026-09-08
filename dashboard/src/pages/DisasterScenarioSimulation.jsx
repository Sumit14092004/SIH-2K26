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

  return (
    <div className="flex flex-col w-full space-y-md pb-xl">
      {/* 1. Cockpit Header & Stage Pitch Bar */}
      <div className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-alert-warning-subtle border border-alert-warning/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-alert-warning text-[24px]">
              crisis_alert
            </span>
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h1 className="font-headline-md text-headline-md text-text-primary font-bold">
                Disaster Scenario Simulation &amp; Hazard Boundaries
              </h1>
              <span className="font-label-code text-label-code text-alert-warning bg-alert-warning-subtle border border-alert-warning/30 px-xs py-0.5 rounded font-bold">
                STAGE PITCH EVALUATION BAR
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
              Full-scale multi-hazard boundary injection, evacuation radius computation, and emergency CAP/SMS transmission testing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-xs ml-auto">
          <span className="font-label-code text-label-code text-text-muted">
            SCENARIOS CONFIGURED:
          </span>
          <span className="font-label-code text-label-code font-bold text-text-primary bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg">
            7 ACTIVE REGIONAL VECTORS
          </span>
        </div>
      </div>

      {/* 2. Primary Interactive Simulation Map Engine */}
      <div className="w-full">
        <BharatTacticalMapCard
          onInspectNode={onInspectNode}
          onTriggerNotification={onTriggerNotification}
          showSimulationConsole={true}
        />
      </div>

      {/* 3. Deep-Dive Scenario Specifications Grid */}
      <div className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col gap-md">
        <div className="flex items-center justify-between pb-xs border-b border-border-grid">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">
              science
            </span>
            <h3 className="font-headline-md text-body-md text-text-primary font-bold">
              Simulation Scenario Profiles &amp; Test Injections
            </h3>
          </div>
          <span className="font-label-code text-label-code text-text-muted">
            Click any scenario profile to inspect payloads or trigger test dispatch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
          {DISASTER_SIMULATIONS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`p-md rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-sm ${
                  isSelected
                    ? 'border-primary bg-sky-50/40 shadow-sm'
                    : 'border-border-grid bg-surface-card hover:bg-canvas-subtle/50 hover:border-border-strong'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-xs mb-xs">
                    <span className="font-headline-md text-body-md font-bold text-text-primary">
                      {scenario.name}
                    </span>
                    <span
                      className="px-xs py-0.5 rounded text-[10px] font-bold font-mono uppercase"
                      style={{
                        backgroundColor: `${scenario.color}20`,
                        color: scenario.color,
                        border: `1px solid ${scenario.color}40`,
                      }}
                    >
                      {scenario.hazardType}
                    </span>
                  </div>

                  <p className="text-body-sm text-text-secondary">
                    <strong>Region:</strong> {scenario.region}
                  </p>
                  <p className="text-body-sm text-text-muted mt-0.5">
                    <strong>Node ID:</strong> #{scenario.nodeId}
                  </p>
                  <p className="text-body-sm text-text-secondary mt-1">
                    <strong>Key Metric:</strong>{' '}
                    <span className="font-semibold text-text-primary">{scenario.metric}</span>
                  </p>
                  <p className="text-[12px] text-text-muted italic mt-1 bg-canvas-subtle p-xs rounded border border-border-grid">
                    "{scenario.directive}"
                  </p>
                </div>

                <div className="pt-xs border-t border-border-grid flex items-center justify-between gap-xs">
                  <span className="font-label-code text-[11px] text-text-muted">
                    Radius: {(scenario.evacuationRadiusMeters / 1000).toFixed(0)} km
                  </span>

                  <div className="flex items-center gap-xs">
                    <button
                      className="px-sm py-1 bg-primary hover:bg-primary-container text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
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
                      className="px-sm py-1 border border-border-grid hover:bg-canvas-subtle text-text-secondary text-[11px] font-semibold rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInspectNode) onInspectNode(scenario.nodeId);
                      }}
                    >
                      Inspect Node
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
            className={`p-sm rounded-lg border font-mono text-[11px] flex items-center gap-xs ${
              backendResponse.success
                ? 'bg-status-nominal-subtle border-status-nominal/30 text-status-nominal'
                : 'bg-alert-warning-subtle border-alert-warning/30 text-alert-warning'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {backendResponse.success ? 'check_circle' : 'warning'}
            </span>
            <span>{backendResponse.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
