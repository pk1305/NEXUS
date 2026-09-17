import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/layout/TopHeader';
import { NavigationSubnav, NavView } from './components/layout/NavigationSubnav';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { CopilotDrawer } from './components/layout/CopilotDrawer';
import { NodeDetailDrawer } from './components/common/NodeDetailDrawer';
import { WhatIfScenarioModal } from './components/views/WhatIfScenarioModal';
import { LandingPage } from './components/landing/LandingPage';

// Views
import { OverviewDashboard } from './components/views/OverviewDashboard';
import { InfrastructureMapView } from './components/views/InfrastructureMapView';
import { FailureSimulationView } from './components/views/FailureSimulationView';
import { NetworkDependenciesView } from './components/views/NetworkDependenciesView';
import { RiskAnalysisView } from './components/views/RiskAnalysisView';
import { CriticalAssetsView } from './components/views/CriticalAssetsView';
import { IncidentsView } from './components/views/IncidentsView';
import { ResponsePlannerView } from './components/views/ResponsePlannerView';
import { ReportsView } from './components/views/ReportsView';
import { ScenarioComparisonView } from './components/views/ScenarioComparisonView';

import { NotificationItem } from './types/infrastructure';
import { INITIAL_INCIDENTS } from './data/initialIncidents';

export function App() {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<NavView>('overview');

  // Modals and drawers state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState<boolean>(false);

  // Inspected node
  const [inspectedAssetId, setInspectedAssetId] = useState<string | null>(null);

  // Target asset for Failure Simulation
  const [simulationTargetAssetId, setSimulationTargetAssetId] = useState<string>('B-17');

  // Notifications feed
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'critical',
      title: 'Structural Integrity Warning',
      message: 'Bridge B-17 east cable anchor acoustic stress detected. Lane restrictions recommended to preserve emergency transit.',
      timeAgo: '2 minutes ago',
      assetId: 'B-17',
      unread: true,
    },
    {
      id: 'notif-2',
      type: 'warning',
      title: 'Transformer Thermal Advisory',
      message: 'Power Station P-03 transformer thermal load rose to 61%. Substation S-07 monitoring engaged.',
      timeAgo: '12 minutes ago',
      assetId: 'P-03',
      unread: true,
    },
    {
      id: 'notif-3',
      type: 'info',
      title: 'Inspection Completed',
      message: 'Routine drone LiDAR scan completed across Central District transit arterial.',
      timeAgo: '45 minutes ago',
      unread: false,
    },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const activeIncidentsCount = INITIAL_INCIDENTS.filter((i) => i.status === 'ACTIVE').length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSelectAssetForSimulation = (assetId: string) => {
    setSimulationTargetAssetId(assetId);
    setCurrentView('simulation');
    setIsLandingPage(false);
  };

  const handleSelectNotificationAsset = (assetId: string) => {
    setInspectedAssetId(assetId);
  };

  if (isLandingPage) {
    return (
      <LandingPage
        onEnterCommandCenter={() => {
          setIsLandingPage(false);
          setCurrentView('overview');
        }}
        onRunSimulationQuick={() => {
          setIsLandingPage(false);
          setSimulationTargetAssetId('B-17');
          setCurrentView('simulation');
        }}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Top Header */}
      <TopHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleNotifications={() => setIsNotificationsOpen((prev) => !prev)}
        onToggleCopilot={() => setIsCopilotOpen((prev) => !prev)}
        onOpenWhatIf={() => setIsWhatIfOpen(true)}
        onNavigateHome={() => setIsLandingPage(true)}
        unreadAlertsCount={unreadCount}
        activeIncidentsCount={activeIncidentsCount}
        isCopilotOpen={isCopilotOpen}
      />

      {/* Clean Secondary Horizontal Navigation */}
      <NavigationSubnav
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        activeIncidentsCount={activeIncidentsCount}
      />

      {/* Main Viewport */}
      <div className="main-viewport">
        {currentView === 'overview' && (
          <OverviewDashboard
            onNavigate={(v) => setCurrentView(v)}
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onOpenWhatIf={() => setCurrentView('compare')}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'map' && (
          <InfrastructureMapView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'simulation' && (
          <FailureSimulationView
            selectedAssetId={simulationTargetAssetId}
            onNavigateToResponsePlanner={() => setCurrentView('response_planner')}
            onNavigateToReports={() => setCurrentView('reports')}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'dependencies' && (
          <NetworkDependenciesView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'compare' && (
          <ScenarioComparisonView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
          />
        )}

        {currentView === 'risk' && (
          <RiskAnalysisView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'critical_assets' && (
          <CriticalAssetsView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'incidents' && (
          <IncidentsView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onNavigateToResponsePlanner={() => setCurrentView('response_planner')}
            onSelectNodeDetail={(id) => setInspectedAssetId(id)}
          />
        )}

        {currentView === 'response_planner' && (
          <ResponsePlannerView
            onSelectAssetForSimulation={handleSelectAssetForSimulation}
            onNavigateToReports={() => setCurrentView('reports')}
          />
        )}

        {currentView === 'reports' && (
          <ReportsView onSelectAssetForSimulation={handleSelectAssetForSimulation} />
        )}
      </div>

      {/* Global Drawers & Modals */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onSelectNotificationAsset={handleSelectNotificationAsset}
        onMarkAllRead={handleMarkAllRead}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAsset={(id) => setInspectedAssetId(id)}
        onSelectIncident={() => setCurrentView('incidents')}
        onRunSimulation={handleSelectAssetForSimulation}
      />

      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onRunSimulation={handleSelectAssetForSimulation}
      />

      <NodeDetailDrawer
        assetId={inspectedAssetId}
        onClose={() => setInspectedAssetId(null)}
        onSelectOtherAsset={(id) => setInspectedAssetId(id)}
        onRunSimulation={handleSelectAssetForSimulation}
      />

      <WhatIfScenarioModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        onSelectAssetForSimulation={handleSelectAssetForSimulation}
      />
    </div>
  );
}

export default App;
