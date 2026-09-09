'use client';

import { useState, useCallback, useEffect } from 'react';
import type { FieldReport, SyncStatus } from '@/types';
import { getFieldReports, syncReports } from '@/services/fieldReports';

export function useSyncQueue() {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const refreshReports = useCallback(async () => {
    const all = await getFieldReports();
    setReports([...all]);
  }, []);

  useEffect(() => {
    refreshReports();
  }, [refreshReports]);

  const pendingCount = reports.filter(
    (r) => r.syncStatus === 'PENDING' || r.syncStatus === 'FAILED'
  ).length;

  const triggerSync = useCallback(async () => {
    setIsSyncing(true);
    // Simulate gradual progress
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await syncReports();
    await refreshReports();
    setIsSyncing(false);
    setLastSyncTime(new Date().toISOString());
  }, [refreshReports]);

  return {
    reports,
    pendingCount,
    isSyncing,
    lastSyncTime,
    triggerSync,
    refreshReports,
  };
}
