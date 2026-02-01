"use client";
import { SeasonAverages } from "@/components/basketball/SeasonAverages";
import { GameLog } from "@/components/basketball/GameLog";
import { ScoringTrend } from "@/components/basketball/ScoringTrend";
import { Target } from "lucide-react";

export default function BasketballPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange to-[#FDBA74] flex items-center justify-center">
          <Target size={20} className="text-bg-primary" />
        </div>
        <div>
          <h1 className="font-display text-[22px] sm:text-[28px] tracking-wider text-text-primary">BASKETBALL PERFORMANCE</h1>
          <p className="text-[12px] text-text-muted">Gavin Ettinger • Point Guard</p>
        </div>
      </div>

      {/* Season Averages */}
      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <SeasonAverages />
      </div>

      {/* Game Log */}
      <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <GameLog />
      </div>

      {/* Scoring Trend */}
      <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <ScoringTrend />
      </div>
    </div>
  );
}
