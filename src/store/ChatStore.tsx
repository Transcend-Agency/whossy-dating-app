/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthStore } from "./UserId";

interface Chat {
    chatId: any,
    user: any,
    isCurrentUserBlocked: boolean,
    isReceiverBlocked: boolean,
    changeUser: (chatId: any, user: any) => void,
    changeBlock: () => void
}

const initialState = {
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
};

export const useChatStore = create<
  Chat,
  [["zustand/persist", Chat]]
>(
  persist(
    (set) => ({
        ...initialState,
        changeUser: async (chatId, user) => {
            const currentUserId = useAuthStore.getState().auth
            const currentUserDocRef = doc(db, "user", currentUserId?.uid as string);
            const currentUser = await getDoc(currentUserDocRef);

            //CHECK IF CURRENT USER IS BLOCKED
            if (user.blocked.includes(currentUser.data()?.uid)) {
                set({chatId, user: null, isCurrentUserBlocked: true, isReceiverBlocked: false})
            }
            //CHECK IF RECEIVER IS BLOCKED
            if (currentUser.data()?.blocked.includes(user?.uid)) {
                set({chatId, user: user, isCurrentUserBlocked: false, isReceiverBlocked: true})
            }
             
        },
        changeBlock: () => {
            set((prev) => ({...prev, isReceiverBlocked: !prev.isReceiverBlocked}))
        },

        reset: () => set(initialState),
    }),
    {
      name: "-___-",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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
      name: "chat__id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

//USER CHAT
interface UserChats {
  userChats: any[];
  setUserChats: (s: any) => void;
  reset: () => void;
}

const initialUserChatState = {
  userChats: []
};

export const useUserChatsStore = create<
  UserChats,
  [["zustand/persist", UserChats]]
>(
  persist(
    (set) => ({
        ...initialUserChatState,
        setUserChats: (chatData) => set(() => ({userChats: chatData})),
        reset: () => set(initialUserChatState),
    }),
    {
      name: "user-chats-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

