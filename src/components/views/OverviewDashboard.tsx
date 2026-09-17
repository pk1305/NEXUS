import React, { useState } from 'react';
import {
  Building2,
  ShieldAlert,
  Flame,
  Network,
  Activity,
  Users,
  Zap,
  ArrowRight,
  MapPin,
  AlertTriangle,
  ChevronRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { TelemetryCard } from '../common/TelemetryCard';
import { AssetBadge } from '../common/AssetBadge';
import {
  TOTAL_ASSETS_COUNT,
  CRITICAL_ASSETS_COUNT,
  ACTIVE_INCIDENTS_COUNT,
  HIGH_RISK_DEPENDENCIES_COUNT,
  NETWORK_RESILIENCE_PERCENT,
  POPULATION_AT_RISK,
  CURATED_ASSETS,
} from '../../data/mockInfrastructure';
import { INITIAL_INCIDENTS } from '../../data/initialIncidents';
import { NavView } from '../layout/NavigationSubnav';

interface OverviewDashboardProps {
  onNavigate: (view: NavView) => void;
  onSelectAssetForSimulation: (assetId: string) => void;
  onOpenWhatIf: () => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onSelectAssetForSimulation,
  onOpenWhatIf,
  onSelectNodeDetail,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('B-17');
  const selectedAsset = CURATED_ASSETS.find((a) => a.id === selectedAssetId) || CURATED_ASSETS[0];

  return (
    <div className="view-container">
      {/* Top Heading */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Infrastructure Resilience</h1>
          <p className="page-subtitle">
            Monitor critical infrastructure, dependencies and potential cascading risks across municipal sectors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => onSelectAssetForSimulation('B-17')}
            className="btn btn-primary"
          >
            <Zap size={14} />
            <span>Scenario Analysis</span>
          </button>
          <button
            onClick={onOpenWhatIf}
            className="btn btn-secondary"
          >
            <span>Compare Scenarios</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Large GIS Map (65%) | Compact Information Panel (35%) */}
      <div className="overview-grid">
        {/* Primary GIS Map */}
        <div
          className="nexus-card"
          style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 520,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Map Header Overlay */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="section-label">PRIMARY GIS CARTOGRAPHY</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>• Metro City Municipal Grid</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-healthy" style={{ fontSize: 11 }}>
                2,486 Mapped Assets
              </span>
              <button
                onClick={() => onNavigate('map')}
                className="btn btn-ghost"
                style={{ padding: '4px 8px', fontSize: 12 }}
              >
                <span>Full Map</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Light Architectural Vector GIS Map */}
          <div
            style={{
              flex: 1,
              background: '#F1F4F8',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 900 540" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="gisRoadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                </pattern>
                <linearGradient id="gisRiverLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              <rect width="900" height="540" fill="#F8FAFC" />
              <rect width="900" height="540" fill="url(#gisRoadGrid)" />

              {/* District Boundary Polygons */}
              <polygon points="40,30 360,20 400,220 60,240" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="120" y="60" fill="#64748B" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.05em">
                NORTH DISTRICT
              </text>

              <polygon points="340,180 820,160 860,460 380,480" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="560" y="210" fill="#64748B" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.05em">
                CENTRAL METROPOLITAN DISTRICT
              </text>

              <polygon points="50,280 340,260 360,500 40,510" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="110" y="320" fill="#64748B" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.05em">
                RIVERFRONT CORRIDOR
              </text>

              {/* Metro River */}
              <path
                d="M 100,0 C 240,160 320,220 460,300 C 600,380 720,400 900,440 L 900,540 L 0,540 L 0,0 Z"
                fill="url(#gisRiverLight)"
              />
              <path
                d="M 100,0 C 240,160 320,220 460,300 C 600,380 720,400 900,440"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
              />
              <text x="260" y="270" fill="#2563EB" fontSize="11" fontFamily="var(--font-sans)" fontStyle="italic" fontWeight="500">
                Metro River
              </text>

              {/* Major Highway / Transit Arteries */}
              <path d="M 40,280 L 860,280" stroke="#94A3B8" strokeWidth="4" />
              <path d="M 460,20 L 460,520" stroke="#94A3B8" strokeWidth="4" />
              <path d="M 140,80 L 760,480" stroke="#CBD5E1" strokeWidth="2.5" />
              <path d="M 760,80 L 140,480" stroke="#CBD5E1" strokeWidth="2.5" />

              {/* Bridge B-17 Symbol */}
              <rect x="450" y="290" width="20" height="34" fill="#0F2942" rx="2" />
              <line x1="446" y1="290" x2="474" y2="324" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="446" y1="324" x2="474" y2="290" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Dependency lines between primary cluster */}
              <path
                d="M 460,305 L 410,340 L 530,260 L 360,380"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Mapped Assets */}
              {CURATED_ASSETS.map((asset) => {
                const isSelected = selectedAssetId === asset.id;
                const isB17 = asset.id === 'B-17';
                const isP03 = asset.id === 'P-03';
                const isH02 = asset.id === 'H-02';

                const markerColor = isB17
                  ? 'var(--status-critical)'
                  : isP03
                  ? 'var(--status-warning)'
                  : isH02
                  ? 'var(--status-orange)'
                  : 'var(--brand-navy)';

                const x = asset.coordinates.x * 0.95 + 10;
                const y = asset.coordinates.y * 0.85 + 10;

                return (
                  <g
                    key={asset.id}
                    transform={`translate(${x}, ${y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedAssetId(asset.id)}
                  >
                    {isSelected && (
                      <circle
                        r="16"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    )}

                    <circle
                      r={isSelected || isB17 ? 9 : 7}
                      fill={markerColor}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    <text
                      x="12"
                      y="4"
                      fill="#0F172A"
                      fontSize="11"
                      fontFamily="var(--font-sans)"
                      fontWeight="600"
                    >
                      {asset.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Status Summary on Map */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: 'var(--shadow-sm)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot healthy" />
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Operational (2,410)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot warning" />
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Warning (42)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot critical" />
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Disrupted (6)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Right Side Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Selected Asset Information Card */}
          <div className="nexus-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <span className="section-label" style={{ marginBottom: 4 }}>SELECTED INFRASTRUCTURE</span>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedAsset.name}
                </h3>
              </div>
              <AssetBadge status={selectedAsset.status} size="sm" />
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
              {selectedAsset.description}
            </p>

            {/* Key Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Criticality</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                  {selectedAsset.criticality}
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Connected Assets</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                  {selectedAsset.downstreamAssets.length} assets
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Resilience Risk</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: selectedAsset.riskScore > 75 ? 'var(--status-critical)' : 'var(--status-warning)', marginTop: 2 }}>
                  {selectedAsset.riskScore}%
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Dependencies</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                  {selectedAsset.dependencies.length} upstream
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => onSelectAssetForSimulation(selectedAsset.id)}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: 12, padding: '7px 12px' }}
              >
                <Zap size={13} />
                <span>Simulate Failure</span>
              </button>

              <button
                onClick={() => onSelectNodeDetail(selectedAsset.id)}
                className="btn btn-secondary"
                style={{ fontSize: 12, padding: '7px 12px' }}
              >
                <span>View Details</span>
              </button>
            </div>
          </div>

          {/* City Resilience Scorecard Card */}
          <div className="nexus-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="section-label">CITY RESILIENCE INDEX</span>
              <span className="badge badge-healthy" style={{ fontSize: 11 }}>
                78 / 100
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Transport Network', val: 72, color: 'var(--status-orange)' },
                { label: 'Power & Grid', val: 84, color: 'var(--status-healthy)' },
                { label: 'Healthcare Corridors', val: 81, color: 'var(--status-healthy)' },
                { label: 'Water Systems', val: 76, color: 'var(--status-warning)' },
                { label: 'Emergency Response', val: 69, color: 'var(--status-critical)' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 2 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.val}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg-app)', borderRadius: 2 }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 14,
                padding: 10,
                background: 'var(--status-warning-bg)',
                border: '1px solid var(--status-warning-border)',
                borderRadius: 6,
                fontSize: 11,
                color: 'var(--status-warning)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <AlertTriangle size={14} style={{ flexShrink: 0 }} />
              <span>
                <strong>Primary Vulnerability:</strong> Cross-river emergency transit redundancy.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
        }}
      >
        <TelemetryCard
          label="TOTAL ASSETS"
          value={TOTAL_ASSETS_COUNT.toLocaleString()}
          subValue="Municipal Registry"
          change="+12 this month"
          trend="up"
          status="info"
          icon={Building2}
          onClick={() => onNavigate('critical_assets')}
        />
        <TelemetryCard
          label="CRITICAL ASSETS"
          value={CRITICAL_ASSETS_COUNT}
          subValue="High Priority Tier"
          change="4 under review"
          trend="neutral"
          status="orange"
          icon={ShieldAlert}
          onClick={() => onNavigate('risk')}
        />
        <TelemetryCard
          label="ACTIVE INCIDENTS"
          value={ACTIVE_INCIDENTS_COUNT}
          subValue="2 Critical • 2 High"
          change="+2 in 24h"
          trend="up"
          status="critical"
          icon={Flame}
          onClick={() => onNavigate('incidents')}
        />
        <TelemetryCard
          label="HIGH-RISK DEPENDENCIES"
          value={HIGH_RISK_DEPENDENCIES_COUNT}
          subValue="Bottlenecks Identified"
          change="-5 mitigated"
          trend="down"
          status="warning"
          icon={Network}
          onClick={() => onNavigate('dependencies')}
        />
        <TelemetryCard
          label="POPULATION AT RISK"
          value={POPULATION_AT_RISK.toLocaleString()}
          subValue="Cascade Catchment"
          change="52k River corridor"
          trend="neutral"
          status="orange"
          icon={Users}
          onClick={() => onNavigate('simulation')}
        />
      </div>
    </div>
  );
};
