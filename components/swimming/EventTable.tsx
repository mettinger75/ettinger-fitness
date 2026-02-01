'use client';

import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatSwimTime } from '@/lib/utils/formatTime';

interface SwimPB {
  event: string;
  course: string;
  timeSeconds: number;
  date: string;
  meet: string;
}

const ELI_PBS: SwimPB[] = [
  { event: '50 Free', course: 'SCY', timeSeconds: 22.29, date: '2024-12-15', meet: 'Winter Invite' },
  { event: '100 Free', course: 'SCY', timeSeconds: 48.39, date: '2024-11-10', meet: 'Fall Classic' },
  { event: '200 Free', course: 'SCY', timeSeconds: 105.29, date: '2024-10-20', meet: 'Sectionals' },
  { event: '100 Back', course: 'SCY', timeSeconds: 53.39, date: '2024-12-15', meet: 'Winter Invite' },
  { event: '100 Fly', course: 'SCY', timeSeconds: 53.99, date: '2024-11-10', meet: 'Fall Classic' },
];

export function EventTable() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} className="text-gold" />
        <h3 className="text-sm font-medium text-text-primary">Personal Bests</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-default">
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">Event</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">Course</th>
              <th className="text-right py-2.5 text-xs text-text-dim font-medium">Time</th>
              <th className="text-right py-2.5 text-xs text-text-dim font-medium hidden sm:table-cell">Meet</th>
              <th className="text-right py-2.5 text-xs text-text-dim font-medium hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {ELI_PBS.map((pb) => (
              <tr key={pb.event} className="border-b border-border-default/50 hover:bg-bg-card-hover transition-colors">
                <td className="py-3 text-text-primary font-medium">{pb.event}</td>
                <td className="py-3 text-text-muted">{pb.course}</td>
                <td className="py-3 text-right font-display text-lg text-gold tracking-wide">
                  {formatSwimTime(pb.timeSeconds)}
                </td>
                <td className="py-3 text-right text-text-muted hidden sm:table-cell">{pb.meet}</td>
                <td className="py-3 text-right text-text-dim hidden md:table-cell">{pb.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
