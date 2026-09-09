'use client';

import { getTimeAgo } from '@/lib/utils';
import type { ConfidenceLevel, DataSourceState } from '@/types';

const STATE_DOT: Record<DataSourceState, string> = {
  LIVE: 'bg-emerald-400',
  REPLAYED: 'bg-blue-400',
  SIMULATED: 'bg-violet-400',
  PLANNED: 'bg-slate-400',
  UNAVAILABLE: 'bg-red-400',
};

interface Props {
  source: string;
  state: DataSourceState;
  lastUpdate: string;
  confidence: ConfidenceLevel;
}

export default function DataFreshness({ source, state, lastUpdate, confidence }: Props) {
  return (
    <div className="flex items-center gap-3 text-[11px]">
      <span className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${STATE_DOT[state]} ${state === 'LIVE' ? 'animate-pulse' : ''}`} />
        <span className="text-slate-400">{state}</span>
      </span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">{source}</span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">{getTimeAgo(lastUpdate)}</span>
      <span className="text-slate-500">•</span>
      <span className={`font-medium ${confidence === 'HIGH' ? 'text-emerald-400' : confidence === 'MEDIUM' ? 'text-amber-400' : 'text-red-400'}`}>
        {confidence} confidence
      </span>
    </div>
  );
}
