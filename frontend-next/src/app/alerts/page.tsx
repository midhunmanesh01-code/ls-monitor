'use client';

import { useState, useEffect, useCallback } from 'react';
import AlertCard from '@/components/alerts/AlertCard';
import { getAlerts, updateAlertStatus, resetAlerts } from '@/services/alerts';
import type { Alert, AlertStatus } from '@/types';
import { Bell, AlertTriangle, ShieldCheck, RefreshCw, Filter, ShieldAlert } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    const data = await getAlerts();
    setAlerts([...data]);
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const handleStatusChange = async (
    alertId: string,
    newStatus: AlertStatus,
    actor: string,
    note?: string
  ) => {
    await updateAlertStatus(alertId, newStatus, actor, note);
    await loadAlerts();
    setStatusNotification(`Alert ${alertId.toUpperCase()} transitioned to ${newStatus}`);
    setTimeout(() => setStatusNotification(null), 4000);
  };

  const handleReset = () => {
    resetAlerts();
    loadAlerts();
    setStatusNotification('Demo alerts reset to initial baseline state.');
    setTimeout(() => setStatusNotification(null), 3000);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'ALL') return true;
    if (filter === 'DRAFT') return a.status === 'DRAFT';
    if (filter === 'AWAITING') return a.status === 'AWAITING_AUTHORIZATION';
    if (filter === 'AUTHORIZED') return a.status === 'AUTHORIZED';
    if (filter === 'ACTIVE')
      return (
        a.status === 'AUTHORIZED' ||
        a.status === 'ACKNOWLEDGED' ||
        a.status === 'UNDER_VERIFICATION'
      );
    if (filter === 'CLOSED') return a.status === 'CLOSED';
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-amber-400" />
            <h1 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wide">
              Early Warning & Protocol Authorization Management
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Multi-tier early warning dissemination protocol requiring executive officer verification before public transmission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> Reset Demo Alerts
          </button>
        </div>
      </div>

      {/* Authority Protocol Notice */}
      <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Statutory Chain of Command Enforcement:</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            AI risk triggers generate <strong>DRAFT</strong> alerts internally. Official early warning bulletins must be digitally signed and authorized by the District Collector or designated Incident Commander before dissemination to local emergency response units.
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {statusNotification && (
        <div className="p-3 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        {[
          { key: 'ALL', label: 'All Protocols' },
          { key: 'ACTIVE', label: 'Active Operational' },
          { key: 'DRAFT', label: 'System Drafts' },
          { key: 'AWAITING', label: 'Awaiting Auth' },
          { key: 'AUTHORIZED', label: 'Authorized' },
          { key: 'CLOSED', label: 'Archived / Closed' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all border
              ${
                filter === tab.key
                  ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="py-12 text-center text-xs text-slate-500 bg-slate-900/40 rounded-lg border border-slate-800">
            No alerts found matching filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
