'use client';

import { useState } from 'react';
import { Plus, UtensilsCrossed } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

export function MealLog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <SectionTitle
        icon={UtensilsCrossed}
        title="Meal Log"
        action={
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Meal
          </Button>
        }
      />

      <EmptyState
        icon={UtensilsCrossed}
        title="No meals logged today"
        description="Track your nutrition by adding meals throughout the day."
        action="Log First Meal"
        onAction={() => setModalOpen(true)}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Meal">
        <div className="space-y-4">
          <Select id="meal-type" label="Meal Type" options={MEAL_TYPES} />
          <Input id="food" label="Food / Description" placeholder="e.g. Grilled chicken with rice" />
          <div className="grid grid-cols-2 gap-3">
            <Input id="calories" label="Calories" type="number" placeholder="0" />
            <Input id="protein" label="Protein (g)" type="number" placeholder="0" />
            <Input id="carbs" label="Carbs (g)" type="number" placeholder="0" />
            <Input id="fat" label="Fat (g)" type="number" placeholder="0" />
          </div>
          <Button className="w-full">Save Meal</Button>
        </div>
      </Modal>
    </div>
  );
}
