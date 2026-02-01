'use client';

import { ProgressRing } from '@/components/ui/ProgressRing';

const MACROS = [
  { label: 'Calories', value: 0, max: 2200, color: '#C9A227', unit: 'cal' },
  { label: 'Protein', value: 0, max: 180, color: '#22C55E', unit: 'g' },
  { label: 'Carbs', value: 0, max: 250, color: '#3B82F6', unit: 'g' },
  { label: 'Fat', value: 0, max: 70, color: '#FB923C', unit: 'g' },
  { label: 'Water', value: 0, max: 8, color: '#38BDF8', unit: 'cups' },
];

export function MacroRings() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      {MACROS.map((m) => (
        <ProgressRing
          key={m.label}
          value={m.value}
          max={m.max}
          color={m.color}
          label={m.label}
          unit={m.unit}
        />
      ))}
    </div>
  );
}
