import React, { useState } from 'react';
import ShellLayout from './components/layout/ShellLayout';
import LiveCommandCenter from './pages/LiveCommandCenter';
import DisasterScenarioSimulation from './pages/DisasterScenarioSimulation';
import EarlyWarningFeed from './pages/EarlyWarningFeed';
import RegionalRiskMatrix from './pages/RegionalRiskMatrix';
import NetworkHealthMesh from './pages/NetworkHealthMesh';
import NodeTelemetryInspection from './pages/NodeTelemetryInspection';
import NodeInspectorModal from './components/telemetry/NodeInspectorModal';
import ToastNotification from './components/telemetry/ToastNotification';
import { HazardAlertProvider, useHazardAlerts } from './context/HazardAlertContext';

function AppContent() {
  const [activePath, setActivePath] = useState('live-command-center');
  const [selectedNodeId, setSelectedNodeId] = useState('IN-ASM-042');
  const [inspectorNodeId, setInspectorNodeId] = useState(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  const { isVisualFlashing } = useHazardAlerts();

  const handleInspectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
    setInspectorNodeId(nodeId);
    setIsInspectorOpen(true);
  };

  const handleDispatchNDRF = async (nodeId, region) => {
    // Dispatch to Python backend to trigger real Twilio SMS if backend is active
    try {
      fetch('http://localhost:8000/api/test/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_id: nodeId || 'IN-ASM-042',
          hazard: region && region.toLowerCase().includes('aqi') ? 'hazardous_air_pollution' : 'flash_flood',
          confidence: 96.5,
          water_level_cm: 185.0
        })
      }).catch(() => {
        // Silently catch if backend is offline
      });
    } catch {
      // Ignore network errors when backend offline
    }

    setToast({
      show: true,
      title: 'NDRF HIGH-ALERT DISPATCHED',
      message: `Batch Order: NDRF Battalion deployed to ${region} (#${nodeId}) via SATCOM & Twilio SMS.`,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleBroadcastClick = () => {
    setActivePath('early-warning-feed');
    setToast({
      show: true,
      title: 'BROADCAST CONSOLE ENGAGED',
      message: 'CAP-v1.2 Emergency Channel Ready. Select scenario and review payload.',
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <ShellLayout
      activePath={activePath}
      onNavigate={(path) => setActivePath(path)}
      onBroadcastClick={handleBroadcastClick}
      onInspectNode={handleInspectNode}
    >
      {/* 6 Screen Views */}
      {activePath === 'live-command-center' && (
        <LiveCommandCenter
          onInspectNode={handleInspectNode}
          onDispatchNDRF={handleDispatchNDRF}
          onTriggerNotification={(notif) => {
            setToast({
              show: true,
              title: notif.title,
              message: notif.message,
            });
            setTimeout(() => {
              setToast((prev) => ({ ...prev, show: false }));
            }, 5000);
          }}
        />
      )}

      {activePath === 'disaster-scenario-simulation' && (
        <DisasterScenarioSimulation
          onInspectNode={handleInspectNode}
          onDispatchNDRF={handleDispatchNDRF}
          onTriggerNotification={(notif) => {
            setToast({
              show: true,
              title: notif.title,
              message: notif.message,
            });
            setTimeout(() => {
              setToast((prev) => ({ ...prev, show: false }));
            }, 5000);
          }}
        />
      )}

      {activePath === 'node-telemetry-and-inspection' && (
        <NodeTelemetryInspection
          selectedNodeId={selectedNodeId}
          onDispatchNDRF={handleDispatchNDRF}
          onTriggerNotification={(notif) => {
            setToast({
              show: true,
              title: notif.title,
              message: notif.message,
            });
            setTimeout(() => {
              setToast((prev) => ({ ...prev, show: false }));
            }, 5000);
          }}
        />
      )}

      {activePath === 'regional-risk-matrix' && (
        <RegionalRiskMatrix
          onInspectNode={handleInspectNode}
        />
      )}

      {activePath === 'early-warning-feed' && (
        <EarlyWarningFeed
          onDispatchNDRF={handleDispatchNDRF}
        />
      )}

      {activePath === 'network-health-and-mesh' && (
        <NetworkHealthMesh
          onInspectNode={handleInspectNode}
        />
      )}

      {/* Global Node Telemetry Modal */}
      <NodeInspectorModal
        isOpen={isInspectorOpen}
        nodeId={inspectorNodeId || 'IN-ASM-042'}
        onClose={() => setIsInspectorOpen(false)}
        onTriggerNotification={(notif) => {
          setToast({
            show: true,
            title: notif.title,
            message: notif.message,
          });
          setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
          }, 5000);
        }}
        onAlertNDRF={(nodeId, location) => {
          // Log or handle any parent cascade
        }}
        onSendDispatch={(nodeId, location) => {
          // Log or handle any parent cascade
        }}
      />

      {/* Global Toast Notification */}
      <ToastNotification
        show={toast.show}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Full-screen Flashing Red Vignette on Critical / Emergency Alert */}
      {isVisualFlashing && (
        <div
          className="fixed inset-0 pointer-events-none z-40 animate-pulse border-8 border-alert-critical/60 shadow-[inset_0_0_80px_rgba(220,38,38,0.4)] transition-opacity"
          aria-hidden="true"
        />
      )}
    </ShellLayout>
  );
}

export default function App() {
  return (
    <HazardAlertProvider>
      <AppContent />
    </HazardAlertProvider>
  );
}
