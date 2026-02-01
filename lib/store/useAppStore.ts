'use client';

import { create } from 'zustand';

interface AppState {
  sidebarExpanded: boolean;
  mobileSidebarOpen: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  sidebarExpanded: false,
  mobileSidebarOpen: false,
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
}));
