/**
 * Format swim time from seconds to display string.
 * e.g. 48.39 → "48.39", 105.29 → "1:45.29"
 */
export function formatSwimTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(2);
  }
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2).padStart(5, '0');
  return `${mins}:${secs}`;
}

/**
 * Format a date to a relative string or short date.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Format a number with commas.
 */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}
