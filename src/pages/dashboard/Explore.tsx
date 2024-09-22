import ViewProfile from '@/components/dashboard/ViewProfile';
import React, { useState } from 'react';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ExploreGridProfile from '../../components/dashboard/ExploreGridProfile';
import { profile } from 'console';

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
    ]
    const [selectedOption, setSelectedOption] = useState(filterOptions[0])
    const [profiles, setProfiles] = useState([
        {
            future_family_goals: 'I want to have 3 kids',
            id: 1,
            name: "Stephanie",
            age: 21,
            verified: false,
            status: 'active',
            distance: '22 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/women/1.jpg",
                "https://randomuser.me/api/portraits/women/2.jpg",
                "https://randomuser.me/api/portraits/women/3.jpg"
            ],
            relationship_preferences: 'Just for fun',
            bio: 'I am very excited to meet new people and make friends. Let’s start with that and see where it takes us 🚀',
            interests: ['Traveling', 'Movies', 'Hiking'],
            stays_in: 'Lagos, Nigeria',
            gender: 'Female',
            education: 'Covenant University'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 2,
            name: "Michael",
            age: 28,
            verified: true,
            status: 'active',
            distance: '5 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/men/4.jpg",
                "https://randomuser.me/api/portraits/men/5.jpg",
                "https://randomuser.me/api/portraits/men/6.jpg"
            ],
            relationship_preferences: 'Looking for something serious',
            bio: 'Adventurous, food lover, and tech enthusiast. Let’s explore new places together!',
            interests: ['Technology', 'Photography', 'Gaming'],
            stays_in: 'Abuja, Nigeria',
            gender: 'Male',
            education: 'University of Abuja'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 3,
            name: "Jane",
            age: 25,
            verified: false,
            status: 'inactive',
            distance: '10 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/women/7.jpg",
                "https://randomuser.me/api/portraits/women/8.jpg"
            ],
            relationship_preferences: 'Friendship',
            bio: 'I enjoy deep conversations and exploring nature. Let’s go for a hike!',
            interests: ['Hiking', 'Reading', 'Cooking'],
            stays_in: 'Ibadan, Nigeria',
            gender: 'Female',
            education: 'University of Ibadan'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 4,
            name: "John",
            age: 30,
            verified: true,
            status: 'active',
            distance: '3 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/men/9.jpg",
                "https://randomuser.me/api/portraits/men/10.jpg"
            ],
            relationship_preferences: 'Just for fun',
            bio: 'Always up for an adventure and spontaneous trips! Let’s live in the moment 🌍',
            interests: ['Traveling', 'Music', 'Movies'],
            stays_in: 'Port Harcourt, Nigeria',
            gender: 'Male',
            education: 'University of Port Harcourt'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 5,
            name: "Grace",
            age: 24,
            verified: false,
            status: 'active',
            distance: '15 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/women/11.jpg",
                "https://randomuser.me/api/portraits/women/12.jpg"
            ],
            relationship_preferences: 'Long-term relationship',
            bio: 'I’m a bookworm, animal lover, and passionate about environmental issues. Let’s make a difference together!',
            interests: ['Books', 'Animals', 'Sustainability'],
            stays_in: 'Lagos, Nigeria',
            gender: 'Female',
            education: 'Lagos State University'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 6,
            name: "Samuel",
            age: 27,
            verified: true,
            status: 'active',
            distance: '8 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/men/13.jpg",
                "https://randomuser.me/api/portraits/men/14.jpg"
            ],
            relationship_preferences: 'Looking for something serious',
            bio: 'Entrepreneur, foodie, and sports enthusiast. I’m all about good vibes and meaningful connections.',
            interests: ['Business', 'Football', 'Cooking'],
            stays_in: 'Enugu, Nigeria',
            gender: 'Male',
            education: 'University of Nigeria, Nsukka'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 7,
            name: "Amaka",
            age: 26,
            verified: false,
            status: 'active',
            distance: '12 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/women/15.jpg",
                "https://randomuser.me/api/portraits/women/16.jpg"
            ],
            relationship_preferences: 'Just for fun',
            bio: 'Lover of good music and meaningful conversations. Let’s vibe and share good times!',
            interests: ['Music', 'Dancing', 'Art'],
            stays_in: 'Kano, Nigeria',
            gender: 'Female',
            education: 'Bayero University Kano'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 8,
            name: "Tunde",
            age: 29,
            verified: true,
            status: 'inactive',
            distance: '18 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/men/17.jpg",
                "https://randomuser.me/api/portraits/men/18.jpg"
            ],
            relationship_preferences: 'Friendship',
            bio: 'I’m a laid-back guy who enjoys playing guitar and watching football. Let’s catch up for coffee!',
            interests: ['Music', 'Football', 'Coffee'],
            stays_in: 'Lagos, Nigeria',
            gender: 'Male',
            education: 'University of Lagos'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 9,
            name: "Chioma",
            age: 23,
            verified: true,
            status: 'active',
            distance: '7 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/women/19.jpg",
                "https://randomuser.me/api/portraits/women/20.jpg"
            ],
            relationship_preferences: 'Looking for something serious',
            bio: 'Fashion enthusiast, traveler, and lover of good food. Let’s explore life together!',
            interests: ['Fashion', 'Traveling', 'Food'],
            stays_in: 'Awka, Nigeria',
            gender: 'Female',
            education: 'Nnamdi Azikiwe University'
        },
        {
            future_family_goals: 'I want to have 3 kids',
            id: 10,
            name: "David",
            age: 31,
            verified: true,
            status: 'active',
            distance: '25 miles away',
            profile_images: [
                "https://randomuser.me/api/portraits/men/21.jpg",
                "https://randomuser.me/api/portraits/men/22.jpg"
            ],
            relationship_preferences: 'Friendship',
            bio: 'Tech geek, gamer, and movie buff. I enjoy deep conversations and learning new things!',
            interests: ['Gaming', 'Technology', 'Movies'],
            stays_in: 'Jos, Nigeria',
            gender: 'Male',
            education: 'University of Jos'
        }

    ]
    )
    const [selectedProfile, setSelectedProfile] = useState<number | null>(null)

    return <>
        {!selectedProfile &&
            <DashboardPageContainer className='explore-page' span={2}>
                <div className='explore'>
                    <div className='filter'>
                        <div className='filter__left'>
                            {filterOptions.map(item => <div onClick={() => setSelectedOption(item)} className={`filter__item ${selectedOption == item && 'filter__item--active'}`}>{item}</div>)}
                            <div className='filter__item'>
                                <img src="/assets/icons/advanced-search.svg" />
                                Advanced Search
                            </div>
                        </div>
                        <div className='filter__right'>
                            <button className='filter__saved-search'>
                                <img src="/assets/icons/saved-search.svg" />
                            </button>
                        </div>
                        <div className='explore-grid-gradient-top'></div>
                    </div>
                    <div className='explore-grid-container'>
                        <div className='explore-grid hidden md:grid'>
                            <div className='explore-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 5 === 0) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='explore-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 5 === 1) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='explore-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 5 == 2) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='explore-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 5 == 3) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='explore-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 5 == 4) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mobile-grid'>
                            <div className='mobile-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 3 == 0) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='mobile-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 3 == 1) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                            <div className='mobile-grid__column'>
                                {profiles.map((profile, index) => (
                                    (index % 3 == 2) &&
                                    <ExploreGridProfile
                                        profile_image={profile.profile_images[0]}
                                        distance={profile.distance}
                                        first_name={profile.name}
                                        age={profile.age}
                                        onProfileClick={() => setSelectedProfile(profile.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardPageContainer>}
        {selectedProfile && <ViewProfile onBackClick={() => {
            setSelectedProfile(null)
        }} onNextClick={() => {
            const currentProfileIndex = profiles.findIndex(profile => profile.id === selectedProfile)
            if (currentProfileIndex + 1 < profiles.length)
                setSelectedProfile(profiles[currentProfileIndex + 1].id)
        }}
            userData={profiles.find(profile => selectedProfile === profile.id)!}
        />}
    </>
}
export default Explore;