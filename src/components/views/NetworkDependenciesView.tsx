import React, { useState } from 'react';
import { Network, Zap, GitBranch, ArrowRight, Activity, Filter, Eye } from 'lucide-react';
import { CURATED_ASSETS, CURATED_EDGES } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';
import { graphEngine } from '../../services/graphEngine';

interface NetworkDependenciesViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const NetworkDependenciesView: React.FC<NetworkDependenciesViewProps> = ({
  onSelectAssetForSimulation,
  onSelectNodeDetail,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<'all' | 'clusterA' | 'clusterB'>('all');
  const [activeNodeId, setActiveNodeId] = useState<string>('B-17');

  const clusterANodes = ['B-17', 'R-04', 'H-02', 'F-08', 'R-11', 'R-08', 'P-01'];
  const clusterBNodes = ['P-03', 'S-07', 'H-05', 'W-02', 'H-02', 'C-02'];

  const displayedNodes = CURATED_ASSETS.filter((node) => {
    if (selectedCluster === 'clusterA') return clusterANodes.includes(node.id);
    if (selectedCluster === 'clusterB') return clusterBNodes.includes(node.id);
    return true;
  });

  const displayedEdges = CURATED_EDGES.filter((edge) => {
    if (selectedCluster === 'clusterA') return clusterANodes.includes(edge.source) && clusterANodes.includes(edge.target);
    if (selectedCluster === 'clusterB') return clusterBNodes.includes(edge.source) && clusterBNodes.includes(edge.target);
    return true;
  });

  const activeAsset = graphEngine.getAsset(activeNodeId) || CURATED_ASSETS[0];

  return (
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Network Dependencies</h1>
          <p className="page-subtitle">
            Interconnected municipal infrastructure dependencies, single points of failure, and cascading flow corridors.
          </p>
        </div>

        {/* Cluster Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCluster('all')}
            className={selectedCluster === 'all' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            All Critical Grids
          </button>
          <button
            onClick={() => setSelectedCluster('clusterA')}
            className={selectedCluster === 'clusterA' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            Cluster A: River-Healthcare Corridor
          </button>
          <button
            onClick={() => setSelectedCluster('clusterB')}
            className={selectedCluster === 'clusterB' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            Cluster B: Power-Water-Hospital Grid
          </button>
        </div>
      </div>

      {/* Grid: Graph Canvas (68%) | Node Inspector (32%) */}
      <div className="dependencies-grid">
        {/* Node-Link Interactive Canvas */}
        <div
          className="nexus-card"
          style={{
            padding: 0,
            minHeight: 520,
            background: '#FAFAFC',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span className="section-label">DIRECTED TOPOLOGICAL GRAPH G=(V,E)</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {displayedNodes.length} Nodes • {displayedEdges.length} Directed Edges
            </span>
          </div>

          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 780 480" style={{ width: '100%', height: '100%' }}>
              <defs>
                <marker id="netArrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                </marker>
                <marker id="netArrowActive" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
                </marker>
                <pattern id="netCanvasGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                </pattern>
              </defs>

              <rect width="780" height="480" fill="url(#netCanvasGrid)" />

              {/* Edges */}
              {displayedEdges.map((edge) => {
                const sourceNode = CURATED_ASSETS.find((n) => n.id === edge.source);
                const targetNode = CURATED_ASSETS.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToActive = edge.source === activeNodeId || edge.target === activeNodeId;
                const sx = sourceNode.coordinates.x * 0.85 + 20;
                const sy = sourceNode.coordinates.y * 0.80 + 10;
                const tx = targetNode.coordinates.x * 0.85 + 20;
                const ty = targetNode.coordinates.y * 0.80 + 10;

                return (
                  <g key={edge.id}>
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke={isConnectedToActive ? '#2563EB' : '#CBD5E1'}
                      strokeWidth={isConnectedToActive ? 2.2 : 1.2}
                      strokeDasharray={isConnectedToActive ? '5 3' : undefined}
                      markerEnd={isConnectedToActive ? 'url(#netArrowActive)' : 'url(#netArrow)'}
                    />

                    {isConnectedToActive && (
                      <text
                        x={(sx + tx) / 2}
                        y={(sy + ty) / 2 - 6}
                        fill="#2563EB"
                        fontSize="10"
                        fontFamily="var(--font-sans)"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {edge.dependencyType}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {displayedNodes.map((node) => {
                const isSelected = activeNodeId === node.id;
                const nx = node.coordinates.x * 0.85 + 20;
                const ny = node.coordinates.y * 0.80 + 10;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${nx}, ${ny})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveNodeId(node.id)}
                  >
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    )}

                    <circle
                      r={16}
                      fill={isSelected ? '#2563EB' : '#FFFFFF'}
                      stroke={isSelected ? '#1D4ED8' : '#0F2942'}
                      strokeWidth="2"
                    />

                    <text
                      x="0"
                      y="4"
                      fill={isSelected ? '#FFFFFF' : '#0F172A'}
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {node.id}
                    </text>

                    <text
                      x="0"
                      y="28"
                      fill="#475569"
                      fontSize="11"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {node.name.split('—')[0].trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Node Topology Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="nexus-card">
            <span className="section-label" style={{ marginBottom: 10 }}>
              NODE TOPOLOGY
            </span>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-navy)' }}>
                {activeAsset.id}
              </span>
              <AssetBadge criticality={activeAsset.criticality} size="sm" />
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              {activeAsset.name}
            </h3>

            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.4 }}>
              {activeAsset.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
              <div style={{ background: 'var(--bg-app)', padding: 8, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Upstream Dependencies:</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeAsset.dependencies.length} nodes
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 8, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Downstream Assets:</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-orange)' }}>
                  {activeAsset.downstreamAssets.length} nodes
                </div>
              </div>
            </div>

            {/* Depends On List */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Direct Upstream Parents:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {activeAsset.dependencies.map((depId) => {
                  const parent = graphEngine.getAsset(depId);
                  return (
                    <button
                      key={depId}
                      onClick={() => setActiveNodeId(depId)}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--bg-app)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'var(--text-primary)',
                        fontSize: 11,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span>
                        <strong>{depId}</strong> — {parent?.name.split('—')[0]}
                      </span>
                      <ArrowRight size={12} color="var(--text-muted)" />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onSelectAssetForSimulation(activeAsset.id)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '8px', fontSize: 12 }}
            >
              <Zap size={14} />
              <span>Simulate Failure on {activeAsset.id}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
