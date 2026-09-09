'use client';

import { Shield } from 'lucide-react';

export default function DemoModeBanner() {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 text-slate-300 text-xs">
      <div className="flex items-center gap-2">
        <Shield size={13} className="text-amber-400" />
        <span className="font-semibold text-slate-200">DISASTER EARLY WARNING PLATFORM</span>
        <span className="text-slate-500 hidden sm:inline">&mdash; Wayanad District Operational Command (Meppadi &bull; Vythiri &bull; Mundakkai Sectors)</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-semibold">LIVE SENSOR TELEMETRY CONNECTED</span>
      </div>
    </div>
  );
}
