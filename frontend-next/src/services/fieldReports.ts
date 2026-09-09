// ============================================================
// Service Layer — Field Reports
// ============================================================

import { DEMO_FIELD_REPORTS } from '@/data/fieldReports';
import type { FieldReport, VerificationStatus, SyncStatus, ObservationType, ReportSeverity } from '@/types';

let reportsCache = [...DEMO_FIELD_REPORTS];
let nextId = 7;

export async function getFieldReports(): Promise<FieldReport[]> {
  // TODO: Replace with API call — GET /api/field-reports
  return reportsCache;
}

export async function getFieldReport(reportId: string): Promise<FieldReport | undefined> {
  return reportsCache.find(r => r.id === reportId);
}

export async function submitFieldReport(report: {
  observationType: ObservationType;
  severity: ReportSeverity;
  location: [number, number];
  locationName: string;
  notes: string;
  photos: string[];
  submittedBy: string;
  zoneId?: string;
}): Promise<FieldReport> {
  // TODO: Replace with API call — POST /api/field-reports
  const newReport: FieldReport = {
    id: `fr-${String(nextId++).padStart(3, '0')}`,
    ...report,
    timestamp: new Date().toISOString(),
    verificationStatus: 'UNVERIFIED',
    syncStatus: 'PENDING',
  };
  reportsCache = [newReport, ...reportsCache];
  return newReport;
}

export async function verifyReport(
  reportId: string,
  status: VerificationStatus,
  verifier: string,
  notes?: string
): Promise<FieldReport | undefined> {
  // TODO: Replace with API call — PATCH /api/field-reports/:id/verify
  const report = reportsCache.find(r => r.id === reportId);
  if (!report) return undefined;

  report.verificationStatus = status;
  report.verifiedBy = verifier;
  report.verifiedAt = new Date().toISOString();
  report.reviewNotes = notes;
  return { ...report };
}

export async function updateSyncStatus(
  reportId: string,
  syncStatus: SyncStatus
): Promise<FieldReport | undefined> {
  const report = reportsCache.find(r => r.id === reportId);
  if (!report) return undefined;
  report.syncStatus = syncStatus;
  return { ...report };
}

export async function syncReports(): Promise<{ synced: number; failed: number }> {
  // TODO: Replace with API call — POST /api/field-reports/sync
  let synced = 0;
  let failed = 0;
  for (const report of reportsCache) {
    if (report.syncStatus === 'PENDING' || report.syncStatus === 'FAILED') {
      report.syncStatus = 'UPLOADING';
      // Simulate sync
      report.syncStatus = 'SYNCED';
      synced++;
    }
  }
  return { synced, failed };
}

export function resetFieldReports(): void {
  reportsCache = [...DEMO_FIELD_REPORTS.map(r => ({ ...r }))];
  nextId = 7;
}
