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
      className="relative rounded-2xl border border-border-default p-6 sm:p-8 overflow-hidden animate-fade-up"
      style={{
        background: `linear-gradient(135deg, var(--bg-card) 0%, ${user.accentColor}08 100%)`,
        borderColor: `${user.accentColor}20`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full opacity-[0.04]"
        style={{ background: user.accentColor }}
      />
      <div
        className="absolute -bottom-8 right-20 w-[120px] h-[120px] rounded-full opacity-[0.03]"
        style={{ background: user.accentColor }}
      />

      <div className="relative z-10">
        <p className="text-sm text-text-muted">{greeting}</p>
        <h1 className="font-display text-[28px] sm:text-[42px] text-text-primary leading-tight mt-1 flex items-center gap-2">
          {user.name.toUpperCase()}
          <span
            className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
            style={{ background: user.accentColor }}
          />
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-1">{user.bio}</p>
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
