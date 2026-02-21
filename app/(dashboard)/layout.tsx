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
      <div className="lg:pl-16 min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8 max-w-[1280px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
