import React from 'react';
import { FormFieldProps } from '@/types/auth.ts';
import { motion } from 'framer-motion'

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & FormFieldProps

const AuthInput: React.FC<AuthInputProps> = ({ className, placeholder, type = 'text', register, name, error, valueAsNumber, ...props }) => {

    return <>
        <input type={type}
            placeholder={placeholder}
            {...register(name, { valueAsNumber })} className={`auth-page__modal__form__input ${className} ${error && 'auth-page__modal__form__input--error'}`} {...props} />
        <div className='error-message-container'><motion.span animate={{ opacity: error ? 1 : 0, transition: { duration: 0.2 } }} className="error-message">{error?.message as string}</motion.span></div>
    </>
}
export default AuthInput;