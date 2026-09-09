'use client';

import dynamic from 'next/dynamic';
import type { Zone, Road, Building, LandslideMarker, FieldReport } from '@/types';
import { Loader2 } from 'lucide-react';

interface Props {
  zones: Zone[];
  roads: Road[];
  buildings: Building[];
  landslideMarkers: LandslideMarker[];
  fieldReports: FieldReport[];
  selectedZoneId: string | null;
  onZoneSelect: (zoneId: string) => void;
}

const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-slate-900 border border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      <div className="text-sm font-medium">Initializing GIS Map Engine...</div>
      <div className="text-xs text-slate-500">Loading terrain coordinates and vector layers</div>
    </div>
  ),
});

export default function DynamicMap(props: Props) {
  return <MapInner {...props} />;
}
