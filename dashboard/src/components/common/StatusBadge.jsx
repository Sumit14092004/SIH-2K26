import React from 'react';

export default function StatusBadge({ status, label, pulse = false }) {
  const styles = {
    critical: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    nominal: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    seismic: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    primary: 'bg-sky-50 border-sky-200 text-[#00507d]',
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
