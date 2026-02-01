'use client';

import { Scale } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export function WeightChart() {
  return (
    <Card>
      <h3 className="text-sm font-medium text-text-muted mb-4">Weight Trend</h3>
      <EmptyState
        icon={Scale}
        title="No weight data yet"
        description="Log your weight to see trends over time."
      />
    </Card>
  );
}
