'use client';

import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
  className?: string;
}

export function SectionTitle({ icon: Icon, title, action, className = '' }: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-2.5">
        <Icon size={20} className="text-gold" />
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      {action}
    </div>
  );
}
