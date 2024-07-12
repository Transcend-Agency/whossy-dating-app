import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    placeholder: string
};

const AuthInput: React.FC<AuthInputProps> = ({ className, placeholder, ...props }) => {

    return <input placeholder={placeholder} className={`auth-page__modal__form__input ${className}`} {...props} />
}
export default AuthInput;