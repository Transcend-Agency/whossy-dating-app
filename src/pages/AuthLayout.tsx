import React from 'react';
import MarqueeImageSliderBackground from '../components/auth/MarqueeImageSliderBackground';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';

type AuthLayoutProps = {

};

const AuthLayout: React.FC<AuthLayoutProps> = () => {

    return <div>
        <Outlet />
    </div>
}
export default AuthLayout;