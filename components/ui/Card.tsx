'use client';

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gold?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', gold, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border p-5
        ${gold
          ? 'border-gold/25 bg-gradient-to-br from-bg-card to-bg-card-hover'
          : 'border-border-default bg-bg-card'
        }
        ${hover ? 'transition-colors hover:bg-bg-card-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
