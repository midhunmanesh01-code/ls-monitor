'use client';

import { useState } from 'react';
import type { ResponsePriorityItem } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import ProgressBar from '@/components/common/ProgressBar';
import {
  ListOrdered,
  AlertTriangle,
  Users,
  Building,
  CheckSquare,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  items: ResponsePriorityItem[];
}

export default function ResponsePriority({ items }: Props) {
  const [expandedRank, setExpandedRank] = useState<number | null>(1);

  const toggleExpand = (rank: number) => {
    setExpandedRank(expandedRank === rank ? null : rank);
  };

  return (
    <div className="space-y-4">
      {/* Principle Clarification Banner */}
      <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Explainable Tri-Factor Prioritization Framework
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-amber-400">Physical Hazard ≠ Vulnerable Exposure ≠ Operational Priority.</strong>{' '}
          The system computes actionable field priority by evaluating geological susceptibility and trigger thresholds alongside localized population density, road corridor centrality, and emergency shelter accessibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-slate-400">
          <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Factor 1: Physical Hazard</span>
            <span className="text-red-400 font-bold">40% Weight</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Factor 2: Population Exposure</span>
            <span className="text-sky-400 font-bold">35% Weight</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Factor 3: Critical Lifelines</span>
            <span className="text-indigo-400 font-bold">25% Weight</span>
          </div>
        </div>
      </div>

      {/* Priority Ranked Items List */}
      <div className="space-y-3">
        {items.map((item) => {
          const isExpanded = expandedRank === item.rank;
          const isTopPriority = item.rank <= 2;

          return (
            <div
              key={item.zoneId}
              className={`
                rounded-lg bg-slate-900/80 border transition-all overflow-hidden
                ${
                  item.rank === 1
                    ? 'border-red-600/50 bg-slate-900/90'
                    : item.rank === 2
                    ? 'border-orange-600/50'
                    : 'border-slate-800'
                }
              `}
            >
              <div
                onClick={() => toggleExpand(item.rank)}
                className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Rank & Zone Info */}
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`
                      w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-mono font-black text-xs sm:text-sm shrink-0 border mt-0.5 sm:mt-0
                      ${
                        item.rank === 1
                          ? 'bg-red-950/80 text-red-400 border-red-700'
                          : item.rank === 2
                          ? 'bg-orange-950/80 text-orange-400 border-orange-700'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }
                    `}
                  >
                    #{item.rank}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-100">{item.zoneName}</h3>
                      <StatusBadge label={item.hazardLevel} variant={item.hazardLevel} size="sm" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.rationale}</p>
                  </div>
                </div>

                {/* Score Gauges in Row */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                  <div className="hidden lg:grid grid-cols-3 gap-3 text-[10px] text-slate-400 w-64 font-mono">
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Hazard</span>
                        <strong className="text-red-400">{item.hazardScore}</strong>
                      </div>
                      <ProgressBar value={item.hazardScore} max={100} showValue={false} size="sm" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Exposure</span>
                        <strong className="text-sky-400">{item.exposureScore}</strong>
                      </div>
                      <ProgressBar value={item.exposureScore} max={100} showValue={false} size="sm" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span>Lifeline</span>
                        <strong className="text-indigo-400">{item.infrastructureScore}</strong>
                      </div>
                      <ProgressBar value={item.infrastructureScore} max={100} showValue={false} size="sm" />
                    </div>
                  </div>

                  {/* Mobile mini indicators */}
                  <div className="flex lg:hidden items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-red-400">
                      H:{item.hazardScore}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400">
                      E:{item.exposureScore}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-400">
                      L:{item.infrastructureScore}
                    </span>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase block">Priority</span>
                      <span
                        className={`text-lg sm:text-xl font-black font-mono leading-none ${
                          item.overallPriority >= 80
                            ? 'text-red-400'
                            : item.overallPriority >= 60
                            ? 'text-orange-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {item.overallPriority}
                      </span>
                    </div>

                    <button className="text-slate-400 hover:text-slate-200 p-1">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Action Plan & Assets */}
              {isExpanded && (
                <div className="p-3.5 sm:p-4 bg-slate-950/90 border-t border-slate-800 space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Critical Assets At Risk */}
                    <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                        <ShieldAlert size={14} className="text-red-400 shrink-0" />
                        <span>High-Vulnerability Assets in Threat Corridor</span>
                      </div>
                      <ul className="space-y-1">
                        {item.criticalAssets.map((asset, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                            <span>{asset}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Incident Commander Actions */}
                    <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                        <CheckSquare size={14} className="text-emerald-400 shrink-0" />
                        <span>Recommended Field Response Actions</span>
                      </div>
                      <ul className="space-y-1">
                        {item.recommendedActions.map((action, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-1">
                    <Link
                      href="/risk-map"
                      className="w-full sm:w-auto text-center px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                    >
                      Locate on GIS Map
                    </Link>
                    <Link
                      href="/alerts"
                      className="w-full sm:w-auto text-center px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-600 text-slate-950 hover:bg-amber-500 transition-colors shadow-sm"
                    >
                      Issue Targeted Warning
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
