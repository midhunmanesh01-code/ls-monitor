'use client';

import { Server, CheckCircle2, RefreshCw, Maximize2 } from 'lucide-react';
import type { ServerHealthState } from '@/hooks/useServerHealth';

interface Props {
  health: ServerHealthState;
}

export default function RenderWakeupBanner({ health }: Props) {
  // Only show when the modal is dismissed and it's still waking up or was recently resolved
  if (!health.dismissed || health.isReady) {
    return null;
  }

  return (
    <aside
      aria-label="Server status"
      className="bg-amber-950/70 border-b border-amber-700/50 px-3 py-1.5 flex items-center justify-between text-xs text-amber-200 shrink-0 z-30 animate-in slide-in-from-top-2"
    >
      <div className="flex items-center gap-2 truncate pr-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
        <span className="font-semibold text-[11px] truncate">
          Render Server Booting ({health.elapsedSeconds}s elapsed / ~{health.estimatedTotalSeconds}s) &bull; Active in Demo Mode
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={health.retry}
          className="px-2 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800 text-[10px] font-mono border border-amber-600/40 text-amber-300 flex items-center gap-1 transition-colors"
        >
          <RefreshCw size={10} /> Ping
        </button>
      </div>
    </aside>
  );
}
