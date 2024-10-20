import ViewProfile from '@/components/dashboard/ViewProfile';
import { query, Timestamp, where } from "firebase/firestore";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ExploreGridProfile from '../../components/dashboard/ExploreGridProfile';
// import profiles from '../../data/test-explore'
import useSyncUserLikes from '@/hooks/useSyncUserLikes';
import useLikesAndMatchesStore from '@/store/LikesAndMatches';
import { useAuthStore } from '@/store/UserId';
import { Like } from '@/types/likingAndMatching';
import { AdvancedSearchPreferences, User, UserFilters } from '@/types/user';
import { getYearFromFirebaseDate } from '@/utils/date';
import {
    collection,
    getDocs
} from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { db } from "../../firebase";
import { AgeRangeModal, GenderSettingsModal } from '@/components/dashboard/EditProfileModals';
import SettingsGroup from '@/components/dashboard/SettingsGroup';
import DoubleSliderBar from '@/components/ui/DoubleSliderBar';
import { getAdvancedSearchPreferences, updateAdvancedSearchPreferences } from '@/hooks/useUser';

type ExploreProps = {

};

const Explore: React.FC<ExploreProps> = () => {
    const filterOptions = [
        "Discover",
        "Similar interest",
        "Online",
        "New members",
        "Popular in my area",
        "Looking to date",
        "Outside my country",
    ]
    const [selectedOption, setSelectedOption] = useState(filterOptions[0])
    const [profiles, setProfiles] = useState<User[]>([])
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
    const [loadingData, setLoadingData] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    const [exploreDataLoading, setExploreDataLoading] = useState(true)
    const [advancedSearchShowing, setAdvancedSearchShowing] = useState(false)
    const { auth, user } = useAuthStore()
    const { setLikes, likes } = useLikesAndMatchesStore()
    const userLikes = useSyncUserLikes(user!.uid!)
    const [advancedSearchModalShowing, setAdvancedSearchModalShowing] = useState('hidden')
    const hideModal = () => setAdvancedSearchModalShowing('hidden')
    const [advancedSearchPreferences, setAdvancedSearchPreferences] = useState<AdvancedSearchPreferences>({
        gender: '',
        age_range: { min: 18, max: 100 },
    })

    useEffect(() => {
        console.log(userLikes)
    }, [userLikes])


    const fetchUserWithSimilarInterests = async () => {
        try {
            setExploreDataLoading(true)
            const currentUserInterests = user?.interests
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('interests', 'array-contains-any', currentUserInterests), where("has_completed_onboarding", "==", true));

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            const sortedUserData = userData.sort((a, b) => {
                const interestsA = a.interests || [];
                const interestsB = b.interests || [];

                const sharedInterestsA = currentUserInterests?.filter(interest => interestsA.includes(interest)).length || 0;
                const sharedInterestsB = currentUserInterests?.filter(interest => interestsB.includes(interest)).length || 0;

                // We want users with more shared interests first, so we subtract sharedInterestsB from sharedInterestsA
                return sharedInterestsB - sharedInterestsA;
            })
            console.log(sortedUserData)
            setProfiles(sortedUserData as User[])
            setExploreDataLoading(false)
        } catch (err) {
            console.log(err)
        }
        finally {
            setExploreDataLoading(false)
        }

    }

    const fetchProfilesToDiscover = async () => {
        try {
            setExploreDataLoading(true)
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where("has_completed_onboarding", "==", true));

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            setProfiles(userData as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchUsersPopularInArea = async () => {
        try {
            setExploreDataLoading(true)
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where("has_completed_onboarding", "==", true), where("country_of_origin", "==", user?.country_of_origin));

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            setProfiles(userData as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchOnlineUsers = async () => {
        try {
            setExploreDataLoading(true)
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where("has_completed_onboarding", "==", true), where("status.online", "==", true));

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            setProfiles(userData as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchUsersLookingToDate = async () => {
        try {
            setExploreDataLoading(true)
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where("has_completed_onboarding", "==", true), where("preference", "==", 0));

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            setProfiles(userData as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchUsersOutsideMyCountry = async () => {
        try {
            setExploreDataLoading(true)
            const usersCollection = collection(db, 'users');
            console.log(user?.country_of_origin)
            const q = query(usersCollection, where("country_of_origin", "!=", user?.country_of_origin), where("has_completed_onboarding", "==", true));
            console.log(user?.country_of_origin)

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            userData.forEach(user_item => console.log(user_item.country_of_origin, user?.country_of_origin))
            setProfiles(userData as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchLikes = async () => {
        const likesCollection = collection(db, 'likes');
        const q = query(likesCollection, where("liker_id", "==", user?.uid));
        const likesSnapshot = await getDocs(q);

        const likes = likesSnapshot.docs.map(like => like.data() as Like)
        setLikes(likes)
        console.log(likes)
    }

    const hasUserBeenLiked = (id: string) => {
        return Boolean(userLikes.filter(like => (like.liked_id === id)).length)
    }

    const fetchNewUsers = async () => {
        // Get the current timestamp
        const currentTime = Timestamp.now();

        // Calculate the timestamp for 14 days ago
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        const fourteenDaysAgoTimestamp = Timestamp.fromDate(fourteenDaysAgo);

        // Query the 'users' collection for users created within the last 14 days
        const usersRef = collection(db, 'users');
        const recentUsersQuery = query(usersRef, where('created_at', '>=', fourteenDaysAgoTimestamp));

        try {
            setExploreDataLoading(true)
            const querySnapshot = await getDocs(recentUsersQuery);
            const newUsers = querySnapshot.docs.map(doc => doc.data());

            setProfiles(newUsers as User[])
        } catch (err) {
            console.log(err)
        } finally {
            setExploreDataLoading(false)
        }
    }

    const fetchSearchPreferences = async () => { const data = await getAdvancedSearchPreferences(user?.uid as string) as AdvancedSearchPreferences; setAdvancedSearchPreferences(data) }

    const refetchSearchPreferences = async () => { await fetchSearchPreferences() }

    const updateSearchPreferences = (s: AdvancedSearchPreferences) => { updateAdvancedSearchPreferences(user?.uid as string, () => { hideModal(); refetchSearchPreferences() }, s) }

    useEffect(() => {
        fetchLikes()
        fetchSearchPreferences()
        console.log(selectedOption)
        switch (selectedOption) {
            case 'Discover':
                fetchProfilesToDiscover()
                break
            case 'Similar interest':
                fetchUserWithSimilarInterests()
                break
            case 'Online':
                fetchOnlineUsers()
                break
            case 'Popular in my area':
                fetchUsersPopularInArea()
                break
            case 'New members':
                fetchNewUsers()
                break
            case 'Looking to date':
                fetchUsersLookingToDate()
                break
            case 'Outside my country':
                fetchUsersOutsideMyCountry()
                break
            default:
                console.log('no result')
        }

    }, [selectedOption])

    return <>
        {!selectedProfile &&
            <>
                {
                    !advancedSearchShowing && <DashboardPageContainer className='explore-page' span={2}>
                        <div className='explore'>
                            <div className='filter'>
                                <div className='filter__left'>
                                    {filterOptions.map(item => <div key={item} onClick={() => setSelectedOption(item)} className={`filter__item ${selectedOption == item && 'filter__item--active'}`}>{item}</div>)}
                                    <div className='filter__item'>
                                        <img src="/assets/icons/advanced-search.svg" />
                                        Advanced Search
                                    </div>
                                </div>
                                <div className='filter__right'>
                                    <button onClick={() => setAdvancedSearchShowing(true)} className='filter__saved-search'>
                                        <img src="/assets/icons/saved-search.svg" />
                                    </button>
                                </div>
                                <div className='explore-grid-gradient-top'></div>
                            </div>
                            <div className='explore-grid-container'>
                                <AnimatePresence mode='wait'>
                                    {profiles.length === 0 && !exploreDataLoading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='empty-state'>
                                        <img className="empty-state__icon" src="/assets/icons/like-empty-state.png" />
                                        <div className='empty-state__text'>No Search Results</div>
                                    </motion.div>}
                                    {exploreDataLoading && <>
                                        {exploreDataLoading && <motion.div key="explore-grid-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='explore-grid hidden md:grid'>
                                            <div className='explore-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 5 === 0) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='explore-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 5 === 1) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='explore-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 5 == 2) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='explore-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 5 == 3) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='explore-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 5 == 4) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                        </motion.div>}
                                        {exploreDataLoading && <motion.div key="mobile-grid-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='mobile-grid'>
                                            <div className='mobile-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 3 == 0) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='mobile-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 3 == 1) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                            <div className='mobile-grid__column'>
                                                {loadingData?.map((profile, index) => (
                                                    (index % 3 == 2) &&
                                                    <Skeleton key={profile * index} containerClassName='explore-grid__profile' height={"100%"} />
                                                ))}
                                            </div>
                                        </motion.div>}
                                    </>}
                                    {!exploreDataLoading && <>
                                        {!exploreDataLoading && profiles.length !== 0 &&
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="explore-grid" className='explore-grid hidden md:grid'>
                                                <div className='explore-grid__column'>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 5 === 0) &&
                                                        <ExploreGridProfile
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            // distance={profile?.distance}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                            key={profile.uid}
                                                        />
                                                    ))}
                                                </div>
                                                <div className='explore-grid__column'>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 5 === 1) &&
                                                        <ExploreGridProfile
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            // distance={profile?.distance}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                            key={profile.uid}
                                                        />
                                                    ))}
                                                </div>
                                                <div className='explore-grid__column'>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 5 == 2) &&
                                                        <ExploreGridProfile
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            // distance={profile?.distance}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                            key={profile.uid}
                                                        />
                                                    ))}
                                                </div>
                                                <div className='explore-grid__column'>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 5 == 3) &&
                                                        <ExploreGridProfile
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            // distance={profile?.distance}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                            key={profile.uid}
                                                        />
                                                    ))}
                                                </div>
                                                <div className='explore-grid__column'>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 5 == 4) &&
                                                        <ExploreGridProfile
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            // distance={profile?.distance}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                            key={profile.uid}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>}
                                        <motion.div key="mobile-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='mobile-grid'>
                                            <div className='mobile-grid__column'>
                                                {profiles?.map((profile, index) => (
                                                    (index % 3 == 0) &&
                                                    <ExploreGridProfile
                                                        profile_image={profile.photos ? profile.photos![0] : undefined}
                                                        // distance={profile?.distance}
                                                        first_name={profile!.first_name!}
                                                        age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                        onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                        isVerified={profile!.is_verified}
                                                        hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                    />
                                                ))}
                                            </div>
                                            <div className='mobile-grid__column'>
                                                {profiles?.map((profile, index) => (
                                                    (index % 3 == 1) &&
                                                    <ExploreGridProfile
                                                        profile_image={profile.photos ? profile.photos![0] : undefined}
                                                        // distance={profile?.distance}
                                                        first_name={profile!.first_name!}
                                                        age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                        onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                        isVerified={profile!.is_verified}
                                                        hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                    />
                                                ))}
                                            </div>
                                            <div className='mobile-grid__column'>
                                                {profiles?.map((profile, index) => (
                                                    (index % 3 == 2) &&
                                                    <ExploreGridProfile
                                                        profile_image={profile.photos ? profile.photos![0] : undefined}
                                                        // distance={profile?.distance}
                                                        first_name={profile!.first_name!}
                                                        age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                        onProfileClick={() => setSelectedProfile(profile?.uid)}
                                                        isVerified={profile!.is_verified}
                                                        hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>}
                                </AnimatePresence>
                            </div>
                        </div>
                    </DashboardPageContainer>
                }
                {
                    advancedSearchShowing && <DashboardPageContainer className='explore-page' span={1}>
                        <div className="settings-page__container">
                            <div className="settings-page__title">
                                <button onClick={() => setAdvancedSearchShowing(false)} className="settings-page__title__left">
                                    <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                                    <p>Advanced Search Preferences</p>
                                </button>
                                <GenderSettingsModal showing={advancedSearchModalShowing === 'gender'} hideModal={hideModal} userGender={advancedSearchPreferences?.gender as string} handleSave={(gender) => updateSearchPreferences({ gender })} />
                                <AgeRangeModal showing={advancedSearchModalShowing === 'age-range'} hideModal={hideModal} range={advancedSearchPreferences?.age_range} handleSave={(age_range) => updateSearchPreferences({ age_range })} />
                                {/* <button className="settings-page__title__save-button">Save</button> */}
                            </div>
                            <div className="px-5 pt-4">
                                <div className="flex justify-between">
                                    {/* <div className="flex gap-x-4 items-center"> <p>Age range</p> <div className="bg-white py-2 px-3 rounded-[4px]">{userValue?.age_range?.min ?? 'NIL'} - {userValue?.age_range?.max ?? "NIL"}</div></div> */}
                                    {/* {JSON.stringify(userValue?.age_range) !== JSON.stringify(userFilters?.age_range) && <button className="modal__body__header__save-button" onClick={() => { setIsSavingAge(true); updateUserPreferences({ age_range: userValue.age_range }); setTimeout(() => setIsSavingAge(false), 1500) }}>{!isSavingAge ? 'Save' : <Oval color="#485FE6" secondaryColor="#485FE6" width={14} height={14} />}</button>} */}
                                </div>
                                {/* <DoubleSliderBar val={[userValue?.age_range?.min as number || 18, userValue?.age_range?.max as number ?? 20]} getValue={(val) => setUserValue((prev) => ({ ...prev, age_range: { min: val[0], max: val[1] } }))} /> */}
                            </div>
                            <SettingsGroup data={[
                                ['Gender', advancedSearchPreferences?.gender || 'Choose', () => {
                                    setAdvancedSearchModalShowing('gender')
                                }],
                                ['Age', `${advancedSearchPreferences.age_range?.min} - ${advancedSearchPreferences.age_range?.max} years old` || 'Choose', () => {
                                    setAdvancedSearchModalShowing('gender')
                                }],
                            ]} />
                        </div>
                    </DashboardPageContainer>
                }
            </>
        }
        {selectedProfile && <ViewProfile onBackClick={() => {
            setSelectedProfile(null)
        }}
            userData={profiles.find(profile => selectedProfile === profile?.uid)!}
            profile_has_been_liked={hasUserBeenLiked(selectedProfile)}
        />}
    </>
}
export default Explore;