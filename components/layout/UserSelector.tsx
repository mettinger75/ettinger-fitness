'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, Settings } from 'lucide-react';
import { useUserStore } from '@/lib/store/useUserStore';
import { USERS } from '@/lib/constants/users';

export function UserSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { activeUserId, setActiveUser, getActiveUser, getUser } = useUserStore();
  const user = getActiveUser();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-bg-card-hover transition-colors cursor-pointer"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
          style={{ backgroundColor: `${user.accentColor}20` }}
        >
          {user.avatar}
        </div>
        <span className="text-sm text-text-primary hidden sm:block">{user.name}</span>
        <ChevronDown size={14} className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl glass shadow-2xl overflow-hidden animate-fade-in z-50">
          <div className="px-3 py-2 border-b border-glass-border">
            <p className="text-xs text-text-dim uppercase tracking-wider">Switch User</p>
          </div>
          {USERS.map((baseUser) => {
            const u = getUser(baseUser.id);
            return (
              <button
                key={u.id}
                onClick={() => {
                  setActiveUser(u.id);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 transition-colors cursor-pointer
                  ${u.id === activeUserId
                    ? 'bg-gold/10'
                    : 'hover:bg-glass-hover'
                  }
                `}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${u.accentColor}20` }}
                >
                  {u.avatar}
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-text-primary">{u.name}</p>
                  <p className="text-xs text-text-muted capitalize">{u.role}</p>
                </div>
                {u.id === activeUserId && <Check size={16} className="text-gold" />}
              </button>
            );
          })}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-glass-border text-text-muted hover:text-text-primary hover:bg-glass-hover transition-colors"
          >
            <Settings size={14} />
            <span className="text-xs">Edit Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
}
