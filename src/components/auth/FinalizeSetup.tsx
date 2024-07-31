import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import AuthModalHeader from './AuthModalHeader';
import AuthPage from './AuthPage';

type FinalizeSetupProps = {

};

const FinalizeSetup: React.FC<FinalizeSetupProps> = () => {
    const navigate = useNavigate()
    const startOnboarding = () => navigate('/onboarding')

    return <AuthPage className='finalize-setup'>
        <div className='auth-page__modal'>
            <AuthModalHeader type="gradient-bg" title='Welcome to Whossy!' subtitle="Please follow these community rules when looking for a match." />
            <div className="auth-page__modal__icon-text-group-container">

                <div className="auth-page__modal__icon-text-group">
                    <div className="auth-page__modal__icon-text-group__image"><img src="/assets/icons/hands-up-emoji.png" /></div>
                    <div className='auth-page__modal__icon-text-group__text'>
                        <p className="auth-page__modal__icon-text-group__text__title">Be real </p>
                        <p className="auth-page__modal__icon-text-group__text__subtext">Ensure your photos, age and bio are true. This will increase your chances of getting matched.</p>
                    </div>
                </div>
                <div className="auth-page__modal__icon-text-group">
                    <div className="auth-page__modal__icon-text-group__image"><img src="/assets/icons/exclamation-emoji.png" /></div>
                    <div className='auth-page__modal__icon-text-group__text'>
                        <p className="auth-page__modal__icon-text-group__text__title">DO NOT share personal data or information  </p>
                        <p className="auth-page__modal__icon-text-group__text__subtext">Always keep your personal information and do not be too quick to share with anyone.</p>
                    </div>
                </div>
                <div className="auth-page__modal__icon-text-group">
                    <div className="auth-page__modal__icon-text-group__image"><img src="/assets/icons/handshake-emoji.png" /></div>
                    <div className='auth-page__modal__icon-text-group__text'>
                        <p className="auth-page__modal__icon-text-group__text__title">Respect others </p>
                        <p className="auth-page__modal__icon-text-group__text__subtext">Treat others the way you would like to be treated, avoid being rude and chat safely.</p>
                    </div>
                </div>
                <div className="auth-page__modal__icon-text-group">
                    <div className="auth-page__modal__icon-text-group__image"><img src="/assets/icons/anger-emoji.png" /></div>
                    <div className='auth-page__modal__icon-text-group__text'>
                        <p className="auth-page__modal__icon-text-group__text__title">Report bad behavior</p>
                        <p className="auth-page__modal__icon-text-group__text__subtext">Don’t hesitate to hit the report button whenever you feel threatened or see a bad behavior.</p>
                    </div>
                </div>
            </div>
            <Button onClick={startOnboarding} className='auth-page__modal__form__button' text='I agree' />
        </div>
    </AuthPage>
}
export default FinalizeSetup;