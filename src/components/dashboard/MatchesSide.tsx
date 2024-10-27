import useSyncUserMatches from '@/hooks/useSyncUserMatches';
import { useAuthStore } from '@/store/UserId';
import { User } from '@/types/user';
import { getYearFromFirebaseDate } from '@/utils/date';
import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { motion } from 'framer-motion'
import { useMatchStore } from '@/store/Matches';
import Skeleton from 'react-loading-skeleton';

type MatchesProps = {
    userData?: User;
    onViewProfileClick: () => void
    isLazyLoaded?: boolean
};

// @ts-expect-error unused vars
const MatchesEmptyState = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='dashboard-layout__matches-container__no-matches'>
            <img src="/assets/images/dashboard/no-matches.png" />
            <p className='dashboard-layout__matches-container__no-matches__header'>
                No match yet ^_^
            </p>
            <p className='dashboard-layout__matches-container__no-matches__subtext'>See who you’ve matched with here 💖</p>
        </motion.div>
    )
}

export const MatchItem: React.FC<MatchesProps> = ({ userData, onViewProfileClick, isLazyLoaded = true }) => {
    return (
        <div className='matches__matched-profiles'>
            <div className='matches__matched-profile'>
                <figure className='matches__matched-profile-image'>
                    {isLazyLoaded && <LazyLoadImage
                        height={'100%'}
                        effect="opacity"
                        src={(userData?.photos && userData.photos.length) ? userData.photos[0] : "/assets/images/profile/profile-pic-placeholder.png"}
                        width={'100%'} />}
                    {!isLazyLoaded && <img src={(userData?.photos && userData.photos.length) ? userData.photos[0] : "/assets/images/profile/profile-pic-placeholder.png"} />}
                    <div className='matches__matched-profile-image--overlay'></div>
                </figure>
                <div className='matches__match-content'>
                    <button onClick={() => onViewProfileClick()} className='matches__view-button'>View</button>
                    <div className='matches__match-details'><span className='first-name'>{userData?.first_name}{userData?.date_of_birth ? ',' : ''}</span>{userData?.date_of_birth && <span className='age'>{(new Date()).getFullYear() - getYearFromFirebaseDate(userData?.date_of_birth)}</span>} {userData?.is_verified && <img src="/assets/icons/verified.svg" />} </div>
                </div>
            </div>
        </div>
    )
}

const Matches: React.FC<MatchesProps> = () => {
    const { user } = useAuthStore()
    // const { matches, loading } = useSyncUserMatches(user!.uid!)

    const { matches, loading, fetchMatches } = useMatchStore()

    useEffect(() => {
        fetchMatches(user!.uid!)
    }, [user?.uid])

    return <div className='dashboard-layout__matches-wrapper'>
        <div className='dashboard-layout__matches-container'>
            {!loading && matches.length == 0 && <MatchesEmptyState />}
            <>
                {!loading && matches.length > 0 && <motion.div animate={{ opacity: loading ? 0 : 1 }} key={'matches-side'} className='dashboard-layout__matches-container__with-matches matches'>
                    <h2 className='matches__header'>You’ve Got New Matches 🎉</h2>
                    <h3 className='matches__sub-header'>{'See who you’ve matched with here 💖'}</h3>
                    <div className='matches__total-matches-preview'>
                        <div className='matches__total-matches-preview-inner'>
                            <img src={matches[0]?.matchedUserData?.photos[0]} />
                            <div className='matches__matches-count'>
                                <span>{matches.length}</span>
                                <img src="/assets/icons/fire-white.svg" />
                            </div>
                        </div>
                    </div>
                    {matches.map((match, index) => <MatchItem key={index} isLazyLoaded={false} userData={match.matchedUserData as User} onViewProfileClick={() => { }} />)}
                </motion.div>}
                {loading && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} key={'matches-side'} className='dashboard-layout__matches-container__with-matches matches'>
                    <h2 className='matches__header'><Skeleton height={"100%"} width={'100%'} /></h2>
                    <h3 className='matches__sub-header'><Skeleton height={"100%"} width={'100%'} /></h3>
                    <div className='rounded-[1.2rem] w-[15.8rem] h-[17.4rem]  mt-[1.2rem] overflow-hidden'>
                        <Skeleton height={"100%"} width={'100%'} />
                    </div>
                    {[1, 2].map((item) => <Skeleton key={item} containerClassName='matches__matched-profiles' width={'100%'} height={'100%'} />)}
                </motion.div>}

            </>
        </div>
    </div>
}
export default Matches;