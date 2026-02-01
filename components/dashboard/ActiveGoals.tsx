'use client';

import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Trophy, Circle, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';
import Link from 'next/link';

export function ActiveGoals() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const allGoals = useFitnessStore((s) => s.getGoalsForUser(user.id));
  const goals = allGoals.slice(0, 5);

  return (
    <Card gold>
      <SectionTitle icon={Trophy} title="Active Goals" />
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
            <Trophy size={22} className="text-gold/50" />
          </div>
          <p className="text-sm font-medium text-text-muted">No goals set yet</p>
          <p className="text-xs text-text-dim mt-1">
            <Link href="/goals" className="text-gold hover:text-gold-light transition-colors">Create your first goal!</Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const pct = goal.targetValue > 0 ? Math.min((goal.currentValue / goal.targetValue) * 100, 100) : 0;
            return (
              <div key={goal.id} className="space-y-1.5">
                <div className="flex items-center gap-3">
                  {goal.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-accent-green shrink-0" />
                  ) : (
                    <Circle size={18} className="text-text-dim shrink-0" />
                  )}
                  <span className={`text-[13px] flex-1 ${goal.status === 'completed' ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {goal.title}
                  </span>
                  <span className="text-xs text-text-dim">{pct.toFixed(0)}%</span>
                </div>
                {goal.status !== 'completed' && (
                  <div className="ml-[30px] h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: user.accentColor }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {allGoals.length > 5 && (
            <Link href="/goals" className="block text-center text-xs text-gold hover:text-gold-light transition-colors mt-2">
              View all {allGoals.length} goals
            </Link>
          )}
        </div>
      )}
    </Card>
  );
}
