import ViewProfile from '@/components/dashboard/ViewProfile';
import { query, Timestamp, where } from "firebase/firestore";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ExploreGridProfile from '../../components/dashboard/ExploreGridProfile';
// import profiles from '../../data/test-explore'
import { AgeRangeModal, CountrySettingsModal, GenderSettingsModal, RelationshipPreferenceSettingsModal, ReligionSettingsModal } from '@/components/dashboard/EditProfileModals';
import SettingsGroup from '@/components/dashboard/SettingsGroup';
import { preference, religion } from '@/constants';
import useSyncUserLikes from '@/hooks/useSyncUserLikes';
import { getAdvancedSearchPreferences, updateAdvancedSearchPreferences } from '@/hooks/useUser';
import useLikesAndMatchesStore from '@/store/LikesAndMatches';
import { useAuthStore } from '@/store/UserId';
import { Like } from '@/types/likingAndMatching';
import { AdvancedSearchPreferences, User } from '@/types/user';
import { getYearFromFirebaseDate } from '@/utils/date';
import {
    collection,
    getDocs
} from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { Oval } from 'react-loader-spinner';
import { db } from "../../firebase";


const Explore = () => {
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
        age_range: { min: null, max: null },
        country: '',
        relationship_preference: null,
        religion: null
    })
    const [resetLoading, setResetLoading] = useState(false)

    const calculateDOBRange = (minAge, maxAge) => {
        const today = new Date();
        const currentYear = today.getFullYear();

        // Calculate the range of birth years for the age range
        const minDOB = new Date(currentYear - maxAge, today.getMonth(), today.getDate()); // For oldest age (e.g., 30)
        const maxDOB = new Date(currentYear - minAge, today.getMonth(), today.getDate()); // For youngest age (e.g., 25)

        // Convert to Firestore Timestamps
        return {
            minDOB: Timestamp.fromDate(minDOB),
            maxDOB: Timestamp.fromDate(maxDOB),
        };
    };


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

    const resetAdvancedSearch = async () => {
        console.log('this is being called')
        try {
            setResetLoading(true)
            await updateAdvancedSearchPreferences(auth?.uid as string, () => { refetchSearchPreferences() }, {
                gender: '',
                age_range: { min: null, max: null },
                country: '',
                relationship_preference: null,
                religion: null
            })
        } catch (err) {
            console.log(err)
        }
        finally {
            setResetLoading(false)
        }
    }

    const fetchNewUsers = async () => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);

        // Query the 'users' collection for users created within the last 14 days
        const usersRef = collection(db, 'users');
        const recentUsersQuery = query(usersRef, where('created_at', '>=', sevenDaysAgoTimestamp));

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

    const onAdvancedSearch = async () => {
        try {
            setExploreDataLoading(true);
            const usersCollection = collection(db, 'users');

            // Create the initial query
            let q = query(usersCollection, where("has_completed_onboarding", "==", true));

            // Apply gender filter if selected
            if (advancedSearchPreferences.gender) {
                q = query(q, where("gender", "==", advancedSearchPreferences.gender));
            }

            // Apply age range filter
            if (advancedSearchPreferences.age_range?.min && advancedSearchPreferences.age_range?.max) {
                const { minDOB, maxDOB } = calculateDOBRange(advancedSearchPreferences.age_range.min, advancedSearchPreferences.age_range.max);

                console.log(minDOB, maxDOB)
                // Filter by date_of_birth range
                q = query(q, where("date_of_birth", "<=", maxDOB)); // For younger users
                q = query(q, where("date_of_birth", ">=", minDOB)); // For older users
            }

            // Apply country filter if selected
            // if (advancedSearchPreferences.age_range?.min) {
            //     const { maxDOB } = calculateDOBRange(advancedSearchPreferences.age_range.min, advancedSearchPreferences.age_range.max);
            //     console.log(maxDOB.toDate())
            //     q = query(q, where("date_of_birth", "<=", maxDOB));
            // }

            // Apply country filter if selected
            if (advancedSearchPreferences.country) {
                q = query(q, where("country_of_origin", "==", advancedSearchPreferences.country));
            }

            // Apply relationship preference filter if selected
            if (advancedSearchPreferences.relationship_preference !== null) {
                q = query(q, where("preference", "==", advancedSearchPreferences.relationship_preference));
            }

            // Apply relationship preference filter if selected
            if (advancedSearchPreferences.religion !== null) {
                q = query(q, where("religion", "==", advancedSearchPreferences.religion));
            }

            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((user) => user.data());
            setProfiles(userData as User[]);
        } catch (err) {
            console.log(err);
        } finally {
            setExploreDataLoading(false);
        }
    };

    const fetchSearchPreferences = async () => { const data = await getAdvancedSearchPreferences(user?.uid as string) as AdvancedSearchPreferences; setAdvancedSearchPreferences(data) }

    const refetchSearchPreferences = async () => { await fetchSearchPreferences() }

    const updateSearchPreferences = async (s: AdvancedSearchPreferences) => {
        await updateAdvancedSearchPreferences(user?.uid as string, () => { hideModal(); refetchSearchPreferences() }, s)
    }

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
            case 'Advanced Search':
                onAdvancedSearch()
                break
            default:
                console.log('no result')
        }

    }, [selectedOption])

    const isNewUserFromDate = (timestampDate: Timestamp) => {
        const timestamp = Timestamp.fromDate(new Date(timestampDate.toDate()));
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);
        return timestamp >= sevenDaysAgoTimestamp
    }


    return <>
        {!selectedProfile &&
            <>
                {
                    !advancedSearchShowing && <DashboardPageContainer className='explore-page' span={2}>
                        <div className='explore'>
                            <div className='filter'>
                                <div className='filter__left'>
                                    {filterOptions.map(item => <div key={item} onClick={() => setSelectedOption(item)} className={`filter__item ${selectedOption == item && 'filter__item--active'}`}>{item}</div>)}
                                    <div onClick={() => setSelectedOption('Advanced Search')} className={`filter__item ${selectedOption == 'Advanced Search' && 'filter__item--active'}`}>
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.09199 2.21897C5.78713 2.98164 5.55868 3.77267 5.41001 4.58044H10.8699C10.7212 3.77267 10.4928 2.98164 10.1879 2.21897C9.88155 1.47287 9.52834 0.901839 9.16191 0.526242C8.79751 0.151664 8.45245 0 8.13996 0C7.82747 0 7.48241 0.151664 7.11801 0.526242C6.75157 0.902856 6.39939 1.47287 6.09199 2.21897ZM5.99224 0.286023C5.67263 0.719639 5.39169 1.24385 5.14944 1.83116C4.82372 2.6251 4.55907 3.55544 4.37382 4.58044H0.815319C1.32375 3.53785 2.04853 2.61558 2.94137 1.87508C3.83422 1.13459 4.8736 0.592868 5.99224 0.286023ZM11.1295 1.83116C10.9119 1.28418 10.6293 0.765393 10.2877 0.286023C11.4061 0.592997 12.4463 1.13477 13.339 1.87526C14.2317 2.61575 14.9563 3.53796 15.4646 4.58044H11.9051C11.7198 3.55544 11.4572 2.62307 11.1295 1.83116ZM15.8779 5.59832H12.0588C12.1585 6.40753 12.2115 7.26153 12.2115 8.14301C12.2115 9.02449 12.1585 9.87849 12.0588 10.6877H15.8779C16.1471 9.86635 16.2838 9.00737 16.283 8.14301C16.2838 7.27866 16.1471 6.41967 15.8779 5.59832ZM11.9051 11.7056H15.4646C14.9563 12.7481 14.2317 13.6703 13.339 14.4108C12.4463 15.1513 11.4061 15.693 10.2877 16C10.6293 15.5206 10.9119 15.0018 11.1295 14.4549C11.4562 13.6609 11.7198 12.7306 11.9051 11.7056ZM7.69413 12.1534C7.76334 12.0075 7.8251 11.8583 7.87938 11.7056H10.8699C10.7212 12.5134 10.4928 13.3044 10.1879 14.0671C10.1248 14.2218 10.0569 14.3745 9.98435 14.5251C9.91515 14.4018 9.82916 14.2888 9.72886 14.1892L7.69413 12.1534ZM8.11146 10.6877H11.0328C11.1366 9.88765 11.1936 9.03365 11.1936 8.14301C11.1936 7.25237 11.1366 6.39735 11.0328 5.59832H5.24715L5.20949 5.90368C6.15406 6.26815 6.95125 6.9353 7.47647 7.80085C8.0017 8.6664 8.22433 9.68157 8.11146 10.6877ZM4.22215 5.59832L4.21604 5.64514C3.99861 5.61381 3.7792 5.59816 3.55951 5.59832H4.22215ZM0.403079 5.59832H3.55951C2.8897 5.59777 2.22795 5.74446 1.62111 6.02801C1.01427 6.31155 0.477177 6.72502 0.0478397 7.23914C0.10993 6.6732 0.231058 6.12355 0.404097 5.59832M3.56155 13.7413C4.3616 13.7413 5.10058 13.4767 5.69502 13.0319L8.2906 15.6275C8.33786 15.6748 8.39397 15.7123 8.45573 15.738C8.51749 15.7636 8.5837 15.7768 8.65057 15.7769C8.71744 15.7769 8.78367 15.7638 8.84547 15.7382C8.90727 15.7127 8.96343 15.6752 9.01075 15.628C9.05807 15.5807 9.09562 15.5246 9.12125 15.4628C9.14689 15.4011 9.16011 15.3349 9.16015 15.268C9.1602 15.2011 9.14708 15.1349 9.12153 15.0731C9.09598 15.0113 9.05851 14.9551 9.01126 14.9078L6.41568 12.3122C6.89607 11.6698 7.14559 10.884 7.12383 10.0821C7.10207 9.28024 6.81031 8.50916 6.29578 7.89372C5.78125 7.27828 5.07408 6.8545 4.28873 6.69099C3.50338 6.52748 2.68583 6.63381 1.96843 6.99276C1.25104 7.35172 0.675782 7.94229 0.335795 8.66886C-0.00419237 9.39544 -0.0890106 10.2155 0.0950709 10.9963C0.279152 11.7771 0.721359 12.4729 1.3501 12.9711C1.97885 13.4692 2.75732 13.7406 3.55951 13.7413M3.55951 12.7235C2.88462 12.7235 2.23737 12.4554 1.76015 11.9781C1.28292 11.5009 1.01482 10.8537 1.01482 10.1788C1.01482 9.50387 1.28292 8.85662 1.76015 8.3794C2.23737 7.90217 2.88462 7.63407 3.55951 7.63407C4.23441 7.63407 4.88166 7.90217 5.35888 8.3794C5.8361 8.85662 6.10421 9.50387 6.10421 10.1788C6.10421 10.8537 5.8361 11.5009 5.35888 11.9781C4.88166 12.4554 4.23441 12.7235 3.55951 12.7235Z" fill="#121212" />
                                        </svg>

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
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                        isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                        isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                                        isNewUser={isNewUserFromDate(profile.created_at as string)}
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
                                <button onClick={() => { setAdvancedSearchShowing(false); if (selectedOption == 'Advanced Search') { onAdvancedSearch() } }} className="settings-page__title__left">
                                    <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                                    <p>Advanced Search Preferences</p>
                                </button>
                                <button onClick={resetAdvancedSearch} className='self-center text-[#485FE6]'>{!resetLoading ? 'Reset' : <Oval color="#485FE6" secondaryColor="#485FE6" width={20} height={20} />}</button>
                                <GenderSettingsModal showing={advancedSearchModalShowing === 'gender'} hideModal={hideModal} userGender={advancedSearchPreferences?.gender as string} handleSave={async (gender) => await updateSearchPreferences({ gender })} />
                                <AgeRangeModal showing={advancedSearchModalShowing === 'age-range'} hideModal={hideModal} min={advancedSearchPreferences.age_range?.min as number || 18} max={advancedSearchPreferences.age_range?.max as number || 100} handleSave={async (age_range) => await updateSearchPreferences({ age_range })} />
                                <CountrySettingsModal showing={advancedSearchModalShowing === 'country'} hideModal={hideModal} preferredCountry={advancedSearchPreferences?.country as string} handleSave={async (country) => await updateSearchPreferences({ country })} />
                                <RelationshipPreferenceSettingsModal userPreference={advancedSearchPreferences.relationship_preference as number} hideModal={hideModal} showing={advancedSearchModalShowing === 'relationship_preference'} handleSave={async (relationship_preference) => await updateSearchPreferences({ relationship_preference })} />
                                <ReligionSettingsModal userReligion={advancedSearchPreferences.religion as number} showing={advancedSearchModalShowing == 'religion'} hideModal={hideModal} handleSave={async religion => await updateSearchPreferences({ religion })} />
                            </div>
                            <div className="px-5 pt-4">
                                <div className="flex justify-between">
                                </div>
                            </div>
                            <SettingsGroup data={[
                                ['Gender', advancedSearchPreferences?.gender || 'Choose', () => {
                                    setAdvancedSearchModalShowing('gender')
                                }],
                                ['Age', advancedSearchPreferences.age_range?.min && advancedSearchPreferences.age_range?.max ? `${advancedSearchPreferences.age_range?.min} - ${advancedSearchPreferences.age_range?.max} years old` : 'Choose', () => {
                                    setAdvancedSearchModalShowing('age-range')
                                }],
                                ['Country of Residence', advancedSearchPreferences.country || 'Choose', () => {
                                    setAdvancedSearchModalShowing('country')
                                }],
                                ['Relationship Preference', advancedSearchPreferences.relationship_preference !== null ? preference[advancedSearchPreferences.relationship_preference as number] : 'Choose', () => {
                                    setAdvancedSearchModalShowing('relationship_preference')
                                }],
                                ['Religion', advancedSearchPreferences.religion !== null ? religion[advancedSearchPreferences.religion as number] : 'Choose', () => {
                                    setAdvancedSearchModalShowing('religion')
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