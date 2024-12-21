import { useEffect, useState, FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { useNavigate } from 'react-router-dom';
import { Chat } from '@/types/chat';
import { User } from '@/types/user';
import { useChatIdStore } from '@/store/ChatStore';
import { getUserProfile } from '@/hooks/useUser';
import {ChatListItem} from "@/components/dashboard/ChatListItem.tsx";

interface ChatDataWithUserData extends Chat {
    user: User;
}

const ChatInterface: FC = () => {
    const { auth } = useAuthStore();
    const [chats, setChats] = useState<ChatDataWithUserData[]>([]);
    const [showChats, setShowChats] = useState<boolean>(false);
    const [unreadChats, setUnreadChats] = useState<number | null>(null);
    const navigate = useNavigate();
    const currentUserId = auth?.uid as string;
    const [userData, setUserData] = useState<User | null>(null);
    const [recipientData, setRecipientData] = useState<User | null>(null);
    const { setChatId } = useChatIdStore();

    const fetchUserChats = async (id: string) => {
        const userChatsDocRef = doc(db, 'chats', id);
        const userChatsDocSnap = await getDoc(userChatsDocRef);
        if (userChatsDocSnap.exists()) {
            return userChatsDocSnap.data() as Chat;
        }
        console.log(`No such user chats document for user_id: ${id}`);
        return null;
    };

    const fetchUserData = async (userId: string) => {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            return userDocSnap.data() as User;
        }
        console.log(`No such user document for user_id: ${userId}`);
        return null;
    };

    const fetchLoggedUserData = async () => {
        const data = await getUserProfile('users', auth?.uid as string) as User;
        setUserData(data);
    };

    useEffect(() => {
        fetchLoggedUserData().catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        let isMounted = true;
        const unSub = onSnapshot(collection(db, 'chats'), async (snapshot) => {
            if (!isMounted) return;

            const chatIds: string[] = snapshot.docs
                .map((doc) => doc.id)
                .filter((id) => id.includes(currentUserId));

            const userChats = await Promise.all(
                chatIds.map((chatUserId) => fetchUserChats(chatUserId))
            );

            const chatDataWithUserData = await Promise.all(
                userChats
                    .filter((chat) => chat !== null)
                    .map(async (chat) => {
                        const recipientData = chat?.participants?.filter(
                            (participant: string) => participant !== currentUserId
                        );

                        if (!recipientData || recipientData.length === 0) {
                            console.error("Recipient data is missing or empty for chat:", chat);
                            return null; // Skip this chat if no recipient data is found
                        }

                        const recipientUserData = await fetchUserData(recipientData[0]);
                        setRecipientData(recipientUserData)
                        if (!recipientUserData) {
                            console.error("Failed to fetch user data for recipient:", recipientData[0]);
                            return null; // Skip this chat if no user data is found
                        }

                        return { ...chat, user: recipientUserData };
                    })
            );

            if (isMounted && chatDataWithUserData != null) {
                setChats(chatDataWithUserData as ChatDataWithUserData[]);
                setUnreadChats(
                    chatDataWithUserData.filter(
                        (chat) =>
                            // @ts-ignore
                            chat.status === 'sent' && chat.last_sender_id !== auth?.uid
                    ).length
                );
            }
        });

        return () => {
            isMounted = false;
            unSub();
        };
    }, [currentUserId, auth?.uid]);

    return (
        <div className="dashboard-layout__chat-interface hidden lg:block">
            <motion.div
                className="dashboard-layout__chat-interface__drawer z-50"
                transition={{ duration: 0.3 }}
            >
                <div
                    className="flex justify-between px-[1.6rem] pb-[2.2rem] cursor-pointer"
                    onClick={() => setShowChats(!showChats)}
                >
                    <div className="dashboard-layout__chat-interface__drawer__left">
                        <img src="/assets/images/dashboard/chat-heart.svg" alt={``} />
                        <span className=""> Chat </span>
                        {unreadChats !== 0 && unreadChats && (
                            <div className="dashboard-layout__chat-interface__drawer__left__unread-count">
                                {unreadChats}
                            </div>
                        )}
                    </div>
                    <button
                        className={`dashboard-layout__chat-interface__drawer__open-button cursor-pointer transform transition-transform duration-300 ${
                            showChats ? 'rotate-180' : ''
                        }`}
                    >
                        <img
                            src="/assets/images/dashboard/open-drawer.svg"
                            alt="open drawer"
                        />
                    </button>
                </div>
                <AnimatePresence>
                    {showChats && (
                        <motion.div
                            className="bg-white "
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {chats?.length > 0 ? (
                                chats.slice(0, 4).map((chat, i) => (
                                    <ChatListItem
                                        key={`${chat.last_sender_id}_${recipientData?.uid}_${i}`}
                                        contactName={chat.user.first_name as string}
                                        userData={userData as User}
                                        message={chat.last_message || 'No messages'}
                                        messageStatus={chat.status === 'sent' ? chat.last_sender_id !== auth?.uid : false}
                                        profileImage={chat.user.photos?.[0]}
                                        openChat={() => {
                                            const chatId = `${chat.participants[0]}_${chat.participants[1]}`
                                            setChatId(chatId);
                                            if (chatId != "nil") {
                                                navigate(`/dashboard/chat?recipient-user-id=${chat.user.uid}`, {
                                                    state: { chatId, recipientUser: chat.user },
                                                });
                                                setChatId(chatId)
                                            }
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="w-full h-[10rem] flex flex-col  justify-center items-center">
                                    <p className="text-[1.4rem]">
                                        Oops! Looks like you have no chats💔
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ChatInterface;