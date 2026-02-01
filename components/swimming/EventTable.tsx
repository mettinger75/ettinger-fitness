'use client';

import { Trophy, Flame, TrendingUp, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface SwimPB {
  event: string;
  time: string;
  date: string;
  sectional?: string;
  gap?: string;
  pctAway?: number;
  status?: string;
}

const ELI_PBS: SwimPB[] = [
  { event: '50 Free', time: '23.20', date: 'Dec 8, 2025', sectional: '21.99', gap: '1.21', pctAway: 5.5, status: 'Closest' },
  { event: '100 Fly', time: '56.10', date: 'Nov 7, 2025', sectional: '52.69', gap: '3.41', pctAway: 6.5, status: 'Very Close' },
  { event: '100 Free', time: '51.70', date: 'Nov 9, 2025', sectional: '47.79', gap: '3.91', pctAway: 8.2, status: 'Close' },
  { event: '500 Free', time: '5:11.08', date: 'Dec 8, 2025', sectional: '4:42.99', gap: '28.09', pctAway: 9.9, status: 'Achievable' },
  { event: '100 Back', time: '58.87', date: 'Oct 2025', sectional: '53.39', gap: '5.48', pctAway: 10.3, status: 'Achievable' },
  { event: '200 Free', time: '1:55.55', date: 'Nov 1, 2025', sectional: '1:43.89', gap: '11.66', pctAway: 11.2, status: 'Building' },
  { event: '200 IM', time: '2:10.67', date: 'Nov 2025', sectional: '1:57.29', gap: '13.38', pctAway: 11.4, status: 'Building' },
  { event: '400 IM', time: '4:39.46', date: 'Oct 2025', sectional: '4:11.19', gap: '28.27', pctAway: 11.2, status: 'Building' },
  { event: '200 Back', time: '2:10.81', date: 'Dec 2025', sectional: '1:54.89', gap: '15.92', pctAway: 13.9, status: 'Long-term' },
  { event: '200 Fly', time: '2:16.16', date: 'Feb 2025', sectional: '1:56.99', gap: '19.17', pctAway: 16.3, status: 'Long-term' },
  { event: '100 Breast', time: '1:15.51', date: 'Jan 2025', sectional: '1:00.89', gap: '14.62', pctAway: 23.9, status: 'Long-term' },
];

const SPRINT_EVENTS = [
  { event: '50 Fly', time: '25.50', date: 'Dec 8, 2025' },
  { event: '50 Back', time: '27.72', date: 'Dec 2025', note: 'WIN' },
  { event: '50 Breast', time: '31.88', date: 'Dec 2025', note: '2nd' },
];

function getStatusColor(status?: string): string {
  switch (status) {
    case 'Closest':
    case 'Very Close': return '#22C55E';
    case 'Close':
    case 'Achievable': return '#38BDF8';
    case 'Building': return '#FB923C';
    default: return '#94A3B8';
  }
}

function getStatusIcon(status?: string) {
  switch (status) {
    case 'Closest':
    case 'Very Close': return Flame;
    case 'Close':
    case 'Achievable': return TrendingUp;
    case 'Building': return TrendingUp;
    default: return Target;
  }
}

export function EventTable() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-gold" />
            <h3 className="text-sm font-semibold text-text-primary">Personal Records vs Sectional Standards</h3>
          </div>
          <span className="text-xs text-text-dim">2026 TSC Sectionals</span>
        </div>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2.5 text-xs text-text-dim font-medium">Event</th>
                <th className="text-right py-2.5 text-xs text-text-dim font-medium">PB</th>
                <th className="text-right py-2.5 text-xs text-text-dim font-medium hidden sm:table-cell">Sectional</th>
                <th className="text-right py-2.5 text-xs text-text-dim font-medium hidden md:table-cell">Gap</th>
                <th className="text-right py-2.5 text-xs text-text-dim font-medium">% Away</th>
                <th className="text-right py-2.5 text-xs text-text-dim font-medium hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {ELI_PBS.map((pb) => {
                const StatusIcon = getStatusIcon(pb.status);
                return (
                  <tr key={pb.event} className="border-b border-border-default/50 hover:bg-bg-card-hover transition-colors">
                    <td className="py-3 text-text-primary font-medium">{pb.event}</td>
                    <td className="py-3 text-right font-display text-lg tracking-wide" style={{ color: getStatusColor(pb.status) }}>
                      {pb.time}
                    </td>
                    <td className="py-3 text-right text-text-muted hidden sm:table-cell">{pb.sectional}</td>
                    <td className="py-3 text-right text-text-dim hidden md:table-cell">{pb.gap}</td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: getStatusColor(pb.status) }}>
                        <StatusIcon size={12} />
                        {pb.pctAway}%
                      </span>
                    </td>
                    <td className="py-3 text-right text-text-dim text-xs hidden lg:table-cell">{pb.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-accent-sky" />
          <h3 className="text-sm font-semibold text-text-primary">Sprint Events</h3>
          <span className="text-xs text-text-dim ml-auto">No Sectional Standard</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SPRINT_EVENTS.map((ev) => (
            <div key={ev.event} className="rounded-lg border border-border-default bg-bg-secondary p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted">{ev.event}</p>
                <p className="font-display text-lg text-accent-sky tracking-wide">{ev.time}</p>
              </div>
              {ev.note && (
                <Badge label={ev.note} color={ev.note === 'WIN' ? '#22C55E' : '#FB923C'} />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
