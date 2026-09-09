import React, { useState } from 'react';
import TopHeader from './TopHeader';
import CollapsibleSidebar from './CollapsibleSidebar';

export default function ShellLayout({
  activePath,
  onNavigate,
  onBroadcastClick,
  onInspectNode,
  children
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-primary font-sans antialiased">
      {/* Collapsible Left Vertical Navigation Sidebar */}
      <CollapsibleSidebar
        activePath={activePath}
        onNavigate={onNavigate}
        onBroadcastClick={onBroadcastClick}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      {/* Modern Top Header */}
      <TopHeader
        activePath={activePath}
        onNavigate={onNavigate}
        onBroadcastClick={onBroadcastClick}
        onInspectNode={onInspectNode}
        isCollapsed={isCollapsed}
      />

      {/* Main Content Viewport */}
      <div
        className={`w-full transition-all duration-300 h-screen overflow-hidden ${
          isCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        <main className="relative pt-12 w-full h-full p-2.5 bg-canvas flex flex-col box-border overflow-hidden">
          <div className="flex flex-col w-full h-full min-h-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
