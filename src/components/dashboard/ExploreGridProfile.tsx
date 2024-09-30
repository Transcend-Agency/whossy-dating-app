import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { motion } from 'framer-motion'

interface ExploreGridProfileProps {
    profile_image?: string
    distance?: string;
    first_name: string;
    age: number;
    onProfileClick: () => void
    isVerified?: boolean;
    hasBeenLiked?: boolean
}

const ExploreGridProfile: React.FC<ExploreGridProfileProps> = ({
    profile_image,
    distance,
    first_name,
    age,
    onProfileClick, isVerified, hasBeenLiked
}) => {
    return (
        <div onClick={onProfileClick} className='explore-grid__profile'>
            <figure className='explore-grid__profile-picture'>
                <LazyLoadImage
                    className='explore-grid__profile-picture-image'
                    height={'100%'}
                    effect="opacity"
                    src={profile_image || '/assets/images/profile/profile-pic-placeholder.png'}
                    width={'100%'} />
                <div className='explore-grid__profile-picture-gradient' />
            </figure>
            <div className='explore-grid__profile-info'>
                <div className='explore-grid__profile-info-top'>
                    <div className="explore-grid__profile-info-top-left">
                        <figure className='new-profile'>
                            <img src="/assets/icons/leaf.svg" />
                            New
                        </figure>
                        {/* <span>~ {distance}</span> */}
                    </div>
                    {hasBeenLiked && <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="explore-grid__profile-like-icon" src="/assets/icons/heart.svg" />}
                </div>
                <div>

                    <div className='explore-grid__profile-info-bottom'>
                        <span className='explore-grid__profile-name'>{first_name},</span>
                        <span className='explore-grid__profile-age'>{age}</span>
                        {isVerified && <img src='/assets/icons/verified.svg' />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreGridProfile;