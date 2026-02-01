export const GOAL_OPTIONS = [
  'Build Muscle',
  'Lose Fat',
  'Improve Endurance',
  'Increase Strength',
  'Boost Mobility',
  'Sport Performance',
  'General Fitness',
  'Recovery',
  'Mental Health',
] as const;

export type FitnessGoal = (typeof GOAL_OPTIONS)[number];
