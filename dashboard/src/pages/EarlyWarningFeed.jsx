import React, { useState } from 'react';
import { useHazardAlerts } from '../context/HazardAlertContext';

// Dynamic CAP generator helper embedding real metrics
function generateCapPayload(hazard) {
  const metric = hazard.keyMetric || 'Threshold breached';
  const loc = hazard.location || 'Monitored Sector';
  const hType = (hazard.hazardType || 'HAZARD').toUpperCase();

  if (hType === 'FLOOD') {
    return {
      badge: 'LEVEL 3 INUNDATION BREACH',
      badgeTone: 'critical',
      en: `EMERGENCY INUNDATION NOTICE: River stage and crest surge velocity in ${loc} exceeded alert threshold (${metric}). Imminent flood overflow expected across lowlands. Evacuate riverine wards immediately to designated flood shelters. Avoid all submerged crossings.`,
      hi: `आपातकालीन जलभराव सूचना: ${loc} में जलस्तर एवं बहाव गति चेतावनी स्तर पार कर गया है (${metric})। निचले इलाकों में बाढ़ का खतरा। तुरंत सुरक्षित राहत शिविरों में जाएं एवं जलमग्न मार्गों से दूर रहें।`,
      shelter: `EMBANKMENT SHELTER: ${loc.split(',')[0].toUpperCase()}`,
      helpline: '1070 / 1077 (SDMA)',
      reach: '48,500 PHONES',
    };
  }

  if (hType === 'AQI') {
    return {
      badge: 'SEVERE TOXIC SMOG (GRAP-IV)',
      badgeTone: 'critical',
      en: `HEALTH ALERT: Air Quality Index in ${loc} reached hazardous levels (${metric}). Severe thermal inversion cap in effect. Vulnerable citizens, elderly, and children must remain indoors. Use N95 respiratory protection if travel is unavoidable.`,
      hi: `गंभीर वायु गुणवत्ता चेतावनी: ${loc} में वायु गुणवत्ता सूचकांक गंभीर स्तर पर (${metric})। सभी नागरिक विशेषकर बच्चे एवं बुजुर्ग घर के भीतर रहें। अनिवार्य होने पर N95 मास्क का उपयोग करें।`,
      shelter: 'RESPIRATORY CLEAN AIR CENTERS',
      helpline: '1075 (CPCB)',
      reach: '185,000 PHONES',
    };
  }

  if (hType === 'SEISMIC') {
    return {
      badge: 'GEOTECHNICAL SHEAR / SLIP ADVISORY',
      badgeTone: 'warning',
      en: `LANDSLIDE ADVISORY: Subsurface geotechnical displacement detected in ${loc} (${metric}). Hillside transit caution enforced. Heavy freight vehicles diverted. Follow disaster management marshals.`,
      hi: `भूस्खलन चेतावनी: ${loc} में पहाड़ी ढलान विस्थापन दर्ज (${metric})। एनएच एवं पर्वतीय मार्गों पर सावधानी बरतें। आपदा प्रबंधन कर्मियों के निर्देशों का पालन करें।`,
      shelter: `HIGHWAY BYPASS: ${loc.split(',')[0].toUpperCase()}`,
      helpline: '1070 (SDMA)',
      reach: '14,200 PHONES',
    };
  }

  if (hType === 'CYCLONE') {
    return {
      badge: 'COASTAL CYCLONE STORM SURGE',
      badgeTone: 'critical',
      en: `CYCLONIC STORM WARNING: Maritime station near ${loc} reports high winds and central pressure drop (${metric}). Storm surge risk along coastal sectors. Fishing suspended and cyclone shelters opened.`,
      hi: `चक्रवात चेतावनी: ${loc} तटीय क्षेत्र में तेज हवाएं एवं भारी दबाव गिरावट (${metric})। तटीय राहत शिविर सक्रिय। मछुआरे समुद्र में न जाएं।`,
      shelter: `MULTI-PURPOSE CYCLONE SHELTER: ${loc.split(',')[0].toUpperCase()}`,
      helpline: '1077 (ODRAF/NDRF)',
      reach: '62,000 PHONES',
    };
  }

  if (hType === 'FIRE') {
    return {
      badge: 'THERMAL BIOMASS WILDFIRE ALERT',
      badgeTone: 'critical',
      en: `WILDFIRE CONTAINMENT NOTICE: Thermal infrared telemetry detected active thermal anomaly in ${loc} (${metric}). Eco-tourism corridors restricted and firebreaks established.`,
      hi: `जंगल की आग चेतावनी: ${loc} में थर्मल विसंगति दर्ज (${metric})। वन सीमा क्षेत्र में प्रवेश प्रतिबंधित। वन विभाग द्वारा सुरक्षात्मक कदम सक्रिय।`,
      shelter: `FOREST BASECAMP: ${loc.split(',')[0].toUpperCase()}`,
      helpline: '1926 (FOREST RESCUE)',
      reach: '8,500 PHONES',
    };
  }

  return {
    badge: 'MULTI-HAZARD SURVEILLANCE NOTICE',
    badgeTone: 'warning',
    en: `ADVISORY: Station ${loc} flagged anomalous readings (${metric}). Field response teams placed on heightened surveillance status.`,
    hi: `चेतावनी: ${loc} स्टेशन पर विसंगति दर्ज (${metric})। आपदा प्रतिक्रिया दल निगरानी में सक्रिय।`,
    shelter: 'CIVIL DEFENSE COMMAND',
    helpline: '112',
    reach: '12,000 PHONES',
  };
}

export default function EarlyWarningFeed({ onDispatchNDRF }) {
  const { activeAlerts, logNodeAudit } = useHazardAlerts();
  const [selectedNodeId, setSelectedNodeId] = useState(activeAlerts[0]?.id || '');
  const [audience, setAudience] = useState('civic');
  const [copiedKey, setCopiedKey] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  // Filter feed based on user selected severity tab
  const filteredFeed = activeAlerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  // Keep selected node pointer valid
  const effectiveNodeId = filteredFeed.some((a) => a.id === selectedNodeId)
    ? selectedNodeId
    : filteredFeed[0]?.id || '';

  const selectedHazard = activeAlerts.find((n) => n.id === effectiveNodeId) || filteredFeed[0];
  const payload = selectedHazard ? generateCapPayload(selectedHazard) : null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTransmitNDRF = () => {
    if (!selectedHazard) return;
    if (onDispatchNDRF) {
      onDispatchNDRF(selectedHazard.id, selectedHazard.location);
    }
    logNodeAudit(
      selectedHazard.id,
      `📡 CAP-v1.2 Public Alert Broadcast transmitted to ${payload.reach} for ${selectedHazard.location}.`,
      true,
      'CAP_BROADCAST',
      selectedHazard.severity
    );
  };

  return (
    <div className="flex flex-col w-full pb-xl space-y-md">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-md py-sm bg-surface-card rounded-xl px-md border border-border-grid shadow-xs">
        <div className="flex flex-col gap-xxs">
          <div className="flex items-center gap-xs">
            <span className="px-xs py-xxs rounded-full bg-alert-critical-subtle border border-alert-critical/30 text-alert-critical font-label-code text-label-code flex items-center gap-xxs font-semibold">
              <span className="w-2 h-2 rounded-full bg-alert-critical animate-pulse" />
              CAP-v1.2 BROADCAST GATEWAY
            </span>
            <span className="font-label-code text-label-code text-primary bg-primary-fixed/30 border border-primary/20 px-xs py-xxs rounded font-medium">
              National Common Alerting Protocol ({activeAlerts.length} Active Feeds)
            </span>
          </div>
          <div className="flex items-baseline gap-xs mt-xxs">
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              Multi-Hazard Early Warning &amp; Citizen Broadcast Stream
            </h1>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-xs">
          <span className="font-label-code text-label-code text-text-muted font-semibold">TIER:</span>
          <div className="flex items-center bg-canvas-subtle border border-border-grid p-0.5 rounded-lg text-text-secondary text-body-sm">
            {['ALL', 'CRITICAL', 'ABNORMAL', 'WARNING'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterSeverity(tier)}
                className={`px-sm py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                  filterSeverity === tier
                    ? 'bg-primary text-white shadow-xs'
                    : 'hover:text-text-primary'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* If No Active Hazards */}
      {filteredFeed.length === 0 ? (
        <div className="bg-surface-card border border-border-grid rounded-xl p-xl flex flex-col items-center justify-center text-center gap-sm shadow-xs">
          <span className="material-symbols-outlined text-status-nominal text-[48px]">
            check_circle
          </span>
          <h3 className="font-headline-md text-headline-md text-text-primary font-bold">
            All Monitored Sectors Nominal
          </h3>
          <p className="font-body-sm text-body-sm text-text-muted max-w-md">
            Zero active warning, abnormal, or emergency broadcasts required. All 160 stations operating within baseline environmental bounds.
          </p>
        </div>
      ) : (
        /* 2. Main Two-Column Layout */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-md items-start">
          {/* Left Column: Active Canonical Hazard Feed Cards (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-sm">
            <div className="flex items-center justify-between px-xs">
              <span className="font-label-code text-label-code text-text-muted uppercase tracking-wider font-semibold">
                ACTIVE HAZARD BROADCASTS ({filteredFeed.length})
              </span>
              <span className="font-label-code text-label-code text-text-muted">SELECT TO PREVIEW CAP</span>
            </div>

            <div className="flex flex-col gap-sm max-h-[720px] overflow-y-auto pr-1">
              {filteredFeed.map((hazard) => {
                const isSelected = hazard.id === effectiveNodeId;
                const isCrit = hazard.severity === 'critical';
                const isAbn = hazard.severity === 'abnormal';

                return (
                  <div
                    key={hazard.id}
                    onClick={() => setSelectedNodeId(hazard.id)}
                    className={`bg-surface-card border rounded-xl p-md shadow-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-primary shadow-sm'
                        : 'border-border-grid hover:border-border-strong hover:bg-canvas-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-xs">
                      <div className="flex items-center gap-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCrit
                              ? 'bg-alert-critical animate-ping'
                              : isAbn
                              ? 'bg-orange-500'
                              : 'bg-alert-warning'
                          }`}
                        />
                        <span className="font-label-code text-label-code text-primary font-bold">
                          {hazard.displayId || hazard.id}
                        </span>
                      </div>
                      <span
                        className={`font-label-code text-[10.5px] px-xs py-0.5 rounded uppercase font-bold border ${
                          isCrit
                            ? 'bg-alert-critical-subtle text-alert-critical border-alert-critical/30'
                            : isAbn
                            ? 'bg-orange-50 text-orange-700 border-orange-300'
                            : 'bg-alert-warning-subtle text-alert-warning border-alert-warning/30'
                        }`}
                      >
                        {hazard.severity.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-bold text-text-primary text-body-sm mb-xxs">
                      {hazard.location}
                    </h4>
                    <p className="font-label-code text-[11px] text-text-muted mb-xs">
                      {hazard.hazard} // <strong className="text-text-primary">{hazard.keyMetric}</strong>
                    </p>

                    <div className="flex items-center justify-between pt-xxs border-t border-border-grid text-[10.5px] font-label-code text-text-muted">
                      <span>REFRESHED: {hazard.lastUpdated}</span>
                      <span className="text-primary font-semibold">VIEW CAP →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live CAP Broadcast Console & Multi-lingual Dispatch (7 Cols) */}
          {selectedHazard && payload && (
            <div className="xl:col-span-7 flex flex-col gap-md">
              <div className="bg-surface-card border border-border-grid rounded-xl p-md shadow-xs flex flex-col gap-md">
                {/* Header of Active Broadcast */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm pb-sm border-b border-border-grid">
                  <div>
                    <span className="font-label-code text-label-code text-primary font-bold uppercase">
                      ACTIVE CAP BROADCAST PAYLOAD // {selectedHazard.displayId || selectedHazard.id}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold mt-xxs">
                      {selectedHazard.location}
                    </h2>
                    <span className="font-body-sm text-body-sm text-text-secondary">
                      Target Vector: <strong>{selectedHazard.hazard}</strong> ({selectedHazard.keyMetric})
                    </span>
                  </div>

                  {/* Audience Segmented Control */}
                  <div className="flex items-center bg-canvas-subtle border border-border-grid p-0.5 rounded-lg text-body-sm">
                    <button
                      onClick={() => setAudience('civic')}
                      className={`px-sm py-1 rounded-md text-body-sm font-semibold transition-all ${
                        audience === 'civic'
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Civic Broadcast
                    </button>
                    <button
                      onClick={() => setAudience('auth')}
                      className={`px-sm py-1 rounded-md text-body-sm font-semibold transition-all ${
                        audience === 'auth'
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Authority (NDRF)
                    </button>
                  </div>
                </div>

                {/* English Transmission Card */}
                <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col gap-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-code text-label-code text-text-muted font-bold uppercase">
                      PRIMARY OFFICIAL PAYLOAD (ENGLISH)
                    </span>
                    <button
                      onClick={() => handleCopy(payload.en, 'en')}
                      className="text-primary hover:text-primary-container text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedKey === 'en' ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedKey === 'en' ? 'Copied' : 'Copy Payload'}</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-primary leading-relaxed font-medium">
                    {payload.en}
                  </p>
                </div>

                {/* Hindi Transmission Card */}
                <div className="bg-canvas-subtle border border-border-grid rounded-xl p-md flex flex-col gap-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-code text-label-code text-text-muted font-bold uppercase">
                      REGIONAL EMERGENCY PAYLOAD (HINDI / DEV)
                    </span>
                    <button
                      onClick={() => handleCopy(payload.hi, 'hi')}
                      className="text-primary hover:text-primary-container text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedKey === 'hi' ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedKey === 'hi' ? 'Copied' : 'Copy Payload'}</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-primary leading-relaxed font-medium">
                    {payload.hi}
                  </p>
                </div>

                {/* Metadata Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                  <div className="bg-canvas-subtle border border-border-grid p-sm rounded-lg flex flex-col">
                    <span className="font-label-code text-label-code text-text-muted">EVACUATION HUB</span>
                    <span className="font-mono text-body-sm text-text-primary font-bold truncate">
                      {payload.shelter}
                    </span>
                  </div>
                  <div className="bg-canvas-subtle border border-border-grid p-sm rounded-lg flex flex-col">
                    <span className="font-label-code text-label-code text-text-muted">HELPLINE DIAL</span>
                    <span className="font-mono text-body-sm text-primary font-bold">
                      {payload.helpline}
                    </span>
                  </div>
                  <div className="bg-canvas-subtle border border-border-grid p-sm rounded-lg flex flex-col">
                    <span className="font-label-code text-label-code text-text-muted">CELL BROADCAST REACH</span>
                    <span className="font-mono text-body-sm text-status-nominal font-bold">
                      {payload.reach}
                    </span>
                  </div>
                </div>

                {/* Dispatch Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-sm pt-sm border-t border-border-grid">
                  <div className="flex items-center gap-xs text-text-muted font-label-code text-label-code">
                    <span className="material-symbols-outlined text-status-nominal text-[16px]">
                      verified
                    </span>
                    <span>Cryptographically Signed via SHA-256 Authority Key</span>
                  </div>

                  <button
                    onClick={handleTransmitNDRF}
                    className={`font-body-sm text-body-sm font-semibold px-lg py-xs rounded-lg flex items-center gap-xs shadow-xs transition-colors cursor-pointer ${
                      selectedHazard.severity === 'critical'
                        ? 'bg-alert-critical hover:bg-red-700 text-white'
                        : 'bg-primary hover:bg-primary-container text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                    <span>Transmit Broadcast &amp; Alert NDRF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
