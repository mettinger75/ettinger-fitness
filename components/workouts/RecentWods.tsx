'use client';

import { useState } from 'react';
import { History, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card } from '@/components/ui/Card';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectWorkouts } from '@/lib/store/useFitnessStore';

export function RecentWods() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const workouts = useFitnessStore(selectWorkouts(user.id));
  const deleteWorkout = useFitnessStore((s) => s.deleteWorkout);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <SectionTitle icon={History} title="Recent Workouts" />
      {workouts.length === 0 ? (
        <EmptyState
          icon={History}
          title="No workouts yet"
          description="Generated workouts will appear here. Create your first one above!"
        />
      ) : (
        <div className="space-y-3 mt-4">
          {workouts.slice(0, 5).map((w) => (
            <Card key={w.id}>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(expanded === w.id ? null : w.id)}
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{w.title}</p>
                  <p className="text-xs text-text-dim">{w.date} &bull; {w.duration} &bull; {w.difficulty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteWorkout(user.id, w.id); }}
                    className="text-text-dim hover:text-accent-red transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  {expanded === w.id ? <ChevronUp size={16} className="text-text-dim" /> : <ChevronDown size={16} className="text-text-dim" />}
                </div>
              </div>
              {expanded === w.id && (
                <div className="mt-4 space-y-4 border-t border-glass-border pt-4">
                  {w.phases.map((phase, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <p className="text-xs font-medium text-text-muted uppercase">{phase.name}</p>
                        <p className="text-xs text-text-dim">{phase.duration}</p>
                      </div>
                      <div className="space-y-1.5">
                        {phase.exercises.map((ex, j) => (
                          <div key={j} className="flex justify-between text-sm py-1">
                            <span className="text-text-primary">{ex.name}</span>
                            <span className="text-gold text-xs">{ex.reps}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
