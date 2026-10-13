import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      authBootstrapped: false,

      setAuth: ({ user, accessToken, refreshToken }) => {
        console.log(
          "setAuth called - accessToken:",
          !!accessToken,
          "refreshToken:",
          !!refreshToken,
        );
        set({
          user,
          accessToken,
          refreshToken, // Will be null for Google OAuth (cookie handles it)
          isAuthenticated: Boolean(accessToken),
        });
      },

      setAuthBootstrapped: (v = true) => set({ authBootstrapped: Boolean(v) }),

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        // DON'T persist refreshToken - it's in HTTP cookie
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
