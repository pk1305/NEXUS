import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, Users, ArrowRight, Zap, ShieldAlert, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { INITIAL_RESPONSE_ACTIONS } from '../../data/initialIncidents';
import { ResponseAction } from '../../types/infrastructure';
import { AssetBadge } from '../common/AssetBadge';

interface ResponsePlannerViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onNavigateToReports: () => void;
}

export const ResponsePlannerView: React.FC<ResponsePlannerViewProps> = ({
  onSelectAssetForSimulation,
  onNavigateToReports,
}) => {
  const [actions, setActions] = useState<ResponseAction[]>(INITIAL_RESPONSE_ACTIONS);
  const [assignedModalAction, setAssignedModalAction] = useState<ResponseAction | null>(null);
  const [teamInput, setTeamInput] = useState<string>('');

  const handleToggleComplete = (id: string) => {
    setActions((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleAssignTeam = (actionId: string, teamName: string) => {
    if (!teamName.trim()) return;
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, assignedTeam: teamName, status: 'DISPATCHED' } : a))
    );
    setAssignedModalAction(null);
    setTeamInput('');
  };

  const completedCount = actions.filter((a) => a.status === 'COMPLETED').length;
  const totalSavedMinutes = actions
    .filter((a) => a.status === 'COMPLETED')
    .reduce((sum, a) => sum + a.delayReductionMin, 0);

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Emergency Response Planner</h1>
          <p className="page-subtitle">
            AI-prioritized mitigation actions, mutual-aid dispatch coordination, and cascading bottleneck relief protocols.
          </p>
        </div>

        <button onClick={onNavigateToReports} className="btn btn-primary">
          <span>Generate Incident Report</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Progress Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div className="nexus-card" style={{ borderLeft: '3px solid var(--status-healthy)' }}>
          <span className="section-label">COMPLETED ACTIONS</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
            {completedCount} <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>/ {actions.length}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--status-healthy)', marginTop: 2 }}>
            {Math.round((completedCount / actions.length) * 100)}% Protocol Execution
          </div>
        </div>

        <div className="nexus-card" style={{ borderLeft: '3px solid var(--brand-blue)' }}>
          <span className="section-label">DELAY MITIGATED</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--brand-blue)', marginTop: 4 }}>
            +{totalSavedMinutes} min
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            Critical transit latency recovered
          </div>
        </div>

        <div className="nexus-card" style={{ borderLeft: '3px solid var(--status-critical)' }}>
          <span className="section-label">CRITICAL PRIORITY</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--status-critical)', marginTop: 4 }}>
            {actions.filter((a) => a.priority === 'CRITICAL').length}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            Urgent trauma ingress actions
          </div>
        </div>
      </div>

      {/* Actions Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {actions.map((act, index) => {
          const isDone = act.status === 'COMPLETED';
          const isCrit = act.priority === 'CRITICAL';

          return (
            <div
              key={act.id}
              className="nexus-card"
              style={{
                padding: 16,
                borderLeft: `4px solid ${
                  isDone
                    ? 'var(--status-healthy)'
                    : isCrit
                    ? 'var(--status-critical)'
                    : 'var(--brand-navy)'
                }`,
                opacity: isDone ? 0.75 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-navy)' }}>
                    0{index + 1}.
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {act.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AssetBadge criticality={act.priority} size="sm" />
                  <span
                    className="badge"
                    style={{
                      fontSize: 11,
                      background:
                        act.status === 'COMPLETED'
                          ? 'var(--status-healthy-bg)'
                          : act.status === 'DISPATCHED'
                          ? 'var(--status-info-bg)'
                          : 'var(--bg-surface-subtle)',
                      color:
                        act.status === 'COMPLETED'
                          ? 'var(--status-healthy)'
                          : act.status === 'DISPATCHED'
                          ? 'var(--status-info)'
                          : 'var(--text-muted)',
                    }}
                  >
                    {act.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '10px 0', fontSize: 12 }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Target Asset:</span>
                  <strong>{act.targetAssetId}</strong> — {act.targetAssetName}
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Rationale:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{act.reason}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Estimated Benefit:</span>
                  <span style={{ color: 'var(--status-healthy)', fontWeight: 600 }}>{act.estimatedBenefit}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>Assigned Unit:</span>
                  <span style={{ color: act.assignedTeam ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {act.assignedTeam || 'Unassigned'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                <button
                  onClick={() => setAssignedModalAction(act)}
                  className="btn btn-secondary"
                  style={{ padding: '5px 12px', fontSize: 12 }}
                >
                  <Users size={13} />
                  <span>{act.assignedTeam ? 'Reassign Team' : 'Assign Team'}</span>
                </button>

                <button
                  onClick={() => handleToggleComplete(act.id)}
                  className={isDone ? 'btn btn-secondary' : 'btn btn-primary'}
                  style={{ padding: '5px 12px', fontSize: 12 }}
                >
                  <CheckCircle2 size={13} />
                  <span>{isDone ? 'Mark Incomplete' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assign Team Modal */}
      {assignedModalAction && (
        <div className="modal-overlay" onClick={() => setAssignedModalAction(null)}>
          <div className="modal-card" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                Assign Response Unit
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {assignedModalAction.title}
              </p>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Metro Traffic Taskforce Unit 03', 'EMS Medical Command Central', 'Riverfront Civil Engineering Squad', 'Hazardous Response Station 08'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTeamInput(preset)}
                  style={{
                    padding: '8px 12px',
                    background: teamInput === preset ? 'var(--brand-blue-soft)' : 'var(--bg-app)',
                    border: teamInput === preset ? '1px solid var(--brand-blue)' : '1px solid var(--border-subtle)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {preset}
                </button>
              ))}

              <input
                type="text"
                className="input-control"
                placeholder="Or type custom dispatch unit..."
                value={teamInput}
                onChange={(e) => setTeamInput(e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setAssignedModalAction(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => handleAssignTeam(assignedModalAction.id, teamInput || 'Emergency Rapid Taskforce')}
                className="btn btn-primary"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
