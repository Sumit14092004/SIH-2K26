import React from 'react';
import { useHazardAlerts } from '../../context/HazardAlertContext';
import { useTheme } from '../../context/ThemeContext';

export default function TopHeader({
  activePath,
  onNavigate,
  onBroadcastClick,
  onInspectNode,
  isCollapsed,
}) {
  const {
    activeAlerts,
    isVisualFlashing,
    isSirenActive,
    toggleSirenMute,
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
  } = useHazardAlerts();

  const { isDark, toggleTheme } = useTheme();

  // Find most critical active alert
  const criticalHazard = activeAlerts.find((a) => a.severity === 'critical' && !a.isRemoving)
    || activeAlerts.find((a) => !a.isRemoving)
    || null;

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-12 bg-surface/95 backdrop-blur-sm border-b border-subtle transition-all duration-300 ${
        isCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      <div className="h-full w-full px-4 flex items-center justify-between gap-3">
        {/* Left: Jurisdiction Selector & Search Input */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Jurisdiction Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs">
            <span className="text-muted font-medium">
              Region:
            </span>
            <div className="relative inline-flex items-center">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-surface-alt text-primary font-medium text-xs pr-5 pl-2 py-1 rounded border border-subtle hover:border-strong focus:outline-none cursor-pointer transition-colors appearance-none font-sans"
              >
                <option value="ALL">All India Coverage</option>
                <option value="Assam">Assam Basin</option>
                <option value="Delhi">Delhi NCT / NCR</option>
                <option value="Uttarakhand">Uttarakhand Spine</option>
                <option value="Gujarat">Gujarat / West</option>
                <option value="Bihar">Bihar Floodplain</option>
                <option value="Odisha">Odisha Coastal Rim</option>
                <option value="Kerala">Kerala Western Ghats</option>
                <option value="Maharashtra">Maharashtra / Mumbai</option>
                <option value="West Bengal">West Bengal Delta</option>
                <option value="Ladakh">Ladakh / Karakoram</option>
                <option value="Tamil Nadu">Tamil Nadu / South</option>
              </select>
              <span className="material-symbols-outlined text-[14px] text-muted absolute right-1 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="hidden sm:flex items-center gap-1.5 bg-surface-alt border border-subtle px-2.5 py-1 rounded text-primary w-56 md:w-72 focus-within:border-accent transition-colors">
            <span className="material-symbols-outlined text-[15px] text-muted">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station, basin, or PIN..."
              className="bg-transparent text-primary text-xs placeholder:text-muted focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted hover:text-primary text-[11px]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Operational Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Active Hazard Banner */}
          {criticalHazard && (
            <button
              onClick={() => onInspectNode && onInspectNode(criticalHazard.id)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-status-critical/10 border border-status-critical/20 text-status-critical hover:opacity-90 transition-opacity cursor-pointer font-medium"
              title={`Inspect: ${criticalHazard.location} (#${criticalHazard.id})`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-status-critical" />
              <span className="truncate max-w-[180px]">
                {criticalHazard.location}: {criticalHazard.hazard}
              </span>
            </button>
          )}

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-1 rounded border border-subtle hover:bg-surface-alt text-muted hover:text-primary transition-colors text-xs font-medium cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="hidden md:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Siren Alert Toggle */}
          <button
            onClick={toggleSirenMute}
            className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
              isSirenActive
                ? 'bg-status-critical/10 border-status-critical/30 text-status-critical font-semibold'
                : 'bg-surface-alt border-subtle hover:border-strong text-muted hover:text-primary'
            }`}
            title="Toggle Audio Klaxon Siren"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isSirenActive ? 'volume_up' : 'volume_off'}
            </span>
            <span className="hidden xl:inline">
              {isSirenActive ? 'Audio Active' : 'Mute'}
            </span>
          </button>

          {/* Broadcast Link / CTA */}
          <button
            onClick={onBroadcastClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
            <span>CAP Alert</span>
          </button>
        </div>
      </div>
    </header>
  );
}
