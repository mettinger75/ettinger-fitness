"use client";
import { useState } from "react";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Will wire to Supabase auth
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-4">
            <Zap size={32} className="text-bg-primary" />
          </div>
          <h1 className="font-display text-[32px] tracking-wider text-text-primary">ETTINGER FITNESS</h1>
          <p className="text-[13px] text-text-muted mt-1">Family Fitness Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-bg-card border border-border-default rounded-2xl p-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-bg-primary border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-bg-primary border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-display text-[14px] tracking-widest bg-gradient-to-br from-gold to-gold-light text-bg-primary shadow-[0_4px_24px_rgba(201,162,39,0.4)] hover:shadow-[0_6px_32px_rgba(201,162,39,0.5)] transition-all disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        <p className="text-center text-[11px] text-text-dim mt-6">Ettinger Family • Private Dashboard</p>
      </div>
    </div>
  );
}
