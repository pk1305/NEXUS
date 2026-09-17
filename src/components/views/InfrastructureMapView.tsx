import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Zap,
  Building2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { InfrastructureAsset, AssetCategory, District } from '../../types/infrastructure';
import { MOCK_ASSETS, CURATED_ASSETS } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';

interface InfrastructureMapViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const InfrastructureMapView: React.FC<InfrastructureMapViewProps> = ({
  onSelectAssetForSimulation,
  onSelectNodeDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [hoveredAsset, setHoveredAsset] = useState<InfrastructureAsset | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter((a) => {
      const matchCat = selectedCategory === 'all' || a.type === selectedCategory;
      const matchDist = selectedDistrict === 'all' || a.district === selectedDistrict;
      return matchCat && matchDist;
    });
  }, [selectedCategory, selectedDistrict]);

  const districts: District[] = [
    'Central District',
    'North District',
    'Riverfront Corridor',
    'Harbor & Port',
    'Industrial Basin',
    'East Hills',
    'South Tech Zone',
  ];

  return (
    <div className="view-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="page-title">Infrastructure GIS Map</h1>
          <p className="page-subtitle">
            Geospatial representation of municipal assets, arterial transit routes, and physical dependencies across Metro City.
          </p>
        </div>

        {/* Filters and Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <select
            className="input-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Infrastructure Layers (10)</option>
            <option value="bridge">Bridges (120)</option>
            <option value="road">Arterial Roads (500)</option>
            <option value="hospital">Hospitals & Trauma (30)</option>
            <option value="fire_station">Fire & Rescue (50)</option>
            <option value="police_station">Police Precincts (20)</option>
            <option value="power_station">Power Generation (25)</option>
            <option value="substation">Substations (40)</option>
            <option value="water_facility">Water Treatment (20)</option>
            <option value="comm_tower">Telecom & 5G (100)</option>
            <option value="rail_station">Rail & Transit (15)</option>
            <option value="airport">Airports (5)</option>
          </select>

          <select
            className="input-control"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="all">Citywide (7 Districts)</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
              className="btn btn-secondary"
              style={{ padding: '6px 8px' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
              className="btn btn-secondary"
              style={{ padding: '6px 8px' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="btn btn-secondary"
              style={{ padding: '6px 8px' }}
              title="Reset"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Vector Map Surface */}
      <div
        className="nexus-card"
        style={{
          flex: 1,
          padding: 0,
          minHeight: 560,
          background: '#F1F4F8',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <svg
          viewBox="0 0 900 580"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
        >
          <defs>
            <pattern id="fullGisGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="gisWater" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          <rect width="900" height="580" fill="#F8FAFC" />
          <rect width="900" height="580" fill="url(#fullGisGrid)" />

          {/* District Polygons */}
          <polygon points="50,40 380,30 420,200 80,240" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="140" y="80" fill="#64748B" fontSize="11" fontWeight="600" letterSpacing="0.05em">
            NORTH DISTRICT
          </text>

          <polygon points="360,200 820,180 860,460 400,480" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="560" y="230" fill="#64748B" fontSize="11" fontWeight="600" letterSpacing="0.05em">
            CENTRAL DISTRICT
          </text>

          <text x="640" y="470" fill="#64748B" fontSize="11" fontWeight="600" letterSpacing="0.05em">
            HARBOR & PORT
          </text>

          {/* Metro River */}
          <path
            d="M 120,0 C 260,180 340,240 480,320 C 620,400 740,420 900,460 L 900,580 L 0,580 L 0,0 Z"
            fill="url(#gisWater)"
          />
          <path
            d="M 120,0 C 260,180 340,240 480,320 C 620,400 740,420 900,460"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.5"
          />

          {/* Highway grid */}
          <path d="M 40,300 L 860,300" stroke="#94A3B8" strokeWidth="4" />
          <path d="M 480,30 L 480,560" stroke="#94A3B8" strokeWidth="4" />
          <path d="M 150,100 L 750,500" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M 750,100 L 150,500" stroke="#CBD5E1" strokeWidth="2" />

          {/* Bridge B-17 Graphic */}
          <rect x="468" y="310" width="24" height="40" fill="#0F2942" rx="2" />
          <line x1="460" y1="310" x2="500" y2="350" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="460" y1="350" x2="500" y2="310" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Render All Filtered Nodes */}
          {filteredAssets.map((asset) => {
            const isCurated = CURATED_ASSETS.some((c) => c.id === asset.id);
            const isHovered = hoveredAsset?.id === asset.id;
            const isB17 = asset.id === 'B-17';
            const isP03 = asset.id === 'P-03';
            const isH02 = asset.id === 'H-02';

            const color = isB17
              ? 'var(--status-critical)'
              : isP03
              ? 'var(--status-warning)'
              : isH02
              ? 'var(--status-orange)'
              : asset.criticality === 'CRITICAL'
              ? 'var(--status-critical)'
              : 'var(--brand-navy)';

            const r = isB17 ? 9 : isCurated ? 7 : 4;

            return (
              <g
                key={asset.id}
                transform={`translate(${asset.coordinates.x}, ${asset.coordinates.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredAsset(asset)}
                onMouseLeave={() => setHoveredAsset(null)}
                onClick={() => onSelectNodeDetail(asset.id)}
              >
                {isHovered && (
                  <circle
                    r={r + 8}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                  />
                )}

                <circle r={r} fill={color} stroke="#FFFFFF" strokeWidth={isCurated ? 1.5 : 0.8} />

                {(isCurated || isHovered) && (
                  <text
                    x={r + 6}
                    y="4"
                    fill="#0F172A"
                    fontSize="11"
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                  >
                    {asset.id}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Panel on Selection / Hover */}
        {hoveredAsset && (
          <div
            className="nexus-card"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 300,
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 30,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-navy)' }}>
                  {hoveredAsset.id}
                </span>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                  {hoveredAsset.name}
                </div>
              </div>
              <AssetBadge status={hoveredAsset.status} size="sm" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, margin: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Criticality:</span>
                <AssetBadge criticality={hoveredAsset.criticality} size="sm" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Connected Assets:</span>
                <span style={{ fontWeight: 600 }}>{hoveredAsset.downstreamAssets.length} assets</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Risk:</span>
                <span style={{ fontWeight: 700, color: hoveredAsset.riskScore > 75 ? 'var(--status-critical)' : 'var(--status-warning)' }}>
                  {hoveredAsset.riskScore}%
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button
                onClick={() => onSelectAssetForSimulation(hoveredAsset.id)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '5px 8px', fontSize: 11 }}
              >
                <Zap size={12} />
                <span>Simulate</span>
              </button>
              <button
                onClick={() => onSelectNodeDetail(hoveredAsset.id)}
                className="btn btn-secondary"
                style={{ padding: '5px 8px', fontSize: 11 }}
              >
                Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
