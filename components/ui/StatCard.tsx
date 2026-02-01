'use client';

import { type LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'flat';
  trendLabel?: string;
  accentColor?: string;
}

export function StatCard({ icon: Icon, label, value, trend, trendLabel, accentColor }: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-accent-green' : trend === 'down' ? 'text-accent-red' : 'text-text-muted';
  const color = accentColor || '#C9A227';

  return (
    <div
      className="rounded-xl border bg-bg-card p-4 sm:p-5 flex flex-col gap-3 transition-colors hover:bg-bg-card-hover"
      style={{ borderColor: `${color}15` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon size={14} />
            {trendLabel && <span>{trendLabel}</span>}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold font-display tracking-wide text-text-primary leading-none">{value}</p>
        <p className="text-xs text-text-muted mt-1">{label}</p>
      </div>
    </div>
  );
}
