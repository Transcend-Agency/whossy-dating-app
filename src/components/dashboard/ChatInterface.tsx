import React, { useEffect, useState } from 'react';
import ChatListItem from './ChatListItem';
import {AnimatePresence, motion} from 'framer-motion'
import { useUserChatsStore } from '@/store/ChatStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { useNavigate } from 'react-router-dom';

type ChatInterfaceProps = {

};

const ChatInterface: React.FC<ChatInterfaceProps> = () => {

    const {auth} = useAuthStore();

    const { setUserChats, userChats } = useUserChatsStore();

    const [showChats, setShowChats] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", auth?.uid as string), async (res) => {
          // console.log(res.data());
            if (res.exists()) {
                const userChats = res.data();
                const promises = userChats.chats.map( async (eachChat: any) => {
                  const docRef = doc(db, "users", eachChat.receiverId);
                  const preferencesDocRef = doc(db, 'preferences', eachChat.receiverId)
                  const eachChatUserData = await getDoc(docRef);
                  const eachChatPreferencesData = await getDoc(preferencesDocRef);
  
  
                  const user = eachChatUserData.data()
                  const preferences = eachChatPreferencesData.data()
                  return {...eachChat, user, preferences}
                })
                const chatData = await Promise.all(promises)
                setUserChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
                // setChats(doc.data() as {})
            }
  
        });
        return () => {unSub()};
    }, [])

    const unreadMessages = userChats?.filter((item: {isSeen: boolean}) => item.isSeen === false)

    return ( 
    <div className='dashboard-layout__chat-interface hidden lg:block'>
        <motion.div className='dashboard-layout__chat-interface__drawer z-50'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
        >
            <div className='flex justify-between px-[1.6rem] pb-[2.2rem] cursor-pointer' onClick={() => setShowChats(!showChats)}>
                <div className="dashboard-layout__chat-interface__drawer__left">
                    <img src="/assets/images/dashboard/chat-heart.svg" />
                    <span className=''>Chat</span>
                    <div className='dashboard-layout__chat-interface__drawer__left__unread-count'>{unreadMessages?.length} </div>
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
                 {userChats?.slice(0,4)?.map((item: any, i: number) => (
                    <ChatListItem key={i} contactName={item.user.first_name} message={item.lastMessage ? item.lastMessage : 'No messages'} profileImage={item.preferences.photos[0]} messageStatus={!item.isSeen} openChat={() => navigate('/dashboard/chat')}/>
                    // openChat={() => {setActivePage('selected-chat'); setSelectedChatData(item); setChatId(item.chatId); handleSelectedChat(item)}}
                  ))}
                </motion.div>}
           </AnimatePresence>
        </motion.div>
    </div>)
}
export default ChatInterface;