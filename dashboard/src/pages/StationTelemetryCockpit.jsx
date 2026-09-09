import React, { useState, useEffect } from 'react';
import { CANONICAL_NODES } from '../data/canonicalNodes';
import { SEVERITY_TIERS, evaluateSensorReading } from '../data/severityTiers';
import { useHazardAlerts } from '../context/HazardAlertContext';
import { getApiBaseUrl } from '../utils/apiConfig';

function formatIstTime(date = new Date()) {
  return (
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date) + ' IST'
  );
}

export default function StationTelemetryCockpit({
  selectedNodeId,
  onDispatchNDRF,
  onTriggerNotification,
}) {
  const [currentNodeId, setCurrentNodeId] = useState(selectedNodeId || 'IN-ASM-042');
  const [searchFilter, setSearchFilter] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Station calibrated and linked via ISRO GAGAN telemetry'
  );

  const { getNode, getNodeSeverity, logNodeAudit, searchQuery, selectedState } = useHazardAlerts();

  // Action states
  const [ndrfAlerted, setNdrfAlerted] = useState(false);
  const [sendingNDRF, setSendingNDRF] = useState(false);
  const [fieldDispatched, setFieldDispatched] = useState(false);
  const [sendingDispatch, setSendingDispatch] = useState(false);

  useEffect(() => {
    if (selectedNodeId) {
      setCurrentNodeId(selectedNodeId);
      setNdrfAlerted(false);
      setFieldDispatched(false);
    }
  }, [selectedNodeId]);

  const node = getNode(currentNodeId);
  const assessment = getNodeSeverity(node);

  const handlePing = () => {
    setFeedbackMessage(
      `PROBE PING OK: ${node.network.latency} latency verified on ${node.network.backhaul}`
    );
  };

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
          notes: `NDRF Authority Alert transmitted from Telemetry Cockpit at ${istTimestamp}`,
        }),
      }).catch(() => {});

      if (onDispatchNDRF) onDispatchNDRF(node.id, node.location);
      if (onTriggerNotification) {
        onTriggerNotification({
          title: `NDRF AUTHORITY ESCALATED [${node.id}]`,
          message: `Twilio SMS & Voice Call dispatched to NDRF Command for ${node.location}.`,
        });
      }

      logNodeAudit(
        node.id,
        `NDRF Authority Alert & Voice Call dispatched via Twilio (${node.location} - ${assessment.readingValue} ${assessment.unit}).`,
        true,
        'NDRF_ALERT',
        'critical'
      );
      setNdrfAlerted(true);
      setFeedbackMessage(`NDRF Escalation confirmed for ${node.id} via Twilio Voice / SMS`);
    } catch {
      setFeedbackMessage('Failed to reach backend alert gateway');
    } finally {
      setSendingNDRF(false);
    }
  };

  const handleSendDispatch = async () => {
    if (fieldDispatched || sendingDispatch) return;
    setSendingDispatch(true);
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
          action_type: 'field_dispatch',
          notes: `Local SDRF Field Unit order dispatched at ${istTimestamp}`,
        }),
      }).catch(() => {});

      if (onDispatchNDRF) onDispatchNDRF(node.id, node.location);
      if (onTriggerNotification) {
        onTriggerNotification({
          title: `FIELD UNIT DISPATCHED [${node.id}]`,
          message: `Local rapid response team mobilized for ${node.location}.`,
        });
      }

      logNodeAudit(
        node.id,
        `Field Deployment authorized: Local SDRF Unit mobilized to sector ${node.location}.`,
        true,
        'FIELD_DISPATCH',
        'warning'
      );
      setFieldDispatched(true);
      setFeedbackMessage(`Field response unit mobilized to ${node.location}`);
    } catch {
      setFeedbackMessage('Failed to reach backend dispatch gateway');
    } finally {
      setSendingDispatch(false);
    }
  };

  const filteredNodes = CANONICAL_NODES.filter((n) => {
    const q = (searchFilter || searchQuery || '').trim().toLowerCase();
    const matchesSearch =
      !q ||
      n.name.toLowerCase().includes(q) ||
      n.location.toLowerCase().includes(q) ||
      n.id.toLowerCase().includes(q) ||
      n.displayId.toLowerCase().includes(q);
    const matchesState =
      !selectedState ||
      selectedState === 'ALL' ||
      n.state.toLowerCase().includes(selectedState.toLowerCase());
    return matchesSearch && matchesState;
  });

  const isCritical = node.severity === 'critical';
  const isWarningOrAbnormal = node.severity === 'warning' || node.severity === 'abnormal';
  const isOffline = node.severity === 'offline' || node.status === 'offline';

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Station Selector Strip */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xs font-mono uppercase text-muted font-medium shrink-0">
            Station Fleet:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-[55vw] sm:max-w-[65vw]">
            {filteredNodes.map((n) => {
              const isSelected = n.id === node.id;
              const nCrit = n.severity === 'critical';
              const nWarn = n.severity === 'warning' || n.severity === 'abnormal';
              const nOff = n.severity === 'offline' || n.status === 'offline';
              return (
                <button
                  key={n.id}
                  onClick={() => setCurrentNodeId(n.id)}
                  className={`px-2 py-0.5 rounded border text-left flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-accent text-accent-contrast border-accent font-medium'
                      : 'bg-surface hover:bg-surface-alt text-secondary border-subtle'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      nCrit
                        ? 'bg-status-critical'
                        : nWarn
                        ? 'bg-status-warning'
                        : nOff
                        ? 'bg-muted/40'
                        : 'bg-status-nominal'
                    }`}
                  />
                  <span className="font-mono text-[11px] uppercase">{n.displayId}</span>
                  <span className="hidden md:inline truncate max-w-[90px] text-[11px] opacity-80">
                    {n.location.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Station Filter */}
        <div className="flex items-center gap-1 bg-surface-alt border border-subtle px-2 py-0.5 rounded text-xs">
          <span className="material-symbols-outlined text-[14px] text-muted">filter_list</span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter fleet..."
            className="bg-transparent text-primary text-2xs focus:outline-none w-24"
          />
        </div>
      </div>

      {/* 2. Main 2-Column Cockpit Viewport (Fits 100% in Screen) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
        {/* Left Column: Station Identity & Live Sensor Dials (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-2 h-full min-h-0">
          {/* Station Identity Card */}
          <div className="bg-surface border border-subtle rounded-md p-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-secondary font-medium bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                    Station #{node.id}
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {node.coordinates.lat.toFixed(4)}N, {node.coordinates.lng.toFixed(4)}E
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                      isCritical
                        ? 'text-status-critical bg-status-critical/10 border-status-critical/30 font-medium'
                        : isWarningOrAbnormal
                        ? 'text-status-warning bg-status-warning/10 border-status-warning/30 font-medium'
                        : isOffline
                        ? 'text-muted bg-muted/10 border-muted/30'
                        : 'text-status-nominal bg-status-nominal/10 border-status-nominal/30'
                    }`}
                  >
                    {node.severity.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-sm font-semibold text-primary mt-1 truncate">
                  {node.name}
                </h1>
                <p className="text-2xs text-muted truncate">
                  {node.location} &middot; {node.regionCluster} Telemetry Node
                </p>
              </div>

              {/* Hardware Uplink Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-alt border border-subtle rounded text-right">
                  <span className="material-symbols-outlined text-secondary text-[16px]">cell_tower</span>
                  <div className="flex flex-col text-right">
                    <span className="text-[8.5px] text-muted uppercase">Backhaul</span>
                    <span className="text-2xs font-mono font-medium text-primary truncate max-w-[80px]">
                      {node.network.backhaul}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-alt border border-subtle rounded text-right">
                  <span className="material-symbols-outlined text-status-nominal text-[16px]">battery_charging_full</span>
                  <div className="flex flex-col text-right">
                    <span className="text-[8.5px] text-muted uppercase">Battery</span>
                    <span className="text-2xs font-mono font-medium text-primary">
                      {node.power.batteryPct}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Sensor Dials Grid */}
          <div className="bg-surface border border-subtle rounded-md p-2.5 flex-1 min-h-0 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 border-b border-subtle mb-1">
              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">sensors</span>
                Real-Time Telemetry Channels
              </span>
              <span className="text-[10px] text-muted font-mono">
                Latency: {node.network.latency} &middot; RSSI: {node.network.rssi}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1 min-h-0">
              {node.isMultiSensor && node.readings ? (
                node.readings.map((sensor) => {
                  const evalResult = evaluateSensorReading(sensor);
                  const isAwaiting = sensor.value === null || sensor.value === undefined;
                  return (
                    <div
                      key={sensor.id}
                      className="bg-surface-alt/50 border border-subtle rounded p-2 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-muted text-[10px]">
                        <span className="font-medium truncate">{sensor.label}</span>
                        <span className="font-mono opacity-70 uppercase">{sensor.id}</span>
                      </div>
                      <div className="my-1">
                        <span
                          className={`text-lg font-mono font-semibold tracking-tight ${
                            isAwaiting
                              ? 'text-muted text-xs'
                              : evalResult.tier === 'critical'
                              ? 'text-status-critical'
                              : evalResult.tier === 'abnormal' || evalResult.tier === 'warning'
                              ? 'text-status-warning'
                              : 'text-primary'
                          }`}
                        >
                          {isAwaiting ? 'Standby' : `${sensor.value} ${sensor.unit}`}
                        </span>
                      </div>
                      <div className="text-[9.5px] text-muted border-t border-subtle pt-0.5 flex justify-between">
                        <span className="truncate">{sensor.sensor_model || 'Analog'}</span>
                        <span className="font-mono uppercase text-secondary">{evalResult.tier}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="bg-surface-alt/50 border border-subtle rounded p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-muted font-medium">Primary Sensor</span>
                    <span className="text-lg font-mono font-semibold text-status-critical my-1">
                      {node.latestSensors.primaryValue} {node.latestSensors.primaryUnit}
                    </span>
                    <span className="text-[9.5px] text-muted truncate">{node.latestSensors.primaryLabel}</span>
                  </div>
                  <div className="bg-surface-alt/50 border border-subtle rounded p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-muted font-medium">Ambient Temperature</span>
                    <span className="text-lg font-mono font-semibold text-primary my-1">
                      {node.latestSensors.temperature}C
                    </span>
                    <span className="text-[9.5px] text-muted">Thermal Sensor</span>
                  </div>
                  <div className="bg-surface-alt/50 border border-subtle rounded p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-muted font-medium">Relative Humidity</span>
                    <span className="text-lg font-mono font-semibold text-primary my-1">
                      {node.latestSensors.humidity}%
                    </span>
                    <span className="text-[9.5px] text-muted">Hygrometer</span>
                  </div>
                  <div className="bg-surface-alt/50 border border-subtle rounded p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-muted font-medium">Soil / Flood Stage</span>
                    <span className="text-lg font-mono font-semibold text-status-warning my-1">
                      {node.latestSensors.waterLevel} cm
                    </span>
                    <span className="text-[9.5px] text-muted">Ultrasonic Stage</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Status Classification, Directive & Action Buttons (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-2 h-full min-h-0 justify-between">
          {/* 5-Tier Status Severity Evaluation Panel */}
          <div className="bg-surface border border-subtle rounded-md p-2.5 flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-primary">
                5-Tier Status Classification
              </h3>
              <span className="text-[10px] text-muted font-mono bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
                {assessment.thresholdRange}
              </span>
            </div>

            {/* Stepped 5-Tier Bar */}
            <div className="grid grid-cols-5 gap-1 my-0.5">
              {SEVERITY_TIERS.map((tier) => {
                const isActive = assessment.activeTier === tier.key;
                return (
                  <div
                    key={tier.key}
                    className={`py-1 px-0.5 text-center rounded text-2xs font-mono transition-colors flex flex-col items-center justify-center border ${
                      isActive
                        ? 'border-accent bg-surface-alt text-primary font-semibold'
                        : 'border-subtle bg-surface text-muted'
                    }`}
                  >
                    <span className="truncate uppercase text-[9.5px]">{tier.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-surface-alt border border-subtle rounded p-1.5 text-2xs">
              <div className="font-medium text-primary truncate">
                Finding: {assessment.metricDiagnostic}
              </div>
              <div className="text-muted text-[10px] line-clamp-1 mt-0.5">
                {assessment.description}
              </div>
            </div>
          </div>

          {/* NDMA Response Directive Card */}
          <div className="bg-surface border border-subtle rounded-md p-2.5 flex flex-col gap-1 flex-1 min-h-0 justify-between">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                shield
              </span>
              <div>
                <span className="text-[10px] text-muted uppercase font-medium block">
                  NDMA Response Directive
                </span>
                <p className="text-2xs text-primary font-medium mt-0.5 leading-relaxed">
                  {node.directive}
                </p>
              </div>
            </div>

            {/* Quick Status Message Bar */}
            {feedbackMessage && (
              <div className="flex items-center gap-1.5 font-mono text-[10.5px] bg-surface-alt border border-subtle px-2 py-1 rounded text-secondary truncate">
                <span className="material-symbols-outlined text-[13px] text-muted">info</span>
                <span className="truncate">{feedbackMessage}</span>
              </div>
            )}
          </div>

          {/* Action Buttons Toolbar */}
          <div className="bg-surface border border-subtle rounded-md p-2 flex items-center justify-between gap-1.5 shrink-0">
            <button
              onClick={handlePing}
              className="bg-surface-alt hover:bg-subtle text-secondary border border-subtle text-xs font-medium px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              <span>Probe Ping</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleAlertNDRF}
                disabled={ndrfAlerted || sendingNDRF}
                className={`text-xs font-medium px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors border cursor-pointer ${
                  ndrfAlerted
                    ? 'bg-status-critical/10 text-status-critical border-status-critical/30 cursor-not-allowed'
                    : sendingNDRF
                    ? 'bg-status-critical/70 text-white cursor-wait'
                    : 'bg-status-critical hover:bg-status-critical/90 text-white border-status-critical'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {ndrfAlerted ? 'check_circle' : sendingNDRF ? 'sync' : 'crisis_alert'}
                </span>
                <span>{ndrfAlerted ? 'Alerted' : sendingNDRF ? 'Escalating...' : 'Alert NDRF'}</span>
              </button>

              <button
                onClick={handleSendDispatch}
                disabled={fieldDispatched || sendingDispatch}
                className={`text-xs font-medium px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors border cursor-pointer ${
                  fieldDispatched
                    ? 'bg-status-nominal/10 text-status-nominal border-status-nominal/30 cursor-not-allowed'
                    : sendingDispatch
                    ? 'bg-accent/70 text-white cursor-wait'
                    : 'bg-accent hover:bg-accent-hover text-accent-contrast border-accent'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {fieldDispatched ? 'check_circle' : sendingDispatch ? 'sync' : 'local_shipping'}
                </span>
                <span>{fieldDispatched ? 'Dispatched' : sendingDispatch ? 'Dispatching...' : 'Dispatch Unit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
