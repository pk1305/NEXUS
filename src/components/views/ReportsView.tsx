import React, { useState } from 'react';
import { FileText, Download, Share2, Sparkles, Printer, CheckCircle2, ShieldAlert, Clock, Users, Zap } from 'lucide-react';
import { graphEngine } from '../../services/graphEngine';
import { CURATED_ASSETS } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';

interface ReportsViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onSelectAssetForSimulation }) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('B-17');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  const simulationResult = graphEngine.simulateFailure(selectedAssetId, 'severe');
  const targetAsset = graphEngine.getAsset(selectedAssetId) || CURATED_ASSETS[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Resilience & Incident Briefings</h1>
          <p className="page-subtitle">
            Generate formal disaster audit briefs, cascading impact assessments, and agency triage documentation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={14} />
            <span>Export PDF / Print</span>
          </button>
          <button onClick={handleShare} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Share2 size={14} />
            <span>{shareCopied ? 'Link Copied!' : 'Share Report'}</span>
          </button>
        </div>
      </div>

      {/* Target Asset Selector */}
      <div className="nexus-card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Target Infrastructure Brief:</span>
          <select
            className="input-control"
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            style={{ minWidth: 280 }}
          >
            {CURATED_ASSETS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} — {a.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Sparkles size={14} />
          <span>{isGenerating ? 'Synthesizing...' : 'Generate Briefing'}</span>
        </button>
      </div>

      {/* Executive Report Document Card */}
      <div
        className="nexus-card"
        style={{
          background: '#FFFFFF',
          padding: 36,
          maxWidth: 900,
          margin: '0 auto',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Document Header */}
        <div
          style={{
            borderBottom: '2px solid var(--brand-navy)',
            paddingBottom: 20,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-navy)' }}>
                NEXUS
              </span>
              <span className="badge badge-info">EXECUTIVE RESILIENCE BRIEF</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Municipal Critical Infrastructure Resilience Commission • Metro City EOC
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-navy)' }}>
              REF: BRF-2026-{selectedAssetId}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              Date: 15 September 2026 • 19:32 UTC
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: 24 }}>
          <span className="section-label" style={{ marginBottom: 8 }}>
            01. EXECUTIVE SUMMARY
          </span>

          <div
            style={{
              background: 'var(--bg-app)',
              borderLeft: '4px solid var(--status-critical)',
              padding: 14,
              borderRadius: '0 6px 6px 0',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                Incident: {targetAsset.name} Failure Simulation
              </span>
              <AssetBadge criticality="CRITICAL" size="sm" />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {simulationResult.aiExplanation.summary}
            </p>
          </div>
        </div>

        {/* Multi-Tier Impact Breakdown */}
        <div style={{ marginBottom: 24 }}>
          <span className="section-label" style={{ marginBottom: 10 }}>
            02. CASCADING DISRUPTION FOOTPRINT
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'var(--bg-app)', padding: 12, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--status-critical)', fontWeight: 700 }}>PRIMARY IMPACT (LEVEL 0)</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                {targetAsset.id} unavailable
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                100% direct operational capacity loss.
              </div>
            </div>

            <div style={{ background: 'var(--bg-app)', padding: 12, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--status-orange)', fontWeight: 700 }}>SECONDARY IMPACTS (LEVEL 1-2)</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                Road R-04 & Hospital Access
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                Critical trauma ingress severed, traffic backlog.
              </div>
            </div>

            <div style={{ background: 'var(--bg-app)', padding: 12, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--status-warning)', fontWeight: 700 }}>TERTIARY IMPACTS (LEVEL 3)</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                Emergency Transit & Grids
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                Response delays spike across 4 districts.
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AFFECTED ASSETS</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {simulationResult.totalAffectedCount} assets
              </div>
            </div>

            <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>POPULATION IMPACT</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {simulationResult.populationImpact.toLocaleString()}
              </div>
            </div>

            <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>RESPONSE DELAY</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--status-orange)' }}>
                +{simulationResult.emergencyDelayMinutes} min
              </div>
            </div>

            <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>RECOVERY ESTIMATE</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {simulationResult.estimatedRecoveryMinHours}–{simulationResult.estimatedRecoveryMaxHours} hours
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div>
          <span className="section-label" style={{ marginBottom: 10 }}>
            03. MANDATED EMERGENCY MITIGATION PROTOCOLS
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { text: 'Redirect emergency traffic through Route R-08 immediately', prio: 'CRITICAL' },
              { text: 'Notify Hospital H-02 trauma intake to utilize northern ingress', prio: 'CRITICAL' },
              { text: 'Dispatch traffic management taskforces to arterial junctions', prio: 'HIGH' },
              { text: 'Activate Fire Station F-03 alternative coverage corridor', prio: 'HIGH' },
              { text: 'Monitor Power Station P-03 thermal grid balancing', prio: 'MEDIUM' },
            ].map((action, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 12px',
                  background: 'var(--bg-app)',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--brand-navy)', fontWeight: 700 }}>
                    #{i + 1}
                  </span>
                  <span style={{ color: 'var(--text-primary)' }}>{action.text}</span>
                </div>
                <AssetBadge criticality={action.prio as any} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Signoff */}
        <div
          style={{
            marginTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: 'var(--text-muted)',
          }}
        >
          <div>NEXUS Infrastructure Resilience Analytics • Algorithmic Confidence 91%</div>
          <div>Authorized By: Municipal Emergency Operations Command</div>
        </div>
      </div>
    </div>
  );
};
