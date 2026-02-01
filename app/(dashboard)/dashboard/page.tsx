"use client";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { WeeklyActivityChart } from "@/components/dashboard/WeeklyActivityChart";
import { ActiveGoals } from "@/components/dashboard/ActiveGoals";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { RecentAchievements } from "@/components/dashboard/RecentAchievements";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <StatsRow />
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <WeeklyActivityChart />
        <ActiveGoals />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <RecentAchievements />
      </div>
    </div>
  );
}
