'use client';

import { Clock, Flame, Dumbbell } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface Exercise {
  name: string;
  reps: string;
  notes?: string;
}

interface WorkoutPhase {
  name: string;
  duration: string;
  exercises: Exercise[];
}

interface GeneratedWorkoutProps {
  title: string;
  duration: string;
  calories: string;
  difficulty: string;
  phases: WorkoutPhase[];
}

export function GeneratedWorkout({ title, duration, calories, difficulty, phases }: GeneratedWorkoutProps) {
  return (
    <Card gold className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-xl font-display tracking-wide text-gold">{title}</h3>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={14} /> {duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Flame size={14} /> {calories}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Dumbbell size={14} /> {difficulty}
          </div>
        </div>
      </div>

      {/* Phases */}
      {phases.map((phase, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-text-primary">{phase.name}</h4>
            <span className="text-xs text-text-dim">{phase.duration}</span>
          </div>
          <div className="space-y-2">
            {phase.exercises.map((ex, j) => (
              <div
                key={j}
                className="flex items-center justify-between p-3 rounded-lg bg-[rgba(148,163,184,0.08)]"
              >
                <div>
                  <p className="text-sm text-text-primary">{ex.name}</p>
                  {ex.notes && <p className="text-xs text-text-dim mt-0.5">{ex.notes}</p>}
                </div>
                <span className="text-sm font-medium text-gold">{ex.reps}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
}
