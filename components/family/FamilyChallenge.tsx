'use client';

import { useState } from 'react';
import { Swords, Plus } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function FamilyChallenge() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <SectionTitle
        icon={Swords}
        title="Family Challenges"
        action={
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> New Challenge
          </Button>
        }
      />

      <EmptyState
        icon={Swords}
        title="No active challenges"
        description="Start a family fitness challenge to keep everyone motivated!"
        action="Create Challenge"
        onAction={() => setModalOpen(true)}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Family Challenge">
        <div className="space-y-4">
          <Input id="challenge-title" label="Challenge Name" placeholder="e.g., 30-Day Step Challenge" />
          <Input id="challenge-desc" label="Description" placeholder="Description of the challenge" />
          <div className="grid grid-cols-2 gap-3">
            <Input id="challenge-start" label="Start Date" type="date" />
            <Input id="challenge-end" label="End Date" type="date" />
          </div>
          <Button className="w-full">Create Challenge</Button>
        </div>
      </Modal>
    </div>
  );
}
