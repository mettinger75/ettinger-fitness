'use client';

import { useUserStore } from '@/lib/store/useUserStore';
import { useGreeting } from '@/lib/hooks/useGreeting';
import { Badge } from '@/components/ui/Badge';

export function WelcomeBanner() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const greeting = useGreeting();

  return (
    <div
      className="relative rounded-2xl border p-6 lg:p-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0D1A30 0%, ${user.accentColor}12 60%, ${user.accentColor}06 100%)`,
        borderColor: `${user.accentColor}25`,
      }}
    >
      <div
        className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: user.accentColor }}
      />
      <div
        className="absolute -bottom-12 right-28 w-[160px] h-[160px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: user.accentColor }}
      />

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-1">{greeting}</p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-none tracking-wide flex items-center gap-3">
          {user.name.toUpperCase()}
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: user.accentColor, boxShadow: `0 0 12px ${user.accentColor}60` }}
          />
        </h1>
        <p className="text-sm text-text-muted mt-2 max-w-lg leading-relaxed">{user.bio}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {user.badges.map((badge) => (
            <Badge key={badge} label={badge} color={user.accentColor} />
          ))}
          {user.sports.map((sport) => (
            <Badge key={sport} label={sport} color="#7B8FB0" />
          ))}
        </div>
      </div>
    </div>
  );
}
