'use client';

import { useState, useEffect } from 'react';
import ResponsePriority from '@/components/priority/ResponsePriority';
import { ResponsePrioritySkeleton } from '@/components/common/Skeleton';
import { getResponsePriority } from '@/services/responsePriority';
import type { ResponsePriorityItem } from '@/types';
import { ListOrdered, ShieldAlert, Users, Truck, AlertTriangle } from 'lucide-react';

export default function ResponsePriorityPage() {
  const [items, setItems] = useState<ResponsePriorityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getResponsePriority();
        setItems(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <ResponsePrioritySkeleton />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListOrdered className="w-5 h-5 text-amber-400" />
            <h1 className="text-base md:text-lg font-bold text-slate-100 uppercase tracking-wide">
              Emergency Field Response Resource Prioritization
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Multi-criteria decision support matrix for deploying NDRF, SDRF, Fire & Rescue, and PWD road clearing teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            5 Pilot Sectors Ranked
          </span>
        </div>
      </div>

      {/* Main Ranking Matrix Component */}
      <ResponsePriority items={items} />
    </div>
  );
}
