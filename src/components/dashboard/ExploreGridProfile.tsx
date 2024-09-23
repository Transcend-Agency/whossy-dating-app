interface ExploreGridProfileProps {
    profile_image: string
    distance: string;
    first_name: string;
    age: number;
    onProfileClick: () => void
}

const ExploreGridProfile: React.FC<ExploreGridProfileProps> = ({
    profile_image,
    distance,
    first_name,
    age,
    onProfileClick
}) => {
    return (
        <div onClick={onProfileClick} className='explore-grid__profile'>
            <figure className='explore-grid__profile-picture'>
                <img className='explore-grid__profile-picture-image' src={profile_image} />
                <div className='explore-grid__profile-picture-gradient' />
            </figure>
            <div className='explore-grid__profile-info'>
                <div className='explore-grid__profile-info-top'>
                    <figure className='new-profile'>
                        <img src="/assets/icons/leaf.svg" />
                        New
                    </figure>
                    <span>~ {distance}</span>
                </div>
                <div className='explore-grid__profile-info-bottom'>
                    <span className='explore-grid__profile-name'>{first_name},</span>
                    <span className='explore-grid__profile-age'>{age}</span>
                    <img src='/assets/icons/verified.svg' />
                </div>
            </div>
        </div>
    );
}

export default ExploreGridProfile;