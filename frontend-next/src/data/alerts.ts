// ============================================================
// Demo Data — Alerts
// ============================================================

import type { Alert } from '@/types';

export const DEMO_ALERTS: Alert[] = [
  {
    id: 'alert-001',
    zoneId: 'zone-c',
    zoneName: 'Puthumala–Mundakkai',
    severity: 'CRITICAL',
    status: 'AUTHORIZED',
    title: 'Critical Landslide Risk — Puthumala–Mundakkai Sector',
    description: 'Both 24h and 72h rainfall thresholds exceeded. Active slope movement detected. Evacuation advisory recommended for settlements below Mundakkai ridge.',
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    createdBy: 'System (Auto-draft)',
    authorizedBy: 'Dist. Collector, Wayanad',
    authorizedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    timeline: [
      { timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), action: 'Alert drafted', actor: 'System', note: 'Risk score exceeded critical threshold (88/100)' },
      { timestamp: new Date(Date.now() - 2.8 * 3600000).toISOString(), action: 'Submitted for authorization', actor: 'Duty Officer, SDMA', note: 'Reviewed contributing factors and field reports' },
      { timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), action: 'Authorized', actor: 'Dist. Collector, Wayanad', note: 'Authorized evacuation advisory for Mundakkai settlements' },
      { timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(), action: 'Acknowledged', actor: 'Tahsildar, Meppadi', note: 'Field team dispatched' },
    ],
  },
  {
    id: 'alert-002',
    zoneId: 'zone-a',
    zoneName: 'Meppadi–Chooralmala',
    severity: 'HIGH',
    status: 'AWAITING_AUTHORIZATION',
    title: 'High Landslide Risk — Meppadi Slopes',
    description: '24h rainfall approaching threshold. Seepage and minor ground cracks reported by field officer. Close monitoring recommended.',
    createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 0.5 * 3600000).toISOString(),
    createdBy: 'System (Auto-draft)',
    timeline: [
      { timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), action: 'Alert drafted', actor: 'System', note: 'Risk score crossed HIGH threshold (78/100)' },
      { timestamp: new Date(Date.now() - 0.5 * 3600000).toISOString(), action: 'Submitted for authorization', actor: 'Duty Officer, SDMA', note: 'Pending District Collector review' },
    ],
  },
  {
    id: 'alert-003',
    zoneId: 'zone-e',
    zoneName: 'Vellarimala Ridge',
    severity: 'HIGH',
    status: 'DRAFT',
    title: 'Increasing Risk — Vellarimala Ridge',
    description: 'Rainfall threshold approaching. Terrain susceptibility high. Limited field verification available.',
    createdAt: new Date(Date.now() - 0.5 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 0.5 * 3600000).toISOString(),
    createdBy: 'System (Auto-draft)',
    timeline: [
      { timestamp: new Date(Date.now() - 0.5 * 3600000).toISOString(), action: 'Alert drafted', actor: 'System', note: 'Risk score crossed HIGH threshold (71/100)' },
    ],
  },
  {
    id: 'alert-004',
    zoneId: 'zone-b',
    zoneName: 'Vythiri Town',
    severity: 'WATCH',
    status: 'CLOSED',
    title: 'Watch — Vythiri Town Area',
    description: 'Rainfall elevated but below threshold. Monitoring continues.',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    createdBy: 'System (Auto-draft)',
    closedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    closedReason: 'Rainfall subsided below watch level. No field observations.',
    timeline: [
      { timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), action: 'Alert drafted', actor: 'System', note: 'Watch level rainfall' },
      { timestamp: new Date(Date.now() - 20 * 3600000).toISOString(), action: 'Reviewed', actor: 'Duty Officer, SDMA', note: 'Monitoring, no action needed' },
      { timestamp: new Date(Date.now() - 12 * 3600000).toISOString(), action: 'Closed', actor: 'Duty Officer, SDMA', note: 'Conditions normalized' },
    ],
  },
];
