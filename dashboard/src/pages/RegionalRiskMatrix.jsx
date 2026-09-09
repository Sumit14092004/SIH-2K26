import React, { useState, useMemo } from 'react';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function RegionalRiskMatrix({ onInspectNode }) {
  const [sortBy, setSortBy] = useState('score-desc');
  const [expandedRowId, setExpandedRowId] = useState(null);
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
    logNodeAudit,
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
          r.hazard.toLowerCase().includes(q) ||
          (r.pincode && String(r.pincode).includes(q));

        const matchesState =
          !selectedState ||
          selectedState === 'ALL' ||
          (r.state && r.state.toLowerCase().includes(selectedState.toLowerCase())) ||
          (r.location && r.location.toLowerCase().includes(selectedState.toLowerCase()));

        const matchesHazard =
          !selectedHazard ||
          selectedHazard === 'ALL' ||
          r.hazardType === selectedHazard ||
          (r.isMultiSensor &&
            r.readings &&
            r.readings.some(
              (sensor) =>
                sensor.hazard_type &&
                sensor.hazard_type.toLowerCase() === selectedHazard.toLowerCase()
            ));

        return matchesSearch && matchesState && matchesHazard;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return b.liveRiskScore - a.liveRiskScore;
        if (sortBy === 'score-asc') return a.liveRiskScore - b.liveRiskScore;
        if (sortBy === 'pop-desc')
          return parseFloat(b.populationAtRisk || 0) - parseFloat(a.populationAtRisk || 0);
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

  const toggleRow = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Compact HUD Header Strip */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">heat_pump</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xs font-semibold text-primary">
              Regional Risk &amp; Vulnerability Matrix
            </h1>
            <span className="font-mono text-[10px] text-muted bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
              Multi-Hazard Vulnerability Index (MHVI)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-accent hover:bg-accent-hover text-accent-contrast text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">file_download</span>
            <span className="font-mono text-2xs uppercase">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Filter Toolbar */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-1.5 bg-surface-alt border border-subtle px-2 py-0.5 rounded text-secondary w-full sm:w-64 focus-within:border-accent transition-colors">
            <span className="material-symbols-outlined text-[15px] text-muted">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search basin, state, or hazard..."
              className="bg-transparent text-primary text-xs placeholder:text-muted focus:outline-none w-full"
            />
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-0.5 rounded text-secondary">
            <span className="text-[10px] text-muted font-medium uppercase">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
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
          <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-0.5 rounded text-secondary">
            <span className="text-[10px] text-muted font-medium uppercase">Hazard:</span>
            <select
              value={selectedHazard}
              onChange={(e) => setSelectedHazard(e.target.value)}
              className="bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All Hazards</option>
              <option value="FLOOD">Hydrological (Flood)</option>
              <option value="AQI">Atmospheric (Smog)</option>
              <option value="SEISMIC">Geotechnical (Landslide)</option>
              <option value="FIRE">Thermal (Wildfire)</option>
              <option value="CYCLONE">Coastal Cyclone</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFilterActive && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-status-critical border border-subtle bg-surface px-2 py-0.5 rounded transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">filter_alt_off</span>
              <span>Clear</span>
            </button>
          )}

          {/* Sort Control */}
          <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-0.5 rounded text-secondary">
            <span className="text-[10px] text-muted font-medium uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="score-desc">Risk: High to Low</option>
              <option value="score-asc">Risk: Low to High</option>
              <option value="pop-desc">Population: Highest</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-[10.5px] text-muted shrink-0">
          <span>SHOWING</span>
          <span className="font-semibold text-primary">{filteredRegions.length}</span>
          <span>OF {liveRegions.length} SECTORS</span>
        </div>
      </div>

      {/* 3. Screen-Fit Table Card (Internal Container Scroll Only, Zero Page Scroll) */}
      <div className="w-full flex-1 min-h-0 bg-surface border border-subtle rounded-md overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-surface-alt border-b border-subtle font-mono text-[10.5px] text-muted uppercase tracking-wider">
                <th className="py-2 px-3 font-medium">Location / Basin</th>
                <th className="py-2 px-3 font-medium">Node Code</th>
                <th className="py-2 px-3 font-medium">Active Hazard</th>
                <th className="py-2 px-3 font-medium">Live Metric</th>
                <th className="py-2 px-3 font-medium">Severity</th>
                <th className="py-2 px-3 font-medium">Risk Score</th>
                <th className="py-2 px-3 font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle text-xs">
              {filteredRegions.map((region) => {
                const tier = region.liveTier;
                const isCritical = tier === 'critical';
                const isAbnormal = tier === 'abnormal';
                const isWarning = tier === 'warning';
                const isOffline = tier === 'offline';
                const isExpanded = expandedRowId === region.id;

                return (
                  <React.Fragment key={region.id}>
                    <tr
                      onClick={() => toggleRow(region.id)}
                      className={`hover:bg-surface-alt/60 transition-colors cursor-pointer select-none ${
                        isExpanded ? 'bg-surface-alt/40 border-l-2 border-accent' : ''
                      }`}
                    >
                      {/* Location */}
                      <td className="py-2 px-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-primary">{region.location}</span>
                          <span className="text-muted font-mono text-[10px]">
                            {region.state} &middot; {region.regionCluster}
                          </span>
                        </div>
                      </td>

                      {/* Node Code */}
                      <td className="py-2 px-3 whitespace-nowrap">
                        <span className="font-mono text-[10.5px] text-secondary bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                          {region.displayId || region.id}
                        </span>
                      </td>

                      {/* Hazard */}
                      <td className="py-2 px-3 text-secondary font-medium">
                        {region.hazard}
                      </td>

                      {/* Live Metric */}
                      <td className="py-2 px-3">
                        <span className="font-mono font-medium text-primary text-xs">
                          {region.liveMetric}
                        </span>
                      </td>

                      {/* Severity Badge */}
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full font-mono text-[10px] font-medium uppercase border ${
                            isCritical
                              ? 'bg-status-critical/10 text-status-critical border-status-critical/20'
                              : isAbnormal
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                              : isWarning
                              ? 'bg-status-warning/10 text-status-warning border-status-warning/20'
                              : isOffline
                              ? 'bg-surface-alt text-muted border-subtle'
                              : 'bg-status-nominal/10 text-status-nominal border-status-nominal/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCritical
                                ? 'bg-status-critical'
                                : isAbnormal
                                ? 'bg-amber-500'
                                : isWarning
                                ? 'bg-status-warning'
                                : isOffline
                                ? 'bg-muted'
                                : 'bg-status-nominal'
                            }`}
                          />
                          {tier.toUpperCase()}
                        </span>
                      </td>

                      {/* Risk Score */}
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <span className="font-mono font-semibold text-primary text-xs w-6">
                            {region.liveRiskScore}
                          </span>
                          <div className="flex-1 bg-surface-alt border border-subtle h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCritical
                                  ? 'bg-status-critical'
                                  : isAbnormal
                                  ? 'bg-amber-500'
                                  : isWarning
                                  ? 'bg-status-warning'
                                  : isOffline
                                  ? 'bg-muted'
                                  : 'bg-status-nominal'
                              }`}
                              style={{ width: `${region.liveRiskScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Expand Chevron */}
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(region.id);
                          }}
                          className="p-1 rounded hover:bg-surface-alt text-muted hover:text-primary transition-transform cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-accent' : ''
                            }`}
                          >
                            expand_more
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Click-to-Expand Sub-Row Drawer */}
                    {isExpanded && (
                      <tr className="bg-surface-alt/30 border-b border-subtle">
                        <td colSpan={7} className="px-4 py-2.5">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div className="bg-surface border border-subtle p-2 rounded flex flex-col justify-between">
                              <span className="text-[10px] text-muted font-mono uppercase">
                                Diagnostic Finding &amp; Coordinates
                              </span>
                              <p className="text-2xs text-primary font-medium mt-0.5 leading-snug">
                                {region.liveDiagnostic || 'Telemetry within nominal threshold envelope.'}
                              </p>
                              <span className="text-[10px] text-muted font-mono mt-1">
                                {region.coordinates?.lat?.toFixed(4)}N, {region.coordinates?.lng?.toFixed(4)}E &middot; Elev: {region.elevation || 'MSL'}
                              </span>
                            </div>

                            <div className="bg-surface border border-subtle p-2 rounded flex flex-col justify-between">
                              <span className="text-[10px] text-muted font-mono uppercase">
                                Exposure &amp; Demographics
                              </span>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-sm font-semibold font-mono text-status-critical">
                                  {region.populationAtRisk || '—'}
                                </span>
                                <span className="text-2xs text-muted">Citizens in hazard zone</span>
                              </div>
                              <span className="text-[10px] text-muted font-mono mt-1">
                                Pincode Sector: {region.pincode || '—'} &middot; Cluster: {region.regionCluster}
                              </span>
                            </div>

                            <div className="bg-surface border border-subtle p-2 rounded flex flex-col justify-between">
                              <span className="text-[10px] text-muted font-mono uppercase">
                                Response Directive &amp; Actions
                              </span>
                              <p className="text-2xs text-secondary mt-0.5 line-clamp-1">
                                {region.directive || 'Continue routine sensor mesh polling.'}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onInspectNode && onInspectNode(region.id);
                                  }}
                                  className="px-2 py-0.5 text-2xs font-medium rounded border border-subtle bg-surface-alt hover:bg-subtle text-primary transition-colors cursor-pointer"
                                >
                                  Inspect Station
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    logNodeAudit(
                                      region.id,
                                      `NDRF Sector Dispatch mobilized for ${region.location} via Risk Matrix console.`,
                                      true,
                                      'FIELD_DISPATCH',
                                      'critical'
                                    );
                                  }}
                                  className="px-2 py-0.5 text-2xs font-medium rounded bg-accent hover:bg-accent-hover text-accent-contrast transition-colors cursor-pointer"
                                >
                                  Deploy NDRF Unit
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Export Modal Simulation */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface border border-subtle w-full max-w-md rounded-xl p-lg flex flex-col gap-md shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-xs border-b border-subtle">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary">download</span>
                <h3 className="text-sm font-semibold text-primary">Export Vulnerability Matrix</h3>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-muted hover:text-primary transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Generate a cryptographic NDMA-compliant CSV report with all {filteredRegions.length} monitored sectors, sensor readings, and evaluated risk scores.
            </p>
            <div className="flex items-center justify-end gap-sm pt-xs border-t border-subtle">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-3 py-1 text-xs border border-subtle rounded bg-surface hover:bg-surface-alt text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleExportMatrix}
                disabled={exporting}
                className="px-3 py-1 text-xs bg-accent text-accent-contrast rounded font-medium cursor-pointer"
              >
                {exporting ? 'Exporting...' : exportComplete ? 'Downloaded!' : 'Download CSV'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
