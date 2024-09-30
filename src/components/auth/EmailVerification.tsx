import { getAuth, sendEmailVerification } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import AuthModalHeader from './AuthModalHeader';
import AuthModalRequestMessage from './AuthModalRequestMessage';
import AuthPage from './AuthPage';


type EmailVerificationProps = {

};

const EmailVerification: React.FC<EmailVerificationProps> = () => {
    const [canResendCode, setCanResendCode] = useState(false)
    const auth = getAuth()
    const [loading ] = useState(false)
    const [requestError] = useState('')
    const navigate = useNavigate()

    const renderer = ({ seconds, completed, }: { seconds: number, completed: boolean }) => {
        if (completed == true)
            setCanResendCode(true)
        // if (completed) {
        //     // Render a completed state
        //     return <span className="auth-page__modal__otp-input__notifier__cta">Resend code</span>
        // } else {
        return <> in {seconds}s</>
        // }
    };

    const onResendCodeClick = async () => {
        setCanResendCode(false)
        await sendEmailVerification(auth.currentUser!, {
            url: `${import.meta.env.VITE_APP_FRONTEND_URL}/auth/login`
        })
    }

    // const onContinue = async () => {
    //     console.log(auth.currentUser)
    //     setLoading(true)
    //     const result = await auth.currentUser?.reload()
    //     setLoading(false)
    //     if (auth.currentUser?.emailVerified) {
    //         navigate('/auth/finalize-setup')
    //     } else {
    //         setRequestError('Email Still Unverified')
    //     }
    //     console.log(result)
    // }

    if (!auth.currentUser) {
        navigate('/auth/login')
    }

    return <AuthPage className='email-verification'>
        <div className='auth-page__modal pt-[30px]'>
            <AnimatePresence mode='wait'>
                {requestError && <AuthModalRequestMessage errorMessage={requestError} />}
            </AnimatePresence>
            <AuthModalHeader title='Email Verification' subtitle={`A verification link have been sent to your email ${auth.currentUser?.email?.split('@')[0].slice(0, 1)}********${auth.currentUser?.email?.split('@')[0].slice(-1)}@${auth.currentUser?.email?.split('@')[1]}. Kindly verify to complete account set up`} />
            <p className="auth-page__modal__otp-input__notifier">Didn’t receive the code? <span onClick={canResendCode ? onResendCodeClick : () => { }} className={`auth-page__modal__otp-input__notifier__cta ${!canResendCode && 'disabled'}`}>Resend code</span> {!canResendCode && <Countdown
                date={Date.now() + 40000}
                renderer={renderer}
            />}</p>
 <button className='w-full rounded-[0.8rem] cursor-pointer bg-[#F2243E] py-6 text-white text-[1.8rem] font-medium leading-[2.16rem] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-70 transition-all duration-200 flex items-center justify-center' onClick={() => navigate('/auth/login')}> {!loading ? "Continue" : <motion.img key="loading-image"className='button__loader' src='/assets/icons/loader.gif' />} </button>
        </div>
    </AuthPage>
}
export default EmailVerification;