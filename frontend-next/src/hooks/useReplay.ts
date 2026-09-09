'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReplayFrame } from '@/types';
import { DEMO_REPLAY_FRAMES } from '@/data/rainfall';

export function useReplay(initialFrames: ReplayFrame[] = DEMO_REPLAY_FRAMES) {
  const [frames, setFrames] = useState<ReplayFrame[]>(initialFrames);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = frames.length;
  const currentFrame = frames[currentFrameIndex] || frames[0];

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
  }, []);

  const stepForward = useCallback(() => {
    setCurrentFrameIndex((prev) => (prev < totalFrames - 1 ? prev + 1 : prev));
  }, [totalFrames]);

  const stepBackward = useCallback(() => {
    setCurrentFrameIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const jumpToFrame = useCallback((index: number) => {
    if (index >= 0 && index < totalFrames) {
      setCurrentFrameIndex(index);
    }
  }, [totalFrames]);

  // Handle auto-advance
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 2500 / speed;
      timerRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev >= totalFrames - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, totalFrames]);

  return {
    frames,
    currentFrame,
    currentFrameIndex,
    totalFrames,
    isPlaying,
    speed,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    jumpToFrame,
    setSpeed,
    setFrames,
  };
}
