
# NEXUS
=======
# NEXUS RESILIENCE — Urban Infrastructure Cascading Failure & Intelligence Platform

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-orange?style=flat-square)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> **NEXUS Resilience** is an enterprise-grade urban infrastructure modeling and simulation platform. It maps multi-system operational dependencies across transportation, power grids, healthcare, water facilities, and emergency services to predict, visualize, and mitigate cascading failure dynamics before real-world disasters unfold.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture & Simulation Engine](#-system-architecture--simulation-engine)
  - [Graph Topology & Dependency Modeling](#graph-topology--dependency-modeling)
  - [Multi-Tier Cascade Propagation Algorithm](#multi-tier-cascade-propagation-algorithm)
  - [Compound Risk & Non-Linear Failure Dynamics](#compound-risk--non-linear-failure-dynamics)
- [Application Views & Modules](#-application-views--modules)
- [Domain Data Model](#-domain-data-model)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Launch](#installation--launch)
  - [Available Scripts](#available-scripts)
- [Keyboard Shortcuts & Quick Actions](#-keyboard-shortcuts--quick-actions)
- [Curated Benchmark Scenarios](#-curated-benchmark-scenarios)
- [Tech Stack](#-tech-stack)
- [License](#-license)

---

## 🌐 Overview

Modern cities are hyper-interconnected networks of critical infrastructure. When a major artery fails—such as **Bridge B-17 (Central River Bridge)**—the damage rarely stops at severed traffic. The loss of transit routes delays ambulances to trauma centers, cuts access for HazMat emergency squads, saturates bypass grids, and triggers domino-effect outages across power and water utilities.

**NEXUS Resilience** provides municipal planners, emergency dispatch coordinators, and civil resilience engineers with:
- **Instant Blast-Radius Prediction**: Calculate multi-tier ripple effects in milliseconds.
- **Topological Vulnerability Identification**: Pinpoint high-betweenness single points of failure.
- **AI-Assisted Mitigation Playbooks**: Generate optimal emergency detour and resource routing automatically.
- **Interactive Multi-Scenario Stress Testing**: Evaluate simultaneous disruptions (e.g., severe storm + power outage).

---

## ⚡ Key Features

| Feature | Description |
| :--- | :--- |
| **Cascade Simulation Engine** | Interactive step-by-step failure timeline (T+0s to T+14s+), animated level propagation (Level 0 Primary through Level 3 Tertiary), timeline scrubbing, and playback controls. |
| **Interactive GIS Map** | Scalable district map visualization with node clustering, status indicators (Operational, Warning, Elevated Risk, Disrupted, Failed), and active dependency overlays. |
| **Dependency Graph Network** | Comprehensive multigraph visualization showing directional dependencies (Power, Physical Access, Data, Water, Emergency Routes) and redundancy indicators. |
| **AI Infrastructure Copilot** | Natural language reasoning agent that answers complex questions regarding asset vulnerability, blast radius, bottleneck identification, and dispatch actions. |
| **What-If Scenario Comparison** | Side-by-side comparative analytics evaluating baseline operational conditions against single-point failures and compound multi-disaster events. |
| **Risk & Centrality Matrix** | 2D Risk Quadrant matrix (Probability vs. Impact) alongside betweenness centrality metrics and district-level vulnerability heatmaps. |
| **Emergency Response Planner** | Automated triage response action list with priority scoring, assigned municipal teams, and quantifiable delay-reduction estimates. |
| **Active Incidents Monitor** | Live incident room tracking containment status, affected population, estimated recovery windows, and active field units. |
| **Executive PDF & Audit Reports** | Automated generation of comprehensive resilience scorecards, executive summaries, and mitigation roadmaps ready for export. |
| **Global Spotlight Search** | Universal `Cmd+K` / `Ctrl+K` palette for instantaneous asset discovery, incident navigation, and quick simulation triggers. |

---

## 🧠 System Architecture & Simulation Engine

### Graph Topology & Dependency Modeling

The core engine represents municipal infrastructure as a directed graph:
$$G = (V, E)$$
Where:
- $V$: Infrastructure assets (Bridges, Roads, Power Stations, Substations, Hospitals, Fire Stations, Water Plants, etc.).
- $E$: Directional dependency edges categorized by critical flow types: `power`, `physical_access`, `data`, `water`, `emergency_route`, and `supply_chain`.

Each asset node $v \in V$ encapsulates:
- Base health score $H_v \in [0, 100]$
- Inherent risk score $R_v \in [0, 100]$
- Failure probability $P_v \in [0, 100]\%$
- Direct population catchment $Pop_v$
- Betweenness centrality and upstream/downstream connection vectors

### Multi-Tier Cascade Propagation Algorithm

The cascade engine executes a specialized topological breadth-first traversal with domain-specific degradation heuristics:

```
[Trigger Failure: Asset V_0] (Level 0: Primary Failure)
          │
          ▼
[Immediate Outgoing Edges] ──► (Level 1: Direct Impacts - Outages & Route Severance)
          │
          ▼
[Secondary Dependencies]   ──► (Level 2: Secondary Impacts - Transit Saturation & Facility Isolation)
          │
          ▼
[Tertiary Grid Strain]     ──► (Level 3: Tertiary Reverberations - Regional Latency & Grid Overload)
```

1. **Level 0 (Primary)**: The initial trigger node experiences a complete state change to `failed`.
2. **Level 1 (Direct Impact)**: Downstream nodes with direct un-redundant dependencies transition to `disrupted` with immediate throughput degradation.
3. **Level 2 (Secondary Impact)**: Critical service nodes (e.g., trauma hospitals, fire stations) experience accessibility constraints and backup system activation (`elevated_risk`).
4. **Level 3 (Tertiary Impact)**: Surrounding arterial corridors and municipal sectors absorb redirected load, resulting in district-wide delays and warnings.

### Compound Risk & Non-Linear Failure Dynamics

When evaluating concurrent failures (e.g., in the What-If comparison view), the system models non-linear cross-system interactions using compound interaction multipliers:

$$\text{Interaction Multiplier} = 1 + (N_{\text{failures}} - 1) \times 0.35$$
$$\text{Compound Delay} = \left( \sum \text{Base Delay}_i \right) \times \text{Multiplier} + \Delta_{\text{gridlock}}$$

---

## 🖥️ Application Views & Modules

```
┌────────────────────────────────────────────────────────────────────────┐
│ NEXUS Command Bar (Status • Search [Ctrl+K] • Notifications • Copilot)  │
├────────────────────────────────────────────────────────────────────────┤
│ Subnav: Overview | Map | Simulation | Dependencies | Risk | Assets ... │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [ Executive Overview ]      [ Failure Simulator ]      [ GIS Map ]    │
│  • System Health Index       • Timeline Controller      • 7 Districts  │
│  • Hotspot Registry          • Step-by-Step Levels      • Layer Filter │
│  • Key Vulnerabilities       • AI Root Cause Summary    • Node Pinning │
│                                                                        │
│  [ Scenario Comparison ]     [ Response Planner ]       [ AI Copilot ] │
│  • Delta Metrics             • Action Dispatching       • Context Chat │
│  • Baseline vs Multi-Fail    • Delay Reduction (mins)   • Live Triage  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Overview Dashboard (`OverviewDashboard.tsx`)**: Global system status, average asset health, cascade risk index, active incidents counter, and high-risk hotspot ranking.
2. **Infrastructure Map (`InfrastructureMapView.tsx`)**: Spatial representation across Metro City's 7 key districts (*Central District, Riverfront Corridor, North District, Harbor & Port, Industrial Basin, East Hills, South Tech Zone*).
3. **Failure Simulation (`FailureSimulationView.tsx`)**: Deep failure inspection workstation with timeline scrubber (T+0s to T+14s), severity selectors, cascade breakdown metrics, and AI explanation panels.
4. **Network Dependencies (`NetworkDependenciesView.tsx`)**: Hierarchical and cluster graph view exposing hidden upstream/downstream vulnerabilities.
5. **Risk Analysis (`RiskAnalysisView.tsx`)**: Risk quadrant scatter matrix, district risk rankings, and failure probability distribution.
6. **Critical Assets Registry (`CriticalAssetsView.tsx`)**: Full searchable tabular inventory with live filtering by category, district, status, and criticality level.
7. **Incident Management (`IncidentsView.tsx`)**: Tactical response center for tracking ongoing incidents, assigned response units, and containment workflows.
8. **Response Planner (`ResponsePlannerView.tsx`)**: Prioritized action dispatch dashboard with estimated recovery hours and delay-reduction analytics.
9. **Scenario Comparison (`ScenarioComparisonView.tsx`)**: Multi-scenario what-if lab comparing single failures against severe compound emergencies.
10. **Executive Reports (`ReportsView.tsx`)**: On-demand generation of comprehensive audit logs, risk summaries, and mitigation plans.
11. **Landing Page (`LandingPage.tsx`)**: Product overview and showcase presenting the platform's value proposition and interactive entry points.

---

## 📊 Domain Data Model

Core TypeScript definitions located in [`src/types/infrastructure.ts`](src/types/infrastructure.ts):

```typescript
// Asset definition with dependency mappings
export interface InfrastructureAsset {
  id: string;                         // e.g., "B-17", "H-02", "P-03"
  name: string;                       // e.g., "Bridge B-17 — Central River Bridge"
  type: AssetCategory;                // 'bridge' | 'hospital' | 'power_station' | 'water_facility' | ...
  district: District;                 // 'Central District' | 'Riverfront Corridor' | ...
  status: AssetStatus;               // 'operational' | 'warning' | 'elevated_risk' | 'disrupted' | 'failed'
  criticality: CriticalityLevel;     // 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  health: number;                     // 0 - 100
  riskScore: number;                  // 0 - 100
  failureProbability: number;         // 0 - 100 (%)
  dependencies: string[];             // Upstream asset IDs
  downstreamAssets: string[];         // Downstream asset IDs
  populationAffected: number;         // Population catchment
  recoveryDifficulty: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  estimatedRecoveryHours: number;     // e.g., 14 hours
  coordinates: { x: number; y: number; lat?: number; lng?: number };
  capacity?: number;
  description?: string;
}

// Result produced by graph cascade simulation
export interface SimulationResult {
  sourceAssetId: string;
  severity: FailureSeverity;
  cascadeSeverity: 'LOW' | 'MEDIUM' | 'ELEVATED' | 'CRITICAL';
  aiConfidence: number;
  totalAffectedCount: number;
  criticalAffectedCount: number;
  populationImpact: number;
  emergencyDelayMinutes: number;
  trafficImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  powerImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  healthcareImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  steps: CascadeStep[];
  aiExplanation: {
    summary: string;
    keyFactors: string[];
    whyCritical: string;
    vulnerabilityInsight: string;
  };
}
```

---

## 📁 Project Structure

```
cascading-failure/
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # Icons, images, and brand media
│   ├── components/
│   │   ├── common/               # Shared reusable UI components
│   │   │   ├── AssetBadge.tsx       # Criticality and status badge component
│   │   │   ├── NodeDetailDrawer.tsx # Slide-over asset inspector with live telemetry
│   │   │   └── TelemetryCard.tsx    # Metric tile with status indicators
│   │   ├── landing/
│   │   │   └── LandingPage.tsx      # Public landing and product showcase
│   │   ├── layout/               # Shell, navigation, and persistent modals
│   │   │   ├── CopilotDrawer.tsx    # AI Infrastructure Copilot chat interface
│   │   │   ├── GlobalSearchModal.tsx# Cmd+K quick-search and jump palette
│   │   │   ├── NavigationSubnav.tsx # Main horizontal module navigation
│   │   │   ├── NotificationDrawer.tsx # Real-time alerts feed
│   │   │   ├── Sidebar.tsx          # Optional collateral navigation
│   │   │   └── TopHeader.tsx        # Command header with quick stats
│   │   └── views/                # Primary application screens
│   │       ├── CriticalAssetsView.tsx      # Asset inventory and registry
│   │       ├── FailureSimulationView.tsx   # Interactive cascade simulator
│   │       ├── IncidentsView.tsx           # Incident tracking & management
│   │       ├── InfrastructureMapView.tsx   # Spatial GIS district visualizer
│   │       ├── NetworkDependenciesView.tsx # Graph topology & flow engine
│   │       ├── OverviewDashboard.tsx       # Executive command dashboard
│   │       ├── ReportsView.tsx             # PDF resilience reporting
│   │       ├── ResponsePlannerView.tsx     # Triage & dispatch playbooks
│   │       ├── RiskAnalysisView.tsx        # Risk matrix & centrality charts
│   │       ├── ScenarioComparisonView.tsx  # Side-by-side what-if lab
│   │       └── WhatIfScenarioModal.tsx     # Custom scenario builder modal
│   ├── data/                     # Mock data & topological models
│   │   ├── initialIncidents.ts      # Active emergency incidents seed data
│   │   ├── mockInfrastructure.ts    # Comprehensive graph dataset (Assets + Edges)
│   │   └── mockScenarios.ts         # Preconfigured disaster scenarios
│   ├── services/                 # Core domain logic and AI engines
│   │   ├── aiCopilotService.ts      # Intelligent copilot natural language service
│   │   └── graphEngine.ts           # Topological BFS cascade & centrality engine
│   ├── types/
│   │   └── infrastructure.ts        # TypeScript schemas and data interfaces
│   ├── App.css                   # Layout and view-specific styles
│   ├── App.tsx                   # Master router, state coordinator, and modal manager
│   ├── index.css                 # Global design system tokens, themes, utilities
│   └── main.tsx                  # React DOM entry point
├── .oxlintrc.json                # Oxlint linter configuration
├── index.html                    # HTML shell
├── package.json                  # Dependencies and script definitions
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build and plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Node.js 20+ recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation & Launch

1. **Clone or navigate to the project directory:**
   ```bash
   cd "c:/Users/Pooja/Downloads/cascading failure"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets with Vite. |
| `npm run preview` | Spawns a local web server to preview the production build output. |
| `npm run lint` | Executes lightning-fast code linting via [Oxlint](https://oxc.rs/). |

---

## ⌨️ Keyboard Shortcuts & Quick Actions

- <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd>: Open Global Spotlight Search to query any asset, incident, or district.
- **Header "AI Copilot"**: Toggle conversational assistant drawer with predefined prompt suggestions.
- **Quick Simulate**: Click any asset badge or hotspot row across the dashboard to load that asset directly into the Failure Simulator.
- **Node Inspector**: Click any node on the Map or Dependencies view to slide out full telemetry, health scores, and upstream/downstream relations.

---

## 🔬 Curated Benchmark Scenarios

The platform includes pre-calibrated baseline models for testing resilience:

1. **Bridge B-17 Structural Failure (Primary Showcase)**
   - *Trigger*: Central River Bridge 8-lane closure.
   - *Result*: 18 downstream assets disrupted; Hospital H-02 ambulance access cut by 78%; +18 min emergency response delay across 52,400 residents.
2. **North Grid Transformer Overload (Power Station P-03)**
   - *Trigger*: Substation cascade in the North District.
   - *Result*: 11 downstream facilities lose primary power; Water Treatment Plant W-02 switches to auxiliary generators.
3. **Compound Catastrophic Disruption (River Corridor Storm + Bridge Outage)**
   - *Trigger*: Concurrent structural failure of B-17 and flooding along Arterial R-04.
   - *Result*: Compound emergency delay spikes to +42 minutes; 126,000+ population affected.

---

## 🛠️ Tech Stack

- **UI Framework**: [React 19](https://react.dev/) (Functional Components, Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Build Tool**: [Vite 8](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Iconography**: [Lucide React](https://lucide.dev/) (High-precision SVG icons)
- **Special Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Linter**: [Oxlint](https://oxc.rs/) (High-performance Rust-based JavaScript/TypeScript linter)
- **Design Architecture**: Custom Vanilla CSS Design System with responsive variables, glassmorphism tokens, and micro-animations.

---

