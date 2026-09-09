// ============================================================
// Service Layer — Zones & Risk Assessment
// ============================================================
// These functions currently return demo data.
// Replace implementations with API calls when backend is ready.

import { DEMO_ZONES } from '@/data/zones';
import { DEMO_RISK_ASSESSMENTS } from '@/data/riskAssessments';
import type { Zone, RiskAssessment } from '@/types';

export async function getZones(): Promise<Zone[]> {
  // TODO: Replace with API call — GET /api/zones
  return DEMO_ZONES;
}

export async function getZone(zoneId: string): Promise<Zone | undefined> {
  // TODO: Replace with API call — GET /api/zones/:id
  return DEMO_ZONES.find(z => z.id === zoneId);
}

export async function getRiskAssessment(zoneId: string): Promise<RiskAssessment | undefined> {
  // TODO: Replace with API call — GET /api/risk/:zoneId
  return DEMO_RISK_ASSESSMENTS[zoneId];
}

export async function getAllRiskAssessments(): Promise<Record<string, RiskAssessment>> {
  // TODO: Replace with API call — GET /api/risk
  return DEMO_RISK_ASSESSMENTS;
}
