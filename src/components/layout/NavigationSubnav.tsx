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
  GitCompare,
  SlidersHorizontal,
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
  | 'reports'
  | 'compare';

interface NavigationSubnavProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  activeIncidentsCount: number;
}

export const NavigationSubnav: React.FC<NavigationSubnavProps> = ({
  currentView,
  onSelectView,
  activeIncidentsCount,
}) => {
  const navItems: {
    id: NavView;
    label: string;
    icon: any;
    badge?: string | number;
    badgeType?: 'danger' | 'info' | 'highlight';
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Infrastructure Map', icon: MapIcon },
    { id: 'simulation', label: 'Failure Scenario Analysis', icon: Zap },
    { id: 'dependencies', label: 'Network Dependencies', icon: Network },
    { id: 'compare', label: 'Compare Scenarios', icon: GitCompare },
    { id: 'risk', label: 'Risk Intelligence', icon: BarChart3 },
    { id: 'critical_assets', label: 'Asset Registry', icon: Database, badge: '2,486' },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: Flame,
      badge: activeIncidentsCount > 0 ? activeIncidentsCount : undefined,
      badgeType: 'danger',
    },
    { id: 'response_planner', label: 'Response Planner', icon: ClipboardList },
    { id: 'reports', label: 'Reports & Briefings', icon: FileText },
  ];

  return (
    <nav className="subnav-bar">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onSelectView(item.id)}
            className={`subnav-tab ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span>{item.label}</span>

            {item.badge !== undefined && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  background:
                    item.badgeType === 'danger'
                      ? 'var(--status-critical-bg)'
                      : 'var(--bg-surface-subtle)',
                  color:
                    item.badgeType === 'danger'
                      ? 'var(--status-critical)'
                      : 'var(--text-muted)',
                  border:
                    item.badgeType === 'danger'
                      ? '1px solid var(--status-critical-border)'
                      : '1px solid var(--border-subtle)',
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
