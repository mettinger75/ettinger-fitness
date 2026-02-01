'use client';

import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export function TrainingVolumeChart() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-accent-sky" />
        <h3 className="text-sm font-medium text-text-primary">Training Volume</h3>
      </div>
      <EmptyState
        icon={TrendingUp}
        title="Log your first training week"
        description="Track weekly yardage to see volume trends over time."
      />
    </Card>
  );
}
