'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { USERS } from '@/lib/constants/users';

export function UserTable() {
  return (
    <Card>
      <h3 className="text-sm font-medium text-text-muted mb-4">Family Members</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-default">
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">User</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium">Role</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium hidden sm:table-cell">Sports</th>
              <th className="text-left py-2.5 text-xs text-text-dim font-medium hidden md:table-cell">Badges</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id} className="border-b border-border-default/50 hover:bg-bg-card-hover transition-colors">
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
                  <div className="flex gap-1">
                    {user.sports.map((s) => (
                      <Badge key={s} label={s} color={user.accentColor} />
                    ))}
                  </div>
                </td>
                <td className="py-3 hidden md:table-cell">
                  <div className="flex gap-1">
                    {user.badges.map((b) => (
                      <Badge key={b} label={b} color={user.accentColor} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
