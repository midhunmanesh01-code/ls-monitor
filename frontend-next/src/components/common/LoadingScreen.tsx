'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/common/Logo';

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hold loading screen for exactly 3 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center text-slate-100 transition-opacity duration-600 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Custom Landslide Monitor Logo */}
        <Logo size="lg" />

        {/* Clean Minimal Typography */}
        <div className="text-center space-y-1">
          <h1 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Landslide Monitor
          </h1>
          <p className="text-[11px] text-slate-500 font-mono">
            Wayanad Pilot
          </p>
        </div>

        {/* Sleek Minimal Buffering Spinner */}
        <div className="w-5 h-5 rounded-full border-2 border-slate-800 border-t-amber-500 animate-spin" />
      </div>
    </div>
  );
}
