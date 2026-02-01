'use client';

import { ProgressRing } from '@/components/ui/ProgressRing';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function MacroRings() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const meals = useFitnessStore((s) => s.getMealsForUser(user.id, today()));

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const macros = [
    { label: 'Calories', value: totals.calories, max: 2200, color: '#C9A227', unit: 'cal' },
    { label: 'Protein', value: totals.protein, max: 180, color: '#22C55E', unit: 'g' },
    { label: 'Carbs', value: totals.carbs, max: 250, color: '#3B82F6', unit: 'g' },
    { label: 'Fat', value: totals.fat, max: 70, color: '#FB923C', unit: 'g' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      {macros.map((m) => (
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
