/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme Surfaces & Canvas (dynamically swapped via CSS variables)
        "canvas": "var(--bg-canvas)",
        "surface": "var(--bg-surface)",
        "surface-alt": "var(--bg-surface-alt)",
        "surface-card": "var(--bg-surface)",
        "surface-raised": "var(--bg-surface-alt)",
        "canvas-base": "var(--bg-canvas)",
        "canvas-subtle": "var(--bg-surface-alt)",

        // Hairline Borders & Dividers
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        "border-grid": "var(--border-subtle)",
        "outline": "var(--border-strong)",
        "outline-variant": "var(--border-subtle)",

        // High-Contrast Restrained Typography
        "primary": "var(--text-primary)",
        "secondary": "var(--text-muted)",
        "muted": "var(--text-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-muted)",
        "text-muted": "var(--text-muted)",
        "on-surface": "var(--text-primary)",
        "on-surface-variant": "var(--text-muted)",
        "background": "var(--bg-canvas)",
        "on-background": "var(--text-primary)",

        // Calm Institutional Blue Accent (Zero Neon)
        "accent": "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-subtle": "var(--accent-subtle)",
        "accent-contrast": "#ffffff",
        "on-primary": "#ffffff",
        "primary-container": "var(--accent-subtle)",
        "on-primary-container": "var(--accent)",
        "inverse-primary": "var(--accent)",
        "surface-tint": "var(--accent)",

        // Muted Semantic Severity Alerts (Desaturated, Zero Neon)
        "alert-critical": "var(--status-critical)",
        "alert-critical-subtle": "var(--status-critical-bg)",
        "alert-warning": "var(--status-warning)",
        "alert-warning-subtle": "var(--status-warning-bg)",
        "status-nominal": "var(--status-nominal)",
        "status-nominal-subtle": "var(--status-nominal-bg)",

        // Legacy compatibility aliases
        "telemetry-cobalt": "var(--accent)",
        "telemetry-indigo": "var(--accent)",
        "error": "var(--status-critical)",
        "on-error": "#ffffff",
      },
      spacing: {
        xxs: "2px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        DEFAULT: "6px",
        md: "8px",
        lg: "8px",
        xl: "8px",
        "2xl": "8px",
        full: "9999px"
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "2xs": ["0.75rem", { lineHeight: "1rem" }],        // 12px
        "xs": ["0.8125rem", { lineHeight: "1.125rem" }],  // 13px
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],    // 14px
        "base": ["0.9375rem", { lineHeight: "1.375rem" }],// 15px
        "lg": ["1.0625rem", { lineHeight: "1.5rem" }],    // 17px
        "xl": ["1.1875rem", { lineHeight: "1.625rem" }],  // 19px
        "2xl": ["1.375rem", { lineHeight: "1.75rem" }],   // 22px
        "3xl": ["1.625rem", { lineHeight: "2rem" }],      // 26px
      },
      boxShadow: {
        none: "none",
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }
    }
  },
  plugins: [],
}
