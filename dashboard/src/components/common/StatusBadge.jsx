import React from 'react';

export default function StatusBadge({ status, label, pulse = false }) {
  const styles = {
    critical: 'bg-red-950/60 border-red-500/40 text-red-400',
    warning: 'bg-amber-950/60 border-amber-500/40 text-amber-400',
    nominal: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
    seismic: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-400',
    primary: 'bg-sky-950/60 border-sky-500/40 text-sky-400',
  };

  const styleClass = styles[status] || styles.primary;

  return (
    <span className={`font-label-code text-label-code px-xs py-0.5 rounded font-semibold border inline-flex items-center gap-1 ${styleClass}`}>
      {pulse && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            status === 'critical'
              ? 'bg-[#dc2626] animate-pulse'
              : status === 'nominal'
              ? 'bg-emerald-600'
              : 'bg-amber-500'
          }`}
        />
      )}
      {label}
    </span>
  );
}
