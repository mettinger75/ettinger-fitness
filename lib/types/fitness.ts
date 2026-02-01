export interface Activity {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  activityType: string;
  durationMinutes: number;
  calories?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  date: string;
  title: string;
  duration: string;
  calories: string;
  difficulty: string;
  phases: WorkoutPhase[];
}

export interface WorkoutPhase {
  name: string;
  duration: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  name: string;
  reps: string;
  notes?: string;
}

export interface Meal {
  id: string;
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface BodyMetric {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  bodyFatPct?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: 'active' | 'completed' | 'paused';
  dueDate?: string;
  createdAt: string;
}

export interface BasketballGame {
  id: string;
  userId: string;
  date: string;
  opponent: string;
  result: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fgPct: number;
  ftPct: number;
  minutes: number;
}
