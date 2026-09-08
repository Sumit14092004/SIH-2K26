import React from 'react';
import TopHeader from './TopHeader';
import SideNav from './SideNav';

export default function ShellLayout({
  activePath,
  onNavigate,
  onBroadcastClick,
  onInspectNode,
  children
}) {
  return (
    <div className="min-h-screen bg-canvas-base text-text-primary font-sans antialiased">
      {/* Fixed Institutional Top Header */}
      <TopHeader
        activePath={activePath}
        onNavigate={onNavigate}
        onBroadcastClick={onBroadcastClick}
        onInspectNode={onInspectNode}
      />

      {/* Fixed Tactical Sidebar Navigation */}
      <SideNav
        activePath={activePath}
        onNavigate={onNavigate}
      />

      {/* Responsive Main Content Area */}
      <div className="xl:pl-sidebar-width w-full">
        <main className="relative pt-20 w-full px-gutter-normal bg-canvas-base min-h-screen">
          <div className="flex flex-col w-full space-y-xs pb-xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
