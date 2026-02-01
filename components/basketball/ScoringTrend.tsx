'use client';

import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectGames } from '@/lib/store/useFitnessStore';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export function ScoringTrend() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const games = useFitnessStore(selectGames(user.id));

  const chartData = [...games]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((g, i) => ({
      game: `G${i + 1}`,
      pts: g.points,
      ast: g.assists,
    }));

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-accent-orange" />
        <h3 className="text-sm font-medium text-text-primary">Scoring Trend</h3>
      </div>
      {games.length === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="Play some games first"
          description="Points and assists will be charted game by game as you log results."
        />
      ) : (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="game" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  color: '#F1F5F9',
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="pts" stroke="#FB923C" strokeWidth={2} dot={{ r: 4, fill: '#FB923C' }} name="Points" />
              <Line type="monotone" dataKey="ast" stroke="#22C55E" strokeWidth={2} dot={{ r: 4, fill: '#22C55E' }} name="Assists" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
