'use client';

import { useState } from 'react';
import { Scale, Target } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectMetrics } from '@/lib/store/useFitnessStore';
import { insertBodyMetric } from '@/lib/supabase/db';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function WeightCards() {
  const [modalOpen, setModalOpen] = useState(false);
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const metrics = useFitnessStore(selectMetrics(user.id));
  const addMetric = useFitnessStore((s) => s.addMetric);

  const latest = metrics[0];

  const [weight, setWeight] = useState('');
  const [bodyfat, setBodyfat] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [arms, setArms] = useState('');

  const resetForm = () => {
    setWeight('');
    setBodyfat('');
    setChest('');
    setWaist('');
    setHips('');
    setArms('');
  };

  const handleSave = () => {
    const metricData = {
      date: today(),
      weight: Number(weight) || undefined,
      bodyFatPct: Number(bodyfat) || undefined,
      chest: Number(chest) || undefined,
      waist: Number(waist) || undefined,
      hips: Number(hips) || undefined,
      arms: Number(arms) || undefined,
    };
    addMetric(user.id, metricData);
    // Also persist to Supabase
    insertBodyMetric(user.id, {
      date: today(),
      weight: Number(weight) || undefined,
      body_fat_pct: Number(bodyfat) || undefined,
    }).catch(() => {});
    resetForm();
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Scale} label="Current Weight" value={latest?.weight ? `${latest.weight} lbs` : '—'} />
        <StatCard icon={Target} label="Goal Weight" value="—" />
        <StatCard icon={Scale} label="Body Fat %" value={latest?.bodyFatPct ? `${latest.bodyFatPct}%` : '—'} />
        <div
          onClick={() => setModalOpen(true)}
          className="rounded-xl border-2 border-dashed border-glass-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors"
        >
          <span className="text-2xl text-text-dim mb-1">+</span>
          <span className="text-xs text-text-muted">Log Metrics</span>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Log Metrics"
        footer={<Button className="w-full" onClick={handleSave}>Save Measurements</Button>}
      >
        <div className="space-y-4">
          <Input id="weight" label="Weight (lbs)" type="number" inputMode="decimal" placeholder="0" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Input id="bodyfat" label="Body Fat %" type="number" inputMode="decimal" placeholder="0" value={bodyfat} onChange={(e) => setBodyfat(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="chest" label="Chest (in)" type="number" inputMode="decimal" placeholder="0" value={chest} onChange={(e) => setChest(e.target.value)} />
            <Input id="waist" label="Waist (in)" type="number" inputMode="decimal" placeholder="0" value={waist} onChange={(e) => setWaist(e.target.value)} />
            <Input id="hips" label="Hips (in)" type="number" inputMode="decimal" placeholder="0" value={hips} onChange={(e) => setHips(e.target.value)} />
            <Input id="arms" label="Arms (in)" type="number" inputMode="decimal" placeholder="0" value={arms} onChange={(e) => setArms(e.target.value)} />
          </div>
        </div>
      </Modal>
    </>
  );
}
