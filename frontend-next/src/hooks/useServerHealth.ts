'use client';

import { useState, useEffect, useCallback } from 'react';

export type ServerStatus = 'checking' | 'ready' | 'waking_up' | 'offline';

export interface ServerHealthState {
  status: ServerStatus;
  isReady: boolean;
  isWakingUp: boolean;
  elapsedSeconds: number;
  estimatedTotalSeconds: number;
  progressPercent: number;
  errorMessage: string | null;
  dismissed: boolean;
  dismiss: () => void;
  retry: () => void;
}

const ESTIMATED_WAKE_TIME = 45; // Render free tier typical wake time is ~30-50s

export function useServerHealth(): ServerHealthState {
  const [status, setStatus] = useState<ServerStatus>('checking');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const endpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/api/health` : '/api/health';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setStatus('ready');
        setErrorMessage(null);
        return true;
      } else {
        setStatus('waking_up');
        return false;
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      setStatus('waking_up');
      return false;
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    let isMounted = true;
    let timerInterval: NodeJS.Timeout | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    // Check immediately
    checkHealth().then((ready) => {
      if (!isMounted) return;
      if (!ready) {
        // Start counting seconds for cold start
        timerInterval = setInterval(() => {
          if (isMounted) {
            setElapsedSeconds((prev) => prev + 1);
          }
        }, 1000);

        // Poll every 4 seconds until ready
        pollInterval = setInterval(async () => {
          const isOk = await checkHealth();
          if (isOk) {
            if (timerInterval) clearInterval(timerInterval);
            if (pollInterval) clearInterval(pollInterval);
          }
        }, 4000);
      }
    });

    return () => {
      isMounted = false;
      if (timerInterval) clearInterval(timerInterval);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [checkHealth]);

  const dismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  const retry = useCallback(() => {
    setStatus('checking');
    setElapsedSeconds(0);
    checkHealth();
  }, [checkHealth]);

  // Calculate estimated progress percentage
  const progressPercent = Math.min(
    95,
    Math.round((elapsedSeconds / ESTIMATED_WAKE_TIME) * 100)
  );

  return {
    status,
    isReady: status === 'ready',
    isWakingUp: status === 'waking_up',
    elapsedSeconds,
    estimatedTotalSeconds: ESTIMATED_WAKE_TIME,
    progressPercent: status === 'ready' ? 100 : progressPercent,
    errorMessage,
    dismissed,
    dismiss,
    retry,
  };
}
