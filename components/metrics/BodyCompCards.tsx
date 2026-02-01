'use client';

import { Ruler, CircleDot, ArrowUpDown, Scaling } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

export function BodyCompCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Ruler} label="Chest" value="—" />
      <StatCard icon={CircleDot} label="Waist" value="—" />
      <StatCard icon={ArrowUpDown} label="Hips" value="—" />
      <StatCard icon={Scaling} label="Arms" value="—" />
    </div>
  );
}
