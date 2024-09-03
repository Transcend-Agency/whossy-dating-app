import React from 'react';

type ProfilePlanProps = {
    planTitle: string;
    pricePerMonth: string;
    benefits: string[];
    type: string;
    gradientSrc: string
};

const ProfilePlan: React.FC<ProfilePlanProps> = ({ planTitle, type, pricePerMonth, benefits, gradientSrc }) => {

    return <div className={`user-profile__plans__plan user-profile__plans__plan--${type}`}>
        <img className={'user-profile__plans__plan__gradient'} src={gradientSrc} />
        <h3 className='user-profile__plans__plan__title'>{planTitle}</h3>
        <p className='user-profile__plans__plan__pricing'>
            <span className='currency'>$</span>
            <span className='price'>{pricePerMonth}</span>
            <span className='billing-cycle'>/month</span>
        </p>
        <div className='user-profile__plans__plan__benefits'>
            {benefits.map(benefit => (
                <div className='user-profile__plans__plan__benefit'>{benefit}</div>
            ))}
        </div>
        <button className='user-profile__plans__plan__cta'>See all features</button>
    </div>
}
export default ProfilePlan;