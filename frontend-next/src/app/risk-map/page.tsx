'use client';

import { useState, useEffect } from 'react';
import DynamicMap from '@/components/map/DynamicMap';
import RiskPanel from '@/components/risk/RiskPanel';
import StatusBadge from '@/components/common/StatusBadge';
import { getZones } from '@/services/zones';
import { getFieldReports } from '@/services/fieldReports';
import { DEMO_ROADS, DEMO_BUILDINGS, DEMO_LANDSLIDE_MARKERS } from '@/data/infrastructure';
import type { Zone, FieldReport } from '@/types';
import { Layers, Map as MapIcon, Sliders, Info, ShieldAlert } from 'lucide-react';

export default function RiskMapPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>('zone-c');
  const [showRoads, setShowRoads] = useState(true);
  const [showBuildings, setShowBuildings] = useState(true);
  const [showLandslides, setShowLandslides] = useState(true);
  const [showFieldReports, setShowFieldReports] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    async function load() {
      const [z, r] = await Promise.all([getZones(), getFieldReports()]);
      setZones(z);
      setReports(r);
    }
    load();
  }, []);

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-29px)] overflow-hidden bg-slate-950">
      {/* Header bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <MapIcon className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Geographic Information System (GIS) Hazard Map
          </h2>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-400 font-mono">
            Spatial Susceptibility & Infrastructure Overlay
          </span>
        </div>

        {/* Quick Layer Filter Toggles */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowRoads(!showRoads)}
            className={`px-2 py-1 rounded border text-[11px] transition-colors ${
              showRoads ? 'bg-slate-800 border-amber-500/60 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            Roads
          </button>
          <button
            onClick={() => setShowBuildings(!showBuildings)}
            className={`px-2 py-1 rounded border text-[11px] transition-colors ${
              showBuildings ? 'bg-slate-800 border-sky-500/60 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            Structures
          </button>
          <button
            onClick={() => setShowLandslides(!showLandslides)}
            className={`px-2 py-1 rounded border text-[11px] transition-colors ${
              showLandslides ? 'bg-slate-800 border-red-500/60 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            Historical Incidents
          </button>
          <button
            onClick={() => setShowFieldReports(!showFieldReports)}
            className={`px-2 py-1 rounded border text-[11px] transition-colors ${
              showFieldReports ? 'bg-slate-800 border-emerald-500/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            Field Intel
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 relative flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Sector Directory (Collapsible) */}
        <div
          className={`
            bg-slate-950/90 border-r border-slate-800 flex flex-col shrink-0 transition-all z-20
            ${sidebarCollapsed ? 'w-10' : 'w-72'}
          `}
        >
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed && (
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers size={13} className="text-amber-400" /> Monitored Sectors
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              title="Toggle list"
            >
              <Sliders size={14} />
            </button>
          </div>

          {!sidebarCollapsed && (
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`
                      w-full text-left p-2.5 rounded-lg border transition-all
                      ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-slate-100 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{zone.name}</span>
                      <StatusBadge label={zone.riskCategory} variant={zone.riskCategory} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Score: {zone.riskScore}/100</span>
                      <span>{zone.elevation}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative min-h-[350px] h-full">
          <DynamicMap
            zones={zones}
            roads={showRoads ? DEMO_ROADS : []}
            buildings={showBuildings ? DEMO_BUILDINGS : []}
            landslideMarkers={showLandslides ? DEMO_LANDSLIDE_MARKERS : []}
            fieldReports={showFieldReports ? reports : []}
            selectedZoneId={selectedZoneId}
            onZoneSelect={(id) => setSelectedZoneId(id)}
          />
        </div>

        {/* Selected Zone Inspector */}
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
