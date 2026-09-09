'use client';

import type { ExposureData } from '@/types';
import { Users, Building2, Route, ShieldAlert } from 'lucide-react';

interface Props {
  exposure: ExposureData;
}

export default function ExposurePanel({ exposure }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Vulnerability & Exposure
        </h4>
        <span className="text-[10px] text-amber-400/80 font-mono">
          Hazard ≠ Exposure
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
            <Users size={12} className="text-sky-400" />
            <span>Population</span>
          </div>
          <span className="text-sm font-bold font-mono text-slate-100">
            {exposure.population.toLocaleString()}
          </span>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
            <Building2 size={12} className="text-indigo-400" />
            <span>Structures</span>
          </div>
          <span className="text-sm font-bold font-mono text-slate-100">
            {exposure.buildings.toLocaleString()}
          </span>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
            <Route size={12} className="text-amber-400" />
            <span>Roads (km)</span>
          </div>
          <span className="text-sm font-bold font-mono text-slate-100">
            {exposure.roadsKm} km
          </span>
        </div>
      </div>

      <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 mb-2">
          <ShieldAlert size={13} className="text-red-400" />
          <span>Critical Assets & Facilities</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {exposure.criticalFacilities.map((facility, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
