// ============================================================
// Demo Data — Infrastructure (Roads, Buildings, Landslide History)
// ============================================================

import type { Road, Building, LandslideMarker } from '@/types';

export const DEMO_ROADS: Road[] = [
  {
    id: 'road-nh766',
    name: 'NH-766 (Kozhikode–Mysuru)',
    type: 'NH',
    coordinates: [
      [11.620, 76.060],
      [11.610, 76.080],
      [11.590, 76.100],
      [11.570, 76.120],
      [11.555, 76.140],
      [11.545, 76.155],
      [11.535, 76.170],
      [11.520, 76.190],
    ],
    criticality: 'HIGH',
  },
  {
    id: 'road-sh29',
    name: 'SH-29 (Kalpetta–Mananthavady)',
    type: 'SH',
    coordinates: [
      [11.610, 76.080],
      [11.625, 76.095],
      [11.640, 76.110],
      [11.660, 76.120],
    ],
    criticality: 'HIGH',
  },
  {
    id: 'road-meppadi',
    name: 'Meppadi–Chooralmala Road',
    type: 'DISTRICT',
    coordinates: [
      [11.555, 76.135],
      [11.550, 76.140],
      [11.545, 76.145],
      [11.540, 76.150],
      [11.535, 76.155],
    ],
    criticality: 'MEDIUM',
  },
  {
    id: 'road-mundakkai',
    name: 'Puthumala–Mundakkai Link Road',
    type: 'LOCAL',
    coordinates: [
      [11.555, 76.160],
      [11.558, 76.168],
      [11.560, 76.175],
      [11.562, 76.180],
      [11.565, 76.188],
    ],
    criticality: 'MEDIUM',
  },
  {
    id: 'road-vythiri',
    name: 'Vythiri Town Road',
    type: 'DISTRICT',
    coordinates: [
      [11.545, 76.030],
      [11.540, 76.035],
      [11.535, 76.038],
      [11.530, 76.042],
    ],
    criticality: 'LOW',
  },
];

export const DEMO_BUILDINGS: Building[] = [
  { id: 'bld-001', name: 'District Hospital, Kalpetta', type: 'HOSPITAL', location: [11.612, 76.078], capacity: 200, isCritical: true },
  { id: 'bld-002', name: 'PHC Meppadi', type: 'HOSPITAL', location: [11.547, 76.143], capacity: 30, isCritical: true },
  { id: 'bld-003', name: 'Govt. LP School, Chooralmala', type: 'SCHOOL', location: [11.541, 76.149], capacity: 120, isCritical: true },
  { id: 'bld-004', name: 'Kendriya Vidyalaya, Vythiri', type: 'SCHOOL', location: [11.537, 76.037], capacity: 400, isCritical: true },
  { id: 'bld-005', name: 'District Collectorate', type: 'GOVERNMENT', location: [11.614, 76.076], isCritical: true },
  { id: 'bld-006', name: 'Fire Station, Kalpetta', type: 'GOVERNMENT', location: [11.608, 76.082], isCritical: true },
  { id: 'bld-007', name: 'KSEB Substation, Meppadi', type: 'GOVERNMENT', location: [11.543, 76.139], isCritical: true },
  { id: 'bld-008', name: 'Tribal Welfare School, Mundakkai', type: 'SCHOOL', location: [11.561, 76.177], capacity: 80, isCritical: true },
  { id: 'bld-009', name: 'Forest Ranger Post, Vellarimala', type: 'GOVERNMENT', location: [11.521, 76.098], isCritical: false },
  { id: 'bld-010', name: 'Relief Camp — Town Hall, Meppadi', type: 'SHELTER', location: [11.549, 76.141], capacity: 500, isCritical: true },
  { id: 'bld-011', name: 'Mundakkai Bridge', type: 'GOVERNMENT', location: [11.559, 76.174], isCritical: true },
];

export const DEMO_LANDSLIDE_MARKERS: LandslideMarker[] = [
  {
    id: 'ls-001',
    location: [11.558, 76.172],
    date: '2024-07-30',
    type: 'Debris flow',
    severity: 'Major',
    description: 'Major debris flow at Mundakkai, July 2024. Multiple casualties reported.',
    isHistorical: true,
  },
  {
    id: 'ls-002',
    location: [11.552, 76.168],
    date: '2024-07-30',
    type: 'Debris flow',
    severity: 'Major',
    description: 'Puthumala debris flow, July 2024. Extensive damage to infrastructure.',
    isHistorical: true,
  },
  {
    id: 'ls-003',
    location: [11.546, 76.146],
    date: '2019-08-08',
    type: 'Landslide',
    severity: 'Major',
    description: 'Puthumala landslide, August 2019. 17 casualties.',
    isHistorical: true,
  },
  {
    id: 'ls-004',
    location: [11.538, 76.140],
    date: '2020-08-07',
    type: 'Mudslide',
    severity: 'Moderate',
    description: 'Chooralmala mudslide, August 2020. Road blocked for 3 days.',
    isHistorical: true,
  },
  {
    id: 'ls-005',
    location: [11.523, 76.108],
    date: '2018-08-16',
    type: 'Rockfall',
    severity: 'Minor',
    description: 'Rockfall near Vellarimala trekking trail, August 2018.',
    isHistorical: true,
  },
];
