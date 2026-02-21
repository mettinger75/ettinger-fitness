'use client';

import { type LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, action, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-3">
        <Icon size={22} className="text-text-dim" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-muted max-w-[240px] leading-relaxed">{description}</p>
      {action && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-4">
          {action}
        </Button>
      )}
    </div>
  );
}
