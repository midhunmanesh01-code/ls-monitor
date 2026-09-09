'use client';

import type {
  RiskCategory,
  AlertStatus,
  VerificationStatus,
  SyncStatus,
  ThresholdStatus,
  ReportSeverity,
} from '@/types';

export type BadgeVariant =
  | RiskCategory
  | AlertStatus
  | VerificationStatus
  | SyncStatus
  | ThresholdStatus
  | ReportSeverity;

const VARIANT_STYLES: Record<string, string> = {
  NORMAL: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  WATCH: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  HIGH: 'bg-orange-900/40 text-orange-400 border-orange-700/50',
  CRITICAL: 'bg-red-900/40 text-red-400 border-red-700/50',
  DRAFT: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
  AWAITING_AUTHORIZATION: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  AUTHORIZED: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  ACKNOWLEDGED: 'bg-violet-900/40 text-violet-400 border-violet-700/50',
  UNDER_VERIFICATION: 'bg-cyan-900/40 text-cyan-400 border-cyan-700/50',
  CLOSED: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  ESCALATED: 'bg-red-900/40 text-red-400 border-red-700/50',
  UNVERIFIED: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  UNDER_REVIEW: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  VERIFIED: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  REJECTED: 'bg-red-900/40 text-red-400 border-red-700/50',
  RESOLVED: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
  PENDING: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  UPLOADING: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  SYNCED: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  FAILED: 'bg-red-900/40 text-red-400 border-red-700/50',
  LIVE: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  REPLAYED: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  SIMULATED: 'bg-violet-900/40 text-violet-400 border-violet-700/50',
  PLANNED: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
  UNAVAILABLE: 'bg-red-900/40 text-red-400 border-red-700/50',
  LOW: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  MEDIUM: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
};

interface Props {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ label, variant, size = 'sm' }: Props) {
  const style = variant ? VARIANT_STYLES[variant] || VARIANT_STYLES.NORMAL : VARIANT_STYLES.NORMAL;
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold uppercase tracking-wider ${style} ${sizeClass}`}>
      {label.replace(/_/g, ' ')}
    </span>
  );
}
