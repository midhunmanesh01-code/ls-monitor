'use client';

import type { AlertTimelineEntry } from '@/types';
import { formatTimestamp } from '@/lib/utils';
import { CircleDot } from 'lucide-react';

interface Props {
  timeline: AlertTimelineEntry[];
}

export default function AlertTimeline({ timeline }: Props) {
  return (
    <div className="space-y-3">
      <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Chain of Custody & Action Log
      </h5>
      <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {timeline.map((entry, idx) => (
          <div key={idx} className="relative space-y-0.5">
            <CircleDot
              size={12}
              className="absolute -left-5 top-0.5 text-amber-500 bg-slate-950 rounded-full"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-200">{entry.action}</span>
              <span className="text-[10px] text-amber-400 font-medium">by {entry.actor}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {formatTimestamp(entry.timestamp)}
              </span>
            </div>
            {entry.note && (
              <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800/60 mt-1">
                {entry.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
