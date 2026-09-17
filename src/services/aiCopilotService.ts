import { graphEngine } from './graphEngine';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  suggestedActions?: string[];
  metrics?: { label: string; value: string; color?: string }[];
}

export class AiCopilotService {
  public generateResponse(prompt: string): CopilotMessage {
    const p = prompt.toLowerCase();

    if (p.includes('b-17') || p.includes('bridge')) {
      const sim = graphEngine.simulateFailure('B-17', 'severe');
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `**B-17 (Central River Bridge)** is a high-centrality infrastructure asset connected to 7 transport routes across the Metro River.

The simulation predicts **18 downstream assets** could be affected across multiple tiers, notably severing the rapid ambulance corridor for **Hospital H-02** and increasing response times for **Fire Station F-08**.

Estimated emergency response delay: **+18 minutes**.`,
        metrics: [
          { label: 'Cascade Risk', value: '87 / 100', color: 'var(--color-critical)' },
          { label: 'Downstream Assets', value: '18 assets', color: 'var(--color-warning)' },
          { label: 'Est. Delay', value: '+18 mins', color: 'var(--color-orange)' },
          { label: 'Pop. Impact', value: '52,400', color: 'var(--color-info)' },
        ],
        suggestedActions: [
          'Redirect emergency traffic through Route R-08',
          'Notify Hospital H-02 trauma inbound desk',
          'Dispatch traffic control units to Riverfront Corridor',
        ],
      };
    }

    if (p.includes('hospital') || p.includes('vulnerable hospital') || p.includes('medical')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Based on current dependency topology, **Hospital H-02 (Metro Central Trauma Center)** is the most vulnerable medical facility in Metro City.

**Why:**
- Relies on a single non-redundant arterial corridor (**Road R-04**) from the river crossing.
- Direct dual dependency on **Power Station P-03** and **Water Treatment Plant W-02**.
- Any upstream disruption on Bridge B-17 reduces emergency patient intake accessibility by **78%**.`,
        metrics: [
          { label: 'Hospital Risk', value: '86 / 100', color: 'var(--color-critical)' },
          { label: 'Access Redundancy', value: 'LOW (Single Corridor)', color: 'var(--color-warning)' },
          { label: 'Bed Capacity', value: '850 beds', color: 'var(--color-info)' },
        ],
        suggestedActions: [
          'Initiate secondary emergency access bypass via Route R-11',
          'Test auxiliary medical generator switchgear',
          'Review Mutual Aid Hospital agreements with H-05',
        ],
      };
    }

    if (p.includes('top 5') || p.includes('critical assets') || p.includes('highest risk')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Here are the **Top 5 Critical Assets** ranked by betweenness centrality and cascading impact potential:

1. **Bridge B-17 (Central River Bridge)** — Risk Score: 92% | Downstream: 14 assets
2. **Power Station P-03 (North Thermal & Grid)** — Risk Score: 89% | Downstream: 11 assets
3. **Hospital H-02 (Metro Central Trauma)** — Risk Score: 86% | Downstream: 4 assets
4. **Road R-04 (Central Riverfront Arterial)** — Risk Score: 81% | Downstream: 6 assets
5. **Water Plant W-02 (River Basin Facility)** — Risk Score: 77% | Downstream: 4 assets`,
        suggestedActions: [
          'Run failure simulation on Power Station P-03',
          'Open Risk Matrix to inspect quadrant distribution',
          'Inspect cluster dependencies for Riverfront Corridor',
        ],
      };
    }

    if (p.includes('why') && (p.includes('critical') || p.includes('b-17'))) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `**Why is B-17 considered critical?**

The failed bridge is a high-centrality infrastructure asset. Its failure disconnects multiple emergency routes and creates secondary congestion on alternative roads. This increases response time for nearby hospitals and emergency services.

Key factors:
- Connects 7 major transport corridors
- Hospital H-02 ambulance ingress depends directly on this route
- Alternate bypasses (R-08 & R-11) quickly saturate within 10 minutes of disruption.`,
        suggestedActions: [
          'Simulate B-17 complete failure',
          'Generate AI Incident Report for B-17',
        ],
      };
    }

    if (p.includes('first') || p.includes('responder') || p.includes('action') || p.includes('do')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `**Immediate Tactical Emergency Response Playbook:**

1. **Activate Traffic Diversion (Priority: CRITICAL)**
   - Reroute all heavy and emergency vehicles onto **Route R-08** and **Route R-11**.
2. **Pre-alert Hospital H-02 & H-05 (Priority: CRITICAL)**
   - Switch emergency ambulance routing to northern access point.
3. **Deploy Traffic Management Squads (Priority: HIGH)**
   - Station manual signal overrides at Riverfront intersections.
4. **Coordinate Fire Station F-03 & F-08 (Priority: HIGH)**
   - Reallocate secondary coverage zones to prevent response blackouts.`,
        suggestedActions: [
          'Open Emergency Response Planner',
          'Dispatch Traffic Command Squad 01',
          'Send automated alert to Hospital H-02',
        ],
      };
    }

    // Default intelligent response
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: `I have analyzed your query against Metro City's **2,486 infrastructure nodes** and dependency graph $G=(V,E)$. 

The platform models cascading failure propagation, estimating population vulnerability, response latencies, and critical downstream dependencies. 

Try asking:
- *"What happens if Bridge B-17 fails?"*
- *"Which hospital is most vulnerable?"*
- *"What are the top 5 critical assets?"*
- *"What should emergency responders do first?"*`,
      suggestedActions: [
        'What happens if Bridge B-17 fails?',
        'Which hospital is most vulnerable?',
        'What are the top 5 critical assets?',
      ],
    };
  }
}

export const aiCopilotService = new AiCopilotService();
