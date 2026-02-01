'use client';

import { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, options, className = '', id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full rounded-lg border border-border-default bg-bg-secondary px-3.5 py-2.5
          text-sm text-text-primary
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/25
          transition-colors appearance-none
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
