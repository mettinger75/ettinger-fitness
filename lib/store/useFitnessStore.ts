'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Activity,
  Workout,
  Meal,
  BodyMetric,
  Goal,
  BasketballGame,
} from '@/lib/types/fitness';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

// Empty arrays for stable references when user has no data
const EMPTY_ACTIVITIES: Activity[] = [];
const EMPTY_WORKOUTS: Workout[] = [];
const EMPTY_MEALS: Meal[] = [];
const EMPTY_METRICS: BodyMetric[] = [];
const EMPTY_GOALS: Goal[] = [];
const EMPTY_GAMES: BasketballGame[] = [];

interface FitnessState {
  activities: Record<string, Activity[]>;
  workouts: Record<string, Workout[]>;
  meals: Record<string, Meal[]>;
  metrics: Record<string, BodyMetric[]>;
  goals: Record<string, Goal[]>;
  basketballGames: Record<string, BasketballGame[]>;

  // Activity CRUD
  addActivity: (userId: string, data: Omit<Activity, 'id' | 'userId'>) => void;
  deleteActivity: (userId: string, activityId: string) => void;

  // Workout CRUD
  addWorkout: (userId: string, data: Omit<Workout, 'id' | 'userId'>) => void;
  deleteWorkout: (userId: string, workoutId: string) => void;

  // Meal CRUD
  addMeal: (userId: string, data: Omit<Meal, 'id' | 'userId'>) => void;
  deleteMeal: (userId: string, mealId: string) => void;

  // Metric CRUD
  addMetric: (userId: string, data: Omit<BodyMetric, 'id' | 'userId'>) => void;

  // Goal CRUD
  addGoal: (userId: string, data: Omit<Goal, 'id' | 'userId' | 'currentValue' | 'status' | 'createdAt'>) => void;
  updateGoal: (userId: string, goalId: string, updates: Partial<Pick<Goal, 'currentValue' | 'status'>>) => void;
  deleteGoal: (userId: string, goalId: string) => void;

  // Basketball CRUD
  addBasketballGame: (userId: string, data: Omit<BasketballGame, 'id' | 'userId'>) => void;
  deleteBasketballGame: (userId: string, gameId: string) => void;
}

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set) => ({
      activities: {},
      workouts: {},
      meals: {},
      metrics: {},
      goals: {},
      basketballGames: {},

      // Activities
      addActivity: (userId, data) =>
        set((state) => ({
          activities: {
            ...state.activities,
            [userId]: [
              { ...data, id: generateId(), userId },
              ...(state.activities[userId] ?? []),
            ],
          },
        })),
      deleteActivity: (userId, activityId) =>
        set((state) => ({
          activities: {
            ...state.activities,
            [userId]: (state.activities[userId] ?? []).filter((a) => a.id !== activityId),
          },
        })),

      // Workouts
      addWorkout: (userId, data) =>
        set((state) => ({
          workouts: {
            ...state.workouts,
            [userId]: [
              { ...data, id: generateId(), userId },
              ...(state.workouts[userId] ?? []),
            ],
          },
        })),
      deleteWorkout: (userId, workoutId) =>
        set((state) => ({
          workouts: {
            ...state.workouts,
            [userId]: (state.workouts[userId] ?? []).filter((w) => w.id !== workoutId),
          },
        })),

      // Meals
      addMeal: (userId, data) =>
        set((state) => ({
          meals: {
            ...state.meals,
            [userId]: [
              { ...data, id: generateId(), userId },
              ...(state.meals[userId] ?? []),
            ],
          },
        })),
      deleteMeal: (userId, mealId) =>
        set((state) => ({
          meals: {
            ...state.meals,
            [userId]: (state.meals[userId] ?? []).filter((m) => m.id !== mealId),
          },
        })),

      // Metrics
      addMetric: (userId, data) =>
        set((state) => ({
          metrics: {
            ...state.metrics,
            [userId]: [
              { ...data, id: generateId(), userId },
              ...(state.metrics[userId] ?? []),
            ],
          },
        })),

      // Goals
      addGoal: (userId, data) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [userId]: [
              { ...data, id: generateId(), userId, currentValue: 0, status: 'active' as const, createdAt: today() },
              ...(state.goals[userId] ?? []),
            ],
          },
        })),
      updateGoal: (userId, goalId, updates) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [userId]: (state.goals[userId] ?? []).map((g) =>
              g.id === goalId ? { ...g, ...updates } : g
            ),
          },
        })),
      deleteGoal: (userId, goalId) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [userId]: (state.goals[userId] ?? []).filter((g) => g.id !== goalId),
          },
        })),

      // Basketball
      addBasketballGame: (userId, data) =>
        set((state) => ({
          basketballGames: {
            ...state.basketballGames,
            [userId]: [
              { ...data, id: generateId(), userId },
              ...(state.basketballGames[userId] ?? []),
            ],
          },
        })),
      deleteBasketballGame: (userId, gameId) =>
        set((state) => ({
          basketballGames: {
            ...state.basketballGames,
            [userId]: (state.basketballGames[userId] ?? []).filter((g) => g.id !== gameId),
          },
        })),
    }),
    {
      name: 'ettinger-fitness-data',
    }
  )
);

// Stable selector helpers — these return the stored array or a stable empty array
// Use these in components: useFitnessStore(selectActivities(userId))
export const selectActivities = (userId: string) => (s: FitnessState) => s.activities[userId] ?? EMPTY_ACTIVITIES;
export const selectWorkouts = (userId: string) => (s: FitnessState) => s.workouts[userId] ?? EMPTY_WORKOUTS;
export const selectMeals = (userId: string) => (s: FitnessState) => s.meals[userId] ?? EMPTY_MEALS;
export const selectMetrics = (userId: string) => (s: FitnessState) => s.metrics[userId] ?? EMPTY_METRICS;
export const selectGoals = (userId: string) => (s: FitnessState) => s.goals[userId] ?? EMPTY_GOALS;
export const selectGames = (userId: string) => (s: FitnessState) => s.basketballGames[userId] ?? EMPTY_GAMES;
