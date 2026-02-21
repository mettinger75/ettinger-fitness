'use client';

import { Target, Medal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const SPRING_2026_GOALS = [
  { event: '50 Free', target: 'Sub-23.0', status: 'Sectional qualifier', current: '23.20' },
  { event: '100 Fly', target: 'Sub-55.0', status: 'Approach sectional', current: '56.10' },
  { event: '100 Free', target: 'Sub-51.0', status: 'Maintain/improve', current: '51.70' },
  { event: '500 Free', target: 'Sub-5:10', status: 'Break barrier', current: '5:11.08' },
];

const SEASON_2027_GOALS = [
  'Target 3-4 sectional qualifications',
  'Focus on 50 Free, 100 Fly, 100 Free',
  'Develop 100 Back as 4th event',
];

export function SplitAnalysis() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <Target size={18} className="text-gold" />
        <h3 className="text-sm font-semibold text-text-primary">Championship Goals</h3>
      </div>

      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-text-dim mb-3">Spring 2026 Targets</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SPRING_2026_GOALS.map((goal) => (
            <div key={goal.event} className="rounded-lg glass p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-text-primary">{goal.event}</p>
                <Badge label={goal.target} color="#C9A227" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Current: {goal.current}</span>
                <span className="text-[10px] text-text-dim">{goal.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-text-dim mb-3">2026-2027 Season</p>
        <div className="space-y-2">
          {SEASON_2027_GOALS.map((goal, i) => (
            <div key={i} className="flex items-center gap-2">
              <Medal size={14} className="text-gold/50 shrink-0" />
              <span className="text-sm text-text-muted">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
