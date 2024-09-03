import React, { useState } from 'react';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ProfileCreditButttons from '../../components/dashboard/ProfileCreditButtton';
import ProfileCreditButtton from '../../components/dashboard/ProfileCreditButtton';
import ProfilePlan from '../../components/dashboard/ProfilePlan';
import EditProfile from './EditProfile';
import { motion } from 'framer-motion'
import ProfileSettings from './ProfileSettings';
import PreviewProfile from './PreviewProfile';

type UserProfileProps = {
};

const UserProfile: React.FC<UserProfileProps> = () => {
    const [activePage, setActivePage] = useState<'user-profile' | 'edit-profile' | 'profile-settings' | 'preview-profile'>('user-profile')
    return <>
        <DashboardPageContainer>
            <motion.div animate={activePage == 'user-profile' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }} transition={{ duration: 0.25 }} className='user-profile dashboard-layout__main-app__body__main-page'>
                <div className='user-profile__container'>
                    <div className='flex justify-end'>
                        <button onClick={() => setActivePage('profile-settings')} className='user-profile__settings-button'><img src="/assets/images/dashboard/settings.svg" /></button>
                    </div>
                    <section className='user-profile__profile-picture-container'>
                        <figure className='user-profile__profile-picture'>
                            <img src="/assets/images/auth-bg/1.webp" />
                        </figure>
                        <button onClick={() => setActivePage('edit-profile')} className='user-profile__update-profile-button'>
                            <img src="/assets/icons/update-profile.svg" />
                        </button>
                    </section>
                    <section className='user-profile__profile-details'>
                        <div className='user-profile__profile-details'>
                            <p>Stephanie, <span className='user-profile__profile-details__age'>21</span>
                                <img src="/assets/icons/verified-badge.svg" />
                            </p>
                        </div>
                        <div className='user-profile__profile-details__completion-status'>
                            20% Complete
                        </div>
                    </section>
                    <div className='user-profile__banner user-profile__banner--info'>
                        <img src="/assets/icons/notification-alert.svg" />
                        <p>Add more info to your profile to stand out. Click on the edit button to get started.</p>
                    </div>
                    <div className='user-profile__banner user-profile__banner--safety-guide'>
                        <img src="/assets/icons/notification-alert.svg" />
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
            <EditProfile activePage={activePage} closePage={() => setActivePage('user-profile')} onPreviewProfile={() => setActivePage('preview-profile')} />
            <ProfileSettings activePage={activePage == 'profile-settings'} closePage={() => setActivePage('user-profile')} />
            <PreviewProfile activePage={activePage == 'preview-profile'} closePage={() => setActivePage('edit-profile')} />
        </DashboardPageContainer>
    </>
}
export default UserProfile;