import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string
};

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {

    return <button className={`button ${className}`} {...props}>{text}</button>
}
export default Button;