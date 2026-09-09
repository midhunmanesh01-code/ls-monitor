'use client';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-800/80 ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// ==========================================
// Dashboard Page Skeleton
// ==========================================
export function DashboardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950 animate-in fade-in duration-200">
      {/* Top Operations KPI Bar Skeleton */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full bg-emerald-600/40" />
          <Skeleton className="w-48 h-4" />
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <Skeleton className="w-28 h-6 rounded" />
          <Skeleton className="w-24 h-6 rounded" />
          <Skeleton className="w-28 h-6 rounded" />
        </div>
      </div>

      {/* Main Workspace Skeleton */}
      <div className="flex-1 relative flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Map Placeholder */}
        <div className="flex-1 relative min-h-0 bg-slate-900/40 flex flex-col items-center justify-center p-4">
          {/* Top Sector bar skeleton */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-16 h-5 rounded" />
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping" />
              <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <Skeleton className="w-44 h-4 mx-auto" />
              <Skeleton className="w-60 h-3 mx-auto" />
            </div>
          </div>
        </div>

        {/* Right Risk Panel Skeleton */}
        <div className="hidden md:flex w-[420px] bg-slate-950/95 border-l border-slate-800 flex-col h-full p-4 space-y-4 shrink-0">
          <div className="space-y-2 border-b border-slate-800 pb-3">
            <div className="flex justify-between items-center">
              <Skeleton className="w-36 h-5" />
              <Skeleton className="w-16 h-5 rounded-full" />
            </div>
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-3/4 h-3" />
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>

          <div className="space-y-2.5">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// GIS Map Page Skeleton
// ==========================================
export function RiskMapSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950 animate-in fade-in duration-200">
      {/* Header bar skeleton */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <Skeleton className="w-64 h-4" />
        <div className="flex gap-1.5">
          <Skeleton className="w-14 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="hidden md:flex w-72 bg-slate-950/90 border-r border-slate-800 flex-col p-3 space-y-2 shrink-0">
          <Skeleton className="w-32 h-4 mb-2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-14 rounded-lg" />
          ))}
        </div>

        <div className="flex-1 bg-slate-900/40 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-amber-500 animate-spin mx-auto" />
            <Skeleton className="w-40 h-3 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Rainfall Page Skeleton
// ==========================================
export function RainfallSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-96 max-w-full h-3" />
        </div>
        <Skeleton className="w-40 h-8 rounded-lg" />
      </div>

      {/* Sector tabs skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-24 h-8 rounded-lg shrink-0" />
        ))}
      </div>

      {/* Threshold Status Cards Skeleton */}
      <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-20 h-5 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="w-full h-24 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="w-full h-72 sm:h-80 bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
        <div className="flex justify-between">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-end justify-between gap-2 h-48 px-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${20 + (i * 13) % 75}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Field Reports Page Skeleton
// ==========================================
export function FieldReportsSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <Skeleton className="w-72 h-6" />
          <Skeleton className="w-96 max-w-full h-3" />
        </div>
        <Skeleton className="w-28 h-8 rounded-lg" />
      </div>

      {/* Offline banner skeleton */}
      <Skeleton className="w-full h-12 rounded-lg" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <Skeleton className="w-36 h-9 rounded-lg" />
        <Skeleton className="w-36 h-9 rounded-lg" />
      </div>

      {/* Filter chips skeleton */}
      <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-7 rounded-lg shrink-0" />
        ))}
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="w-32 h-4" />
              <div className="flex gap-1">
                <Skeleton className="w-14 h-4 rounded" />
                <Skeleton className="w-16 h-4 rounded" />
              </div>
            </div>
            <Skeleton className="w-48 h-3" />
            <Skeleton className="w-full h-12 rounded" />
            <div className="flex justify-between pt-2 border-t border-slate-800">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-16 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Alerts Page Skeleton
// ==========================================
export function AlertsSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <Skeleton className="w-72 h-6" />
          <Skeleton className="w-96 max-w-full h-3" />
        </div>
        <Skeleton className="w-28 h-8 rounded-lg" />
      </div>

      <Skeleton className="w-full h-14 rounded-lg" />

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-7 rounded-lg shrink-0" />
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="w-40 h-4" />
              <div className="flex gap-2">
                <Skeleton className="w-16 h-5 rounded" />
                <Skeleton className="w-20 h-5 rounded" />
              </div>
            </div>
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Response Priority Page Skeleton
// ==========================================
export function ResponsePrioritySkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <Skeleton className="w-80 h-6" />
          <Skeleton className="w-96 max-w-full h-3" />
        </div>
        <Skeleton className="w-32 h-6 rounded" />
      </div>

      {/* Tri-factor Banner */}
      <Skeleton className="w-full h-24 rounded-lg" />

      {/* Priority Cards */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="w-36 h-4" />
                <Skeleton className="w-48 h-3" />
              </div>
            </div>
            <Skeleton className="w-16 h-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Historical Replay Skeleton
// ==========================================
export function HistoricalReplaySkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <Skeleton className="w-72 h-6" />
          <Skeleton className="w-96 max-w-full h-3" />
        </div>
        <Skeleton className="w-48 h-7 rounded" />
      </div>

      <Skeleton className="w-full h-20 rounded-lg" />
      <Skeleton className="w-full h-32 rounded-lg" />
      <Skeleton className="w-full h-28 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
    </div>
  );
}
