'use client';

import { type ReactNode } from 'react';
import { useUserStore } from '@/lib/store/useUserStore';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface SportGuardProps {
  requiredSport?: string;
  requiredRole?: 'parent' | 'child';
  children: ReactNode;
}

export function SportGuard({ requiredSport, requiredRole, children }: SportGuardProps) {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  const hasSport = !requiredSport || user.sports.includes(requiredSport);
  const hasRole = !requiredRole || user.role === requiredRole;

  if (!hasSport || !hasRole) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-up">
        <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center mb-4">
          <ShieldAlert size={26} className="text-text-dim" />
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          Page not available for {user.name}
        </h2>
        <p className="text-sm text-text-muted max-w-xs leading-relaxed mb-6">
          {requiredSport && !hasSport
            ? `This page requires the ${requiredSport} sport profile. Switch to a user with ${requiredSport} to access this page.`
            : `This page requires ${requiredRole} access.`}
        </p>
        <Link
          href="/dashboard"
          className="text-sm text-gold hover:text-gold-light transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
