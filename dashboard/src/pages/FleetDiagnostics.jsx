import React, { useState } from 'react';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { useHazardAlerts } from '../context/HazardAlertContext';

export default function FleetDiagnostics({ onInspectNode }) {
  const [selectedStationId, setSelectedStationId] = useState('IN-ASM-042');
  const [logFilter, setLogFilter] = useState('ALL');

  const { getNode, auditTrails, logNodeAudit } = useHazardAlerts();

  const node = getNode(selectedStationId);
  const nodeAuditLogs = auditTrails[node.id] || [];

  const filteredLogs = nodeAuditLogs.filter((log) => {
    if (logFilter === 'ALL') return true;
    if (logFilter === 'ALERTS') return log.type === 'NDRF_ALERT' || log.severity === 'critical';
    if (logFilter === 'DISPATCH') return log.type === 'FIELD_DISPATCH' || log.type === 'CAP_BROADCAST';
    return true;
  });

  const handleManualProbe = () => {
    logNodeAudit(
      node.id,
      `Diagnostic Health Probe: Subsystem bus scan verified for ${node.id} (ESP32-S3, 240MHz, Flash OK).`,
      false,
      'PROBE',
      'nominal'
    );
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Header & Station Selector Strip */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">developer_board</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-semibold text-primary">
                Fleet Diagnostics &amp; Subsystem Audit Trail
              </h1>
              <span className="text-[10px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                Hardware Health
              </span>
            </div>
          </div>
        </div>

        {/* Station Switcher Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-[50vw]">
          {CANONICAL_NODES.map((n) => {
            const isSelected = n.id === node.id;
            return (
              <button
                key={n.id}
                onClick={() => setSelectedStationId(n.id)}
                className={`px-2 py-0.5 rounded border text-left flex items-center gap-1 shrink-0 transition-colors cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-accent text-accent-contrast border-accent font-medium'
                    : 'bg-surface hover:bg-surface-alt text-secondary border-subtle'
                }`}
              >
                <span className="font-mono text-[11px] uppercase">{n.displayId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main 2-Column Split (Fits 100% in Viewport, Zero Page Scroll) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
        {/* Left Column: Hardware Specifications & Microcontroller Health (Col 6) */}
        <div className="lg:col-span-6 bg-surface border border-subtle rounded-md p-3 flex flex-col justify-between h-full min-h-0">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-subtle mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">memory</span>
                <span className="text-xs font-semibold text-primary">
                  On-Board Hardware Architecture ({node.displayId})
                </span>
              </div>
              <span className="text-[10px] font-mono text-status-nominal bg-status-nominal/10 border border-status-nominal/30 px-1.5 py-0.2 rounded">
                Subsystem Nominal
              </span>
            </div>

            {/* Hardware Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Micro-controller Core</span>
                <span className="font-mono text-xs text-status-nominal font-medium mt-0.5">
                  ESP32-S3 (240MHz Dual-Core)
                </span>
              </div>

              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Firmware Checksum</span>
                <span className="font-mono text-xs text-secondary font-medium mt-0.5 truncate">
                  v2.4.1-PROD (SHA256)
                </span>
              </div>

              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Solar Array Status</span>
                <span className="font-mono text-xs text-status-nominal font-medium mt-0.5">
                  {node.power.solarInput} (Float Mode)
                </span>
              </div>

              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Battery Voltage</span>
                <span className="font-mono text-xs text-primary font-medium mt-0.5">
                  {node.power.voltage} ({node.power.batteryPct}%)
                </span>
              </div>

              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Risk Composite Index</span>
                <span className="font-mono text-xs text-status-critical font-medium mt-0.5">
                  {node.riskScore} / 100
                </span>
              </div>

              <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase font-mono">Population At Risk</span>
                <span className="font-mono text-xs text-primary font-medium mt-0.5">
                  {node.populationAtRisk} Citizens
                </span>
              </div>
            </div>

            {/* Peripheral Bus Status */}
            <div className="mt-3 pt-2 border-t border-subtle">
              <span className="text-[10px] font-mono text-muted uppercase block mb-1.5">
                Peripheral Bus Diagnostic Matrix
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-2xs">
                <div className="bg-surface-alt p-1 rounded">
                  <span className="text-muted block text-[9.5px]">I2C SENSORS</span>
                  <span className="text-status-nominal font-medium">LOCKED</span>
                </div>
                <div className="bg-surface-alt border border-subtle p-1 rounded">
                  <span className="text-muted block text-[9.5px]">SPI FLASH</span>
                  <span className="text-status-nominal font-medium">READY</span>
                </div>
                <div className="bg-surface-alt border border-subtle p-1 rounded">
                  <span className="text-muted block text-[9.5px]">UART MESH</span>
                  <span className="text-status-nominal font-medium">9600 BAUD</span>
                </div>
                <div className="bg-surface-alt border border-subtle p-1 rounded">
                  <span className="text-muted block text-[9.5px]">ADC VOLT</span>
                  <span className="text-status-nominal font-medium">CALIBRATED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-subtle flex items-center justify-between text-2xs font-mono text-muted">
            <span>GATEWAY: TLS 1.3 // MQTT-SN ENCRYPTED</span>
            <button
              onClick={handleManualProbe}
              className="px-2 py-1 bg-surface-alt hover:bg-subtle text-primary border border-subtle rounded transition-colors cursor-pointer"
            >
              Trigger Bus Diagnostic
            </button>
          </div>
        </div>

        {/* Right Column: Activity & Audit Trail (Col 6) */}
        <div className="lg:col-span-6 bg-surface border border-subtle rounded-md p-3 flex flex-col justify-between h-full min-h-0">
          <div className="flex items-center justify-between pb-2 border-b border-subtle shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">history</span>
              <span className="text-xs font-semibold text-primary">
                Activity &amp; Audit Trail ({filteredLogs.length} Events)
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-2xs font-mono">
              {['ALL', 'ALERTS', 'DISPATCH'].map((f) => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-1.5 py-0.2 rounded border transition-colors cursor-pointer ${
                    logFilter === f
                      ? 'bg-accent text-accent-contrast border-accent'
                      : 'bg-surface-alt text-muted border-subtle hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Audit Log Entries (Internal Container Scroll Only) */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 my-2 pr-1">
            {filteredLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted text-xs font-mono">
                No audit log entries recorded for this station yet.
              </div>
            ) : (
              filteredLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded border text-xs font-mono flex flex-col gap-0.5 ${
                    log.highlight
                      ? 'bg-status-critical/10 text-status-critical border-status-critical/30'
                      : 'bg-surface-alt/70 text-secondary border-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs text-muted">
                    <span className="font-semibold text-primary">[{log.time}]</span>
                    <span className="uppercase text-[9.5px] px-1 rounded bg-surface border border-subtle">
                      {log.type || 'LOG'}
                    </span>
                  </div>
                  <p className="text-2xs leading-relaxed text-primary mt-0.5">{log.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-subtle flex items-center justify-between text-2xs text-muted font-mono shrink-0">
            <span>AUTOMATED TAMPER-EVIDENT LOGGING</span>
            <span>IST TIMEZONE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
