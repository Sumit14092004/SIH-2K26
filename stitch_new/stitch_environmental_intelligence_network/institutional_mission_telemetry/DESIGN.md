---
name: Institutional Mission Telemetry
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#40474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707881'
  outline-variant: '#c0c7d1'
  surface-tint: '#006399'
  primary: '#00507d'
  on-primary: '#ffffff'
  primary-container: '#0369a1'
  on-primary-container: '#cbe4ff'
  inverse-primary: '#94ccff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#392cd1'
  on-tertiary: '#ffffff'
  tertiary-container: '#534be9'
  on-tertiary-container: '#e1deff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  canvas-base: '#f8fafc'
  canvas-subtle: '#f1f5f9'
  surface-card: '#ffffff'
  border-grid: '#e2e8f0'
  border-strong: '#cbd5e1'
  text-primary: '#0f172a'
  text-secondary: '#334155'
  text-muted: '#64748b'
  alert-critical: '#dc2626'
  alert-critical-subtle: '#fef2f2'
  alert-warning: '#d97706'
  alert-warning-subtle: '#fffbeb'
  status-nominal: '#059669'
  status-nominal-subtle: '#ecfdf5'
  telemetry-cobalt: '#0284c7'
  telemetry-indigo: '#4f46e5'
typography:
  headline-xl:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  metric-display:
    fontFamily: JetBrains Mono
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.03em
  metric-label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  telemetry-unit:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.75rem
  xxl: 2.5rem
  gutter-dense: 0.5rem
  gutter-normal: 0.75rem
  sidebar-width: 18rem
  telemetry-rail: 22rem
---

## Brand & Style

The design system establishes an institutional-grade operational environment engineered for mission control, disaster response, and scientific telemetry monitoring. Built to serve emergency coordinators, meteorological analysts, and civil administrators, the UI shifts from dark neon-cyber aesthetics into an authoritative, daylight-optimized command console reminiscent of modern agency interfaces (e.g., Bloomberg, Palantir Foundry, ISRO, and NDMA).

The aesthetic combines **Corporate Precision** with **Tactical Telemetry**. It prioritizes immediate situational clarity, rigorous typographic hierarchy, and scannable tabular densities over stylistic novelty. The emotional register is calm, vigilant, trustworthy, and human-centered. Visual emphasis relies on stark chromatic alerts embedded into calm, light slate and pure white operational surfaces, ensuring continuous legibility under bright ambient room lighting.

## Colors

The palette transitions the interface to an uncompromising, clean institutional light-mode structure:

- **Canvas & Backdrops:** Global application background is anchored by `#F8FAFC` (cool crisp slate) with modular structural regions using `#F1F5F9`. This reduces eye fatigue while providing high contrast against foreground panels.
- **Surface Cards & Telemetry Panels:** Pure `#FFFFFF` surfaces bounded by crisp `#E2E8F0` structural outlines.
- **Typography Ink:** Deep navy `#0F172A` delivers optimal WCAG AAA reading contrast for data streams and headers; supporting annotations, labels, and secondary metadata use refined cool slates (`#334155` and `#64748b`).
- **Telemetry & Accents:**
  - **Cobalt & Institutional Blue (`#0369A1` / `#0284C7`):** Primary command actions, focal data lines, selected states, and geographic vectors.
  - **Deep Teal (`#0F766E`):** Environmental sensor lines, secondary instrumentation channels, and sensor telemetry.
  - **Precision Indigo / Violet (`#4F46E5`):** Micro-seismic feeds, inclinometer readouts, and algorithmic machine predictions.
- **Emergency Severity Channels:**
  - **Critical Alert (`#DC2626` / `#FEF2F2`):** Hazard thresholds, rapid-evacuation triggers, flash flood/cyclonic events.
  - **Watch / Warning (`#D97706` / `#FFFBEB`):** Elevation in baseline parameters, cautionary notices, advisory buffers.
  - **Nominal Baseline (`#059669` / `#ECFDF5`):** Stable sensor state, verified operational data.

## Typography

The typographic hierarchy implements an engineered separation between descriptive command interface elements and numerical instrumentation data:

- **IBM Plex Sans** provides clinical neutrality and high legibility across navigational labels, station headers, alert dialogues, and contextual descriptions.
- **JetBrains Mono** is enforced for all numerical telemetry readouts, coordinates (lat/long), timestamps (UTC/IST), tabular reports, and telemetry units. Monospaced tabular alignment guarantees numerical tables and rolling live-sensor readouts never oscillate horizontally during live updates.
- Micro-labels, station call-signs, and metric headers use uppercase styling with positive letter spacing (`0.05em` to `0.06em`) for rapid visual scanning across tactical operations screens.

## Layout & Spacing

The design system enforces a dense, high-utility fluid grid calibrated for data-heavy workstations, multi-display command centres, and tactical portable tablets:

- **Rhythm & Grid:** Built on an uncompromising 4px/8px modular base rhythm. Margin spacing prioritizes density and visibility of multiple live streams simultaneously, minimizing wasted white space while preserving structural air.
- **Desktop & Command Displays (≥ 1280px):** Employs a three-pane architectural model: fixed navigation and station switcher on the left (`sidebar-width`), central responsive workspace (GIS maps, multi-sensor grids, interactive line-matrix graphs), and a collapsible telemetry rail on the right (`telemetry-rail`).
- **Tablet / Responsive Consoles (768px – 1279px):** Peripheral telemetry collapses into slide-over drawers or horizontal docked panels; data tables switch to horizontally scrollable segmented views.
- **Mobile Field Operations (< 768px):** Linear single-column stack with sticky persistent emergency severity bars at top, simplified card views, and bottom-docked quick-filter toolbars.

## Elevation & Depth

To sustain the look of an institutional workstation (avoiding fuzzy consumer drop shadows), depth is structured through **crisp low-contrast outlines paired with microscopic surface elevations**:

- **Level 0 (Canvas Base):** Flat `#F8FAFC`, non-elevated background for geospatial maps and tool rails.
- **Level 1 (Telemetry Panels & Instrument Cards):** Pure `#FFFFFF` background bound by a 1px crisp outline of `#E2E8F0` with a subtle technical elevation: `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05)`.
- **Level 2 (Active Inspection & Hover State):** Border reinforces to `#CBD5E1`, with elevation `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Command Modals & Context Menus):** Pure `#FFFFFF` container with 1px `#CBD5E1` border and elevation `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)`.
- **Active Emergency Elevation:** Panels displaying critical warnings replace subtle shadows with a persistent, sharp 1px `#DC2626` outline and a pale emergency glow (`box-shadow: 0 0 0 1px #DC2626, 0 1px 3px rgba(220, 38, 38, 0.1)`).

## Shapes

The design system uses an industrial, compact geometry (`roundedness: 1`):

- **Structural UI Surfaces:** Panels, metric cells, input fields, data tables, and operational banners utilize a strict `0.25rem` (4px) or `0.375rem` (6px) corner radius, reinforcing an analytical, physical instrument feel.
- **Badges and Sensor Pills:** Threat tags, status pills, and coordinate badges utilize full pill rounding (`9999px`) to create immediate silhouette distinction between operational containers and transient status metadata.

## Components

### Buttons
- **Primary Operational Action:** Solid `#0369A1` background, `#FFFFFF` text, bold weight (`IBM Plex Sans`, 13px), 4px radius. Focus ring: `2px solid #0284C7` with a 2px `#FFFFFF` offset.
- **Secondary / Technical Button:** Pure `#FFFFFF` surface, 1px `#CBD5E1` border, `#334155` text. On hover: `#F8FAFC` surface with `#0F172A` text and `#94A3B8` border.
- **Critical Action Button:** Solid `#DC2626` background, `#FFFFFF` text. Reserved strictly for emergency broadcasts, siren activations, and manual alert overrides.
- **Toolbar & Icon Buttons:** Ghost styling with `#475569` iconography, rendering `#F1F5F9` background on hover.

### Telemetry Cards & Metric Blocks
- Pure white `#FFFFFF` surface, 1px `#E2E8F0` border, 4px border radius, padding 12px 16px.
- **Header:** Station code or telemetry sensor ID in `JetBrains Mono` (`label-code`, uppercase) in `#64748B`, paired with a live status dot.
- **Body:** Large data readout in `metric-display` (`#0F172A`), immediate baseline unit (`telemetry-unit`, `#64748B`), and an inline vector delta (+/-) indicating 1-hour change.
- **Footer:** Hairline sparkline chart rendered with `#0284C7` (or `#4F46E5` for micro-seismic sensors), set over light horizontal reference grid lines (`#F1F5F9`).

### Status Badges & Alert Chips
- Height: 22px. Padding: 2px 8px. Font: `JetBrains Mono`, 11px, weight 600, uppercase.
- **Nominal:** `#ECFDF5` background, 1px `#A7F3D0` border, `#065F46` text. 6px solid emerald indicator dot.
- **Warning:** `#FFFBEB` background, 1px `#FDE68A` border, `#92400E` text. 6px amber indicator dot.
- **Critical Alert:** `#FEF2F2` background, 1px `#FECACA` border, `#991B1B` text. Active flashing beacon indicator.
- **Inclinometer / Seismic Mode:** `#EEF2FF` background, 1px `#C7D2FE` border, `#3730A3` text.

### Data Grids & Telemetry Tables
- Header cells: `#F8FAFC` background, 1px bottom border `#CBD5E1`, text uppercase `JetBrains Mono` (11px, `#475569`, bold).
- Data rows: `#FFFFFF` alternate background with `#F8FAFC` zebra striping on dense tables; 1px horizontal borders in `#E2E8F0`. Hover row: `#F1F5F9`.
- Cell figures: Tabular lining numbers in `JetBrains Mono` (13px, `#0F172A`).

### Inputs, Threshold Selectors & Toggles
- **Inputs:** `#FFFFFF` fill, 1px `#CBD5E1` border, 4px radius. Text in `JetBrains Mono` 13px (`#0F172A`). Focused: `1px solid #0369A1` with `box-shadow: 0 0 0 2px rgba(3, 105, 161, 0.15)`.
- **Checkboxes & Radios:** 16x16px, 1px `#94A3B8` border, checked state delivers solid `#0369A1` with crisp white indicator check.
- **Segmented Console Controls:** Contained horizontal strip with `#F1F5F9` background, 1px `#E2E8F0` border; active selection shifts to `#FFFFFF` with `#0F172A` text and subtle card shadow.