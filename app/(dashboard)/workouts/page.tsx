'use client';

import { useState, useCallback } from 'react';
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

// Exercise pools keyed by equipment type
const EXERCISE_POOL: Record<string, { name: string; reps: string; notes?: string }[]> = {
  barbell: [
    { name: 'Barbell Back Squat', reps: '4 × 8', notes: 'Controlled tempo' },
    { name: 'Barbell Deadlift', reps: '3 × 6', notes: 'Hip hinge, flat back' },
    { name: 'Overhead Press', reps: '4 × 8' },
    { name: 'Barbell Row', reps: '4 × 10' },
    { name: 'Front Squat', reps: '3 × 8' },
    { name: 'Barbell Hip Thrust', reps: '3 × 12' },
  ],
  dumbbell: [
    { name: 'Dumbbell Bench Press', reps: '4 × 10' },
    { name: 'Dumbbell Lunges', reps: '3 × 12 each' },
    { name: 'Dumbbell Shoulder Press', reps: '3 × 10' },
    { name: 'Dumbbell Rows', reps: '3 × 12 each' },
    { name: 'Goblet Squat', reps: '3 × 12' },
    { name: 'Dumbbell RDL', reps: '3 × 10' },
  ],
  kettlebell: [
    { name: 'Kettlebell Swings', reps: '3 × 15' },
    { name: 'Turkish Get-Up', reps: '3 × 3 each' },
    { name: 'Kettlebell Clean & Press', reps: '3 × 8 each' },
    { name: 'Goblet Squat', reps: '3 × 12' },
  ],
  pullup_bar: [
    { name: 'Pull-Ups', reps: '3 × AMRAP', notes: 'Band assist if needed' },
    { name: 'Chin-Ups', reps: '3 × 8' },
    { name: 'Hanging Leg Raises', reps: '3 × 10' },
  ],
  bodyweight: [
    { name: 'Push-Ups', reps: '3 × 15' },
    { name: 'Air Squats', reps: '3 × 20' },
    { name: 'Burpees', reps: '3 × 10' },
    { name: 'Mountain Climbers', reps: '3 × 20 each' },
    { name: 'Plank Hold', reps: '3 × 45 sec' },
    { name: 'Lunges', reps: '3 × 12 each' },
  ],
  bands: [
    { name: 'Banded Pull-Aparts', reps: '3 × 15' },
    { name: 'Banded Squats', reps: '3 × 15' },
    { name: 'Banded Rows', reps: '3 × 12' },
  ],
  cardio: [
    { name: 'Jump Rope', reps: '3 × 2 min' },
    { name: 'Rowing Machine', reps: '500m intervals × 4' },
    { name: 'Bike Sprints', reps: '30 sec on / 30 sec off × 8' },
  ],
};

const WARMUPS = [
  { name: 'Jump Rope', reps: '2 min' },
  { name: 'Arm Circles', reps: '30 sec each' },
  { name: 'Bodyweight Squats', reps: '15 reps' },
  { name: 'Inchworms', reps: '8 reps' },
  { name: 'High Knees', reps: '30 sec' },
  { name: 'Leg Swings', reps: '10 each' },
  { name: 'Cat-Cow Stretch', reps: '10 reps' },
];

const COOLDOWNS = [
  { name: 'Foam Roll Quads & Back', reps: '2 min' },
  { name: 'Pigeon Stretch', reps: '60 sec each' },
  { name: 'Chest Doorway Stretch', reps: '45 sec each' },
  { name: 'Child\'s Pose', reps: '60 sec' },
  { name: 'Hamstring Stretch', reps: '45 sec each' },
  { name: 'Shoulder Cross-Body Stretch', reps: '30 sec each' },
];

const GOAL_TITLES: Record<string, string[]> = {
  strength: ['STRENGTH SURGE', 'POWER BUILDER', 'IRON FOUNDATION', 'HEAVY HITTER'],
  endurance: ['ENDURANCE ENGINE', 'CARDIO CRUSHER', 'STAMINA FORGE', 'BURN CIRCUIT'],
  hypertrophy: ['MUSCLE MAKER', 'VOLUME RUSH', 'GROWTH PROTOCOL', 'PUMP SESSION'],
  fat_loss: ['FAT BLASTER', 'LEAN MACHINE', 'SHRED CIRCUIT', 'METABOLIC BURN'],
  flexibility: ['FLEX FLOW', 'MOBILITY MASTER', 'STRETCH SESSION', 'MOVEMENT RESET'],
  general: ['FULL BODY BLITZ', 'TOTAL CONDITIONING', 'BALANCED BUILD', 'ALL-ROUND FIT'],
};

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateWorkout(equipment: string[], goal: string) {
  const goalKey = goal.toLowerCase().replace(/\s+/g, '_');
  const titles = GOAL_TITLES[goalKey] ?? GOAL_TITLES.general;
  const title = titles[Math.floor(Math.random() * titles.length)];

  // Gather available exercises based on equipment
  const availableExercises: { name: string; reps: string; notes?: string }[] = [];
  const equipKeys = equipment.length > 0 ? equipment.map((e) => e.toLowerCase().replace(/\s+/g, '_')) : ['bodyweight'];
  for (const key of equipKeys) {
    availableExercises.push(...(EXERCISE_POOL[key] ?? []));
  }
  // Always include bodyweight as fallback
  if (!equipKeys.includes('bodyweight')) {
    availableExercises.push(...(EXERCISE_POOL.bodyweight ?? []));
  }

  const mainExercises = pick(availableExercises, Math.min(5, availableExercises.length));
  const warmupExercises = pick(WARMUPS, 4);
  const cooldownExercises = pick(COOLDOWNS, 3);

  const durations = ['35 min', '40 min', '45 min', '50 min'];
  const cals = ['~300 cal', '~350 cal', '~400 cal', '~450 cal', '~500 cal'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const diffIndex = goalKey === 'strength' || goalKey === 'hypertrophy' ? 1 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3);

  return {
    title,
    duration: durations[Math.floor(Math.random() * durations.length)],
    calories: cals[Math.floor(Math.random() * cals.length)],
    difficulty: difficulties[Math.min(diffIndex, 2)],
    phases: [
      { name: 'Warm-Up', duration: '8 min', exercises: warmupExercises },
      { name: 'Main Work', duration: '30 min', exercises: mainExercises },
      { name: 'Cool Down', duration: '7 min', exercises: cooldownExercises },
    ],
  };
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

type Workout = ReturnType<typeof generateWorkout>;

export default function WorkoutsPage() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [saved, setSaved] = useState(false);

  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const addWorkout = useFitnessStore((s) => s.addWorkout);

  const handleGenerate = useCallback(() => {
    setWorkout(generateWorkout(equipment, goal));
    setSaved(false);
  }, [equipment, goal]);

  const handleSave = () => {
    if (!workout) return;
    addWorkout(user.id, {
      date: today(),
      ...workout,
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

      {workout && (
        <>
          <GeneratedWorkout {...workout} />
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
