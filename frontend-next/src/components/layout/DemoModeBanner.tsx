'use client';

import { AlertTriangle } from 'lucide-react';

export default function DemoModeBanner() {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-950/30 border-b border-amber-900/30 text-amber-400 text-xs">
      <AlertTriangle size={13} />
      <span className="font-medium">DEMO MODE</span>
      <span className="text-amber-500/70">&mdash; Simulated/Replayed Data &mdash; Not Connected to Live Sources</span>
    </div>
  );
}
