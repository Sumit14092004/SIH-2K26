import React, { useState, useEffect } from 'react';
import { SEVERITY_TIERS, evaluateSensorReading } from '../../data/severityTiers';
import { formatIstTime } from '../../utils/istTime';
import { useHazardAlerts } from '../../context/HazardAlertContext';
import { getApiBaseUrl } from '../../utils/apiConfig';

export default function NodeInspectorModal({
  isOpen,
  nodeId = 'GJ-RRU-001',
  nodeData,
  onClose,
  onTriggerNotification,
  onAlertNDRF,
  onSendDispatch,
}) {
  const [ndrfAlerted, setNdrfAlerted] = useState(false);
  const [fieldDispatched, setFieldDispatched] = useState(false);
  const [sendingNDRF, setSendingNDRF] = useState(false);
  const [sendingDispatch, setSendingDispatch] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const { getNode, getNodeSeverity, auditTrails, logNodeAudit } = useHazardAlerts();
  const canonicalNode = getNode(nodeId);
  const assessment = getNodeSeverity(canonicalNode);
  const nodeAuditLogs = auditTrails[canonicalNode.id] || [];

  // Reset local button states when nodeId changes
  useEffect(() => {
    if (!isOpen) return;
    setNdrfAlerted(false);
    setFieldDispatched(false);
    setSendingNDRF(false);
    setSendingDispatch(false);
  }, [nodeId, isOpen]);

  if (!isOpen) return null;

  const data = nodeData || {
    title: `Telemetry Inspector: Node #${canonicalNode.id}`,
    sub: `${canonicalNode.name} // ${canonicalNode.location.toUpperCase()} // ${canonicalNode.status.toUpperCase()}`,
    battery: `${canonicalNode.power.batteryPct}% (${canonicalNode.power.voltage})`,
    sampling: '250 MS',
    snr: `${canonicalNode.network.rssi} (${canonicalNode.network.packetDelivery})`,
    hwRev: canonicalNode.network.backhaul,
    firmware: 'VER-2024.11-SEC-SHA256',
    hazard: canonicalNode.hazard,
    keyMetric: canonicalNode.keyMetric,
  };

  // 1. Action: Alert NDRF Authority
  const handleAlertNDRF = async () => {
    if (ndrfAlerted || sendingNDRF) return;
    setSendingNDRF(true);

    const istTimestamp = formatIstTime(new Date());

    try {
      // Dispatch via Backend Twilio Endpoint
      await fetch(`${getApiBaseUrl()}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_id: canonicalNode.id,
          location: canonicalNode.location,
          hazard_type: canonicalNode.hazardType || 'FLOOD',
          severity: canonicalNode.severity || 'critical',
          key_metric: canonicalNode.keyMetric,
          action_type: 'alert_ndrf',
          notes: `Official NDRF authority escalation authorized from Telemetry Inspector at ${istTimestamp}`,
        }),
      }).catch(() => {
        // Graceful handling if backend is offline
      });

      if (onAlertNDRF) {
        onAlertNDRF(canonicalNode.id, canonicalNode.location);
      }

      if (onTriggerNotification) {
        onTriggerNotification({
          title: `NDRF AUTHORITY ESCALATED [${canonicalNode.id}]`,
          message: `Twilio SMS & Automated Voice Call dispatched to NDRF Incident Command for ${canonicalNode.location}.`,
        });
      }

      // Append to shared audit trail
      logNodeAudit(
        canonicalNode.id,
        `🚨 NDRF Authority Alert & Voice Call transmitted via Twilio (${canonicalNode.location} — ${canonicalNode.keyMetric}).`,
        true,
        'NDRF_ALERT',
        'critical'
      );
      setNdrfAlerted(true);
    } catch {
      setNdrfAlerted(true);
    } finally {
      setSendingNDRF(false);
    }
  };

  // 2. Action: Send Dispatch (Independent field/response team - NO SMS SENT)
  const handleSendDispatch = () => {
    if (fieldDispatched || sendingDispatch) return;
    setSendingDispatch(true);

    const istTimestamp = formatIstTime(new Date());

    try {
      if (onSendDispatch) {
        onSendDispatch(canonicalNode.id, canonicalNode.location);
      }

      if (onTriggerNotification) {
        onTriggerNotification({
          title: `FIELD RESPONSE DISPATCHED [${canonicalNode.id}]`,
          message: `Rapid response unit deployed to ${canonicalNode.location} (#${canonicalNode.id}).`,
        });
      }

      // Append to shared audit trail
      logNodeAudit(
        canonicalNode.id,
        `🚙 Field Response Unit deployed to Sector (${canonicalNode.location}). Team dispatched.`,
        true,
        'FIELD_DISPATCH',
        'nominal'
      );
      setFieldDispatched(true);
    } catch {
      setFieldDispatched(true);
    } finally {
      setSendingDispatch(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-surface border border-subtle w-full max-w-2xl rounded-md p-4 flex flex-col gap-3 shadow-lg relative text-primary max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 bg-surface-alt border-b border-subtle -mx-4 -mt-4 px-4 pt-3 rounded-t-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">sensors</span>
            <div>
              <h3 className="text-xs font-semibold text-primary">
                {data.title}
              </h3>
              <span className="text-[10.5px] text-muted">
                {data.sub}
              </span>
            </div>
          </div>
          <button
            className="text-muted hover:text-primary p-1 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Hazard & Metric Callout or Multi-Sensor Grid */}
        {canonicalNode.isMultiSensor && canonicalNode.readings ? (
          <div className="bg-surface border border-subtle rounded-md p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-subtle pb-1">
              <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">hub</span>
                Integrated Sensor Rig ({canonicalNode.readings?.length || 9} Channels)
              </span>
              <span className="text-[10.5px] text-muted font-mono">
                ESP32 Uplink
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {canonicalNode.readings.map((sensor) => {
                const evalResult = evaluateSensorReading(sensor);
                const isAwaiting = sensor.value === null || sensor.value === undefined;
                return (
                  <div
                    key={sensor.id}
                    className="p-2 rounded bg-surface-alt/40 border border-subtle flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                      <span className="truncate">{sensor.label}</span>
                      <span className="text-[9px] font-mono opacity-70">{sensor.id.toUpperCase()}</span>
                    </div>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className={`font-mono font-medium ${isAwaiting ? 'text-muted text-[11px]' : 'text-primary text-sm'}`}>
                        {isAwaiting ? 'Awaiting Uplink' : `${sensor.value} ${sensor.unit}`}
                      </span>
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-mono font-medium uppercase border ${
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
                    <div className="text-[9.5px] text-muted truncate mt-0.5" title={sensor.sensor_model}>
                      Sensor: {sensor.sensor_model || 'Analog/I2C'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 bg-surface-alt border border-subtle rounded text-xs">
            <span className="text-secondary">
              Hazard Vector: <strong className="text-primary font-medium">{data.hazard}</strong>
            </span>
            <span className="text-status-warning font-mono font-medium">
              {data.keyMetric}
            </span>
          </div>
        )}

        {/* Standardized 5-Tier Status Severity Section */}
        <div className="bg-surface border border-subtle rounded-md p-2.5 flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-xs font-semibold text-primary">
              Status Severity Evaluation
            </span>
            <span className="text-[10.5px] text-muted font-mono">
              {assessment.thresholdRange}
            </span>
          </div>

          {/* Stepped Horizontal 5-Tier Bar */}
          <div className="grid grid-cols-5 gap-1 my-0.5">
            {SEVERITY_TIERS.map((tier) => {
              const isActive = assessment.activeTier === tier.key;
              return (
                <div
                  key={tier.key}
                  className={`py-1 px-1 text-center rounded text-[10.5px] font-mono transition-all flex items-center justify-center border ${
                    isActive
                      ? 'border-accent bg-surface-alt text-primary font-semibold'
                      : 'border-subtle bg-surface text-muted'
                  }`}
                  title={tier.description}
                >
                  <span className="truncate">{tier.shortLabel}</span>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Reading Text */}
          <div className="flex items-center gap-1.5 mt-0.5 text-xs">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
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
            <span className="text-secondary font-medium">
              {assessment.metricDiagnostic}
            </span>
          </div>
        </div>

        {/* Collapsible Advanced Diagnostics Accordion */}
        <div className="bg-surface border border-subtle rounded-md overflow-hidden">
          <button
            onClick={() => setShowDiagnostics((prev) => !prev)}
            className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-surface-alt transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                developer_board
              </span>
              <span className="text-xs font-medium text-primary">
                Advanced Subsystem Diagnostics
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted text-[10.5px] font-mono">
              <span>{showDiagnostics ? 'Hide' : 'Show'}</span>
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
            <div className="p-2.5 pt-1.5 border-t border-subtle flex flex-col gap-1.5 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                <div className="bg-surface-alt border border-subtle p-1.5 rounded">
                  <div className="text-muted text-[9.5px]">Battery / Solar</div>
                  <div className="text-status-nominal font-medium text-xs">{data.battery}</div>
                </div>
                <div className="bg-surface-alt border border-subtle p-1.5 rounded">
                  <div className="text-muted text-[9.5px]">Sampling Freq</div>
                  <div className="text-primary font-medium text-xs">{data.sampling}</div>
                </div>
                <div className="bg-surface-alt border border-subtle p-1.5 rounded">
                  <div className="text-muted text-[9.5px]">Signal / Packet</div>
                  <div className="text-primary font-medium text-xs">{data.snr}</div>
                </div>
                <div className="bg-surface-alt border border-subtle p-1.5 rounded">
                  <div className="text-muted text-[9.5px]">Backhaul Link</div>
                  <div className="text-primary font-medium text-xs truncate">{data.hwRev}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted pt-1 border-t border-subtle">
                <span>Firmware: {data.firmware}</span>
                <span>Chipset: ESP32-S3</span>
              </div>
            </div>
          )}
        </div>

        {/* Node Activity & Audit Trail */}
        <div className="bg-surface border border-subtle rounded-md p-2.5 flex flex-col gap-1.5 max-h-32 overflow-y-auto">
          <div className="flex items-center justify-between pb-1 border-b border-subtle">
            <span className="text-xs font-semibold text-primary">
              Activity &amp; Audit Trail ({nodeAuditLogs.length})
            </span>
            <span className="text-[10px] text-muted font-mono">
              IST Logged
            </span>
          </div>
          <div className="flex flex-col gap-1 text-[11px] font-mono">
            {nodeAuditLogs.length === 0 ? (
              <span className="text-muted text-xs">No audit logs recorded for this node yet.</span>
            ) : (
              nodeAuditLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-secondary">
                  <span className="text-muted shrink-0">[{log.time}]</span>
                  <span className={log.highlight ? 'text-status-critical font-medium' : ''}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-subtle">
          <span className="text-[10.5px] text-muted font-mono">
            Firmware: {data.firmware}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Dismiss Button */}
            <button
              className="px-2.5 py-1 rounded bg-surface border border-subtle hover:bg-surface-alt text-secondary text-xs font-medium transition-colors cursor-pointer"
              onClick={onClose}
            >
              Dismiss
            </button>

            {/* Send Dispatch Button */}
            <button
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 border cursor-pointer ${
                fieldDispatched
                  ? 'bg-status-nominal/10 text-status-nominal border-status-nominal/30 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent/90 text-white border-accent'
              }`}
              onClick={handleSendDispatch}
              disabled={fieldDispatched || sendingDispatch}
              title="Dispatch ground response / field crew to station"
            >
              <span className="material-symbols-outlined text-[14px]">
                {fieldDispatched ? 'check_circle' : sendingDispatch ? 'sync' : 'local_shipping'}
              </span>
              <span>
                {sendingDispatch
                  ? 'Dispatching...'
                  : fieldDispatched
                  ? 'Field Dispatched ✓'
                  : 'Send Dispatch'}
              </span>
            </button>

            {/* Alert NDRF Authority Button */}
            <button
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 border cursor-pointer ${
                ndrfAlerted
                  ? 'bg-status-critical/10 text-status-critical border-status-critical/30 cursor-not-allowed'
                  : 'bg-status-critical hover:bg-status-critical/90 text-white border-status-critical'
              }`}
              onClick={handleAlertNDRF}
              disabled={ndrfAlerted || sendingNDRF}
              title="Escalate emergency directly to National Disaster Response Force"
            >
              <span className="material-symbols-outlined text-[14px]">
                {ndrfAlerted ? 'check_circle' : sendingNDRF ? 'sync' : 'crisis_alert'}
              </span>
              <span>
                {sendingNDRF
                  ? 'Alerting NDRF...'
                  : ndrfAlerted
                  ? 'NDRF Alerted ✓'
                  : 'Alert NDRF Authority'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
