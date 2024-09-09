import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUpdateUserProfile } from "@/hooks/useUser";
import { User, UserFilters } from "@/types/user";
import { communication_style, dietary, drinking, education, family_goal, love_language, marital_status, pets, preference, religion, smoking, workout, zodiac } from "@/constants";
import SettingsToggleItem from "@/components/dashboard/SettingsToggleItem";
import SettingsInterest from "@/components/dashboard/SettingsInterests";
import SliderBar from "@/components/ui/SliderBar";
import DoubleSliderBar from "@/components/ui/DoubleSliderBar";
import SettingsGroup from "@/components/dashboard/SettingsGroup";
import { CitySettingsModal, CommunicationSettingsModal, CountrySettingsModal, DietarySettingsModal, DrinkingSettingsModal, EducationSettingsModal, EmailSettingsModal, FutureFamilyPlansSettingsModal, GenderSettingsModal, LoveLanguageSettingsModal, MaritalStatusSettingsModal, NameSettingsModal, PetsSettingsModal, PhoneNumberSettingsModal, RelationshipPreferenceSettingsModal, ReligionSettingsModal, SmokerStatusSettingsModal, WorkoutSettingsModal, ZodiacSignSettingsModal } from "@/components/dashboard/EditProfileModals";
import { useAuthStore } from "@/store/UserId";
import { Oval } from "react-loader-spinner";

interface ProfileSettingsProps {
    activePage: boolean;
    closePage: () => void;
    onInterests: () => void;
    userData: User | undefined;
    userPrefencesData: UserFilters | undefined;
    refetchUserData: () => void;
    refetchUserPreferencesData: () => void;
}

type SettingsModal = 'hidden' | 'name' | 'gender' | 'email' | 'phone' | 'relationship-preference' | 'love-language' | 'zodiac' | 'future-family-plans' | 'smoker' | 'religion' | 'drinking' | 'workout' | 'pet' | 'marital-status' | 'height' | 'weight' | 'education' | 'country' | 'city' | 'communication_style' | 'dietary'

const PreferencesMobile: React.FC<ProfileSettingsProps> = ({ activePage, closePage, onInterests, userData, userPrefencesData, refetchUserData, refetchUserPreferencesData}) => {
    const [settingsModalShowing, setSettingsModalShowing] = useState<SettingsModal>('hidden')
    const hideModal = () => setSettingsModalShowing('hidden')

    const {auth} = useAuthStore();

    const updateUser =  (s: User) => {useUpdateUserProfile("users", auth?.uid as string ,() => {hideModal(); refetchUserData()}, s)}
    const updateUserPreferences = (s: UserFilters) => {useUpdateUserProfile("filters",auth?.uid as string, () => {hideModal(); refetchUserPreferencesData()}, s)}

    // const cmToFeetAndInches = (cm: number) => { const totalInches = cm / 2.54; const feet = Math.floor(totalInches / 12); const inches = Math.round(totalInches % 12); return `${feet}'${inches}"`;}
    // const kilogramsToPounds = (kg: number) => { const lbs = kg * 2.20462; return lbs.toFixed(2);}
    const [toggle, setToggle] = useState({similar_interest: userPrefencesData?.similar_interest, has_bio: userPrefencesData?.has_bio, outreach: userPrefencesData?.outreach})
    const [userValue, setUserValue] = useState({distance: userPrefencesData?.distance, age_range: userPrefencesData?.age_range})

    useEffect(() => {setToggle({similar_interest: userPrefencesData?.similar_interest as boolean, has_bio: userPrefencesData?.has_bio as boolean, outreach: userPrefencesData?.outreach as boolean})}, [userPrefencesData?.similar_interest, userPrefencesData?.has_bio, userPrefencesData?.outreach])
    useEffect(() => {setUserValue({distance: userPrefencesData?.distance as number, age_range: userPrefencesData?.age_range})}, [userPrefencesData?.distance, userPrefencesData?.age_range])

    const [isSavingDistance, setIsSavingDistance] = useState(false)
    const [isSavingAge, setIsSavingAge] = useState(false)

    return (
        <>
          <NameSettingsModal showing={settingsModalShowing === 'name'} hideModal={hideModal} first_name={userData?.first_name as string} last_name={userData?.last_name as string} handleSave={(first_name, last_name) => {updateUser({first_name, last_name})}}/>
            <GenderSettingsModal showing={settingsModalShowing === 'gender'} hideModal={hideModal} userGender={userData?.gender as string} handleSave={(gender) => updateUser({gender})}/>
            <EmailSettingsModal showing={settingsModalShowing === 'email'} hideModal={hideModal} />
            <PhoneNumberSettingsModal showing={settingsModalShowing === 'phone'} hideModal={hideModal} phone_number={userData?.phone_number as string} handleSave={(phone_number) => updateUser({phone_number})}/>
            <RelationshipPreferenceSettingsModal showing={settingsModalShowing === 'relationship-preference'} hideModal={hideModal} userPreference={userPrefencesData?.preference as number} handleSave={(preference) => updateUserPreferences({preference}) }/>
            <LoveLanguageSettingsModal showing={settingsModalShowing === 'love-language'} hideModal={hideModal} userLoveLanguage={userPrefencesData?.love_language as number}  handleSave={(love_language) => updateUserPreferences({love_language}) }/>
            <ZodiacSignSettingsModal showing={settingsModalShowing === 'zodiac'} hideModal={hideModal} userZodiac={userPrefencesData?.zodiac as number} handleSave={(zodiac) => updateUserPreferences({zodiac}) } />
            <FutureFamilyPlansSettingsModal showing={settingsModalShowing === 'future-family-plans'} hideModal={hideModal} userFamilyGoal={userPrefencesData?.family_goal as number} handleSave={(family_goal) => updateUserPreferences({family_goal}) } />
            <CountrySettingsModal showing={settingsModalShowing === 'country'} hideModal={hideModal} preferredCountry={userPrefencesData?.country as string} handleSave={(country) => updateUserPreferences({country})}/>
            <CitySettingsModal showing={settingsModalShowing === 'city'} hideModal={hideModal} preferredCity={userPrefencesData?.city as string} handleSave={(city) => updateUserPreferences({city})}/>
            <CommunicationSettingsModal showing={settingsModalShowing === 'communication_style'} hideModal={hideModal} userCommunicationStyle={userPrefencesData?.communication_style as number} handleSave={(communication_style) => updateUserPreferences({communication_style})}/>
            <SmokerStatusSettingsModal showing={settingsModalShowing === 'smoker'} hideModal={hideModal} userSmoke={userPrefencesData?.smoke as number} handleSave={(smoke) => updateUserPreferences({smoke}) }/>
            <ReligionSettingsModal showing={settingsModalShowing === 'religion'} hideModal={hideModal} userReligion={userPrefencesData?.religion as number} handleSave={(religion) => updateUserPreferences({religion}) }/>
            <DietarySettingsModal showing={settingsModalShowing === 'dietary'} hideModal={hideModal} preferredDietary={userPrefencesData?.dietary as number} handleSave={(dietary) => updateUserPreferences({dietary}) }/>
            <DrinkingSettingsModal showing={settingsModalShowing === 'drinking'} hideModal={hideModal} userDrink={userPrefencesData?.drink as number} handleSave={(drink) => updateUserPreferences({drink}) }/>
            <WorkoutSettingsModal showing={settingsModalShowing === 'workout'} hideModal={hideModal} userWorkout={userPrefencesData?.workout as number} handleSave={(workout) => updateUserPreferences({workout}) } />
            <PetsSettingsModal showing={settingsModalShowing === 'pet'} hideModal={hideModal} userPet={userPrefencesData?.pet_owner as number} handleSave={(pet_owner) => updateUserPreferences({pet_owner}) } />
            <MaritalStatusSettingsModal showing={settingsModalShowing === 'marital-status'} hideModal={hideModal} userMaritalStatus={userPrefencesData?.marital_status as number}  handleSave={(marital_status) => updateUserPreferences({marital_status}) }/>
            {/* <HeightSettingsModal showing={settingsModalShowing === 'height'} hideModal={hideModal} userHeight={userPrefencesData?.height as number}  handleSave={(height) => updateUserPreferences({height}) }/> */}
            {/* <WeightSettingsModal showing={settingsModalShowing === 'weight'} hideModal={hideModal} userWeight={userPrefencesData?.weight as number}  handleSave={(weight) => updateUserPreferences({weight}) }/> */}
            <EducationSettingsModal showing={settingsModalShowing === 'education'} hideModal={hideModal} userEducation={userPrefencesData?.education as number}  handleSave={(education) => updateUserPreferences({education}) }/>
            <motion.div animate={activePage ? { x: "-100%", opacity: 1 } : { x: 0 }} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page edit-profile settings-page lg:hidden">
            <div className="settings-page__container">
                    <div className="settings-page__title">
                        <button onClick={closePage} className="settings-page__title__left">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            <p>Preferences </p>
                        </button>
                        {/* <button className="settings-page__title__save-button">Save</button> */}
                    </div>
                    <div className="space-y-3">
                        <div className="bg-[#F6F6F6] py-2">
                        <div className="px-5">
                                <div className="flex justify-between">
                                    <div className="flex gap-x-4 items-center"> <p>Distance Radius</p> <div className="bg-white py-2 px-3 rounded-[4px]">{userValue.distance ?? 0} mi</div></div>
                                    {userValue?.distance !== userPrefencesData?.distance && <button className="modal__body__header__save-button" onClick={() => {setIsSavingDistance(true);updateUserPreferences({distance: userValue.distance}); setTimeout(() => setIsSavingDistance(false), 1500)}}>{!isSavingDistance ? 'Save' : <Oval color="#485FE6" secondaryColor="#485FE6" width={14} height={14}/>}</button>}
                                </div>
                                <SliderBar val={userValue?.distance} getValue={(val) => setUserValue((prev) => ({...prev, distance: val}))}/>
                            </div>
                            <SettingsToggleItem title="Show people outside my distance radius and country for better reach" isActive={toggle?.outreach as boolean} onButtonToggle={() => {setToggle((prev) => ({...prev, outreach: !toggle.outreach}));updateUserPreferences({outreach: !userPrefencesData?.outreach})}}/>
                            <div className="px-5 pt-4">
                                <div className="flex justify-between">
                                {/* {JSON.stringify(userValue?.age_range)} {JSON.stringify(userPrefencesData?.age_range)} */}
                                    <div className="flex gap-x-4 items-center"> <p>Age range</p> <div className="bg-white py-2 px-3 rounded-[4px]">{userValue?.age_range?.min ?? 'NIL'} - {userValue?.age_range?.max ?? "NIL"}</div></div>
                                    {JSON.stringify(userValue?.age_range) !== JSON.stringify(userPrefencesData?.age_range) && <button className="modal__body__header__save-button" onClick={() => {setIsSavingAge(true); updateUserPreferences({age_range: userValue.age_range}); setTimeout(() => setIsSavingAge(false), 1500)}}>{!isSavingAge ? 'Save' : <Oval color="#485FE6" secondaryColor="#485FE6" width={14} height={14}/>}</button>}
                                </div>
                                <DoubleSliderBar val={[userValue?.age_range?.min as number ?? 18, userValue?.age_range?.max as number ?? 20]} getValue={(val) => setUserValue((prev) => ({...prev, age_range: {min: val[0], max: val[1]}}))}/>
                            </div>
                        </div>

                        <div>
                        <SettingsToggleItem title="Have a similar interest" isActive={toggle?.similar_interest as boolean} onButtonToggle={() => {setToggle((prev) => ({...prev, similar_interest: !toggle.similar_interest}));updateUserPreferences({similar_interest: !userPrefencesData?.similar_interest})}} />
                        <SettingsInterest title="Add personalized interests" onButtonPress={onInterests}/>
                        <SettingsToggleItem title="Has a bio" isActive={toggle?.has_bio as boolean} onButtonToggle={() => {setToggle((prev) => ({...prev, has_bio: !toggle.has_bio}));updateUserPreferences({has_bio: !userPrefencesData?.has_bio})}}/>
                        </div>
                        <SettingsGroup data={[
                        ['Relationship Preference', preference[userPrefencesData?.preference as number], () => {
                                setSettingsModalShowing('relationship-preference')
                            }],
                        ['Education', education[userPrefencesData?.education as number], () => {
                            setSettingsModalShowing('education')
                        }],
                        ['Love language', love_language[userPrefencesData?.love_language as number], () => {
                            setSettingsModalShowing('love-language')
                        }],
                        ['Zodiac', zodiac[userPrefencesData?.zodiac as number], () => {
                            setSettingsModalShowing('zodiac')
                        }],
                        ['Future family plans', family_goal[userPrefencesData?.family_goal as number], () => {
                            setSettingsModalShowing('future-family-plans')
                        }],
                        ['Country of residence', userPrefencesData?.country, () => {
                            setSettingsModalShowing('country')
                        }],
                        ['City of residence', userPrefencesData?.city, () => {
                            setSettingsModalShowing('city')
                        }],
                        ['How you communicate', communication_style[userPrefencesData?.communication_style as number], () => {
                            setSettingsModalShowing('communication_style')
                        }],
                        // ['Height', `${(userPrefencesData?.height as number)?.toString()}cm ${cmToFeetAndInches(userPrefencesData?.height as number)}`, () => {
                        //     setSettingsModalShowing('height')
                        // }],
                        // ['Weight', `${(userPrefencesData?.weight as number)?.toString()}kg ${kilogramsToPounds(userPrefencesData?.weight as number)}`, () => {
                        //     setSettingsModalShowing('weight')
                        // }],
                        ['Religion', religion[userPrefencesData?.religion as number], () => {
                            setSettingsModalShowing('religion')
                        }],
                        ['Dietary', dietary[userPrefencesData?.dietary as number], () => {
                            setSettingsModalShowing('dietary')
                        }],
                        ['Smoker', smoking[userPrefencesData?.smoke as number], () => {
                            setSettingsModalShowing('smoker')
                        }],
                        ['Drinking', drinking[userPrefencesData?.drink as number], () => {
                            setSettingsModalShowing('drinking')
                        }],
                        ['Workout', workout[userPrefencesData?.workout as number], () => {
                            setSettingsModalShowing('workout')
                        }],
                        ['Pet owner', pets[userPrefencesData?.pet_owner as number], () => {
                            setSettingsModalShowing('pet')
                        }],
                        ['Marital status', marital_status[userPrefencesData?.marital_status as number], () => {
                            setSettingsModalShowing('marital-status')
                        }]
                        ]} />
                        {/* <SettingsGroup data={[['About me', '2+ Prompts', () => { }],]} /> */}
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default PreferencesMobile;