'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { RainfallReading, ThresholdStatus as ThresholdStatusType } from '@/types';
import { RISK_COLORS } from '@/lib/utils';

interface Props {
  readings: RainfallReading[];
  threshold24h: number;
  threshold72h: number;
  thresholdStatus: ThresholdStatusType;
}

export default function RainfallChart({
  readings,
  threshold24h,
  threshold72h,
  thresholdStatus,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-72 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500">
        Loading rainfall hyetograph...
      </div>
    );
  }

  // Format readings for the chart (take last 24-36 hours for clean visualization)
  const chartData = (readings.length > 0 ? readings.slice(-36) : []).map((r, i) => {
    const d = new Date(r.timestamp);
    const timeLabel = `${d.getHours()}:00`;
    return {
      time: timeLabel,
      hourly: r.value,
      cum24: r.cumulative24h,
      cum72: r.cumulative72h,
    };
  });

  const statusColor = RISK_COLORS[thresholdStatus] || '#059669';

  return (
    <div className="w-full h-72 sm:h-80 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 sm:p-3 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Rainfall Intensity & 24h Cumulative
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden xs:inline">
            (Hourly Rate vs Threshold)
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] flex-wrap">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-500/80 rounded-sm" /> Hourly (mm)
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-500/40 border border-amber-500 rounded-sm" /> 24h Cumulative
          </span>
          <span className="flex items-center gap-1 text-red-400 font-mono">
            <span className="w-2.5 h-0.5 bg-red-500" /> Threshold ({threshold24h}mm)
          </span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              unit="mm"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#f8fafc',
              }}
            />
            <ReferenceLine
              y={threshold24h}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `24h Threshold (${threshold24h}mm)`,
                fill: '#ef4444',
                fontSize: 10,
                position: 'top',
              }}
            />
            <Bar dataKey="hourly" name="Hourly Rate" fill="#0284c7" opacity={0.8} radius={[2, 2, 0, 0]} />
            <Area
              type="monotone"
              dataKey="cum24"
              name="24h Cumulative"
              stroke={statusColor}
              strokeWidth={2}
              fill={statusColor}
              fillOpacity={0.15}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
