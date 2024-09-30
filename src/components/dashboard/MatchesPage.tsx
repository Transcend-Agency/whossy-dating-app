import { useEffect, useState } from "react";
import DashboardPageContainer from "./DashboardPageContainer";
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion'
import { MatchItem } from "./MatchesSide";
import ViewProfile from "./ViewProfile";
import Skeleton from "react-loading-skeleton";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Match } from "@/types/likingAndMatching";
import useSyncUserMatches from "@/hooks/useSyncUserMatches";
import { useAuthStore } from "@/store/UserId";

const MatchesPage = () => {
    const [activePage, setActivePage] = useState('like')
    const [likes] = useState([1, 2, 3, 4, 5])
    const isPremiumMember = false;
    const { user } = useAuthStore()

    const { matches, loading: matchesLoading } = useSyncUserMatches(user!.uid!)
    const LikesEmptyState = () => {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} key={'empty-state'} exit={{ opacity: 0 }} className="matches-page__empty-state">
                <img className="" src="/assets/icons/like-empty-state.png" />
                <p className="matches-page__empty-state-text">No Likes Yet</p>
            </motion.div>
        )
    }
    const MatchesEmptyState = () => {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} key={'empty-state'} exit={{ opacity: 0 }} className="matches-page__empty-state">
                <img className="" src="/assets/images/dashboard/no-matches.png" />
                <p className="matches-page__empty-state-text">No Matches Yet ^_^</p>
            </motion.div>
        )
    }
    useEffect(() => {

    })
    return (
        <>
            {activePage !== 'profile' && <DashboardPageContainer className="matches-page" span={1}>

                <div className="matches-page__nav">
                    <div className="left-nav">
                        <button onClick={() => setActivePage('like')} className={`matches-page__nav-item ${activePage === 'like' && 'matches-page__nav-item--active'}`}>Like</button>
                        <button onClick={() => setActivePage('match')} className={`matches-page__nav-item ${activePage === 'match' && 'matches-page__nav-item--active'}`}>Match</button>
                    </div>
                    <div className="right-nav">
                        <img src="/assets/icons/control.svg" />
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {activePage == 'like' && <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} key={'like'} exit={{ opacity: 0, scale: 0.96 }} className="matches-page__likes-container">
                        <AnimatePresence mode="wait">
                            {likes.length == 0 && <LikesEmptyState />}
                            {matches.length == 0 && !matchesLoading &&
                                <LikesEmptyState />}
                            {matchesLoading && <motion.div key="matches-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {!isPremiumMember && <div className="px-[2.4rem] h-[13.6rem] mt-[1.6rem]">
                                    <Skeleton containerClassName="rounded-[1.2rem] overflow-hidden h-full block" width={'100%'} height={"100%"} />
                                </div>}
                                <div className="matches-page__grid">
                                    {
                                        [1, 2, 3, 4, 5, 6].map((item =>
                                            <Skeleton key={item} containerClassName='matches__matched-profiles' width={'100%'} height={"100%"} />
                                        ))
                                    }
                                </div>
                            </motion.div>}

                            {!matchesLoading && matches.length !== 0 && <motion.div>
                                {!isPremiumMember && <div className="likes-subscribe-cta-container">
                                    <div className="likes-subscribe-cta">
                                        <figure className="likes-subscribe-cta__image">
                                            <img src="/assets/images/matches/stephen.png" />
                                            <div className="likes-subscribe-cta__overlay">
                                                <div className="likes-subscribe-cta__total-likes">
                                                    <span>24</span>
                                                    <img src="/assets/icons/white-likes.svg" />
                                                </div>
                                                <img src="/assets/icons/likes-banner.svg" className="likes-subscribe-cta__likes-banner" />
                                            </div>
                                        </figure>
                                        <div className="likes-subscribe-cta__text">
                                            <p>Subscribe to Premium to Chat Who Liked You</p>
                                            <button className="likes-subscribe-cta__upgrade-button">UPGRADE</button>
                                        </div>
                                    </div>
                                </div>}
                                {likes.length !== 0 && <div className="matches-page__grid">
                                    {likes.map(like => <MatchItem data={like} />)}
                                </div>}
                            </motion.div>}

                        </AnimatePresence>

                    </motion.div>}
                    {activePage == 'match' && <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} key={'match'} exit={{ opacity: 0, scale: 0.96 }} className="matches-page__matches-container">

                        <AnimatePresence mode="wait">
                            {matches.length == 0 && !matchesLoading &&
                                <MatchesEmptyState />}
                            {matchesLoading && <motion.div key="matches-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {!isPremiumMember && <div className="px-[2.4rem] h-[13.6rem] mt-[1.6rem]">
                                    <Skeleton containerClassName="rounded-[1.2rem] overflow-hidden h-full block" width={'100%'} height={"100%"} />
                                </div>}
                                <div className="matches-page__grid">
                                    {
                                        [1, 2, 3, 4, 5, 6].map((item =>
                                            <Skeleton key={item} containerClassName='matches__matched-profiles' width={'100%'} height={"100%"} />
                                        ))
                                    }
                                </div>
                            </motion.div>}
                            {!matchesLoading && matches.length !== 0 && <motion.div key="matches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                {!isPremiumMember && <div className="matches-subscribe-cta-container">
                                    <div className="matches-subscribe-cta">
                                        <div className="matches-subscribe-cta__grid">
                                            <div className="matches-subscribe-cta__text-container">
                                                <div className="matches-subscribe-cta__text">
                                                    <p>Upgrade to Premium to Chat New Matches</p>
                                                    <button className="matches-subscribe-cta__upgrade-button">UPGRADE</button>
                                                </div>
                                            </div>
                                            <div className="matches-subscribe-cta__image">
                                                <img src="/assets/icons/fire.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {matches.length !== 0 && <div className="matches-page__grid">
                                    {matches.map(like => <MatchItem data={like} />)}
                                </div>}

                            </motion.div>}
                        </AnimatePresence>


                    </motion.div>}
                </AnimatePresence>
            </DashboardPageContainer>}
            {/* @ts-expecg */}
            {activePage == 'profile' && <ViewProfile onBackClick={() => { }} onNextClick={() => { }} userData={{
                future_family_goals: '',
                id: 0,
                name: '',
                age: 0,
                verified: false,
                status: '', // Can define other possible statuses
                distance: '',
                profile_images: [],
                relationship_preferences: '',
                bio: '',
                interests: [],
                stays_in: '',
                gender: '', // Can add other gender options if needed
                education: '',
            }} />}
        </>
    )
}

export default MatchesPage;