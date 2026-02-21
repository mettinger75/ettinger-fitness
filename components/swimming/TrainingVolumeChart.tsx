'use client';

import { TrendingUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const IMPROVEMENTS = [
  { event: '50 Free', from: '25.74', to: '23.20', drop: '2.54', pct: '9.9%' },
  { event: '100 Free', from: '58.43', to: '51.70', drop: '6.73', pct: '11.5%' },
  { event: '100 Fly', from: '1:10.33', to: '56.10', drop: '14.23', pct: '20.2%' },
  { event: '200 IM', from: '2:36.05', to: '2:10.67', drop: '25.38', pct: '16.3%' },
  { event: '500 Free', from: '5:18.87', to: '5:11.08', drop: '7.79', pct: '2.5%' },
];

export function TrainingVolumeChart() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp size={18} className="text-accent-green" />
        <h3 className="text-sm font-semibold text-text-primary">Year-Over-Year Progression</h3>
      </div>
      <div className="space-y-3">
        {IMPROVEMENTS.map((imp) => (
          <div key={imp.event} className="flex items-center gap-3 p-3 rounded-lg glass">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{imp.event}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-dim">{imp.from}</span>
                <ArrowDown size={12} className="text-accent-green rotate-[-90deg]" />
                <span className="text-xs font-medium text-accent-sky">{imp.to}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-display text-accent-green tracking-wide">-{imp.drop}s</p>
              <p className="text-[10px] text-text-dim">{imp.pct}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-glass-border">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Events within 10% of Sectional</span>
          <span className="font-medium text-accent-sky">4 events</span>
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted mt-1">
          <span>Events within 12% of Sectional</span>
          <span className="font-medium text-accent-sky">7 events</span>
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted mt-1">
          <span>New events this season</span>
          <span className="font-medium text-text-primary">50 Fly, 50 Back, 50 Breast, 200 Back</span>
        </div>
      </div>
    </Card>
  );
}
