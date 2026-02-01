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

  return (
    <div className="rounded-xl border border-border-default bg-bg-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: accentColor ? `${accentColor}20` : 'rgba(201, 162, 39, 0.1)' }}
        >
          <Icon size={18} style={{ color: accentColor || '#C9A227' }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon size={14} />
            {trendLabel && <span>{trendLabel}</span>}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold font-display tracking-wide text-text-primary">{value}</p>
        <p className="text-xs text-text-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}
