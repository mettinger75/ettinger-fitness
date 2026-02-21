'use client';

import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full rounded-xl border border-glass-border bg-glass px-3.5 py-2.5
          text-sm text-text-primary placeholder:text-text-dim
          focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20
          transition-all backdrop-blur-sm
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
