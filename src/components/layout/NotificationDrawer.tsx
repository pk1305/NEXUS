import React from 'react';
import { X, ShieldAlert, AlertTriangle, Info, Clock } from 'lucide-react';
import { NotificationItem } from '../../types/infrastructure';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotificationAsset?: (assetId: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotificationAsset,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 380,
        maxWidth: '100vw',
        background: '#FFFFFF',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-drawer)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            System Alerts & Incidents
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Sensory telemetry and cascade warnings
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onMarkAllRead}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--brand-blue)',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              color: 'var(--text-secondary)',
              padding: 6,
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications.map((item) => {
          const isCritical = item.type === 'critical';
          const isWarning = item.type === 'warning';

          return (
            <div
              key={item.id}
              className="nexus-card"
              style={{
                padding: 12,
                borderLeft: `3px solid ${
                  isCritical
                    ? 'var(--status-critical)'
                    : isWarning
                    ? 'var(--status-warning)'
                    : 'var(--brand-blue)'
                }`,
                background: item.unread ? 'var(--bg-surface-hover)' : '#FFFFFF',
                cursor: item.assetId ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (item.assetId && onSelectNotificationAsset) {
                  onSelectNotificationAsset(item.assetId);
                  onClose();
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isCritical && <ShieldAlert size={14} color="var(--status-critical)" />}
                  {isWarning && <AlertTriangle size={14} color="var(--status-warning)" />}
                  {!isCritical && !isWarning && <Info size={14} color="var(--brand-blue)" />}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: isCritical ? 'var(--status-critical)' : isWarning ? 'var(--status-warning)' : 'var(--text-primary)',
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                  <Clock size={11} />
                  <span>{item.timeAgo}</span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: '4px 0' }}>
                {item.message}
              </p>

              {item.assetId && (
                <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end' }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--brand-blue)',
                      fontWeight: 600,
                    }}
                  >
                    Asset {item.assetId} →
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
