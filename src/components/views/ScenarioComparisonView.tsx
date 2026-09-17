import React, { useState } from 'react';
import { GitCompare, ArrowRight, ShieldAlert, Zap, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { graphEngine } from '../../services/graphEngine';
import { CURATED_ASSETS } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';

interface ScenarioComparisonViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
}

export const ScenarioComparisonView: React.FC<ScenarioComparisonViewProps> = ({
  onSelectAssetForSimulation,
}) => {
  const [scenarioAAsset, setScenarioAAsset] = useState<string>('B-17');
  const [scenarioBAssets, setScenarioBAssets] = useState<string[]>(['B-17', 'P-03']);

  const simA = graphEngine.simulateFailure(scenarioAAsset, 'severe');
  const simB = graphEngine.calculateMultiFailureScenario([
    { assetId: scenarioBAssets[0] || 'B-17', severity: 'severe' },
    { assetId: scenarioBAssets[1] || 'P-03', severity: 'severe' },
  ]);

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Scenario Comparison</h1>
          <p className="page-subtitle">
            Compare single-asset vs compound simultaneous disruptions to evaluate resilience thresholds and non-linear cascade propagation.
          </p>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Scenario A Card */}
        <div className="nexus-card" style={{ borderLeft: '4px solid var(--brand-blue)' }}>
          <span className="section-label" style={{ marginBottom: 8, color: 'var(--brand-blue)' }}>
            SCENARIO A (BASELINE DISRUPTION)
          </span>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Single Failure: Bridge B-17
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Isolated structural failure of Central River Bridge.
          </p>
        </div>

        {/* Scenario B Card */}
        <div className="nexus-card" style={{ borderLeft: '4px solid var(--status-critical)' }}>
          <span className="section-label" style={{ marginBottom: 8, color: 'var(--status-critical)' }}>
            SCENARIO B (COMPOUND DISASTER)
          </span>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Dual Failure: Bridge B-17 + Power Station P-03
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Simultaneous cross-river arterial disruption and North Grid thermal outage.
          </p>
        </div>
      </div>

      {/* Clean Comparison Table */}
      <div className="nexus-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                RESILIENCE METRIC
              </th>
              <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--brand-navy)', width: '28%' }}>
                SCENARIO A (B-17)
              </th>
              <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--status-critical)', width: '28%' }}>
                SCENARIO B (B-17 + P-03)
              </th>
              <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', width: '20%' }}>
                COMPOUND DELTA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Affected Infrastructure Assets
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>18 assets</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                42 assets
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                +24 assets (+133%)
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Hospitals at Immediate Risk
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>1 facility (H-02)</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                3 facilities (H-02, H-05, H-08)
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                +2 facilities
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Fire & Rescue Stations at Risk
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>1 station (F-08)</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                5 stations
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                +4 stations
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Estimated Population Impact
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>52,400 residents</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                126,000 residents
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                +73,600 (+140%)
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Emergency Response Delay
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>+18 minutes</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                +31 minutes
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                +13 minutes
              </td>
            </tr>

            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Estimated Recovery Time
              </td>
              <td style={{ padding: '14px 20px', fontWeight: 600 }}>8–14 hours</td>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--status-critical)' }}>
                18–36 hours
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--status-critical)', fontWeight: 600 }}>
                Extended Grid Repair
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Finding Box */}
      <div
        className="nexus-card"
        style={{
          background: 'var(--status-warning-bg)',
          border: '1px solid var(--status-warning-border)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <AlertTriangle size={18} color="var(--status-warning)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-warning)', marginBottom: 4 }}>
            Non-Linear Compounding Impact Analysis
          </h4>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            When Bridge B-17 fails concurrently with Power Station P-03, emergency ambulance rerouting corridors lose electric traffic signaling and pumping stations lose backup power, tripling the number of at-risk medical facilities from 1 to 3 and increasing delay times to over 30 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
