// ============================================================
// Service Layer — Response Priority
// ============================================================

import { DEMO_RESPONSE_PRIORITY } from '@/data/responsePriority';
import type { ResponsePriorityItem } from '@/types';

export async function getResponsePriority(): Promise<ResponsePriorityItem[]> {
  // TODO: Replace with API call — GET /api/response-priority
  return DEMO_RESPONSE_PRIORITY;
}
