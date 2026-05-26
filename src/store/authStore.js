import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      authBootstrapped: false,
      
      setAuth: ({ user, accessToken }) => {
      
        set({
          user,
          accessToken,
          isAuthenticated: Boolean(accessToken),
        });
      },
      
      setAuthBootstrapped: (v = true) => set({ authBootstrapped: Boolean(v) }),
      
      clearAuth: () => {
       
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);