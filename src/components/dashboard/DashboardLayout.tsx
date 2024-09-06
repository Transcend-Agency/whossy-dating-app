import React from 'react';
import DashboardNavIcon from './DashboardNavIcon';
import { Outlet, useLocation } from 'react-router-dom';
import Matches from './Matches';
import ChatInterface from './ChatInterface';

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
    const { pathname } = useLocation()

    return <>
        <div className='dashboard-layout hidden lg:block'>
            <ChatInterface />
            <nav className='dashboard-layout__top-nav'>
                <div className='dashboard-layout__top-nav__container'>
                    <div className='dashboard-layout__top-nav__logo'>
                        Logo
                    </div>
                    <div className='dashboard-layout__top-nav__icons-container'>
                        <DashboardNavIcon active={pathname === '/dashboard/swipe-and-match'} icon='swipe-and-match' />
                        <DashboardNavIcon active={pathname === '/dashboard/explore'} icon='explore' />
                        <DashboardNavIcon active={pathname === '/dashboard/matches'} icon='matches' />
                        <DashboardNavIcon active={pathname === '/dashboard/user-profile'} icon='user-profile' />
                    </div>
                    <div className='dashboard-layout__top-nav__control-icons-container'>
                        <img className='dashboard-layout__top-nav__control-icon' src='/assets/icons/notification.svg' />
                        {/* <img className='dashboard-layout__top-nav__control-icon' src='/assets/icons/control.svg' /> */}
                    </div>
                </div>
            </nav>
            <main className='dashboard-layout__main-app'>
                <Matches />
                <Outlet />
            </main>
        </div>
        <div className="h-screen flex flex-col lg:hidden">
            <nav className="dashboard-layout__top-nav">
                <div className="dashboard-layout__top-nav__logo"></div>
            </nav>
            <Outlet />
        </div>
    </>
};
export default Dashboard;