// ============================================================
// Service Layer — Alerts
// ============================================================

import { DEMO_ALERTS } from '@/data/alerts';
import type { Alert, AlertStatus } from '@/types';

let alertsCache = [...DEMO_ALERTS];

export async function getAlerts(): Promise<Alert[]> {
  // TODO: Replace with API call — GET /api/alerts
  return alertsCache;
}

export async function getAlert(alertId: string): Promise<Alert | undefined> {
  // TODO: Replace with API call — GET /api/alerts/:id
  return alertsCache.find(a => a.id === alertId);
}

export async function approveAlert(alertId: string, approver: string): Promise<Alert | undefined> {
  // TODO: Replace with API call — POST /api/alerts/:id/approve
  const alert = alertsCache.find(a => a.id === alertId);
  if (!alert) return undefined;
  
  const now = new Date().toISOString();
  alert.status = 'AUTHORIZED';
  alert.authorizedBy = approver;
  alert.authorizedAt = now;
  alert.updatedAt = now;
  alert.timeline.push({
    timestamp: now,
    action: 'Authorized',
    actor: approver,
    note: 'Alert authorized for dissemination',
  });
  return { ...alert };
}

export async function updateAlertStatus(
  alertId: string,
  newStatus: AlertStatus,
  actor: string,
  note?: string
): Promise<Alert | undefined> {
  // TODO: Replace with API call — PATCH /api/alerts/:id
  const alert = alertsCache.find(a => a.id === alertId);
  if (!alert) return undefined;

  const now = new Date().toISOString();
  alert.status = newStatus;
  alert.updatedAt = now;
  alert.timeline.push({
    timestamp: now,
    action: `Status changed to ${newStatus}`,
    actor,
    note,
  });

  if (newStatus === 'CLOSED') {
    alert.closedAt = now;
    alert.closedReason = note;
  }
  if (newStatus === 'ACKNOWLEDGED') {
    alert.acknowledgedBy = actor;
    alert.acknowledgedAt = now;
  }

  return { ...alert };
}

export function resetAlerts(): void {
  alertsCache = [...DEMO_ALERTS.map(a => ({
    ...a,
    timeline: [...a.timeline],
  }))];
}
