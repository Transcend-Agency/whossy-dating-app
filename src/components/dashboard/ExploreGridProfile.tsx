const ExploreGridProfile = () => {
    return (
        <div className='explore-grid__profile'>
            <figure className='explore-grid__profile-picture'>
                <img className='explore-grid__profile-picture-image' src="/assets/images/dashboard/sample-person.png" />
                <img className='explore-grid__profile-picture-gradient' src="/assets/images/dashboard/bottom-gradient.png" />
            </figure>
            <div className='explore-grid__profile-info'>
                <div className='explore-grid__profile-info-top'>
                    <figure className='new-profile'>
                        <img src="/assets/icons/leaf.svg" />
                        New
                    </figure>
                    <span>~ 20 mi away</span>
                </div>
                <div className='explore-grid__profile-info-bottom'>
                    <span className='explore-grid__profile-name'>Jessica,</span>
                    <span className='explore-grid__profile-age'>21</span>
                    <img src='/assets/icons/verified.svg' />
                </div>
            </div>
        </div>
    );
}

export default ExploreGridProfile;