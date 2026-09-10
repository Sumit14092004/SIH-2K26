import React, { useState, useEffect } from 'react';
import ShellLayout from './components/layout/ShellLayout';
import LiveCommandCenter from './pages/LiveCommandCenter';
import SimulationTacticalMap from './pages/SimulationTacticalMap';
import SimulationProfiles from './pages/SimulationProfiles';
import StationTelemetryCockpit from './pages/StationTelemetryCockpit';
import FleetDiagnostics from './pages/FleetDiagnostics';
import EarlyWarningFeed from './pages/EarlyWarningFeed';
import RegionalRiskMatrix from './pages/RegionalRiskMatrix';
import NetworkHealthMesh from './pages/NetworkHealthMesh';
import NodeInspectorModal from './components/telemetry/NodeInspectorModal';
import ToastNotification from './components/telemetry/ToastNotification';
import { HazardAlertProvider, useHazardAlerts } from './context/HazardAlertContext';
import { getApiBaseUrl } from './utils/apiConfig';

function AppContent() {
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) return tabParam;
      const hash = window.location.hash.replace('#', '');
      if (hash) return hash;
    }
    return 'live-command-center';
  };
  const [activePath, setActivePath] = useState(getInitialTab);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActivePath(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabNavigate = (path) => {
    setActivePath(path);
    if (typeof window !== 'undefined') {
      window.location.hash = path;
    }
  };
  const [selectedNodeId, setSelectedNodeId] = useState('GJ-RRU-001');
  const [inspectorNodeId, setInspectorNodeId] = useState('GJ-RRU-001');
  const [isInspectorOpen, setIsInspectorOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('modal') === 'true';
    }
    return false;
  });
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
      fetch(`${getApiBaseUrl()}/api/test/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_id: nodeId || 'GJ-RRU-001',
          hazard: 'multi_hazard',
          confidence: 96.5,
          water_level_cm: 28.0
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
      onNavigate={handleTabNavigate}
      onBroadcastClick={handleBroadcastClick}
      onInspectNode={handleInspectNode}
    >
      {/* 6 Screen Views */}
      {/* 8 Focused Screen Views (Zero Vertical Scroll) */}
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

      {(activePath === 'simulation-map' || activePath === 'disaster-scenario-simulation') && (
        <SimulationTacticalMap
          onInspectNode={handleInspectNode}
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

      {activePath === 'simulation-profiles' && (
        <SimulationProfiles
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

      {(activePath === 'station-telemetry' || activePath === 'node-telemetry-and-inspection') && (
        <StationTelemetryCockpit
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

      {activePath === 'fleet-diagnostics' && (
        <FleetDiagnostics
          onInspectNode={handleInspectNode}
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
        nodeId={inspectorNodeId || 'GJ-RRU-001'}
        onClose={() => {
          setIsInspectorOpen(false);
          if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
            const url = new URL(window.location.href);
            if (url.searchParams.has('modal')) {
              url.searchParams.delete('modal');
              window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
            }
          }
        }}
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AAPDA-KADABRA UI Caught Runtime Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1c30] text-white flex flex-col items-center justify-center p-md font-sans">
          <div className="bg-[#141c2e] border border-red-500/50 rounded-2xl p-xl max-w-lg w-full flex flex-col items-center text-center gap-md shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400">
              <span className="material-symbols-outlined text-[36px]">warning</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Tactical Console Recovered</h2>
            <p className="text-slate-300 text-sm">
              A temporary telemetry rendering event occurred. The system safely intercepted the exception to prevent application crash.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-accent hover:bg-accent-hover text-accent-contrast font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm"
            >
              Reset &amp; Reload Console
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HazardAlertProvider>
          <AppContent />
        </HazardAlertProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
