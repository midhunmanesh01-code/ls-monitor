'use client';

import { useState, useCallback } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);

  const toggleOffline = useCallback(() => {
    setIsOffline((prev) => !prev);
  }, []);

  const goOffline = useCallback(() => {
    setIsOffline(true);
  }, []);

  const goOnline = useCallback(() => {
    setIsOffline(false);
  }, []);

  return {
    isOffline,
    toggleOffline,
    goOffline,
    goOnline,
  };
}
