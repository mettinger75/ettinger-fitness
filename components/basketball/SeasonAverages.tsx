"use client";

import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

export function SeasonAverages() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const games = useFitnessStore((s) => s.getGamesForUser(user.id));

  const n = games.length;
  const avg = (fn: (g: typeof games[0]) => number) =>
    n > 0 ? (games.reduce((sum, g) => sum + fn(g), 0) / n).toFixed(1) : '—';

  const wins = games.filter((g) => g.result.toUpperCase().startsWith('W')).length;
  const losses = n - wins;

  const stats = [
    { label: 'PPG', value: avg((g) => g.points), color: '#FB923C' },
    { label: 'RPG', value: avg((g) => g.rebounds), color: '#3B82F6' },
    { label: 'APG', value: avg((g) => g.assists), color: '#22C55E' },
    { label: 'SPG', value: avg((g) => g.steals), color: '#C9A227' },
    { label: 'FG%', value: n > 0 ? avg((g) => g.fgPct) : '—', color: '#38BDF8' },
    { label: 'FT%', value: n > 0 ? avg((g) => g.ftPct) : '—', color: '#A78BFA' },
    { label: 'Games', value: n > 0 ? String(n) : '—', color: '#94A3B8' },
    { label: 'Record', value: n > 0 ? `${wins}-${losses}` : '—', color: '#22C55E' },
  ];

  return (
    <div>
      {n === 0 && (
        <p className="text-center text-[12px] text-text-muted mb-4">Log your first game to see season stats!</p>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-card border border-border-default rounded-xl p-3 text-center hover:bg-bg-card-hover transition-all"
          >
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">{stat.label}</p>
            <p className="font-display text-[20px] sm:text-[24px] leading-none" style={{ color: stat.value === '—' ? '#64748B' : stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
