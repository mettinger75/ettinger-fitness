'use client';

import Link from 'next/link';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectActivities } from '@/lib/store/useFitnessStore';
import { Card } from '@/components/ui/Card';
import { Clock, Dumbbell, Droplets, Target, ChevronRight } from 'lucide-react';

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

function getHref(userId: string) {
  switch (userId) {
    case 'eli': return '/swimming';
    case 'gavin': return '/basketball';
    default: return '/workouts';
  }
}

export function RecentActivity() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const activities = useFitnessStore(selectActivities(user.id));
  const recentActivities = activities.slice(0, 5);
  const EmptyIcon = getIcon(user.id);
  const href = getHref(user.id);

  return (
    <Card>
      <Link href={href} className="flex items-center gap-2 mb-6 group">
        <Clock size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors">Recent Activity</h3>
        <ChevronRight size={14} className="ml-auto text-text-dim opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      {recentActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-3">
            <EmptyIcon size={22} className="text-text-dim" />
          </div>
          <p className="text-sm font-medium text-text-muted">{getEmptyMessage(user.id)}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${user.accentColor}15` }}
              >
                <Dumbbell size={14} style={{ color: user.accentColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{activity.activityType}</p>
                <p className="text-xs text-text-dim">{activity.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-text-primary">{activity.durationMinutes} min</p>
                {activity.calories && (
                  <p className="text-xs text-text-dim">{activity.calories} cal</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
