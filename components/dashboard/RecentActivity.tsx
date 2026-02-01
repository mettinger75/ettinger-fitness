'use client';

import { useUserStore } from '@/lib/store/useUserStore';
import { Card } from '@/components/ui/Card';
import { Clock, Dumbbell, Droplets, Target } from 'lucide-react';

function getEmptyMessage(userId: string) {
  switch (userId) {
    case 'mark': return 'No workouts logged yet. Build your first workout!';
    case 'gena': return 'Start tracking your fitness journey!';
    case 'eli': return 'No meet results yet. Log your first swim meet!';
    case 'gavin': return 'No games logged yet. Add your first game!';
    case 'savannah': return 'Start tracking your fitness journey!';
    default: return 'No recent activity.';
  }
}

function getIcon(userId: string) {
  switch (userId) {
    case 'eli': return Droplets;
    case 'gavin': return Target;
    default: return Dumbbell;
  }
}

export function RecentActivity() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const EmptyIcon = getIcon(user.id);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Clock size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-3">
          <EmptyIcon size={22} className="text-text-dim" />
        </div>
        <p className="text-sm font-medium text-text-muted">{getEmptyMessage(user.id)}</p>
      </div>
    </Card>
  );
}
