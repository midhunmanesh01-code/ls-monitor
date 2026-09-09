'use client';

interface Props {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({ value, max = 100, label, showValue = true, color, size = 'sm' }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const barColor = color || (
    pct >= 80 ? 'bg-red-500' :
    pct >= 60 ? 'bg-orange-500' :
    pct >= 35 ? 'bg-amber-500' :
    'bg-emerald-500'
  );

  const h = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-[11px] text-slate-400">{label}</span>}
          {showValue && <span className="text-[11px] font-mono text-slate-300">{value}/{max}</span>}
        </div>
      )}
      <div className={`w-full ${h} bg-slate-700 rounded-full overflow-hidden`}>
        <div
          className={`${h} ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
