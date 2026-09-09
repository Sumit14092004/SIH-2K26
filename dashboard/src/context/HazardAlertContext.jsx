import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CANONICAL_NODES, getNodeById } from '../data/canonicalNodes';
import { getSeverityAssessment, getNodeSeverity } from '../data/severityTiers';
import { sirenManager } from '../components/audio/SirenManager';
import { formatIstTime } from '../utils/istTime';
import { getApiBaseUrl } from '../utils/apiConfig';

const HazardAlertContext = createContext(null);

// Initialize initial active alerts from canonical dataset (nodes that are warning, abnormal, or critical)
const buildInitialAlerts = () => {
  return CANONICAL_NODES.filter(
    (n) => n.severity !== 'nominal' && n.severity !== 'offline' && n.status !== 'offline'
  ).map((n) => ({
    alertId: `${n.id}-initial`,
    id: n.id,
    displayId: n.displayId,
    name: n.name,
    location: n.location,
    state: n.state,
    hazard: n.hazard,
    hazardType: n.hazardType,
    severity: n.severity,
    keyMetric: n.keyMetric,
    subtext: n.subtext,
    directive: n.directive,
    lastUpdated: n.lastUpdated,
    isRemoving: false,
    source: 'canonical_stream',
  }));
};

export function HazardAlertProvider({ children }) {
  // 1. Central Live Nodes dictionary: key = nodeId, value = full live node object
  const [nodesMap, setNodesMap] = useState(() => {
    const map = {};
    CANONICAL_NODES.forEach((node) => {
      map[node.id] = { ...node };
      if (node.displayId) map[node.displayId] = { ...node };
    });
    return map;
  });

  // 2. Active Alerts feed (Warning, Abnormal, Critical)
  const [activeAlerts, setActiveAlerts] = useState(buildInitialAlerts);

  // 3. Node-specific activity audit logs: key = nodeId, value = Array<{ time, message, highlight }>
  const [auditTrails, setAuditTrails] = useState(() => {
    const initialTrails = {};
    CANONICAL_NODES.forEach((n) => {
      initialTrails[n.id] = [
        {
          time: formatIstTime(new Date(Date.now() - 30 * 60 * 1000)),
          message: `Station telemetry baseline established via ${n.network.backhaul}. Initial state: ${(n.severity || 'NOMINAL').toUpperCase()}.`,
          highlight: false,
        },
      ];
    });
    return initialTrails;
  });

  // 4. Central Chronological System Audit Trail (Crisis Dispatch Log)
  const [systemAuditLogs, setSystemAuditLogs] = useState(() => [
    {
      id: 'sys-log-init',
      time: formatIstTime(new Date(Date.now() - 15 * 60 * 1000)),
      nodeId: 'NETWORK-HUB',
      location: 'National Intelligence Grid',
      action: 'INITIALIZE',
      message: 'Multi-hazard spatial mesh synchronized across 160 sensor telemetry nodes.',
      severity: 'nominal',
    },
  ]);

  // 5. Critical Visual Flashing & Siren State
  const [isVisualFlashing, setIsVisualFlashing] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const flashTimeoutRef = useRef(null);

  // 6. Deduplicated emergency Twilio SMS tracker per tier
  const criticalSmsSentRef = useRef(new Set(['IN-ASM-042', 'IN-DL-004']));
  const warningSmsSentRef = useRef(new Set());

  // 7. Central Geospatial & Query Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedHazard, setSelectedHazard] = useState('ALL');

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedState('ALL');
    setSelectedHazard('ALL');
  }, []);

  const isFilterActive = useMemo(() => {
    return Boolean(searchQuery.trim() || selectedState !== 'ALL' || selectedHazard !== 'ALL');
  }, [searchQuery, selectedState, selectedHazard]);

  // 8. Live Bandwidth Load Micro-Jitter (simulated live telemetry fluctuation)
  const [bandwidthJitter, setBandwidthJitter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Periodic subtle fluctuation between -1.8 and +2.2 MB/s
      setBandwidthJitter((Math.random() * 4 - 1.8));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 8b. REST Polling: Sync live backend node states into nodesMap
  useEffect(() => {
    const fetchLiveNodes = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/nodes`);
        if (!res.ok) return;
        const body = await res.json();
        const nodes = body.nodes || [];
        if (nodes.length === 0) return;
        setNodesMap((prev) => {
          const next = { ...prev };
          nodes.forEach((backendNode) => {
            const nid = backendNode.node_id || backendNode.id;
            if (!nid) return;
            const existing = next[nid] || {};
            const merged = {
              ...existing,
              status: backendNode.status || existing.status,
              severity: (backendNode.severity || existing.severity || 'nominal').toLowerCase(),
              keyMetric: backendNode.key_metric || existing.keyMetric,
              riskScore: backendNode.risk_score !== undefined ? backendNode.risk_score : (existing.riskScore || 15),
              lastUpdated: backendNode.last_seen || existing.lastUpdated,
            };
            // Merge latest_sensors into readings for multi-sensor nodes
            if (backendNode.latest_sensors && existing.readings && Array.isArray(existing.readings)) {
              merged.readings = existing.readings.map((r) => {
                const sensorKey = r.id;
                if (backendNode.latest_sensors[sensorKey] !== undefined && backendNode.latest_sensors[sensorKey] !== null) {
                  return { ...r, value: backendNode.latest_sensors[sensorKey] };
                }
                return r;
              });
            }
            if (backendNode.latest_sensors) {
              merged.latestSensors = { ...(existing.latestSensors || {}), ...backendNode.latest_sensors };
            }
            if (backendNode.battery_pct !== undefined) {
              merged.power = { ...(existing.power || {}), batteryPct: backendNode.battery_pct };
            }
            if (backendNode.rssi_dbm !== undefined) {
              merged.network = { ...(existing.network || {}), rssi: `${backendNode.rssi_dbm} dBm` };
            }
            next[nid] = merged;
            if (merged.displayId) next[merged.displayId] = merged;
          });
          return next;
        });
      } catch (err) {
        // Silently fail — WebSocket will provide updates
      }
    };
    fetchLiveNodes();
    const interval = setInterval(fetchLiveNodes, 3000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Appends an audit entry to a node's audit history and the central system log
   */
  const logNodeAudit = useCallback((nodeId, message, highlight = false, action = 'STATUS_CHANGE', severity = 'nominal') => {
    const timestamp = formatIstTime(new Date());
    setAuditTrails((prev) => ({
      ...prev,
      [nodeId]: [
        ...(prev[nodeId] || []),
        { time: timestamp, message, highlight },
      ],
    }));

    setSystemAuditLogs((prev) => [
      {
        id: `sys-log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        time: timestamp,
        nodeId,
        location: nodesMap[nodeId]?.location || nodeId,
        action,
        message,
        severity,
      },
      ...prev.slice(0, 49), // retain last 50 entries
    ]);
  }, [nodesMap]);

  /**
   * Retrieves live node by ID or display ID
   */
  const getNode = useCallback(
    (nodeId) => {
      if (!nodeId) return CANONICAL_NODES[0];
      const cleaned = nodeId.trim().toUpperCase();
      return (
        nodesMap[cleaned] ||
        nodesMap[nodeId] ||
        CANONICAL_NODES.find(
          (n) =>
            n.id.toUpperCase() === cleaned ||
            (n.displayId && n.displayId.toUpperCase() === cleaned)
        ) ||
        CANONICAL_NODES[0]
      );
    },
    [nodesMap]
  );

  /**
   * Updates a node's telemetry values and recalculates its state in the central store
   */
  const updateNodeTelemetry = useCallback((nodeId, updates) => {
    setNodesMap((prev) => {
      const current = prev[nodeId] || getNodeById(nodeId);
      const updatedSensors = {
        ...(current.latestSensors || {}),
        ...(updates.latestSensors || {}),
      };

      const updated = {
        ...current,
        ...updates,
        latestSensors: updatedSensors,
        lastUpdated: formatIstTime(new Date()),
      };

      // Recalculate severity assessment with updated sensor data
      const assessment = getSeverityAssessment(updated);
      updated.severity = assessment.activeTier;
      updated.riskScore = assessment.riskScore;

      const next = { ...prev, [nodeId]: updated };
      if (updated.displayId) next[updated.displayId] = updated;
      return next;
    });
  }, []);

  /**
   * UNIFIED ALERT TRIGGER FUNCTION
   * Used by live telemetry streaming and disaster simulations
   */
  const triggerHazardAlert = useCallback(
    async ({
      nodeId,
      hazardType = 'FLOOD',
      severity = 'critical',
      metric = '+3.85m crest',
      location = '',
      directive = '',
      subtext = '',
      source = 'simulation',
      rawSensors = null,
    }) => {
      const canonical = getNode(nodeId);
      const targetLocation = location || canonical?.location || 'Operational Sector';
      const isCritical = severity.toLowerCase() === 'critical';
      const istTimestamp = formatIstTime(new Date());

      // 1. Update node state in the central store
      setNodesMap((prev) => {
        const current = prev[nodeId] || canonical;
        const newSensors = {
          ...(current.latestSensors || {}),
          ...(rawSensors || {}),
          primaryValue: metric,
        };

        if (hazardType.toUpperCase() === 'FLOOD') {
          const mMatch = metric.match(/[-+]?([0-9.]+)/);
          if (mMatch) newSensors.waterLevelCm = parseFloat(mMatch[1]) * 100;
        } else if (hazardType.toUpperCase() === 'FIRE') {
          const tMatch = metric.match(/([0-9.]+)°?C?/);
          if (tMatch) newSensors.temperature = parseFloat(tMatch[1]);
        } else if (hazardType.toUpperCase() === 'AQI') {
          const aMatch = metric.match(/(\d+)/);
          if (aMatch) newSensors.pm25 = parseFloat(aMatch[1]);
        }

        const updated = {
          ...current,
          hazardType: hazardType.toUpperCase(),
          severity: severity.toLowerCase(),
          keyMetric: metric,
          subtext: subtext || current.subtext,
          directive: directive || current.directive,
          latestSensors: newSensors,
          lastUpdated: istTimestamp,
          status: 'online',
          isPulsing: isCritical,
        };

        const assessment = getSeverityAssessment(updated);
        updated.severity = assessment.activeTier;
        updated.riskScore = assessment.riskScore;

        const next = { ...prev, [nodeId]: updated };
        if (updated.displayId) next[updated.displayId] = updated;
        return next;
      });

      // 2. Create/update dynamic alert card
      const alertId = `${nodeId}-${Date.now()}`;
      const newAlert = {
        alertId,
        id: nodeId,
        displayId: canonical?.displayId || nodeId,
        name: canonical?.name || targetLocation,
        location: targetLocation,
        state: canonical?.state || 'India',
        hazard: canonical?.hazard || `${hazardType} Event`,
        hazardType: hazardType.toUpperCase(),
        severity: severity.toLowerCase(),
        keyMetric: metric,
        subtext: subtext || canonical?.subtext || `${hazardType} threshold breached.`,
        directive: directive || canonical?.directive || 'Deploy tactical response unit immediately.',
        lastUpdated: istTimestamp,
        isRemoving: false,
        source,
      };

      setActiveAlerts((prev) => {
        const filtered = prev.filter((a) => a.id !== nodeId);
        return [newAlert, ...filtered];
      });

      // 3. Log alert occurrence
      logNodeAudit(
        nodeId,
        `⚠️ ${severity.toUpperCase()} THRESHOLD BREACHED: ${metric} [Source: ${source.toUpperCase()}]`,
        isCritical,
        'HAZARD_ALERT',
        severity.toLowerCase()
      );

      // 4. Critical vs Warning Audio-Visual & SMS Alert Handling
      if (isCritical) {
        // Critical Tier: Audible siren + viewport flashing
        sirenManager.playCriticalSiren(7000);
        setIsSirenActive(!sirenManager.isMuted);

        setIsVisualFlashing(true);
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = setTimeout(() => {
          setIsVisualFlashing(false);
          setIsSirenActive(false);
        }, 7000);

        // Emergency Twilio Critical SMS escalation (deduplicated per transition into Critical)
        if (!criticalSmsSentRef.current.has(nodeId)) {
          criticalSmsSentRef.current.add(nodeId);

          try {
            fetch(`${getApiBaseUrl()}/api/notify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                node_id: nodeId,
                location: targetLocation,
                hazard_type: hazardType.toUpperCase(),
                severity: 'critical',
                key_metric: metric,
                action_type: 'emergency_critical',
                notes: `Automated critical detection from ${source} at ${istTimestamp}`,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                logNodeAudit(
                  nodeId,
                  `📲 Twilio Emergency SMS dispatched to responder (${data.status || 'dispatched'}).`,
                  false,
                  'SMS_DISPATCH',
                  'critical'
                );
                if (data.voice_call && (data.voice_call.status === 'success' || data.voice_call.call_sid)) {
                  logNodeAudit(
                    nodeId,
                    `📞 Automated Twilio Voice Call placed to responder (+918669923983) [SID: ${data.voice_call.call_sid}].`,
                    false,
                    'VOICE_CALL',
                    'critical'
                  );
                }
              })
              .catch(() => {
                logNodeAudit(nodeId, `📲 Emergency broadcast simulated locally.`, false, 'SMS_SIMULATED', 'critical');
              });
          } catch {
            // Silently handle backend offline
          }
        }
      } else if (severity.toLowerCase() === 'warning') {
        // Warning Tier: SILENT (NO siren, NO screen flash to prevent alert fatigue)
        // Dedicated Warning Advisory SMS (deduplicated per transition into Warning)
        if (!warningSmsSentRef.current.has(nodeId)) {
          warningSmsSentRef.current.add(nodeId);

          try {
            fetch(`${getApiBaseUrl()}/api/notify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                node_id: nodeId,
                location: targetLocation,
                hazard_type: hazardType.toUpperCase(),
                severity: 'warning',
                key_metric: metric,
                action_type: 'warning_advisory',
                notes: `Automated warning advisory detection from ${source} at ${istTimestamp}`,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                logNodeAudit(
                  nodeId,
                  `⚠️ Twilio Warning Advisory SMS dispatched to responder (${data.status || 'dispatched'}).`,
                  false,
                  'SMS_DISPATCH',
                  'warning'
                );
              })
              .catch(() => {
                logNodeAudit(nodeId, `⚠️ Warning advisory broadcast simulated locally.`, false, 'SMS_SIMULATED', 'warning');
              });
          } catch {
            // Silently handle backend offline
          }
        }
      } else if (severity.toLowerCase() === 'nominal') {
        // When returned to nominal, re-arm deduplication trackers for both warning and critical
        warningSmsSentRef.current.delete(nodeId);
        criticalSmsSentRef.current.delete(nodeId);
      }

      return newAlert;
    },
    [getNode, logNodeAudit]
  );

  /**
   * RESOLVE HAZARD ALERT ON 'DISPATCH ACTION' CLICK
   * Smoothly animates card out, reverts node state to NOMINAL, updates all counters,
   * logs resolution audit trail, and DOES NOT send any SMS.
   */
  const resolveHazardAlert = useCallback(
    (nodeId) => {
      const canonical = getNode(nodeId);
      const targetLocation = canonical?.location || nodeId;
      const istTimestamp = formatIstTime(new Date());

      // 1. Mark alert as removing for smooth animation
      setActiveAlerts((prev) =>
        prev.map((alert) =>
          alert.id === nodeId ? { ...alert, isRemoving: true } : alert
        )
      );

      // 2. Remove after animation
      setTimeout(() => {
        setActiveAlerts((prev) => prev.filter((alert) => alert.id !== nodeId));
      }, 350);

      // 3. Reset node state to NOMINAL in the central store
      setNodesMap((prev) => {
        const current = prev[nodeId] || canonical;
        let nominalMetric = 'Operating within safe specifications';
        const nominalSensors = { ...(current.latestSensors || {}) };

        if (current.hazardType === 'FLOOD') {
          nominalMetric = '+0.25m crest (Safe)';
          nominalSensors.waterLevelCm = 25.0;
          nominalSensors.primaryValue = '+0.25';
        } else if (current.hazardType === 'AQI') {
          nominalMetric = 'AQI 65 (Good)';
          nominalSensors.pm25 = 28.0;
          nominalSensors.primaryValue = 65;
        } else if (current.hazardType === 'FIRE') {
          nominalMetric = '32.5°C forest canopy (Safe)';
          nominalSensors.temperature = 32.5;
          nominalSensors.primaryValue = '32.5°';
          nominalSensors.mq135Ppm = 110.0;
          nominalSensors.flameDetected = false;
        } else if (current.hazardType === 'SEISMIC') {
          nominalMetric = '0.15 mm/hr creep (Stable)';
          nominalSensors.primaryValue = '0.15';
        } else if (current.hazardType === 'CYCLONE') {
          nominalMetric = '32 km/h calm (1008 hPa)';
          nominalSensors.windSpeedKmh = 32.0;
          nominalSensors.primaryValue = '1008.0';
        }

        const updated = {
          ...current,
          severity: 'nominal',
          status: 'online',
          keyMetric: nominalMetric,
          latestSensors: nominalSensors,
          isPulsing: false,
          directive: 'Station operating nominally under ambient baseline.',
          riskScore: 15,
          lastUpdated: istTimestamp,
        };

        const next = { ...prev, [nodeId]: updated };
        if (updated.displayId) next[updated.displayId] = updated;
        return next;
      });

      // 4. Remove from SMS sent sets to allow future alerts if needed
      criticalSmsSentRef.current.delete(nodeId);
      warningSmsSentRef.current.delete(nodeId);

      // 5. Log the resolution to activity history and central audit log
      logNodeAudit(
        nodeId,
        `✅ ALERT RESOLVED: Ground team dispatched for ${targetLocation}. Node reverted to NOMINAL.`,
        false,
        'DISPATCH_ACTION',
        'nominal'
      );

      // Stop flashing if no critical alerts remain
      setTimeout(() => {
        setActiveAlerts((current) => {
          const hasCritical = current.some((a) => a.severity === 'critical' && !a.isRemoving);
          if (!hasCritical) {
            setIsVisualFlashing(false);
            sirenManager.stop();
            setIsSirenActive(false);
          }
          return current;
        });
      }, 360);
    },
    [getNode, logNodeAudit]
  );

  // Toggle siren mute
  const toggleSirenMute = useCallback(() => {
    const nextMuted = !sirenManager.isMuted;
    sirenManager.setMuted(nextMuted);
    setIsSirenActive(!nextMuted && sirenManager.isPlaying);
    return nextMuted;
  }, []);

  // Compute live counts across all 5 states from the central store
  const allNodesList = useMemo(() => {
    return CANONICAL_NODES.map((base) => nodesMap[base.id] || base);
  }, [nodesMap]);

  const {
    offlineCount,
    criticalCount,
    abnormalCount,
    warningCount,
    nominalCount,
    totalNodesCount,
  } = useMemo(() => {
    let off = 0;
    let crit = 0;
    let abn = 0;
    let warn = 0;
    let nom = 0;

    allNodesList.forEach((n) => {
      const assessment = getSeverityAssessment(n);
      const tier = assessment.activeTier;
      if (tier === 'offline') off += 1;
      else if (tier === 'critical') crit += 1;
      else if (tier === 'abnormal') abn += 1;
      else if (tier === 'warning') warn += 1;
      else nom += 1;
    });

    const totalFleet = 160;
    // Scale nominal nodes to fill fleet representation (160 - non-nominal)
    const activeNonNominal = off + crit + abn + warn;
    const fleetNominal = Math.max(0, totalFleet - activeNonNominal);

    return {
      offlineCount: off,
      criticalCount: crit,
      abnormalCount: abn,
      warningCount: warn,
      nominalCount: fleetNominal,
      totalNodesCount: totalFleet,
    };
  }, [allNodesList]);

  const activeHazardsCount = criticalCount + abnormalCount + warningCount;

  // 9. Dynamic Bandwidth Load calculation tied to live node telemetry throughput
  const bandwidthLoad = useMemo(() => {
    // Throughput formula: nominal: ~0.82 MB/s, warning: ~2.4 MB/s, abnormal: ~4.6 MB/s, critical: ~8.8 MB/s
    const baseThroughput = (
      nominalCount * 0.82 +
      warningCount * 2.4 +
      abnormalCount * 4.6 +
      criticalCount * 8.8
    );
    const liveVal = Math.max(75, Math.min(195, baseThroughput + bandwidthJitter));
    const rounded = parseFloat(liveVal.toFixed(1));
    const percentage = Math.min(100, Math.max(10, Math.round((rounded / 200) * 100)));

    let tone = 'text-status-nominal';
    if (percentage > 85) tone = 'text-alert-critical';
    else if (percentage > 72) tone = 'text-alert-warning';

    return {
      value: rounded,
      formatted: `${rounded.toFixed(1)} MB/S`,
      percentage,
      tone,
    };
  }, [nominalCount, warningCount, abnormalCount, criticalCount, bandwidthJitter]);

  // 10. Dynamic ISRO GAGAN Satellite Augmented Constellation Sync status
  const isroGaganSync = useMemo(() => {
    // Find all satellite-linked nodes in the current fleet
    const satNodes = allNodesList.filter((n) => {
      const bh = (n.network?.backhaul || '').toLowerCase();
      return bh.includes('isro gagan') || bh.includes('satcom') || bh.includes('satellite');
    });

    const totalSat = satNodes.length || 12;
    const onlineSat = satNodes.filter((n) => n.status !== 'offline').length;
    const syncRatio = onlineSat / totalSat;
    const pct = Math.round(syncRatio * 100);

    if (syncRatio >= 1.0) {
      return {
        status: 'NOMINAL',
        label: 'NOMINAL (100%)',
        percentage: 100,
        tone: 'text-status-nominal',
        dotTone: 'bg-status-nominal',
        subtext: 'GSAT-15 PRN 128 Constellation Locked',
        syncedCount: onlineSat,
        totalCount: totalSat,
      };
    } else if (syncRatio >= 0.8) {
      return {
        status: 'OPTIMAL',
        label: `OPTIMAL (${onlineSat}/${totalSat})`,
        percentage: pct,
        tone: 'text-status-nominal',
        dotTone: 'bg-status-nominal',
        subtext: `1 node in cryo-hold (${onlineSat}/${totalSat} locked)`,
        syncedCount: onlineSat,
        totalCount: totalSat,
      };
    } else if (syncRatio >= 0.5) {
      return {
        status: 'DEGRADED',
        label: `DEGRADED (${pct}%)`,
        percentage: pct,
        tone: 'text-alert-warning',
        dotTone: 'bg-alert-warning',
        subtext: 'Multiple sat-nodes unreachable',
        syncedCount: onlineSat,
        totalCount: totalSat,
      };
    } else {
      return {
        status: 'CRITICAL',
        label: 'SYNC LOST',
        percentage: pct,
        tone: 'text-alert-critical',
        dotTone: 'bg-alert-critical',
        subtext: 'Satellite downlink telemetry offline',
        syncedCount: onlineSat,
        totalCount: totalSat,
      };
    }
  }, [allNodesList]);

  // 11. Real-time Live Hardware Ingestion WebSocket Listener (sub-50ms push)
  useEffect(() => {
    let ws = null;
    let reconnectTimeout = null;
    let isUnmounted = false;

    const connectWs = () => {
      if (isUnmounted) return;
      try {
        const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${proto}//${window.location.host}/ws/telemetry`;
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('[LIVE WS] Connected to backend hardware ingestion stream at', wsUrl);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            const { type, data } = message;

            if (type === 'telemetry_update' && data) {
              const {
                node_id,
                hazard_type,
                severity,
                key_metric,
                risk_score,
                battery_pct,
                battery_voltage,
                signal_strength_dbm,
                sensors,
                timestamp,
                alert,
              } = data;

              const istTime = timestamp ? formatIstTime(new Date(timestamp)) : formatIstTime(new Date());

              // 1. Update node in central nodesMap
              setNodesMap((prev) => {
                const existing = prev[node_id] || getNode(node_id);
                const updatedSensors = {
                  ...(existing?.latestSensors || {}),
                  ...(sensors || {}),
                  primaryValue: key_metric || existing?.latestSensors?.primaryValue,
                };

                let updatedReadings = existing?.readings;
                if (existing?.isMultiSensor && existing?.readings && sensors) {
                  updatedReadings = existing.readings.map((r) => {
                    const sensorKey = r.id;
                    const hazardKey = r.hazard_type;
                    let newVal = r.value;
                    if (sensors[sensorKey] !== undefined) {
                      newVal = sensors[sensorKey];
                    } else if (sensors[hazardKey] !== undefined) {
                      newVal = sensors[hazardKey];
                    }
                    return {
                      ...r,
                      value: newVal,
                    };
                  });
                }

                const updated = {
                  ...existing,
                  hazardType: (hazard_type || existing?.hazardType || 'FLOOD').toUpperCase(),
                  severity: (severity || 'nominal').toLowerCase(),
                  status: 'online',
                  keyMetric: key_metric || existing?.keyMetric,
                  riskScore: risk_score !== undefined ? risk_score : (existing?.riskScore || 15),
                  latestSensors: updatedSensors,
                  readings: updatedReadings,
                  lastUpdated: istTime,
                  isPulsing: (severity || '').toLowerCase() === 'critical',
                  network: {
                    ...(existing?.network || {}),
                    rssi: signal_strength_dbm ? `${signal_strength_dbm} dBm` : (existing?.network?.rssi || '-65 dBm'),
                  },
                  power: {
                    ...(existing?.power || {}),
                    batteryPct: battery_pct !== undefined ? battery_pct : (existing?.power?.batteryPct || 95),
                    voltage: battery_voltage ? `${battery_voltage} V` : (existing?.power?.voltage || '3.84 V'),
                  },
                };

                const next = { ...prev, [node_id]: updated };
                if (updated.displayId) next[updated.displayId] = updated;
                return next;
              });

              // 2. Audit Trail logging
              logNodeAudit(
                node_id,
                `📡 Hardware Telemetry Ingested: ${key_metric || 'reading'} [Battery: ${battery_pct || 95}%, RSSI: ${signal_strength_dbm || -65}dBm]`,
                severity === 'critical',
                'TELEMETRY_INGEST',
                severity || 'nominal'
              );

              // 3. If elevated alert is generated
              if (severity && severity !== 'nominal' && severity !== 'offline') {
                const isCrit = severity === 'critical';
                const isWarn = severity === 'warning';
                const newAlert = {
                  alertId: alert?.identifier || `${node_id}-${Date.now()}`,
                  id: node_id,
                  displayId: data.displayId || node_id,
                  name: data.name || node_id,
                  location: data.location || 'Tactical Sector',
                  state: data.state || 'India',
                  hazard: alert?.info?.event || `${hazard_type} Telemetry Trigger`,
                  hazardType: (hazard_type || 'FLOOD').toUpperCase(),
                  severity: severity.toLowerCase(),
                  keyMetric: key_metric,
                  subtext: alert?.info?.description || `${key_metric} breached operational threshold.`,
                  directive: alert?.info?.instruction || (isCrit ? 'Immediate evacuation and tactical NDRF response.' : 'Field standby and enhanced monitoring.'),
                  lastUpdated: istTime,
                  isRemoving: false,
                  source: 'esp32_hardware',
                };

                setActiveAlerts((prev) => {
                  const filtered = prev.filter((a) => a.id !== node_id);
                  return [newAlert, ...filtered];
                });

                if (isCrit) {
                  sirenManager.playCriticalSiren(7000);
                  setIsSirenActive(!sirenManager.isMuted);
                  setIsVisualFlashing(true);
                  if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
                  flashTimeoutRef.current = setTimeout(() => {
                    setIsVisualFlashing(false);
                    setIsSirenActive(false);
                  }, 7000);

                  // Send Critical SMS and Voice Call if not sent
                  if (!criticalSmsSentRef.current.has(node_id)) {
                    criticalSmsSentRef.current.add(node_id);
                    fetch(`${getApiBaseUrl()}/api/notify`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        node_id,
                        location: data.location || 'Tactical Sector',
                        hazard_type: (hazard_type || 'FLOOD').toUpperCase(),
                        severity: 'critical',
                        key_metric,
                        action_type: 'emergency_critical',
                        notes: `Hardware telemetry critical trigger at ${istTime}`,
                      }),
                    })
                      .then((res) => res.json())
                      .then((respData) => {
                        logNodeAudit(
                          node_id,
                          `📲 Twilio Emergency SMS dispatched to responder (${respData.status || 'dispatched'}).`,
                          false,
                          'SMS_DISPATCH',
                          'critical'
                        );
                        if (respData.voice_call && (respData.voice_call.status === 'success' || respData.voice_call.call_sid)) {
                          logNodeAudit(
                            node_id,
                            `📞 Automated Twilio Voice Call placed to responder (+918669923983) [SID: ${respData.voice_call.call_sid}].`,
                            false,
                            'VOICE_CALL',
                            'critical'
                          );
                        }
                      })
                      .catch(() => {});
                  }
                } else if (isWarn) {
                  // Send Warning SMS if not sent (SILENT: NO siren, NO flashing screen)
                  if (!warningSmsSentRef.current.has(node_id)) {
                    warningSmsSentRef.current.add(node_id);
                    fetch(`${getApiBaseUrl()}/api/notify`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        node_id,
                        location: data.location || 'Tactical Sector',
                        hazard_type: (hazard_type || 'FLOOD').toUpperCase(),
                        severity: 'warning',
                        key_metric,
                        action_type: 'warning_advisory',
                        notes: `Hardware telemetry warning advisory at ${istTime}`,
                      }),
                    }).catch(() => {});
                  }
                }
              } else if (severity === 'nominal') {
                warningSmsSentRef.current.delete(node_id);
                criticalSmsSentRef.current.delete(node_id);
              }
            } else if (type === 'voice_call_dispatched' && data) {
              const { node_id, recipient, call_sid, status } = data;
              logNodeAudit(
                node_id || 'FLEET',
                `📞 Automated Twilio Emergency Voice Call placed to responder (${recipient || '+918669923983'}) [Status: ${status || 'initiated'} | SID: ${call_sid || 'N/A'}].`,
                false,
                'VOICE_CALL',
                'critical'
              );
            } else if (type === 'node_offline' && data) {
              const { node_id, reason } = data;
              setNodesMap((prev) => {
                const existing = prev[node_id] || getNode(node_id);
                if (!existing) return prev;
                const updated = {
                  ...existing,
                  status: 'offline',
                  severity: 'offline',
                  isPulsing: false,
                };
                const next = { ...prev, [node_id]: updated };
                if (updated.displayId) next[updated.displayId] = updated;
                return next;
              });

              logNodeAudit(
                node_id,
                `⚠️ NODE OFFLINE: ${reason || 'Telemetry ping timed out'}`,
                false,
                'HEARTBEAT_TIMEOUT',
                'offline'
              );
            }
          } catch (err) {
            console.warn('[LIVE WS] Error parsing telemetry message:', err);
          }
        };

        ws.onclose = () => {
          if (!isUnmounted) {
            reconnectTimeout = setTimeout(connectWs, 3000);
          }
        };

        ws.onerror = () => {
          if (ws) ws.close();
        };
      } catch (err) {
        if (!isUnmounted) {
          reconnectTimeout = setTimeout(connectWs, 5000);
        }
      }
    };

    connectWs();

    return () => {
      isUnmounted = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (ws) ws.close();
    };
  }, [getNode, logNodeAudit]);

  return (

    <HazardAlertContext.Provider
      value={{
        nodes: nodesMap,
        allNodesList,
        activeAlerts,
        auditTrails,
        systemAuditLogs,
        isVisualFlashing,
        isSirenActive,
        // 5-Tier Operational Distribution
        offlineCount,
        criticalCount,
        abnormalCount,
        warningCount,
        nominalCount,
        totalNodesCount,
        activeHazardsCount,
        // Live Network Stats
        bandwidthLoad,
        isroGaganSync,
        // Central Query & Filter States
        searchQuery,
        setSearchQuery,
        selectedState,
        setSelectedState,
        selectedHazard,
        setSelectedHazard,
        clearFilters,
        isFilterActive,
        // Evaluators & Actions
        getNode,
        getNodeSeverity,
        getSeverityAssessment,
        updateNodeTelemetry,
        triggerHazardAlert,
        resolveHazardAlert,
        logNodeAudit,
        toggleSirenMute,
        setIsVisualFlashing,
      }}
    >
      {children}
    </HazardAlertContext.Provider>
  );
}

export function useHazardAlerts() {
  const ctx = useContext(HazardAlertContext);
  if (!ctx) {
    throw new Error('useHazardAlerts must be used within a HazardAlertProvider');
  }
  return ctx;
}