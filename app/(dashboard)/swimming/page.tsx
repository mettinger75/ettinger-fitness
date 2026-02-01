"use client";
import { EventTable } from "@/components/swimming/EventTable";
import { TrainingVolumeChart } from "@/components/swimming/TrainingVolumeChart";
import { MeetHistory } from "@/components/swimming/MeetHistory";
import { SplitAnalysis } from "@/components/swimming/SplitAnalysis";
import { Droplets } from "lucide-react";

export default function SwimmingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-sky to-[#7DD3FC] flex items-center justify-center">
          <Droplets size={20} className="text-bg-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl tracking-wider text-text-primary">SWIMMING PERFORMANCE</h1>
          <p className="text-xs text-text-muted">Eli Ettinger &bull; LAC-NT Swim Team &bull; 21 Months Competitive</p>
        </div>
      </div>

      <EventTable />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrainingVolumeChart />
        <SplitAnalysis />
      </div>

      <MeetHistory />
    </div>
  );
}
