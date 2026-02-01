"use client";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Award } from "lucide-react";

export function RecentAchievements() {
  return (
    <Card>
      <SectionTitle icon={Award} title="Recent Achievements" />
      <div className="text-center py-8">
        <Award size={36} className="text-text-dim mx-auto mb-3" />
        <p className="text-sm text-text-muted">Achievements unlock as you hit milestones</p>
        <p className="text-xs text-text-dim mt-1">Keep training!</p>
      </div>
    </Card>
  );
}
