/**
 * Calculate average of a number array.
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Calculate win/loss record string.
 */
export function winLossRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`;
}

/**
 * Calculate trend direction from an array of values.
 * Returns 'up', 'down', or 'flat'.
 */
export function trend(values: number[]): 'up' | 'down' | 'flat' {
  if (values.length < 2) return 'flat';
  const last = values[values.length - 1];
  const prev = values[values.length - 2];
  if (last > prev) return 'up';
  if (last < prev) return 'down';
  return 'flat';
}

/**
 * Calculate percentage change between two numbers.
 */
export function percentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
