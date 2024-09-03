import React, { useState } from 'react';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ExploreGridProfile from '../../components/dashboard/ExploreGridProfile';

type ExploreProps = {

};

const Explore: React.FC<ExploreProps> = () => {
    const filterOptions = [
        "Similar interest",
        "Online",
        "New members",
        "Popular in my area",
        "Looking to date",
        "Outside my country",
        "Flirty",
        "Advanced search"
    ]
    const [selectedOption, setSelectedOption] = useState(filterOptions[0])

    return <DashboardPageContainer span={2}>
        <div className='explore'>
            <div className='filter'>
                <div className='filter__left'>
                    {filterOptions.map(item => <div onClick={() => setSelectedOption(item)} className={`filter__item ${selectedOption == item && 'filter__item--active'}`}>{item}</div>)}
                </div>
                <div className='filter__right'>
                    <button className='filter__saved-search'>
                        <img src="/assets/icons/saved-search.svg" />
                    </button>
                </div>
            </div>
            <div className='explore-grid'>
                <div className='explore-grid__column'>
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                </div>
                <div className='explore-grid__column'>
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                </div>
                <div className='explore-grid__column'>
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                </div>
                <div className='explore-grid__column'>
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                </div>
                <div className='explore-grid__column'>
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                    <ExploreGridProfile />
                </div>
            </div>
        </div>
    </DashboardPageContainer>
}
export default Explore;