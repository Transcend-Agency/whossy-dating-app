import React from 'react';

type ButtonProps = {
    text: string
};

const Button: React.FC<ButtonProps> = ({ text }) => {

    return <button className='button'>{text}</button>
}
export default Button;