'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Dumbbell, UtensilsCrossed, Scale, Waves, CircleDot, Target, Users, Shield, UserCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { useUserStore } from '@/lib/store/useUserStore';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/workouts', icon: Dumbbell, label: 'AI Workouts' },
  { href: '/nutrition', icon: UtensilsCrossed, label: 'Nutrition' },
  { href: '/metrics', icon: Scale, label: 'Body Metrics' },
  { href: '/swimming', icon: Waves, label: 'Swimming', sport: 'Swimming' },
  { href: '/basketball', icon: CircleDot, label: 'Basketball', sport: 'Basketball' },
  { href: '/goals', icon: Target, label: 'Goals' },
  { href: '/family', icon: Users, label: 'Family Hub' },
  { href: '/profile', icon: UserCircle, label: 'Profile' },
  { href: '/admin', icon: Shield, label: 'Admin', role: 'parent' as const },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useAppStore();
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  const filteredNav = NAV_ITEMS.filter((item) => {
    if (item.sport && !user.sports.includes(item.sport)) return false;
    if (item.role && user.role !== item.role) return false;
    return true;
  });

  if (!mobileSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setMobileSidebarOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-72 bg-bg-sidebar backdrop-blur-xl border-r border-glass-border animate-slide-up flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-bg-primary font-bold text-sm">
              E
            </div>
            <span className="text-lg font-display tracking-wider text-gold">ETTINGER</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg-sidebar-hover transition-colors text-text-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`
                  flex items-center h-12 px-5 transition-colors
                  ${isActive
                    ? 'bg-gold/10 text-gold border-r-2 border-gold'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-sidebar-hover'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="ml-3 text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User — clickable, links to profile */}
        <Link
          href="/profile"
          onClick={() => setMobileSidebarOpen(false)}
          className="block p-5 border-t border-glass-border hover:bg-bg-sidebar-hover transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: `${user.accentColor}20` }}
            >
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-muted capitalize">{user.role}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
