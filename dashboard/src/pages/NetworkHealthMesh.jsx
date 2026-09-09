import React, { useState } from 'react';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function NetworkHealthMesh({ onInspectNode }) {
  const [activeSegment, setActiveSegment] = useState('gateways'); // 'gateways' | 'nodes'
  const [selectedNodeFilter, setSelectedNodeFilter] = useState('ALL');
  const [expandedNodeId, setExpandedNodeId] = useState(null);

  const { allNodesList, getNodeSeverity } = useHazardAlerts();

  const dynamicNodes = allNodesList.map((n) => {
    const assessment = getNodeSeverity(n);
    return {
      ...n,
      severity: assessment.activeTier,
      keyMetric: n.keyMetric || assessment.readingValue,
    };
  });

  const filteredNodes = dynamicNodes.filter((n) => {
    if (selectedNodeFilter === 'ALL') return true;
    return n.severity.toLowerCase() === selectedNodeFilter.toLowerCase();
  });

  const gateways = [
    {
      id: 'GW-DELHI-01',
      sector: 'Indo-Gangetic Basin Hub',
      backhaul: 'Optical Fiber + Dual 4G',
      status: 'ONLINE',
      latency: '18ms',
      nodesCount: 58,
      location: 'New Delhi, NCR',
      packetSuccess: '99.99%',
    },
    {
      id: 'GW-GUW-RIVER',
      sector: 'Assam Brahmaputra Valley',
      backhaul: 'ISRO GAGAN + 5G RedCap',
      status: 'ONLINE',
      latency: '28ms',
      nodesCount: 34,
      location: 'Guwahati, Assam',
      packetSuccess: '99.95%',
    },
    {
      id: 'GW-UK-SPINE',
      sector: 'Uttarakhand Himalayan Ridge',
      backhaul: 'Satellite INSAT-MSS + LoRa',
      status: 'ONLINE',
      latency: '45ms',
      nodesCount: 22,
      location: 'Dehradun, Uttarakhand',
      packetSuccess: '99.90%',
    },
    {
      id: 'GW-HYD-DECCAN',
      sector: 'Telangana Deccan Core',
      backhaul: 'Gigabit Fiber Backbone',
      status: 'ONLINE',
      latency: '8ms',
      nodesCount: 38,
      location: 'Hyderabad, Telangana',
      packetSuccess: '100.0%',
    },
    {
      id: 'GW-OD-COAST',
      sector: 'Bay of Bengal Coastal Sector',
      backhaul: 'Inmarsat Maritime Broadband',
      status: 'ONLINE',
      latency: '38ms',
      nodesCount: 16,
      location: 'Puri / Bhubaneswar',
      packetSuccess: '99.92%',
    },
  ];

  const toggleNodeExpand = (id) => {
    setExpandedNodeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Top HUD Strip with Segment Switcher */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">hub</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xs font-semibold text-primary">
              Edge Mesh Topology &amp; Sensor Network Health
            </h1>
            <span className="font-mono text-[10px] text-status-nominal bg-status-nominal/10 border border-status-nominal/30 px-1.5 py-0.2 rounded">
              100% Mesh Health
            </span>
          </div>
        </div>

        {/* Segmented View Switcher */}
        <div className="flex items-center bg-surface-alt border border-subtle p-0.5 rounded text-xs">
          <button
            onClick={() => setActiveSegment('gateways')}
            className={`px-2.5 py-1 rounded text-2xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              activeSegment === 'gateways'
                ? 'bg-accent text-accent-contrast'
                : 'text-muted hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">cell_tower</span>
            <span>Gateway Backhauls (5)</span>
          </button>
          <button
            onClick={() => setActiveSegment('nodes')}
            className={`px-2.5 py-1 rounded text-2xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              activeSegment === 'nodes'
                ? 'bg-accent text-accent-contrast'
                : 'text-muted hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">router</span>
            <span>Node Link Quality ({filteredNodes.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0 text-xs font-mono">
        <div className="bg-surface border border-subtle px-3 py-1.5 rounded-md flex items-center justify-between">
          <span className="text-muted text-[10.5px]">PACKET DELIVERY</span>
          <span className="text-status-nominal font-semibold">99.98%</span>
        </div>
        <div className="bg-surface border border-subtle px-3 py-1.5 rounded-md flex items-center justify-between">
          <span className="text-muted text-[10.5px]">MEAN LATENCY</span>
          <span className="text-primary font-semibold">28.4 ms</span>
        </div>
        <div className="bg-surface border border-subtle px-3 py-1.5 rounded-md flex items-center justify-between">
          <span className="text-muted text-[10.5px]">ACTIVE GATEWAYS</span>
          <span className="text-status-nominal font-semibold">5 / 5 UP</span>
        </div>
        <div className="bg-surface border border-subtle px-3 py-1.5 rounded-md flex items-center justify-between">
          <span className="text-muted text-[10.5px]">PHYSICAL MASTER</span>
          <span className="text-primary font-semibold truncate">ESP32-S3 GAGAN</span>
        </div>
      </div>

      {/* 3. Segment Content: Gateway Backhauls View */}
      {activeSegment === 'gateways' && (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {gateways.map((gw) => (
              <div
                key={gw.id}
                className="bg-surface border border-subtle rounded-md p-3 flex flex-col justify-between gap-2 hover:border-strong transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-primary">{gw.id}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-status-nominal bg-status-nominal/10 border border-status-nominal/20 px-1.5 py-0.2 rounded font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-nominal" />
                      {gw.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-xs text-primary leading-tight">{gw.sector}</h4>
                  <span className="text-2xs text-muted block mt-0.5">{gw.location} &middot; {gw.backhaul}</span>
                </div>

                <div className="pt-2 border-t border-subtle grid grid-cols-3 gap-1 text-2xs font-mono text-center">
                  <div className="bg-surface-alt p-1 rounded">
                    <span className="text-muted block text-[9.5px]">NODES</span>
                    <span className="font-semibold text-primary">{gw.nodesCount}</span>
                  </div>
                  <div className="bg-surface-alt p-1 rounded">
                    <span className="text-muted block text-[9.5px]">LATENCY</span>
                    <span className="font-semibold text-secondary">{gw.latency}</span>
                  </div>
                  <div className="bg-surface-alt p-1 rounded">
                    <span className="text-muted block text-[9.5px]">DELIVERY</span>
                    <span className="font-semibold text-status-nominal">{gw.packetSuccess}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Segment Content: Node Link Quality View */}
      {activeSegment === 'nodes' && (
        <div className="w-full flex-1 min-h-0 bg-surface border border-subtle rounded-md overflow-hidden flex flex-col">
          {/* Filter Bar */}
          <div className="px-3 py-1.5 border-b border-subtle flex flex-wrap items-center justify-between gap-2 shrink-0 bg-surface-alt/40">
            <span className="text-xs font-semibold text-primary">
              Canonical Station Link Diagnostics
            </span>
            <div className="flex items-center gap-1 text-2xs font-mono">
              <span className="text-muted font-medium">TIER:</span>
              <div className="flex items-center bg-surface border border-subtle p-0.5 rounded gap-0.5">
                {['ALL', 'CRITICAL', 'WARNING', 'NOMINAL'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedNodeFilter(tier)}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      selectedNodeFilter === tier
                        ? 'bg-accent text-accent-contrast font-medium'
                        : 'text-muted hover:text-primary'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Internal Scrollable Table */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10">
                <tr className="bg-surface-alt border-b border-subtle font-mono text-[10.5px] text-muted uppercase tracking-wider">
                  <th className="py-2 px-3 font-medium">Node Code</th>
                  <th className="py-2 px-3 font-medium">Location Sector</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                  <th className="py-2 px-3 font-medium">Backhaul</th>
                  <th className="py-2 px-3 font-medium">RSSI</th>
                  <th className="py-2 px-3 font-medium">Battery</th>
                  <th className="py-2 px-3 font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {filteredNodes.map((node) => {
                  const isCrit = node.severity === 'critical';
                  const isWarn = node.severity === 'warning' || node.severity === 'abnormal';
                  const isExpanded = expandedNodeId === node.id;

                  return (
                    <React.Fragment key={node.id}>
                      <tr
                        onClick={() => toggleNodeExpand(node.id)}
                        className={`hover:bg-surface-alt/60 transition-colors cursor-pointer select-none ${
                          isExpanded ? 'bg-surface-alt/40 border-l-2 border-accent' : ''
                        }`}
                      >
                        <td className="py-2 px-3 font-mono font-medium text-secondary">
                          <span className="bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                            {node.displayId}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-medium text-primary truncate max-w-[140px]">
                          {node.location}
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full font-mono text-[10px] font-medium uppercase border ${
                              isCrit
                                ? 'bg-status-critical/10 text-status-critical border-status-critical/20'
                                : isWarn
                                ? 'bg-status-warning/10 text-status-warning border-status-warning/20'
                                : 'bg-status-nominal/10 text-status-nominal border-status-nominal/20'
                            }`}
                          >
                            {node.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-muted">
                          {node.network.backhaul}
                        </td>
                        <td className="py-2 px-3 font-mono text-primary text-xs">
                          {node.network.rssi}
                        </td>
                        <td className="py-2 px-3 font-mono text-xs">
                          <span className="font-medium text-primary">{node.power.batteryPct}%</span>
                          <span className="text-muted ml-1 text-[10px]">({node.power.voltage})</span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNodeExpand(node.id);
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

                      {isExpanded && (
                        <tr className="bg-surface-alt/30 border-b border-subtle">
                          <td colSpan={7} className="px-4 py-2.5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-2xs font-mono">
                              <div className="bg-surface border border-subtle p-2 rounded">
                                <span className="text-muted block text-[10px]">PACKET DELIVERY SUCCESS</span>
                                <span className="text-status-nominal font-semibold text-xs mt-0.5 block">
                                  {node.network.packetDelivery}
                                </span>
                                <span className="text-muted mt-1 block">Latency: {node.network.latency}</span>
                              </div>
                              <div className="bg-surface border border-subtle p-2 rounded">
                                <span className="text-muted block text-[10px]">SOLAR HARVESTING</span>
                                <span className="text-primary font-semibold text-xs mt-0.5 block">
                                  {node.power.solarInput}
                                </span>
                                <span className="text-muted mt-1 block">Float status: Optimal</span>
                              </div>
                              <div className="bg-surface border border-subtle p-2 rounded flex items-center justify-between">
                                <div>
                                  <span className="text-muted block text-[10px]">DEEP INSPECT</span>
                                  <span className="text-secondary text-[11px]">Full telemetry stream</span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onInspectNode && onInspectNode(node.id);
                                  }}
                                  className="px-2 py-1 text-2xs rounded border border-subtle bg-surface-alt hover:bg-subtle text-primary transition-colors cursor-pointer"
                                >
                                  Inspect Station
                                </button>
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
      )}
    </div>
  );
}
