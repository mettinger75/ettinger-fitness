'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Award, ChevronRight } from 'lucide-react';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore, selectActivities, selectMeals, selectGoals, selectWorkouts, selectGames, selectMetrics } from '@/lib/store/useFitnessStore';

interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export function RecentAchievements() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  const activities = useFitnessStore(selectActivities(user.id));
  const meals = useFitnessStore(selectMeals(user.id));
  const goals = useFitnessStore(selectGoals(user.id));
  const workouts = useFitnessStore(selectWorkouts(user.id));
  const games = useFitnessStore(selectGames(user.id));
  const metrics = useFitnessStore(selectMetrics(user.id));

  const achievements: Achievement[] = [];

  if (activities.length >= 1) achievements.push({ icon: '🎯', title: 'First Activity', description: 'Logged your first activity!' });
  if (activities.length >= 5) achievements.push({ icon: '🔥', title: 'Getting Started', description: '5 activities logged' });
  if (activities.length >= 10) achievements.push({ icon: '💪', title: 'Dedicated', description: '10 activities logged' });
  if (activities.length >= 25) achievements.push({ icon: '⭐', title: 'Committed', description: '25 activities logged' });
  if (meals.length >= 1) achievements.push({ icon: '🥗', title: 'Nutrition Tracker', description: 'Logged your first meal' });
  if (meals.length >= 10) achievements.push({ icon: '🍽️', title: 'Meal Planner', description: '10 meals tracked' });
  if (goals.length >= 1) achievements.push({ icon: '🎯', title: 'Goal Setter', description: 'Created your first goal' });
  if (goals.some((g) => g.status === 'completed')) achievements.push({ icon: '🏆', title: 'Goal Crusher', description: 'Completed a goal!' });
  if (workouts.length >= 1) achievements.push({ icon: '🏋️', title: 'Workout Generator', description: 'Generated your first workout' });
  if (games.length >= 1) achievements.push({ icon: '🏀', title: 'Game On', description: 'Logged your first game' });
  if (games.length >= 5) achievements.push({ icon: '🏅', title: 'Season Starter', description: '5 games logged' });
  if (metrics.length >= 1) achievements.push({ icon: '📊', title: 'Data Driven', description: 'Logged your first body metrics' });

  // Check for streak
  if (activities.length >= 2) {
    const dates = [...new Set(activities.map((a) => a.date))].sort();
    let streak = 1;
    let maxStreak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1;
      }
    }
    if (maxStreak >= 3) achievements.push({ icon: '🔥', title: '3-Day Streak', description: 'Active 3 days in a row!' });
    if (maxStreak >= 7) achievements.push({ icon: '🌟', title: 'Week Warrior', description: '7-day activity streak!' });
  }

  return (
    <Card>
      <Link href="/profile" className="flex items-center gap-2 mb-4 group">
        <Award size={18} style={{ color: user.accentColor }} />
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors">Recent Achievements</h3>
        <ChevronRight size={14} className="ml-auto text-text-dim opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      {achievements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-3">
            <Award size={22} className="text-text-dim" />
          </div>
          <p className="text-sm font-medium text-text-muted">Achievements unlock as you hit milestones</p>
          <p className="text-xs text-text-dim mt-1">Keep training!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.slice(0, 6).map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5">
              <span className="text-lg">{a.icon}</span>
              <div>
                <p className="text-sm text-text-primary font-medium">{a.title}</p>
                <p className="text-xs text-text-dim">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
