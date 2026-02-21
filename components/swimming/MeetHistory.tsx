'use client';

import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Medal, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface MeetResult {
  event: string;
  time: string;
  place?: string;
  note?: string;
}

interface Meet {
  name: string;
  date: string;
  highlight?: string;
  points?: number;
  results: MeetResult[];
}

const MEETS: Meet[] = [
  {
    name: 'District 4-6A Championship',
    date: 'Jan 22-23, 2026',
    highlight: '2 Silver Relay Medals',
    results: [
      { event: '50 Free', time: '23.32', place: '10th', note: '+0.12 from PB' },
      { event: '100 Fly', time: '57.51', place: '11th', note: '+1.41 from PB' },
      { event: '200 Free Relay', time: '1:33.08', place: '2nd', note: 'Team relay' },
      { event: '400 Free Relay', time: '3:21.92', place: '2nd', note: 'Team relay' },
    ],
  },
  {
    name: 'LAC Ice Breaker Meet',
    date: 'Jan 11, 2026',
    highlight: 'Post-flu recovery',
    points: 3,
    results: [
      { event: '50 Free', time: '24.52', place: '18th' },
      { event: '100 Fly', time: '59.69', place: '18th' },
      { event: '200 Free', time: '2:01.51', place: '26th' },
      { event: '500 Free', time: '5:24.32', place: '6th' },
      { event: '100 Back', time: '1:00.63', place: '17th' },
      { event: '200 IM', time: '2:15.75' },
    ],
  },
  {
    name: 'MAC Invitational',
    date: 'Dec 8, 2025',
    highlight: '2 Personal Bests!',
    results: [
      { event: '50 Free', time: '23.20', note: 'NEW PB' },
      { event: '500 Free', time: '5:11.08', note: 'NEW PB' },
      { event: '50 Fly', time: '25.50', note: 'First time' },
    ],
  },
  {
    name: 'NISD 6A Invitational',
    date: 'Dec 4-5, 2025',
    highlight: '31 individual points',
    points: 31,
    results: [
      { event: '200 Free', time: '1:56.08', place: '3rd' },
      { event: '100 Free', time: '52.55', place: '4th' },
    ],
  },
  {
    name: 'Jingle Bell Championship',
    date: 'Dec 2025',
    highlight: '1 WIN + 2 Silvers, 3 new events!',
    points: 29,
    results: [
      { event: '50 Back', time: '27.72', place: '1st', note: 'First attempt - WIN!' },
      { event: '200 Back', time: '2:10.81', place: '2nd', note: 'First attempt' },
      { event: '50 Breast', time: '31.88', place: '2nd', note: 'First attempt' },
      { event: '50 Free', time: '23.40', place: '3rd' },
      { event: '100 Free', time: '53.74', place: '13th' },
      { event: '100 Fly', time: '1:01.21', place: '15th' },
    ],
  },
  {
    name: 'Historic Week',
    date: 'Nov 1-10, 2025',
    highlight: '6 PBs in 9 days! -15.22s total',
    results: [
      { event: '200 Free', time: '1:55.55', note: 'PB (-0.95)' },
      { event: '500 Free', time: '5:11.38', note: 'PB (-7.49)' },
      { event: '100 Fly', time: '56.10', note: 'PB (-2.47)' },
      { event: '50 Free', time: '23.21', note: 'PB (-0.24)' },
      { event: '200 IM', time: '2:10.67', note: 'PB (-3.90)' },
      { event: '100 Free', time: '51.70', note: 'PB (-0.17)' },
    ],
  },
  {
    name: 'Season Opener',
    date: 'Oct 5, 2025',
    highlight: 'PBs in 400 IM & 100 Back',
    results: [
      { event: '50 Free', time: '23.45', place: '3rd' },
      { event: '100 Free', time: '52.49', place: '9th' },
      { event: '200 Free', time: '1:57.30', place: '9th' },
      { event: '100 Fly', time: '58.57', place: '9th' },
      { event: '100 Back', time: '58.87', place: '6th', note: 'PB' },
      { event: '200 IM', time: '2:14.57', place: '10th' },
      { event: '400 IM', time: '4:39.46', place: '2nd', note: 'PB! -12s drop' },
    ],
  },
  {
    name: 'Long Course Season',
    date: 'May 2025',
    highlight: 'Long Course Meters',
    results: [
      { event: '50m Free', time: '27.78', place: '14th' },
      { event: '100m Free', time: '1:00.66', place: '8th' },
      { event: '200m Free', time: '2:17.60', place: '13th' },
      { event: '400m Free', time: '4:52.11', place: '8th', note: '-26s drop!' },
      { event: '200m IM', time: '2:35.82', place: '11th' },
    ],
  },
  {
    name: 'Spring Championships',
    date: 'Mar 2025',
    highlight: 'First 100 Free WIN!',
    results: [
      { event: '100 Free', time: '53.07', place: '1st', note: 'WIN!' },
      { event: '100 Fly', time: '1:00.95', place: '3rd' },
      { event: '500 Free', time: '5:18.87', place: '2nd' },
    ],
  },
  {
    name: 'Mid-Season Peak',
    date: 'Feb 2025',
    highlight: 'First sub-2:00 200 Free',
    results: [
      { event: '200 Free', time: '1:56.50', note: 'First sub-2:00!' },
      { event: '200 Fly', time: '2:16.16', note: 'First 200 Fly' },
    ],
  },
  {
    name: 'Historic Day',
    date: 'Jan 2025',
    highlight: '84 points in single meet!',
    points: 84,
    results: [
      { event: '100 Free', time: '51.87', note: 'First sub-52!' },
      { event: '100 Breast', time: '1:15.51', note: 'PB' },
    ],
  },
];

export function MeetHistory() {
  const [expandedMeet, setExpandedMeet] = useState<number>(0);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <Calendar size={18} className="text-accent-sky" />
        <h3 className="text-sm font-semibold text-text-primary">Meet History</h3>
        <span className="text-xs text-text-dim ml-auto">{MEETS.length} meets</span>
      </div>
      <div className="space-y-2">
        {MEETS.map((meet, idx) => {
          const isExpanded = expandedMeet === idx;
          return (
            <div key={idx} className="rounded-lg border border-glass-border overflow-hidden">
              <button
                onClick={() => setExpandedMeet(isExpanded ? -1 : idx)}
                className="w-full flex items-center gap-3 p-3 hover:bg-bg-card-hover transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text-primary truncate">{meet.name}</p>
                    {meet.points && (
                      <span className="text-xs text-gold shrink-0">{meet.points} pts</span>
                    )}
                  </div>
                  <p className="text-xs text-text-dim mt-0.5">{meet.date}</p>
                </div>
                {meet.highlight && (
                  <Badge label={meet.highlight} color="#38BDF8" className="hidden sm:inline-flex shrink-0" />
                )}
                {isExpanded ? (
                  <ChevronUp size={16} className="text-text-dim shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-text-dim shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="border-t border-glass-border bg-bg-secondary/50 p-3">
                  <div className="space-y-2">
                    {meet.results.map((r, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">{r.event}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-base tracking-wide text-accent-sky">{r.time}</span>
                          {r.place && (
                            <span className={`text-xs w-12 text-right ${
                              r.place === '1st' ? 'text-gold' : r.place === '2nd' ? 'text-text-muted' : r.place === '3rd' ? 'text-accent-orange' : 'text-text-dim'
                            }`}>{r.place}</span>
                          )}
                          {r.note && (
                            <Badge
                              label={r.note}
                              color={r.note.includes('PB') || r.note.includes('WIN') || r.note.includes('NEW') ? '#22C55E' : '#94A3B8'}
                              className="text-[10px]"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
