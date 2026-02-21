'use client';

import { GOAL_OPTIONS } from '@/lib/constants/goals';

interface GoalSelectorProps {
  selected: string;
  onChange: (goal: string) => void;
}

export function GoalSelector({ selected, onChange }: GoalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {GOAL_OPTIONS.map((goal) => {
        const isSelected = selected === goal;
        return (
          <button
            key={goal}
            onClick={() => onChange(goal)}
            className={`
              px-3 py-1.5 rounded-lg text-sm transition-colors border cursor-pointer
              ${isSelected
                ? 'border-gold/50 bg-gold/10 text-gold'
                : 'border-glass-border bg-[rgba(148,163,184,0.08)] text-text-muted hover:text-text-primary hover:border-text-dim'
              }
            `}
          >
            {goal}
          </button>
        );
      })}
    </div>
  );
}
