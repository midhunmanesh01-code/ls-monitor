'use client';

import { useState } from 'react';
import type { FieldReport, VerificationStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import { formatObservationType, formatTimestamp, getTimeAgo } from '@/lib/utils';
import {
  MapPin,
  Camera,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  AlertTriangle,
  UploadCloud,
} from 'lucide-react';

interface Props {
  report: FieldReport;
  onVerify: (reportId: string, status: VerificationStatus, verifier: string, notes?: string) => void;
}

export default function FieldReportCard({ report, onVerify }: Props) {
  const [reviewNote, setReviewNote] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(false);

  const handleVerify = (status: VerificationStatus) => {
    onVerify(
      report.id,
      status,
      'Geologist / Executive Magistrate, Wayanad',
      reviewNote || undefined
    );
    setShowReviewInput(false);
  };

  const isCritical = report.severity === 'CRITICAL';
  const isHigh = report.severity === 'HIGH';

  return (
    <div
      className={`
        rounded-lg bg-slate-900/80 border p-4 space-y-3 transition-all
        ${
          report.verificationStatus === 'UNVERIFIED'
            ? 'border-amber-600/40'
            : report.verificationStatus === 'VERIFIED'
            ? 'border-emerald-600/40'
            : 'border-slate-800'
        }
      `}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-400">
            {report.id.toUpperCase()}
          </span>
          <span className="text-slate-600">•</span>
          <h4 className="text-xs font-bold text-slate-100">
            {formatObservationType(report.observationType)}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge label={report.severity} variant={report.severity} size="sm" />
          <StatusBadge label={report.verificationStatus} variant={report.verificationStatus} size="sm" />
          <StatusBadge label={report.syncStatus} variant={report.syncStatus} size="sm" />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1.5 text-xs text-slate-300">
        <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span>{report.locationName}</span>
          <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
            GPS: [{report.location[0].toFixed(4)}° N, {report.location[1].toFixed(4)}° E]
          </span>
        </div>
      </div>

      {/* Notes */}
      <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-800/80 leading-relaxed">
        {report.notes}
      </p>

      {/* Photos badge if any */}
      {report.photos && report.photos.length > 0 && (
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Camera size={13} className="text-sky-400" />
          <span>{report.photos.length} geotagged photo(s) attached</span>
        </div>
      )}

      {/* Verification details if already verified */}
      {report.verifiedBy && (
        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] space-y-0.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <UserCheck size={12} />
            <span>Verified by {report.verifiedBy}</span>
          </div>
          {report.reviewNotes && (
            <p className="text-slate-300 text-[10px] pl-4">{report.reviewNotes}</p>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-800">
        <span>Reported by: <strong className="text-slate-400">{report.submittedBy}</strong></span>
        <span className="font-mono">{getTimeAgo(report.timestamp)}</span>
      </div>

      {/* Verification Action Bar (For unverified/under review reports) */}
      {(report.verificationStatus === 'UNVERIFIED' || report.verificationStatus === 'UNDER_REVIEW') && (
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          {!showReviewInput ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                <AlertTriangle size={11} className="shrink-0" /> Authority Review Required
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleVerify('VERIFIED')}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-emerald-600 text-slate-950 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <CheckCircle size={12} /> Verify
                </button>
                <button
                  onClick={() => setShowReviewInput(true)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  Add Note
                </button>
                <button
                  onClick={() => handleVerify('REJECTED')}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-red-950 text-red-400 hover:bg-red-900 transition-colors border border-red-800"
                >
                  <XCircle size={12} /> Reject
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 p-2 rounded bg-slate-950 border border-slate-800">
              <input
                type="text"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Enter geological verification notes or ground confirmation..."
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReviewInput(false)}
                  className="px-2 py-1 rounded text-[11px] text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleVerify('VERIFIED')}
                  className="px-3 py-1 rounded text-xs font-bold bg-emerald-600 text-slate-950 hover:bg-emerald-500"
                >
                  Confirm & Mark Verified
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
