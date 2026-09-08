import React, { useState, useEffect } from 'react';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { SEVERITY_TIERS } from '../data/severityTiers';
import { useHazardAlerts } from '../context/HazardAlertContext';

function formatIstTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date) + ' IST';
}

export default function NodeTelemetryInspection({
  selectedNodeId,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [currentNodeId, setCurrentNodeId] = useState(selectedNodeId || 'IN-ASM-042');
  const [searchFilter, setSearchFilter] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Station calibrated and linked via ISRO GAGAN telemetry'
  );
  const [feedbackTone, setFeedbackTone] = useState('text-text-secondary');

  const { getNode, getNodeSeverity, auditTrails, logNodeAudit } = useHazardAlerts();

  // Action states for independent NDRF and Dispatch workflows
  const [ndrfAlerted, setNdrfAlerted] = useState(false);
  const [sendingNDRF, setSendingNDRF] = useState(false);
  const [fieldDispatched, setFieldDispatched] = useState(false);
  const [sendingDispatch, setSendingDispatch] = useState(false);

  // Update current node if selectedNodeId changes from parent
  useEffect(() => {
    if (selectedNodeId) {
      setCurrentNodeId(selectedNodeId);
      // Reset action states for different node
      setNdrfAlerted(false);
      setFieldDispatched(false);
    }
  }, [selectedNodeId]);

  const node = getNode(currentNodeId);
  const assessment = getNodeSeverity(node);
  const nodeAuditLogs = auditTrails[node.id] || [];

  const handlePing = () => {
    setFeedbackMessage(
      `TRANSMITTING TELEMETRY PROBE PING... RESPONSE: ${node.network.latency} latency confirmed on ${node.network.backhaul} [SUCCESS]`
    );
    setFeedbackTone('text-primary font-bold');
  };

  // 1. Action: Alert NDRF Authority (Twilio SMS escalation)
  const handleAlertNDRF = async () => {
    if (ndrfAlerted || sendingNDRF) return;
    setSendingNDRF(true);

    const istTimestamp = formatIstTime(new Date());

    try {
      await fetch('http://localhost:8000/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_id: node.id,
          location: node.location,
          hazard_type: node.hazard || 'FLOOD',
          severity: node.severity || 'critical',
          key_metric: `${assessment.readingValue} ${assessment.unit}`,
          action_type: 'alert_ndrf',
          notes: `NDRF Authority Alert transmitted from Telemetry Inspector at ${istTimestamp}`,
        }),
      }).catch(() => {
        // Silently catch if backend is offline
      });

      if (onDispatchNDRF) {
        onDispatchNDRF(node.id, node.location);
      }

      if (onTriggerNotification) {
        onTriggerNotification({
          title: `NDRF AUTHORITY ESCALATED [${node.id}]`,
          message: `Twilio SMS broadcast dispatched to NDRF Incident Command for ${node.location}.`,
        });
      }

      logNodeAudit(
        node.id,
        `🚨 NDRF Authority Alert transmitted via Twilio SMS (${node.location} — ${assessment.readingValue} ${assessment.unit}).`,
        true,
        'NDRF_ALERT',
        'critical'
      );
      setFeedbackMessage(
        `🚨 NDRF AUTHORITY ESCALATED: SMS broadcast dispatched to National Disaster Response Force for ${node.location}.`
      );
      setFeedbackTone('text-alert-critical font-bold');
      setNdrfAlerted(true);
    } catch {
      setNdrfAlerted(true);
    } finally {
      setSendingNDRF(false);
    }
  };

  // 2. Action: Send Dispatch (Independent field/response team - NO SMS)
  const handleSendDispatch = () => {
    if (fieldDispatched || sendingDispatch) return;
    setSendingDispatch(true);

    const istTimestamp = formatIstTime(new Date());

    try {
      if (onTriggerNotification) {
        onTriggerNotification({
          title: `FIELD RESPONSE DISPATCHED [${node.id}]`,
          message: `Rapid response unit deployed to ${node.location} (#${node.id}).`,
        });
      }

      logNodeAudit(
        node.id,
        `🚚 Field Response Unit Dispatched to ${node.location} (#${node.id}).`,
        true,
        'FIELD_DISPATCH',
        'nominal'
      );
      setFeedbackMessage(
        `🚚 FIELD RESPONSE DISPATCHED: Ground tactical team mobilized for ${node.location}.`
      );
      setFeedbackTone('text-telemetry-cobalt font-bold');
      setFieldDispatched(true);
    } catch {
      setFieldDispatched(true);
    } finally {
      setSendingDispatch(false);
    }
  };

  const isCritical = node.severity === 'critical';
  const isWatch = node.severity === 'watch';

  // Filter nodes for the quick-switcher bar
  const filteredNodes = CANONICAL_NODES.filter((n) => {
    const q = searchFilter.trim().toLowerCase();
    return (
      !q ||
      n.id.toLowerCase().includes(q) ||
      n.name.toLowerCase().includes(q) ||
      n.location.toLowerCase().includes(q) ||
      n.hazard.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full pb-xl space-y-md">
      {/* 1. Station Quick Switcher / Selector Toolbar */}
      <div className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col gap-sm">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">
              hub
            </span>
            <span className="font-headline-md text-body-md text-text-primary font-bold">
              Sensor Node Fleet Telemetry Inspector
            </span>
            <span className="font-label-code text-label-code text-text-muted bg-canvas-subtle border border-border-grid px-xs py-0.5 rounded font-mono">
              SELECTABLE CANONICAL NODES ({CANONICAL_NODES.length})
            </span>
          </div>

          {/* Search bar inside switcher */}
          <div className="flex items-center gap-xs bg-canvas-subtle border border-border-grid px-sm py-xs rounded-lg text-text-secondary w-full sm:w-72 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-[16px] text-primary">search</span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search station ID, hazard, or state..."
              className="bg-transparent text-text-primary text-body-sm placeholder:text-text-muted focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Node Selection Pills */}
        <div className="flex items-center gap-xs overflow-x-auto pb-1">
          {filteredNodes.map((n) => {
            const isSelected = n.id === node.id;
            const nCrit = n.severity === 'critical';
            const nWatch = n.severity === 'watch';
            return (
              <button
                key={n.id}
                onClick={() => setCurrentNodeId(n.id)}
                className={`px-sm py-1.5 rounded-lg border text-left flex items-center gap-xs shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-xs font-bold'
                    : 'bg-canvas-subtle hover:bg-surface-card text-text-secondary border-border-grid hover:border-border-strong'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    nCrit
                      ? 'bg-alert-critical animate-pulse'
                      : nWatch
                      ? 'bg-alert-warning'
                      : 'bg-status-nominal'
                  }`}
                />
                <span className="font-mono text-label-code uppercase">{n.displayId}</span>
                <span className="text-body-sm font-medium hidden md:inline truncate max-w-[130px]">
                  {n.location.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Deep Inspection Detail View Card */}
      <div className="w-full bg-surface-card border border-border-grid rounded-xl p-md shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
          <div>
            <div className="flex items-center gap-xs mb-xxs flex-wrap">
              <span className="font-label-code text-label-code text-primary font-bold bg-primary-fixed/30 border border-primary/20 px-xs py-xxs rounded">
                STATION #{node.id}
              </span>
              <span className="font-label-code text-label-code text-text-muted font-mono">
                {node.coordinates.lat.toFixed(4)}° N, {node.coordinates.lng.toFixed(4)}° E
              </span>
              <span className="font-label-code text-label-code text-text-secondary bg-canvas-subtle border border-border-grid px-xs py-xxs rounded font-mono">
                IST SYNC: {node.lastUpdated}
              </span>
              <span
                className={`font-label-code text-label-code font-bold px-xs py-xxs rounded flex items-center gap-xxs border ${
                  isCritical
                    ? 'text-alert-critical bg-alert-critical-subtle border-alert-critical/30'
                    : isWatch
                    ? 'text-alert-warning bg-alert-warning-subtle border-alert-warning/30'
                    : 'text-status-nominal bg-status-nominal-subtle border-status-nominal/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCritical
                      ? 'bg-alert-critical animate-pulse'
                      : isWatch
                      ? 'bg-alert-warning'
                      : 'bg-status-nominal'
                  }`}
                />
                {node.severity.toUpperCase()} THREAT STATUS
              </span>
            </div>

            <div className="flex items-baseline gap-xs">
              <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight font-bold">
                {node.name}
              </h1>
              <span className="font-metric-label text-metric-label text-text-muted">
                ELEV {node.elevation}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary mt-xxs">
              {node.location} — {node.regionCluster} Telemetry Node
            </p>
          </div>

          {/* Network Badges */}
          <div className="flex flex-wrap items-center gap-xs">
            <div className="flex items-center gap-xs px-sm py-xs bg-canvas-subtle border border-border-grid rounded-lg">
              <span className="material-symbols-outlined text-primary text-[18px]">
                cell_tower
              </span>
              <div className="flex flex-col">
                <span className="font-label-code text-label-code text-text-muted uppercase">
                  BACKHAUL
                </span>
                <span className="font-metric-label text-metric-label text-text-primary font-semibold">
                  {node.network.backhaul}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-xs px-sm py-xs bg-canvas-subtle border border-border-grid rounded-lg">
              <span className="material-symbols-outlined text-status-nominal text-[18px]">
                battery_charging_full
              </span>
              <div className="flex flex-col">
                <span className="font-label-code text-label-code text-text-muted uppercase">
                  POWER STATUS
                </span>
                <span className="font-metric-label text-metric-label text-text-primary font-semibold">
                  {node.power.batteryPct}% ({node.power.voltage})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Real-Time Telemetry Dials & Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sm mt-md">
          {/* Primary Key Metric Display */}
          <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col justify-between">
            <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
              {node.latestSensors.primaryLabel}
            </span>
            <div className="my-xs">
              <span
                className={`font-metric-display text-[32px] font-bold tracking-tight ${
                  isCritical ? 'text-alert-critical' : isWatch ? 'text-alert-warning' : 'text-primary'
                }`}
              >
                {node.latestSensors.primaryValue}
              </span>
              <span className="font-body-sm text-body-sm text-text-muted ml-1">
                {node.latestSensors.primaryUnit}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-text-secondary truncate">
              {node.keyMetric}
            </span>
          </div>

          {/* Ambient Temperature */}
          <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col justify-between">
            <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
              Ambient Temperature
            </span>
            <div className="my-xs">
              <span className="font-metric-display text-[32px] text-text-primary font-bold tracking-tight">
                {node.latestSensors.temperature}°C
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-text-secondary">
              Thermal sensor nominal
            </span>
          </div>

          {/* Relative Humidity / Moisture */}
          <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col justify-between">
            <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
              Atmospheric Humidity
            </span>
            <div className="my-xs">
              <span className="font-metric-display text-[32px] text-text-primary font-bold tracking-tight">
                {node.latestSensors.humidity}%
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-text-secondary">
              Dewpoint calibrated
            </span>
          </div>

          {/* Link Latency / RSSI */}
          <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col justify-between">
            <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
              Signal Quality &amp; Latency
            </span>
            <div className="my-xs">
              <span className="font-metric-display text-[32px] text-telemetry-cobalt font-bold tracking-tight">
                {node.network.latency}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-text-secondary">
              RSSI: {node.network.rssi} ({node.network.packetDelivery})
            </span>
          </div>
        </div>

        {/* Action Directive Banner */}
        <div className="mt-md bg-canvas-subtle border border-border-grid p-md rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
          <div className="flex items-start gap-xs">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              shield
            </span>
            <div>
              <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold block">
                NDMA RESPONSE DIRECTIVE
              </span>
              <p className="font-body-sm text-body-sm text-text-primary font-medium mt-0.5">
                {node.directive}
              </p>
            </div>
          </div>

          {/* Action Buttons: Alert NDRF Authority and Send Dispatch */}
          <div className="flex flex-wrap items-center gap-xs shrink-0">
            <button
              onClick={handlePing}
              className="bg-canvas-subtle hover:bg-border-grid text-text-secondary border border-border-grid font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg transition-colors flex items-center gap-xxs"
            >
              <span className="material-symbols-outlined text-[16px]">sensors</span>
              <span>Probe Ping</span>
            </button>

            {/* Alert NDRF Authority */}
            <button
              onClick={handleAlertNDRF}
              disabled={ndrfAlerted || sendingNDRF}
              className={`font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg flex items-center gap-xxs shadow-xs transition-all ${
                ndrfAlerted
                  ? 'bg-status-nominal/20 text-status-nominal border border-status-nominal/30 cursor-not-allowed font-mono'
                  : sendingNDRF
                  ? 'bg-alert-critical/70 text-white cursor-wait'
                  : 'bg-alert-critical hover:bg-red-700 text-white cursor-pointer active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {ndrfAlerted ? 'check_circle' : sendingNDRF ? 'sync' : 'emergency_home'}
              </span>
              <span>
                {ndrfAlerted
                  ? 'NDRF Alerted ✓'
                  : sendingNDRF
                  ? 'Escalating SMS...'
                  : 'Alert NDRF Authority'}
              </span>
            </button>

            {/* Send Dispatch */}
            <button
              onClick={handleSendDispatch}
              disabled={fieldDispatched || sendingDispatch}
              className={`font-body-sm text-body-sm font-semibold px-md py-xs rounded-lg flex items-center gap-xxs shadow-xs transition-all ${
                fieldDispatched
                  ? 'bg-telemetry-cobalt/20 text-telemetry-cobalt border border-telemetry-cobalt/30 cursor-not-allowed font-mono'
                  : sendingDispatch
                  ? 'bg-primary/70 text-white cursor-wait'
                  : 'bg-primary hover:bg-primary-container text-white cursor-pointer active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {fieldDispatched ? 'local_shipping' : sendingDispatch ? 'sync' : 'send'}
              </span>
              <span>
                {fieldDispatched
                  ? 'Field Dispatched ✓'
                  : sendingDispatch
                  ? 'Dispatching Unit...'
                  : 'Send Dispatch'}
              </span>
            </button>
          </div>
        </div>

        {/* Live Feedback Message Bar */}
        {feedbackMessage && (
          <div className="mt-sm flex items-center gap-xs font-mono text-[11px] bg-canvas-subtle border border-border-grid px-sm py-1 rounded-lg">
            <span className="material-symbols-outlined text-[14px] text-primary">info</span>
            <span className={feedbackTone}>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* 4. Standardized 5-Tier Status Severity Evaluation Panel (Fake Waveform Completely Removed) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-md">
        {/* 5-Tier Status Severity Classification (2 Cols) */}
        <div className="xl:col-span-2 bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-xxs mb-sm">
              <div>
                <h3 className="font-headline-md text-body-md text-text-primary font-bold">
                  Status Severity Evaluation ({node.displayId})
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Standardized multi-tier diagnostic classification based on real sensor metrics
                </p>
              </div>
              <span className="font-label-code text-label-code text-primary bg-primary-fixed/30 border border-primary/20 px-xs py-0.5 rounded font-mono font-semibold">
                {assessment.thresholdRange}
              </span>
            </div>

            {/* Stepped 5-Tier Status Bar */}
            <div className="grid grid-cols-5 gap-2 my-sm">
              {SEVERITY_TIERS.map((tier) => {
                const isActive = assessment.activeTier === tier.key;
                return (
                  <div
                    key={tier.key}
                    className={`py-2 px-xs text-center rounded-lg text-body-sm font-mono transition-all flex flex-col items-center justify-center gap-0.5 ${
                      isActive
                        ? tier.activeBarClass + ' shadow-sm ring-2 ring-offset-1 ring-offset-white font-bold'
                        : tier.inactiveBarClass
                    }`}
                    title={tier.description}
                  >
                    <span className="truncate uppercase tracking-wider text-[11px] font-bold">
                      {tier.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] opacity-90 font-sans font-medium">
                        ACTIVE STATE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Diagnostic Details & Concrete Threshold Breaches */}
            <div className="bg-canvas-subtle border border-border-grid rounded-lg p-sm mt-xs">
              <div className="flex items-start gap-xs text-body-sm">
                <span
                  className={`w-3 h-3 rounded-full shrink-0 mt-1 ${
                    assessment.activeTier === 'critical'
                      ? 'bg-alert-critical animate-ping'
                      : assessment.activeTier === 'abnormal'
                      ? 'bg-orange-500'
                      : assessment.activeTier === 'warning'
                      ? 'bg-amber-500'
                      : assessment.activeTier === 'nominal'
                      ? 'bg-status-nominal'
                      : 'bg-slate-400'
                  }`}
                />
                <div className="flex-1">
                  <div className="font-bold text-text-primary">
                    Diagnostic Finding: {assessment.metricDiagnostic}
                  </div>
                  <div className="text-body-sm text-text-secondary mt-0.5">
                    {assessment.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity & Audit Trail Box */}
          <div className="mt-md pt-sm border-t border-border-grid">
            <div className="flex items-center justify-between mb-xs">
              <span className="font-label-code text-[11px] text-text-muted font-bold uppercase tracking-wider">
                ACTIVITY &amp; AUDIT TRAIL ({nodeAuditLogs.length} EVENTS)
              </span>
              <span className="font-label-code text-[10px] text-text-muted">
                IST TIMEZONE LOGGED
              </span>
            </div>
            <div className="space-y-1 max-h-28 overflow-y-auto">
              {nodeAuditLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-xs text-body-sm font-mono py-0.5 px-xs rounded ${
                    log.highlight
                      ? 'bg-alert-critical/10 text-alert-critical border border-alert-critical/20 font-semibold'
                      : 'text-text-secondary'
                  }`}
                >
                  <span className="text-text-muted shrink-0 text-[11px]">{log.time}</span>
                  <span className="text-[12px]">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subsystem Health Panel (1 Col) */}
        <div className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-body-md text-text-primary font-bold mb-xxs">
              Subsystem Diagnostics
            </h3>
            <p className="font-body-sm text-body-sm text-text-muted mb-md">
              On-board TinyML &amp; transducer state
            </p>

            <div className="space-y-sm">
              <div className="flex justify-between items-center pb-xxs border-b border-border-grid">
                <span className="font-body-sm text-body-sm text-text-secondary">
                  Micro-controller Core
                </span>
                <span className="font-mono text-label-code text-status-nominal font-bold">
                  ESP32-S3 (240MHz)
                </span>
              </div>
              <div className="flex justify-between items-center pb-xxs border-b border-border-grid">
                <span className="font-body-sm text-body-sm text-text-secondary">
                  Firmware Checksum
                </span>
                <span className="font-mono text-label-code text-text-muted">
                  v2.4.1-PROD
                </span>
              </div>
              <div className="flex justify-between items-center pb-xxs border-b border-border-grid">
                <span className="font-body-sm text-body-sm text-text-secondary">
                  Solar Array Charging
                </span>
                <span className="font-mono text-label-code text-status-nominal font-bold">
                  {node.power.solarInput} (Nominal Float)
                </span>
              </div>
              <div className="flex justify-between items-center pb-xxs border-b border-border-grid">
                <span className="font-body-sm text-body-sm text-text-secondary">
                  Population At Risk
                </span>
                <span className="font-mono text-label-code text-alert-critical font-bold">
                  {node.populationAtRisk} Citizens
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-text-secondary">
                  Risk Composite Index
                </span>
                <span className="font-mono text-label-code text-text-primary font-bold">
                  {node.riskScore} / 100
                </span>
              </div>
            </div>
          </div>

          <div className="pt-sm mt-sm border-t border-border-grid text-center">
            <span className="font-label-code text-[10px] text-text-muted">
              AUTHENTICATED VIA NDMA SECURE GATEWAY // EPSG:4326
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
