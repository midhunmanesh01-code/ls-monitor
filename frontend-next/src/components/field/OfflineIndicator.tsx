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
        px-3.5 py-2 rounded-lg border flex items-center justify-between transition-all
        ${
          isOffline
            ? 'bg-red-950/60 border-red-800 text-red-300'
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }
      `}
    >
      <div className="flex items-center gap-2.5">
        {isOffline ? (
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        )}
        <div>
          <div className="text-xs font-bold flex items-center gap-1.5">
            {isOffline ? (
              <>
                <WifiOff size={13} className="text-red-400" />
                <span>OFFLINE FIELD MODE &mdash; NETWORK DISCONNECTED</span>
              </>
            ) : (
              <>
                <Wifi size={13} className="text-emerald-400" />
                <span>ONLINE &mdash; CELLULAR / SATELLITE TELEMETRY CONNECTED</span>
              </>
            )}
          </div>
          <div className="text-[10px] text-slate-400">
            {isOffline
              ? 'GPS observations are cached locally and queued for automatic transmission upon reconnect.'
              : 'Direct sync enabled with District Emergency Operations Center (DEOC).'}
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`
          px-3 py-1 rounded text-xs font-mono font-bold transition-all border
          ${
            isOffline
              ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 border-emerald-500'
              : 'bg-red-900/60 hover:bg-red-800 text-red-200 border-red-700'
          }
        `}
      >
        {isOffline ? 'Simulate Reconnect' : 'Simulate Network Drop'}
      </button>
    </div>
  );
}
