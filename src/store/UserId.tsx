import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthType = { uid: string, has_completed_onboarding: boolean };

interface Picture {
  auth: AuthType | null;
  setAuth: (auth: AuthType, user?: User) => void;
  setUser: (user: User) => void;
  user?: User;
  reset: () => void;
}

const initialState = {
  auth: null,
};

export const useAuthStore = create<
  Picture,
  [["zustand/persist", Picture]]
>(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (auth, user) => set(() => ({ auth, user })),
      reset: () => set(initialState),
      setUser: (user) => set((state) => ({ ...state, user })),
      updateUser: (userUpdate: Partial<User>) => set((state) => ({ ...state, user: { ...state.user, ...userUpdate } })),
    }),
    {
      name: "user_id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

