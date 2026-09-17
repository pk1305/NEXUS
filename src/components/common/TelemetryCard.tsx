import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TelemetryCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'healthy' | 'warning' | 'orange' | 'critical' | 'info';
  icon: LucideIcon;
  onClick?: () => void;
}

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  label,
  value,
  subValue,
  change,
  trend,
  status = 'info',
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      className={`nexus-card ${onClick ? 'nexus-card-interactive' : ''}`}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px',
        minHeight: 112,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className="section-label">{label}</span>
        <div
          style={{
            background: 'var(--bg-surface-subtle)',
            color: 'var(--text-secondary)',
            padding: '6px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={16} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div
            className="font-display"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {value}
          </div>
          {subValue && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              {subValue}
            </div>
          )}
        </div>

        {change && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 500,
              color:
                trend === 'up'
                  ? status === 'critical' || status === 'orange'
                    ? 'var(--status-critical)'
                    : 'var(--status-healthy)'
                  : trend === 'down'
                  ? 'var(--status-healthy)'
                  : 'var(--text-muted)',
            }}
          >
            {trend === 'up' && <TrendingUp size={13} />}
            {trend === 'down' && <TrendingDown size={13} />}
            {trend === 'neutral' && <Minus size={13} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};
