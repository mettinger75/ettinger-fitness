"use client";
import { useUserStore } from "@/lib/store/useUserStore";
import { StatCard } from "@/components/ui/StatCard";
import {
  Dumbbell, Flame, Clock, Activity, Droplets,
  TrendingUp, Award, Target, Star, Trophy, Zap,
} from "lucide-react";

function getStatsForUser(userId: string) {
  switch (userId) {
    case "mark":
      return [
        { icon: Dumbbell, label: "Workouts", value: "—", accentColor: "#C9A227" },
        { icon: Flame, label: "Calories", value: "—", accentColor: "#C9A227" },
        { icon: Clock, label: "Active Min", value: "—", accentColor: "#C9A227" },
        { icon: Activity, label: "Weight", value: "—", accentColor: "#C9A227" },
      ];
    case "gena":
      return [
        { icon: Dumbbell, label: "Workouts", value: "—", accentColor: "#E879A8" },
        { icon: Flame, label: "Calories", value: "—", accentColor: "#E879A8" },
        { icon: Clock, label: "Active Min", value: "—", accentColor: "#E879A8" },
        { icon: Activity, label: "Weight", value: "—", accentColor: "#E879A8" },
      ];
    case "eli":
      return [
        { icon: Droplets, label: "Practices", value: "—", accentColor: "#38BDF8" },
        { icon: TrendingUp, label: "Yardage", value: "—", accentColor: "#38BDF8" },
        { icon: Award, label: "Best Times", value: "5", accentColor: "#38BDF8" },
        { icon: Activity, label: "SWOLF", value: "—", accentColor: "#38BDF8" },
      ];
    case "gavin":
      return [
        { icon: Target, label: "PPG", value: "—", accentColor: "#FB923C" },
        { icon: Star, label: "APG", value: "—", accentColor: "#FB923C" },
        { icon: Trophy, label: "Record", value: "—", accentColor: "#FB923C" },
        { icon: Dumbbell, label: "Practices", value: "—", accentColor: "#FB923C" },
      ];
    case "savannah":
      return [
        { icon: Star, label: "Activities", value: "—", accentColor: "#A78BFA" },
        { icon: Clock, label: "Active Min", value: "—", accentColor: "#A78BFA" },
        { icon: Zap, label: "New Skills", value: "—", accentColor: "#A78BFA" },
        { icon: Trophy, label: "Sports", value: "—", accentColor: "#A78BFA" },
      ];
    default:
      return [
        { icon: Dumbbell, label: "Workouts", value: "—", accentColor: "#C9A227" },
        { icon: Flame, label: "Calories", value: "—", accentColor: "#C9A227" },
        { icon: Clock, label: "Active Min", value: "—", accentColor: "#C9A227" },
        { icon: Activity, label: "Weight", value: "—", accentColor: "#C9A227" },
      ];
  }
}

export function StatsRow() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const stats = getStatsForUser(user.id);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
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
