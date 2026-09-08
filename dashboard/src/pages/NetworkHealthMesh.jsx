import React, { useState } from 'react';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function NetworkHealthMesh({ onInspectNode }) {
  const [selectedNodeFilter, setSelectedNodeFilter] = useState('ALL');
  const { allNodesList, getNodeSeverity, criticalCount, activeHazardsCount } = useHazardAlerts();

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
    },
    {
      id: 'GW-GUW-RIVER',
      sector: 'Assam Brahmaputra Valley',
      backhaul: 'ISRO GAGAN + 5G RedCap',
      status: 'ONLINE',
      latency: '28ms',
      nodesCount: 34,
    },
    {
      id: 'GW-UK-SPINE',
      sector: 'Uttarakhand Himalayan Ridge',
      backhaul: 'Satellite INSAT-MSS + LoRa',
      status: 'ONLINE',
      latency: '45ms',
      nodesCount: 22,
    },
    {
      id: 'GW-HYD-DECCAN',
      sector: 'Telangana Deccan Core',
      backhaul: 'Gigabit Fiber Backbone',
      status: 'ONLINE',
      latency: '8ms',
      nodesCount: 38,
    },
    {
      id: 'GW-OD-COAST',
      sector: 'Bay of Bengal Coastal Sector',
      backhaul: 'Inmarsat Maritime Broadband',
      status: 'ONLINE',
      latency: '38ms',
      nodesCount: 16,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-xl space-y-md">
      {/* 1. Top Global Grid HUD Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-md py-sm bg-surface-card rounded-xl px-md border border-border-grid shadow-xs">
        <div className="flex flex-col gap-xxs">
          <div className="flex items-center gap-xs flex-wrap">
            <span className="px-xs py-xxs rounded-full bg-status-nominal-subtle border border-status-nominal/30 text-status-nominal font-label-code text-label-code flex items-center gap-xxs font-semibold">
              <span className="w-2 h-2 rounded-full bg-status-nominal animate-pulse" />
              100% MESH HEALTH
            </span>
            <span className="font-label-code text-label-code text-primary bg-primary-fixed/30 border border-primary/20 px-xs py-xxs rounded font-medium">
              1 Physical Master (ESP32-S3) + 158 Canonical Mesh Nodes
            </span>
            {criticalCount > 0 ? (
              <span className="px-xs py-xxs rounded-full bg-alert-critical-subtle border border-alert-critical/30 text-alert-critical font-label-code text-label-code flex items-center gap-xxs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-alert-critical" />
                {criticalCount} CRITICAL ALERT{criticalCount > 1 ? 'S' : ''} ACTIVE
              </span>
            ) : (
              <span className="px-xs py-xxs rounded-full bg-status-nominal-subtle border border-status-nominal/30 text-status-nominal font-label-code text-label-code flex items-center gap-xxs font-semibold">
                ALL NODES NOMINAL
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-xs mt-xxs">
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              Edge Mesh Topology &amp; Sensor Network Health
            </h1>
          </div>
        </div>

        {/* Global Key Metrics */}
        <div className="flex flex-wrap items-center gap-sm">
          <div className="flex flex-col bg-canvas-subtle border border-border-grid px-md py-xs rounded-lg">
            <span className="font-label-code text-label-code text-text-muted">PACKET DELIVERY</span>
            <div className="flex items-baseline gap-xxs">
              <span className="font-metric-display text-headline-md text-text-primary font-bold">
                99.98
              </span>
              <span className="font-telemetry-unit text-telemetry-unit text-text-muted">%</span>
            </div>
          </div>

          <div className="flex flex-col bg-canvas-subtle border border-border-grid px-md py-xs rounded-lg">
            <span className="font-label-code text-label-code text-text-muted">MEAN LATENCY</span>
            <div className="flex items-baseline gap-xxs">
              <span className="font-metric-display text-headline-md text-telemetry-cobalt font-bold">
                28.4
              </span>
              <span className="font-telemetry-unit text-telemetry-unit text-text-muted">MS</span>
            </div>
          </div>

          <div className="flex flex-col bg-canvas-subtle border border-border-grid px-md py-xs rounded-lg">
            <span className="font-label-code text-label-code text-text-muted">ACTIVE HUBS</span>
            <div className="flex items-baseline gap-xxs">
              <span className="font-metric-display text-headline-md text-status-nominal font-bold">
                {gateways.length}
              </span>
              <span className="font-telemetry-unit text-telemetry-unit text-text-muted">GATEWAYS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Gateways Overview Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-sm">
        {gateways.map((gw) => (
          <div
            key={gw.id}
            className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-xxs">
                <span className="font-mono text-label-code text-primary font-bold">{gw.id}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-status-nominal bg-status-nominal-subtle border border-status-nominal/30 px-xs py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-nominal" />
                  {gw.status}
                </span>
              </div>
              <h4 className="font-bold text-body-sm text-text-primary leading-tight mb-xxs">
                {gw.sector}
              </h4>
              <span className="text-[11px] text-text-muted block">{gw.backhaul}</span>
            </div>

            <div className="mt-sm pt-xs border-t border-border-grid flex items-center justify-between text-label-code font-mono">
              <span className="text-text-muted">{gw.nodesCount} Nodes</span>
              <span className="text-telemetry-cobalt font-bold">{gw.latency}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Canonical Node Network Health Table Card */}
      <div className="w-full bg-surface-card border border-border-grid rounded-xl shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-md border-b border-border-grid flex flex-wrap items-center justify-between gap-sm">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">
              router
            </span>
            <h3 className="font-headline-md text-body-md text-text-primary font-bold">
              Canonical Node Link Quality &amp; Power Health
            </h3>
            <span className="font-label-code text-label-code text-text-muted bg-canvas-subtle border border-border-grid px-xs py-0.5 rounded font-mono">
              {filteredNodes.length} NODES
            </span>
          </div>

          <div className="flex items-center gap-xs">
            <span className="font-label-code text-label-code text-text-muted font-semibold">FILTER:</span>
            <div className="flex items-center bg-canvas-subtle border border-border-grid p-0.5 rounded-lg text-body-sm flex-wrap">
              {['ALL', 'CRITICAL', 'ABNORMAL', 'WARNING', 'NOMINAL', 'OFFLINE'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedNodeFilter(tier)}
                  className={`px-sm py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                    selectedNodeFilter === tier
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-border-grid font-label-code text-label-code text-text-muted uppercase tracking-wider">
                <th className="py-sm px-md font-semibold">Node Code / ID</th>
                <th className="py-sm px-md font-semibold">Location Sector</th>
                <th className="py-sm px-md font-semibold">Severity</th>
                <th className="py-sm px-md font-semibold">Backhaul Tech</th>
                <th className="py-sm px-md font-semibold">Signal RSSI</th>
                <th className="py-sm px-md font-semibold">Delivery Rate</th>
                <th className="py-sm px-md font-semibold">Battery / Power</th>
                <th className="py-sm px-md font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-grid font-body-sm text-body-sm">
              {filteredNodes.map((node) => {
                const isCrit = node.severity === 'critical';
                const isAbn = node.severity === 'abnormal';
                const isWarn = node.severity === 'warning';
                const isOff = node.severity === 'offline';

                return (
                  <tr
                    key={node.id}
                    className="hover:bg-canvas-subtle transition-colors group"
                  >
                    <td className="py-sm px-md">
                      <div className="flex items-center gap-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCrit
                              ? 'bg-alert-critical animate-pulse'
                              : isAbn
                              ? 'bg-orange-500'
                              : isWarn
                              ? 'bg-alert-warning'
                              : isOff
                              ? 'bg-slate-400'
                              : 'bg-status-nominal'
                          }`}
                        />
                        <span className="font-mono text-label-code text-primary font-bold bg-primary-fixed/30 border border-primary/20 px-xs py-0.5 rounded">
                          {node.displayId}
                        </span>
                        <span className="font-mono text-[11px] text-text-muted hidden md:inline">
                          ({node.id})
                        </span>
                      </div>
                    </td>

                    <td className="py-sm px-md">
                      <span className="font-bold text-text-primary block">
                        {node.location}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {node.coordinates.lat.toFixed(2)}°N, {node.coordinates.lng.toFixed(2)}°E
                      </span>
                    </td>

                    <td className="py-sm px-md">
                      <span
                        className={`inline-flex items-center gap-1 px-xs py-0.5 rounded-full font-label-code text-[10.5px] font-bold uppercase border ${
                          isCrit
                            ? 'bg-alert-critical-subtle text-alert-critical border-alert-critical/30'
                            : isAbn
                            ? 'bg-orange-50 text-orange-700 border-orange-300'
                            : isWarn
                            ? 'bg-alert-warning-subtle text-alert-warning border-alert-warning/30'
                            : isOff
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-status-nominal-subtle text-status-nominal border-status-nominal/30'
                        }`}
                      >
                        {node.severity.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-sm px-md font-mono text-[12px] text-text-secondary">
                      {node.network.backhaul}
                    </td>

                    <td className="py-sm px-md font-mono text-[12px] font-bold text-text-primary">
                      {node.network.rssi}
                    </td>

                    <td className="py-sm px-md font-mono text-[12px] text-status-nominal font-bold">
                      {node.network.packetDelivery}
                    </td>

                    <td className="py-sm px-md">
                      <div className="flex flex-col gap-xxs min-w-[110px]">
                        <div className="flex justify-between items-center font-mono text-label-code">
                          <span className="font-bold text-text-primary">
                            {node.power.batteryPct}%
                          </span>
                          <span className="text-text-muted">{node.power.voltage}</span>
                        </div>
                        <div className="w-full bg-border-grid h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-status-nominal h-full rounded-full"
                            style={{ width: `${node.power.batteryPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-sm px-md text-right">
                      <button
                        onClick={() => onInspectNode && onInspectNode(node.id)}
                        className="bg-canvas-subtle hover:bg-border-grid text-text-secondary hover:text-text-primary border border-border-grid font-semibold text-[11px] px-sm py-1 rounded-lg transition-colors inline-flex items-center gap-0.5"
                      >
                        <span>Telemetry</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
