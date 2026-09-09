import React from 'react';
import { useHazardAlerts } from '../../context/HazardAlertContext';

export default function SideNav({ activePath, onNavigate }) {
  const { bandwidthLoad, isroGaganSync } = useHazardAlerts();

  const menuItems = [
    { id: 'live-command-center', label: 'Tactical Map Surface', icon: 'map' },
    { id: 'disaster-scenario-simulation', label: 'Disaster Simulation', icon: 'crisis_alert' },
    { id: 'node-telemetry-and-inspection', label: 'Atmospheric Sensors', icon: 'sensors' },
    { id: 'regional-risk-matrix', label: 'Hazard Heatmaps', icon: 'heat_pump' },
    { id: 'early-warning-feed', label: 'Crisis Dispatch Log', icon: 'notification_important' },
    { id: 'network-health-and-mesh', label: 'Edge Gateway Status', icon: 'hub' },
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-sidebar-width bg-surface-card border-r border-border-grid z-40 hidden xl:flex flex-col justify-between p-sm overflow-y-auto">
      <div className="space-y-md">
        {/* Core Directory Header */}
        <div className="flex items-center justify-between pb-xs border-b border-border-grid">
          <span className="font-metric-label text-metric-label text-text-muted uppercase tracking-widest">
            CORE DIRECTORY
          </span>
          <span className="font-label-code text-label-code text-telemetry-cobalt font-semibold">
            ACTIVE MESH
          </span>
        </div>

        {/* Directory Navigation Links */}
        <nav className="space-y-xxs">
          {menuItems.map((item) => {
            const isActive = activePath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-xs py-xs rounded transition-all text-left ${
                  isActive
                    ? 'bg-sky-50 text-primary font-semibold border-l-2 border-primary'
                    : 'text-text-secondary hover:bg-canvas-subtle hover:text-text-primary'
                }`}
              >
                <span className="font-body-sm text-body-sm">{item.label}</span>
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Live Network Telemetry Status Card */}
      <div className="p-xs rounded bg-canvas-subtle border border-border-grid space-y-xxs">
        <div className="flex items-center justify-between">
          <span className="font-label-code text-label-code text-text-secondary">BANDWIDTH LOAD</span>
          <span className={`font-label-code text-label-code ${bandwidthLoad?.tone || 'text-status-nominal'} font-bold transition-colors`}>
            {bandwidthLoad?.formatted || '142.4 MB/S'}
          </span>
        </div>
        <div className="w-full bg-border-grid h-1.5 rounded overflow-hidden">
          <div
            className="bg-telemetry-cobalt h-full transition-all duration-700 ease-out"
            style={{ width: `${bandwidthLoad?.percentage || 65}%` }}
          />
        </div>
        <div className="flex justify-between items-center font-label-code text-label-code text-text-muted">
          <span title="ISRO GAGAN Satellite Augmented Constellation">ISRO GAGAN SYNC</span>
          <span
            className={`${isroGaganSync?.tone || 'text-status-nominal'} font-semibold flex items-center gap-1`}
            title={isroGaganSync?.subtext}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isroGaganSync?.dotTone || 'bg-status-nominal'} animate-pulse-subtle`} />
            {isroGaganSync?.label || 'NOMINAL'}
          </span>
        </div>
      </div>
    </aside>
  );
}
