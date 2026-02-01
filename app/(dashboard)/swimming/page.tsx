"use client";
import { EventTable } from "@/components/swimming/EventTable";
import { TrainingVolumeChart } from "@/components/swimming/TrainingVolumeChart";
import { MeetHistory } from "@/components/swimming/MeetHistory";
import { SplitAnalysis } from "@/components/swimming/SplitAnalysis";
import { Droplets } from "lucide-react";

export default function SwimmingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-sky to-[#7DD3FC] flex items-center justify-center">
          <Droplets size={20} className="text-bg-primary" />
        </div>
        <div>
          <h1 className="font-display text-[22px] sm:text-[28px] tracking-wider text-text-primary">SWIMMING PERFORMANCE</h1>
          <p className="text-[12px] text-text-muted">Eli Ettinger • Lakeside Aquatic Club • Byron Nelson High School</p>
        </div>
      </div>

      {/* Event Table */}
      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <EventTable />
      </div>

      {/* Training + Meets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <TrainingVolumeChart />
        <MeetHistory />
      </div>

      {/* Split Analysis */}
      <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <SplitAnalysis />
      </div>
    </div>
  );
}
