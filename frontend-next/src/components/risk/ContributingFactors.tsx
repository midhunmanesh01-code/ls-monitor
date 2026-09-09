'use client';

import type { ContributingFactor } from '@/types';
import ProgressBar from '@/components/common/ProgressBar';
import StatusBadge from '@/components/common/StatusBadge';
import { Layers, CloudRain, Wind, Eye } from 'lucide-react';

interface Props {
  factors: ContributingFactor[];
  riskCategory: string;
}

const FACTOR_ICONS: Record<string, React.ElementType> = {
  terrain: Layers,
  'rainfall-threshold': CloudRain,
  'rainfall-forecast': Wind,
  observations: Eye,
};

export default function ContributingFactors({ factors, riskCategory }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Contributing Factors Breakdown
        </h4>
        <span className="text-[10px] text-slate-500 font-mono">
          Physical Hazard Analysis
        </span>
      </div>

      <div className="space-y-3">
        {factors.map((factor) => {
          const Icon = FACTOR_ICONS[factor.id] || Layers;
          return (
            <div
              key={factor.id}
              className="p-2.5 rounded-md bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    {factor.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge label={factor.level} variant={factor.level} size="sm" />
                </div>
              </div>

              <div className="mb-1.5">
                <ProgressBar value={factor.value} max={100} showValue={false} size="sm" />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
