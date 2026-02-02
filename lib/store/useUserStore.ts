'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USERS, type UserProfile } from '@/lib/constants/users';

interface UserState {
  activeUserId: string;
  userOverrides: Record<string, Partial<UserProfile>>;
  setActiveUser: (id: string) => void;
  getActiveUser: () => UserProfile;
  getUser: (id: string) => UserProfile;
  updateUser: (id: string, updates: Partial<Omit<UserProfile, 'id' | 'role'>>) => void;
}

function mergeUser(base: UserProfile, overrides?: Partial<UserProfile>): UserProfile {
  if (!overrides) return base;
  return { ...base, ...overrides };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      activeUserId: 'mark',
      userOverrides: {},
      setActiveUser: (id: string) => set({ activeUserId: id }),
      getActiveUser: () => {
        const state = get();
        const base = USERS.find((u) => u.id === state.activeUserId) ?? USERS[0];
        return mergeUser(base, state.userOverrides[base.id]);
      },
      getUser: (id: string) => {
        const state = get();
        const base = USERS.find((u) => u.id === id) ?? USERS[0];
        return mergeUser(base, state.userOverrides[base.id]);
      },
      updateUser: (id, updates) =>
        set((state) => ({
          userOverrides: {
            ...state.userOverrides,
            [id]: { ...state.userOverrides[id], ...updates },
          },
        })),
    }),
    {
      name: 'ettinger-active-user',
      partialize: (state) => ({
        activeUserId: state.activeUserId,
        userOverrides: state.userOverrides,
      }),
    }
  )
);
