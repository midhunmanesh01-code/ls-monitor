'use client';

import type { ThresholdStatus as ThresholdStatusType } from '@/types';
import ProgressBar from '@/components/common/ProgressBar';
import StatusBadge from '@/components/common/StatusBadge';
import { CloudRain, AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface Props {
  status: ThresholdStatusType;
  cumulative24h: number;
  cumulative72h: number;
  threshold24h: number;
  threshold72h: number;
  forecast24h: number;
  forecast72h: number;
  currentRate: number;
}

export default function ThresholdStatus({
  status,
  cumulative24h,
  cumulative72h,
  threshold24h,
  threshold72h,
  forecast24h,
  forecast72h,
  currentRate,
}: Props) {
  const pct24 = Math.round((cumulative24h / threshold24h) * 100);
  const pct72 = Math.round((cumulative72h / threshold72h) * 100);

  return (
    <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Empirical Rainfall Threshold Status
          </h4>
        </div>
        <StatusBadge label={status} variant={status} size="md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 24h Threshold */}
        <div className="p-3 rounded bg-slate-950/60 border border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">24-Hour Threshold</span>
            <span className="font-mono text-slate-400">
              <strong className={pct24 >= 100 ? 'text-red-400' : pct24 >= 75 ? 'text-orange-400' : 'text-slate-200'}>
                {cumulative24h} mm
              </strong>{' '}
              / {threshold24h} mm ({pct24}%)
            </span>
          </div>
          <ProgressBar value={cumulative24h} max={threshold24h} showValue={false} size="md" />
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>+24h Forecast: +{forecast24h} mm</span>
            <span>
              {pct24 >= 100 ? (
                <span className="text-red-400 font-bold flex items-center gap-0.5">
                  <AlertTriangle size={10} /> Threshold Exceeded
                </span>
              ) : pct24 >= 75 ? (
                <span className="text-orange-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> High Risk Breach Likely
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <ShieldCheck size={10} /> Within Safe Envelope
                </span>
              )}
            </span>
          </div>
        </div>

        {/* 72h Threshold */}
        <div className="p-3 rounded bg-slate-950/60 border border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">72-Hour Cumulative (Antecedent)</span>
            <span className="font-mono text-slate-400">
              <strong className={pct72 >= 100 ? 'text-red-400' : pct72 >= 75 ? 'text-orange-400' : 'text-slate-200'}>
                {cumulative72h} mm
              </strong>{' '}
              / {threshold72h} mm ({pct72}%)
            </span>
          </div>
          <ProgressBar value={cumulative72h} max={threshold72h} showValue={false} size="md" />
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>+72h Forecast: +{forecast72h} mm</span>
            <span>
              {pct72 >= 100 ? (
                <span className="text-red-400 font-bold flex items-center gap-0.5">
                  <AlertTriangle size={10} /> Saturated Regolith
                </span>
              ) : (
                <span className="text-slate-400">Pore Pressure Stable</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs px-1 text-slate-400">
        <span>Current Rainfall Rate: <strong className="text-sky-300 font-mono">{currentRate} mm/h</strong></span>
        <span className="text-[10px] text-slate-500">Methodology: Intensity-Duration (I-D) Threshold Model</span>
      </div>
    </div>
  );
}
