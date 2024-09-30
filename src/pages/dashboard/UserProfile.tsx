import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ProfileCreditButtton from '../../components/dashboard/ProfileCreditButtton';
import ProfilePlan from '../../components/dashboard/ProfilePlan';
import EditProfile from './EditProfile';
import PreviewProfile from './PreviewProfile';
import ProfileSettings from './ProfileSettings';
// import MobileProfile from '../MobileProfile';
// import EditProfileMobile from '../EditProfileMobile';
import { useGetUserProfile } from '@/hooks/useUser';
import { User, UserFilters, UserPrefences } from '@/types/user';
// import PreviewProfileMobile from '../PreviewProfileMobile';
import Preferences from './Preferences';
import SafetyGuide from './SafetyGuide';
// import Interests from './Interests';
// import SettingsMobile from '../SettingsMobile';
// import PreferencesMobile from '../PreferencesMobile';
import Skeleton from '@/components/ui/Skeleton';
import { useAuthStore } from '@/store/UserId';
import PreferredInterestsDesktop from './PreferredInterestsDesktop';
// import PreferredInterestsMobile from './PreferredInterestsMobile';
import UserInterestsDesktop from './UserInterestsDesktop';
import { getYearFromFirebaseDate } from '@/utils/date';


type UserProfileProps = {
};

const UserProfile: React.FC<UserProfileProps> = () => {
    const [activePage, setActivePage] = useState<'user-profile' | 'edit-profile' | 'profile-settings' | 'preferences' | 'safety-guide' | 'interests' | 'user-interests'>('user-profile');
    const [activeSubPage, setActiveSubPage] = useState(0);
    const [userData, setUserData] = useState<User>();
    const [userPrefencesData, setuserPreferencesData] = useState<UserPrefences>();
    const [userFilters, setUserFilters] = useState<UserFilters>();

    const { auth } = useAuthStore();

    const fetchUser = async () => { const data = await useGetUserProfile("users", auth?.uid as string) as User; setUserData(data); }
    const fetchUserPreferences = async () => { const data = await useGetUserProfile("preferences", auth?.uid as string) as UserPrefences; setuserPreferencesData(data) }
    const fetchUserFilters = async () => { const data = await useGetUserProfile("filters", auth?.uid as string) as UserFilters; setUserFilters(data) }

    // useEffect(() => {fetchUser(); fetchUserPreferences()}, [userData, userPrefencesData])
    useEffect(() => { fetchUser(); fetchUserPreferences(); fetchUserFilters() }, [])

    const refetchUserData = async () => { await fetchUser() }
    const refetchUserPreferences = async () => { await fetchUserPreferences() }
    const refetchUserFilters = async () => { await fetchUserFilters() }

    return <>
        <DashboardPageContainer className="">
            <motion.div animate={activePage == 'user-profile' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }} transition={{ duration: 0.25 }} className='user-profile dashboard-layout__main-app__body__main-page'>
                <div className='user-profile__container'>
                    <div className='flex justify-end gap-x-4'>
                        <button onClick={() => setActivePage('profile-settings')} className='user-profile__settings-button'><img src="/assets/images/dashboard/settings.svg" /></button>
                        <button onClick={() => setActivePage('preferences')} className='user-profile__settings-button'><img src="/assets/icons/control.svg" /></button>
                    </div>
                    <section className='user-profile__profile-picture-container'>
                        <figure className='user-profile__profile-picture'>
                            <img src="/assets/images/auth-bg/1.webp" />
                        </figure>
                        <button onClick={() => { setActivePage('edit-profile'); setActiveSubPage(0) }} className='user-profile__update-profile-button cursor-pointer'>
                            <img src="/assets/icons/update-profile.svg" />
                        </button>
                    </section>
                    <section className='user-profile__profile-details'>
                        <div className='user-profile__profile-details flex justify-center mt-2'>
                            {userData ? <p>{userData?.first_name}, <span className='user-profile__profile-details__age'>{userPrefencesData?.date_of_birth ? (new Date()).getFullYear() - getYearFromFirebaseDate(userPrefencesData.date_of_birth) : 'NIL'}</span>
                                <img src="/assets/icons/verified-badge.svg" />
                            </p> : <Skeleton width='150px' height='20px' />}
                        </div>
                        <div className='user-profile__profile-details__completion-status'>
                            20% Complete
                        </div>
                    </section>
                    <div className='user-profile__banner user-profile__banner--info'>
                        <img src="/assets/icons/notification-alert.svg" />
                        <p>Add more info to your profile to stand out. Click on the edit button to get started.</p>
                    </div>
                    <div onClick={() => setActivePage('safety-guide')} className='user-profile__banner user-profile__banner--safety-guide'>
                        <img src="/assets/icons/safety-guide.svg" />
                        <p>Whossy Safety Guide</p>
                    </div>
                    <section className='user-profile__credit-buttons'>
                        <ProfileCreditButtton description='Profile Boost' linkText='Get Now' imgSrc='/assets/images/dashboard/rocket.png' onLinkClick={() => { }} />
                        <ProfileCreditButtton description='Add Credits' linkText='Add More' imgSrc='/assets/images/dashboard/coin.png' onLinkClick={() => { }} />
                    </section>

                </div>
                <section className='user-profile__plans'>
                    <ProfilePlan planTitle='Whossy Free Plan' pricePerMonth='0' benefits={['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4']} type='free' gradientSrc='/assets/images/dashboard/free.svg' />
                    <ProfilePlan planTitle='Whossy Premium Plan' pricePerMonth='12.99' benefits={['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4']} type='premium' gradientSrc='/assets/images/dashboard/premium.svg' />
                </section>

            </motion.div>
            <EditProfile activePage={activePage} activeSubPage={activeSubPage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => { setActivePage('edit-profile'); setActiveSubPage(1) }} setActiveSubPage={setActiveSubPage} onInterests={() => setActivePage('user-interests')} userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences} />
            <SafetyGuide activePage={activePage} activeSubPage={activeSubPage} closePage={() => setActivePage('user-profile')} onSafetyItem={() => { setActivePage('safety-guide'); setActiveSubPage(1) }} setActiveSubPage={setActiveSubPage} />
            <ProfileSettings activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} />
            <Preferences activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage('interests')} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters} />
            <PreviewProfile activePage={activePage} activeSubPage={activeSubPage} closePage={() => { setActivePage('edit-profile'); setActiveSubPage(0) }} setActiveSubPage={setActiveSubPage} userData={userData} userPrefencesData={userPrefencesData} />
            {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}
            <PreferredInterestsDesktop activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters} />
            <UserInterestsDesktop activePage={activePage == 'user-interests'} closePage={() => setActivePage('edit-profile')} onInterests={() => setActivePage('interests')} userPrefencesData={userPrefencesData} refetchUserPreferencesData={refetchUserPreferences} />
        </DashboardPageContainer >
        {/* <AnimatePresence mode="wait">
        <MobileProfile onEditProfilePage={() => setActivePage('edit-profile')} activePage='user-profile' onSettingsPage={() => setActivePage('profile-settings')} onFiltersPage={() => setActivePage('preferences')} />
        <EditProfileMobile activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} />
        <PreviewProfileMobile activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} />
        <SettingsMobile activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} />
        <PreferencesMobile activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage("interests")} />
        <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} />
    </AnimatePresence> */}
        {/* <EditProfile activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} onInterests={() => setActivePage('user-interests')}  userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences} />
            <ProfileSettings activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} />
            <PreviewProfile activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} userData={userData} userPrefencesData={userPrefencesData}/>
            <Preferences activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage('interests')} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/>
            <PreferredInterestsDesktop activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/>
            <UserInterestsDesktop activePage={activePage == 'user-interests'} closePage={() => setActivePage('edit-profile')} onInterests={() => setActivePage('interests')} userPrefencesData={userPrefencesData} refetchUserPreferencesData={refetchUserPreferences}/> */}
        {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}
        {/* </DashboardPageContainer> */}
        {/* <AnimatePresence mode="wait"> */}
        {/* <MobileProfile onEditProfilePage={() => setActivePage('edit-profile')} activePage='user-profile' onSettingsPage={() => setActivePage('profile-settings')} onFiltersPage={() => setActivePage('preferences')} userData={userData} userPrefencesData={userPrefencesData}/> */}
        {/* <EditProfileMobile  activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} userData={userData} userPrefencesData={userPrefencesData} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserPreferences}/> 
            <PreviewProfileMobile  activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} userData={userData} userPrefencesData={userPrefencesData}/> 
            <SettingsMobile activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')}/>
            <PreferencesMobile activePage={activePage == 'preferences'} closePage={() => setActivePage('user-profile')} onInterests={() => setActivePage("interests")} userData={userData} userPrefencesData={userFilters} refetchUserData={refetchUserData} refetchUserPreferencesData={refetchUserFilters}/>
            <PreferredInterestsMobile activePage={activePage == 'interests'} closePage={() => setActivePage('preferences')} onInterests={() => setActivePage('interests')} userPrefencesData={userFilters} refetchUserPreferencesData={refetchUserFilters}/> */}

        {/* <Interests activePage={activePage === "interests"} closePage={() => setActivePage('preferences')} /> */}

        {/* </AnimatePresence> */}
    </>
}
export default UserProfile;