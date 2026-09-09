'use client';

import { useState } from 'react';
import type { ObservationType, ReportSeverity } from '@/types';
import { submitFieldReport } from '@/services/fieldReports';
import { DEMO_ZONES } from '@/data/zones';
import {
  Send,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Layers,
  FileCheck,
} from 'lucide-react';

interface Props {
  isOffline: boolean;
  onReportSubmitted: () => void;
}

const OBSERVATION_TYPES: { type: ObservationType; label: string }[] = [
  { type: 'SEEPAGE', label: 'Water Seepage / Muddy Springs' },
  { type: 'GROUND_CRACK', label: 'Tension Ground Crack / Fissure' },
  { type: 'SLOPE_MOVEMENT', label: 'Active Slope Movement / Tree Tilt' },
  { type: 'ROCKFALL', label: 'Rockfall / Rolling Boulders' },
  { type: 'ROAD_BLOCKAGE', label: 'Road Blockage / Culvert Clog' },
  { type: 'DEBRIS_FLOW', label: 'Debris Flow / Mudflow Discharge' },
  { type: 'OTHER', label: 'Other Geotechnical Anomaly' },
];

export default function FieldReportForm({ isOffline, onReportSubmitted }: Props) {
  const [observationType, setObservationType] = useState<ObservationType>('SEEPAGE');
  const [severity, setSeverity] = useState<ReportSeverity>('HIGH');
  const [zoneId, setZoneId] = useState('zone-a');
  const [locationName, setLocationName] = useState('Meppadi-Chooralmala Hill Road km 14');
  const [coordinates, setCoordinates] = useState<[number, number]>([11.547, 76.145]);
  const [notes, setNotes] = useState('');
  const [submittedBy, setSubmittedBy] = useState('Field Officer (Taluk Duty)');
  const [photoCount, setPhotoCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSimulateGPS = () => {
    // Pick coordinates in Wayanad pilot area
    const zone = DEMO_ZONES.find((z) => z.id === zoneId) || DEMO_ZONES[0];
    const lat = zone.center[0] + (Math.random() - 0.5) * 0.01;
    const lng = zone.center[1] + (Math.random() - 0.5) * 0.01;
    setCoordinates([parseFloat(lat.toFixed(5)), parseFloat(lng.toFixed(5))]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);

    try {
      const photos = photoCount > 0 ? Array.from({ length: photoCount }, (_, i) => `/demo/photo-${i + 1}.jpg`) : [];

      await submitFieldReport({
        observationType,
        severity,
        location: coordinates,
        locationName: locationName || 'Wayanad pilot sector',
        notes: notes || 'Field inspection report submitted via mobile terminal.',
        photos,
        submittedBy: submittedBy || 'Field Officer',
        zoneId,
      });

      setSuccessMessage(
        isOffline
          ? 'Observation recorded to OFFLINE LOCAL QUEUE. Marked as PENDING sync.'
          : 'Observation submitted successfully. Status: UNVERIFIED (Awaiting Authority Confirmation).'
      );

      setNotes('');
      onReportSubmitted();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Submit Field Ground Observation
          </h3>
        </div>
        <span className="text-[10px] text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/50">
          Initial Status: UNVERIFIED
        </span>
      </div>

      {successMessage && (
        <div className="p-3 rounded bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Observation Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Layers size={13} className="text-sky-400" /> Observation Type
        </label>
        <select
          value={observationType}
          onChange={(e) => setObservationType(e.target.value as ObservationType)}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
        >
          {OBSERVATION_TYPES.map((t) => (
            <option key={t.type} value={t.type}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Severity Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <AlertTriangle size={13} className="text-amber-400" /> Observed Severity
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map((sev) => (
            <button
              type="button"
              key={sev}
              onClick={() => setSeverity(sev)}
              className={`
                py-2 px-2 rounded text-xs font-bold transition-all border text-center
                ${
                  severity === sev
                    ? sev === 'CRITICAL'
                      ? 'bg-red-600 text-slate-950 border-red-500 shadow-sm'
                      : sev === 'HIGH'
                      ? 'bg-orange-600 text-slate-950 border-orange-500 shadow-sm'
                      : sev === 'MEDIUM'
                      ? 'bg-amber-600 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-emerald-600 text-slate-950 border-emerald-500 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Pilot Zone selection */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Target Pilot Zone</label>
        <select
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
        >
          {DEMO_ZONES.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name} ({z.riskCategory} Risk)
            </option>
          ))}
        </select>
      </div>

      {/* Location Name & GPS */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex flex-wrap items-center justify-between gap-1">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-red-400" /> Ground Location & GPS Fix
          </span>
          <button
            type="button"
            onClick={handleSimulateGPS}
            className="text-[10px] text-amber-400 hover:text-amber-300 underline font-mono"
          >
            Acquire GPS Fix
          </button>
        </label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="e.g. Meppadi Hairpin Bend #2, Near Bridge Culvert"
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          required
        />
        <div className="p-2 rounded bg-slate-950/70 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-1">
          <span>Lat: {coordinates[0]}° N</span>
          <span>Lng: {coordinates[1]}° E</span>
          <span className="text-emerald-400 font-bold">Accuracy: ±3.2m</span>
        </div>
      </div>

      {/* Photos Attachment Simulation */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Camera size={13} className="text-indigo-400" /> Evidence Photos
          </span>
          <span className="text-[10px] text-slate-400 font-mono">{photoCount} attached</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPhotoCount((p) => Math.min(4, p + 1))}
            className="flex-1 py-2 px-3 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300 hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5"
          >
            <Camera size={13} /> Add Photo ({photoCount}/4)
          </button>
          {photoCount > 0 && (
            <button
              type="button"
              onClick={() => setPhotoCount(0)}
              className="py-2 px-3 rounded bg-slate-950 border border-slate-800 text-xs text-red-400 hover:bg-slate-900"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Field Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Geotechnical Observations & Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Describe physical signs: water turbidity, crack width/depth, rate of displacement, road shoulder degradation..."
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          required
        />
      </div>

      {/* Submitter Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Reporting Officer / Tag</label>
        <input
          type="text"
          value={submittedBy}
          onChange={(e) => setSubmittedBy(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className={`
          w-full py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg min-h-[44px]
          ${
            isOffline
              ? 'bg-amber-600 hover:bg-amber-500 text-slate-950'
              : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
          }
        `}
      >
        <Send size={14} />
        {submitting
          ? 'Saving Report...'
          : isOffline
          ? 'Save to Local Offline Queue'
          : 'Transmit Field Report to Control Room'}
      </button>

      <div className="text-[10px] text-slate-500 text-center">
        Note: Citizen and field observations do NOT trigger automated official alarms without magistrate / geologist verification.
      </div>
    </form>
  );
}
