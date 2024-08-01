import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface PictureData {
  imageOne?: string;
  imageTwo?: string;
  imageThree?: string;
  imageFour?: string;
  imageFive?: string;
  imageSix?: string;
}

interface Picture {
  pictures: PictureData;
  setPictures: (s: Partial<PictureData>) => void;
  reset: () => void;
}

const initialState = {
  pictures: {
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    imageFour: "",
    imageFive: "",
    imageSix: "",
  },
};

export const usePictureStore = create<
  Picture,
  [["zustand/persist", Picture]]
>(
  persist(
    (set) => ({
        ...initialState,
        setPictures: (s) =>
        set((state) => ({pictures: {...state.pictures, ...s}})),
      reset: () => set(initialState),
    }),
    {
      name: "pictures-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

