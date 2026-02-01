'use client';

import { UserPlus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" size="sm">
        <UserPlus size={14} /> Add User
      </Button>
      <Button variant="ghost" size="sm">
        <Settings size={14} /> System Settings
      </Button>
    </div>
  );
}
