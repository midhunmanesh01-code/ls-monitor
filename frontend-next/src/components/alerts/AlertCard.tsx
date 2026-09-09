'use client';

import { useState } from 'react';
import type { Alert, AlertStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import AlertWorkflow from './AlertWorkflow';
import AlertTimeline from './AlertTimeline';
import { formatTimestamp, getTimeAgo } from '@/lib/utils';
import {
  Bell,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Send,
  UserCheck,
  Eye,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface Props {
  alert: Alert;
  onStatusChange: (alertId: string, newStatus: AlertStatus, actor: string, note?: string) => void;
}

export default function AlertCard({ alert, onStatusChange }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [officerName, setOfficerName] = useState('District Collector, Wayanad');

  const handleAction = (status: AlertStatus, actionNote: string) => {
    onStatusChange(alert.id, status, officerName, actionNote);
  };

  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';

  return (
    <div
      className={`
        rounded-lg bg-slate-900/80 border transition-all
        ${
          isCritical
            ? 'border-red-600/40 hover:border-red-500/60'
            : isHigh
            ? 'border-orange-600/40 hover:border-orange-500/60'
            : 'border-slate-800 hover:border-slate-700'
        }
      `}
    >
      <div className="p-4 space-y-3">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">
              {alert.id.toUpperCase()}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-semibold text-slate-300">
              {alert.zoneName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge label={alert.severity} variant={alert.severity} size="sm" />
            <StatusBadge label={alert.status} variant={alert.status} size="sm" />
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 mb-1">{alert.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>
        </div>

        {/* Metadata Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <span>Created by: <strong className="text-slate-300">{alert.createdBy}</strong></span>
            {alert.authorizedBy && (
              <span>Authorized by: <strong className="text-emerald-400">{alert.authorizedBy}</strong></span>
            )}
          </div>
          <span className="font-mono text-slate-500">{getTimeAgo(alert.updatedAt)}</span>
        </div>

        {/* Status specific actions */}
        <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            {alert.status === 'DRAFT' && (
              <span className="text-slate-400 flex items-center gap-1">
                <Lock size={12} /> Internal System Draft &mdash; Not Broadcasted
              </span>
            )}
            {alert.status === 'AWAITING_AUTHORIZATION' && (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle size={12} /> Awaiting Duty Officer Sign-Off
              </span>
            )}
            {alert.status === 'AUTHORIZED' && (
              <span className="text-blue-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Authorized &mdash; Transmitted to Field Stations
              </span>
            )}
            {alert.status === 'ACKNOWLEDGED' && (
              <span className="text-violet-400 flex items-center gap-1">
                <UserCheck size={12} /> Acknowledged by Local Tahsildar
              </span>
            )}
            {alert.status === 'UNDER_VERIFICATION' && (
              <span className="text-cyan-400 flex items-center gap-1">
                <Eye size={12} /> Ground Verification Underway
              </span>
            )}
            {alert.status === 'CLOSED' && (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Alert Protocol Completed & Closed
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {alert.status === 'DRAFT' && (
              <button
                onClick={() =>
                  handleAction(
                    'AWAITING_AUTHORIZATION',
                    'Draft submitted to District Disaster Control Room for review.'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-amber-600 text-slate-950 hover:bg-amber-500 transition-colors"
              >
                <Send size={12} /> Submit for Authorization
              </button>
            )}

            {alert.status === 'AWAITING_AUTHORIZATION' && (
              <button
                onClick={() =>
                  handleAction(
                    'AUTHORIZED',
                    'Authorized by District Collector. Dispatched to local response units.'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-blue-600 text-slate-100 hover:bg-blue-500 transition-colors"
              >
                <UserCheck size={12} /> Authorize & Issue Alert
              </button>
            )}

            {alert.status === 'AUTHORIZED' && (
              <button
                onClick={() =>
                  handleAction(
                    'ACKNOWLEDGED',
                    'Receipt acknowledged by Meppadi Taluk Office and PWD Control.'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-violet-600 text-slate-100 hover:bg-violet-500 transition-colors"
              >
                <CheckCircle2 size={12} /> Acknowledge Receipt
              </button>
            )}

            {alert.status === 'ACKNOWLEDGED' && (
              <button
                onClick={() =>
                  handleAction(
                    'UNDER_VERIFICATION',
                    'Field team dispatched to inspect slopes and road culverts.'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-cyan-600 text-slate-100 hover:bg-cyan-500 transition-colors"
              >
                <Eye size={12} /> Begin Verification
              </button>
            )}

            {alert.status === 'UNDER_VERIFICATION' && (
              <div className="flex gap-1.5">
                <button
                  onClick={() =>
                    handleAction(
                      'CLOSED',
                      'Field inspection confirmed hazard stabilized. Debris cleared.'
                    )
                  }
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-emerald-600 text-slate-950 hover:bg-emerald-500 transition-colors"
                >
                  <CheckCircle2 size={12} /> Close Alert
                </button>
                <button
                  onClick={() =>
                    handleAction(
                      'ESCALATED',
                      'Field team observed major slope fissure. Escalated to State Emergency Operations Centre (SEOC).'
                    )
                  }
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-red-600 text-slate-100 hover:bg-red-500 transition-colors"
                >
                  <AlertTriangle size={12} /> Escalate to SEOC
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse details */}
        <div className="flex justify-end">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
          >
            {expanded ? (
              <>
                Hide Workflow & Timeline <ChevronUp size={13} />
              </>
            ) : (
              <>
                View Full SOP Workflow & Audit Log <ChevronDown size={13} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Workflow & Timeline */}
      {expanded && (
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-4">
          <AlertWorkflow currentStatus={alert.status} />
          <AlertTimeline timeline={alert.timeline} />
        </div>
      )}
    </div>
  );
}
