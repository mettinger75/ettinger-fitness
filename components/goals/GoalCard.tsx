'use client';

import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

interface GoalCardProps {
  title: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
  userName: string;
  userAvatar: string;
  userColor: string;
  deadline?: string;
}

export function GoalCard({
  title,
  category,
  progress,
  target,
  unit,
  userName,
  userAvatar,
  userColor,
  deadline,
}: GoalCardProps) {
  const pct = target > 0 ? Math.round((progress / target) * 100) : 0;

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ backgroundColor: `${userColor}20` }}
          >
            {userAvatar}
          </div>
          <span className="text-xs text-text-muted">{userName}</span>
        </div>
        <Badge label={category} color={userColor} />
      </div>
      <h4 className="text-sm font-semibold text-text-primary mb-2">{title}</h4>
      <ProgressBar value={progress} max={target} color={userColor} />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-text-muted">
          {progress} / {target} {unit}
        </span>
        <span className="text-xs font-medium" style={{ color: userColor }}>
          {pct}%
        </span>
      </div>
      {deadline && (
        <p className="text-xs text-text-dim mt-2">Due: {deadline}</p>
      )}
    </Card>
  );
}
