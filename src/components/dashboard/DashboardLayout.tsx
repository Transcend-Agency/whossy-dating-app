import Matches from "@/components/dashboard/Matches.tsx";
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { User } from '@/types/user';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ChatInterface from './ChatInterface';
import DashboardNavIcon from './DashboardNavIcon';
import ShortcutControls from './ShortcutControls';

const Dashboard: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [newNotification, setNewNotification] = useState(false);

    const { auth } = useAuthStore();

    useEffect(() => {

        const userDocRef = doc(db, "users", auth?.uid as string);

        const unSub = onSnapshot(userDocRef, async () => {
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const data = userDocSnap.data() as User;
                if (data.notifications !== undefined && data.notifications !== null) {
                    setNewNotification(data.notifications)
                }
            }
        });

        return () => {
            unSub();
        };
    }, [auth?.uid])
    return <>
        <div className='dashboard-layout hidden lg:block'>
            <ChatInterface />
            <AnimatePresence>
                {pathname == '/dashboard/swipe-and-match' && <ShortcutControls />}
            </AnimatePresence>
            <nav className='dashboard-layout__top-nav'>
                <div className='dashboard-layout__top-nav__container'>
                    <div className='dashboard-layout__top-nav__logo hidden lg:block'>
                        <img src={'/assets/icons/whossy-logo.svg'} alt="Logo" className='w-[10rem]' />

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
                        {!newNotification && <div className='bg-red-700 absolute size-[0.8rem] rounded-full right-[1px] ' />}
                    </div>
                </div>
            </nav>
            <main className='dashboard-layout__main-app'>
                <Matches />
                <Outlet />
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