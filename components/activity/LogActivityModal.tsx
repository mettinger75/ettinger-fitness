'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

interface LogActivityModalProps {
  open: boolean;
  onClose: () => void;
}

export function LogActivityModal({ open, onClose }: LogActivityModalProps) {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const addActivity = useFitnessStore((s) => s.addActivity);

  const activityTypes = (user.trackedActivities.length > 0 ? user.trackedActivities : ['Exercise', 'Training']).map((a) => ({
    value: a,
    label: a,
  }));

  const [activityType, setActivityType] = useState(activityTypes[0]?.value || '');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(today());

  const resetForm = () => {
    setActivityType(activityTypes[0]?.value || '');
    setDuration('');
    setCalories('');
    setNotes('');
    setDate(today());
  };

  const handleSave = () => {
    if (!duration) return;
    addActivity(user.id, {
      date,
      activityType,
      durationMinutes: Number(duration),
      calories: Number(calories) || undefined,
      notes: notes || undefined,
    });
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Log Activity">
      <div className="space-y-4">
        <Select id="activity-type" label="Activity Type" options={activityTypes} value={activityType} onChange={(e) => setActivityType(e.target.value)} />
        <Input id="activity-date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <Input id="activity-duration" label="Duration (min)" type="number" placeholder="30" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Input id="activity-calories" label="Calories (optional)" type="number" placeholder="0" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </div>
        <Input id="activity-notes" label="Notes (optional)" placeholder="How did it go?" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <Button className="w-full" onClick={handleSave}>Log Activity</Button>
      </div>
    </Modal>
  );
}
