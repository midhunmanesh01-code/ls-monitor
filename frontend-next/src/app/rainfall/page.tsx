'use client';

import { useState, useEffect } from 'react';
import RainfallChart from '@/components/rainfall/RainfallChart';
import ThresholdStatus from '@/components/rainfall/ThresholdStatus';
import ReplayControl from '@/components/rainfall/ReplayControl';
import { useReplay } from '@/hooks/useReplay';
import { getZones } from '@/services/zones';
import { getAllRainfallData } from '@/services/rainfall';
import { DEMO_REPLAY_FRAMES } from '@/data/rainfall';
import type { Zone, RainfallData } from '@/types';
import { CloudRain, Radio, BarChart3, Clock, AlertTriangle, Layers } from 'lucide-react';

export default function RainfallPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [rainfallDataMap, setRainfallDataMap] = useState<Record<string, RainfallData>>({});
  const [selectedZoneId, setSelectedZoneId] = useState('zone-a');
  const [isReplayMode, setIsReplayMode] = useState(false);

  const replay = useReplay(DEMO_REPLAY_FRAMES);

  useEffect(() => {
    async function load() {
      const [z, r] = await Promise.all([getZones(), getAllRainfallData()]);
      setZones(z);
      setRainfallDataMap(r);
    }
    load();
  }, []);

  const activeZoneRainfall = rainfallDataMap[selectedZoneId] || null;

  // In replay mode, use frame data instead
  const displayRainfall: RainfallData | null = isReplayMode && replay.currentFrame
    ? {
        ...replay.currentFrame.rainfall,
        threshold24h: activeZoneRainfall?.threshold24h || 150,
        threshold72h: activeZoneRainfall?.threshold72h || 300,
        readings: activeZoneRainfall?.readings || [],
      }
    : activeZoneRainfall;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-5 h-5 text-sky-400" />
            <h1 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wide">
              Rainfall & Trigger Threshold Monitoring
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time telemetry ingestion and empirical Intensity-Duration (I-D) threshold analytics for slope failure prediction.
          </p>
        </div>

        {/* Replay Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReplayMode(!isReplayMode)}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-2
              ${
                isReplayMode
                  ? 'bg-amber-600 text-slate-950 border-amber-500 shadow-lg'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }
            `}
          >
            <Clock size={14} />
            {isReplayMode ? 'Exit Demo Replay' : 'Launch SIH 3-Min Event Replay'}
          </button>
        </div>
      </div>

      {/* Replay Controller (When active) */}
      {isReplayMode && (
        <div className="animate-in fade-in duration-300">
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
        </div>
      )}

      {/* Sector Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 font-mono">
          Select Sector:
        </span>
        {zones.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          const zRain = rainfallDataMap[zone.id];
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all border flex items-center gap-2
                ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500 text-amber-400 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }
              `}
            >
              <span>{zone.name}</span>
              {zRain && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">
                  {zRain.cumulative24h} mm
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Hydrometeorological Analytics */}
      {displayRainfall && (
        <div className="space-y-6">
          {/* Threshold Status Component */}
          <ThresholdStatus
            status={displayRainfall.thresholdStatus}
            cumulative24h={displayRainfall.cumulative24h}
            cumulative72h={displayRainfall.cumulative72h}
            threshold24h={displayRainfall.threshold24h}
            threshold72h={displayRainfall.threshold72h}
            forecast24h={displayRainfall.forecast24h}
            forecast72h={displayRainfall.forecast72h}
            currentRate={displayRainfall.current}
          />

          {/* Rainfall Hyetograph Chart */}
          <RainfallChart
            readings={displayRainfall.readings}
            threshold24h={displayRainfall.threshold24h}
            threshold72h={displayRainfall.threshold72h}
            thresholdStatus={displayRainfall.thresholdStatus}
          />
        </div>
      )}
    </div>
  );
}
