import React, { useState } from 'react';
import {
  ShieldAlert,
  Bell,
  Search,
  Bot,
  MapPin,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface TopHeaderProps {
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
  onToggleCopilot: () => void;
  onOpenWhatIf: () => void;
  onNavigateHome: () => void;
  unreadAlertsCount: number;
  activeIncidentsCount: number;
  isCopilotOpen: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenSearch,
  onToggleNotifications,
  onToggleCopilot,
  onOpenWhatIf,
  onNavigateHome,
  unreadAlertsCount,
  activeIncidentsCount,
  isCopilotOpen,
}) => {
  const [selectedLocation] = useState('Metro City — All Districts');

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 50,
        flexShrink: 0,
        gap: 16,
      }}
    >
      {/* Brand & Platform Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button
          onClick={onNavigateHome}
          title="Back to Landing Page"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 0,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'var(--brand-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 16,
              fontFamily: 'var(--font-display)',
              flexShrink: 0,
            }}
          >
            N
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                className="font-display"
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--brand-navy)',
                }}
              >
                NEXUS
              </span>
              <span
                style={{
                  fontSize: 10,
                  padding: '1px 5px',
                  background: 'var(--bg-surface-subtle)',
                  borderRadius: 4,
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                RESILIENCE
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Infrastructure Intelligence Platform
            </div>
          </div>
        </button>
      </div>

      {/* Center: Large Global Search */}
      <div style={{ flex: 1, maxWidth: 440, minWidth: 160 }}>
        <button
          onClick={onOpenSearch}
          style={{
            width: '100%',
            height: 36,
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            color: 'var(--text-muted)',
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-medium)';
            e.currentTarget.style.background = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.background = 'var(--bg-app)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Search size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Search infrastructure assets (B-17, H-02)...</span>
          </div>
          <span
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '1px 5px',
              borderRadius: 3,
              fontSize: 10,
              color: 'var(--text-muted)',
              fontWeight: 500,
              flexShrink: 0,
              marginLeft: 6,
            }}
          >
            ⌘K
          </span>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {/* Location Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            background: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            fontSize: 12,
            color: 'var(--text-secondary)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <MapPin size={13} color="var(--text-muted)" />
          <span>{selectedLocation}</span>
          <ChevronDown size={12} color="var(--text-muted)" />
        </div>

        {/* System Status: Operational */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 8px',
            background: 'var(--status-healthy-bg)',
            border: '1px solid var(--status-healthy-border)',
            borderRadius: 6,
          }}
        >
          <span className="status-dot healthy" />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--status-healthy)',
            }}
          >
            Operational
          </span>
        </div>

        {/* Emergency Alert indicator */}
        {activeIncidentsCount > 0 && (
          <button
            onClick={onToggleNotifications}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 8px',
              background: 'var(--status-critical-bg)',
              border: '1px solid var(--status-critical-border)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            <ShieldAlert size={13} color="var(--status-critical)" />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--status-critical)' }}>
              {activeIncidentsCount} Incidents
            </span>
          </button>
        )}

        {/* Notifications Icon Button */}
        <button
          onClick={onToggleNotifications}
          style={{
            width: 34,
            height: 34,
            borderRadius: 6,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          title="Notifications"
        >
          <Bell size={15} />
          {unreadAlertsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--status-critical)',
              }}
            />
          )}
        </button>

        {/* AI Copilot Button */}
        <button
          onClick={onToggleCopilot}
          className={isCopilotOpen ? 'btn btn-primary' : 'btn btn-secondary'}
          style={{ height: 34, padding: '0 10px', fontSize: 12 }}
          title="Open AI Resilience Advisor"
        >
          <Sparkles size={13} />
          <span>Advisor</span>
        </button>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 8,
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'var(--brand-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 11,
              color: '#FFFFFF',
            }}
          >
            PA
          </div>
        </div>
      </div>
    </header>
  );
};
