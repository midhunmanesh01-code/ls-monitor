'use client';

import { Wifi, WifiOff } from 'lucide-react';

interface Props {
  isOffline: boolean;
  onToggle: () => void;
}

export default function OfflineIndicator({ isOffline, onToggle }: Props) {
  return (
    <div
      className={`
        p-3 sm:px-3.5 sm:py-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all
        ${
          isOffline
            ? 'bg-red-950/60 border-red-800 text-red-300'
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }
      `}
    >
      <div className="flex items-start sm:items-center gap-2.5">
        {isOffline ? (
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0 mt-1 sm:mt-0" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0" />
        )}
        <div>
          <div className="text-xs font-bold flex items-center gap-1.5 flex-wrap">
            {isOffline ? (
              <>
                <WifiOff size={13} className="text-red-400 shrink-0" />
                <span>OFFLINE FIELD MODE &mdash; NETWORK DISCONNECTED</span>
              </>
            ) : (
              <>
                <Wifi size={13} className="text-emerald-400 shrink-0" />
                <span>ONLINE &mdash; CELLULAR / SAT TELEMETRY CONNECTED</span>
              </>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isOffline
              ? 'GPS observations are cached locally and queued for auto-transmission upon reconnect.'
              : 'Direct sync active with District Emergency Operations Center (DEOC).'}
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`
          w-full sm:w-auto px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border shrink-0 text-center
          ${
            isOffline
              ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm'
              : 'bg-red-900/60 hover:bg-red-800 text-red-200 border-red-700'
          }
        `}
      >
        {isOffline ? 'Restore Uplink' : 'Simulate Offline Mode'}
      </button>
    </div>
  );
}
