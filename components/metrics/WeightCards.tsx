'use client';

import { useState } from 'react';
import { Scale, Target } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function WeightCards() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Scale} label="Current Weight" value="—" />
        <StatCard icon={Target} label="Goal Weight" value="—" />
        <StatCard icon={Scale} label="Body Fat %" value="—" />
        <div
          onClick={() => setModalOpen(true)}
          className="rounded-xl border-2 border-dashed border-border-default p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors"
        >
          <span className="text-2xl text-text-dim mb-1">+</span>
          <span className="text-xs text-text-muted">Log Metrics</span>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Log Metrics">
        <div className="space-y-4">
          <Input id="weight" label="Weight (lbs)" type="number" placeholder="0" />
          <Input id="bodyfat" label="Body Fat %" type="number" placeholder="0" />
          <div className="grid grid-cols-2 gap-3">
            <Input id="chest" label="Chest (in)" type="number" placeholder="0" />
            <Input id="waist" label="Waist (in)" type="number" placeholder="0" />
            <Input id="hips" label="Hips (in)" type="number" placeholder="0" />
            <Input id="arms" label="Arms (in)" type="number" placeholder="0" />
          </div>
          <Button className="w-full">Save Measurements</Button>
        </div>
      </Modal>
    </>
  );
}
