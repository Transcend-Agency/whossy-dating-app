import React from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../components/auth/AuthInput';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthPage from '../components/auth/AuthPage';
import Button from '../components/ui/Button';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {

    return <AuthPage className='login'>
        <div className='auth-page__modal'>
            <AuthModalBackButton />
            <AuthModalHeader title='Welcome back' subtitle='login to see who you’ve matched with ✌' />
            <form className='auth-page__modal__form'>
                <AuthInput placeholder='example@gmail.com' />
                <AuthInput placeholder='password' type='password' />
                <Button className='auth-page__modal__form__button' text='Login' />
                <p className='auth-page__modal__form__cta'>Forgot Password? <Link to="/auth/forgot-password" className='underline'>Reset here</Link></p>
            </form>
            <div className='auth-page__modal__alternate-options'>
                <div className="auth-page__modal__alternate-options__divider">
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <div className='auth-page__modal__alternate-options__container'>
                    <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/facebook.svg" /></div>
                    <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/google.svg" /></div>
                    <div className='auth-page__modal__alternate-options__item'><img src="/assets/icons/phone.svg" /></div>
                </div>
            </div>
            <div className="auth-page__modal__terms-and-conditions">
                By clicking on “Login” you agree to our <Link to="/terms-and-conditions">Terms and condition</Link>. Learn how we process your data in our <Link to="/privacy-policy">Privacy Policy</Link>.</div>

        </div>
    </AuthPage>
}
export default Login;