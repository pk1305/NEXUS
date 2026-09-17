import React from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Zap,
  Network,
  BarChart3,
  Database,
  Flame,
  ClipboardList,
  FileText,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Radio,
  ExternalLink,
} from 'lucide-react';

export type NavView =
  | 'overview'
  | 'map'
  | 'simulation'
  | 'dependencies'
  | 'risk'
  | 'critical_assets'
  | 'incidents'
  | 'response_planner'
  | 'reports';

interface SidebarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  activeIncidentsCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenWhatIf: () => void;
  onNavigateLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  activeIncidentsCount,
  isCollapsed,
  onToggleCollapse,
  onOpenWhatIf,
  onNavigateLanding,
}) => {
  const navItems: {
    id: NavView;
    label: string;
    icon: any;
    badge?: string | number;
    badgeType?: 'danger' | 'info' | 'highlight';
    isFeatured?: boolean;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Infrastructure Map', icon: MapIcon },
    {
      id: 'simulation',
      label: 'Failure Simulation',
      icon: Zap,
      badge: 'CORE SIM',
      badgeType: 'highlight',
      isFeatured: true,
    },
    { id: 'dependencies', label: 'Network Dependencies', icon: Network },
    { id: 'risk', label: 'Risk Analysis', icon: BarChart3 },
    { id: 'critical_assets', label: 'Critical Assets', icon: Database, badge: '2,486' },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: Flame,
      badge: activeIncidentsCount > 0 ? activeIncidentsCount : undefined,
      badgeType: 'danger',
    },
    { id: 'response_planner', label: 'Response Planner', icon: ClipboardList, badge: '5 Actions' },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <aside
      className="sidebar"
      style={{
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-normal)',
        zIndex: 40,
        flexShrink: 0,
        height: 'calc(100vh - var(--header-height))',
      }}
    >
      {/* Top Nav List */}
      <div style={{ padding: isCollapsed ? '12px 6px' : '16px 10px', overflowY: 'auto' }}>
        <div
          className="hud-header-tag"
          style={{
            padding: '0 8px 10px 8px',
            display: isCollapsed ? 'none' : 'flex',
          }}
        >
          <span>MISSION OPERATIONS</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                title={item.label}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  padding: isCollapsed ? '10px 0' : '9px 12px',
                  borderRadius: 6,
                  border: isActive
                    ? item.isFeatured
                      ? '1px solid var(--border-red)'
                      : '1px solid var(--border-cyan)'
                    : '1px solid transparent',
                  background: isActive
                    ? item.isFeatured
                      ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(12, 17, 26, 0.5) 100%)'
                      : 'linear-gradient(90deg, rgba(0, 229, 255, 0.15) 0%, rgba(12, 17, 26, 0.5) 100%)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      color: isActive
                        ? item.isFeatured
                          ? 'var(--color-critical)'
                          : 'var(--color-info)'
                        : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  {!isCollapsed && (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>

                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background:
                        item.badgeType === 'danger'
                          ? 'var(--color-critical-bg)'
                          : item.badgeType === 'highlight'
                          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(249, 115, 22, 0.4))'
                          : 'rgba(255, 255, 255, 0.08)',
                      border:
                        item.badgeType === 'danger'
                          ? '1px solid var(--color-critical-border)'
                          : item.badgeType === 'highlight'
                          ? '1px solid var(--color-critical)'
                          : '1px solid var(--border-subtle)',
                      color:
                        item.badgeType === 'danger'
                          ? 'var(--color-critical)'
                          : item.badgeType === 'highlight'
                          ? '#ffffff'
                          : 'var(--text-muted)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & System Info */}
      <div
        style={{
          padding: isCollapsed ? '12px 6px' : '14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        {!isCollapsed && (
          <div
            className="hud-card"
            style={{
              padding: 10,
              background: 'rgba(0, 229, 255, 0.04)',
              borderColor: 'var(--border-cyan)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>
                Multi-Node Stress Test
              </span>
              <span className="status-dot healthy" />
            </div>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>
              Simulate dual/triple cascading failures across grids.
            </p>
            <button
              onClick={onOpenWhatIf}
              className="btn btn-outline-cyan"
              style={{ width: '100%', padding: '4px 8px', fontSize: 11 }}
            >
              <SlidersHorizontal size={12} />
              <span>Launch "What-If"</span>
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onNavigateLanding}
            title="Landing Page Overview"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              padding: 4,
            }}
          >
            <ExternalLink size={13} />
            {!isCollapsed && <span>Landing Page</span>}
          </button>

          <button
            onClick={onToggleCollapse}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              borderRadius: 4,
              padding: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </div>
    </aside>
  );
};
