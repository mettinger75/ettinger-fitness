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
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-border-default rounded-xl">
      <div className="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center mb-4">
        <Icon size={24} className="text-text-dim" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-xs mb-4">{description}</p>
      {action && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
