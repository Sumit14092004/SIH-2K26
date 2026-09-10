import React, { useState } from 'react';
import { useHazardAlerts } from '../context/HazardAlertContext';

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
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredFeed = activeAlerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

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
      `CAP-v1.2 Public Alert Broadcast transmitted to ${payload.reach} for ${selectedHazard.location}.`,
      true,
      'CAP_BROADCAST',
      selectedHazard.severity
    );
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-2">
      {/* 1. Header Banner */}
      <div className="bg-surface border border-subtle rounded-md px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-surface-alt border border-subtle flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">notification_important</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xs font-semibold text-primary">
              CAP-v1.2 Emergency Broadcast Gateway
            </h1>
            <span className="font-mono text-[10px] text-muted bg-surface-alt border border-subtle px-1.5 py-0.2 rounded">
              {activeAlerts.length} Active Feeds
            </span>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1 text-2xs font-mono">
          <span className="text-muted font-medium">TIER:</span>
          <div className="flex items-center bg-surface-alt border border-subtle p-0.5 rounded gap-0.5">
            {['ALL', 'CRITICAL', 'ABNORMAL', 'WARNING'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterSeverity(tier)}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  filterSeverity === tier
                    ? 'bg-accent text-accent-contrast font-medium'
                    : 'text-muted hover:text-primary'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Viewport Grid (100% Screen Fit) */}
      {filteredFeed.length === 0 ? (
        <div className="bg-surface border border-subtle rounded-md flex-1 min-h-0 flex flex-col items-center justify-center text-center p-6 gap-2">
          <span className="material-symbols-outlined text-status-nominal text-[36px]">check_circle</span>
          <h3 className="text-xs font-semibold text-primary">All Monitored Sectors Nominal</h3>
          <p className="text-2xs text-muted max-w-sm">
            Zero active emergency broadcasts required. All canonical stations operating within baseline bounds.
          </p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-2.5 items-stretch">
          {/* Left Column: Active Broadcast List (Col 5) */}
          <div className="xl:col-span-5 bg-surface border border-subtle rounded-md p-2.5 flex flex-col h-full min-h-0">
            <div className="flex items-center justify-between pb-1.5 border-b border-subtle shrink-0 mb-1.5">
              <span className="font-mono text-[10.5px] text-muted uppercase font-medium">
                Active Hazard Broadcasts ({filteredFeed.length})
              </span>
              <span className="font-mono text-[10px] text-muted">SELECT TO PREVIEW</span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1">
              {filteredFeed.map((hazard) => {
                const isSelected = hazard.id === effectiveNodeId;
                const isCrit = hazard.severity === 'critical';
                const isAbn = hazard.severity === 'abnormal';

                return (
                  <div
                    key={hazard.id}
                    onClick={() => setSelectedNodeId(hazard.id)}
                    className={`border rounded p-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-accent bg-surface-alt/60'
                        : 'border-subtle bg-surface hover:bg-surface-alt/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isCrit ? 'bg-status-critical' : isAbn ? 'bg-amber-500' : 'bg-status-warning'
                          }`}
                        />
                        <span className="font-mono text-[10.5px] text-secondary bg-surface-alt border border-subtle px-1 py-0.2 rounded font-medium">
                          {hazard.displayId || hazard.id}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[9.5px] px-1.5 py-0.2 rounded uppercase font-medium border ${
                          isCrit
                            ? 'bg-status-critical/10 text-status-critical border-status-critical/20'
                            : isAbn
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                            : 'bg-status-warning/10 text-status-warning border-status-warning/20'
                        }`}
                      >
                        {(hazard.severity || 'warning').toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-medium text-primary text-xs truncate">{hazard.location}</h4>
                    <p className="font-mono text-[10.5px] text-secondary truncate mt-0.5">
                      {hazard.hazard} &middot; <strong className="text-primary font-medium">{hazard.keyMetric}</strong>
                    </p>

                    <div className="flex items-center justify-between pt-1 mt-1 border-t border-subtle text-[10px] font-mono text-muted">
                      <span>Updated: {hazard.lastUpdated}</span>
                      <span className="text-accent font-medium">VIEW CAP →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live CAP Console with Language Switcher (Col 7) */}
          {selectedHazard && payload && (
            <div className="xl:col-span-7 bg-surface border border-subtle rounded-md p-3 flex flex-col justify-between h-full min-h-0">
              <div className="flex flex-col gap-2">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-subtle">
                  <div>
                    <span className="font-mono text-[10px] text-muted font-medium uppercase">
                      ACTIVE CAP PAYLOAD // {selectedHazard.displayId || selectedHazard.id}
                    </span>
                    <h2 className="text-sm font-semibold text-primary mt-0.5 truncate">
                      {selectedHazard.location}
                    </h2>
                    <span className="text-2xs text-secondary">
                      Threat Vector: <strong className="text-primary font-medium">{selectedHazard.hazard}</strong> ({selectedHazard.keyMetric})
                    </span>
                  </div>

                  {/* Bilingual Language Switcher + Audience Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center bg-surface-alt border border-subtle p-0.5 rounded text-2xs font-mono">
                      <button
                        onClick={() => setLanguage('en')}
                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          language === 'en'
                            ? 'bg-accent text-accent-contrast font-medium'
                            : 'text-muted hover:text-primary'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage('hi')}
                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          language === 'hi'
                            ? 'bg-accent text-accent-contrast font-medium'
                            : 'text-muted hover:text-primary'
                        }`}
                      >
                        हिन्दी
                      </button>
                    </div>

                    <div className="flex items-center bg-surface-alt border border-subtle p-0.5 rounded text-2xs">
                      <button
                        onClick={() => setAudience('civic')}
                        className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                          audience === 'civic' ? 'bg-accent text-accent-contrast' : 'text-muted hover:text-primary'
                        }`}
                      >
                        Civic
                      </button>
                      <button
                        onClick={() => setAudience('auth')}
                        className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                          audience === 'auth' ? 'bg-accent text-accent-contrast' : 'text-muted hover:text-primary'
                        }`}
                      >
                        NDRF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Language Transmission Card (Compact with Read More) */}
                <div className="bg-surface-alt/60 border border-subtle rounded p-2.5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] text-muted font-medium uppercase">
                      {language === 'en' ? 'PRIMARY OFFICIAL PAYLOAD (ENGLISH)' : 'REGIONAL EMERGENCY PAYLOAD (HINDI)'}
                    </span>
                    <button
                      onClick={() => handleCopy(language === 'en' ? payload.en : payload.hi, language)}
                      className="text-secondary hover:text-primary text-2xs font-mono font-medium flex items-center gap-1 border border-subtle px-1.5 py-0.2 rounded bg-surface transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {copiedKey === language ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedKey === language ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className={`text-xs text-primary leading-relaxed ${isTextExpanded ? '' : 'line-clamp-2'}`}>
                    {language === 'en' ? payload.en : payload.hi}
                  </p>

                  <button
                    onClick={() => setIsTextExpanded((prev) => !prev)}
                    className="text-2xs text-accent font-medium hover:underline self-start cursor-pointer mt-0.5"
                  >
                    {isTextExpanded ? 'Show less' : 'Read full advisory text'}
                  </button>
                </div>

                {/* Logistics & Shelter Parameters */}
                <div className="grid grid-cols-3 gap-2 text-2xs font-mono">
                  <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col">
                    <span className="text-[10px] text-muted">EVACUATION HUB</span>
                    <span className="text-primary font-medium truncate mt-0.5">{payload.shelter}</span>
                  </div>
                  <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col">
                    <span className="text-[10px] text-muted">HELPLINE DIAL</span>
                    <span className="text-primary font-medium mt-0.5">{payload.helpline}</span>
                  </div>
                  <div className="bg-surface-alt/60 border border-subtle p-2 rounded flex flex-col">
                    <span className="text-[10px] text-muted">EST. CELL REACH</span>
                    <span className="text-status-nominal font-medium mt-0.5">{payload.reach}</span>
                  </div>
                </div>
              </div>

              {/* Transmission Footer */}
              <div className="pt-2 border-t border-subtle flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-muted font-mono text-[10.5px]">
                  <span className="material-symbols-outlined text-status-nominal text-[15px]">verified</span>
                  <span>CAP-v1.2 Signed via SHA-256 Authority Key</span>
                </div>

                <button
                  onClick={handleTransmitNDRF}
                  className={`text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                    selectedHazard.severity === 'critical'
                      ? 'bg-status-critical hover:bg-status-critical/90 text-white'
                      : 'bg-accent hover:bg-accent-hover text-accent-contrast'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">cell_tower</span>
                  <span>Transmit Broadcast &amp; Alert NDRF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
