import React from 'react';

/**
 * NavTab Component
 * 
 * A reusable, tactical navigation button/pill with:
 * - Distinct button/pill treatment with tokenized padding and rounded corners
 * - Default, hover, active, and accessible focus states
 * - Full hit-area clickability
 * - Active state distinction with filled primary styling
 */
export default function NavTab({ id, label, isActive, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      id={`nav-tab-${id}`}
      aria-selected={isActive}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-1.5 px-3 py-1 md:px-3.5 md:py-1.5 text-xs md:text-sm whitespace-nowrap rounded-lg border transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-surface-card ${
        isActive
          ? 'bg-primary text-white border-primary shadow-xs font-semibold'
          : 'bg-surface-container/60 hover:bg-surface-container-high text-text-secondary hover:text-text-primary border-border-grid hover:border-border-strong'
      }`}
    >
      {/* Active state indicator dot */}
      {isActive && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse-subtle shrink-0"
          aria-hidden="true"
        />
      )}
      
      <span className="truncate">{label}</span>
    </button>
  );
}
