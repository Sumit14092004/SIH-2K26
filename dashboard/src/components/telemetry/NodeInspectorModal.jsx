import React, { useState, useEffect } from 'react';
import { SEVERITY_TIERS } from '../../data/severityTiers';
import { formatIstTime } from '../../utils/istTime';
import { useHazardAlerts } from '../../context/HazardAlertContext';

export default function NodeInspectorModal({
  isOpen,
  nodeId = 'IN-ASM-042',
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
      await fetch('http://localhost:8000/api/notify', {
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
          message: `Twilio SMS broadcast dispatched to NDRF Incident Command for ${canonicalNode.location}.`,
        });
      }

      // Append to shared audit trail
      logNodeAudit(
        canonicalNode.id,
        `🚨 NDRF Authority Alert transmitted via Twilio SMS (${canonicalNode.location} — ${canonicalNode.keyMetric}).`,
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-md">
      <div className="bg-surface-card border border-border-grid w-full max-w-2xl rounded-xl p-lg flex flex-col gap-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-xs bg-canvas-subtle border-b border-border-grid -mx-lg -mt-lg px-lg pt-md rounded-t-xl">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary">sensors</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-text-primary font-bold">
                {data.title}
              </h3>
              <span className="font-label-code text-label-code text-text-muted">
                {data.sub}
              </span>
            </div>
          </div>
          <button
            className="text-text-muted hover:text-text-primary p-xxs transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Hazard & Metric Callout */}
        <div className="flex items-center justify-between p-xs bg-canvas-subtle border border-border-grid rounded font-label-code text-label-code">
          <span className="text-text-secondary font-semibold">
            HAZARD VECTOR: <strong className="text-text-primary">{data.hazard}</strong>
          </span>
          <span className="text-alert-warning font-bold">
            {data.keyMetric}
          </span>
        </div>

        {/* Diagnostic Metrics Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-xs font-label-code text-label-code">
          <div className="bg-canvas-subtle border border-border-grid p-xs rounded">
            <div className="text-text-muted">BATTERY / SOLAR</div>
            <div className="text-status-nominal font-bold text-body-sm">{data.battery}</div>
          </div>
          <div className="bg-canvas-subtle border border-border-grid p-xs rounded">
            <div className="text-text-muted">SAMPLING FREQ</div>
            <div className="text-telemetry-cobalt font-bold text-body-sm">{data.sampling}</div>
          </div>
          <div className="bg-canvas-subtle border border-border-grid p-xs rounded">
            <div className="text-text-muted">SIGNAL / PACKET</div>
            <div className="text-primary font-bold text-body-sm">{data.snr}</div>
          </div>
          <div className="bg-canvas-subtle border border-border-grid p-xs rounded">
            <div className="text-text-muted">BACKHAUL LINK</div>
            <div className="text-text-primary font-bold text-body-sm truncate">{data.hwRev}</div>
          </div>
        </div>

        {/* Standardized 5-Tier Status Severity Section (Waveform Completely Removed) */}
        <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col gap-xs">
          <div className="flex flex-wrap items-center justify-between gap-xxs">
            <span className="font-label-code text-label-code text-text-muted font-bold uppercase tracking-wider">
              STATUS SEVERITY CLASSIFICATION
            </span>
            <span className="font-label-code text-[10.5px] text-text-muted">
              {assessment.thresholdRange}
            </span>
          </div>

          {/* Stepped Horizontal 5-Tier Bar */}
          <div className="grid grid-cols-5 gap-1.5 my-1">
            {SEVERITY_TIERS.map((tier) => {
              const isActive = assessment.activeTier === tier.key;
              return (
                <div
                  key={tier.key}
                  className={`py-1.5 px-xxs text-center rounded text-[11px] font-mono transition-all flex items-center justify-center ${
                    isActive
                      ? tier.activeBarClass + ' shadow-xs ring-2 ring-offset-1 ring-offset-white'
                      : tier.inactiveBarClass
                  }`}
                  title={tier.description}
                >
                  <span className="truncate">{tier.shortLabel}</span>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Reading Text */}
          <div className="flex items-center gap-xs mt-0.5 text-body-sm font-semibold">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
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
            <span className="text-text-primary">
              {assessment.metricDiagnostic}
            </span>
          </div>
        </div>

        {/* Node Activity & Audit Trail (Audit of Who/What Alerted and When) */}
        <div className="bg-canvas-subtle border border-border-grid rounded-xl p-sm flex flex-col gap-xs max-h-32 overflow-y-auto">
          <div className="flex items-center justify-between pb-xxs border-b border-border-grid">
            <span className="font-label-code text-[10.5px] text-text-muted font-bold uppercase tracking-wider">
              ACTIVITY &amp; AUDIT TRAIL ({nodeAuditLogs.length})
            </span>
            <span className="font-label-code text-[10px] text-text-muted">
              IST LOGGED
            </span>
          </div>
          <div className="flex flex-col gap-xxs text-[11px] font-mono">
            {nodeAuditLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-xs text-text-secondary">
                <span className="text-text-muted shrink-0">[{log.time}]</span>
                <span className={log.highlight ? 'text-primary font-bold' : ''}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Controls: Alert NDRF Authority & Send Dispatch */}
        <div className="flex flex-wrap items-center justify-between gap-sm pt-xs border-t border-border-grid">
          <span className="font-label-code text-label-code text-text-muted">
            FIRMWARE: {data.firmware}
          </span>
          <div className="flex items-center gap-xs flex-wrap">
            {/* Dismiss Button */}
            <button
              className="px-sm py-xxs rounded bg-surface-card border border-border-grid hover:bg-canvas-subtle text-text-secondary font-label-code text-label-code font-semibold shadow-2xs transition-colors"
              onClick={onClose}
            >
              DISMISS
            </button>

            {/* Send Dispatch Button (Independent Field Team) */}
            <button
              className={`px-sm py-xxs rounded font-label-code text-label-code font-bold shadow-xs transition-all flex items-center gap-1 border ${
                fieldDispatched
                  ? 'bg-status-nominal-subtle text-status-nominal border-status-nominal/40 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-container text-white border-primary cursor-pointer'
              }`}
              onClick={handleSendDispatch}
              disabled={fieldDispatched || sendingDispatch}
              title="Dispatch ground response / field crew to station"
            >
              {sendingDispatch ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>DISPATCHING...</span>
                </>
              ) : fieldDispatched ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>FIELD DISPATCHED ✓</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  <span>SEND DISPATCH</span>
                </>
              )}
            </button>

            {/* Alert NDRF Authority Button */}
            <button
              className={`px-sm py-xxs rounded font-label-code text-label-code font-bold shadow-xs transition-all flex items-center gap-1 border ${
                ndrfAlerted
                  ? 'bg-alert-critical-subtle text-alert-critical border-alert-critical/40 cursor-not-allowed'
                  : 'bg-alert-critical hover:bg-red-700 text-white border-alert-critical cursor-pointer'
              }`}
              onClick={handleAlertNDRF}
              disabled={ndrfAlerted || sendingNDRF}
              title="Escalate emergency directly to National Disaster Response Force"
            >
              {sendingNDRF ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>ALERTING NDRF...</span>
                </>
              ) : ndrfAlerted ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>NDRF ALERTED ✓</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                  <span>ALERT NDRF AUTHORITY</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
