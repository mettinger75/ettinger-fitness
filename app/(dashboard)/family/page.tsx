'use client';

import { Users } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FamilyMemberCard } from '@/components/family/FamilyMemberCard';
import { FamilyChallenge } from '@/components/family/FamilyChallenge';
import { useUserStore } from '@/lib/store/useUserStore';
import { USERS } from '@/lib/constants/users';

export default function FamilyPage() {
  const setActiveUser = useUserStore((s) => s.setActiveUser);

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionTitle icon={Users} title="Family Hub" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {USERS.map((user) => (
          <FamilyMemberCard
            key={user.id}
            user={user}
            onClick={() => setActiveUser(user.id)}
          />
        ))}
      </div>

      <FamilyChallenge />
    </div>
  );
}
