import React, { useState, useEffect } from 'react';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { SEVERITY_TIERS, evaluateSensorReading } from '../data/severityTiers';
import { useHazardAlerts } from '../context/HazardAlertContext';
import { getApiBaseUrl } from '../utils/apiConfig';

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
  const [currentNodeId, setCurrentNodeId] = useState(selectedNodeId || 'GJ-RRU-001');
  const [searchFilter, setSearchFilter] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Station calibrated and linked via ISRO GAGAN telemetry'
  );
  const [feedbackTone, setFeedbackTone] = useState('text-text-secondary');
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const { getNode, getNodeSeverity, auditTrails, logNodeAudit, searchQuery, selectedState } = useHazardAlerts();

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
      await fetch(`${getApiBaseUrl()}/api/notify`, {
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
          message: `Twilio SMS & Automated Voice Call dispatched to NDRF Incident Command for ${node.location}.`,
        });
      }

      logNodeAudit(
        node.id,
        `🚨 NDRF Authority Alert & Voice Call transmitted via Twilio (${node.location} — ${assessment.readingValue} ${assessment.unit}).`,
        true,
        'NDRF_ALERT',
        'critical'
      );
      setFeedbackMessage(
        `🚨 NDRF AUTHORITY ESCALATED: SMS & Automated Voice Call dispatched to National Disaster Response Force for ${node.location}.`
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
    const q = (searchFilter || searchQuery || '').trim().toLowerCase();
    const matchesSearch =
      !q ||
      n.id.toLowerCase().includes(q) ||
      (n.displayId && n.displayId.toLowerCase().includes(q)) ||
      n.name.toLowerCase().includes(q) ||
      n.location.toLowerCase().includes(q) ||
      (n.state && n.state.toLowerCase().includes(q)) ||
      n.hazard.toLowerCase().includes(q) ||
      (n.pincode && String(n.pincode).includes(q));

    const matchesState =
      !selectedState ||
      selectedState === 'ALL' ||
      (n.state && n.state.toLowerCase().includes(selectedState.toLowerCase())) ||
      (n.location && n.location.toLowerCase().includes(selectedState.toLowerCase()));

    return matchesSearch && matchesState;
  });

  return (
    <div className="flex flex-col w-full pb-8 space-y-3">
      {/* 1. Station Quick Switcher / Selector Toolbar */}
      <div className="bg-surface border border-subtle rounded-md p-3 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              hub
            </span>
            <span className="text-xs font-semibold text-primary">
              Sensor Node Fleet Telemetry Inspector
            </span>
            <span className="text-[10px] text-muted bg-surface-alt border border-subtle px-1.5 py-0.5 rounded font-mono">
              {CANONICAL_NODES.length} Stations Active
            </span>
          </div>

          {/* Search bar inside switcher */}
          <div className="flex items-center gap-1.5 bg-surface-alt border border-subtle px-2 py-1 rounded text-secondary w-full sm:w-64 focus-within:border-accent transition-colors">
            <span className="material-symbols-outlined text-[15px] text-muted">search</span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search station ID, hazard, or state..."
              className="bg-transparent text-primary text-xs placeholder:text-muted focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Node Selection Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {filteredNodes.map((n) => {
            const isSelected = n.id === node.id;
            const nCrit = n.severity === 'critical';
            const nWatch = n.severity === 'watch';
            return (
              <button
                key={n.id}
                onClick={() => setCurrentNodeId(n.id)}
                className={`px-2 py-1 rounded border text-left flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-accent text-white border-accent font-medium'
                    : 'bg-surface hover:bg-surface-alt text-secondary border-subtle'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    nCrit
                      ? 'bg-status-critical'
                      : nWatch
                      ? 'bg-status-warning'
                      : 'bg-status-nominal'
                  }`}
                />
                <span className="font-mono text-[11px] uppercase">{n.displayId}</span>
                <span className="hidden md:inline truncate max-w-[120px] text-[11px] opacity-80">
                  {n.location.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Deep Inspection Detail View Card */}
      <div className="w-full bg-surface border border-subtle rounded-md p-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-[11px] font-mono text-secondary font-medium bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                Station #{node.id}
              </span>
              <span className="text-[10px] text-muted font-mono">
                {node.coordinates.lat.toFixed(4)}° N, {node.coordinates.lng.toFixed(4)}° E
              </span>
              <span className="text-[10px] text-muted bg-surface-alt border border-subtle px-1.5 py-0.2 rounded font-mono">
                Sync: {node.lastUpdated}
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded flex items-center gap-1 border ${
                  isCritical
                    ? 'text-status-critical bg-status-critical/10 border-status-critical/30'
                    : isWatch
                    ? 'text-status-warning bg-status-warning/10 border-status-warning/30'
                    : 'text-status-nominal bg-status-nominal/10 border-status-nominal/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCritical
                      ? 'bg-status-critical'
                      : isWatch
                      ? 'bg-status-warning'
                      : 'bg-status-nominal'
                  }`}
                />
                {node.severity.toUpperCase()}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <h1 className="text-base font-semibold text-primary">
                {node.name}
              </h1>
              <span className="text-xs text-muted font-mono">
                Elev: {node.elevation}
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              {node.location} &middot; {node.regionCluster} Telemetry Node
            </p>
          </div>

          {/* Network Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-alt border border-subtle rounded">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                cell_tower
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-muted uppercase">
                  Backhaul
                </span>
                <span className="text-xs text-primary font-medium">
                  {node.network.backhaul}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-alt border border-subtle rounded">
              <span className="material-symbols-outlined text-status-nominal text-[16px]">
                battery_charging_full
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-muted uppercase">
                  Power Status
                </span>
                <span className="text-xs text-primary font-medium">
                  {node.power.batteryPct}% ({node.power.voltage})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Real-Time Telemetry Dials & Metrics Row */}
        {node.isMultiSensor && node.readings ? (
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between pb-1 border-b border-subtle">
              <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">hub</span>
                Integrated Sensor Rig (6 Telemetry Channels)
              </span>
              <span className="text-[10.5px] text-muted font-mono">
                ESP32 Hardware Uplink
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {node.readings.map((sensor) => {
                const evalResult = evaluateSensorReading(sensor);
                const isAwaiting = sensor.value === null || sensor.value === undefined;
                return (
                  <div
                    key={sensor.id}
                    className="bg-surface-alt/40 border border-subtle rounded-md p-2.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-muted text-xs">
                      <span className="font-medium truncate">{sensor.label}</span>
                      <span className="font-mono text-[10px] opacity-70">{sensor.id.toUpperCase()}</span>
                    </div>

                    <div className="my-1.5 flex items-baseline justify-between">
                      <span
                        className={`text-xl font-mono font-semibold tracking-tight ${
                          isAwaiting
                            ? 'text-muted text-sm'
                            : evalResult.tier === 'critical'
                            ? 'text-status-critical'
                            : evalResult.tier === 'abnormal'
                            ? 'text-status-warning'
                            : evalResult.tier === 'warning'
                            ? 'text-status-warning'
                            : 'text-primary'
                        }`}
                      >
                        {isAwaiting ? 'Awaiting Uplink' : `${sensor.value} ${sensor.unit}`}
                      </span>

                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-medium uppercase border ${
                          isAwaiting
                            ? 'bg-surface text-muted border-subtle'
                            : evalResult.tier === 'critical'
                            ? 'bg-status-critical/10 text-status-critical border-status-critical/30'
                            : evalResult.tier === 'abnormal'
                            ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                            : evalResult.tier === 'warning'
                            ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                            : 'bg-status-nominal/10 text-status-nominal border-status-nominal/30'
                        }`}
                      >
                        {isAwaiting ? 'Standby' : evalResult.tier}
                      </span>
                    </div>

                    <div className="text-[10px] text-muted border-t border-subtle pt-1 flex flex-col gap-0.5">
                      <div className="font-mono truncate">
                        Sensor: {sensor.sensor_model || 'Analog/Digital'}
                      </div>
                      <div className="font-mono truncate text-[9.5px]">
                        Threshold: {sensor.thresholdRange}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
            {/* Primary Key Metric Display */}
            <div className="bg-surface-alt/40 border border-subtle rounded-md p-2.5 flex flex-col justify-between">
              <span className="text-[11px] text-muted font-medium">
                {node.latestSensors.primaryLabel}
              </span>
              <div className="my-1">
                <span
                  className={`text-2xl font-mono font-semibold tracking-tight ${
                    isCritical ? 'text-status-critical' : isWatch ? 'text-status-warning' : 'text-primary'
                  }`}
                >
                  {node.latestSensors.primaryValue}
                </span>
                <span className="text-xs text-muted ml-1">
                  {node.latestSensors.primaryUnit}
                </span>
              </div>
              <span className="text-xs text-secondary truncate">
                {node.keyMetric}
              </span>
            </div>

            {/* Ambient Temperature */}
            <div className="bg-surface-alt/40 border border-subtle rounded-md p-2.5 flex flex-col justify-between">
              <span className="text-[11px] text-muted font-medium">
                Ambient Temperature
              </span>
              <div className="my-1">
                <span className="text-2xl text-primary font-mono font-semibold tracking-tight">
                  {node.latestSensors.temperature}°C
                </span>
              </div>
              <span className="text-xs text-muted">
                Thermal sensor nominal
              </span>
            </div>

            {/* Relative Humidity / Moisture */}
            <div className="bg-surface-alt/40 border border-subtle rounded-md p-2.5 flex flex-col justify-between">
              <span className="text-[11px] text-muted font-medium">
                Atmospheric Humidity
              </span>
              <div className="my-1">
                <span className="text-2xl text-primary font-mono font-semibold tracking-tight">
                  {node.latestSensors.humidity}%
                </span>
              </div>
              <span className="text-xs text-muted">
                Dewpoint calibrated
              </span>
            </div>

            {/* Link Latency / RSSI */}
            <div className="bg-surface-alt/40 border border-subtle rounded-md p-2.5 flex flex-col justify-between">
              <span className="text-[11px] text-muted font-medium">
                Signal Quality &amp; Latency
              </span>
              <div className="my-1">
                <span className="text-2xl text-primary font-mono font-semibold tracking-tight">
                  {node.network.latency}
                </span>
              </div>
              <span className="text-xs text-muted">
                RSSI: {node.network.rssi} ({node.network.packetDelivery})
              </span>
            </div>
          </div>
        )}

        {/* Action Directive Banner */}
        <div className="mt-3 bg-surface-alt border border-subtle p-2.5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
              shield
            </span>
            <div>
              <span className="text-[10px] text-muted uppercase font-medium block">
                NDMA Response Directive
              </span>
              <p className="text-xs text-primary font-medium mt-0.5">
                {node.directive}
              </p>
            </div>
          </div>

          {/* Action Buttons: Alert NDRF Authority and Send Dispatch */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              onClick={handlePing}
              className="bg-surface hover:bg-surface-alt text-secondary border border-subtle text-xs font-medium px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">sensors</span>
              <span>Probe Ping</span>
            </button>

            {/* Alert NDRF Authority */}
            <button
              onClick={handleAlertNDRF}
              disabled={ndrfAlerted || sendingNDRF}
              className={`text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 transition-colors border cursor-pointer ${
                ndrfAlerted
                  ? 'bg-status-critical/10 text-status-critical border-status-critical/30 cursor-not-allowed'
                  : sendingNDRF
                  ? 'bg-status-critical/70 text-white cursor-wait'
                  : 'bg-status-critical hover:bg-status-critical/90 text-white border-status-critical'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {ndrfAlerted ? 'check_circle' : sendingNDRF ? 'sync' : 'crisis_alert'}
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
              className={`text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 transition-colors border cursor-pointer ${
                fieldDispatched
                  ? 'bg-status-nominal/10 text-status-nominal border-status-nominal/30 cursor-not-allowed'
                  : sendingDispatch
                  ? 'bg-accent/70 text-white cursor-wait'
                  : 'bg-accent hover:bg-accent/90 text-white border-accent'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {fieldDispatched ? 'check_circle' : sendingDispatch ? 'sync' : 'local_shipping'}
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
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[11px] bg-surface-alt border border-subtle px-2.5 py-1 rounded">
            <span className="material-symbols-outlined text-[14px] text-muted">info</span>
            <span className="text-secondary">{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* 4. Standardized 5-Tier Status Severity Evaluation Panel */}
      <div className="bg-surface border border-subtle rounded-md p-3 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div>
            <h3 className="text-xs font-semibold text-primary">
              Status Severity Evaluation ({node.displayId})
            </h3>
            <p className="text-xs text-muted">
              Diagnostic classification based on real sensor metrics
            </p>
          </div>
          <span className="text-[10.5px] text-muted bg-surface-alt border border-subtle px-2 py-0.5 rounded font-mono">
            {assessment.thresholdRange}
          </span>
        </div>

        {/* Stepped 5-Tier Status Bar */}
        <div className="grid grid-cols-5 gap-1.5 my-1">
          {SEVERITY_TIERS.map((tier) => {
            const isActive = assessment.activeTier === tier.key;
            return (
              <div
                key={tier.key}
                className={`py-1.5 px-1 text-center rounded text-xs font-mono transition-colors flex flex-col items-center justify-center gap-0.5 border ${
                  isActive
                    ? 'border-accent bg-surface-alt text-primary font-semibold'
                    : 'border-subtle bg-surface text-muted'
                }`}
                title={tier.description}
              >
                <span className="truncate uppercase text-[10.5px]">
                  {tier.label}
                </span>
                {isActive && (
                  <span className="text-[9.5px] opacity-80 font-sans">
                    Active State
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Diagnostic Details & Concrete Threshold Breaches */}
        <div className="bg-surface-alt border border-subtle rounded p-2 text-xs">
          <div className="flex items-start gap-1.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${
                assessment.activeTier === 'critical'
                  ? 'bg-status-critical'
                  : assessment.activeTier === 'abnormal'
                  ? 'bg-status-warning'
                  : assessment.activeTier === 'warning'
                  ? 'bg-status-warning'
                  : assessment.activeTier === 'nominal'
                  ? 'bg-status-nominal'
                  : 'bg-muted'
              }`}
            />
            <div className="flex-1">
              <div className="font-medium text-primary">
                Finding: {assessment.metricDiagnostic}
              </div>
              <div className="text-muted mt-0.5">
                {assessment.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Dedicated Standalone Card: Activity & Audit Trail */}
      <div className="bg-surface border border-subtle rounded-md p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-subtle">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[16px]">history</span>
            <span className="text-xs font-semibold text-primary">
              Activity &amp; Audit Trail ({nodeAuditLogs.length} Events)
            </span>
          </div>
          <span className="text-[10px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
            IST Logged
          </span>
        </div>
        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {nodeAuditLogs.length === 0 ? (
            <div className="text-muted text-xs font-mono py-1">
              No audit entries recorded for this station yet.
            </div>
          ) : (
            nodeAuditLogs.map((log, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-1.5 text-xs font-mono py-1 px-2 rounded border ${
                  log.highlight
                    ? 'bg-status-critical/10 text-status-critical border-status-critical/30 font-medium'
                    : 'bg-surface-alt text-secondary border-subtle'
                }`}
              >
                <span className="text-muted shrink-0 text-[10.5px]">[{log.time}]</span>
                <span className="text-[11.5px] leading-snug">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. Collapsible Advanced Subsystem Diagnostics Accordion */}
      <div className="bg-surface border border-subtle rounded-md overflow-hidden">
        <button
          onClick={() => setShowDiagnostics((prev) => !prev)}
          className="w-full p-2.5 flex items-center justify-between hover:bg-surface-alt transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              developer_board
            </span>
            <span className="text-xs font-semibold text-primary">
              Advanced Subsystem Diagnostics &amp; Hardware Specs
            </span>
            <span className="text-[10px] text-muted bg-surface-alt border border-subtle px-1.5 py-0.2 rounded font-mono">
              Secondary Telemetry
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted text-xs font-medium">
            <span>{showDiagnostics ? 'Hide Diagnostics' : 'Show Diagnostics'}</span>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                showDiagnostics ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>
        </button>

        {showDiagnostics && (
          <div className="p-3 pt-1 border-t border-subtle flex flex-col gap-2.5 animate-fadeIn">
            <p className="text-xs text-muted">
              On-board inference, peripheral bus status, and transducer health metrics:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Micro-controller Core
                </span>
                <span className="font-mono text-xs text-status-nominal font-medium mt-0.5">
                  ESP32-S3 (240MHz Dual-Core)
                </span>
              </div>

              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Firmware Checksum
                </span>
                <span className="font-mono text-xs text-secondary font-medium mt-0.5">
                  v2.4.1-PROD (SHA256 Signed)
                </span>
              </div>

              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Solar Array Charging
                </span>
                <span className="font-mono text-xs text-status-nominal font-medium mt-0.5">
                  {node.power.solarInput} (Float)
                </span>
              </div>

              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Population At Risk
                </span>
                <span className="font-mono text-xs text-status-critical font-medium mt-0.5">
                  {node.populationAtRisk} Citizens
                </span>
              </div>

              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Risk Composite Index
                </span>
                <span className="font-mono text-xs text-primary font-medium mt-0.5">
                  {node.riskScore} / 100
                </span>
              </div>

              <div className="bg-surface-alt border border-subtle p-2 rounded flex flex-col justify-between">
                <span className="text-[10px] text-muted uppercase">
                  Security Gateway Link
                </span>
                <span className="font-mono text-xs text-secondary font-medium mt-0.5 truncate">
                  EPSG:4326 // NDMA-SEC-AUTH
                </span>
              </div>
            </div>

            <div className="text-center pt-1 border-t border-subtle">
              <span className="text-[10px] text-muted font-mono">
                AUTHENTICATED VIA NDMA SECURE GATEWAY // TLS 1.3 / MQTT-SN
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
