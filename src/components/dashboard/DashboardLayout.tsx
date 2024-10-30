import React, { useEffect, useState} from 'react';
import DashboardNavIcon from './DashboardNavIcon';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Matches from './MatchesSide';
import ChatInterface from './ChatInterface';
import ShortcutControls from './ShortcutControls';
import { AnimatePresence } from 'framer-motion';
import { IoIosNotifications } from "react-icons/io";
import ViewProfile from "@/components/dashboard/ViewProfile.tsx";
import {useDashboardContext} from "@/hooks/useDashBoardContext.tsx";
import useSyncUserLikes from "@/hooks/useSyncUserLikes.tsx";
import {useAuthStore} from "@/store/UserId.tsx";
import useProfileFetcher from "@/hooks/useProfileFetcher.tsx";

const Dashboard: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [newNotification, setNewNotification] = useState(false);
    const { selectedProfile, setSelectedProfile, profiles } = useDashboardContext()

    const { user } = useAuthStore();
    const userLikes = useSyncUserLikes(user!.uid!);
    const { refreshProfiles } = useProfileFetcher()

    const hasUserBeenLiked = (id: string) => {
        return Boolean(userLikes.filter(like => (like.liked_id === id)).length)
    }

    useEffect(() => {
        if (pathname === '/dashboard/notification') {
            setNewNotification(true);
        }
        return () => {
            setNewNotification(false);
        }
    }, [pathname])
    return <>
        <div className='dashboard-layout hidden lg:block'>
            <ChatInterface />
            <AnimatePresence>
                {pathname == '/dashboard/swipe-and-match' && <ShortcutControls />}
            </AnimatePresence>
            <nav className='dashboard-layout__top-nav'>
                <div className='dashboard-layout__top-nav__container'>
                    <div className='dashboard-layout__top-nav__logo hidden lg:block'>
                    <img src={'/assets/icons/whossy-logo.svg'} alt="Logo" className='dashboard-layout__top-nav__control-icon' />
    
                    </div>
                    <div className='dashboard-layout__top-nav__icons-container items-center'>
                        <DashboardNavIcon active={pathname === '/dashboard/swipe-and-match'} icon='swipe-and-match' />
                        <DashboardNavIcon active={pathname === '/dashboard/explore'} icon='explore' />
                        <DashboardNavIcon active={pathname === '/dashboard/matches'} icon='matches' />
                        <DashboardNavIcon active={pathname === '/dashboard/chat'} icon='chat' />
                        <DashboardNavIcon active={pathname === '/dashboard/user-profile'} icon='user-profile' />
                    </div>
                    <div className='dashboard-layout__top-nav__control-icons-container relative' onClick={() => navigate('/dashboard/notification')}>
                        <IoIosNotifications className={`size-[2.8rem] hover:scale-[1.02] active:scale-[0.95] cursor-pointer ${pathname === '/dashboard/notification' ? 'text-[#F2243E]' : 'text-[#8A8A8E]'}`} />
                        {!newNotification && <div className='bg-red-700 absolute size-[0.8rem] rounded-full right-[1px] '/>}
                    </div>
                </div>
            </nav>
            <main className='dashboard-layout__main-app'>
                    <Matches/>
                    {
                        selectedProfile ?
                        <ViewProfile
                            onBackClick={() => { setSelectedProfile(null) }}
                            userData={profiles.find(profile => selectedProfile as string == profile.uid)!}
                            profile_has_been_liked={hasUserBeenLiked(selectedProfile)}
                            onBlockChange={refreshProfiles}
                        />  : <Outlet />
                    }
            </main>
        </div>
        <div className="h-screen flex flex-col lg:hidden">
            <Outlet />
            <div className='dashboard-layout__mobile-nav'>
                <DashboardNavIcon active={pathname === '/dashboard/swipe-and-match'} icon='swipe-and-match' />
                <DashboardNavIcon active={pathname === '/dashboard/explore'} icon='explore' />
                <DashboardNavIcon active={pathname === '/dashboard/matches'} icon='matches' />
                <DashboardNavIcon active={pathname === '/dashboard/chat'} icon='chat' />
                <DashboardNavIcon active={pathname === '/dashboard/user-profile'} icon='user-profile' />
            </div>
        </div>
    </>
};
export default Dashboard;