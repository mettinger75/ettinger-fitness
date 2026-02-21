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
        rounded-2xl p-5 h-full
        ${gold
          ? 'glass-gold'
          : 'glass'
        }
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${onClick && !hover ? 'glass-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
