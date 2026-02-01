'use client';

import { useUserStore } from '@/lib/store/useUserStore';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { BarChart3 } from 'lucide-react';

export function WeeklyActivityChart() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-medium text-text-primary">Weekly Activity</h3>
      </div>
      <EmptyState
        icon={BarChart3}
        title="Start your fitness journey"
        description="Log activities to see your weekly trends."
      />
    </Card>
  );
}
