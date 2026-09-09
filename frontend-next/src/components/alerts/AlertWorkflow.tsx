'use client';

import type { AlertStatus } from '@/types';
import { Check, ChevronRight } from 'lucide-react';

const WORKFLOW_STEPS: { status: AlertStatus; label: string }[] = [
  { status: 'DRAFT', label: 'Draft' },
  { status: 'AWAITING_AUTHORIZATION', label: 'Awaiting Auth' },
  { status: 'AUTHORIZED', label: 'Authorized' },
  { status: 'ACKNOWLEDGED', label: 'Acknowledged' },
  { status: 'UNDER_VERIFICATION', label: 'In Verification' },
  { status: 'CLOSED', label: 'Closed' },
];

interface Props {
  currentStatus: AlertStatus;
}

export default function AlertWorkflow({ currentStatus }: Props) {
  const currentIndex = WORKFLOW_STEPS.findIndex((s) => s.status === currentStatus);
  const isEscalated = currentStatus === 'ESCALATED';

  return (
    <div className="w-full bg-slate-950/60 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-mono text-slate-400 mb-2.5">
        <span>Standard Operating Procedure (SOP) Protocol Workflow</span>
        {isEscalated && (
          <span className="text-red-400 font-bold px-1.5 py-0.5 rounded bg-red-950/50 border border-red-800">
            ESCALATED DIRECTLY TO STATE SDMA
          </span>
        )}
      </div>

      <div className="flex items-center justify-between overflow-x-auto pb-1 gap-1">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isCurrent = step.status === currentStatus;
          const isCompleted = currentIndex > idx;
          const isPending = currentIndex < idx;

          return (
            <div key={step.status} className="flex items-center gap-1 shrink-0">
              <div
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all border
                  ${
                    isCurrent
                      ? 'bg-amber-600/30 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                      : isCompleted
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }
                `}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono">
                  {isCompleted ? <Check size={12} className="text-emerald-400" /> : idx + 1}
                </span>
                <span>{step.label}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight size={14} className="text-slate-600 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
