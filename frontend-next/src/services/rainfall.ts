// ============================================================
// Service Layer — Rainfall
// ============================================================

import { DEMO_RAINFALL, DEMO_REPLAY_FRAMES } from '@/data/rainfall';
import type { RainfallData, ReplayFrame } from '@/types';

export async function getRainfallData(zoneId: string): Promise<RainfallData | undefined> {
  // TODO: Replace with API call — GET /api/rainfall/:zoneId
  return DEMO_RAINFALL[zoneId];
}

export async function getAllRainfallData(): Promise<Record<string, RainfallData>> {
  // TODO: Replace with API call — GET /api/rainfall
  return DEMO_RAINFALL;
}

export async function getReplayFrames(): Promise<ReplayFrame[]> {
  // TODO: Replace with API call — GET /api/replay/frames
  return DEMO_REPLAY_FRAMES;
}
