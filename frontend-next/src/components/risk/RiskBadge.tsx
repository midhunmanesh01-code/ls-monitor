'use client';

import type { RiskCategory } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';

interface Props {
  category: RiskCategory;
  size?: 'sm' | 'md';
}

export default function RiskBadge({ category, size = 'sm' }: Props) {
  return <StatusBadge label={category} variant={category} size={size} />;
}
