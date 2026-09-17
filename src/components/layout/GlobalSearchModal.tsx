import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Zap, Flame, Building2, ArrowRight } from 'lucide-react';
import { MOCK_ASSETS } from '../../data/mockInfrastructure';
import { INITIAL_INCIDENTS } from '../../data/initialIncidents';
import { AssetBadge } from '../common/AssetBadge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (assetId: string) => void;
  onSelectIncident: (incidentId: string) => void;
  onRunSimulation: (assetId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
  onSelectIncident,
  onRunSimulation,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        assets: MOCK_ASSETS.slice(0, 5),
        incidents: INITIAL_INCIDENTS.slice(0, 3),
      };
    }

    const q = query.toLowerCase().trim();
    const assets = MOCK_ASSETS.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.district.toLowerCase().includes(q) ||
        (q === 'high risk' && a.riskScore > 75) ||
        (q === 'critical' && a.criticality === 'CRITICAL')
    ).slice(0, 8);

    const incidents = INITIAL_INCIDENTS.filter(
      (inc) =>
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.primaryAssetId.toLowerCase().includes(q) ||
        inc.district.toLowerCase().includes(q)
    );

    return { assets, incidents };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#FFFFFF',
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            autoFocus
            type="text"
            placeholder="Search infrastructure assets (e.g. 'B-17', 'hospital', 'power station')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 15,
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: 11,
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 6px',
              borderRadius: 4,
              color: 'var(--text-muted)',
            }}
          >
            ESC
          </span>
        </div>

        {/* Quick Filter Chips */}
        <div
          style={{
            padding: '10px 20px',
            background: 'var(--bg-app)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Suggestions:</span>
          {['B-17', 'Hospital', 'Power Station', 'Critical', 'Riverfront Corridor'].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 4,
                padding: '2px 8px',
                fontSize: 11,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ maxHeight: 420, overflowY: 'auto', padding: '16px 20px' }}>
          {/* Assets Section */}
          <div style={{ marginBottom: 20 }}>
            <span className="section-label" style={{ marginBottom: 10 }}>
              INFRASTRUCTURE ASSETS ({searchResults.assets.length})
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {searchResults.assets.map((asset) => (
                <div
                  key={asset.id}
                  className="nexus-card nexus-card-interactive"
                  style={{
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => {
                    onSelectAsset(asset.id);
                    onClose();
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AssetBadge type={asset.type} size="sm" />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {asset.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {asset.district} • {asset.dependencies.length} deps • {asset.downstreamAssets.length} downstream
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AssetBadge criticality={asset.criticality} size="sm" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRunSimulation(asset.id);
                        onClose();
                      }}
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      <Zap size={12} />
                      <span>Simulate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incidents Section */}
          {searchResults.incidents.length > 0 && (
            <div>
              <span className="section-label" style={{ marginBottom: 10 }}>
                ACTIVE INCIDENTS ({searchResults.incidents.length})
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {searchResults.incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="nexus-card nexus-card-interactive"
                    style={{
                      padding: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: '3px solid var(--status-critical)',
                    }}
                    onClick={() => {
                      onSelectIncident(inc.id);
                      onClose();
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-navy)' }}>
                          {inc.id}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{inc.title}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                        Asset: {inc.primaryAssetId} • Reported {inc.reportedAgo} • {inc.district}
                      </div>
                    </div>

                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
