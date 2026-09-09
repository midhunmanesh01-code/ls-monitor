// ============================================================
// Demo Data — Response Priority Rankings
// ============================================================

import type { ResponsePriorityItem } from '@/types';

export const DEMO_RESPONSE_PRIORITY: ResponsePriorityItem[] = [
  {
    rank: 1,
    zoneId: 'zone-c',
    zoneName: 'Puthumala–Mundakkai',
    hazardLevel: 'CRITICAL',
    hazardScore: 88,
    exposureScore: 65,
    infrastructureScore: 80,
    overallPriority: 95,
    rationale: 'CRITICAL hazard with active debris flow. NH-766 blocked. Settlements at risk. Evacuation in progress.',
    criticalAssets: ['NH-766', 'Mundakkai Bridge', 'Tribal Welfare School', 'Mundakkai Settlement (pop. 850)'],
    recommendedActions: [
      'Continue evacuation of Mundakkai settlement',
      'Deploy NDRF team for search & rescue',
      'Establish road diversion via Meppadi',
      'Activate relief camp at Meppadi Town Hall',
    ],
  },
  {
    rank: 2,
    zoneId: 'zone-a',
    zoneName: 'Meppadi–Chooralmala',
    hazardLevel: 'HIGH',
    hazardScore: 78,
    exposureScore: 75,
    infrastructureScore: 70,
    overallPriority: 82,
    rationale: 'HIGH hazard with critical road and high population exposure. Verified seepage and ground cracks. Rainfall approaching threshold.',
    criticalAssets: ['Meppadi–Chooralmala Road', 'PHC Meppadi', 'KSEB Substation', 'Chooralmala (pop. 2400)'],
    recommendedActions: [
      'Deploy field team for continuous monitoring',
      'Pre-position evacuation transport',
      'Alert PHC Meppadi for potential casualties',
      'Notify KSEB for potential power disruption',
    ],
  },
  {
    rank: 3,
    zoneId: 'zone-e',
    zoneName: 'Vellarimala Ridge',
    hazardLevel: 'HIGH',
    hazardScore: 71,
    exposureScore: 25,
    infrastructureScore: 30,
    overallPriority: 55,
    rationale: 'HIGH hazard but low population exposure. Trekking trail already closed. Forest area with limited accessibility.',
    criticalAssets: ['Forest Ranger Post', 'Vellarimala Trek Trail'],
    recommendedActions: [
      'Confirm trekking trail closure',
      'Ensure forest rangers are safe',
      'Monitor remotely — low population at risk',
    ],
  },
  {
    rank: 4,
    zoneId: 'zone-b',
    zoneName: 'Vythiri Town',
    hazardLevel: 'WATCH',
    hazardScore: 42,
    exposureScore: 80,
    infrastructureScore: 55,
    overallPriority: 40,
    rationale: 'WATCH hazard level with high population. Conditions stable but require monitoring due to high exposure.',
    criticalAssets: ['Vythiri CHC', 'Kendriya Vidyalaya', 'Vythiri Town (pop. 5200)'],
    recommendedActions: [
      'Continue monitoring rainfall',
      'Brief local authorities on contingency plans',
      'No immediate field deployment needed',
    ],
  },
  {
    rank: 5,
    zoneId: 'zone-d',
    zoneName: 'Kalpetta Area',
    hazardLevel: 'NORMAL',
    hazardScore: 18,
    exposureScore: 90,
    infrastructureScore: 85,
    overallPriority: 15,
    rationale: 'NORMAL hazard. High exposure but low physical risk. District HQ — critical for coordination, not for landslide response.',
    criticalAssets: ['District Hospital', 'Collectorate', 'Fire Station'],
    recommendedActions: [
      'No action required for landslide risk',
      'Maintain as coordination hub for response operations',
    ],
  },
];
