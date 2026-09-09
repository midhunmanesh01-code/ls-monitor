'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/common/Logo';
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
      {/* Mobile Top Header Bar */}
      <header className="lg:hidden shrink-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-3 py-2.5 flex items-center justify-between z-30">
        <Link href="/dashboard" className="flex items-center">
          <Logo size="sm" showText={true} />
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-800/40 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold hidden xs:inline">LIVE</span>
          </div>

          <button
            className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar (Drawer on mobile, static on desktop) */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 z-50
          flex flex-col transition-transform duration-200 ease-out shadow-2xl
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:w-64 lg:shadow-none
        `}
      >
        {/* Logo / Drawer Header */}
        <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Logo size="md" showText={true} />
          </Link>

          {/* Close button inside mobile drawer */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2.5 overflow-y-auto">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium
                    transition-colors duration-100
                    ${
                      isActive
                        ? 'bg-amber-600/15 text-amber-400 border-l-2 border-amber-500 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom — Operational Station Status */}
        <div className="px-3 py-4 border-t border-slate-800 space-y-2 bg-slate-950/80">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-emerald-950/40 border border-emerald-800/30">
            <Radio size={12} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Operational Status
            </span>
          </div>
          <div className="px-2 text-[10px] text-slate-400 font-mono space-y-0.5">
            <div>DEOC Wayanad Station</div>
            <div className="text-slate-500 text-[9px]">IMD &bull; GSI &bull; SDMA Feeds Active</div>
          </div>
        </div>
      </aside>
    </>
  );
}
