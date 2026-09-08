import React from 'react';
import { useIstClock } from '../../utils/istTime';
import { useHazardAlerts } from '../../context/HazardAlertContext';

export default function TopHeader({ activePath, onNavigate, onBroadcastClick, onInspectNode }) {
  const istTime = useIstClock();
  const {
    activeAlerts,
    isVisualFlashing,
    isSirenActive,
    toggleSirenMute,
  } = useHazardAlerts();

  // Dynamically find most critical active alert from context feed
  const criticalHazard = activeAlerts.find((a) => a.severity === 'critical' && !a.isRemoving)
    || activeAlerts.find((a) => !a.isRemoving)
    || null;

  const handleSirenToggle = () => {
    toggleSirenMute();
  };

  const navItems = [
    { id: 'live-command-center', label: 'Live Command Center' },
    { id: 'disaster-scenario-simulation', label: 'Disaster Scenario Simulation' },
    { id: 'node-telemetry-and-inspection', label: 'Node Telemetry & Inspection' },
    { id: 'regional-risk-matrix', label: 'Regional Risk Matrix' },
    { id: 'early-warning-feed', label: 'Early Warning Feed' },
    { id: 'network-health-and-mesh', label: 'Network Health & Mesh' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-surface-card/95 backdrop-blur-md border-b border-border-grid shadow-sm transition-all duration-300 ${
      isVisualFlashing ? 'bg-red-950/20 border-alert-critical ring-2 ring-alert-critical/40' : ''
    }`}>
      <div className="h-20 w-full px-gutter-normal flex flex-col justify-between pt-xxs pb-xs">
        {/* Top Operational Bar */}
        <div className="flex items-center justify-between gap-md">
          {/* Brand & Team Logo */}
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-xs cursor-pointer" onClick={() => onNavigate('live-command-center')}>
              <img
                src="/team_logo_transparent.png"
                alt="AAPDA-KADABRA Emblem"
                className="h-9 w-auto max-w-[130px] object-contain mr-2 shrink-0 drop-shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight leading-none">
                  AAPDA-KADABRA
                </span>
                <span className="font-label-code text-label-code text-telemetry-cobalt font-semibold uppercase tracking-wider">
                  HAZARD INTELLIGENCE &amp; EARLY WARNING
                </span>
              </div>
            </div>

            {/* Live IST Clock */}
            <div className="hidden xl:flex items-center gap-xs px-xs py-xxs bg-canvas-subtle border border-border-grid rounded">
              <span className="material-symbols-outlined text-text-muted text-[16px]">schedule</span>
              <span className="font-label-code text-label-code text-text-secondary font-medium">IST</span>
              <span className="font-metric-label text-metric-label text-text-primary font-bold">{istTime}</span>
            </div>
          </div>

          {/* Active Hazard Banner Ticker — Clickable & Dynamic (Only visible if active alert exists) */}
          {criticalHazard && (
            <button
              onClick={() => onInspectNode && onInspectNode(criticalHazard.id)}
              className={`hidden lg:flex items-center gap-xs px-sm py-xxs rounded-lg text-text-secondary cursor-pointer transition-all shadow-2xs group border ${
                isVisualFlashing
                  ? 'bg-alert-critical text-white border-red-600 animate-pulse'
                  : 'bg-alert-critical-subtle/70 border-alert-critical/30 hover:border-alert-critical hover:bg-alert-critical-subtle'
              }`}
              title={`Click to inspect critical event: ${criticalHazard.location} (Node #${criticalHazard.id})`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isVisualFlashing ? 'text-white' : 'text-alert-critical'} animate-pulse`}>
                warning
              </span>
              <span className={`font-body-sm text-body-sm font-medium transition-colors ${
                isVisualFlashing ? 'text-white font-bold' : 'text-text-primary group-hover:text-alert-critical'
              }`}>
                {criticalHazard.location}: {criticalHazard.hazard} Active
              </span>
              <span className={`material-symbols-outlined text-[14px] ${isVisualFlashing ? 'text-white' : 'text-alert-critical'} opacity-80 group-hover:opacity-100 transition-opacity`}>
                open_in_new
              </span>
            </button>
          )}

          {/* Tactical Action Buttons */}
          <div className="flex items-center gap-sm">
            {/* Hazard Siren Button */}
            <button
              onClick={handleSirenToggle}
              className={`flex items-center gap-xxs px-xs py-xxs rounded border transition-colors shadow-xs ${
                isSirenActive
                  ? 'bg-alert-critical border-red-700 text-white animate-pulse'
                  : 'bg-surface-card border-border-grid hover:bg-canvas-subtle text-text-secondary hover:text-text-primary'
              }`}
              title="Toggle Klaxon Emergency Sound (Audio ON/OFF)"
            >
              <span className={`material-symbols-outlined text-[18px] ${isSirenActive ? 'text-white' : 'text-alert-warning'}`}>
                {isSirenActive ? 'volume_up' : 'volume_up'}
              </span>
              <span className="hidden xl:inline font-label-code text-label-code font-semibold">
                {isSirenActive ? 'SIREN ACTIVE' : 'HAZARD SIREN'}
              </span>
            </button>

            {/* Emergency Broadcast Button */}
            <button
              onClick={onBroadcastClick}
              className="flex items-center gap-xxs px-sm py-xxs rounded bg-alert-critical hover:bg-red-700 text-white shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              <span className="hidden md:inline font-headline-md text-body-sm font-semibold uppercase tracking-wider">
                BROADCAST
              </span>
            </button>

            {/* User Profile Emblem */}
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-medium shadow-xs">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>

        {/* Sub-Bar: Nav Tabs & Geospatial Coordinate Readout */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-xxs overflow-x-auto py-0.5">
            {navItems.map((item) => {
              const isActive = activePath === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-xs py-xxs font-body-sm transition-colors whitespace-nowrap rounded ${
                    isActive
                      ? 'text-primary bg-sky-50 font-semibold border-b-2 border-primary'
                      : 'text-text-muted hover:text-text-primary hover:bg-canvas-subtle'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-xs text-text-muted font-label-code text-label-code">
            <span>GRID: 28.6139° N, 77.2090° E</span>
          </div>
        </div>
      </div>
    </header>
  );
}
