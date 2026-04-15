import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  authBootstrapped: false,
  setAuth: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken),
    }),
  setAuthBootstrapped: (v = true) => set({ authBootstrapped: Boolean(v) }),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : state.user,
    })),
}));

