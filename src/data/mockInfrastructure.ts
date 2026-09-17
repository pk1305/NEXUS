import { InfrastructureAsset, DependencyEdge, District, AssetCategory, CriticalityLevel, AssetStatus } from '../types/infrastructure';

const DISTRICTS: District[] = [
  'Central District',
  'North District',
  'Riverfront Corridor',
  'Harbor & Port',
  'Industrial Basin',
  'East Hills',
  'South Tech Zone',
];

// Curated high-profile priority nodes with rich topological relations
export const CURATED_ASSETS: InfrastructureAsset[] = [
  {
    id: 'B-17',
    name: 'Bridge B-17 — Central River Bridge',
    type: 'bridge',
    district: 'Riverfront Corridor',
    status: 'operational',
    criticality: 'CRITICAL',
    health: 94,
    riskScore: 92,
    failureProbability: 23,
    dependencies: ['R-04', 'P-03', 'C-02'],
    downstreamAssets: ['R-04', 'H-02', 'F-08', 'W-02', 'R-11', 'R-08', 'P-01', 'S-07', 'H-05', 'RC-01', 'R-22', 'R-29', 'F-03', 'C-05'],
    populationAffected: 52400,
    recoveryDifficulty: 'EXTREME',
    estimatedRecoveryHours: 14,
    lastInspection: '12 days ago',
    coordinates: { x: 480, y: 340, lat: 45.512, lng: -122.678 },
    capacity: 120000,
    description: 'Primary 8-lane suspension bridge crossing the Metro River. Carries 32% of all downtown emergency transit and high-voltage trunk conduits.',
  },
  {
    id: 'R-04',
    name: 'Road R-04 — Central Riverfront Arterial',
    type: 'road',
    district: 'Riverfront Corridor',
    status: 'operational',
    criticality: 'HIGH',
    health: 88,
    riskScore: 81,
    failureProbability: 19,
    dependencies: ['B-17', 'P-03'],
    downstreamAssets: ['H-02', 'F-08', 'R-11', 'P-01', 'F-03', 'R-08'],
    populationAffected: 38200,
    recoveryDifficulty: 'MODERATE',
    estimatedRecoveryHours: 6,
    lastInspection: '4 days ago',
    coordinates: { x: 430, y: 360 },
    capacity: 75000,
    description: 'Vital 6-lane express avenue linking Central River Bridge with the medical and emergency services corridor.',
  },
  {
    id: 'H-02',
    name: 'Hospital H-02 — Metro Central Trauma Center',
    type: 'hospital',
    district: 'Central District',
    status: 'operational',
    criticality: 'CRITICAL',
    health: 98,
    riskScore: 86,
    failureProbability: 14,
    dependencies: ['R-04', 'P-03', 'W-02', 'S-07'],
    downstreamAssets: ['F-08', 'P-01'],
    populationAffected: 45000,
    recoveryDifficulty: 'EXTREME',
    estimatedRecoveryHours: 24,
    lastInspection: '1 day ago',
    coordinates: { x: 550, y: 280 },
    capacity: 850,
    description: 'Level 1 Regional Trauma and Emergency Care Center. Relies on continuous unobstructed ambulance access from R-04.',
  },
  {
    id: 'F-08',
    name: 'Fire Station F-08 — Central HazMat & Rescue',
    type: 'fire_station',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 95,
    riskScore: 74,
    failureProbability: 11,
    dependencies: ['R-04', 'B-17', 'C-02', 'W-02'],
    downstreamAssets: ['H-02', 'P-01'],
    populationAffected: 28000,
    recoveryDifficulty: 'MODERATE',
    estimatedRecoveryHours: 4,
    lastInspection: '2 days ago',
    coordinates: { x: 380, y: 410 },
    capacity: 18,
    description: 'Primary rapid-deployment rescue and fire response squad servicing the downtown high-rise zone.',
  },
  {
    id: 'P-03',
    name: 'Power Station P-03 — North Thermal & Grid Station',
    type: 'power_station',
    district: 'North District',
    status: 'warning',
    criticality: 'CRITICAL',
    health: 72,
    riskScore: 89,
    failureProbability: 61,
    dependencies: ['W-02', 'C-02'],
    downstreamAssets: ['S-07', 'H-02', 'H-05', 'B-17', 'W-02', 'RC-01', 'A-01', 'C-02', 'P-01', 'F-08', 'R-04'],
    populationAffected: 112000,
    recoveryDifficulty: 'EXTREME',
    estimatedRecoveryHours: 18,
    lastInspection: '3 days ago',
    coordinates: { x: 510, y: 130 },
    capacity: 1200,
    description: '1,200 MW Combined-cycle generation plant providing 44% of Metro City base-load grid capacity.',
  },
  {
    id: 'S-07',
    name: 'Substation S-07 — Downtown High-Voltage Hub',
    type: 'substation',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 89,
    riskScore: 78,
    failureProbability: 28,
    dependencies: ['P-03'],
    downstreamAssets: ['H-02', 'C-02', 'RC-01', 'P-01'],
    populationAffected: 67000,
    recoveryDifficulty: 'HIGH',
    estimatedRecoveryHours: 10,
    lastInspection: '6 days ago',
    coordinates: { x: 470, y: 240 },
    capacity: 450,
    description: 'Stepped-down distribution substation supplying the downtown commercial district and medical campus.',
  },
  {
    id: 'W-02',
    name: 'Water Plant W-02 — River Basin Treatment Facility',
    type: 'water_facility',
    district: 'Riverfront Corridor',
    status: 'operational',
    criticality: 'HIGH',
    health: 91,
    riskScore: 77,
    failureProbability: 18,
    dependencies: ['P-03', 'S-07'],
    downstreamAssets: ['H-02', 'H-05', 'F-08', 'F-03'],
    populationAffected: 84000,
    recoveryDifficulty: 'HIGH',
    estimatedRecoveryHours: 12,
    lastInspection: '8 days ago',
    coordinates: { x: 340, y: 310 },
    capacity: 90,
    description: 'Processes 90 million gallons of potable water daily for Central and North districts.',
  },
  {
    id: 'R-11',
    name: 'Road R-11 — Metro Bypass Emergency Corridor',
    type: 'road',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 82,
    riskScore: 68,
    failureProbability: 22,
    dependencies: ['B-17', 'R-04'],
    downstreamAssets: ['H-02', 'H-05', 'A-01'],
    populationAffected: 31000,
    recoveryDifficulty: 'LOW',
    estimatedRecoveryHours: 5,
    lastInspection: '15 days ago',
    coordinates: { x: 620, y: 390 },
    capacity: 50000,
    description: 'Secondary relief bypass route used for heavy transit and emergency diversions.',
  },
  {
    id: 'R-08',
    name: 'Road R-08 — West River Diverter Boulevard',
    type: 'road',
    district: 'Riverfront Corridor',
    status: 'operational',
    criticality: 'MEDIUM',
    health: 87,
    riskScore: 55,
    failureProbability: 16,
    dependencies: ['B-17'],
    downstreamAssets: ['F-03', 'P-01'],
    populationAffected: 19000,
    recoveryDifficulty: 'LOW',
    estimatedRecoveryHours: 4,
    lastInspection: '18 days ago',
    coordinates: { x: 360, y: 220 },
    capacity: 40000,
    description: 'Peripheral bypass route that absorbs overflow from Bridge B-17 during transit incidents.',
  },
  {
    id: 'H-05',
    name: 'Hospital H-05 — North District Community Medical',
    type: 'hospital',
    district: 'North District',
    status: 'operational',
    criticality: 'HIGH',
    health: 93,
    riskScore: 73,
    failureProbability: 15,
    dependencies: ['P-03', 'W-02', 'R-11'],
    downstreamAssets: ['F-03'],
    populationAffected: 32000,
    recoveryDifficulty: 'HIGH',
    estimatedRecoveryHours: 16,
    lastInspection: '5 days ago',
    coordinates: { x: 680, y: 160 },
    capacity: 350,
    description: 'Secondary 350-bed medical facility supporting northern urban sectors.',
  },
  {
    id: 'C-02',
    name: 'Comm Tower C-02 — Metro Emergency Wireless Mast',
    type: 'comm_tower',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 96,
    riskScore: 65,
    failureProbability: 9,
    dependencies: ['S-07', 'P-03'],
    downstreamAssets: ['P-01', 'F-08', 'F-03', 'B-17', 'H-02'],
    populationAffected: 62000,
    recoveryDifficulty: 'MODERATE',
    estimatedRecoveryHours: 8,
    lastInspection: '10 days ago',
    coordinates: { x: 500, y: 200 },
    capacity: 250000,
    description: 'Central telecommunications tower carrying emergency first-responder P25 radio repeaters and IoT grid telemetry.',
  },
  {
    id: 'P-01',
    name: 'Police Station P-01 — Metropolitan Law Enforcement HQ',
    type: 'police_station',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 94,
    riskScore: 69,
    failureProbability: 12,
    dependencies: ['C-02', 'R-04', 'P-03'],
    downstreamAssets: ['A-01', 'RC-01'],
    populationAffected: 48000,
    recoveryDifficulty: 'LOW',
    estimatedRecoveryHours: 3,
    lastInspection: '7 days ago',
    coordinates: { x: 440, y: 260 },
    capacity: 450,
    description: 'Central dispatch command for citywide police patrols and riot/crisis management.',
  },
  {
    id: 'F-03',
    name: 'Fire Station F-03 — Riverfront Station 3',
    type: 'fire_station',
    district: 'Riverfront Corridor',
    status: 'operational',
    criticality: 'MEDIUM',
    health: 92,
    riskScore: 58,
    failureProbability: 14,
    dependencies: ['R-08', 'W-02', 'C-02'],
    downstreamAssets: ['H-05'],
    populationAffected: 22000,
    recoveryDifficulty: 'LOW',
    estimatedRecoveryHours: 3,
    lastInspection: '9 days ago',
    coordinates: { x: 290, y: 270 },
    capacity: 12,
    description: 'Riverfront fire rescue company with marine rescue vessel support.',
  },
  {
    id: 'RC-01',
    name: 'Rail Station RC-01 — Grand Central Metro Terminal',
    type: 'rail_station',
    district: 'Central District',
    status: 'operational',
    criticality: 'HIGH',
    health: 90,
    riskScore: 71,
    failureProbability: 21,
    dependencies: ['P-03', 'S-07', 'R-04'],
    downstreamAssets: ['A-01'],
    populationAffected: 95000,
    recoveryDifficulty: 'HIGH',
    estimatedRecoveryHours: 12,
    lastInspection: '11 days ago',
    coordinates: { x: 570, y: 350 },
    capacity: 180000,
    description: 'Multi-modal transit terminal handling 180,000 daily commuters across 8 commuter lines.',
  },
  {
    id: 'A-01',
    name: 'Airport A-01 — Metro International Airport',
    type: 'airport',
    district: 'Harbor & Port',
    status: 'operational',
    criticality: 'HIGH',
    health: 97,
    riskScore: 62,
    failureProbability: 8,
    dependencies: ['P-03', 'R-11', 'C-02', 'RC-01'],
    downstreamAssets: [],
    populationAffected: 58000,
    recoveryDifficulty: 'EXTREME',
    estimatedRecoveryHours: 20,
    lastInspection: '2 days ago',
    coordinates: { x: 740, y: 440 },
    capacity: 45000,
    description: 'International air transport gateway with dedicated cargo logistics handling.',
  },
];

// Curated priority edges representing the vulnerable clusters
export const CURATED_EDGES: DependencyEdge[] = [
  // Cluster A: River corridor to Healthcare / Emergency (B-17 -> R-04 -> H-02 / F-08)
  { id: 'e-b17-r04', source: 'B-17', target: 'R-04', criticality: 'CRITICAL', dependencyType: 'physical_access', redundancy: false, flowVolume: '85k vehicles/day' },
  { id: 'e-r04-h02', source: 'R-04', target: 'H-02', criticality: 'CRITICAL', dependencyType: 'emergency_route', redundancy: false, flowVolume: 'Direct Trauma Corridor' },
  { id: 'e-r04-f08', source: 'R-04', target: 'F-08', criticality: 'CRITICAL', dependencyType: 'emergency_route', redundancy: false, flowVolume: 'Rapid HazMat Access' },
  { id: 'e-b17-r11', source: 'B-17', target: 'R-11', criticality: 'HIGH', dependencyType: 'physical_access', redundancy: true, flowVolume: 'Overflow Bypass' },
  { id: 'e-b17-r08', source: 'B-17', target: 'R-08', criticality: 'MEDIUM', dependencyType: 'physical_access', redundancy: true, flowVolume: 'Secondary River Bypass' },
  { id: 'e-r04-p01', source: 'R-04', target: 'P-01', criticality: 'HIGH', dependencyType: 'emergency_route', redundancy: true, flowVolume: 'Patrol Corridor' },
  { id: 'e-r11-h05', source: 'R-11', target: 'H-05', criticality: 'HIGH', dependencyType: 'physical_access', redundancy: true, flowVolume: 'North Patient Transit' },

  // Cluster B: Power & Grid (P-03 -> S-07 -> H-02, W-02, C-02)
  { id: 'e-p03-s07', source: 'P-03', target: 'S-07', criticality: 'CRITICAL', dependencyType: 'power', redundancy: false, flowVolume: '450kV Trunk Line' },
  { id: 'e-s07-h02', source: 'S-07', target: 'H-02', criticality: 'CRITICAL', dependencyType: 'power', redundancy: true, flowVolume: 'Medical Dedicated Feed' },
  { id: 'e-p03-w02', source: 'P-03', target: 'W-02', criticality: 'CRITICAL', dependencyType: 'power', redundancy: false, flowVolume: 'Treatment Plant Pump Grid' },
  { id: 'e-s07-c02', source: 'S-07', target: 'C-02', criticality: 'HIGH', dependencyType: 'power', redundancy: true, flowVolume: 'Emergency Mast Power' },
  { id: 'e-p03-b17', source: 'P-03', target: 'B-17', criticality: 'MEDIUM', dependencyType: 'power', redundancy: true, flowVolume: 'Bridge Lighting & Signals' },
  { id: 'e-p03-rc01', source: 'P-03', target: 'RC-01', criticality: 'HIGH', dependencyType: 'power', redundancy: false, flowVolume: 'Rail Traction Power' },

  // Water dependencies
  { id: 'e-w02-h02', source: 'W-02', target: 'H-02', criticality: 'CRITICAL', dependencyType: 'water', redundancy: false, flowVolume: 'Sterilization & Cooling Water' },
  { id: 'e-w02-f08', source: 'W-02', target: 'F-08', criticality: 'HIGH', dependencyType: 'water', redundancy: true, flowVolume: 'Hydrant Main Supply' },

  // Comms dependencies
  { id: 'e-c02-p01', source: 'C-02', target: 'P-01', criticality: 'HIGH', dependencyType: 'data', redundancy: false, flowVolume: 'CAD Dispatch Link' },
  { id: 'e-c02-f08', source: 'C-02', target: 'F-08', criticality: 'HIGH', dependencyType: 'data', redundancy: false, flowVolume: 'P25 Emergency Radio' },
  { id: 'e-c02-h02', source: 'C-02', target: 'H-02', criticality: 'MEDIUM', dependencyType: 'data', redundancy: true, flowVolume: 'Ambulance Telemetry' },
];

/**
 * Procedural generation for the remaining 2,486 total assets
 * to simulate a full enterprise scale city network with 2,486+ nodes and 4,000+ edges.
 */
function generateFullInfrastructure(): { assets: InfrastructureAsset[]; edges: DependencyEdge[] } {
  const allAssets: InfrastructureAsset[] = [...CURATED_ASSETS];
  const allEdges: DependencyEdge[] = [...CURATED_EDGES];

  const categoryCounts: Record<AssetCategory, number> = {
    road: 500,
    bridge: 120,
    hospital: 30,
    fire_station: 50,
    police_station: 20,
    power_station: 25,
    substation: 40,
    water_facility: 20,
    comm_tower: 100,
    rail_station: 15,
    airport: 5,
  };

  const prefixes: Record<AssetCategory, string> = {
    road: 'R',
    bridge: 'B',
    hospital: 'H',
    fire_station: 'F',
    police_station: 'P',
    power_station: 'P',
    substation: 'S',
    water_facility: 'W',
    comm_tower: 'C',
    rail_station: 'RC',
    airport: 'A',
  };

  // Keep track of IDs we already have
  const existingIds = new Set(CURATED_ASSETS.map((a) => a.id));

  // Category names generator
  const categoryNamer: Record<AssetCategory, (index: number, dist: District) => string> = {
    road: (i, dist) => `${dist} Sector Route ${i < 10 ? '0' + i : i}`,
    bridge: (i, dist) => `${dist} Overpass B-${i < 10 ? '0' + i : i}`,
    hospital: (i, dist) => `${dist} Medical Pavilion ${i}`,
    fire_station: (i, dist) => `${dist} Fire Engine Station ${i}`,
    police_station: (i, dist) => `${dist} Precinct ${i}`,
    power_station: (i, dist) => `${dist} Grid Node PS-${i}`,
    substation: (i, dist) => `${dist} Feeder Substation S-${i}`,
    water_facility: (i, dist) => `${dist} Booster Pumping Station W-${i}`,
    comm_tower: (i, dist) => `${dist} Cellular Mast C-${i}`,
    rail_station: (i, dist) => `${dist} Transit Junction RC-${i}`,
    airport: (i, dist) => `${dist} Airfield Terminal A-${i}`,
  };

  // Generate procedural assets
  (Object.keys(categoryCounts) as AssetCategory[]).forEach((cat) => {
    const targetCount = categoryCounts[cat];
    const currentCuratedForCat = CURATED_ASSETS.filter((a) => a.type === cat).length;
    const toGenerate = targetCount - currentCuratedForCat;

    for (let i = 1; i <= toGenerate; i++) {
      let candidateId = `${prefixes[cat]}-${i < 10 ? '0' + i : i}`;
      if (existingIds.has(candidateId)) {
        candidateId = `${prefixes[cat]}-${i + 50}`;
      }
      existingIds.add(candidateId);

      const district = DISTRICTS[(i + cat.length) % DISTRICTS.length];
      const isCriticalTier = (i % 25 === 0);
      const isHighTier = (i % 8 === 0);

      const criticality: CriticalityLevel = isCriticalTier ? 'CRITICAL' : isHighTier ? 'HIGH' : i % 3 === 0 ? 'MEDIUM' : 'LOW';
      const health = 75 + Math.floor((i * 17) % 25);
      const riskScore = isCriticalTier ? 75 + ((i * 3) % 20) : 15 + ((i * 7) % 65);
      const failureProbability = isCriticalTier ? 25 + ((i * 5) % 40) : 5 + ((i * 3) % 30);
      const status: AssetStatus = riskScore > 85 ? 'elevated_risk' : riskScore > 65 ? 'warning' : 'operational';

      // District-based coordinates around center
      const distOffset = DISTRICTS.indexOf(district) * 70;
      const angle = (i * 0.45) % (Math.PI * 2);
      const radius = 90 + ((i * 13) % 280);
      const x = Math.round(450 + Math.cos(angle) * radius + (distOffset % 120 - 60));
      const y = Math.round(300 + Math.sin(angle) * radius + ((distOffset * 2) % 100 - 50));

      const asset: InfrastructureAsset = {
        id: candidateId,
        name: categoryNamer[cat](i, district),
        type: cat,
        district,
        status,
        criticality,
        health,
        riskScore,
        failureProbability,
        dependencies: [],
        downstreamAssets: [],
        populationAffected: 1500 + ((i * 731) % 45000),
        recoveryDifficulty: isCriticalTier ? 'EXTREME' : isHighTier ? 'HIGH' : 'MODERATE',
        estimatedRecoveryHours: isCriticalTier ? 12 : isHighTier ? 6 : 3,
        lastInspection: `${(i % 28) + 1} days ago`,
        coordinates: { x: Math.max(50, Math.min(850, x)), y: Math.max(50, Math.min(550, y)) },
        capacity: 1000 + ((i * 123) % 50000),
        description: `Standard municipal ${cat.replace('_', ' ')} asset deployed in ${district}.`,
      };

      allAssets.push(asset);
    }
  });

  // Procedurally generate realistic dependency connections between assets in the same or adjacent districts
  for (let idx = 0; idx < allAssets.length; idx++) {
    const node = allAssets[idx];
    if (node.id === 'B-17' || node.id === 'P-03' || node.id === 'H-02' || node.id === 'F-08') continue;

    // Connect node to 1-3 power, road, or comm stations
    const targetCandidates = allAssets.filter(
      (cand) => cand.id !== node.id && cand.district === node.district && (cand.type === 'power_station' || cand.type === 'substation' || cand.type === 'road' || cand.type === 'comm_tower')
    );

    if (targetCandidates.length > 0) {
      const parent = targetCandidates[idx % targetCandidates.length];
      if (!node.dependencies.includes(parent.id)) {
        node.dependencies.push(parent.id);
        if (!parent.downstreamAssets.includes(node.id)) {
          parent.downstreamAssets.push(node.id);
        }

        allEdges.push({
          id: `e-gen-${parent.id}-${node.id}`,
          source: parent.id,
          target: node.id,
          criticality: node.criticality,
          dependencyType: parent.type === 'power_station' || parent.type === 'substation' ? 'power' : parent.type === 'road' ? 'physical_access' : 'data',
          redundancy: idx % 3 === 0,
        });
      }
    }
  }

  return { assets: allAssets, edges: allEdges };
}

const generatedData = generateFullInfrastructure();
export const MOCK_ASSETS = generatedData.assets;
export const MOCK_EDGES = generatedData.edges;

export const TOTAL_ASSETS_COUNT = 2486;
export const CRITICAL_ASSETS_COUNT = 47;
export const ACTIVE_INCIDENTS_COUNT = 6;
export const HIGH_RISK_DEPENDENCIES_COUNT = 128;
export const NETWORK_RESILIENCE_PERCENT = 78;
export const POPULATION_AT_RISK = 184200;
