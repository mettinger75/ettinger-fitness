'use client';

import { useState } from 'react';
import { Plus, UtensilsCrossed, Trash2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectMeals } from '@/lib/store/useFitnessStore';
import type { Meal } from '@/lib/types/fitness';

const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

const MEAL_ICONS: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function MealLog() {
  const [modalOpen, setModalOpen] = useState(false);
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const allUserMeals = useFitnessStore(selectMeals(user.id));
  const allMeals = allUserMeals.filter((m) => m.date === today());
  const addMeal = useFitnessStore((s) => s.addMeal);
  const deleteMeal = useFitnessStore((s) => s.deleteMeal);

  const [mealType, setMealType] = useState('breakfast');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const resetForm = () => {
    setMealType('breakfast');
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleSave = () => {
    if (!name) return;
    addMeal(user.id, {
      date: today(),
      mealType: mealType as Meal['mealType'],
      name,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });
    resetForm();
    setModalOpen(false);
  };

  const grouped = MEAL_TYPES.map((t) => ({
    ...t,
    meals: allMeals.filter((m) => m.mealType === t.value),
  })).filter((g) => g.meals.length > 0);

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

      {allMeals.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title="No meals logged today"
          description="Track your nutrition by adding meals throughout the day."
          action="Log First Meal"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="space-y-4 mt-4">
          {grouped.map((group) => (
            <div key={group.value}>
              <p className="text-xs text-text-dim font-medium uppercase tracking-wider mb-2">
                {MEAL_ICONS[group.value]} {group.label}
              </p>
              <div className="space-y-2">
                {group.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between bg-bg-card border border-border-default rounded-lg px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary truncate">{meal.name}</p>
                      <p className="text-xs text-text-muted">
                        {meal.calories} cal &bull; P {meal.protein}g &bull; C {meal.carbs}g &bull; F {meal.fat}g
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMeal(user.id, meal.id)}
                      className="ml-2 text-text-dim hover:text-accent-red transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Meal">
        <div className="space-y-4">
          <Select id="meal-type" label="Meal Type" options={MEAL_TYPES} value={mealType} onChange={(e) => setMealType(e.target.value)} />
          <Input id="food" label="Food / Description" placeholder="e.g. Grilled chicken with rice" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="calories" label="Calories" type="number" placeholder="0" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <Input id="protein" label="Protein (g)" type="number" placeholder="0" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <Input id="carbs" label="Carbs (g)" type="number" placeholder="0" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            <Input id="fat" label="Fat (g)" type="number" placeholder="0" value={fat} onChange={(e) => setFat(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleSave}>Save Meal</Button>
        </div>
      </Modal>
    </div>
  );
}
