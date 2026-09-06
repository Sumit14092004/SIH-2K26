---
name: Environmental Intelligence Network
colors:
  surface: '#0f131f'
  surface-dim: '#0f131f'
  surface-bright: '#353946'
  surface-container-lowest: '#0a0e1a'
  surface-container-low: '#171b28'
  surface-container: '#1b1f2c'
  surface-container-high: '#262a37'
  surface-container-highest: '#313442'
  on-surface: '#dfe2f3'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe2f3'
  inverse-on-surface: '#2c303d'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#6af7ba'
  on-tertiary: '#003824'
  tertiary-container: '#49da9f'
  on-tertiary-container: '#005c3e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131f'
  on-background: '#dfe2f3'
  surface-variant: '#313442'
  surface-base: '#0A0E1A'
  surface-card: '#141C2E'
  surface-elevated: '#1A2233'
  surface-overlay: '#222C42'
  border-subtle: '#25314C'
  border-glow: '#00D4FF33'
  hazard-critical: '#FF3B30'
  hazard-warning: '#FF6B35'
  status-nominal: '#10B981'
  edge-ai: '#8B5CF6'
  telemetry-cyan: '#00D4FF'
  text-primary: '#F1F5F9'
  text-secondary: '#94A3B8'
  text-muted: '#475569'
typography:
  headline-xl:
    fontFamily: IBM Plex Sans
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.03em
  metric-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  telemetry-unit:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.08em
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
  lg: 1.5rem
  xl: 2rem
  xxl: 3rem
  gutter-dense: 0.75rem
  gutter-normal: 1rem
  sidebar-width: 18rem
  telemetry-rail: 22rem
---

## Brand & Style

The design system is engineered for mission-critical environmental intelligence, planetary telemetry, and acute hazard response across India's micro-climates. Operating in high-stress command rooms, research labs, and field monitoring setups, the visual language merges absolute instrumental precision with tactical clarity. It evokes vigilance, unyielding dependability, and computational authority.

Drawing from tactical brutalism and high-density telemetry dashboards, the interface eliminates frivolous decorative embellishment. Visual priority is dictated strictly by telemetry severity: nominal states recede into disciplined, low-emissive dark surfaces, while acute ecological anomalies (air quality spikes, cyclonic shifts, extreme heat vectors) command immediate cognitive attention with high-contrast, laser-focused chromatic signals. Precision lines, calibrated glows, and monospaced telemetry clusters ensure rapid situational awareness across dense computational monitors.

## Colors

The color architecture is built exclusively for a continuous dark telemetry environment. Canvas levels are anchored by `#0A0E1A` (deep void), which prevents operator eye fatigue during continuous shifts while ensuring deep black contrast for geospatial rasters and satellite layers. Elevated container surfaces step up tonally to `#141C2E` and `#1A2233` to delineate modular monitoring pods without relying on heavy solid fills.

Chromatically, colors communicate functional system states:
- **Telemetry Cyan (`#00D4FF`)**: Primary brand action, active instrument selections, focal data streams, and targeted sensor coordinates.
- **Edge-AI Purple (`#8B5CF6`)**: Neural inference layers, automated predictive models, and synthetic forecasting feeds.
- **Nominal Emerald (`#10B981`)**: Stable sensor thresholds, clean AQI, optimal atmospheric balance.
- **Warning Amber (`#FF6B35`)**: Pre-hazard anomalies, particulate thresholds exceeding baseline standard, advisory warnings.
- **Critical Red (`#FF3B30`)**: Acute hazard triggers, flood/cyclone vectors, toxic emission spikes requiring instant dispatch protocol.

## Typography

The typographic hierarchy separates semantic UI controls from quantitative instrumentation. **IBM Plex Sans** is assigned to navigational labels, headers, and descriptive operational statuses due to its engineered grotesk clarity and human-readable neutral posture.

**JetBrains Mono** is mandatory for all numerical readouts, geodetic coordinates (lat/long), timestamp intervals (IST/UTC), micro-metrics, and system telemetry feeds. Tabular figures prevent layout jumping during high-frequency live data streams. Letter spacing on telemetry labels is widened (`0.04em` to `0.08em`) to guarantee quick character scannability across multi-screen matrix setups.

## Layout & Spacing

The layout employs a high-density, 12-column fluid grid system engineered for full-bleed command displays. Spacing relies on a rigid 4px/8px modular base rhythm, prioritizing compact information density over open breathing room. 

- **Desktop & Command Centers (≥ 1440px):** Fixed utility rails on flanks (`sidebar-width` left, `telemetry-rail` right) framing an interactive vector-map canvas or centralized GIS raster. Interior cards adhere to a uniform 12px gutter system (`gutter-dense`), packing telemetry streams with minimal wasted screen surface.
- **Tablet / Secondary Terminals (768px – 1439px):** Peripheral telemetry rails collapse into contextual flyout panels; monitoring pods reflow into a balanced 2-column card architecture.
- **Mobile Handheld Field Units (< 768px):** Structural columns collapse into a linear single-column flow with a persistent top threat bar and segmented operational sheets.

## Elevation & Depth

Visual hierarchy does not rely on diffused drop shadows, which can muddy dense data interfaces. Instead, the design system implements structural tonal layering paired with crisp hairline borders and laser-focused luminescent accents.

- **Level 0 (Base Canvas):** Solid `#0A0E1A`, forming the bottom geospatial substrate.
- **Level 1 (Telemetry Panels & Surface Cards):** `#141C2E` framed with a 1px border of `#25314C`.
- **Level 2 (Active Inspections / Hovered Tiles):** `#1A2233` with a 1px border of `#00D4FF33` and an ambient glow (`box-shadow: 0 0 16px -2px rgba(0, 212, 255, 0.15)`).
- **Critical Alert State (Threat Overrides):** Elevated container perimeter shifts to a sharp 1px `#FF3B30` border with a subtle rhythmic red pulse (`box-shadow: 0 0 12px rgba(255, 59, 48, 0.25)`).
- **Overlays & Modals:** `#222C42` backed by `backdrop-filter: blur(12px)` over a 60% opacity base mask.

## Shapes

The design system enforces an industrial, utilitarian geometry. Surface containers, metric blocks, and status modules utilize a tight 4px border radius (`roundedness: 1`), conveying structural integrity and instrument-grade precision. 

The sole departure from this sharp, rectilinear discipline occurs in contextual status pills and sensor tags, which adopt full circular pills (`9999px`) to create immediate visual distinction between interactive status badges and structural data containers.

## Components

### Buttons
- **Primary Telemetry Button:** Solid `#00D4FF` fill with `#0A0E1A` high-contrast typography in bold weight (`IBM Plex Sans`, 13px). Active press scales to `0.98`. Focus outlines apply a `2px solid #00D4FF` ring offset by 2px `#0A0E1A`.
- **Secondary / Ghost Button:** Transparent fill, `#25314C` border, `#94A3B8` text. On hover, shifts to `#1A2233` background with `#00D4FF` text and matching border tint.
- **Threat Mitigation Action:** Solid `#FF3B30` with `#FFFFFF` text, reserved solely for emergency broadcast transmissions, lockdown overrides, or manual sensor recalibration.

### Telemetry Cards
- Encapsulated within `#141C2E` background and 1px `#25314C` stroke.
- Header contains uppercase station code and region ID in `JetBrains Mono` (`label-code`) with a status indicator beacon.
- Body displays a primary numerical metric (`metric-display`) flanked by its scientific unit symbol (`telemetry-unit`) and a mini-sparkline or rolling telemetry histogram.

### Precision Pills & Threat Badges
- Height: 20px to 24px. Border-radius: `9999px`.
- Padding: 2px 8px. Font: `JetBrains Mono`, 11px, uppercase.
- Variants:
  - **Nominal:** `#10B9811A` background, 1px `#10B9814D` border, `#10B981` text with a 6px static green indicator dot.
  - **Warning:** `#FF6B351A` background, 1px `#FF6B354D` border, `#FF6B35` text.
  - **Critical:** `#FF3B301A` background, 1px `#FF3B3080` border, `#FF3B30` text with an intermittent flashing radar dot.
  - **AI Model:** `#8B5CF61A` background, 1px `#8B5CF64D` border, `#8B5CF6` text.

### Input Fields & Selectors
- Background: `#0A0E1A`, 1px `#25314C` outline, `rounded-sm` (4px).
- Internal padding: 8px 12px. Text set in `JetBrains Mono` 13px for coordinate, date, or threshold search inputs.
- Active/Focus: Border transitions to `#00D4FF` with an inner glow.

### Checkboxes & Segmented Controls
- Checkboxes: 16x16px square, `#141C2E` fill, `#25314C` perimeter. Checked state delivers `#00D4FF` solid fill with `#0A0E1A` check glyph.
- Segmented Matrix Controls: Contained group with `#0A0E1A` track; active item renders with `#1A2233` surface and `#00D4FF` bottom hairline indicator.