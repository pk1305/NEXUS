import React, { useState, useMemo } from 'react';
import { Database, Search, Filter, Zap, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { MOCK_ASSETS } from '../../data/mockInfrastructure';
import { AssetBadge } from '../common/AssetBadge';
import { AssetCategory, AssetStatus, CriticalityLevel, District } from '../../types/infrastructure';

interface CriticalAssetsViewProps {
  onSelectAssetForSimulation: (assetId: string) => void;
  onSelectNodeDetail: (assetId: string) => void;
}

export const CriticalAssetsView: React.FC<CriticalAssetsViewProps> = ({
  onSelectAssetForSimulation,
  onSelectNodeDetail,
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter((asset) => {
      const matchSearch =
        !search.trim() ||
        asset.id.toLowerCase().includes(search.toLowerCase()) ||
        asset.name.toLowerCase().includes(search.toLowerCase());

      const matchType = selectedType === 'all' || asset.type === selectedType;
      const matchDistrict = selectedDistrict === 'all' || asset.district === selectedDistrict;
      const matchCriticality = selectedCriticality === 'all' || asset.criticality === selectedCriticality;
      const matchStatus = selectedStatus === 'all' || asset.status === selectedStatus;

      return matchSearch && matchType && matchDistrict && matchCriticality && matchStatus;
    });
  }, [search, selectedType, selectedDistrict, selectedCriticality, selectedStatus]);

  const totalPages = Math.ceil(filteredAssets.length / pageSize) || 1;
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
    <div className="view-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Municipal Infrastructure Registry</h1>
          <p className="page-subtitle">
            Comprehensive registry of 2,486 municipal assets across Metro City with operational parameters, dependency depth, and inspection schedules.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="nexus-card"
        style={{
          padding: 14,
          marginBottom: 16,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 240, maxWidth: 360 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="input-control"
            placeholder="Search by ID (B-17, H-02) or Name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <select
            className="input-control"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Types</option>
            <option value="bridge">Bridge</option>
            <option value="road">Road</option>
            <option value="hospital">Hospital</option>
            <option value="fire_station">Fire Station</option>
            <option value="police_station">Police Station</option>
            <option value="power_station">Power Station</option>
            <option value="substation">Substation</option>
            <option value="water_facility">Water Facility</option>
            <option value="comm_tower">Comm Tower</option>
            <option value="rail_station">Rail Station</option>
            <option value="airport">Airport</option>
          </select>

          <select
            className="input-control"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            className="input-control"
            value={selectedCriticality}
            onChange={(e) => {
              setSelectedCriticality(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Criticalities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            className="input-control"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="warning">Warning</option>
            <option value="elevated_risk">Elevated Risk</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="nexus-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  ASSET ID
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  TYPE
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  NAME & LOCATION
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  STATUS
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  CRITICALITY
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  DEPENDENCIES
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  RISK
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  LAST INSPECTION
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.map((asset) => (
                <tr
                  key={asset.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background var(--transition-fast)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => onSelectNodeDetail(asset.id)}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--brand-navy)' }}>
                      {asset.id}
                    </span>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <AssetBadge type={asset.type} size="sm" />
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{asset.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{asset.district}</div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <AssetBadge status={asset.status} size="sm" />
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <AssetBadge criticality={asset.criticality} size="sm" />
                  </td>

                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                    {asset.dependencies.length} up / {asset.downstreamAssets.length} down
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 700, color: asset.riskScore > 75 ? 'var(--status-critical)' : 'var(--status-warning)' }}>
                      {asset.riskScore}%
                    </span>
                  </td>

                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                    {asset.lastInspection}
                  </td>

                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAssetForSimulation(asset.id);
                      }}
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      <Zap size={11} />
                      <span>Simulate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--bg-surface-subtle)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Showing {paginatedAssets.length} of {filteredAssets.length} assets
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-secondary"
              style={{ padding: '4px 8px' }}
            >
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-secondary"
              style={{ padding: '4px 8px' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
