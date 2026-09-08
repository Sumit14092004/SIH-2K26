import React from 'react';

export default function ToastNotification({ show, title, message, icon = 'crisis_alert', onClose }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#dc2626] text-white px-md py-sm rounded-lg shadow-2xl flex items-center gap-sm transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-5">
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
      <div>
        <div className="font-headline-md text-body-sm font-bold tracking-tight">
          {title}
        </div>
        <div className="font-label-code text-label-code text-white/95">
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-sm text-white/80 hover:text-white transition-colors"
        title="Close Notification"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
