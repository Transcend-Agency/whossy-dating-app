import { collection, getDocs } from "firebase/firestore";
import { AnimatePresence, motion } from 'framer-motion';
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DashboardPageContainer from '../../components/dashboard/DashboardPageContainer';
import ExploreGridProfile from '../../components/dashboard/ExploreGridProfile';
import { AgeRangeModal, CountrySettingsModal, GenderSettingsModal, RelationshipPreferenceSettingsModal, ReligionSettingsModal } from '@/components/dashboard/EditProfileModals';
import SettingsGroup from '@/components/dashboard/SettingsGroup';
import { filterOptions, preference, religion } from '@/constants';
import useSyncUserLikes from '@/hooks/useSyncUserLikes';
import { getAdvancedSearchPreferences, updateAdvancedSearchPreferences } from '@/hooks/useUser';
import { useAuthStore } from '@/store/UserId';
import { Like } from '@/types/likingAndMatching';
import { AdvancedSearchPreferences, User } from '@/types/user';
import { getYearFromFirebaseDate } from '@/utils/date';
import { Oval } from 'react-loader-spinner';
import { db } from "@/firebase";
import useLikesAndMatchesStore from "@/store/LikesAndMatches.tsx";
import CustomIcon from "@/components/dashboard/CustomIcon.tsx";
import useDashboardStore from "@/store/useDashboardStore.tsx";
import useProfileFetcher from "@/hooks/useProfileFetcher.tsx";
import ViewProfile from "@/components/dashboard/ViewProfile";

interface SettingsDataItem {
    label: string;
    value: string;
    onClick: () => void;
}

const Explore = () => {

    const {
        profiles,
        setProfiles,
        selectedProfile,
        setSelectedProfile,
        blockedUsers,
        selectedOption,
        setSelectedOption,
        exploreDataLoading,
        setExploreDataLoading
    } = useDashboardStore()
    const { fetchBlockedUsers, fetchProfilesBasedOnOption, refreshProfiles } = useProfileFetcher()

    const { auth, user } = useAuthStore();
    const { setLikes } = useLikesAndMatchesStore()
    const { userLikes } = useSyncUserLikes(user!.uid!);

    const loadingData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const [resetLoading, setResetLoading] = useState(false)

    const [advancedSearchShowing, setAdvancedSearchShowing] = useState(false)
    const [advancedSearchModalShowing, setAdvancedSearchModalShowing] = useState('hidden')
    const hideModal = () => setAdvancedSearchModalShowing('hidden')
    const [advancedSearchPreferences, setAdvancedSearchPreferences] = useState<AdvancedSearchPreferences>({
        gender: '',
        age_range: { min: 18, max: 100 },
        country: '',
        relationship_preference: null,
        religion: null
    })

    const calculateDOBRange = (minAge: any, maxAge: any) => {
        const today = new Date();
        const currentYear = today.getFullYear();

        const minDOB = new Date(currentYear - maxAge, today.getMonth(), today.getDate()); // For oldest age (e.g., 30)
        const maxDOB = new Date(currentYear - minAge, today.getMonth(), today.getDate()); // For youngest age (e.g., 25)

        return {
            minDOB: Timestamp.fromDate(minDOB),
            maxDOB: Timestamp.fromDate(maxDOB),
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchBlockedUsers();
        };
        fetchData().catch((err) => console.error("An error occurred while trying to fetch blocked users: ", err))
    }, [fetchBlockedUsers]);

    const fetchLikes = async () => {
        const likesCollection = collection(db, 'likes');
        const q = query(likesCollection, where("liker_id", "==", user?.uid));
        const likesSnapshot = await getDocs(q);

        const likes = likesSnapshot.docs.map(like => like.data() as Like)
        setLikes(likes)
    }

    const hasUserBeenLiked = (id: string) => {
        return Boolean(userLikes.filter(like => (like.liked_id === id)).length)
    }

    useEffect(() => {
        fetchLikes().catch((err) => console.error("An error occurred while trying to fetch Likes: ", err))
        fetchProfilesBasedOnOption().catch((err) => console.error("An error occurred while trying to fetch profiles: ", err))
    }, [selectedOption, blockedUsers]);

    const isNewUserFromDate = (timestampDate: string) => {
        const timestamp = Timestamp.fromDate(new Date(timestampDate));
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        return timestamp >= Timestamp.fromDate(twoDaysAgo);
    };

    const resetAdvancedSearch = async () => {
        console.log('this is being called')
        try {
            setResetLoading(true)
            await updateAdvancedSearchPreferences(auth?.uid as string, () => { refetchSearchPreferences() }, {
                gender: '',
                age_range: { min: 18, max: 100 },
                country: '',
                relationship_preference: null,
                religion: null
            })
        } catch (err) {
            console.log(err)
        } finally {
            setResetLoading(false)
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
                const {
                    minDOB,
                    maxDOB
                } = calculateDOBRange(advancedSearchPreferences.age_range.min, advancedSearchPreferences.age_range.max);

                // Filter by date_of_birth range
                q = query(q, where("date_of_birth", "<=", maxDOB)); // For younger users
                q = query(q, where("date_of_birth", ">=", minDOB)); // For older users
            }

            // Apply country filter if selected
            if (advancedSearchPreferences.country) {
                q = query(q, where("country", "==", advancedSearchPreferences.country));
            }

            // Apply relationship preference filter if selected
            if (advancedSearchPreferences.relationship_preference !== undefined) {
                q = query(q, where("relationship_preference", "==", advancedSearchPreferences.relationship_preference));
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

    const fetchSearchPreferences = async () => {
        const data = await getAdvancedSearchPreferences(user?.uid as string) as AdvancedSearchPreferences;
        setAdvancedSearchPreferences(data)
    }

    const refetchSearchPreferences = async () => {
        await fetchSearchPreferences()
    }

    const updateSearchPreferences = async (s: AdvancedSearchPreferences) => {
        await updateAdvancedSearchPreferences(user?.uid as string, () => {
            hideModal();
            refetchSearchPreferences()
        }, s)
    }

    const settingsData: SettingsDataItem[] = [
        { label: 'Gender', value: advancedSearchPreferences.gender || 'Choose', onClick: () => setAdvancedSearchModalShowing('gender') },
        { label: 'Age', value: `${advancedSearchPreferences.age_range?.min} - ${advancedSearchPreferences.age_range?.max} years old` || 'Choose', onClick: () => setAdvancedSearchModalShowing('age-range') },
        { label: 'Country of Residence', value: advancedSearchPreferences.country || 'Choose', onClick: () => setAdvancedSearchModalShowing('country') },
        { label: 'Relationship Preference', value: advancedSearchPreferences.relationship_preference !== null ? preference[advancedSearchPreferences.relationship_preference as number] : 'Choose', onClick: () => setAdvancedSearchModalShowing('relationship_preference') },
        { label: 'Religion', value: advancedSearchPreferences.religion !== null ? religion[advancedSearchPreferences.religion as number] : 'Choose', onClick: () => setAdvancedSearchModalShowing('religion') }
    ];

    useEffect(() => {
        return () => setSelectedProfile(null)
    }, [])

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
                                        <CustomIcon />
                                        Advanced Search
                                    </div>
                                </div>
                                <div className='filter__right'>
                                    <button onClick={() => setAdvancedSearchShowing(true)} className='filter__saved-search'>
                                        <img src="/assets/icons/saved-search.svg" alt={``} />
                                    </button>
                                </div>
                                <div className='explore-grid-gradient-top'></div>
                            </div>
                            <div className='explore-grid-container'>
                                <AnimatePresence>
                                    {profiles.length === 0 && !exploreDataLoading &&
                                        <motion.div key={`no-search-result`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='empty-state'>
                                            <img className="empty-state__icon" src="/assets/icons/like-empty-state.png" alt={``} />
                                            <div className='empty-state__text'>No Search Results</div>
                                        </motion.div>
                                    }

                                    {exploreDataLoading &&
                                        <>
                                            {exploreDataLoading &&
                                                <motion.div key="explore-grid-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='explore-grid hidden md:grid'>
                                                    {[0, 1, 2, 3, 4].map((value, index) =>
                                                    (
                                                        <div key={index} className='explore-grid__column'>
                                                            {loadingData?.map((profile, index) => (
                                                                (index % 5 === value) &&
                                                                <Skeleton key={profile * index}
                                                                    containerClassName='explore-grid__profile'
                                                                    height={"100%"} />
                                                            ))}
                                                        </div>
                                                    )
                                                    )}
                                                </motion.div>
                                            }

                                            {exploreDataLoading &&
                                                <motion.div key="mobile-grid-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='mobile-grid'>
                                                    {[0, 1, 2].map((value, index) =>
                                                    (
                                                        <div key={index} className='mobile-grid__column'>
                                                            {loadingData?.map((profile, index) => (
                                                                (index % 3 === value) &&
                                                                <Skeleton key={profile * index}
                                                                    containerClassName='explore-grid__profile'
                                                                    height={"100%"} />
                                                            ))}
                                                        </div>
                                                    )
                                                    )}
                                                </motion.div>}
                                        </>
                                    }

                                    {!exploreDataLoading && <>
                                        {!exploreDataLoading && profiles.length !== 0 &&
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="explore-grid" className='explore-grid hidden md:grid'>

                                                {[0, 1, 2, 3, 4].map((value, index) => (
                                                    <div key={index} className={`explore-grid__column`}>
                                                        {profiles?.map((profile, index: number) => (
                                                            (index % 5 === value) &&
                                                            <ExploreGridProfile
                                                                isNewUser={isNewUserFromDate(profile.created_at as string)}
                                                                profile_image={profile.photos ? profile.photos![0] : undefined}
                                                                first_name={profile!.first_name!}
                                                                age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                                onProfileClick={() => {
                                                                    setSelectedProfile(profile?.uid as string)
                                                                }}
                                                                isVerified={profile!.is_verified}
                                                                hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                                key={profile.uid}
                                                            />
                                                        ))}
                                                    </div>
                                                ))}

                                            </motion.div>
                                        }

                                        <motion.div key="mobile-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='mobile-grid'>

                                            {[0, 1, 2].map((value, i) => (
                                                <div key={i} className={`mobile-grid__column`}>
                                                    {profiles?.map((profile, index) => (
                                                        (index % 3 == value) &&
                                                        <ExploreGridProfile
                                                            key={`${index}-${profile.uid}`}
                                                            isNewUser={isNewUserFromDate(profile.created_at as string)}
                                                            profile_image={profile.photos ? profile.photos![0] : undefined}
                                                            first_name={profile!.first_name!}
                                                            age={(new Date()).getFullYear() - getYearFromFirebaseDate(profile.date_of_birth)}
                                                            onProfileClick={() => setSelectedProfile(profile?.uid as string)}
                                                            isVerified={profile!.is_verified}
                                                            hasBeenLiked={hasUserBeenLiked(profile.uid!)}
                                                        />
                                                    ))}
                                                </div>
                                            ))}

                                        </motion.div>
                                    </>}
                                </AnimatePresence>
                            </div>
                        </div>
                    </DashboardPageContainer>
                }

                {advancedSearchShowing && <DashboardPageContainer className='explore-page' span={1}>
                    <div className="settings-page__container">
                        <div className="settings-page__title">
                            <button onClick={() => {
                                setAdvancedSearchShowing(false);
                                if (selectedOption == 'Advanced Search') { onAdvancedSearch().catch(err => console.error("An error occurred during Advanced Search", err)) }
                            }} className="settings-page__title__left">
                                <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" alt={``} />
                                <p>Advanced Search Preferences</p>
                            </button>
                            <button onClick={resetAdvancedSearch} className='self-center text-[#485FE6]'>{!resetLoading ? 'Reset' : <Oval color="#485FE6" secondaryColor="#485FE6" width={20} height={20} />}</button>

                            <GenderSettingsModal
                                showing={advancedSearchModalShowing === 'gender'}
                                hideModal={hideModal}
                                userGender={advancedSearchPreferences?.gender as string}
                                handleSave={async (gender) => await updateSearchPreferences({ gender })} />

                            <AgeRangeModal
                                showing={advancedSearchModalShowing === 'age-range'}
                                hideModal={hideModal} min={advancedSearchPreferences.age_range?.min as number}
                                max={advancedSearchPreferences.age_range?.max as number}
                                handleSave={async (age_range) => await updateSearchPreferences({ age_range })} />

                            <CountrySettingsModal
                                showing={advancedSearchModalShowing === 'country'}
                                hideModal={hideModal}
                                preferredCountry={advancedSearchPreferences?.country as string}
                                handleSave={async (country) => await updateSearchPreferences({ country })} />

                            <RelationshipPreferenceSettingsModal
                                userPreference={advancedSearchPreferences.relationship_preference as number}
                                hideModal={hideModal} showing={advancedSearchModalShowing === 'relationship_preference'}
                                handleSave={async (relationship_preference) => await updateSearchPreferences({ relationship_preference })} />

                            <ReligionSettingsModal
                                userReligion={advancedSearchPreferences.religion as number}
                                showing={advancedSearchModalShowing == 'religion'}
                                hideModal={hideModal}
                                handleSave={async religion => await updateSearchPreferences({ religion })} />

                        </div>
                        <div className="px-5 pt-4">
                            <div className="flex justify-between">
                            </div>
                        </div>
                        <SettingsGroup data={settingsData.map(item => [item.label, item.value, item.onClick])} />
                    </div>
                </DashboardPageContainer>
                }
            </>
        }
        {selectedProfile &&
            <ViewProfile
                onBackClick={() => { setSelectedProfile(null) }}
                userData={profiles.find(profile => selectedProfile as string == profile.uid)!}
                onBlockChange={refreshProfiles}
            />}
    </>
}
export default Explore;