import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Picture {
  auth: string | null;
  setAuth: (id: string) => void;
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
        setAuth: (id) => set(() => ({auth: id})),
        reset: () => set(initialState),
    }),
    {
      name: "user_id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

