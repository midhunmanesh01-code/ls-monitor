'use client';

import { Shield } from 'lucide-react';

export default function DemoModeBanner() {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 text-slate-300 text-xs shrink-0">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
        <Shield size={13} className="text-amber-400 shrink-0" />
        <span className="font-semibold text-slate-200 text-[11px] sm:text-xs truncate">
          DISASTER EARLY WARNING PLATFORM
        </span>
        <span className="text-slate-500 hidden md:inline text-[11px] truncate">
          &mdash; Wayanad District Operational Command (Meppadi &bull; Vythiri &bull; Mundakkai)
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-slate-400 shrink-0 pl-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-emerald-400 font-semibold hidden sm:inline">LIVE TELEMETRY CONNECTED</span>
        <span className="text-emerald-400 font-semibold sm:hidden">TELEMETRY OK</span>
      </div>
    </div>
  );
}
