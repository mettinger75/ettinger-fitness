'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <MobileSidebar />
      <div className="lg:ml-16">
        <TopBar />
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
