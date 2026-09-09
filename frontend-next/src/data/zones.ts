// ============================================================
// Demo Data — Zones (Wayanad, Kerala pilot area)
// ============================================================

import type { Zone } from '@/types';

// Centered around Wayanad district, Kerala
// Real coordinates for realistic map display
export const DEMO_ZONES: Zone[] = [
  {
    id: 'zone-a',
    name: 'Meppadi–Chooralmala',
    description: 'Steep terrain above Meppadi town, high susceptibility slopes with laterite overburden',
    center: [11.545, 76.145],
    bounds: [
      [11.555, 76.130],
      [11.555, 76.160],
      [11.535, 76.160],
      [11.535, 76.130],
    ],
    riskCategory: 'HIGH',
    riskScore: 78,
    elevation: '800–1200m',
    terrain: 'Steep slopes, laterite soil, tea plantations',
  },
  {
    id: 'zone-b',
    name: 'Vythiri Town',
    description: 'Moderate slopes around Vythiri township, mixed land use',
    center: [11.535, 76.035],
    bounds: [
      [11.545, 76.020],
      [11.545, 76.050],
      [11.525, 76.050],
      [11.525, 76.020],
    ],
    riskCategory: 'WATCH',
    riskScore: 42,
    elevation: '700–900m',
    terrain: 'Moderate slopes, mixed vegetation',
  },
  {
    id: 'zone-c',
    name: 'Puthumala–Mundakkai',
    description: 'High-elevation slopes above settlements, history of debris flows',
    center: [11.560, 76.175],
    bounds: [
      [11.570, 76.160],
      [11.570, 76.190],
      [11.550, 76.190],
      [11.550, 76.160],
    ],
    riskCategory: 'CRITICAL',
    riskScore: 88,
    elevation: '900–1400m',
    terrain: 'Very steep, rocky slopes with thin soil cover',
  },
  {
    id: 'zone-d',
    name: 'Kalpetta Area',
    description: 'District headquarters area, relatively gentle terrain',
    center: [11.610, 76.080],
    bounds: [
      [11.620, 76.065],
      [11.620, 76.095],
      [11.600, 76.095],
      [11.600, 76.065],
    ],
    riskCategory: 'NORMAL',
    riskScore: 18,
    elevation: '780–850m',
    terrain: 'Gentle slopes, urban area',
  },
  {
    id: 'zone-e',
    name: 'Vellarimala Ridge',
    description: 'High-altitude ridge area with steep escarpments',
    center: [11.520, 76.100],
    bounds: [
      [11.530, 76.085],
      [11.530, 76.115],
      [11.510, 76.115],
      [11.510, 76.085],
    ],
    riskCategory: 'HIGH',
    riskScore: 71,
    elevation: '1000–1500m',
    terrain: 'Steep escarpments, shola-grassland',
  },
];
