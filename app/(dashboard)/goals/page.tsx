'use client';

import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { USERS } from '@/lib/constants/users';

const CATEGORY_OPTIONS = [
  { value: 'strength', label: 'Strength' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'weight', label: 'Weight' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'sport', label: 'Sport Performance' },
  { value: 'other', label: 'Other' },
];

const USER_OPTIONS = USERS.map((u) => ({ value: u.id, label: u.name }));

export default function GoalsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionTitle
        icon={Target}
        title="Goals"
        action={
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Create Goal
          </Button>
        }
      />

      <EmptyState
        icon={Target}
        title="No goals yet"
        description="Create your first goal to start tracking progress across the family."
        action="Create Goal"
        onAction={() => setModalOpen(true)}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Goal">
        <div className="space-y-4">
          <Input id="goal-title" label="Goal Title" placeholder="e.g., Run 100 miles this month" />
          <Select id="goal-category" label="Category" options={CATEGORY_OPTIONS} />
          <Select id="goal-user" label="Assign To" options={USER_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="goal-target" label="Target" type="number" placeholder="0" />
            <Input id="goal-unit" label="Unit" placeholder="e.g., miles, lbs, reps" />
          </div>
          <Input id="goal-deadline" label="Deadline" type="date" />
          <Button className="w-full">Create Goal</Button>
        </div>
      </Modal>
    </div>
  );
}
