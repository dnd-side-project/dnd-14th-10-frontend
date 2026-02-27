import { create } from 'zustand';

import type { User } from '@/shared/types/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoggingOut: boolean;

  setAuth: (accessToken: string, user?: User) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setInitialized: (value: boolean) => void;
  setLoggingOut: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoggingOut: false,

  setAuth: (accessToken, user) =>
    set({
      accessToken,
      user: user ?? null,
      isAuthenticated: true,
      isLoggingOut: false,
    }),

  setUser: (user) => set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }),

  setInitialized: (value) => set({ isInitialized: value }),

  setLoggingOut: (value) => set({ isLoggingOut: value }),
}));

if (import.meta.env.DEV) {
  (window as unknown as { authStore: typeof useAuthStore }).authStore = useAuthStore;
}
