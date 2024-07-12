import React from 'react';

type AuthModalHeaderProps = {
    title: string;
    subtitle: string
};

const AuthModalHeader: React.FC<AuthModalHeaderProps> = ({ title, subtitle }) => {

    return <div className='auth-page__modal__header'>
        <h1 className='auth-page__modal__header__title'>{title}</h1>
        <h2 className='auth-page__modal__header__sub-title'>{subtitle}</h2>
    </div>
}
export default AuthModalHeader;