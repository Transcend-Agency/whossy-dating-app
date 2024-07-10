import React from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const navigate = useNavigate()

    return <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className='login'>
        <div className='login__modal'>
            <div onClick={() => navigate(-1)} className='login__modal__back-button'>
                <img src="/assets/icons/back-arrow.svg" />
            </div>
            <div className='login__modal__header'>
                <h1 className='login__modal__header__title'>Welcome back</h1>
                <h2 className='login__modal__header__sub-title'>login to see who you’ve matched with ✌</h2>
            </div>
            <form className='login__modal__form'>
                <input placeholder='example@gmail.com' className='login__modal__form__input' />
                <input placeholder='password' type='password' className='login__modal__form__input' />
                <button className='button login__modal__form__button'>Login</button>
                <p className='login__modal__form__cta'>Forgot Password? <span className='underline'>Reset here</span></p>
            </form>
            <div className='login-modal__alternate-options'>
                
            </div>

        </div>
    </motion.div>
}
export default Login;