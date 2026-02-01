'use client';

import { BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export function SplitAnalysis() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-accent-sky" />
        <h3 className="text-sm font-medium text-text-primary">Split Analysis</h3>
      </div>
      <EmptyState
        icon={BarChart3}
        title="Add splits to see analysis"
        description="Enter split times for your events to analyze pacing and strategy."
      />
    </Card>
  );
}
