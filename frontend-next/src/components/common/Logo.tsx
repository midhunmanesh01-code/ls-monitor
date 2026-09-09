'use client';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const sizeMap = {
    xs: { box: 'w-6 h-6', text: 'text-xs', sub: 'text-[8px]' },
    sm: { box: 'w-8 h-8', text: 'text-xs', sub: 'text-[9px]' },
    md: { box: 'w-9 h-9', text: 'text-sm', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12', text: 'text-base', sub: 'text-xs' },
    xl: { box: 'w-16 h-16', text: 'text-lg', sub: 'text-xs' },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Icon Emblem */}
      <div className={`${s.box} shrink-0 relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background container gradient */}
            <linearGradient id="lsBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            {/* Main Peak Sunlit Face */}
            <linearGradient id="lsMainPeakLit" x1="30%" y1="10%" x2="70%" y2="90%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Main Peak Shadow Face */}
            <linearGradient id="lsMainPeakShadow" x1="60%" y1="20%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Back Mountain Ridge */}
            <linearGradient id="lsBackRidge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="lsGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Squircle Badge Base */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#lsBgGrad)"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />

          {/* Subtle Elevation Contour Curves */}
          <path
            d="M 12 76 Q 50 64 88 76"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
          />

          {/* Secondary Background Mountain */}
          <path
            d="M 16 75 L 42 34 L 64 75 Z"
            fill="url(#lsBackRidge)"
          />

          {/* Primary Landslide / Escarpment Peak - Lit Face */}
          <path
            d="M 32 75 L 64 18 L 64 75 Z"
            fill="url(#lsMainPeakLit)"
          />

          {/* Primary Peak - Shadow Face */}
          <path
            d="M 64 18 L 86 75 L 64 75 Z"
            fill="url(#lsMainPeakShadow)"
          />

          {/* Dynamic Geotechnical Instability / Pulse Sensor Wave */}
          <path
            d="M 22 62 L 38 62 L 46 50 L 54 68 L 62 54 L 78 54"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lsGlow)"
          />
          <path
            d="M 22 62 L 38 62 L 46 50 L 54 68 L 62 54 L 78 54"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Early Warning Signal Apex Beacon */}
          <circle cx="64" cy="18" r="4" fill="#10b981" />
          <circle cx="64" cy="18" r="7" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
      </div>

      {/* Optional Typography Lockup */}
      {showText && (
        <div className="min-w-0">
          <div className={`${s.text} font-bold text-slate-100 tracking-wide leading-tight truncate`}>
            Landslide Monitor
          </div>
          <div className={`${s.sub} font-medium text-amber-400/90 uppercase tracking-widest font-mono truncate`}>
            Wayanad Pilot
          </div>
        </div>
      )}
    </div>
  );
}
