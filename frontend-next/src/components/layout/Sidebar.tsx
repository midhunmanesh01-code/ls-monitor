'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  CloudRain,
  FileText,
  Bell,
  ListOrdered,
  History,
  Menu,
  X,
  Mountain,
  Radio,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/risk-map', label: 'Risk Map', icon: Map },
  { href: '/rainfall', label: 'Rainfall & Triggers', icon: CloudRain },
  { href: '/field-reports', label: 'Field Reports', icon: FileText },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/response-priority', label: 'Response Priority', icon: ListOrdered },
  { href: '/historical', label: 'Historical Replay', icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-slate-800 text-slate-200 border border-slate-700"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-800 z-40
          flex flex-col transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-600/40 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-100 tracking-wide">
                Landslide Monitor
              </h1>
              <span className="text-[10px] font-medium text-amber-500/80 uppercase tracking-widest">
                Wayanad Pilot
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium
                    transition-colors duration-100
                    ${
                      isActive
                        ? 'bg-slate-800/80 text-amber-400 border-l-2 border-amber-500'
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom — Demo Mode */}
        <div className="px-3 py-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-amber-950/40 border border-amber-800/30">
            <Radio size={12} className="text-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
              Demo Mode
            </span>
          </div>
          <div className="px-2 text-[10px] text-slate-500">
            Simulated data for demonstration.
            <br />
            Not connected to live sources.
          </div>
        </div>
      </aside>
    </>
  );
}
