import React, { useState } from 'react';
import { BarChart3, Zap, ShieldAlert, AlertTriangle, ArrowRight, Activity, Users } from 'lucide-react';
import { CURATED_ASSETS } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';
import { graphEngine } from '../../services/graphEngine';

interface RiskAnalysisViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const RiskAnalysisView: React.FC<RiskAnalysisViewProps> = ({
  onSelectAssetForSimulation,
  onSelectNodeDetail,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('B-17');

  const top10Assets = [...CURATED_ASSETS]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Infrastructure Risk Intelligence</h1>
          <p className="page-subtitle">
            2D Risk matrix mapping failure probabilities against cascading impact severities across Metro City assets.
          </p>
        </div>
      </div>

      {/* Grid: 2D Matrix (52%) | Top 10 Critical Assets (48%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20 }}>
        {/* 2D Risk Matrix */}
        <div className="nexus-card" style={{ display: 'flex', flexDirection: 'column', minHeight: 460 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>
            2D INFRASTRUCTURE RISK MATRIX (IMPACT vs PROBABILITY)
          </span>

          <div
            style={{
              flex: 1,
              background: '#F8FAFC',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              position: 'relative',
              overflow: 'hidden',
              padding: '24px 32px 32px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Quadrant IV Highlight */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '50%',
                background: 'rgba(239, 68, 68, 0.04)',
                borderLeft: '1px dashed #CBD5E1',
                borderBottom: '1px dashed #CBD5E1',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--status-critical)',
                  letterSpacing: '0.04em',
                }}
              >
                CRITICAL VULNERABILITY (QUADRANT IV)
              </span>
            </div>

            {/* Y-Axis Label */}
            <div
              style={{
                position: 'absolute',
                left: 6,
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
              }}
            >
              CASCADE IMPACT SEVERITY ↑
            </div>

            {/* X-Axis Label */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
              }}
            >
              FAILURE PROBABILITY (%) →
            </div>

            <svg viewBox="0 0 500 320" style={{ width: '100%', height: '100%' }}>
              {CURATED_ASSETS.map((asset) => {
                const px = 40 + (asset.failureProbability / 70) * 400;
                const py = 280 - ((asset.riskScore - 40) / 60) * 240;
                const isSelected = selectedAssetId === asset.id;
                const isCrit = asset.riskScore > 80;

                return (
                  <g
                    key={asset.id}
                    transform={`translate(${px}, ${py})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedAssetId(asset.id)}
                  >
                    {isSelected && (
                      <circle
                        r="16"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeDasharray="3 2"
                      />
                    )}
                    <circle
                      r={isCrit ? 9 : 7}
                      fill={isCrit ? 'var(--status-critical)' : 'var(--brand-navy)'}
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
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
          </div>
        </div>

        {/* Top 10 Critical Assets Ranking */}
        <div className="nexus-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="section-label" style={{ marginBottom: 14 }}>
            TOP 10 MOST CRITICAL INFRASTRUCTURE ASSETS
          </span>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {top10Assets.map((asset, index) => {
              const isSelected = selectedAssetId === asset.id;
              return (
                <div
                  key={asset.id}
                  className="nexus-card nexus-card-interactive"
                  style={{
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderLeft: `3px solid ${index < 3 ? 'var(--status-critical)' : 'var(--brand-navy)'}`,
                    background: isSelected ? 'var(--bg-surface-active)' : '#FFFFFF',
                  }}
                  onClick={() => setSelectedAssetId(asset.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: index < 3 ? 'var(--status-critical)' : 'var(--text-muted)',
                        width: 20,
                      }}
                    >
                      #{index + 1}
                    </span>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-navy)' }}>
                          {asset.id}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                          {asset.name.split('—')[0]}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                        {asset.dependencies.length} deps • {asset.downstreamAssets.length} downstream • {asset.populationAffected.toLocaleString()} pop
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-critical)' }}>
                        {asset.riskScore}%
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Risk</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAssetForSimulation(asset.id);
                      }}
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      <Zap size={11} />
                      <span>Sim</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
