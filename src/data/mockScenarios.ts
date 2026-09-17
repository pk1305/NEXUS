import { ScenarioDefinition } from '../types/infrastructure';

export const PRECONFIGURED_SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'scen-monsoon',
    name: 'Monsoon Emergency & Flood Inundation',
    description: 'Severe 100-year rainfall event causing structural scour on Bridge B-17, substation water ingress on S-07, and arterial flash flooding on Route R-11.',
    failures: [
      { assetId: 'B-17', severity: 'severe' },
      { assetId: 'P-03', severity: 'severe' },
      { assetId: 'R-11', severity: 'medium' },
    ],
  },
  {
    id: 'scen-cyber',
    name: 'Metropolitan Grid & SCADA Cyber Disruption',
    description: 'Coordinated malicious firmware injection targeting primary electrical distribution generators and emergency telecom repeater nodes.',
    failures: [
      { assetId: 'P-03', severity: 'complete' },
      { assetId: 'C-02', severity: 'severe' },
      { assetId: 'S-07', severity: 'severe' },
    ],
  },
  {
    id: 'scen-seismic',
    name: 'River Basin 6.4 Magnitude Seismic Shock',
    description: 'Tectonic rupture centered along the Metro River fault zone compromising water transmission mains, arterial bridges, and hospital supply lines.',
    failures: [
      { assetId: 'B-17', severity: 'complete' },
      { assetId: 'W-02', severity: 'severe' },
      { assetId: 'R-04', severity: 'severe' },
    ],
  },
  {
    id: 'scen-hazmat',
    name: 'Industrial Port Chemical Tank Rupture',
    description: 'Toxic aerosol plume requiring immediate quarantine of Harbor corridors and power cutoff to downwind commercial zones.',
    failures: [
      { assetId: 'A-01', severity: 'severe' },
      { assetId: 'RC-01', severity: 'medium' },
      { assetId: 'R-08', severity: 'severe' },
    ],
  },
];
