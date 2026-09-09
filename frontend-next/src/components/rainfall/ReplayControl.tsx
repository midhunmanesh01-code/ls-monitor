'use client';

import { Play, Pause, RotateCcw, StepForward, StepBack, FastForward, Clock, AlertCircle } from 'lucide-react';
import type { ReplayFrame } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import { formatTimestamp } from '@/lib/utils';

interface Props {
  frames: ReplayFrame[];
  currentFrame: ReplayFrame;
  currentFrameIndex: number;
  totalFrames: number;
  isPlaying: boolean;
  speed: 1 | 2 | 4;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpToFrame: (idx: number) => void;
  onSetSpeed: (speed: 1 | 2 | 4) => void;
}

export default function ReplayControl({
  frames,
  currentFrame,
  currentFrameIndex,
  totalFrames,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onJumpToFrame,
  onSetSpeed,
}: Props) {
  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Disaster Event Sequence Replay Control
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
            Sequential Scenario Playback
          </span>
        </div>
      </div>

      {/* Frame Details & Narrative */}
      <div className="p-3 rounded bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-amber-400 shrink-0">
              Stage {currentFrameIndex + 1} of {totalFrames}:
            </span>
            <span className="text-xs font-semibold text-slate-100">
              {currentFrame.label}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
            Event Time: {formatTimestamp(currentFrame.timestamp)}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[9px] text-slate-400 uppercase font-mono">Replay Risk</span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-100">
              {currentFrame.riskScore}/100
            </span>
          </div>
          <StatusBadge label={currentFrame.riskCategory} variant={currentFrame.riskCategory} size="md" />
        </div>
      </div>

      {/* Frame Sequence Steps Bar */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {frames.map((frame, idx) => {
            const isActive = idx === currentFrameIndex;
            const isPast = idx < currentFrameIndex;
            return (
              <button
                key={idx}
                onClick={() => onJumpToFrame(idx)}
                className={`
                  p-1.5 sm:p-2 rounded text-left transition-all border
                  ${
                    isActive
                      ? 'bg-amber-600/30 border-amber-500 text-amber-200 shadow-sm'
                      : isPast
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-950/50 border-slate-800/60 text-slate-500 hover:border-slate-700'
                  }
                `}
              >
                <div className="text-[9px] font-mono font-bold">Step {idx + 1}</div>
                <div className="text-[10px] font-medium truncate">{frame.thresholdStatus}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Narrative Events at current step */}
      {currentFrame.events && currentFrame.events.length > 0 && (
        <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 mb-1.5">
            <AlertCircle size={12} className="text-sky-400" />
            <span>Operational Trigger Events at this Stage</span>
          </div>
          <ul className="space-y-1">
            {currentFrame.events.map((event, idx) => (
              <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{event}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transport Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700"
            title="Reset to beginning"
            aria-label="Reset sequence"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={onStepBackward}
            disabled={currentFrameIndex === 0}
            className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors border border-slate-700"
            title="Step backward"
            aria-label="Step backward"
          >
            <StepBack size={15} />
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className={`
              flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold transition-colors shadow-lg
              ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
              }
            `}
          >
            {isPlaying ? (
              <>
                <Pause size={15} /> Pause Sequence
              </>
            ) : (
              <>
                <Play size={15} /> Play Progression
              </>
            )}
          </button>
          <button
            onClick={onStepForward}
            disabled={currentFrameIndex === totalFrames - 1}
            className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors border border-slate-700"
            title="Step forward"
            aria-label="Step forward"
          >
            <StepForward size={15} />
          </button>
        </div>

        {/* Speed selection */}
        <div className="flex items-center justify-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-lg">
          <span className="text-[10px] text-slate-500 font-mono px-1">Speed:</span>
          {([1, 2, 4] as const).map((s) => (
            <button
              key={s}
              onClick={() => onSetSpeed(s)}
              className={`
                px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors
                ${speed === s ? 'bg-amber-600 text-slate-950' : 'text-slate-400 hover:text-slate-200'}
              `}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
