import React, { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { useNavigate } from 'react-router-dom';
import { Chat } from '@/types/chat';
import { User } from '@/types/user';
import { ChatListItem } from './ChatListItem';
import { useChatIdStore } from '@/store/ChatStore';

interface ChatDataWithUserData extends Chat {
    user: User;
  }

const ChatInterface: React.FC = () => {

    const {auth} = useAuthStore();

    const [ chats, setChats ] = useState<ChatDataWithUserData[]>([]);

    const [showChats, setShowChats] = useState<boolean>(false);

    const [unreadChats, setUnreadChats] = useState<number | null>(null);

    const navigate = useNavigate();

    const currentUserId = auth?.uid as string;

    const [userData, setUserData] = useState<User | null>(null);

    const {setChatId} = useChatIdStore();

    const fetchUserChats = async (id: string) => {
        const userChatsDocRef = doc(db, "chats", id);
        const userChatsDocSnap = await getDoc(userChatsDocRef);
        if (userChatsDocSnap.exists()) {  return userChatsDocSnap.data() as Chat;} 
        else {  console.log(`No such user chats document for user_id: ${id}`); return null;}
    }

    const fetchUserData = async (userId: string) => {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) { setUserData(userDocSnap.data());  return userDocSnap.data();} 
        else {  console.log(`No such user document for user_id: ${userId}`); return null;}
      };

    useEffect(() => {
        let isMounted = true;
        const unSub = onSnapshot(collection(db, "chats"), async (snapshot) => {

            if (!isMounted) return;

            const chatIds: string[] = [];
    
            snapshot.forEach((doc) => {
              if (doc.id.includes(currentUserId)) {
                chatIds.push(doc.id);
              }
            });

            const userChats = await Promise.all(
                chatIds.map((chatUserId) => fetchUserChats(chatUserId))
            );

            const chatDataWithUserData = await Promise.all(
                userChats
                .filter(chat => chat !== null)
                .map(async (chat: Chat) => {
                    const recipientData = chat?.participants?.filter((participant: string) => participant !== currentUserId);
                    const recipientUserData = await fetchUserData(recipientData[0]) as User;
                    return { ...chat, user: recipientUserData }; 
                })
            );

            if (isMounted) {
                setChats(chatDataWithUserData);  // Update the state with the chat data
                setUnreadChats(
                    chats?.filter((chat) => {
                        if (chat.status === 'sent') {
                            if (chat.last_sender_id !== auth?.uid) {
                                return chat.status === 'sent'
                            }
                        }
                    }
                    )?.length
                )
            }

            // setIsLoadingChats(false);  
        });

        return () => {
            isMounted = false;
            unSub();
        };
    }, [])

    // const unreadMessages = userChats?.filter((item: {isSeen: boolean}) => item.isSeen === false)

    return ( 
    <div className='dashboard-layout__chat-interface hidden lg:block'>
        <motion.div className='dashboard-layout__chat-interface__drawer z-50'
                transition={{ duration: 0.3 }}
        >
            <div className='flex justify-between px-[1.6rem] pb-[2.2rem] cursor-pointer' onClick={() => setShowChats(!showChats)}>
                <div className="dashboard-layout__chat-interface__drawer__left">
                    <img src="/assets/images/dashboard/chat-heart.svg" />
                    <span className=''>Chat</span>
                    { unreadChats !== 0 && <div className='dashboard-layout__chat-interface__drawer__left__unread-count'> {unreadChats} </div> }
                </div>
                <button
                        className={`dashboard-layout__chat-interface__drawer__open-button cursor-pointer transform transition-transform duration-300 ${showChats ? 'rotate-180' : ''}`}
                        
                    >
                        <img
                            src="/assets/images/dashboard/open-drawer.svg"
                            alt="open drawer"
                        />
                    </button>
            </div>
           <AnimatePresence>
               {showChats &&
               <motion.div className='bg-white '
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
               >
                 {chats?.slice(0,4)?.map((chat, i: number) => (
                    <ChatListItem key={i} chatInterface contactName={chat.user.first_name as string} userData={userData as User} message={chat.last_message ? chat.last_message : 'No messages'} messageStatus={chat.status === "sent" ? chat.last_sender_id !== auth?.uid : false} profileImage={chat.user.photos! && chat.user.photos[0]} openChat={() => {navigate(`/dashboard/chat?recipient-user-id=${chat.user.uid}`); setChatId(chat.participants[0] + '_' + chat.participants[1]);
                    setChats((prevChats) =>(prevChats.map((c) => c.last_message_id === chat.last_message_id ? { ...c, status: "seen" } : c)));
                }}/>
                  ))}
                </motion.div>}
           </AnimatePresence>
        </motion.div>
    </div>)
}
export default ChatInterface;