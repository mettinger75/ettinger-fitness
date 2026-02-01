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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-2">
          <ActiveGoals />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <RecentAchievements />
      </div>
    </div>
  );
}
