import React from 'react';
import AuthPage from '../components/auth/AuthPage';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthInput from '../components/auth/AuthInput';
import Button from '../components/ui/Button';

type ForgotPasswordProps = {

};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {

    return <AuthPage className='forgot-password'>
        <div className='auth-page__modal'>
            <AuthModalBackButton />
            <AuthModalHeader title='Forgot your password?' subtitle="Enter your email below, and we'll send you instructions to reset your password." />
            <form className='auth-page__modal__form'>
                <AuthInput placeholder='Your Email' />
                <Button className='auth-page__modal__form__button' text='Verify' />
            </form>
        </div>
    </AuthPage>
}
export default ForgotPassword;