'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Scale,
  Waves,
  CircleDot,
  Target,
  Users,
  Shield,
  UserCircle,
  ChevronRight,
} from 'lucide-react';
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

export function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();

  const filteredNav = NAV_ITEMS.filter((item) => {
    if (item.sport && !user.sports.includes(item.sport)) return false;
    if (item.role && user.role !== item.role) return false;
    return true;
  });

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        fixed left-0 top-0 h-full z-40
        bg-bg-sidebar backdrop-blur-xl border-r border-glass-border
        transition-[width] duration-300 ease-in-out hidden lg:flex flex-col
        ${hovered ? 'w-[220px]' : 'w-16'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-glass-border">
        <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-bg-primary font-bold text-sm shrink-0">
          E
        </div>
        <span
          className={`ml-3 text-lg font-display tracking-wider text-gold whitespace-nowrap transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ETTINGER
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 overflow-hidden">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center h-11 px-4 mx-2 mb-0.5 rounded-lg transition-colors
                ${isActive
                  ? 'bg-gold/10 text-gold'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-sidebar-hover'
                }
              `}
            >
              <item.icon size={20} className="shrink-0" />
              <span
                className={`ml-3 text-sm whitespace-nowrap transition-opacity duration-200 ${
                  hovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label}
              </span>
              {isActive && hovered && (
                <ChevronRight size={14} className="ml-auto text-gold/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Indicator — clickable, links to profile */}
      <Link href="/profile" className="block p-4 border-t border-glass-border hover:bg-bg-sidebar-hover transition-colors">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
            style={{ backgroundColor: `${user.accentColor}20` }}
          >
            {user.avatar}
          </div>
          <span
            className={`ml-3 text-sm text-text-primary whitespace-nowrap transition-opacity duration-200 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {user.name}
          </span>
        </div>
      </Link>
    </aside>
  );
}
