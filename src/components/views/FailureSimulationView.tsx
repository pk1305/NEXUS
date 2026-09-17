import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  RotateCcw,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Users,
  Activity,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Flame,
  CheckCircle2,
  Layers,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { InfrastructureAsset, FailureSeverity, SimulationResult, CascadeStep } from '../../types/infrastructure';
import { graphEngine } from '../../services/graphEngine';
import { AssetBadge } from '../common/AssetBadge';
import { CURATED_ASSETS } from '../../data/mockInfrastructure';

interface FailureSimulationViewProps {
  selectedAssetId?: string;
  onNavigateToResponsePlanner?: () => void;
  onNavigateToReports?: () => void;
  onSelectNodeDetail?: (assetId: string) => void;
}

export const FailureSimulationView: React.FC<FailureSimulationViewProps> = ({
  selectedAssetId = 'B-17',
  onNavigateToResponsePlanner,
  onNavigateToReports,
  onSelectNodeDetail,
}) => {
  const [currentAssetId, setCurrentAssetId] = useState<string>(selectedAssetId);
  const [severity, setSeverity] = useState<FailureSeverity>('severe');
  const [durationHours, setDurationHours] = useState<number>(6);

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);

  const selectedAsset = graphEngine.getAsset(currentAssetId) || CURATED_ASSETS[0];

  const curatedOptions = [
    { id: 'B-17', label: 'Bridge B-17 — Central River Bridge (Primary Recommended)' },
    { id: 'P-03', label: 'Power Station P-03 — North Thermal & Grid Station' },
    { id: 'H-02', label: 'Hospital H-02 — Metro Central Trauma Center' },
    { id: 'R-04', label: 'Road R-04 — Central Riverfront Arterial' },
    { id: 'W-02', label: 'Water Plant W-02 — River Basin Treatment Facility' },
    { id: 'S-07', label: 'Substation S-07 — Downtown High-Voltage Hub' },
    { id: 'C-02', label: 'Comm Tower C-02 — Metro Emergency Wireless Mast' },
    { id: 'RC-01', label: 'Rail Station RC-01 — Grand Central Metro Terminal' },
  ];

  useEffect(() => {
    if (selectedAssetId) {
      setCurrentAssetId(selectedAssetId);
      const result = graphEngine.simulateFailure(selectedAssetId, severity, durationHours);
      setSimulationResult(result);
    }
  }, [selectedAssetId]);

  useEffect(() => {
    const result = graphEngine.simulateFailure(currentAssetId, severity, durationHours);
    setSimulationResult(result);
  }, [currentAssetId, severity, durationHours]);

  const handleStartSimulation = () => {
    const result = graphEngine.simulateFailure(currentAssetId, severity, durationHours);
    setSimulationResult(result);
    setIsSimulating(true);
    setSimulationComplete(false);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < result.steps.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationComplete(true);
      }
    }, 1200);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationComplete(false);
    setCurrentStepIndex(-1);
  };

  const visibleSteps = simulationResult
    ? isSimulating
      ? simulationResult.steps.slice(0, currentStepIndex + 1)
      : simulationComplete
      ? simulationResult.steps
      : []
    : [];

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Failure Scenario Analysis</h1>
          <p className="page-subtitle">
            Understand how disruption to one infrastructure asset can affect connected systems across the municipal network.
          </p>
        </div>

        {simulationComplete && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onNavigateToResponsePlanner} className="btn btn-primary">
              <FileText size={14} />
              <span>View Response Plan</span>
            </button>
            <button onClick={onNavigateToReports} className="btn btn-secondary">
              <span>Export Incident Brief</span>
            </button>
          </div>
        )}
      </div>

      {/* 3-Part Engineering Workspace */}
      <div className="simulation-grid">
        {/* LEFT PANEL: Scenario Configuration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="nexus-card">
            <span className="section-label" style={{ marginBottom: 14 }}>
              SCENARIO CONFIGURATION
            </span>

            {/* Target Asset */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Target Infrastructure Asset
              </label>
              <select
                className="input-control"
                style={{ width: '100%' }}
                value={currentAssetId}
                onChange={(e) => {
                  setCurrentAssetId(e.target.value);
                  handleResetSimulation();
                }}
                disabled={isSimulating}
              >
                {curatedOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Asset Metadata Summary */}
            <div
              style={{
                background: 'var(--bg-app)',
                padding: 12,
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13 }}>
                  {selectedAsset.id}
                </span>
                <AssetBadge criticality={selectedAsset.criticality} size="sm" />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                {selectedAsset.name}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                <span>Dependencies: <strong>{selectedAsset.dependencies.length}</strong></span>
                <span>Downstream: <strong>{selectedAsset.downstreamAssets.length}</strong></span>
              </div>
            </div>

            {/* Failure Condition */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Failure Condition
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                {(['low', 'medium', 'severe', 'complete'] as FailureSeverity[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSeverity(s);
                      handleResetSimulation();
                    }}
                    disabled={isSimulating}
                    style={{
                      padding: '7px 10px',
                      borderRadius: 6,
                      border: severity === s ? '1px solid var(--brand-navy)' : '1px solid var(--border-subtle)',
                      background: severity === s ? 'var(--brand-navy)' : 'var(--bg-app)',
                      color: severity === s ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {s === 'complete' ? 'Complete' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Duration */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Expected Duration
              </label>
              <select
                className="input-control"
                style={{ width: '100%' }}
                value={durationHours}
                onChange={(e) => {
                  setDurationHours(Number(e.target.value));
                  handleResetSimulation();
                }}
                disabled={isSimulating}
              >
                <option value={1}>1 hour (Minor Outage)</option>
                <option value={6}>6 hours (Standard Disruption)</option>
                <option value={12}>12 hours (Severe Outage)</option>
                <option value={24}>24 hours (Full Day Disruption)</option>
                <option value={48}>48 hours (Multi-Day Disaster)</option>
              </select>
            </div>

            {/* Run Button */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 600 }}
              >
                {isSimulating ? (
                  <>
                    <Zap size={15} />
                    <span>Propagating...</span>
                  </>
                ) : (
                  <>
                    <Play size={15} />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>

              {(isSimulating || simulationComplete) && (
                <button
                  onClick={handleResetSimulation}
                  className="btn btn-secondary"
                  style={{ padding: '0 12px' }}
                  title="Reset"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CENTER PANEL: Engineering Dependency Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            className="nexus-card"
            style={{
              padding: 0,
              flex: 1,
              minHeight: 480,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span className="section-label">INFRASTRUCTURE DEPENDENCY NETWORK</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {isSimulating
                  ? `Step ${currentStepIndex + 1} of ${simulationResult?.steps.length}`
                  : simulationComplete
                  ? 'Cascade Simulated'
                  : 'Ready'}
              </span>
            </div>

            {/* Clean Light Canvas with Spaced Nodes to Prevent Overlap */}
            <div
              style={{
                flex: 1,
                background: '#FAFAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg viewBox="0 0 740 400" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <marker id="engArrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                  </marker>
                  <marker id="engArrowActive" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#DC2626" />
                  </marker>
                  <pattern id="lightEngGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                  </pattern>
                </defs>

                <rect width="740" height="400" fill="url(#lightEngGrid)" />

                {/* Directional Dependency Lines */}
                <line x1="110" y1="200" x2="270" y2="200" stroke={simulationComplete ? '#DC2626' : '#94A3B8'} strokeWidth="2" markerEnd={simulationComplete ? 'url(#engArrowActive)' : 'url(#engArrow)'} />
                <line x1="270" y1="200" x2="450" y2="110" stroke={simulationComplete ? '#EA580C' : '#94A3B8'} strokeWidth="2" markerEnd={simulationComplete ? 'url(#engArrowActive)' : 'url(#engArrow)'} />
                <line x1="270" y1="200" x2="450" y2="290" stroke={simulationComplete ? '#EA580C' : '#94A3B8'} strokeWidth="2" markerEnd={simulationComplete ? 'url(#engArrowActive)' : 'url(#engArrow)'} />
                <line x1="450" y1="110" x2="610" y2="110" stroke={simulationComplete ? '#D97706' : '#94A3B8'} strokeWidth="1.5" markerEnd="url(#engArrow)" />
                <line x1="450" y1="290" x2="610" y2="290" stroke={simulationComplete ? '#D97706' : '#94A3B8'} strokeWidth="1.5" markerEnd="url(#engArrow)" />

                {/* Level 0: Bridge B-17 */}
                <g transform="translate(110, 200)" style={{ cursor: 'pointer' }} onClick={() => onSelectNodeDetail && onSelectNodeDetail('B-17')}>
                  <circle
                    r="24"
                    fill={simulationComplete || (isSimulating && currentStepIndex >= 0) ? '#FEF2F2' : '#FFFFFF'}
                    stroke={simulationComplete || (isSimulating && currentStepIndex >= 0) ? '#DC2626' : '#0F2942'}
                    strokeWidth="2.5"
                  />
                  <text y="4" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">
                    B-17
                  </text>
                  <text y="36" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">
                    Bridge B-17
                  </text>
                  {(simulationComplete || (isSimulating && currentStepIndex >= 0)) && (
                    <text y="50" fill="#DC2626" fontSize="10" fontWeight="700" textAnchor="middle">
                      FAILED (Level 0)
                    </text>
                  )}
                </g>

                {/* Level 1: Road R-04 */}
                <g transform="translate(270, 200)" style={{ cursor: 'pointer' }} onClick={() => onSelectNodeDetail && onSelectNodeDetail('R-04')}>
                  <circle
                    r="22"
                    fill={simulationComplete || (isSimulating && currentStepIndex >= 1) ? '#FFF7ED' : '#FFFFFF'}
                    stroke={simulationComplete || (isSimulating && currentStepIndex >= 1) ? '#EA580C' : '#64748B'}
                    strokeWidth="2"
                  />
                  <text y="4" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">
                    R-04
                  </text>
                  <text y="36" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">
                    Road R-04
                  </text>
                  {(simulationComplete || (isSimulating && currentStepIndex >= 1)) && (
                    <text y="50" fill="#EA580C" fontSize="10" fontWeight="600" textAnchor="middle">
                      Disrupted (Level 1)
                    </text>
                  )}
                </g>

                {/* Level 2: Hospital H-02 */}
                <g transform="translate(450, 110)" style={{ cursor: 'pointer' }} onClick={() => onSelectNodeDetail && onSelectNodeDetail('H-02')}>
                  <circle
                    r="22"
                    fill={simulationComplete || (isSimulating && currentStepIndex >= 3) ? '#FEF2F2' : '#FFFFFF'}
                    stroke={simulationComplete || (isSimulating && currentStepIndex >= 3) ? '#DC2626' : '#64748B'}
                    strokeWidth="2"
                  />
                  <text y="4" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">
                    H-02
                  </text>
                  <text y="36" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">
                    Hospital H-02
                  </text>
                  {(simulationComplete || (isSimulating && currentStepIndex >= 3)) && (
                    <text y="50" fill="#DC2626" fontSize="10" fontWeight="700" textAnchor="middle">
                      Access -78%
                    </text>
                  )}
                </g>

                {/* Level 2: Fire Station F-08 */}
                <g transform="translate(450, 290)" style={{ cursor: 'pointer' }} onClick={() => onSelectNodeDetail && onSelectNodeDetail('F-08')}>
                  <circle
                    r="22"
                    fill={simulationComplete || (isSimulating && currentStepIndex >= 4) ? '#FFFBEB' : '#FFFFFF'}
                    stroke={simulationComplete || (isSimulating && currentStepIndex >= 4) ? '#D97706' : '#64748B'}
                    strokeWidth="2"
                  />
                  <text y="4" fill="#0F172A" fontSize="11" fontWeight="700" textAnchor="middle">
                    F-08
                  </text>
                  <text y="36" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">
                    Fire Station F-08
                  </text>
                  {(simulationComplete || (isSimulating && currentStepIndex >= 4)) && (
                    <text y="50" fill="#D97706" fontSize="10" fontWeight="600" textAnchor="middle">
                      Delay +18m
                    </text>
                  )}
                </g>

                {/* Level 3: Road R-11 */}
                <g transform="translate(610, 110)">
                  <circle r="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                  <text y="4" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">
                    R-11
                  </text>
                  <text y="30" fill="#64748B" fontSize="10" textAnchor="middle">
                    Bypass
                  </text>
                </g>

                {/* Level 3: Police HQ P-01 */}
                <g transform="translate(610, 290)">
                  <circle r="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                  <text y="4" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">
                    P-01
                  </text>
                  <text y="30" fill="#64748B" fontSize="10" textAnchor="middle">
                    Police HQ
                  </text>
                </g>
              </svg>

              {/* Status banner */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 16,
                  right: 16,
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  padding: '8px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    className={`status-dot ${
                      simulationComplete ? 'critical' : isSimulating ? 'warning' : 'neutral'
                    }`}
                  />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {simulationComplete
                      ? 'Cascade Footprint: 18 downstream assets compromised'
                      : isSimulating
                      ? 'Tracing multi-stage failure propagation...'
                      : 'Click Run Simulation to compute cascade footprint'}
                  </span>
                </div>

                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  Model Confidence: <strong>91%</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Impact Assessment */}
        <div className="simulation-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {simulationResult && (
            <div className="nexus-card">
              <span className="section-label" style={{ marginBottom: 12 }}>
                IMPACT ASSESSMENT
              </span>

              {/* Metric Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Cascade Severity</span>
                  <AssetBadge criticality="CRITICAL" size="sm" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Affected Assets</span>
                  <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>
                    {simulationResult.totalAffectedCount} assets
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Critical Services</span>
                  <strong style={{ color: 'var(--status-critical)', fontSize: 13 }}>
                    {simulationResult.criticalAffectedCount} facilities
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Estimated Population</span>
                  <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>
                    {simulationResult.populationImpact.toLocaleString()}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Response Delay</span>
                  <strong style={{ color: 'var(--status-orange)', fontSize: 13 }}>
                    +{simulationResult.emergencyDelayMinutes} min
                  </strong>
                </div>
              </div>

              {/* "Why this matters" */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Why this matters
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                  Bridge B-17 is a high-connectivity transport asset. Its failure reduces access to two emergency facilities and increases traffic load on alternative routes.
                </p>
              </div>

              {/* "Recommended Response" */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                  Recommended Response
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    '1. Activate alternate route R-08',
                    '2. Notify Hospital H-02',
                    '3. Redirect emergency vehicles',
                    '4. Monitor congestion on R-11',
                  ].map((act, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <CheckCircle2 size={13} color="var(--status-healthy)" style={{ flexShrink: 0 }} />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
