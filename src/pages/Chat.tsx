import ProfilePlan from '@/components/dashboard/ProfilePlan';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import EditProfile from './dashboard/EditProfile';
import ProfileSettings from './dashboard/ProfileSettings';
import PreviewProfile from './dashboard/PreviewProfile';
import Preferences from './Preferences';
import PreferredInterestsDesktop from './dashboard/PreferredInterestsDesktop';
import UserInterestsDesktop from './dashboard/UserInterestsDesktop';
import MobileProfile from './MobileProfile';
import EditProfileMobile from './EditProfileMobile';
import PreviewProfileMobile from './PreviewProfileMobile';
import SettingsMobile from './SettingsMobile';
import PreferencesMobile from './PreferencesMobile';
import PreferredInterestsMobile from './dashboard/PreferredInterestsMobile';
import DashboardPageContainer from '@/components/dashboard/DashboardPageContainer';
import { useGetUserProfile } from '@/hooks/useUser';
import { User, UserFilters, UserPrefences } from '@/types/user';
import { useAuthStore } from '@/store/UserId';
import Skeleton from '@/components/ui/Skeleton';
import ProfileCreditButtton from '@/components/dashboard/ProfileCreditButtton';
import ChatListItem from '@/components/dashboard/ChatListItem';


type UserProfileProps = {
};

const UserProfile: React.FC<UserProfileProps> = () => {
    const [activePage, setActivePage] = useState<'chats' | 'selected-chat'>('chats');
    const [userData, setUserData] = useState<User>();
    const [userPrefencesData, setuserPreferencesData] = useState<UserPrefences>();
    const [userFilters, setUserFilters] = useState<UserFilters>();

    const {auth} = useAuthStore();
    
    const fetchUser = async () => { const data = await useGetUserProfile("users", auth?.uid as string) as User; setUserData(data); }
    const fetchUserPreferences = async () => {const data = await useGetUserProfile("preferences", auth?.uid as string) as UserPrefences; setuserPreferencesData(data) }
    const fetchUserFilters = async () => {const data = await useGetUserProfile("filters", auth?.uid as string) as UserFilters; setUserFilters(data) }

    // useEffect(() => {fetchUser(); fetchUserPreferences()}, [userData, userPrefencesData])
    useEffect(() => {fetchUser(); fetchUserPreferences(); fetchUserFilters()}, [])

    const refetchUserData = async () => {await fetchUser()}
    const refetchUserPreferences = async () => {await fetchUserPreferences()}
    const refetchUserFilters = async () => {await fetchUserFilters()}

    const getYearFromFirebaseDate = (firebaseDate: {nanoseconds: number, seconds: number} | undefined) => {
        if (!firebaseDate || typeof firebaseDate.seconds !== 'number') {
          throw new Error('Invalid Firebase date object');
        }
      
        // Convert seconds to milliseconds
        const milliseconds = firebaseDate.seconds * 1000;
      
        // Create a Date object
        const date = new Date(milliseconds);
      
        // Get the year
        return date.getFullYear();
      };

    return <>
        <DashboardPageContainer className="hidden lg:block">
            <motion.div animate={activePage == 'chats' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }} transition={{ duration: 0.25 }} className='user-profile dashboard-layout__main-app__body__main-page  space-y-10'>
                <section className='space-y-3 px-[1.6rem]'>
                  <h1 className='text-[1.6rem] font-medium'>New Likes and Matches</h1>
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

                <section>
                  <h1 className='text-[1.6rem] font-medium mb-4 px-[1.6rem]'>Messages</h1>
                  <ChatListItem contactName='Stephen' message='Hi, how are you' profileImage='/assets/images/matches/stephen.png' messageStatus={true}/>
                  <ChatListItem contactName='Temidre' message='Hey, how are you' profileImage='/assets/images/matches/stephen.png' messageStatus={true}/>
                </section>

            </motion.div>
            {/* <EditProfile activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} onInterests={() => setActivePage('user-interests')}  userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences} />
            <ProfileSettings activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} />
            <PreviewProfile activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} userData={userData} userPrefencesData={userPrefencesData}/> */}
            {/* <Preferences activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage('interests')} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/> */}
            {/* <PreferredInterestsDesktop activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/>
            <UserInterestsDesktop activePage={activePage == 'user-interests'} closePage={() => setActivePage('edit-profile')} onInterests={() => setActivePage('interests')} userPrefencesData={userPrefencesData} refetchUserPreferencesData={refetchUserPreferences}/> */}
            {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}
        </DashboardPageContainer>
        {/* <AnimatePresence mode="wait">
            <MobileProfile onEditProfilePage={() => setActivePage('edit-profile')} activePage='user-profile' onSettingsPage={() => setActivePage('profile-settings')} onFiltersPage={() => setActivePage('preferences')} userData={userData} userPrefencesData={userPrefencesData}/>
            <EditProfileMobile  activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences}/> 
            <PreviewProfileMobile  activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} userData={userData} userPrefencesData={userPrefencesData}/> 
            <SettingsMobile activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')}/>
            <PreferencesMobile activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage("interests")} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/>
            <PreferredInterestsMobile activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/> */}

            {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}

        {/* </AnimatePresence> */}
    </>
}
export default UserProfile;