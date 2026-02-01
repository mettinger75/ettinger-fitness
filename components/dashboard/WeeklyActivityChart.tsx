'use client';

import { useUserStore } from '@/lib/store/useUserStore';
import { Card } from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

export function WeeklyActivityChart() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-semibold text-text-primary">Weekly Activity</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-3">
          <BarChart3 size={22} className="text-text-dim" />
        </div>
        <p className="text-sm font-medium text-text-primary">Start your fitness journey</p>
        <p className="text-xs text-text-muted mt-1">Log activities to see your weekly trends.</p>
      </div>
    </Card>
  );
}
