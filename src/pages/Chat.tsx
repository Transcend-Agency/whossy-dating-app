import { motion } from 'framer-motion';
import React, { useState } from 'react';
import DashboardPageContainer from '@/components/dashboard/DashboardPageContainer';
import ChatListItem from '@/components/dashboard/ChatListItem';
import SelectedChat from '@/components/dashboard/SelectedChat';
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { useChatIdStore, useUserChatsStore } from '@/store/ChatStore';

type UserProfileProps = {
};

const UserProfile: React.FC<UserProfileProps> = () => {
    const [activePage, setActivePage] = useState<'chats' | 'selected-chat'>('chats');
    const [selectedChatData, setSelectedChatData] = useState(null)
    const {auth} = useAuthStore();

    // const [chats, setChats] = useState<any[]>([]);

    const {userChats: chats} = useUserChatsStore();
    const {setChatId} = useChatIdStore()

  // Function for chatting with a user, that should be added on the likes and matches page, the id is the uid of the user that I want to chat with
  // @ts-expect-error unused function
    const handleChat = async (id: string) => {
      const chatRef = collection(db, 'chats');
      const userChatsRef = collection(db, 'userchats');

      try {

        const newChatRef = doc(chatRef);

        await setDoc(newChatRef, { createdAt: serverTimestamp(), messages: [] });

        await updateDoc(doc(userChatsRef, id), {
          chats: arrayUnion({
            chatId: newChatRef.id, lastMessage: '', receiverId: auth?.uid as string, updatedAt: Date.now()
          })
        })

        await updateDoc(doc(userChatsRef, auth?.uid), {
          chats: arrayUnion({
            chatId: newChatRef.id, lastMessage: '', receiverId: id, updatedAt: Date.now()
          })
        })

        console.log(newChatRef.id)
      } catch (err) {
        console.log(err);
      }
    }


   

  const handleSelectedChat = async (chat: any) => {
    const userChats = chats?.map((item) => {
      const {user, ...rest} = item 
      return rest;
    })

    const chatIndex = userChats?.findIndex((item) => item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userchats', auth?.uid as string);

    try {
      await updateDoc(userChatsRef, {chats: userChats})
    } catch (error) {
      console.log(error)
    }
  }

    return <>
       {/* <ImagesModalMobile show={true}/> */}
        <DashboardPageContainer className="block">
            <motion.div animate={activePage == 'chats' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }} transition={{ duration: 0.25 }} className='user-profile dashboard-layout__main-app__body__main-page  space-y-10'>
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
                      <p className='text-[#8A8A8E] text-[1.4rem]'>No match yet</p>
                      <p className='text-[#8A8A8E] text-[1.4rem] mt-2'>^ ^</p>
                      <p className='leading-[0.8px] text-[#8A8A8E] text-[1.4rem]'>-</p>
                    </div>
                  </div>
                </section>
                {/* <button className='bg-red-600 text-white rounded-lg p-4 cursor-pointer' onClick={() => {console.log(chats); }}>Chat With User</button> */}
                <section>
                  <h1 className='text-[1.6rem] font-medium mb-4 px-[1.6rem]'>Messages</h1>
                  {chats?.map((item: any, i: number) => (
                    <ChatListItem key={i} contactName={item.user.first_name} message={item.lastMessage ? item.lastMessage : 'No messages'} profileImage={item.preferences.photos[0]} messageStatus={!item.isSeen} openChat={() => {setActivePage('selected-chat'); setSelectedChatData(item); setChatId(item.chatId); handleSelectedChat(item)}}/>
                  ))}
                  {/* <ChatListItem contactName='Stephen' message='Hi, how are you' profileImage='/assets/images/matches/stephen.png' messageStatus={true} openChat={() => setActivePage('selected-chat')}/> */}
                  {/* <ChatListItem contactName='Temidre' message='Hey, how are you' profileImage='/assets/images/matches/stephen.png' messageStatus={true} openChat={() => setActivePage('selected-chat')}/> */}
                  {/* {JSON.stringify(chats)} */}
                </section>

            </motion.div>
            {/* <EditProfile activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} onInterests={() => setActivePage('user-interests')}  userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences} />
            <ProfileSettings activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} /> */}
            {/* <AnimatePresence mode='wait'> */}
              {/* <SelectedChat activePage={activePage === "selected-chat"}/> */}
            {/* </AnimatePresence> */}
            {/* <Preferences activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage('interests')} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/> */}
            {/* <PreferredInterestsDesktop activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/>
            <UserInterestsDesktop activePage={activePage == 'user-interests'} closePage={() => setActivePage('edit-profile')} onInterests={() => setActivePage('interests')} userPrefencesData={userPrefencesData} refetchUserPreferencesData={refetchUserPreferences}/> */}
            <SelectedChat chatData={selectedChatData} activePage={activePage === "selected-chat"} closePage={() => {setActivePage('chats'); setSelectedChatData(null)}} />
        </DashboardPageContainer>
        {/* <AnimatePresence mode="wait">
            <MobileProfile onEditProfilePage={() => setActivePage('edit-profile')} activePage='user-profile' onSettingsPage={() => setActivePage('profile-settings')} onFiltersPage={() => setActivePage('preferences')} userData={userData} userPrefencesData={userPrefencesData}/>
            <EditProfileMobile  activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences}/> 
            <PreviewProfileMobile  activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} userData={userData} userPrefencesData={userPrefencesData}/> 
            <SettingsMobile activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')}/>
            <PreferencesMobile activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage("interests")} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/>
            <PreferredInterestsMobile activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/> */}

            {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}

            {/* <AnimatePresence>
              
            </AnimatePresence> */}

        {/* </AnimatePresence> */}
    </>
}
export default UserProfile;