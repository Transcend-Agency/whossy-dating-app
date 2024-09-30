import React from 'react';
import DashboardNavIcon from './DashboardNavIcon';
import { Outlet, useLocation } from 'react-router-dom';
import Matches from './MatchesSide';
import ChatInterface from './ChatInterface';
import ShortcutControls from './ShortcutControls';
import { AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
    const { pathname } = useLocation()
    // console.log(pathname)
    return <>
        <div className='dashboard-layout hidden lg:block'>
            <ChatInterface />
            <AnimatePresence>
                {pathname == '/dashboard/swipe-and-match' && <ShortcutControls />}
            </AnimatePresence>
            <nav className='dashboard-layout__top-nav'>
                <div className='dashboard-layout__top-nav__container'>
                    <div className='dashboard-layout__top-nav__logo hidden lg:block'>
                        Logo
                    </div>
                    <div className='dashboard-layout__top-nav__icons-container'>
                        <DashboardNavIcon active={pathname === '/dashboard/swipe-and-match'} icon='swipe-and-match' />
                        <DashboardNavIcon active={pathname === '/dashboard/explore'} icon='explore' />
                        <DashboardNavIcon active={pathname === '/dashboard/matches'} icon='matches' />
                        <DashboardNavIcon active={pathname === '/dashboard/chat'} icon='chat' />
                        <DashboardNavIcon active={pathname === '/dashboard/user-profile'} icon='user-profile' />
                    </div>
                    <div className='dashboard-layout__top-nav__control-icons-container'>
                        <img className='dashboard-layout__top-nav__control-icon  hidden lg:block' src='/assets/icons/notification.svg' />
                        {/* <img className='dashboard-layout__top-nav__control-icon' src='/assets/icons/control.svg' /> */}
                    </div>
                </div>
            </nav>
            <main className='dashboard-layout__main-app'>
                <Matches />
                <Outlet />
            </main>
        </div>
        <div className="h-screen flex pb-[6rem] flex-col lg:hidden">
            <Outlet />
            <div className='dashboard-layout__mobile-nav'>
                <DashboardNavIcon active={pathname === '/dashboard/swipe-and-match'} icon='swipe-and-match' />
                <DashboardNavIcon active={pathname === '/dashboard/explore'} icon='explore' />
                <DashboardNavIcon active={pathname === '/dashboard/matches'} icon='matches' />
                <DashboardNavIcon active={pathname === '/dashboard/user-profile'} icon='user-profile' />
            </div>
        </div>
    </>
};
export default Dashboard;