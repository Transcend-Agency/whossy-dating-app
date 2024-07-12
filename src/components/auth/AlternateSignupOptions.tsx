import React from 'react';

type AlternateSignupOptionsProps = {
    text: string
};

const AlternateSignupOptions: React.FC<AlternateSignupOptionsProps> = ({text = 'or'}) => {

    return <div className='auth-page__modal__alternate-options'>
        <div className="auth-page__modal__alternate-options__divider">
            <div></div>
            <p>{text}</p>
            <div></div>
        </div>
        <div className='auth-page__modal__alternate-options__container'>
            <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/facebook.svg" /></div>
            <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/google.svg" /></div>
            <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/phone.svg" /></div>
        </div>
    </div>
}
export default AlternateSignupOptions;