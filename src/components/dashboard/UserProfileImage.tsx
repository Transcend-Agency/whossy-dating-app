import React from 'react';

type UserProfileImageProps = {
    imageSrc: string
};

const UserProfileImage: React.FC<UserProfileImageProps> = ({ imageSrc }) => {

    return <figure className="settings-page__profile-images__image">
        <button className="settings-page__profile-images__control-icon" >
            {!imageSrc && <img src="/assets/images/dashboard/camera-plus.png" />}
            {imageSrc && <img src="/assets/images/dashboard/options.png" />}
        </button>
        {imageSrc && <img src={imageSrc} className="settings-page__profile-images__image__item" />}
    </figure>
}
export default UserProfileImage;