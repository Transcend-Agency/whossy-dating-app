import React from 'react';

type ProfileCreditButttonProps = {
    description: string;
    linkText: string;
    onLinkClick: () => void;
    imgSrc: string
};


const ProfileCreditButtton: React.FC<ProfileCreditButttonProps> = ({ description, linkText,  imgSrc, onLinkClick }) => {


    return <div className='user-profile__credit-buttons__button'>
        <img src={imgSrc} />
        <div className='user-profile__credit-buttons__button__text'>
            <p className='user-profile__credit-buttons__button__description'>
                {description}
            </p>
            <button className='user-profile__credit-buttons__button__link' onClick={onLinkClick}>{linkText}</button>

        </div>
    </div>
}

// const AddCreditPage: React.FC<AddCreditPageProps> = () => {

// }
export default ProfileCreditButtton;

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.');
}
