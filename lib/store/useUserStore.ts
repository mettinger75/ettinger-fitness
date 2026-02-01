'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USERS, type UserProfile } from '@/lib/constants/users';

interface UserState {
  activeUserId: string;
  users: UserProfile[];
  setActiveUser: (id: string) => void;
  getActiveUser: () => UserProfile;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      activeUserId: 'mark',
      users: USERS,
      setActiveUser: (id: string) => set({ activeUserId: id }),
      getActiveUser: () => {
        const state = get();
        return state.users.find((u) => u.id === state.activeUserId) ?? USERS[0];
      },
    }),
    {
      name: 'ettinger-active-user',
      partialize: (state) => ({ activeUserId: state.activeUserId }),
    }
  )
);
