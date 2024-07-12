import React, { useState } from 'react';
import AuthPage from '../components/auth/AuthPage';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthInput from '../components/auth/AuthInput';
import Button from '../components/ui/Button';
import ResetPasswordRequirementParamater from '../components/auth/ResetPasswordRequirementParamater';
import AlternateSignupOptions from '../components/auth/AlternateSignupOptions';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

type CreateAccountProps = {

};

interface CreateAccountFormPage {
    advance: () => void
    goBack: () => void
    key: string
}

const CreateAccountHome: React.FC<CreateAccountFormPage> = ({ advance, goBack, key }) => {
    return (
        <AuthPage key={key} className='create-account-home'>
            <div className='auth-page__modal'>
                <AuthModalBackButton />
                <AuthModalHeader title='Create Account' subtitle="Your perfect match is a swipe away :)" />
                <form className='auth-page__modal__form'>
                    <AuthInput placeholder='Your Email' />
                    <AuthInput placeholder='password' type='password' />
                    <AuthInput placeholder='confirm password' type='confirm password' />
                    <Button onClick={(e) => { e.preventDefault(); advance() }} className='auth-page__modal__form__button' text='Create Account' />
                </form>
                <AlternateSignupOptions text='or sign up with' />
                <div className="auth-page__modal__terms-and-conditions">
                    By clicking on “Login” you agree to our <Link to="/terms-and-conditions">Terms and condition</Link>. Learn how we process your data in our <Link to="/privacy-policy">Privacy Policy</Link>.</div>
            </div>
        </AuthPage>
    )
}

const FillInAccountNames: React.FC<CreateAccountFormPage> = ({ advance, goBack, key }) => {
    return (
        <AuthPage key={key} className='create-account-home'>
            <div className='auth-page__modal'>
                <AuthModalBackButton />
                <AuthModalHeader title='Welcome to Whossy, Let’s get you Started' subtitle="Ensure to enter the correct data as some will appear on your profile." />
                <form className='auth-page__modal__form'>
                    <AuthInput placeholder='First Name' />
                    <AuthInput placeholder='Last Name' />
                    <Button onClick={(e) => { e.preventDefault(); advance() }} className='auth-page__modal__form__button' text='Continue' />
                </form>
            </div>
        </AuthPage>
    )
}

const FillInCountries: React.FC<CreateAccountFormPage> = ({ advance, goBack, key }) => {
    return (
        <AuthPage key={key} className='create-account-home'>
            <div className='auth-page__modal'>
                <AuthModalBackButton />
                <AuthModalHeader title='Just a few more steps to go!' subtitle="Ensure to enter the correct data as some will appear on your profile." />
                <form className='auth-page__modal__form'>
                    <AuthInput placeholder='Phone' />
                    <AuthInput placeholder='Country of Origin' />
                    <Button onClick={(e) => { e.preventDefault(); advance() }} className='auth-page__modal__form__button' text='Continue' />
                </form>
            </div>
        </AuthPage>
    )
}

const FillInGender: React.FC<CreateAccountFormPage> = ({ advance, goBack, key }) => {
    return (
        <AuthPage key={key} className='create-account-home'>
            <div className='auth-page__modal'>
                <AuthModalBackButton />
                <AuthModalHeader title='Your account is almost ready!' subtitle="Select your gender." />
                <form className='auth-page__modal__form'>
                    <div className='auth-page__modal__form__gender'>
                        
                    </div>
                    <Button onClick={(e) => { e.preventDefault(); advance() }} className='auth-page__modal__form__button' text='Continue' />
                </form>
            </div>
        </AuthPage>
    )
}

const CreateAccount: React.FC<CreateAccountProps> = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const pageOrder = ['home', 'names', 'countries', 'gender', 'welcome']

    const advance = () => {
        setCurrentPage(currentPage + 1)
        console.log('this was called')
    }
    const goBack = () => {
        setCurrentPage(currentPage - 1)
    }
    return (
        <AnimatePresence mode='wait'>
            {pageOrder[currentPage] == 'home' && <CreateAccountHome key="create-account-home" advance={advance} goBack={goBack} />}
            {pageOrder[currentPage] == 'names' && <FillInAccountNames key="create-account-names" advance={advance} goBack={goBack} />}
            {pageOrder[currentPage] == 'countries' && <FillInCountries key="create-account-countries" advance={advance} goBack={goBack} />}
            {pageOrder[currentPage] == 'gender' && <FillInGender key="create-account-gender" advance={advance} goBack={goBack} />}
        </AnimatePresence>
    )
}
export default CreateAccount;