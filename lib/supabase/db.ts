/**
 * Supabase database helpers for the Ettinger Fitness Dashboard.
 *
 * Maps frontend user string IDs ("mark", "eli", etc.) to Supabase UUIDs
 * and provides typed read/write helpers for each table.
 */

import { createClient } from './client';

// Frontend userId -> Supabase profile UUID mapping
export const USER_UUID_MAP: Record<string, string> = {
  mark: '11111111-1111-1111-1111-111111111111',
  gena: '22222222-2222-2222-2222-222222222222',
  eli: '33333333-3333-3333-3333-333333333333',
  gavin: '44444444-4444-4444-4444-444444444444',
  savannah: '55555555-5555-5555-5555-555555555555',
};

export function toUUID(userId: string): string {
  return USER_UUID_MAP[userId] ?? userId;
}

// Reverse map: UUID -> frontend userId
const UUID_TO_USER: Record<string, string> = Object.fromEntries(
  Object.entries(USER_UUID_MAP).map(([k, v]) => [v, k])
);

export function fromUUID(uuid: string): string {
  return UUID_TO_USER[uuid] ?? uuid;
}

function supabase() {
  return createClient();
}

// ─── Profiles ───────────────────────────────────────────────
export async function fetchProfiles() {
  const { data, error } = await supabase()
    .from('profiles')
    .select('*')
    .order('name');
  if (error) console.error('fetchProfiles error:', error);
  return data ?? [];
}

export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  const { error } = await supabase()
    .from('profiles')
    .update(updates)
    .eq('id', toUUID(userId));
  if (error) console.error('updateProfile error:', error);
  return !error;
}

// ─── Activity Log ───────────────────────────────────────────
export async function fetchActivities(userId: string) {
  const { data, error } = await supabase()
    .from('activity_log')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchActivities error:', error);
  return data ?? [];
}

export async function insertActivity(userId: string, activity: {
  date: string;
  activity_type: string;
  duration_minutes: number;
  calories?: number;
  notes?: string;
}) {
  const { data, error } = await supabase()
    .from('activity_log')
    .insert({ ...activity, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertActivity error:', error);
  return data;
}

export async function deleteActivity(activityId: string) {
  const { error } = await supabase()
    .from('activity_log')
    .delete()
    .eq('id', activityId);
  if (error) console.error('deleteActivity error:', error);
  return !error;
}

// ─── Meals ──────────────────────────────────────────────────
export async function fetchMeals(userId: string) {
  const { data, error } = await supabase()
    .from('meals')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchMeals error:', error);
  return data ?? [];
}

export async function insertMeal(userId: string, meal: {
  date: string;
  time?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  const { data, error } = await supabase()
    .from('meals')
    .insert({ ...meal, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertMeal error:', error);
  return data;
}

export async function deleteMeal(mealId: string) {
  const { error } = await supabase()
    .from('meals')
    .delete()
    .eq('id', mealId);
  if (error) console.error('deleteMeal error:', error);
  return !error;
}

// ─── Body Metrics ───────────────────────────────────────────
export async function fetchBodyMetrics(userId: string) {
  const { data, error } = await supabase()
    .from('body_metrics')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchBodyMetrics error:', error);
  return data ?? [];
}

export async function insertBodyMetric(userId: string, metric: {
  date: string;
  weight?: number;
  body_fat_pct?: number;
  resting_hr?: number;
  vo2_max?: number;
  sleep_hours?: number;
}) {
  const { data, error } = await supabase()
    .from('body_metrics')
    .insert({ ...metric, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertBodyMetric error:', error);
  return data;
}

// ─── Goals ──────────────────────────────────────────────────
export async function fetchGoals(userId: string) {
  const { data, error } = await supabase()
    .from('goals')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('created_at', { ascending: false });
  if (error) console.error('fetchGoals error:', error);
  return data ?? [];
}

export async function insertGoal(userId: string, goal: {
  title: string;
  category?: string;
  target_value: number;
  unit?: string;
  due_date?: string;
}) {
  const { data, error } = await supabase()
    .from('goals')
    .insert({
      ...goal,
      user_id: toUUID(userId),
      current_value: 0,
      progress_pct: 0,
      status: 'active',
    })
    .select()
    .single();
  if (error) console.error('insertGoal error:', error);
  return data;
}

export async function updateGoal(goalId: string, updates: Record<string, unknown>) {
  const { error } = await supabase()
    .from('goals')
    .update(updates)
    .eq('id', goalId);
  if (error) console.error('updateGoal error:', error);
  return !error;
}

export async function deleteGoal(goalId: string) {
  const { error } = await supabase()
    .from('goals')
    .delete()
    .eq('id', goalId);
  if (error) console.error('deleteGoal error:', error);
  return !error;
}

// ─── Workouts ───────────────────────────────────────────────
export async function fetchWorkouts(userId: string) {
  const { data, error } = await supabase()
    .from('workouts')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchWorkouts error:', error);
  return data ?? [];
}

export async function insertWorkout(userId: string, workout: {
  date: string;
  name: string;
  workout_type?: string;
  duration_minutes?: number;
  result?: string;
  is_pr?: boolean;
  calories_burned?: number;
  ai_generated?: boolean;
}) {
  const { data, error } = await supabase()
    .from('workouts')
    .insert({ ...workout, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertWorkout error:', error);
  return data;
}

export async function deleteWorkout(workoutId: string) {
  const { error } = await supabase()
    .from('workouts')
    .delete()
    .eq('id', workoutId);
  if (error) console.error('deleteWorkout error:', error);
  return !error;
}

// ─── Swimming ───────────────────────────────────────────────
export async function fetchSwimEvents(userId: string) {
  const { data, error } = await supabase()
    .from('swim_events')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('event_name');
  if (error) console.error('fetchSwimEvents error:', error);
  return data ?? [];
}

export async function fetchSwimMeets(userId: string) {
  const { data, error } = await supabase()
    .from('swim_meets')
    .select('*, swim_results(*)')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchSwimMeets error:', error);
  return data ?? [];
}

export async function fetchSwimTraining(userId: string) {
  const { data, error } = await supabase()
    .from('swim_training')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('week_start', { ascending: false });
  if (error) console.error('fetchSwimTraining error:', error);
  return data ?? [];
}

// ─── Basketball ─────────────────────────────────────────────
export async function fetchBasketballGames(userId: string) {
  const { data, error } = await supabase()
    .from('basketball_games')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('date', { ascending: false });
  if (error) console.error('fetchBasketballGames error:', error);
  return data ?? [];
}

export async function insertBasketballGame(userId: string, game: {
  date: string;
  opponent: string;
  result: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  fg_pct?: number;
  ft_pct?: number;
  minutes?: number;
  season_id?: string;
}) {
  const { data, error } = await supabase()
    .from('basketball_games')
    .insert({ ...game, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertBasketballGame error:', error);
  return data;
}

export async function deleteBasketballGame(gameId: string) {
  const { error } = await supabase()
    .from('basketball_games')
    .delete()
    .eq('id', gameId);
  if (error) console.error('deleteBasketballGame error:', error);
  return !error;
}

// ─── Family Challenges ──────────────────────────────────────
export async function fetchChallenges() {
  const { data, error } = await supabase()
    .from('family_challenges')
    .select('*, challenge_progress(*)')
    .order('created_at', { ascending: false });
  if (error) console.error('fetchChallenges error:', error);
  return data ?? [];
}

export async function insertChallenge(userId: string, challenge: {
  title: string;
  description?: string;
  metric: string;
  target_value: number;
  start_date: string;
  end_date: string;
}) {
  const { data, error } = await supabase()
    .from('family_challenges')
    .insert({ ...challenge, created_by: toUUID(userId), status: 'active' })
    .select()
    .single();
  if (error) console.error('insertChallenge error:', error);
  return data;
}

// ─── Achievements ───────────────────────────────────────────
export async function fetchAchievements(userId: string) {
  const { data, error } = await supabase()
    .from('achievements')
    .select('*')
    .eq('user_id', toUUID(userId))
    .order('earned_at', { ascending: false });
  if (error) console.error('fetchAchievements error:', error);
  return data ?? [];
}

export async function insertAchievement(userId: string, achievement: {
  emoji: string;
  title: string;
  description: string;
}) {
  const { data, error } = await supabase()
    .from('achievements')
    .insert({ ...achievement, user_id: toUUID(userId) })
    .select()
    .single();
  if (error) console.error('insertAchievement error:', error);
  return data;
}
