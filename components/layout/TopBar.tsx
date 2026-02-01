'use client';

import { Menu } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { UserSelector } from './UserSelector';

export function TopBar() {
  const toggleMobileSidebar = useAppStore((s) => s.toggleMobileSidebar);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border-default bg-bg-primary/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-bg-card-hover transition-colors text-text-muted"
        >
          <Menu size={20} />
        </button>
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gold flex items-center justify-center text-bg-primary font-bold text-xs">
            E
          </div>
          <span className="text-sm font-display tracking-wider text-gold">ETTINGER</span>
        </div>
      </div>
      <UserSelector />
    </header>
  );
}
