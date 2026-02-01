"use client";

const STATS = [
  { label: "PPG", value: "—", color: "#FB923C" },
  { label: "RPG", value: "—", color: "#3B82F6" },
  { label: "APG", value: "—", color: "#22C55E" },
  { label: "SPG", value: "—", color: "#C9A227" },
  { label: "FG%", value: "—", color: "#38BDF8" },
  { label: "FT%", value: "—", color: "#A78BFA" },
  { label: "Games", value: "—", color: "#94A3B8" },
  { label: "Record", value: "—", color: "#22C55E" },
];

export function SeasonAverages() {
  return (
    <div>
      <p className="text-center text-[12px] text-text-muted mb-4">Log your first game to see season stats!</p>
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-card border border-border-default rounded-xl p-3 text-center hover:bg-bg-card-hover transition-all"
          >
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">{stat.label}</p>
            <p className="font-display text-[20px] sm:text-[24px] leading-none" style={{ color: stat.value === "—" ? "#64748B" : stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
