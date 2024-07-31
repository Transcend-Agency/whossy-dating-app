import React from 'react';
import { Outlet } from 'react-router-dom';

type AuthLayoutProps = {

};

const AuthLayout: React.FC<AuthLayoutProps> = () => {

    return <div>
        <Outlet />
    </div>
}
export default AuthLayout;