'use client';

import { UtensilsCrossed } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { MacroRings } from '@/components/nutrition/MacroRings';
import { MealLog } from '@/components/nutrition/MealLog';

export default function NutritionPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      <SectionTitle icon={UtensilsCrossed} title="Nutrition Tracker" />

      <Card>
        <h3 className="text-sm font-medium text-text-muted mb-4">Today&apos;s Macros</h3>
        <MacroRings />
      </Card>

      <MealLog />
    </div>
  );
}
