export type AssetCategory =
  | 'bridge'
  | 'road'
  | 'hospital'
  | 'fire_station'
  | 'police_station'
  | 'power_station'
  | 'substation'
  | 'water_facility'
  | 'comm_tower'
  | 'rail_station'
  | 'airport';

export type AssetStatus = 'operational' | 'warning' | 'elevated_risk' | 'disrupted' | 'failed' | 'inactive';

export type CriticalityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type District =
  | 'Central District'
  | 'North District'
  | 'Riverfront Corridor'
  | 'Harbor & Port'
  | 'Industrial Basin'
  | 'East Hills'
  | 'South Tech Zone';

export interface InfrastructureAsset {
  id: string; // e.g. "B-17", "R-04", "H-02"
  name: string; // e.g. "Central River Bridge"
  type: AssetCategory;
  district: District;
  status: AssetStatus;
  criticality: CriticalityLevel;
  health: number; // 0 - 100
  riskScore: number; // 0 - 100
  failureProbability: number; // 0 - 100 (%)
  dependencies: string[]; // Asset IDs this node depends on (upstream)
  downstreamAssets: string[]; // Asset IDs that depend on this node
  populationAffected: number;
  recoveryDifficulty: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  estimatedRecoveryHours: number;
  lastInspection: string;
  coordinates: { x: number; y: number; lat?: number; lng?: number };
  capacity?: number;
  description?: string;
}

export interface DependencyEdge {
  id: string;
  source: string; // From asset ID
  target: string; // To asset ID
  criticality: CriticalityLevel;
  dependencyType: 'power' | 'physical_access' | 'data' | 'water' | 'emergency_route' | 'supply_chain';
  redundancy: boolean;
  flowVolume?: string;
}

export type FailureSeverity = 'low' | 'medium' | 'severe' | 'complete';

export interface CascadeStep {
  stepIndex: number;
  timeSeconds: number; // T+0s, T+2s, T+4s, etc.
  level: 0 | 1 | 2 | 3;
  levelName: string; // "PRIMARY FAILURE", "DIRECT IMPACT", "SECONDARY IMPACT", "TERTIARY IMPACT"
  assetId: string;
  assetName: string;
  assetType: AssetCategory;
  previousStatus: AssetStatus;
  newStatus: AssetStatus;
  impactDescription: string;
  metricImpact?: string;
  isCritical: boolean;
}

export interface SimulationResult {
  sourceAssetId: string;
  severity: FailureSeverity;
  durationHours: number;
  cascadeSeverity: 'LOW' | 'MEDIUM' | 'ELEVATED' | 'CRITICAL';
  aiConfidence: number;
  totalAffectedCount: number;
  criticalAffectedCount: number;
  populationImpact: number;
  emergencyDelayMinutes: number;
  trafficImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  powerImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  healthcareImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  waterImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  communicationImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedRecoveryMinHours: number;
  estimatedRecoveryMaxHours: number;
  steps: CascadeStep[];
  primaryCount: number;
  secondaryCount: number;
  tertiaryCount: number;
  criticalImpactCount: number;
  aiExplanation: {
    summary: string;
    keyFactors: string[];
    whyCritical: string;
    vulnerabilityInsight: string;
  };
}

export interface Incident {
  id: string; // "INC-204"
  title: string;
  type: AssetCategory;
  primaryAssetId: string;
  district: District;
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'CONTAINED' | 'RESOLVED';
  reportedAgo: string;
  timestamp: string;
  affectedCount: number;
  predictedCascadeCount: number;
  assignedTeams: string[];
  estimatedRecovery: string;
  description: string;
  immediateActions: string[];
}

export interface ResponseAction {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  targetAssetId: string;
  targetAssetName: string;
  reason: string;
  estimatedBenefit: string;
  delayReductionMin: number;
  assignedTeam?: string;
  status: 'PENDING' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface ScenarioDefinition {
  id: string;
  name: string;
  description: string;
  failures: {
    assetId: string;
    severity: FailureSeverity;
  }[];
}

export interface NotificationItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timeAgo: string;
  assetId?: string;
  unread: boolean;
}
