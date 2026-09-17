import React from 'react';
import { AssetStatus, CriticalityLevel, AssetCategory } from '../../types/infrastructure';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Activity,
  Building2,
  Flame,
  Zap,
  Radio,
  Train,
  Plane,
  Droplet,
  Route,
  GitFork,
} from 'lucide-react';

interface AssetBadgeProps {
  status?: AssetStatus;
  criticality?: CriticalityLevel;
  type?: AssetCategory;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AssetBadge: React.FC<AssetBadgeProps> = ({
  status,
  criticality,
  type,
  showIcon = true,
  size = 'md',
}) => {
  if (status) {
    const statusMap: Record<AssetStatus, { label: string; class: string; icon: any }> = {
      operational: { label: 'Operational', class: 'badge-healthy', icon: CheckCircle2 },
      warning: { label: 'Warning', class: 'badge-warning', icon: AlertTriangle },
      elevated_risk: { label: 'Elevated Risk', class: 'badge-orange', icon: AlertTriangle },
      disrupted: { label: 'Disrupted', class: 'badge-critical', icon: XCircle },
      failed: { label: 'Failed', class: 'badge-critical', icon: XCircle },
      inactive: { label: 'Inactive', class: 'badge-neutral', icon: HelpCircle },
    };

    const info = statusMap[status] || statusMap.operational;
    const Icon = info.icon;

    return (
      <span className={`badge ${info.class}`} style={{ fontSize: size === 'sm' ? 11 : size === 'lg' ? 13 : 12 }}>
        {showIcon && <Icon size={size === 'sm' ? 12 : 13} />}
        {info.label}
      </span>
    );
  }

  if (criticality) {
    const critMap: Record<CriticalityLevel, { label: string; class: string }> = {
      CRITICAL: { label: 'Critical', class: 'badge-critical' },
      HIGH: { label: 'High', class: 'badge-orange' },
      MEDIUM: { label: 'Medium', class: 'badge-warning' },
      LOW: { label: 'Low', class: 'badge-healthy' },
    };
    const info = critMap[criticality] || critMap.MEDIUM;
    return (
      <span className={`badge ${info.class}`} style={{ fontSize: size === 'sm' ? 11 : size === 'lg' ? 13 : 12 }}>
        {showIcon && <ShieldAlert size={size === 'sm' ? 12 : 13} />}
        {info.label}
      </span>
    );
  }

  if (type) {
    const typeIcons: Record<AssetCategory, any> = {
      bridge: GitFork,
      road: Route,
      hospital: Activity,
      fire_station: Flame,
      police_station: ShieldAlert,
      power_station: Zap,
      substation: Zap,
      water_facility: Droplet,
      comm_tower: Radio,
      rail_station: Train,
      airport: Plane,
    };
    const Icon = typeIcons[type] || Building2;
    const cleanName = type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <span className="badge badge-info" style={{ fontSize: size === 'sm' ? 11 : 12 }}>
        {showIcon && <Icon size={size === 'sm' ? 12 : 13} />}
        {cleanName}
      </span>
    );
  }

  return null;
};
