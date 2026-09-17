import React from 'react';
import {
  Zap,
  ArrowRight,
  ShieldAlert,
  Network,
  Activity,
  Building2,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  GitFork,
  MapPin,
} from 'lucide-react';

interface LandingPageProps {
  onEnterCommandCenter: () => void;
  onRunSimulationQuick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterCommandCenter,
  onRunSimulationQuick,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Infrastructure',
      desc: 'Catalog municipal bridges, power grids, hospitals, and water systems in a unified GIS model.',
      icon: Building2,
    },
    {
      num: '02',
      title: 'Dependencies',
      desc: 'Map multi-system operational, physical access, and emergency routing dependencies.',
      icon: Network,
    },
    {
      num: '03',
      title: 'Failure',
      desc: 'Simulate structural failures, environmental hazards, and acute stress events.',
      icon: Zap,
    },
    {
      num: '04',
      title: 'Impact',
      desc: 'Predict downstream service disruptions, emergency response delays, and affected populations.',
      icon: Activity,
    },
    {
      num: '05',
      title: 'Response',
      desc: 'Generate actionable contingency playbooks and mutual-aid triage routing.',
      icon: ShieldAlert,
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          height: 72,
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          background: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'var(--brand-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 16,
              fontFamily: 'var(--font-display)',
            }}
          >
            N
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                className="font-display"
                style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--brand-navy)' }}
              >
                NEXUS
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>RESILIENCE</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Infrastructure Intelligence</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onRunSimulationQuick} className="btn btn-secondary" style={{ fontSize: 13 }}>
            <Zap size={14} />
            <span>Simulate Disruption</span>
          </button>
          <button onClick={onEnterCommandCenter} className="btn btn-primary" style={{ fontSize: 13 }}>
            <span>Explore Platform</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: '80px 48px 60px 48px',
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* Left Hero */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 20,
            }}
          >
            <span className="status-dot healthy" />
            <span
              style={{ fontSize: 12, color: 'var(--brand-navy)', fontWeight: 600, letterSpacing: '0.02em' }}
            >
              Enterprise Urban Infrastructure Modeling
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 50,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--brand-navy)',
              marginBottom: 16,
            }}
          >
            NEXUS
          </h1>

          <p
            className="font-display"
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 16,
            }}
          >
            "Infrastructure intelligence for a more resilient city."
          </p>

          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: 560,
              marginBottom: 32,
            }}
          >
            Understand how disruptions in bridges, roads, power networks, and water facilities propagate across municipal dependencies to protect critical services.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={onEnterCommandCenter}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: 15, fontWeight: 600 }}
            >
              <span>Explore Platform</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onRunSimulationQuick}
              className="btn btn-secondary"
              style={{ padding: '14px 24px', fontSize: 15, fontWeight: 600 }}
            >
              <Zap size={16} />
              <span>Run Scenario Simulation</span>
            </button>
          </div>
        </div>

        {/* Right Hero: Clean Architectural GIS Graphic */}
        <div
          className="nexus-card"
          style={{
            padding: 0,
            height: 420,
            background: '#F1F4F8',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-medium)',
          }}
        >
          <svg viewBox="0 0 500 360" style={{ width: '100%', height: '100%' }}>
            <pattern id="heroLightGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
            </pattern>
            <rect width="500" height="360" fill="#F8FAFC" />
            <rect width="500" height="360" fill="url(#heroLightGrid)" />

            {/* River */}
            <path
              d="M 60,0 C 140,100 180,140 260,190 C 340,240 400,260 500,280 L 500,360 L 0,360 L 0,0 Z"
              fill="#BAE6FD"
              opacity="0.8"
            />

            {/* Arterial lines */}
            <line x1="250" y1="60" x2="250" y2="180" stroke="#DC2626" strokeWidth="2.5" />
            <line x1="250" y1="180" x2="110" y2="180" stroke="#EA580C" strokeWidth="2" />
            <line x1="250" y1="180" x2="390" y2="180" stroke="#DC2626" strokeWidth="2" />
            <line x1="110" y1="180" x2="110" y2="280" stroke="#D97706" strokeWidth="1.5" />
            <line x1="250" y1="180" x2="250" y2="280" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* P-03 */}
            <g transform="translate(250, 60)">
              <circle r="16" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
              <text y="4" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">
                P-03
              </text>
              <text y="28" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">
                Power Station
              </text>
            </g>

            {/* B-17 (Failed) */}
            <g transform="translate(250, 180)">
              <circle r="22" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2.5" />
              <text y="4" fill="#DC2626" fontSize="11" fontWeight="800" textAnchor="middle">
                B-17
              </text>
              <text y="36" fill="#DC2626" fontSize="11" fontWeight="700" textAnchor="middle">
                Primary Disruption
              </text>
            </g>

            {/* R-04 */}
            <g transform="translate(110, 180)">
              <circle r="16" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
              <text y="4" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">
                R-04
              </text>
              <text y="28" fill="#EA580C" fontSize="10" fontWeight="600" textAnchor="middle">
                Road Disrupted
              </text>
            </g>

            {/* H-02 */}
            <g transform="translate(390, 180)">
              <circle r="16" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
              <text y="4" fill="#0F172A" fontSize="9" fontWeight="700" textAnchor="middle">
                H-02
              </text>
              <text y="28" fill="#DC2626" fontSize="10" fontWeight="600" textAnchor="middle">
                Hospital -78% Access
              </text>
            </g>

            {/* F-08 */}
            <g transform="translate(110, 280)">
              <circle r="14" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
              <text y="4" fill="#0F172A" fontSize="8" fontWeight="700" textAnchor="middle">
                F-08
              </text>
              <text y="24" fill="#475569" fontSize="10" textAnchor="middle">
                Fire Station (+18m)
              </text>
            </g>

            {/* W-02 */}
            <g transform="translate(250, 280)">
              <circle r="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              <text y="4" fill="#0F172A" fontSize="8" fontWeight="700" textAnchor="middle">
                W-02
              </text>
              <text y="24" fill="#475569" fontSize="10" textAnchor="middle">
                Water Plant
              </text>
            </g>
          </svg>

          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 14,
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--brand-navy)',
              background: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: 4,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Engineering Dependency Model
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section
        style={{
          padding: '60px 48px',
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-label" style={{ justifyContent: 'center', marginBottom: 8 }}>
            RESILIENCE WORKFLOW
          </span>
          <h2 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: 'var(--brand-navy)' }}>
            Understand the connections. Simulate the disruption. Prepare the response.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="nexus-card"
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 14,
                    }}
                  >
                    <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-navy)' }}>
                      {step.num}
                    </span>
                    <div
                      style={{
                        padding: 6,
                        background: 'var(--bg-app)',
                        borderRadius: 6,
                        color: 'var(--brand-navy)',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3
                    className="font-display"
                    style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}
                  >
                    {step.title}
                  </h3>

                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          padding: '24px 48px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: 'var(--text-muted)',
          background: 'var(--bg-app)',
        }}
      >
        <div>NEXUS Infrastructure Resilience Platform • Civil & Municipal Engineering</div>
        <div>Built for City Planners, Infrastructure Operators & Emergency Management Authorities</div>
      </footer>
    </div>
  );
};
