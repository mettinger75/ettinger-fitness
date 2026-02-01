"use client";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { Trophy, Circle, CheckCircle2 } from "lucide-react";

export function ActiveGoals() {
  // No goals seeded
  const goals: { title: string; completed: boolean }[] = [];

  return (
    <Card gold>
      <SectionTitle icon={Trophy} title="Active Goals" />
      {goals.length === 0 ? (
        <div className="text-center py-8">
          <Trophy size={36} className="text-text-dim mx-auto mb-3" />
          <p className="text-sm text-text-muted">No goals set yet</p>
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
              <span className={`text-[13px] ${goal.completed ? "text-text-muted line-through" : "text-text-primary"}`}>
                {goal.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
