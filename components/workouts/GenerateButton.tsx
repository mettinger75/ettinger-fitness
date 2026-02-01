'use client';

import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function GenerateButton({ onClick, loading, disabled }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="
        w-full py-4 rounded-xl font-semibold text-bg-primary text-lg cursor-pointer
        bg-gradient-to-r from-gold to-gold-light
        hover:from-gold-light hover:to-gold
        transition-all disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2.5
      "
    >
      <Sparkles size={20} />
      {loading ? 'Generating...' : 'Generate Workout'}
    </button>
  );
}
