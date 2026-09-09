import React from 'react';
import { useHazardAlerts } from '../../context/HazardAlertContext';
import { useIstClock } from '../../utils/istTime';

export default function CollapsibleSidebar({
  activePath,
  onNavigate,
  onBroadcastClick,
  isCollapsed,
  onToggleCollapse,
}) {
  const istTime = useIstClock();
  const { bandwidthLoad, isroGaganSync, activeHazardsCount, criticalCount } = useHazardAlerts();

  const navItems = [
    {
      id: 'live-command-center',
      label: 'Incident Overview',
      sublabel: 'National Surveillance',
      icon: 'map',
    },
    {
      id: 'simulation-map',
      label: 'Simulation Map',
      sublabel: 'Geospatial Sandbox',
      icon: 'crisis_alert',
      aliases: ['disaster-scenario-simulation'],
    },
    {
      id: 'simulation-profiles',
      label: 'Test Injections',
      sublabel: 'Scenario Catalog',
      icon: 'biotech',
    },
    {
      id: 'station-telemetry',
      label: 'Station Cockpit',
      sublabel: 'Live Sensor Dials',
      icon: 'sensors',
      aliases: ['node-telemetry-and-inspection'],
    },
    {
      id: 'fleet-diagnostics',
      label: 'Fleet Diagnostics',
      sublabel: 'Hardware & Audit',
      icon: 'developer_board',
    },
    {
      id: 'regional-risk-matrix',
      label: 'Regional Risk Matrix',
      sublabel: 'Vulnerability Index',
      icon: 'heat_pump',
    },
    {
      id: 'early-warning-feed',
      label: 'CAP Dispatch Log',
      sublabel: 'Citizen Broadcast',
      icon: 'notification_important',
    },
    {
      id: 'network-health-and-mesh',
      label: 'Gateway & Mesh',
      sublabel: 'Edge Gateway Telemetry',
      icon: 'hub',
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-50 bg-surface border-r border-subtle flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* 1. Brand Logo & Header */}
      <div>
        <div className="h-12 px-3 border-b border-subtle flex items-center justify-between">
          {!isCollapsed && (
            <div
              className="flex items-center gap-2 cursor-pointer overflow-hidden select-none"
              onClick={() => onNavigate('live-command-center')}
              title="Return to National Incident Overview"
            >
              <img
                src="/team_logo_transparent.png"
                alt="AAPDA-KADABRA Emblem"
                className="h-7 w-7 object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-primary tracking-tight truncate">
                  AAPDA-KADABRA
                </span>
                <span className="font-mono text-2xs text-muted tracking-wider truncate">
                  National Early Warning
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div
              className="mx-auto cursor-pointer"
              onClick={() => onNavigate('live-command-center')}
              title="AAPDA-KADABRA"
            >
              <img
                src="/team_logo_transparent.png"
                alt="AAPDA-KADABRA"
                className="h-7 w-7 object-contain"
              />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className={`p-1 rounded text-muted hover:text-primary hover:bg-surface-alt transition-colors cursor-pointer ${
              isCollapsed ? 'hidden' : 'inline-flex'
            }`}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <span className="material-symbols-outlined text-[16px]">keyboard_double_arrow_left</span>
          </button>
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <div className="py-2 flex justify-center border-b border-subtle">
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-muted hover:text-primary hover:bg-surface-alt transition-colors cursor-pointer"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <span className="material-symbols-outlined text-[16px]">keyboard_double_arrow_right</span>
            </button>
          </div>
        )}

        {/* Fleet Network Status Strip */}
        {!isCollapsed && (
          <div className="mx-2.5 my-2 p-2 rounded bg-surface-alt border border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-status-nominal shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs text-primary font-medium truncate">
                  Sensor Mesh Online
                </span>
                <span className="font-mono text-2xs text-muted truncate">
                  RRU Hardware Node • USB Live
                </span>
              </div>
            </div>
            {activeHazardsCount > 0 && (
              <span
                className={`font-mono text-2xs font-semibold px-1.5 py-0.5 rounded border shrink-0 ${
                  criticalCount > 0
                    ? 'bg-status-critical/10 text-status-critical border-status-critical/20'
                    : 'bg-status-warning/10 text-status-warning border-status-warning/20'
                }`}
              >
                {activeHazardsCount} Active
              </span>
            )}
          </div>
        )}

        {/* 2. Stacked Navigation Items */}
        <nav className="p-2 space-y-0.5" role="tablist">
          {navItems.map((item) => {
            const isActive = activePath === item.id || (item.aliases && item.aliases.includes(activePath));
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors text-left cursor-pointer group ${
                  isActive
                    ? 'bg-surface-alt text-accent font-medium border-l-2 border-accent'
                    : 'text-muted hover:text-primary hover:bg-surface-alt/70 border-l-2 border-transparent'
                } ${isCollapsed ? 'justify-center px-1' : ''}`}
                title={item.label}
              >
                <span
                  className={`material-symbols-outlined text-[18px] shrink-0 transition-colors ${
                    isActive ? 'text-accent' : 'text-muted group-hover:text-primary'
                  }`}
                >
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <div className="flex flex-col min-w-0 leading-tight">
                    <span className="text-xs font-medium tracking-tight truncate">
                      {item.label}
                    </span>
                    <span className="font-mono text-2xs text-muted truncate">
                      {item.sublabel}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Bottom Operational Status */}
      <div className="p-2.5 border-t border-subtle space-y-2">
        {!isCollapsed ? (
          <div className="p-2 rounded bg-surface-alt border border-subtle text-2xs font-mono text-muted space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-muted">schedule</span>
                IST
              </span>
              <span className="text-primary font-medium">{istTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ISRO GAGAN</span>
              <span className="text-status-nominal flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-nominal" />
                Locked
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Throughput</span>
              <span className="text-primary font-medium">156.2 MB/s</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-status-nominal py-1" title={istTime}>
            <span className="material-symbols-outlined text-[16px]">
              wifi_tethering
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
