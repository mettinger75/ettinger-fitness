'use client';

import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Award } from 'lucide-react';

export function RecentAchievements() {
  return (
    <Card>
      <SectionTitle icon={Award} title="Recent Achievements" />
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-3">
          <Award size={22} className="text-text-dim" />
        </div>
        <p className="text-sm font-medium text-text-muted">Achievements unlock as you hit milestones</p>
        <p className="text-xs text-text-dim mt-1">Keep training!</p>
      </div>
    </Card>
  );
}
