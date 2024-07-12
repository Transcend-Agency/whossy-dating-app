import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthModalBackButtonProps {
    to?: string
    onClick?: () => void
}

const AuthModalBackButton: React.FC<AuthModalBackButtonProps> = ({ to, onClick }) => {
    const navigate = useNavigate()
    return <div onClick={onClick || (() => navigate((to as any) || -1))} className='auth-page__modal__back-button'>
        <img src="/assets/icons/back-arrow.svg" />
    </div>
}
export default AuthModalBackButton;