"use client";
import { useUserStore } from "@/lib/store/useUserStore";
import { SportGuard } from "@/components/guards/SportGuard";
import { SeasonAverages } from "@/components/basketball/SeasonAverages";
import { GameLog } from "@/components/basketball/GameLog";
import { ScoringTrend } from "@/components/basketball/ScoringTrend";
import { Target } from "lucide-react";

export default function BasketballPage() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  return (
    <SportGuard requiredSport="Basketball">
      <div className="space-y-6">
        <div className="flex items-center gap-3 animate-fade-up">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange to-accent-orange/60 flex items-center justify-center">
            <Target size={20} className="text-bg-primary" />
          </div>
          <div>
            <h1 className="font-display text-[22px] sm:text-[28px] tracking-wider text-text-primary">BASKETBALL PERFORMANCE</h1>
            <p className="text-[12px] text-text-muted">{user.name} Ettinger &bull; Point Guard</p>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <SeasonAverages />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <GameLog />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <ScoringTrend />
        </div>
      </div>
    </SportGuard>
  );
}
