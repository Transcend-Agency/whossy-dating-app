import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthType = {uid: string, has_completed_onboarding: boolean};

interface Picture {
  auth: AuthType | null;
  setAuth: (auth: AuthType ) => void;
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
        setAuth: (auth) => set(() => ({auth})),
        reset: () => set(initialState),
    }),
    {
      name: "user_id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

