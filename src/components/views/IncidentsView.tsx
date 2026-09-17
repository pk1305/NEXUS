import React, { useState } from 'react';
import { Flame, ShieldAlert, Clock, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { INITIAL_INCIDENTS } from '../../data/initialIncidents';
import { AssetBadge } from '../common/AssetBadge';
import { graphEngine } from '../../services/graphEngine';

interface IncidentsViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onNavigateToResponsePlanner: () => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  onSelectAssetForSimulation,
  onNavigateToResponsePlanner,
  onSelectNodeDetail,
}) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-204');

  const selectedIncident = INITIAL_INCIDENTS.find((i) => i.id === selectedIncidentId) || INITIAL_INCIDENTS[0];

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Active Emergency Incidents</h1>
          <p className="page-subtitle">
            Live infrastructure event logs, immediate structural failures, and predicted cascading disruption footprints.
          </p>
        </div>

        <button onClick={onNavigateToResponsePlanner} className="btn btn-primary">
          <span>Response Playbook</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid: Incident List (38%) | Incident Details (62%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20 }}>
        {/* Left: Incident List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INITIAL_INCIDENTS.map((inc) => {
            const isSelected = selectedIncidentId === inc.id;
            const isCrit = inc.severity === 'CRITICAL';

            return (
              <div
                key={inc.id}
                className="nexus-card nexus-card-interactive"
                style={{
                  padding: 14,
                  borderLeft: `3px solid ${isCrit ? 'var(--status-critical)' : 'var(--brand-navy)'}`,
                  background: isSelected ? 'var(--bg-surface-active)' : '#FFFFFF',
                }}
                onClick={() => setSelectedIncidentId(inc.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-navy)' }}>
                      {inc.id}
                    </span>
                    <AssetBadge criticality={inc.severity} size="sm" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{inc.reportedAgo}</span>
                  </div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                  {inc.title}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                  <span>Asset: <strong>{inc.primaryAssetId}</strong></span>
                  <span>{inc.affectedCount} affected assets</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Incident Details Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="nexus-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-navy)' }}>
                    {selectedIncident.id}
                  </span>
                  <AssetBadge criticality={selectedIncident.severity} size="sm" />
                  <span className="badge badge-neutral" style={{ fontSize: 11 }}>{selectedIncident.district}</span>
                </div>
                <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedIncident.title}
                </h2>
              </div>

              <button
                onClick={() => onSelectAssetForSimulation(selectedIncident.primaryAssetId)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Zap size={14} />
                <span>Simulate Cascade</span>
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16, background: 'var(--bg-app)', padding: 12, borderRadius: 6 }}>
              {selectedIncident.description}
            </p>

            {/* Key Telemetry */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PRIMARY ASSET</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-navy)', marginTop: 2 }}>
                  {selectedIncident.primaryAssetId}
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>AFFECTED INFRA</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-critical)', marginTop: 2 }}>
                  {selectedIncident.affectedCount} assets
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PREDICTED CASCADE</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-orange)', marginTop: 2 }}>
                  +{selectedIncident.predictedCascadeCount} downstream
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 10, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>EST. RECOVERY</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                  {selectedIncident.estimatedRecovery}
                </div>
              </div>
            </div>

            {/* Assigned Units */}
            <div style={{ marginBottom: 16 }}>
              <span className="section-label" style={{ marginBottom: 8 }}>
                ASSIGNED RESPONSE UNITS
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {selectedIncident.assignedTeams.map((team, idx) => (
                  <span key={idx} className="badge badge-info" style={{ fontSize: 11, padding: '4px 10px' }}>
                    {team}
                  </span>
                ))}
              </div>
            </div>

            {/* Mandated Triage Actions */}
            <div>
              <span className="section-label" style={{ marginBottom: 8 }}>
                MANDATED TRIAGE PROTOCOLS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {selectedIncident.immediateActions.map((act, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-app)',
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <CheckCircle2 size={13} color="var(--status-healthy)" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
