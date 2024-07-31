import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingData {
  "relationship-preference"?: number | null;
  "gender-preference"?: number | null;
  "date-of-birth"?: Date | null | string;
  "distance-search"?: number;
  interests?: string[];
  education?: string;
  "drinking-preference"?: number | null;
  "smoking-preference"?: number | null;
  "workout-preference"?: number | null;
  "short-introduction"?: string;
  snapshot?: string[];
}

interface Onboarding {
  "onboarding-data": OnboardingData;
  updateOnboardingData: (s: OnboardingData) => void;
  addInterests: (s: string) => void;
  removeInterests: (s: string) => void;
  reset: () => void;
}

const initialState = {
  "onboarding-data": {
    "relationship-preference": null,
    "gender-preference": null,
    "date-of-birth": null,
    "distance-search": 0,
    interests: [],
    education: "",
    "drinking-preference": null,
    "smoking-preference": null,
    "workout-preference": null,
    "short-introduction": "",
    snapshot: [],
  },
};

export const useOnboardingStore = create<
  Onboarding,
  [["zustand/persist", Onboarding]]
>(
  persist(
    (set) => ({
      ...initialState,
      addInterests: (interest) =>
        set((state) => ({
          "onboarding-data": {
            ...state["onboarding-data"],
            interests: [
              ...(state["onboarding-data"].interests || []),
              interest,
            ],
          },
        })),
      removeInterests: (interest) =>
        set((state) => ({
          "onboarding-data": {
            ...state["onboarding-data"],
            interests: state["onboarding-data"].interests?.filter(
              (item) => item !== interest
            ),
          },
        })),
      updateOnboardingData: (data) =>
        set((state) => ({
          "onboarding-data": { ...state["onboarding-data"], ...data },
        })),
      reset: () => set(initialState),
    }),
    {
      name: "onboarding-data",
      getStorage: () => localStorage,
    }
  )
);
