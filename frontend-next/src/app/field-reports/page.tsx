'use client';

import { useState, useEffect, useCallback } from 'react';
import FieldReportCard from '@/components/field/FieldReportCard';
import FieldReportForm from '@/components/field/FieldReportForm';
import SyncQueue from '@/components/field/SyncQueue';
import OfflineIndicator from '@/components/field/OfflineIndicator';
import { useOffline } from '@/hooks/useOffline';
import { useSyncQueue } from '@/hooks/useSyncQueue';
import { verifyReport, resetFieldReports } from '@/services/fieldReports';
import type { FieldReport, VerificationStatus } from '@/types';
import { FileText, PlusCircle, ListFilter, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

export default function FieldReportsPage() {
  const { isOffline, toggleOffline } = useOffline();
  const { reports, isSyncing, triggerSync, refreshReports } = useSyncQueue();

  const [activeTab, setActiveTab] = useState<'FEED' | 'SUBMIT'>('FEED');
  const [verificationFilter, setVerificationFilter] = useState<string>('ALL');
  const [notification, setNotification] = useState<string | null>(null);

  const handleVerify = async (
    reportId: string,
    status: VerificationStatus,
    verifier: string,
    notes?: string
  ) => {
    await verifyReport(reportId, status, verifier, notes);
    await refreshReports();
    setNotification(`Report ${reportId.toUpperCase()} updated to ${status}`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReset = () => {
    resetFieldReports();
    refreshReports();
    setNotification('Field observation log restored to initial baseline.');
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredReports = reports.filter((r) => {
    if (verificationFilter === 'ALL') return true;
    if (verificationFilter === 'UNVERIFIED') return r.verificationStatus === 'UNVERIFIED';
    if (verificationFilter === 'UNDER_REVIEW') return r.verificationStatus === 'UNDER_REVIEW';
    if (verificationFilter === 'VERIFIED') return r.verificationStatus === 'VERIFIED';
    if (verificationFilter === 'REJECTED') return r.verificationStatus === 'REJECTED';
    return true;
  });

  const unverifiedCount = reports.filter((r) => r.verificationStatus === 'UNVERIFIED').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-sky-400" />
            <h1 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wide">
              Field Observations & Ground Verification Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Ground-truthed geological observations, slope movement indicators, and offline-first field synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={12} /> Reset Baseline
          </button>
        </div>
      </div>

      {/* Offline Simulator Switch Banner */}
      <OfflineIndicator isOffline={isOffline} onToggle={toggleOffline} />

      {/* Unverified Intel Caution Box */}
      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-200">Verification Protocol Required:</span>
          <p className="text-[11px] text-slate-400">
            Unverified submissions are quarantined from automated alarms. Only geological officers can upgrade an observation to <strong>VERIFIED</strong>.
          </p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-3 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
          <span>{notification}</span>
        </div>
      )}

      {/* Main Tabs (Feed vs Submit Form) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('FEED')}
            className={`
              flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5
              ${
                activeTab === 'FEED'
                  ? 'bg-slate-800 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }
            `}
          >
            <ListFilter size={14} /> Intel Feed ({reports.length})
            {unverifiedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px]">
                {unverifiedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('SUBMIT')}
            className={`
              flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5
              ${
                activeTab === 'SUBMIT'
                  ? 'bg-slate-800 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }
            `}
          >
            <PlusCircle size={14} /> Submit Obs.
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'SUBMIT' ? (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-200">
          <FieldReportForm
            isOffline={isOffline}
            onReportSubmitted={() => {
              refreshReports();
              setActiveTab('FEED');
            }}
          />
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Filters for Feed */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold shrink-0">
              Filter:
            </span>
            {[
              { key: 'ALL', label: 'All Observations' },
              { key: 'UNVERIFIED', label: 'Unverified (Pending)' },
              { key: 'UNDER_REVIEW', label: 'Under Review' },
              { key: 'VERIFIED', label: 'Verified' },
              { key: 'REJECTED', label: 'Rejected' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setVerificationFilter(tab.key)}
                className={`
                  px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all border whitespace-nowrap
                  ${
                    verificationFilter === tab.key
                      ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map((report) => (
              <FieldReportCard
                key={report.id}
                report={report}
                onVerify={handleVerify}
              />
            ))}
          </div>

          {/* Offline Sync Queue Manager Component */}
          <div className="pt-4">
            <SyncQueue
              reports={reports}
              isSyncing={isSyncing}
              onSyncAll={triggerSync}
              isOffline={isOffline}
            />
          </div>
        </div>
      )}
    </div>
  );
}
