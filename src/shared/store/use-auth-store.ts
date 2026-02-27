import { create } from 'zustand';

import type { User } from '@/shared/types/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setAuth: (accessToken: string, user?: User) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: (accessToken, user) =>
    set({
      accessToken,
      user: user ?? null,
      isAuthenticated: true,
    }),

  setUser: (user) => set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }),

  setInitialized: (value) => set({ isInitialized: value }),
}));

if (import.meta.env.DEV) {
  (window as unknown as { authStore: typeof useAuthStore }).authStore = useAuthStore;
}
