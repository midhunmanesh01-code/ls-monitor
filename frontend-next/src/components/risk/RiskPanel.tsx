'use client';

import { useEffect, useState } from 'react';
import type { Zone, RiskAssessment } from '@/types';
import { getRiskAssessment } from '@/services/zones';
import RiskGauge from './RiskGauge';
import RiskBadge from './RiskBadge';
import ContributingFactors from './ContributingFactors';
import ExposurePanel from './ExposurePanel';
import { getTimeAgo } from '@/lib/utils';
import { X, TrendingUp, TrendingDown, Minus, Info, AlertOctagon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  zone: Zone | null;
  onClose: () => void;
}

export default function RiskPanel({ zone, onClose }: Props) {
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!zone) {
      setAssessment(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    getRiskAssessment(zone.id)
      .then((data) => {
        if (isMounted) {
          setAssessment(data || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [zone]);

  if (!zone) return null;

  const trendIcon = assessment?.trend === 'INCREASING' ? (
    <span className="flex items-center text-red-400 font-semibold gap-0.5 text-xs">
      <TrendingUp size={13} /> Increasing
    </span>
  ) : assessment?.trend === 'DECREASING' ? (
    <span className="flex items-center text-emerald-400 font-semibold gap-0.5 text-xs">
      <TrendingDown size={13} /> Decreasing
    </span>
  ) : (
    <span className="flex items-center text-slate-400 font-semibold gap-0.5 text-xs">
      <Minus size={13} /> Stable
    </span>
  );

  return (
    <div className="w-full md:w-[420px] bg-slate-950/95 backdrop-blur border-l border-slate-800 flex flex-col h-full overflow-hidden shadow-2xl z-30">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-100">{zone.name}</h3>
            <RiskBadge category={zone.riskCategory} size="sm" />
          </div>
          <p className="text-xs text-slate-400 leading-snug">{zone.description}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-mono">
            <span>Elevation: {zone.elevation}</span>
            <span>•</span>
            <span>Terrain: {zone.terrain.split(',')[0]}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          aria-label="Close risk panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading risk assessment...</div>
        ) : assessment ? (
          <>
            {/* Top Score Banner */}
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <RiskGauge score={assessment.score} size={88} />
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Composite Hazard Score
                  </div>
                  <div className="text-xs text-slate-300">
                    Trend: {trendIcon}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    Confidence:
                    <span className={assessment.confidence === 'HIGH' ? 'text-emerald-400 font-semibold' : assessment.confidence === 'MEDIUM' ? 'text-amber-400 font-semibold' : 'text-red-400 font-semibold'}>
                      {assessment.confidence}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right text-[10px] text-slate-500 font-mono self-end">
                Updated {getTimeAgo(assessment.lastUpdated)}
              </div>
            </div>

            {/* Response Priority Quick Badge */}
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertOctagon size={16} className={assessment.responsePriority <= 2 ? 'text-red-400' : 'text-amber-400'} />
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    Operational Response Priority #{assessment.responsePriority}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Calculated from Hazard ({assessment.score}) + Exposure ({assessment.exposure.population} pop.)
                  </div>
                </div>
              </div>
              <Link
                href="/response-priority"
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                View Action Plan →
              </Link>
            </div>

            {/* Explainability: Contributing Factors */}
            <ContributingFactors
              factors={assessment.factors}
              riskCategory={assessment.category}
            />

            {/* Exposure & Vulnerability */}
            <ExposurePanel exposure={assessment.exposure} />

            {/* Operational Advisory & Next Actions */}
            <div className="p-3 rounded-md bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Info size={13} className="text-amber-400" />
                <span>Recommended Operational Action</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {assessment.score >= 80 ? (
                  'Immediate field verification and evacuation preparedness advisory required. Check NH/SH road status and notify local Tahsildar.'
                ) : assessment.score >= 60 ? (
                  'Deploy field team for ground crack & seepage inspection. Maintain continuous 24h rainfall threshold watch.'
                ) : (
                  'Normal baseline monitoring. Ensure automatic telemetry ingestion remains active.'
                )}
              </p>
              <div className="pt-1 flex gap-2">
                <Link
                  href="/alerts"
                  className="flex-1 text-center py-1.5 px-2 rounded text-[11px] font-semibold bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 transition-colors"
                >
                  Manage Alerts
                </Link>
                <Link
                  href="/field-reports"
                  className="flex-1 text-center py-1.5 px-2 rounded text-[11px] font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  Submit Field Obs.
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center text-xs text-slate-500">
            No assessment data found for this zone.
          </div>
        )}
      </div>
    </div>
  );
}
