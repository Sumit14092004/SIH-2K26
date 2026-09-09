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
    <aside className="fixed left-0 top-12 bottom-0 w-sidebar-width bg-surface border-r border-subtle z-40 hidden xl:flex flex-col justify-between p-sm overflow-y-auto">
      <div className="space-y-md">
        {/* Core Directory Header */}
        <div className="flex items-center justify-between pb-xs border-b border-subtle">
          <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
            CORE DIRECTORY
          </span>
          <span className="font-mono text-[11px] text-secondary font-medium">
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
                className={`w-full flex items-center justify-between px-xs py-xs rounded transition-all text-left text-xs ${
                  isActive
                    ? 'bg-surface-alt text-primary font-medium border-l-2 border-accent'
                    : 'text-secondary hover:bg-surface-alt hover:text-primary'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Live Network Telemetry Status Card */}
      <div className="p-xs rounded bg-surface-alt border border-subtle space-y-xxs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-secondary">BANDWIDTH LOAD</span>
          <span className={`font-mono text-[11px] ${bandwidthLoad?.tone || 'text-status-nominal'} font-medium transition-colors`}>
            {bandwidthLoad?.formatted || '142.4 MB/S'}
          </span>
        </div>
        <div className="w-full bg-surface border border-subtle h-1.5 rounded overflow-hidden">
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
