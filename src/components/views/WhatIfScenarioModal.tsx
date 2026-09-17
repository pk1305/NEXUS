import React, { useState } from 'react';
import { SlidersHorizontal, X, Zap, Plus, Trash2, ShieldAlert, Sparkles, Activity, AlertTriangle } from 'lucide-react';
import { PRECONFIGURED_SCENARIOS } from '../../data/mockScenarios';
import { CURATED_ASSETS } from '../../data/mockInfrastructure';
import { graphEngine } from '../../services/graphEngine';
import { FailureSeverity } from '../../types/infrastructure';
import { AssetBadge } from '../common/AssetBadge';

interface WhatIfScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssetForSimulation: (assetId: string) => void;
}

export const WhatIfScenarioModal: React.FC<WhatIfScenarioModalProps> = ({
  isOpen,
  onClose,
  onSelectAssetForSimulation,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-monsoon');
  const [customFailures, setCustomFailures] = useState<{ assetId: string; severity: FailureSeverity }[]>([
    { assetId: 'B-17', severity: 'severe' },
    { assetId: 'P-03', severity: 'severe' },
    { assetId: 'R-11', severity: 'medium' },
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<any>(() =>
    graphEngine.calculateMultiFailureScenario(customFailures)
  );

  if (!isOpen) return null;

  const handleSelectPreconfigured = (scenId: string) => {
    setSelectedScenarioId(scenId);
    const scen = PRECONFIGURED_SCENARIOS.find((s) => s.id === scenId);
    if (scen) {
      setCustomFailures(scen.failures);
      const res = graphEngine.calculateMultiFailureScenario(scen.failures);
      setResult(res);
    }
  };

  const handleAddFailure = () => {
    if (customFailures.length >= 5) return;
    const available = CURATED_ASSETS.find((a) => !customFailures.some((f) => f.assetId === a.id));
    if (available) {
      const next = [...customFailures, { assetId: available.id, severity: 'severe' as FailureSeverity }];
      setCustomFailures(next);
      setResult(graphEngine.calculateMultiFailureScenario(next));
    }
  };

  const handleRemoveFailure = (index: number) => {
    if (customFailures.length <= 1) return;
    const next = customFailures.filter((_, i) => i !== index);
    setCustomFailures(next);
    setResult(graphEngine.calculateMultiFailureScenario(next));
  };

  const handleRunScenario = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResult(graphEngine.calculateMultiFailureScenario(customFailures));
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 840 }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
          }}
        >
          <div>
            <div className="font-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
              "What-If?" Multi-Failure Scenario Builder
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Model simultaneous disaster events to compute compound cascading impact footprints.
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

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Preset Options */}
          <div>
            <span className="section-label" style={{ marginBottom: 8 }}>
              SELECT PRECONFIGURED DISASTER SCENARIO
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {PRECONFIGURED_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => handleSelectPreconfigured(scen.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 6,
                    background: selectedScenarioId === scen.id ? 'var(--brand-blue-soft)' : 'var(--bg-app)',
                    border: selectedScenarioId === scen.id ? '1px solid var(--brand-blue)' : '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: selectedScenarioId === scen.id ? 'var(--brand-blue)' : 'var(--text-primary)' }}>
                    {scen.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {scen.failures.length} concurrent outages
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Failure Points */}
          <div style={{ background: 'var(--bg-app)', padding: 16, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                Configured Failure Points ({customFailures.length} / 5)
              </span>

              {customFailures.length < 5 && (
                <button
                  onClick={handleAddFailure}
                  className="btn btn-secondary"
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  <Plus size={12} />
                  <span>Add Node</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {customFailures.map((fail, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-navy)' }}>
                    Point {idx + 1}:
                  </span>

                  <select
                    className="input-control"
                    value={fail.assetId}
                    onChange={(e) => {
                      const next = [...customFailures];
                      next[idx].assetId = e.target.value;
                      setCustomFailures(next);
                    }}
                    style={{ flex: 1, padding: '4px 8px', fontSize: 12 }}
                  >
                    {CURATED_ASSETS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.id} — {a.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="input-control"
                    value={fail.severity}
                    onChange={(e) => {
                      const next = [...customFailures];
                      next[idx].severity = e.target.value as FailureSeverity;
                      setCustomFailures(next);
                    }}
                    style={{ width: 130, padding: '4px 8px', fontSize: 12 }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="severe">Severe</option>
                    <option value="complete">Complete</option>
                  </select>

                  <button
                    onClick={() => handleRemoveFailure(idx)}
                    disabled={customFailures.length <= 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: customFailures.length > 1 ? 'var(--status-critical)' : 'var(--text-muted)',
                      cursor: customFailures.length > 1 ? 'pointer' : 'default',
                      padding: 4,
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleRunScenario}
                disabled={isRunning}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: 12 }}
              >
                <Zap size={14} />
                <span>{isRunning ? 'Calculating Compound Risk...' : 'Run Compound Scenario'}</span>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {result && (
            <div className="nexus-card" style={{ borderLeft: '4px solid var(--status-critical)' }}>
              <span className="section-label" style={{ marginBottom: 12, color: 'var(--status-critical)' }}>
                COMPOUND SCENARIO RESILIENCE ASSESSMENT
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>COMBINED RISK</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--status-critical)', marginTop: 2 }}>
                    {result.combinedRiskScore} / 100
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AFFECTED ASSETS</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                    {result.affectedAssetsCount}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>HOSPITALS AT RISK</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--status-critical)', marginTop: 2 }}>
                    {result.hospitalsAtRisk}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>RESPONSE DELAY</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--status-orange)', marginTop: 2 }}>
                    +{result.emergencyDelayMinutes} min
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
