// ============================================================
// Landslide Monitor — Utility Functions
// ============================================================

import type { RiskCategory, ConfidenceLevel, DataSourceState, ThresholdStatus, VerificationStatus, SyncStatus, AlertStatus } from '@/types';

// Risk category colors
export const RISK_COLORS: Record<RiskCategory, string> = {
  NORMAL: '#059669',
  WATCH: '#d97706',
  HIGH: '#ea580c',
  CRITICAL: '#dc2626',
};

export const RISK_BG_COLORS: Record<RiskCategory, string> = {
  NORMAL: 'bg-emerald-600',
  WATCH: 'bg-amber-600',
  HIGH: 'bg-orange-600',
  CRITICAL: 'bg-red-600',
};

export const RISK_BG_LIGHT: Record<RiskCategory, string> = {
  NORMAL: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  WATCH: 'bg-amber-50 text-amber-800 border-amber-200',
  HIGH: 'bg-orange-50 text-orange-800 border-orange-200',
  CRITICAL: 'bg-red-50 text-red-800 border-red-200',
};

export const RISK_TEXT_COLORS: Record<RiskCategory, string> = {
  NORMAL: 'text-emerald-600',
  WATCH: 'text-amber-600',
  HIGH: 'text-orange-600',
  CRITICAL: 'text-red-600',
};

export const THRESHOLD_COLORS: Record<ThresholdStatus, string> = RISK_COLORS;

export const CONFIDENCE_COLORS: Record<ConfidenceLevel, string> = {
  LOW: '#ef4444',
  MEDIUM: '#f59e0b',
  HIGH: '#22c55e',
};

export const DATA_STATE_COLORS: Record<DataSourceState, string> = {
  LIVE: '#22c55e',
  REPLAYED: '#3b82f6',
  SIMULATED: '#a855f7',
  PLANNED: '#6b7280',
  UNAVAILABLE: '#ef4444',
};

export const VERIFICATION_COLORS: Record<VerificationStatus, string> = {
  UNVERIFIED: '#f59e0b',
  UNDER_REVIEW: '#3b82f6',
  VERIFIED: '#22c55e',
  REJECTED: '#ef4444',
  RESOLVED: '#6b7280',
};

export const SYNC_COLORS: Record<SyncStatus, string> = {
  PENDING: '#f59e0b',
  UPLOADING: '#3b82f6',
  SYNCED: '#22c55e',
  FAILED: '#ef4444',
};

export const ALERT_STATUS_COLORS: Record<AlertStatus, string> = {
  DRAFT: '#6b7280',
  AWAITING_AUTHORIZATION: '#f59e0b',
  AUTHORIZED: '#3b82f6',
  ACKNOWLEDGED: '#8b5cf6',
  UNDER_VERIFICATION: '#06b6d4',
  CLOSED: '#22c55e',
  ESCALATED: '#ef4444',
};

export function getRiskCategoryFromScore(score: number): RiskCategory {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 35) return 'WATCH';
  return 'NORMAL';
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getTimeAgo(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

export function formatObservationType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
