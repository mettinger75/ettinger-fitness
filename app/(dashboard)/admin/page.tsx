'use client';

import { Shield } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { UserTable } from '@/components/admin/UserTable';
import { AdminActions } from '@/components/admin/AdminActions';

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SectionTitle icon={Shield} title="Admin Panel" />
        <AdminActions />
      </div>
      <UserTable />
    </div>
  );
}
