'use client';

import { useId } from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, ''); // unique prefix for SVG IDs

  const sizeMap = {
    xs: { box: 'w-6 h-6', text: 'text-xs', sub: 'text-[8px]' },
    sm: { box: 'w-8 h-8', text: 'text-xs', sub: 'text-[9px]' },
    md: { box: 'w-9 h-9', text: 'text-sm', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12', text: 'text-base', sub: 'text-xs' },
    xl: { box: 'w-16 h-16', text: 'text-lg', sub: 'text-xs' },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* SVG Icon Emblem */}
      <div className={`${s.box} shrink-0 relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bg_${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id={`left_${uid}`} x1="20" y1="35" x2="60" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id={`main_${uid}`} x1="35" y1="20" x2="65" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id={`shadow_${uid}`} x1="65" y1="20" x2="85" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Squircle Badge Base */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill={`url(#bg_${uid})`}
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />

          {/* Background Mountain */}
          <polygon points="18,75 42,35 66,75" fill={`url(#left_${uid})`} opacity="0.9" />

          {/* Main Mountain - Left Lit Facet */}
          <polygon points="34,75 62,20 62,75" fill={`url(#main_${uid})`} />

          {/* Main Mountain - Right Shadow Facet */}
          <polygon points="62,20 86,75 62,75" fill={`url(#shadow_${uid})`} />

          {/* Landslide Scar / Slope Fracture Line */}
          <path
            d="M 62 20 L 52 46 L 62 58 L 48 75"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ground Level Horizon */}
          <line x1="14" y1="75" x2="86" y2="75" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

          {/* Early Warning Signal Radar Waves at Peak */}
          <circle cx="62" cy="20" r="4.5" fill="#10b981" />
          <circle cx="62" cy="20" r="8.5" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.75" />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className="min-w-0 flex flex-col justify-center">
          <div className={`${s.text} font-bold text-slate-100 tracking-wide leading-tight truncate`}>
            Landslide Monitor
          </div>
          <div className={`${s.sub} font-semibold text-amber-400 uppercase tracking-widest font-mono truncate`}>
            Wayanad Pilot
          </div>
        </div>
      )}
    </div>
  );
}
