import React from 'react';

type MatchesProps = {

};

const MatchesEmptyState = () => {
    return (
        <div className='dashboard-layout__matches-container__no-matches'>
            <img src="/assets/images/dashboard/no-matches.png" />
            <p className='dashboard-layout__matches-container__no-matches__header'>
                No match yet ^_^
            </p>
            <p className='dashboard-layout__matches-container__no-matches__subtext'>See who you’ve matched with here 💖</p>
        </div>
    )
}

export const MatchItem = () => {
    return (
        <div className='matches__matched-profiles'>
            <div className='matches__matched-profile'>
                <figure className='matches__matched-profile-image'>
                    <img src="/assets/images/matches/stephen.png" />
                    <div className='matches__matched-profile-image--overlay'></div>
                </figure>
                <div className='matches__match-content'>
                    <button className='matches__view-button'>View</button>
                    <div className='matches__match-details'><span className='first-name'>Jessica,</span><span className='age'>21</span> <img src="/assets/icons/verified.svg" /> </div>
                </div>
            </div>
        </div>
    )
}

const Matches: React.FC<MatchesProps> = () => {

    return <div className='dashboard-layout__matches-wrapper'>
        <div className='dashboard-layout__matches-container'>
            {/* <MatchesEmptyState /> */}
            <div className='dashboard-layout__matches-container__with-matches matches'>
                <h2 className='matches__header'>You’ve Got New Matches 🎉</h2>
                <h3 className='matches__sub-header'>See who you’ve matched with here 💖</h3>
                <div className='matches__total-matches-preview'>
                    <div className='matches__total-matches-preview-inner'>
                        <img src="/assets/images/matches/stephen.png" />
                        <div className='matches__matches-count'>
                            <span>4</span>
                            <img src="/assets/icons/fire-white.svg" />
                        </div>
                    </div>
                </div>
                <div className='matches__matched-profiles'>
                    <div className='matches__matched-profile'>
                        <figure className='matches__matched-profile-image'>
                            <img src="/assets/images/matches/stephen.png" />
                            <div className='matches__matched-profile-image--overlay'></div>
                        </figure>
                        <div className='matches__match-content'>
                            <button className='matches__view-button'>View</button>
                            <div className='matches__match-details'><span className='first-name'>Jessica,</span><span className='age'>21</span> <img src="/assets/icons/verified.svg" /> </div>
                        </div>
                    </div>
                </div>
                <div className='matches__matched-profiles'>
                    <div className='matches__matched-profile'>
                        <figure className='matches__matched-profile-image'>
                            <img src="/assets/images/matches/stephen.png" />
                            <div className='matches__matched-profile-image--overlay'></div>
                        </figure>
                        <div className='matches__match-content'>
                            <button className='matches__view-button'>View</button>
                            <div className='matches__match-details'><span className='first-name'>Jessica,</span><span className='age'>21</span> <img src="/assets/icons/verified.svg" /> </div>
                        </div>
                    </div>
                </div>
                <div className='matches__matched-profiles'>
                    <div className='matches__matched-profile'>
                        <figure className='matches__matched-profile-image'>
                            <img src="/assets/images/matches/stephen.png" />
                            <div className='matches__matched-profile-image--overlay'></div>
                        </figure>
                        <div className='matches__match-content'>
                            <button className='matches__view-button'>View</button>
                            <div className='matches__match-details'><span className='first-name'>Jessica,</span><span className='age'>21</span> <img src="/assets/icons/verified.svg" /> </div>
                        </div>
                    </div>
                </div>
                <div className='matches__matched-profiles'>
                    <div className='matches__matched-profile'>
                        <figure className='matches__matched-profile-image'>
                            <img src="/assets/images/matches/stephen.png" />
                            <div className='matches__matched-profile-image--overlay'></div>
                        </figure>
                        <div className='matches__match-content'>
                            <button className='matches__view-button'>View</button>
                            <div className='matches__match-details'><span className='first-name'>Jessica,</span><span className='age'>21</span> <img src="/assets/icons/verified.svg" /> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Matches;