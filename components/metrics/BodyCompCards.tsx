'use client';

import { Ruler, CircleDot, ArrowUpDown, Scaling } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectMetrics } from '@/lib/store/useFitnessStore';

export function BodyCompCards() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const metrics = useFitnessStore(selectMetrics(user.id));
  const latest = metrics[0];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Ruler} label="Chest" value={latest?.chest ? `${latest.chest}"` : '—'} />
      <StatCard icon={CircleDot} label="Waist" value={latest?.waist ? `${latest.waist}"` : '—'} />
      <StatCard icon={ArrowUpDown} label="Hips" value={latest?.hips ? `${latest.hips}"` : '—'} />
      <StatCard icon={Scaling} label="Arms" value={latest?.arms ? `${latest.arms}"` : '—'} />
    </div>
  );
}
