import React from 'react';
import { X, Zap, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { AssetBadge } from './AssetBadge';
import { graphEngine } from '../../services/graphEngine';

interface NodeDetailDrawerProps {
  assetId: string | null;
  onClose: () => void;
  onSelectOtherAsset: (assetId: string) => void;
  onRunSimulation: (assetId: string) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  assetId,
  onClose,
  onSelectOtherAsset,
  onRunSimulation,
}) => {
  if (!assetId) return null;

  const asset = graphEngine.getAsset(assetId);
  if (!asset) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 440,
        maxWidth: '100vw',
        background: '#FFFFFF',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-drawer)',
        zIndex: 85,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--brand-navy)',
                background: 'var(--bg-app)',
                padding: '2px 6px',
                borderRadius: 4,
                border: '1px solid var(--border-subtle)',
              }}
            >
              {asset.id}
            </span>
            <AssetBadge type={asset.type} size="sm" />
            <AssetBadge status={asset.status} size="sm" />
          </div>

          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}>
            {asset.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
            <MapPin size={13} />
            <span>{asset.district}</span>
          </div>
        </div>

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

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {/* Simulation Action Card */}
        <div
          style={{
            padding: '14px',
            background: 'var(--brand-blue-soft)',
            border: '1px solid var(--brand-blue-border)',
            borderRadius: 8,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-navy)' }}>
              Failure Scenario Simulation
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              Trace real-time cascade propagation across Metro City.
            </div>
          </div>

          <button
            onClick={() => onRunSimulation(asset.id)}
            className="btn btn-primary"
            style={{ padding: '6px 14px', fontSize: 12 }}
          >
            Simulate
          </button>
        </div>

        {/* Telemetry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
          <div className="nexus-card" style={{ padding: 12 }}>
            <div className="section-label">RISK SCORE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: asset.riskScore > 75 ? 'var(--status-critical)' : 'var(--status-warning)', marginTop: 4 }}>
              {asset.riskScore}%
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Prob: {asset.failureProbability}%</div>
          </div>

          <div className="nexus-card" style={{ padding: 12 }}>
            <div className="section-label">HEALTH INDEX</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--status-healthy)', marginTop: 4 }}>
              {asset.health}%
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Nominal baseline</div>
          </div>

          <div className="nexus-card" style={{ padding: 12 }}>
            <div className="section-label">POPULATION EXPOSURE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
              {asset.populationAffected.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Direct & transit catchment</div>
          </div>

          <div className="nexus-card" style={{ padding: 12 }}>
            <div className="section-label">RECOVERY DIFFICULTY</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
              {asset.recoveryDifficulty}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Est. {asset.estimatedRecoveryHours}h MTTR</div>
          </div>
        </div>

        {/* Description */}
        {asset.description && (
          <div style={{ marginBottom: 20 }}>
            <span className="section-label" style={{ marginBottom: 6 }}>SYSTEM SPECIFICATION</span>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
              {asset.description}
            </p>
          </div>
        )}

        {/* Upstream Dependencies */}
        <div style={{ marginBottom: 20 }}>
          <span className="section-label" style={{ marginBottom: 8 }}>
            UPSTREAM DEPENDENCIES ({asset.dependencies.length})
          </span>

          {asset.dependencies.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Independent base asset</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {asset.dependencies.map((depId) => {
                const parent = graphEngine.getAsset(depId);
                return (
                  <div
                    key={depId}
                    className="nexus-card nexus-card-interactive"
                    style={{ padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    onClick={() => onSelectOtherAsset(depId)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-navy)' }}>{depId}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{parent?.name || depId}</span>
                    </div>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Downstream Assets */}
        <div>
          <span className="section-label" style={{ marginBottom: 8 }}>
            DOWNSTREAM IMPACT ASSETS ({asset.downstreamAssets.length})
          </span>

          {asset.downstreamAssets.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Terminal node</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {asset.downstreamAssets.slice(0, 8).map((downId) => {
                const child = graphEngine.getAsset(downId);
                return (
                  <div
                    key={downId}
                    className="nexus-card nexus-card-interactive"
                    style={{ padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    onClick={() => onSelectOtherAsset(downId)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--status-orange)' }}>{downId}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{child?.name || downId}</span>
                    </div>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
