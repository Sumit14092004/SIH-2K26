import React from 'react';
import BharatTacticalMapCard from '../components/map/BharatTacticalMapCard';

export default function SimulationTacticalMap({
  onInspectNode,
  onTriggerNotification,
}) {
  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Compact Cockpit Header Strip */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xs font-semibold text-primary">
              Scenario Simulation &amp; Hazard Boundaries
            </h1>
            <span className="text-[10px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
              Geospatial Sandbox
            </span>
            <span className="text-2xs text-muted hidden md:inline">
              Interactive multi-hazard boundary injection &amp; evacuation radius modeling
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xs font-mono text-muted">7 Scenarios Loaded</span>
          <span className="w-1.5 h-1.5 rounded-full bg-status-nominal" />
        </div>
      </div>

      {/* 2. Full Viewport Interactive Simulation Map Engine */}
      <div className="w-full flex-1 min-h-0">
        <BharatTacticalMapCard
          onInspectNode={onInspectNode}
          onTriggerNotification={onTriggerNotification}
          showSimulationConsole={true}
        />
      </div>
    </div>
  );
}
