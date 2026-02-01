'use client';

import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Trophy, Circle, CheckCircle2 } from 'lucide-react';

export function ActiveGoals() {
  const goals: { title: string; completed: boolean }[] = [];

  return (
    <Card gold>
      <SectionTitle icon={Trophy} title="Active Goals" />
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
            <Trophy size={22} className="text-gold/50" />
          </div>
          <p className="text-sm font-medium text-text-muted">No goals set yet</p>
          <p className="text-xs text-text-dim mt-1">Create your first goal!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal, i) => (
            <div key={i} className="flex items-center gap-3">
              {goal.completed ? (
                <CheckCircle2 size={18} className="text-accent-green shrink-0" />
              ) : (
                <Circle size={18} className="text-text-dim shrink-0" />
              )}
              <span className={`text-[13px] ${goal.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                {goal.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
