'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { UserProfile } from '@/lib/constants/users';

interface FamilyMemberCardProps {
  user: UserProfile;
  onClick: () => void;
}

export function FamilyMemberCard({ user, onClick }: FamilyMemberCardProps) {
  return (
    <Card hover onClick={onClick}>
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${user.accentColor}15` }}
        >
          {user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary">{user.name}</h3>
          <p className="text-xs text-text-muted mt-0.5 truncate">{user.bio}</p>
          <div className="flex gap-1.5 mt-2">
            {user.badges.map((badge) => (
              <Badge key={badge} label={badge} color={user.accentColor} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
