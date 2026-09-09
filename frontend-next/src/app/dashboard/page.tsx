'use client';

import { useState, useEffect } from 'react';
import DynamicMap from '@/components/map/DynamicMap';
import RiskPanel from '@/components/risk/RiskPanel';
import StatusBadge from '@/components/common/StatusBadge';
import { getZones } from '@/services/zones';
import { getAlerts } from '@/services/alerts';
import { getFieldReports } from '@/services/fieldReports';
import { DEMO_ROADS, DEMO_BUILDINGS, DEMO_LANDSLIDE_MARKERS } from '@/data/infrastructure';
import type { Zone, Alert, FieldReport } from '@/types';
import {
  ShieldAlert,
  Bell,
  FileText,
  CloudRain,
  Radio,
  Layers,
  Activity,
  Maximize2,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>('zone-a');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [z, a, r] = await Promise.all([
        getZones(),
        getAlerts(),
        getFieldReports(),
      ]);
      setZones(z);
      setAlerts(a);
      setReports(r);
      setLoading(false);
    }
    loadData();
  }, []);

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || null;

  const criticalOrHighCount = zones.filter(
    (z) => z.riskCategory === 'CRITICAL' || z.riskCategory === 'HIGH'
  ).length;

  const activeAlertsCount = alerts.filter(
    (a) => a.status === 'AUTHORIZED' || a.status === 'AWAITING_AUTHORIZATION'
  ).length;

  const pendingReportsCount = reports.filter(
    (r) => r.verificationStatus === 'UNVERIFIED'
  ).length;

  return (
    <div className="flex flex-col h-[calc(100vh-29px)] overflow-hidden bg-slate-950">
      {/* Top Operations KPI Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              DEOC Wayanad Command Centre
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Pilot: Meppadi &bull; Vythiri &bull; Mundakkai Sectors
          </span>
        </div>

        {/* Metric Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Critical / High Risk Zones */}
          <Link
            href="/risk-map"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/60 hover:bg-red-950/70 transition-colors text-xs"
          >
            <ShieldAlert size={13} className="text-red-400" />
            <span className="text-slate-300 font-medium">Critical/High:</span>
            <strong className="text-red-400 font-mono">{criticalOrHighCount}</strong>
          </Link>

          {/* Active Warnings */}
          <Link
            href="/alerts"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800/60 hover:bg-amber-950/70 transition-colors text-xs"
          >
            <Bell size={13} className="text-amber-400" />
            <span className="text-slate-300 font-medium">Active Alerts:</span>
            <strong className="text-amber-400 font-mono">{activeAlertsCount}</strong>
          </Link>

          {/* Pending Field Observations */}
          <Link
            href="/field-reports"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/40 border border-sky-800/60 hover:bg-sky-950/70 transition-colors text-xs"
          >
            <FileText size={13} className="text-sky-400" />
            <span className="text-slate-300 font-medium">Unverified Intel:</span>
            <strong className="text-sky-400 font-mono">{pendingReportsCount}</strong>
          </Link>

          {/* Telemetry status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Radio size={12} className="text-emerald-400" />
            <span>Telemetry: 100% Operational</span>
          </div>
        </div>
      </div>

      {/* Main Command Workspace */}
      <div className="flex-1 relative flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Interactive GIS Map Container */}
        <div className="flex-1 relative min-h-[350px] h-full">
          {/* Quick Zone Switcher Bar */}
          <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-slate-950/90 backdrop-blur p-1.5 rounded-lg border border-slate-800 shadow-xl max-w-[calc(100%-24px)]">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 px-1.5">
              Sector:
            </span>
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZoneId(z.id)}
                className={`
                  px-2.5 py-1 rounded text-xs font-semibold transition-all border
                  ${
                    selectedZoneId === z.id
                      ? 'bg-amber-600 text-slate-950 border-amber-500 shadow-md font-bold'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                  }
                `}
              >
                {z.name.split('–')[0]}
              </button>
            ))}
          </div>

          {/* Dynamic Map Component */}
          <DynamicMap
            zones={zones}
            roads={DEMO_ROADS}
            buildings={DEMO_BUILDINGS}
            landslideMarkers={DEMO_LANDSLIDE_MARKERS}
            fieldReports={reports}
            selectedZoneId={selectedZoneId}
            onZoneSelect={(id) => setSelectedZoneId(id)}
          />
        </div>

        {/* Right-Side Floating / Docked Risk Panel */}
        {selectedZone && (
          <div className="shrink-0 h-full overflow-hidden">
            <RiskPanel
              zone={selectedZone}
              onClose={() => setSelectedZoneId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
