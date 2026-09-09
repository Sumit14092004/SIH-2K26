import React, { useState, useMemo } from 'react';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function RegionalRiskMatrix({ onInspectNode }) {
  const [sortBy, setSortBy] = useState('score-desc');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const {
    allNodesList,
    getNodeSeverity,
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
    selectedHazard,
    setSelectedHazard,
    clearFilters,
    isFilterActive,
  } = useHazardAlerts();

  // Combine live node attributes with dynamically evaluated severity assessments
  const liveRegions = useMemo(() => {
    return allNodesList.map((r) => {
      const assessment = getNodeSeverity(r);
      return {
        ...r,
        liveTier: assessment.activeTier,
        liveRiskScore: assessment.riskScore,
        liveMetric: r.keyMetric || assessment.readingValue,
        liveDiagnostic: assessment.metricDiagnostic,
      };
    });
  }, [allNodesList, getNodeSeverity]);

  // Filter and sort regions
  const filteredRegions = useMemo(() => {
    return liveRegions
      .filter((r) => {
        const q = (searchQuery || '').trim().toLowerCase();
        const matchesSearch =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          (r.displayId && r.displayId.toLowerCase().includes(q)) ||
          r.hazard.toLowerCase().includes(q);

        const matchesState =
          !selectedState ||
          selectedState === 'ALL' ||
          (r.state && r.state.toLowerCase().includes(selectedState.toLowerCase())) ||
          (r.location && r.location.toLowerCase().includes(selectedState.toLowerCase()));

        const matchesHazard =
          !selectedHazard ||
          selectedHazard === 'ALL' ||
          r.hazardType === selectedHazard;

        return matchesSearch && matchesState && matchesHazard;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return b.liveRiskScore - a.liveRiskScore;
        if (sortBy === 'score-asc') return a.liveRiskScore - b.liveRiskScore;
        if (sortBy === 'pop-desc') return parseFloat(b.populationAtRisk || 0) - parseFloat(a.populationAtRisk || 0);
        if (sortBy === 'alpha') return a.location.localeCompare(b.location);
        return 0;
      });
  }, [liveRegions, searchQuery, selectedState, selectedHazard, sortBy]);

  const handleExportMatrix = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setIsExportModalOpen(false);
        setExportComplete(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-xl space-y-md">
      {/* 1. Top Global Grid HUD Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-md py-sm bg-surface-card rounded-xl px-md border border-border-grid shadow-xs">
        <div className="flex flex-col gap-xxs">
          <div className="flex items-center gap-xs">
            <span className="px-xs py-xxs rounded-full bg-status-nominal-subtle border border-status-nominal/30 text-status-nominal font-label-code text-label-code flex items-center gap-xxs font-semibold">
              <span className="w-2 h-2 rounded-full bg-status-nominal animate-pulse" />
              SYNCHRONIZED NATIONAL MATRIX
            </span>
            <span className="font-label-code text-label-code text-primary bg-primary-fixed/30 border border-primary/20 px-xs py-xxs rounded font-medium">
              Multi-Hazard Vulnerability Index (MHVI)
            </span>
          </div>
          <div className="flex items-baseline gap-xs mt-xxs">
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              Regional Risk &amp; Vulnerability Matrix
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-sm">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-primary hover:bg-primary-container text-white font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg flex items-center gap-xs shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span className="font-label-code text-label-code uppercase tracking-wider">Export Matrix</span>
          </button>
        </div>
      </div>

      {/* 2. Controls & Search Toolbar */}
      <div className="bg-surface-card border border-border-grid shadow-xs rounded-xl px-md py-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-md">
        <div className="flex flex-wrap items-center gap-sm flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-xs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary w-full sm:w-80 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-[18px] text-primary">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search region, state, or hazard..."
              className="bg-transparent text-text-primary font-body-sm text-body-sm placeholder:text-text-muted focus:outline-none w-full"
            />
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-xxs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary">
            <span className="font-label-code text-label-code text-text-muted font-semibold">STATE:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent font-body-sm text-body-sm text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All India Coverage</option>
              <option value="Assam">Assam Basin</option>
              <option value="Delhi">Delhi NCT / NCR</option>
              <option value="Uttarakhand">Uttarakhand Spine</option>
              <option value="Bihar">Bihar Floodplain</option>
              <option value="Odisha">Odisha Coastal Rim</option>
              <option value="Kerala">Kerala Western Ghats</option>
              <option value="Maharashtra">Maharashtra / Mumbai</option>
              <option value="West Bengal">West Bengal Delta</option>
              <option value="Telangana">Telangana / Deccan</option>
              <option value="Ladakh">Ladakh / Karakoram</option>
              <option value="Tamil Nadu">Tamil Nadu / Tidal Rim</option>
            </select>
          </div>

          {/* Hazard Filter */}
          <div className="flex items-center gap-xxs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary">
            <span className="font-label-code text-label-code text-text-muted font-semibold">HAZARD:</span>
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="bg-transparent font-body-sm text-body-sm text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All Hazard Vectors</option>
              <option value="FLOOD">Hydrological (Flood / Inundation)</option>
              <option value="AQI">Atmospheric (Severe Smog)</option>
              <option value="SEISMIC">Geotechnical (Landslide)</option>
              <option value="FIRE">Thermal (Wildfire)</option>
              <option value="CYCLONE">Coastal Cyclone</option>
            </select>
          </div>

          {/* Reset Filters Chip */}
          {isFilterActive && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-alert-critical border border-border-grid hover:border-alert-critical/40 bg-surface-card px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Clear active filters"
            >
              <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
              <span className="font-label-code uppercase tracking-wider font-semibold">Clear</span>
            </button>
          )}

          {/* Sort Control */}
          <div className="flex items-center gap-xxs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary">
            <span className="font-label-code text-label-code text-text-muted font-semibold">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-body-sm text-body-sm text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="score-desc">Risk Index: Highest First</option>
              <option value="score-asc">Risk Index: Lowest First</option>
              <option value="pop-desc">Population at Risk: Largest</option>
              <option value="alpha">Location Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-xs font-label-code text-label-code text-text-muted ml-auto shrink-0">
          <span>SHOWING</span>
          <span className="font-bold text-text-primary">{filteredRegions.length}</span>
          <span>OF {liveRegions.length} MONITORED SECTORS</span>
        </div>
      </div>

      {/* 3. National Risk Matrix Table Card */}
      <div className="w-full bg-surface-card border border-border-grid rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-border-grid font-label-code text-label-code text-text-muted uppercase tracking-wider">
                <th className="py-sm px-md font-semibold">Location / Basin</th>
                <th className="py-sm px-md font-semibold">Node Code</th>
                <th className="py-sm px-md font-semibold">Active Hazard</th>
                <th className="py-sm px-md font-semibold">Live Metric</th>
                <th className="py-sm px-md font-semibold">Severity Status</th>
                <th className="py-sm px-md font-semibold">Risk Score</th>
                <th className="py-sm px-md font-semibold">Pop. at Risk</th>
                <th className="py-sm px-md font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-grid font-body-sm text-body-sm">
              {filteredRegions.map((region) => {
                const tier = region.liveTier;
                const isCritical = tier === 'critical';
                const isAbnormal = tier === 'abnormal';
                const isWarning = tier === 'warning';
                const isOffline = tier === 'offline';

                return (
                  <tr
                    key={region.id}
                    className="hover:bg-canvas-subtle transition-colors group"
                  >
                    {/* Location */}
                    <td className="py-sm px-md">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary group-hover:text-primary transition-colors">
                          {region.location}
                        </span>
                        <span className="text-text-muted font-label-code text-[11px]">
                          {region.state} // {region.regionCluster}
                        </span>
                      </div>
                    </td>

                    {/* Node Code */}
                    <td className="py-sm px-md">
                      <span className="font-mono text-label-code text-primary font-bold bg-primary-fixed/30 border border-primary/20 px-xs py-0.5 rounded">
                        {region.displayId || region.id}
                      </span>
                    </td>

                    {/* Active Hazard */}
                    <td className="py-sm px-md font-medium text-text-secondary">
                      {region.hazard}
                    </td>

                    {/* Key Metric */}
                    <td className="py-sm px-md">
                      <span className="font-mono font-semibold text-text-primary text-[12px]">
                        {region.liveMetric}
                      </span>
                    </td>

                    {/* Severity Badge (5-Tier Dynamic) */}
                    <td className="py-sm px-md">
                      <span
                        className={`inline-flex items-center gap-1 px-xs py-0.5 rounded-full font-label-code text-label-code font-bold uppercase border ${
                          isCritical
                            ? 'bg-alert-critical-subtle text-alert-critical border-alert-critical/30'
                            : isAbnormal
                            ? 'bg-orange-50 text-orange-700 border-orange-300'
                            : isWarning
                            ? 'bg-alert-warning-subtle text-alert-warning border-alert-warning/30'
                            : isOffline
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-status-nominal-subtle text-status-nominal border-status-nominal/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCritical
                              ? 'bg-alert-critical animate-pulse'
                              : isAbnormal
                              ? 'bg-orange-500'
                              : isWarning
                              ? 'bg-alert-warning'
                              : isOffline
                              ? 'bg-slate-400'
                              : 'bg-status-nominal'
                          }`}
                        />
                        {tier.toUpperCase()}
                      </span>
                    </td>

                    {/* Risk Score & Progress Bar */}
                    <td className="py-sm px-md">
                      <div className="flex flex-col gap-xxs min-w-[120px]">
                        <div className="flex justify-between items-center font-label-code text-label-code">
                          <span className="font-bold text-text-primary">{region.liveRiskScore}</span>
                          <span className="text-text-muted">/ 100</span>
                        </div>
                        <div className="w-full bg-border-grid h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCritical
                                ? 'bg-alert-critical'
                                : isAbnormal
                                ? 'bg-orange-500'
                                : isWarning
                                ? 'bg-alert-warning'
                                : isOffline
                                ? 'bg-slate-400'
                                : 'bg-status-nominal'
                            }`}
                            style={{ width: `${region.liveRiskScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Population */}
                    <td className="py-sm px-md font-mono text-text-secondary">
                      {region.populationAtRisk || '—'}
                    </td>

                    {/* Actions */}
                    <td className="py-sm px-md text-right">
                      <button
                        onClick={() => onInspectNode && onInspectNode(region.id)}
                        className="text-primary hover:text-primary-container font-semibold text-[12px] flex items-center gap-0.5 ml-auto transition-colors cursor-pointer"
                      >
                        <span>Inspect</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Export Modal Simulation */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-md">
          <div className="bg-surface-card border border-border-grid w-full max-w-md rounded-xl p-lg flex flex-col gap-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-xs border-b border-border-grid">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary">download</span>
                <h3 className="font-headline-md text-headline-md text-text-primary font-bold">
                  Export Vulnerability Matrix
                </h3>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-text-secondary">
              Export standard ISO/NDMA vulnerability matrix report with real-time sensor metrics and multi-hazard risk scores.
            </p>

            <div className="flex flex-col gap-xxs font-label-code text-label-code bg-canvas-subtle p-sm rounded border border-border-grid">
              <div>FORMAT: NDMA-CAP-COMPLIANT JSON / CSV</div>
              <div>ENTRIES: {filteredRegions.length} CANONICAL STATIONS</div>
              <div>SECURITY: AES-256 GAGAN ENCRYPTED</div>
            </div>

            <div className="flex justify-end gap-xs pt-xs border-t border-border-grid">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-sm py-xs rounded text-text-secondary hover:bg-canvas-subtle font-label-code text-label-code font-semibold"
              >
                CANCEL
              </button>
              <button
                onClick={handleExportMatrix}
                disabled={exporting || exportComplete}
                className="bg-primary hover:bg-primary-container text-white px-md py-xs rounded font-label-code text-label-code font-bold flex items-center gap-xs shadow-xs"
              >
                {exporting ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                    <span>GENERATING...</span>
                  </>
                ) : exportComplete ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>DOWNLOAD READY</span>
                  </>
                ) : (
                  <span>CONFIRM EXPORT</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
