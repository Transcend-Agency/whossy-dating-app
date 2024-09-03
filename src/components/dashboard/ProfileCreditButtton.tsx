import React from 'react';

type ProfileCreditButttonProps = {
    description: string;
    linkText: string;
    onLinkClick: () => void;
    imgSrc: string
};

const ProfileCreditButtton: React.FC<ProfileCreditButttonProps> = ({ description, linkText,  imgSrc }) => {

    return <div className='user-profile__credit-buttons__button'>
        <img src={imgSrc} />
        <div className='user-profile__credit-buttons__button__text'>
            <p className='user-profile__credit-buttons__button__description'>
                {description}
            </p>
            <p className='user-profile__credit-buttons__button__link'>{linkText}</p>
        </div>
    </div>
}
export default ProfileCreditButtton;