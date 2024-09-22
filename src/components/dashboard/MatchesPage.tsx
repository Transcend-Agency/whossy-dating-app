import { useState } from "react";
import DashboardPageContainer from "./DashboardPageContainer";
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion'
import { MatchItem } from "./MatchesSide";
import ViewProfile from "./ViewProfile";

const MatchesPage = () => {
    const [activePage, setActivePage] = useState('like')
    const [likes, setLikes] = useState([1, 2, 3, 4, 5])
    const [matches, setMatches] = useState([1, 2, 3, 4, 5, 6])
    const LikesEmptyState = () => {
        return (
            <div className="matches-page__empty-state">
                <img className="" src="/assets/icons/like-empty-state.png" />
                <p className="matches-page__empty-state-text">No Likes Yet</p>
            </div>
        )
    }
    const MatchesEmptyState = () => {
        return (
            <div className="matches-page__empty-state">
                <img className="" src="/assets/images/dashboard/no-matches.png" />
                <p className="matches-page__empty-state-text">No Matches Yet ^_^</p>
            </div>
        )
    }
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
                        {likes.length == 0 && <LikesEmptyState />}
                        <div className="likes-subscribe-cta-container">
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
                        </div>
                        {likes.length !== 0 && <div className="matches-page__grid">
                            {likes.map(like => <MatchItem />)}
                        </div>}
                    </motion.div>}
                    {activePage == 'match' && <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} key={'match'} exit={{ opacity: 0, scale: 0.96 }} className="matches-page__matches-container">
                        {matches.length == 0 && <MatchesEmptyState />}
                        <div className="matches-subscribe-cta-container">
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
                        </div>
                        {matches.length !== 0 && <div className="matches-page__grid">
                            {matches.map(like => <MatchItem />)}
                        </div>}
                    </motion.div>}
                </AnimatePresence>
            </DashboardPageContainer>}
            {activePage == 'profile' && <ViewProfile />}
        </>
    )
}

export default MatchesPage;