"use client";
import { useUserStore } from "@/lib/store/useUserStore";
import { useFitnessStore, selectActivities, selectMeals, selectMetrics, selectWorkouts, selectGames } from "@/lib/store/useFitnessStore";
import { StatCard } from "@/components/ui/StatCard";
import {
  Dumbbell, Flame, Clock, Activity, Droplets,
  TrendingUp, Award, Target, Star, Trophy, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function startOfWeek(): string {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().split("T")[0];
}

interface StatDef {
  icon: LucideIcon;
  label: string;
  value: string;
  accentColor: string;
}

export function StatsRow() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  const activities = useFitnessStore(selectActivities(user.id));
  const allMeals = useFitnessStore(selectMeals(user.id));
  const meals = allMeals.filter((m) => m.date === today());
  const metrics = useFitnessStore(selectMetrics(user.id));
  const workouts = useFitnessStore(selectWorkouts(user.id));
  const games = useFitnessStore(selectGames(user.id));

  const weekStart = startOfWeek();
  const weekActivities = activities.filter((a) => a.date >= weekStart);
  const weekWorkouts = workouts.filter((w) => w.date >= weekStart);
  const todayCalories = meals.reduce((s, m) => s + m.calories, 0);
  const weekMinutes = weekActivities.reduce((s, a) => s + a.durationMinutes, 0);
  const latestWeight = metrics[0]?.weight;

  const c = user.accentColor;

  let stats: StatDef[];

  switch (user.id) {
    case "eli":
      stats = [
        { icon: Droplets, label: "Practices", value: weekActivities.length > 0 ? String(weekActivities.length) : "—", accentColor: c },
        { icon: TrendingUp, label: "Yardage", value: "—", accentColor: c },
        { icon: Award, label: "Best Times", value: "5", accentColor: c },
        { icon: Activity, label: "SWOLF", value: "—", accentColor: c },
      ];
      break;
    case "gavin": {
      const n = games.length;
      const ppg = n > 0 ? (games.reduce((s, g) => s + g.points, 0) / n).toFixed(1) : "—";
      const apg = n > 0 ? (games.reduce((s, g) => s + g.assists, 0) / n).toFixed(1) : "—";
      const wins = games.filter((g) => g.result.toUpperCase().startsWith("W")).length;
      const record = n > 0 ? `${wins}-${n - wins}` : "—";
      stats = [
        { icon: Target, label: "PPG", value: ppg, accentColor: c },
        { icon: Star, label: "APG", value: apg, accentColor: c },
        { icon: Trophy, label: "Record", value: record, accentColor: c },
        { icon: Dumbbell, label: "Practices", value: weekActivities.length > 0 ? String(weekActivities.length) : "—", accentColor: c },
      ];
      break;
    }
    case "savannah": {
      const types = new Set(activities.map((a) => a.activityType));
      stats = [
        { icon: Star, label: "Activities", value: weekActivities.length > 0 ? String(weekActivities.length) : "—", accentColor: c },
        { icon: Clock, label: "Active Min", value: weekMinutes > 0 ? String(weekMinutes) : "—", accentColor: c },
        { icon: Zap, label: "New Skills", value: types.size > 0 ? String(types.size) : "—", accentColor: c },
        { icon: Trophy, label: "Sports", value: String(user.sports.length), accentColor: c },
      ];
      break;
    }
    default: {
      // mark, gena, and fallback
      const totalWorkouts = weekWorkouts.length + weekActivities.length;
      stats = [
        { icon: Dumbbell, label: "Workouts", value: totalWorkouts > 0 ? String(totalWorkouts) : "—", accentColor: c },
        { icon: Flame, label: "Calories", value: todayCalories > 0 ? String(todayCalories) : "—", accentColor: c },
        { icon: Clock, label: "Active Min", value: weekMinutes > 0 ? String(weekMinutes) : "—", accentColor: c },
        { icon: Activity, label: "Weight", value: latestWeight ? `${latestWeight}` : "—", accentColor: c },
      ];
      break;
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          accentColor={stat.accentColor}
        />
      ))}
    </div>
  );
}
