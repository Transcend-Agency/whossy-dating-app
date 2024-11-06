import { motion } from 'framer-motion';
import  { useEffect, useState } from 'react';
import DashboardPageContainer from '@/components/dashboard/DashboardPageContainer';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { useNavigate } from 'react-router-dom';
import SelectedChat from '@/components/dashboard/SelectedChat';
import { User } from '@/types/user';
import { Chat } from '@/types/chat';
import { useChatIdStore } from '@/store/ChatStore';
import { ChatListItem, ChatListItemLoading } from '@/components/dashboard/ChatListItem';
import { getUserProfile } from '@/hooks/useUser';

// type UserProfileProps = {};

interface ChatDataWithUserData extends Chat {
  user: User;
}

const ChatPage = () => {
    const [activePage, setActivePage] = useState<'chats' | 'selected-chat'>('chats');
    const navigate = useNavigate();

    const { setChatId } = useChatIdStore();

  const {auth} = useAuthStore();
  const currentUserId= auth?.uid as string;

  const [userData, setUserData] = useState<User | null>(null);

  const fetchLoggedUserData = async () => {
    const data = await getUserProfile("users", auth?.uid as string) as User;
    setUserData(data);
}

  // const [allChats, setAllChats] = useState<string[]>([]);
  const [allChats, setAllChats] = useState<ChatDataWithUserData[]>([]);


  const fetchUserData = async (userId: string) => {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) { 
      return userDocSnap.data();
    } 
    else {  console.log(`No such user document for user_id: ${userId}`); return null;}
  };

  const fetchUserChats = async (id: string) => {
    const userChatsDocRef = doc(db, "chats", id);
    const userChatsDocSnap = await getDoc(userChatsDocRef);
    if (userChatsDocSnap.exists()) {  return userChatsDocSnap.data() as Chat;} 
    else {  console.log(`No such user chats document for user_id: ${id}`); return null;}
  }

  const [isLoadingChats, setIsLoadingChats] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingChats(true);
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

        // Sort by timestamp in descending order (latest message first)
        const sortedChats = chatDataWithUserData.sort((a, b) => {
          const aTimestamp = 
              'seconds' in a.last_message_timestamp 
                  ? a.last_message_timestamp.seconds * 1000 + a.last_message_timestamp.nanoseconds / 1e6 
                  : 0;
          const bTimestamp = 
              'seconds' in b.last_message_timestamp 
                  ? b.last_message_timestamp.seconds * 1000 + b.last_message_timestamp.nanoseconds / 1e6 
                  : 0;
          
          return bTimestamp - aTimestamp;
        });

        if (isMounted) {
            setAllChats(sortedChats);  // Update the state with the chat data
        }

        setIsLoadingChats(false);  
    });

    return () => {
        isMounted = false;
        unSub();
    };
}, [])
  
  const queryParams = new URLSearchParams(location.search);
  const recipientUserId = queryParams.get('recipient-user-id');

  useEffect(() => {
    if (recipientUserId) {
      setActivePage('selected-chat');
    } else {
      setActivePage('chats');
    }
  }, [recipientUserId])

  useEffect(() => {
    fetchLoggedUserData().catch(err => console.error(err));
  })

  const updateChatId = (newChatId: string) => {
    setChatId(newChatId);
  };

  // const [isLoadingSelectedChat, setIsLoadingSelectedChat] = useState<boolean>(false);

    return (
    <>
       {/* <ImagesModalMobile show={true}/> */}
        <DashboardPageContainer className="block">
            <motion.div animate={activePage == 'chats' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className='user-profile h-full space-y-10'>
                <section className='space-y-[1.6rem] px-[1.6rem]'>
                  <h1 className='text-[1.6rem] font-medium '>New Likes and Matches</h1>
                  <div className='flex gap-x-4'>
                    <div className='w-[11.2rem] h-[12rem] rounded-[1.2rem] p-2 relative' style={{border: '2px solid #FF5C00'}}>
                      <img src="/assets/images/matches/stephen.png" className='w-full h-full object-cover rounded-[1.2rem] blur-sm' alt="" />
                      <div className='absolute from-[#FF5C00] top-16 left-10 to-[#F0174B] rounded-full bg-gradient-to-b text-white font-medium text-[1.4rem] flex gap-x-1 p-[0.8rem]'><p>24</p> <img src='/assets/icons/likes.svg'/></div>
                      <div className='text-[1.2rem] text-white font-medium bg-gradient-to-b from-[#FF5C00] to-[#F0174B] absolute bottom-4 left-10 rounded-full w-fit p-2 px-4'>Likes</div>
                    </div>
                    <div className='w-[11.2rem] h-[12rem] flex flex-col justify-center items-center rounded-[1.2rem] p-2 relative bg-[#F6F6F6]'>
                      <img src="/assets/icons/no-matches-yet.svg" alt="" />
                      <p className='text-[#8A8A8E] text-[1.4rem]'>No match found!</p>
                      <p className='leading-[0.8px] text-[#8A8A8E] text-[1.4rem]'>-</p>
                    </div>
                  </div>
                </section>
                <section>

                  {allChats && allChats.length !==0 && <h1 className='text-[1.6rem] font-medium mb-4 px-[1.6rem]'>Messages</h1>}

                  {!isLoadingChats ? allChats.length === 0 ? <div className='text-[1.6rem] font-medium mb-4 px-[1.6rem] flex flex-col justify-center items-center h-full text-[#D3D3D3]'><p>No messages yet, go to the explore page to start chatting</p>. <button className='bg-[#F2243E] text-white py-3 px-6 rounded-lg active:scale-[0.95] transition ease-in-out duration-300 hover:scale-[1.02]' onClick={(e) => {e.preventDefault(); navigate('/dashboard/swipe-and-match');}}>Explore</button></div> : 
                  allChats.map((chat, i) => (
                    chat ? <><ChatListItem key={i} userData={userData as User} messageStatus={chat.status === "sent" ? chat.last_sender_id === auth?.uid ? false : true : false} onlineStatus={chat.user.status?.online} contactName={chat.user.first_name as string} message={chat.last_message} profileImage={ chat.user.photos && chat.user.photos[0] } 
                    openChat={() => {setActivePage('selected-chat'); navigate(`/dashboard/chat?recipient-user-id=${chat.user.uid}`); setChatId(chat.participants[0] + '_' + chat.participants[1]);
                    }}
                     />
                      </>
                       : null
                  ))
                   : Array.from({ length: 7 }).map(() => <ChatListItemLoading />)}
                </section>
            </motion.div>
            <SelectedChat activePage={activePage} closePage={() => {setActivePage('chats'); navigate('/dashboard/chat')}} updateChatId={updateChatId} userData={userData as User}/>

        </DashboardPageContainer>
    </>)
}
export default ChatPage;