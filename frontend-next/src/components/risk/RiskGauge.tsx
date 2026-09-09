'use client';

import { RISK_COLORS, getRiskCategoryFromScore } from '@/lib/utils';

interface Props {
  score: number;
  size?: number;
}

export default function RiskGauge({ score, size = 110 }: Props) {
  const category = getRiskCategoryFromScore(score);
  const color = RISK_COLORS[category];
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Semicircle / 270 deg or standard full circle progress
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#334155"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black font-mono tracking-tight text-slate-100 leading-none">
          {score}
        </span>
        <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5" style={{ color }}>
          {category}
        </span>
      </div>
    </div>
  );
}
