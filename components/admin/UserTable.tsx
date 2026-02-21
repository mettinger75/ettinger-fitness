'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { USERS } from '@/lib/constants/users';
import { useUserStore } from '@/lib/store/useUserStore';

export function UserTable() {
  const router = useRouter();
  const { setActiveUser, getUser } = useUserStore();

  function handleRowClick(userId: string) {
    setActiveUser(userId);
    router.push('/profile');
  }

  return (
    <Card>
      <h3 className="text-sm font-medium text-text-muted mb-4">Family Members</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">User</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">Role</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium hidden sm:table-cell">Sports</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium hidden md:table-cell">Badges</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((baseUser) => {
              const user = getUser(baseUser.id);
              return (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  className="border-b border-glass-border/50 hover:bg-bg-card-hover transition-colors cursor-pointer"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: `${user.accentColor}20` }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">{user.name}</p>
                        <p className="text-xs text-text-dim">Age {user.age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-text-muted capitalize">{user.role}</span>
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {user.sports.map((s) => (
                        <Badge key={s} label={s} color={user.accentColor} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {user.badges.map((b) => (
                        <Badge key={b} label={b} color={user.accentColor} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
