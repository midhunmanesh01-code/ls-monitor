'use client';

import { useState } from 'react';
import { useReplay } from '@/hooks/useReplay';
import ReplayControl from '@/components/rainfall/ReplayControl';
import ThresholdStatus from '@/components/rainfall/ThresholdStatus';
import StatusBadge from '@/components/common/StatusBadge';
import { DEMO_REPLAY_FRAMES } from '@/data/rainfall';
import { formatTimestamp } from '@/lib/utils';
import {
  History,
  AlertTriangle,
  CheckCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export default function HistoricalReplayPage() {
  const replay = useReplay(DEMO_REPLAY_FRAMES);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-amber-400" />
            <h1 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wide">
              Historical Event Replay & Model Validation
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Retrospective case study replay demonstrating the complete operational pipeline during the July 2024 Wayanad Debris Flow sequence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold font-mono text-slate-300 uppercase">
            Historical Validation Record &bull; July 2024 Event
          </span>
        </div>
      </div>

      {/* Case Study Context Card */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-100">
            Case Study: Mundakkai–Chooralmala Slope Disaster (July 28–30, 2024)
          </h3>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">Location: Meppadi, Wayanad</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          During late July 2024, extreme orographic monsoon precipitation over the Western Ghats escarpment generated cumulative antecedent rainfall exceeding 400 mm in 72 hours. This replay demonstrates how the Landslide Monitor platform steps through telemetry ingestion, empirical threshold breaches, officer authorization, citizen field truthing, and emergency response ranking.
        </p>
      </div>

      {/* Replay Controller Component */}
      <ReplayControl
        frames={replay.frames}
        currentFrame={replay.currentFrame}
        currentFrameIndex={replay.currentFrameIndex}
        totalFrames={replay.totalFrames}
        isPlaying={replay.isPlaying}
        speed={replay.speed}
        onPlay={replay.play}
        onPause={replay.pause}
        onReset={replay.reset}
        onStepForward={replay.stepForward}
        onStepBackward={replay.stepBackward}
        onJumpToFrame={replay.jumpToFrame}
        onSetSpeed={replay.setSpeed}
      />

      {/* Threshold Status for current frame */}
      <ThresholdStatus
        status={replay.currentFrame.thresholdStatus}
        cumulative24h={replay.currentFrame.rainfall.cumulative24h}
        cumulative72h={replay.currentFrame.rainfall.cumulative72h}
        threshold24h={150}
        threshold72h={300}
        forecast24h={replay.currentFrame.rainfall.forecast24h}
        forecast72h={replay.currentFrame.rainfall.forecast72h}
        currentRate={replay.currentFrame.rainfall.current}
      />

      {/* 3-Minute SIH Demonstration Story Guide */}
      <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            The 6-Stage Operational Decision Architecture
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
          {[
            {
              step: '1. OBSERVE',
              desc: 'Continuous ingestion of AWS rainfall, radar forecasts & terrain susceptibility.',
              color: 'border-slate-700 bg-slate-950/80',
            },
            {
              step: '2. ASSESS',
              desc: 'Empirical I-D threshold analysis detects pore-pressure saturation.',
              color: 'border-amber-700/60 bg-amber-950/20',
            },
            {
              step: '3. EXPLAIN',
              desc: 'Transparent factor breakdown separates physical hazard from human exposure.',
              color: 'border-sky-700/60 bg-sky-950/20',
            },
            {
              step: '4. AUTHORIZE',
              desc: 'Official early warning requires magistrate / collector authorization sign-off.',
              color: 'border-indigo-700/60 bg-indigo-950/20',
            },
            {
              step: '5. VERIFY',
              desc: 'Ground observations (tension cracks, seepage) verified by geologists.',
              color: 'border-emerald-700/60 bg-emerald-950/20',
            },
            {
              step: '6. PRIORITIZE',
              desc: 'Ranked emergency deployment for NDRF, medical units, and road clearance.',
              color: 'border-red-700/60 bg-red-950/20',
            },
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-lg border ${item.color} flex flex-col justify-between`}>
              <div className="font-mono text-xs font-bold text-slate-200 mb-1">{item.step}</div>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
