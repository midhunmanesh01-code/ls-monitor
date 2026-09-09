'use client';

import type { FieldReport } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import { formatObservationType, getTimeAgo } from '@/lib/utils';
import { RefreshCw, CheckCircle2, Clock, AlertCircle, Database } from 'lucide-react';

interface Props {
  reports: FieldReport[];
  isSyncing: boolean;
  onSyncAll: () => void;
  isOffline: boolean;
}

export default function SyncQueue({
  reports,
  isSyncing,
  onSyncAll,
  isOffline,
}: Props) {
  const pendingReports = reports.filter(
    (r) => r.syncStatus === 'PENDING' || r.syncStatus === 'UPLOADING'
  );
  const syncedReports = reports.filter((r) => r.syncStatus === 'SYNCED');

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2.5 gap-2">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400 shrink-0" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Storage & Sync Queue
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">
            Pending: <strong className="text-amber-400">{pendingReports.length}</strong> | Synced: <strong className="text-emerald-400">{syncedReports.length}</strong>
          </span>
        </div>
      </div>

      {/* Sync Action Button */}
      <div className="p-3 rounded bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-300 space-y-0.5">
          <div className="font-semibold flex items-center gap-1.5">
            {pendingReports.length > 0 ? (
              <>
                <Clock size={13} className="text-amber-400 shrink-0" />
                <span>{pendingReports.length} observation(s) waiting in local store</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>All local reports synchronized with Central Command</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-slate-500">
            IndexedDB local queue with idempotent retry protocol.
          </p>
        </div>

        <button
          onClick={onSyncAll}
          disabled={isSyncing || isOffline || pendingReports.length === 0}
          className={`
            w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0
            ${
              isSyncing
                ? 'bg-blue-600/50 text-blue-200 cursor-wait'
                : isOffline
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : pendingReports.length > 0
                ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }
          `}
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing
            ? 'Synchronizing Queue...'
            : isOffline
            ? 'Connect Online to Sync'
            : pendingReports.length > 0
            ? 'Sync Queue Now'
            : 'Queue Synced'}
        </button>
      </div>

      {/* Pending Items List */}
      {pendingReports.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Pending Transmission Items
          </h5>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {pendingReports.map((item) => (
              <div
                key={item.id}
                className="p-2 rounded bg-slate-950/90 border border-amber-900/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-200">
                    {formatObservationType(item.observationType)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {item.locationName} &bull; {getTimeAgo(item.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge label={item.severity} variant={item.severity} size="sm" />
                  <StatusBadge label={item.syncStatus} variant={item.syncStatus} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
