'use client';

import { useEffect, useState } from 'react';
import {
  Server,
  CloudLightning,
  CheckCircle2,
  Clock,
  ArrowRight,
  Minimize2,
  Layers,
  Radio,
  Sparkles,
} from 'lucide-react';
import type { ServerHealthState } from '@/hooks/useServerHealth';

interface Props {
  health: ServerHealthState;
}

export default function ServerWarmupModal({ health }: Props) {
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  // If server becomes ready, show brief success celebration
  useEffect(() => {
    if (health.isReady && health.elapsedSeconds > 2) {
      setShowSuccessBadge(true);
      const timer = setTimeout(() => {
        setShowSuccessBadge(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [health.isReady, health.elapsedSeconds]);

  // Don't show if user dismissed it or server is ready and no success animation pending
  if (health.dismissed || (health.isReady && !showSuccessBadge) || (!health.isWakingUp && !showSuccessBadge)) {
    return null;
  }

  const steps = [
    { label: 'Waking Render container image', done: health.elapsedSeconds > 8 },
    { label: 'Initializing FastAPI & GIS routing engine', done: health.elapsedSeconds > 20 },
    { label: 'Connecting IMD rainfall feeds & landslide models', done: health.elapsedSeconds > 35 || health.isReady },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
              {showSuccessBadge ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-bounce" />
              ) : (
                <Server className="w-5 h-5 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  {showSuccessBadge ? 'Backend Connected Successfully!' : 'Server Spin-Up in Progress'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  Render Free Tier
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {showSuccessBadge
                  ? 'All telemetry streams and risk analytics are operational.'
                  : 'Waking up cold server instance after inactivity (~30-50s)'}
              </p>
            </div>
          </div>

          <button
            onClick={health.dismiss}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Minimize to background banner"
            aria-label="Minimize modal"
          >
            <Minimize2 size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {!showSuccessBadge ? (
            <>
              {/* Progress & Live Timer */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                    <Clock size={13} className="text-amber-400" />
                    Elapsed: <strong className="text-amber-400 font-mono">{health.elapsedSeconds}s</strong>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Est: ~{health.estimatedTotalSeconds}s ({health.progressPercent}%)
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${Math.max(8, health.progressPercent)}%` }}
                  />
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
              </div>

              {/* Startup Step Checklist */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Warm-up Sequence Checklist:
                </span>
                <div className="space-y-1.5">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border flex items-center gap-2.5 text-xs transition-colors ${
                        step.done
                          ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin shrink-0" />
                      )}
                      <span className={step.done ? 'font-medium' : ''}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offline / Demo Notice */}
              <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 flex items-start gap-2.5">
                <Sparkles size={15} className="text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px]">
                  <span className="font-bold text-sky-100">No Waiting Required!</span>
                  <p className="text-slate-300">
                    The entire Wayanad Landslide Monitor includes a complete built-in simulation dataset so you can explore GIS maps, rainfall triggers, and alerts immediately while Render warms up.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-2 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Render Container Live</h4>
              <p className="text-xs text-slate-400">
                FastAPI endpoints are responding with live telemetry.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Backend will stay warm for subsequent actions.
          </span>

          <button
            onClick={health.dismiss}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
          >
            <span>Continue in Instant Demo Mode</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
