import React from 'react';

type AlternateSignupOptionsProps = {
    text: string
    google: () => void
    facebook: () => void
    phone: () => void
};

const AlternateSignupOptions: React.FC<AlternateSignupOptionsProps> = ({ text = 'or', google, facebook, phone }) => {

    return <div className='auth-page__modal__alternate-options'>
        <div className="auth-page__modal__alternate-options__divider">
            <div></div>
            <p>{text}</p>
            <div></div>
        </div>
        <div className='auth-page__modal__alternate-options__container'>
            <div onClick={facebook} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/facebook.svg" /></div>
            <div onClick={google} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/google.svg" /></div>
            <div onClick={phone} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/phone.svg" /></div>
        </div>
    </div>
}
export default AlternateSignupOptions;