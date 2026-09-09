'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer as LeafletMapContainer, TileLayer, Polygon, Polyline, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import type { Zone, Road, Building, LandslideMarker, FieldReport } from '@/types';
import { RISK_COLORS, formatObservationType } from '@/lib/utils';
import StatusBadge from '@/components/common/StatusBadge';
import { Layers } from 'lucide-react';

// Fix leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const ROAD_COLORS: Record<string, string> = {
  NH: '#ef4444',
  SH: '#f97316',
  DISTRICT: '#eab308',
  LOCAL: '#94a3b8',
};

const landslideIcon = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#ef4444;border:2px solid #fff;border-radius:2px;transform:rotate(45deg);box-shadow:0 0 6px rgba(239,68,68,0.6)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const fieldReportIcon = L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;background:#3b82f6;border:2px solid #fff;border-radius:50%;box-shadow:0 0 6px rgba(59,130,246,0.6)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function FitBounds({ zones }: { zones: Zone[] }) {
  const map = useMap();
  useEffect(() => {
    if (zones.length > 0) {
      const allBounds = zones.flatMap(z => z.bounds);
      if (allBounds.length > 0) {
        map.fitBounds(allBounds as L.LatLngBoundsExpression, { padding: [30, 30] });
      }
    }
  }, [map, zones]);
  return null;
}

interface Props {
  zones: Zone[];
  roads: Road[];
  buildings: Building[];
  landslideMarkers: LandslideMarker[];
  fieldReports: FieldReport[];
  selectedZoneId: string | null;
  onZoneSelect: (zoneId: string) => void;
}

export default function MapInner({
  zones,
  roads,
  buildings,
  landslideMarkers,
  fieldReports,
  selectedZoneId,
  onZoneSelect,
}: Props) {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <LeafletMapContainer
      center={[11.555, 76.120]}
      zoom={12}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds zones={zones} />

      {/* Risk zone polygons */}
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.bounds as L.LatLngExpression[]}
          pathOptions={{
            color: RISK_COLORS[zone.riskCategory],
            fillColor: RISK_COLORS[zone.riskCategory],
            fillOpacity: selectedZoneId === zone.id ? 0.35 : 0.15,
            weight: selectedZoneId === zone.id ? 3 : 1.5,
            dashArray: selectedZoneId === zone.id ? undefined : '6 4',
          }}
          eventHandlers={{
            click: () => onZoneSelect(zone.id),
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="font-bold text-sm mb-1">{zone.name}</div>
              <div className="flex items-center gap-2 mb-1">
                <StatusBadge label={zone.riskCategory} variant={zone.riskCategory} />
                <span className="font-mono text-sm font-bold">{zone.riskScore}/100</span>
              </div>
              <div className="text-xs text-slate-300">{zone.description}</div>
              <div className="text-[10px] text-slate-400 mt-1">Click to view details</div>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Roads */}
      {roads.map((road) => (
        <Polyline
          key={road.id}
          positions={road.coordinates as L.LatLngExpression[]}
          pathOptions={{
            color: ROAD_COLORS[road.type] || '#94a3b8',
            weight: road.type === 'NH' ? 3 : road.type === 'SH' ? 2.5 : 2,
            opacity: 0.7,
          }}
        >
          <Popup>
            <div>
              <div className="font-bold text-xs">{road.name}</div>
              <div className="text-[10px] text-slate-400">{road.type} • Criticality: {road.criticality}</div>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* Buildings */}
      {buildings.map((bld) => (
        <CircleMarker
          key={bld.id}
          center={bld.location as L.LatLngExpression}
          radius={bld.isCritical ? 5 : 3}
          pathOptions={{
            color: bld.isCritical ? '#ef4444' : '#3b82f6',
            fillColor: bld.isCritical ? '#ef4444' : '#3b82f6',
            fillOpacity: 0.7,
            weight: 1,
          }}
        >
          <Popup>
            <div>
              <div className="font-bold text-xs">{bld.name}</div>
              <div className="text-[10px] text-slate-400">
                {bld.type}{bld.capacity ? ` • Cap: ${bld.capacity}` : ''}
                {bld.isCritical && ' • CRITICAL'}
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Historical landslide markers */}
      {landslideMarkers.map((ls) => (
        <Marker
          key={ls.id}
          position={ls.location as L.LatLngExpression}
          icon={landslideIcon}
        >
          <Popup>
            <div>
              <div className="font-bold text-xs">{ls.type} — {ls.date}</div>
              <div className="text-[10px] text-slate-300">{ls.description}</div>
              <div className="text-[10px] text-amber-400 mt-1">Historical Record</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Field report markers */}
      {fieldReports.map((fr) => (
        <Marker
          key={fr.id}
          position={fr.location as L.LatLngExpression}
          icon={fieldReportIcon}
        >
          <Popup>
            <div className="min-w-[160px]">
              <div className="font-bold text-xs">{formatObservationType(fr.observationType)}</div>
              <div className="flex gap-2 mt-1">
                <StatusBadge label={fr.severity} variant={fr.severity === 'CRITICAL' ? 'CRITICAL' : fr.severity === 'HIGH' ? 'HIGH' : 'WATCH'} />
                <StatusBadge label={fr.verificationStatus} variant={fr.verificationStatus} />
              </div>
              <div className="text-[10px] text-slate-300 mt-1">{fr.locationName}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Responsive Collapsible Legend */}
      <div className="leaflet-bottom leaflet-left pointer-events-auto">
        <div className="leaflet-control m-2 sm:m-3">
          <button
            type="button"
            onClick={() => setLegendOpen(!legendOpen)}
            className="sm:hidden px-2.5 py-1.5 rounded-lg bg-slate-900/95 border border-slate-700 text-[10px] font-bold text-slate-200 shadow-xl flex items-center gap-1.5"
          >
            <Layers size={12} className="text-amber-400" />
            <span>{legendOpen ? 'Hide Legend' : 'Legend'}</span>
          </button>

          <div
            className={`
              ${legendOpen ? 'block' : 'hidden sm:block'}
              bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg p-2.5 sm:p-3 mt-1.5 sm:mt-0 text-[10px] shadow-2xl max-w-[190px]
            `}
          >
            <div className="font-bold text-slate-200 mb-1.5 flex items-center justify-between">
              <span>Map Legend</span>
              {legendOpen && (
                <button
                  type="button"
                  onClick={() => setLegendOpen(false)}
                  className="sm:hidden text-slate-400 hover:text-slate-200 text-[10px] px-1"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              {(['NORMAL', 'WATCH', 'HIGH', 'CRITICAL'] as const).map(cat => (
                <div key={cat} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border shrink-0" style={{ backgroundColor: RISK_COLORS[cat], borderColor: RISK_COLORS[cat] }} />
                  <span className="text-slate-300">{cat} Risk</span>
                </div>
              ))}
              <div className="border-t border-slate-700 my-1" />
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-red-500 shrink-0" />
                <span className="text-slate-300">NH Road</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-orange-500 shrink-0" />
                <span className="text-slate-300">SH Road</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full border border-white shrink-0" />
                <span className="text-slate-300">Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rotate-45 border border-white shrink-0" />
                <span className="text-slate-300">Landslide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full border border-white shrink-0" />
                <span className="text-slate-300">Field Obs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeafletMapContainer>
  );
}
