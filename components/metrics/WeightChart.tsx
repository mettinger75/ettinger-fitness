'use client';

import { Scale } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export function WeightChart() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const metrics = useFitnessStore((s) => s.getMetricsForUser(user.id));

  const chartData = [...metrics]
    .filter((m) => m.weight)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((m) => ({
      date: m.date.slice(5), // MM-DD
      weight: m.weight,
    }));

  return (
    <Card>
      <h3 className="text-sm font-medium text-text-muted mb-4">Weight Trend</h3>
      {chartData.length === 0 ? (
        <EmptyState
          icon={Scale}
          title="No weight data yet"
          description="Log your weight to see trends over time."
        />
      ) : (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#F1F5F9',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke={user.accentColor}
                strokeWidth={2}
                dot={{ r: 4, fill: user.accentColor }}
                name="Weight (lbs)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
