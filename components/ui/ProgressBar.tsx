'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max,
  color = '#C9A227',
  height = 8,
  className = '',
  showLabel,
}: ProgressBarProps) {
  const progress = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ background: 'rgba(148, 163, 184, 0.08)', height }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
          }}
        />
      </div>
    </div>
  );
}
