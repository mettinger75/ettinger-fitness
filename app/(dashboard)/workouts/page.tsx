'use client';

import { useState } from 'react';
import { Sparkles, Save } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EquipmentSelector } from '@/components/workouts/EquipmentSelector';
import { GoalSelector } from '@/components/workouts/GoalSelector';
import { GenerateButton } from '@/components/workouts/GenerateButton';
import { GeneratedWorkout } from '@/components/workouts/GeneratedWorkout';
import { RecentWods } from '@/components/workouts/RecentWods';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

const SAMPLE_WORKOUT = {
  title: 'FULL BODY BLITZ',
  duration: '45 min',
  calories: '~400 cal',
  difficulty: 'Intermediate',
  phases: [
    {
      name: 'Warm-Up',
      duration: '8 min',
      exercises: [
        { name: 'Jump Rope', reps: '2 min' },
        { name: 'Arm Circles', reps: '30 sec each' },
        { name: 'Bodyweight Squats', reps: '15 reps' },
        { name: 'Inchworms', reps: '8 reps' },
      ],
    },
    {
      name: 'Main Work',
      duration: '30 min',
      exercises: [
        { name: 'Barbell Back Squat', reps: '4 × 8', notes: 'Moderate weight, controlled tempo' },
        { name: 'Dumbbell Bench Press', reps: '4 × 10' },
        { name: 'Kettlebell Swings', reps: '3 × 15' },
        { name: 'Pull-Ups', reps: '3 × AMRAP', notes: 'Use band assist if needed' },
        { name: 'Dumbbell Lunges', reps: '3 × 12 each' },
      ],
    },
    {
      name: 'Cool Down',
      duration: '7 min',
      exercises: [
        { name: 'Foam Roll Quads & Back', reps: '2 min' },
        { name: 'Pigeon Stretch', reps: '60 sec each' },
        { name: 'Chest Doorway Stretch', reps: '45 sec each' },
      ],
    },
  ],
};

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export default function WorkoutsPage() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);

  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const addWorkout = useFitnessStore((s) => s.addWorkout);

  const handleGenerate = () => {
    setGenerated(true);
    setSaved(false);
  };

  const handleSave = () => {
    addWorkout(user.id, {
      date: today(),
      ...SAMPLE_WORKOUT,
    });
    setSaved(true);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="space-y-6">
        <SectionTitle icon={Sparkles} title="AI Workout Generator" />

        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Available Equipment</h3>
          <EquipmentSelector selected={equipment} onChange={setEquipment} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Training Goal</h3>
          <GoalSelector selected={goal} onChange={setGoal} />
        </div>

        <GenerateButton onClick={handleGenerate} disabled={!goal} />
      </div>

      {generated && (
        <>
          <GeneratedWorkout {...SAMPLE_WORKOUT} />
          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saved}>
              <Save size={14} /> {saved ? 'Saved!' : 'Save Workout'}
            </Button>
          </div>
        </>
      )}

      <RecentWods />
    </div>
  );
}
