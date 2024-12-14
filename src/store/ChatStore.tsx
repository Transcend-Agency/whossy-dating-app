/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChatId {
    chatId: string,
    setChatId: (chatId: string) => void;
    reset: () => void;
}

const initialStateChatId = {
    chatId: 'nil',
};

export const useChatIdStore = create<
  ChatId,
  [["zustand/persist", ChatId]]
>(
  persist(
    (set) => ({
        ...initialStateChatId,
        setChatId: (id) =>  set({chatId: id}),
        reset: () => set(initialStateChatId),
    }),
    {
      name: "chat_id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
