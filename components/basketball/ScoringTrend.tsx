'use client';

import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export function ScoringTrend() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-accent-orange" />
        <h3 className="text-sm font-medium text-text-primary">Scoring Trend</h3>
      </div>
      <EmptyState
        icon={TrendingUp}
        title="Play some games first"
        description="Points and assists will be charted game by game as you log results."
      />
    </Card>
  );
}
