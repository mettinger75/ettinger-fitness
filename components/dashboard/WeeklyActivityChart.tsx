'use client';

import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectActivities } from '@/lib/store/useFitnessStore';
import { Card } from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeeklyActivityChart() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const activities = useFitnessStore(selectActivities(user.id));

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const chartData = DAYS.map((day, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayActivities = activities.filter((a) => a.date === dateStr);
    const minutes = dayActivities.reduce((s, a) => s + a.durationMinutes, 0);
    return { day, minutes };
  });

  const hasData = chartData.some((d) => d.minutes > 0);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-semibold text-text-primary">Weekly Activity</h3>
      </div>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-3">
            <BarChart3 size={22} className="text-text-dim" />
          </div>
          <p className="text-sm font-medium text-text-primary">Start your fitness journey</p>
          <p className="text-xs text-text-muted mt-1">Log activities to see your weekly trends.</p>
        </div>
      ) : (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#F1F5F9',
                  fontSize: 12,
                }}
                formatter={(value) => [`${value} min`, 'Duration']}
              />
              <Bar dataKey="minutes" fill={user.accentColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
