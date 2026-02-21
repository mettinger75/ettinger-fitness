'use client';

import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'flat';
  trendLabel?: string;
  accentColor?: string;
  href?: string;
  onClick?: () => void;
}

export function StatCard({ icon: Icon, label, value, trend, trendLabel, accentColor, href, onClick }: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-accent-green' : trend === 'down' ? 'text-accent-red' : 'text-text-muted';
  const color = accentColor || '#C9A227';
  const interactive = href || onClick;

  const content = (
    <>
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
    </>
  );

  const classes = `rounded-2xl glass glass-hover p-4 sm:p-5 flex flex-col gap-3 ${interactive ? 'cursor-pointer' : ''}`;

  if (href) {
    return (
      <Link href={href} className={classes} style={{ borderColor: `${color}20` }}>
        {content}
      </Link>
    );
  }

  return (
    <div
      className={classes}
      style={{ borderColor: `${color}20` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </div>
  );
}
