import { motion } from "framer-motion";
import React, { useState } from "react";
import { updateUserProfile } from "@/hooks/useUser";
import {User, UserFilters} from "@/types/user";
import { drinking, education, family_goal, love_language, marital_status, pets, preference, religion, smoking, workout, zodiac } from "@/constants";
import { BioSettingsModal, DrinkingSettingsModal, EducationSettingsModal, EmailSettingsModal, FutureFamilyPlansSettingsModal, GenderSettingsModal, HeightSettingsModal, LoveLanguageSettingsModal, MaritalStatusSettingsModal, NameSettingsModal, PetsSettingsModal, PhoneNumberSettingsModal, RelationshipPreferenceSettingsModal, ReligionSettingsModal, SmokerStatusSettingsModal, WeightSettingsModal, WorkoutSettingsModal, ZodiacSignSettingsModal } from "@/components/dashboard/EditProfileModals";
import SettingsGroup from "@/components/dashboard/SettingsGroup";
import Photos from "@/components/dashboard/Photos";
import { useAuthStore } from "@/store/UserId";

interface EditProfileProps {
    activePage: string;
    closePage: () => void;
    onPreviewProfile: () => void;
    userData: User | undefined;
    userPreferencesData: UserFilters | undefined;
    refetchUserData: () => void;
    refetchUserPreferencesData: () => void;
}

type SettingsModal = 'hidden' | 'name' | 'gender' | 'email' | 'phone' | 'relationship-preference' | 'love-language' | 'zodiac' | 'future-family-plans' | 'smoker' | 'religion' | 'drinking' | 'workout' | 'pet' | 'marital-status' | 'height' | 'weight' | 'education' | 'bio'

const EditProfileMobile: React.FC<EditProfileProps> = ({ activePage, closePage, onPreviewProfile, userData, userPreferencesData, refetchUserData, refetchUserPreferencesData }) => {
    const [settingsModalShowing, setSettingsModalShowing] = useState<SettingsModal>('hidden')
    const hideModal = () => setSettingsModalShowing('hidden')

    const {auth} = useAuthStore();

    const updateUser =  async (s: UserFilters) => {updateUserProfile("users", auth?.uid as string, () => {hideModal(); refetchUserData()}, s).catch(e => console.error(e))}
    const updateUserPreferences = async (s: UserFilters) => {updateUserProfile("users", auth?.uid as string, () => {hideModal(); refetchUserPreferencesData()}, s).catch(e => console.error(e))}

    return (
        <>

            <NameSettingsModal showing={settingsModalShowing === 'name'} hideModal={hideModal} first_name={userData?.first_name as string} last_name={userData?.last_name as string} handleSave={(first_name, last_name) => {updateUser({first_name, last_name})}}/>
            <GenderSettingsModal showing={settingsModalShowing === 'gender'} hideModal={hideModal} userGender={userData?.gender as string} handleSave={(gender) => updateUser({gender})}/>
            <EmailSettingsModal showing={settingsModalShowing === 'email'} hideModal={hideModal} />
            <PhoneNumberSettingsModal showing={settingsModalShowing === 'phone'} hideModal={hideModal} phone_number={userData?.phone_number as string} handleSave={(phone_number) => updateUser({phone_number})}/>
            <RelationshipPreferenceSettingsModal showing={settingsModalShowing === 'relationship-preference'} hideModal={hideModal} userPreference={userPreferencesData?.preference as number} handleSave={(preference) => updateUserPreferences({preference}) }/>
            <LoveLanguageSettingsModal showing={settingsModalShowing === 'love-language'} hideModal={hideModal} userLoveLanguage={userPreferencesData?.love_language as number} handleSave={(love_language) => updateUserPreferences({love_language}) }/>
            <ZodiacSignSettingsModal showing={settingsModalShowing === 'zodiac'} hideModal={hideModal} userZodiac={userPreferencesData?.zodiac as number} handleSave={(zodiac) => updateUserPreferences({zodiac}) } />
            <FutureFamilyPlansSettingsModal showing={settingsModalShowing === 'future-family-plans'} hideModal={hideModal} userFamilyGoal={userPreferencesData?.family_goal as number} handleSave={(family_goal) => updateUserPreferences({family_goal}) } />
            <SmokerStatusSettingsModal showing={settingsModalShowing === 'smoker'} hideModal={hideModal} userSmoke={userPreferencesData?.smoke as number} handleSave={(smoke) => updateUserPreferences({smoke}) }/>
            <ReligionSettingsModal showing={settingsModalShowing === 'religion'} hideModal={hideModal} userReligion={userPreferencesData?.religion as number} handleSave={(religion) => updateUserPreferences({religion}) }/>
            <DrinkingSettingsModal showing={settingsModalShowing === 'drinking'} hideModal={hideModal} userDrink={userPreferencesData?.drink as number} handleSave={(drink) => updateUserPreferences({drink}) }/>
            <WorkoutSettingsModal showing={settingsModalShowing === 'workout'} hideModal={hideModal} userWorkout={userPreferencesData?.workout as number} handleSave={(workout) => updateUserPreferences({workout}) } />
            <PetsSettingsModal showing={settingsModalShowing === 'pet'} hideModal={hideModal} userPet={userPreferencesData?.pet_owner as number} handleSave={(pets) => updateUserPreferences({pets}) } />
            <MaritalStatusSettingsModal showing={settingsModalShowing === 'marital-status'} hideModal={hideModal} userMaritalStatus={userPreferencesData?.marital_status as number} handleSave={(marital_status) => updateUserPreferences({marital_status}) }/>
            <HeightSettingsModal showing={settingsModalShowing === 'height'} hideModal={hideModal} userHeight={userPreferencesData?.height as number} handleSave={(height) => updateUserPreferences({height}) }/>
            <WeightSettingsModal showing={settingsModalShowing === 'weight'} hideModal={hideModal} userWeight={userPreferencesData?.weight as number} handleSave={(weight) => updateUserPreferences({weight}) }/>
            <EducationSettingsModal showing={settingsModalShowing === 'education'} hideModal={hideModal} userEducation={userPreferencesData?.education as number} handleSave={(education) => updateUserPreferences({education}) }/>
            <BioSettingsModal showing={settingsModalShowing === 'bio'} hideModal={hideModal} bio={userPreferencesData?.bio as string} handleSave={(bio) => updateUserPreferences({bio}) }/>


            <motion.div animate={activePage == 'preview-profile' ? { scale: 0.9, opacity: 0.3, x: "-100%" } : (activePage !== 'user-profile' ? { x: "-100%", opacity: 1 } : { x: 0 })} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page-no-border edit-profile settings-page lg:hidden">
                <div className="settings-page__container">
                    <div className="settings-page__title">
                        <button onClick={closePage} className="settings-page__title__left">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            <p>Edit Profile</p>
                        </button>
                        {/* <button className="settings-page__title__save-button">Save</button> */}
                    </div>
                    <button onClick={onPreviewProfile} className="settings-page__preview">Preview Profile</button>
                    {/* <div className="settings-page__profile-images">
                        <div className="settings-page__profile-images__top">
                            <UserProfileImage imageSrc="/assets/images/dashboard/sample-person.png" />
                            <div className="settings-page__profile-images__top__right">
                                <UserProfileImage imageSrc="" />
                                <UserProfileImage imageSrc="" />
                            </div>
                        </div>
                        <div className="settings-page__profile-images__bottom">
                            <UserProfileImage imageSrc="" />
                            <UserProfileImage imageSrc="" />
                            <UserProfileImage imageSrc="" />
                        </div>

                    </div> */}
                    <Photos refetchUserPreferences={refetchUserPreferencesData}/>
                    <div className="space-y-3 mt-3">
                        <SettingsGroup data={[['Name', userData?.first_name as string, () => {
                            setSettingsModalShowing('name')
                        }],
                        ['Birthday', userPreferencesData?.date_of_birth ? getFormattedDateFromFirebaseDate(userPreferencesData?.date_of_birth) : '', () => { }],
                        ['Gender', userData?.gender as string, () => {
                            setSettingsModalShowing('gender')
                        }],
                        ['Email', userData?.email as string,
                        () => {}],
                        ['Phone number', userData?.phone_number as string, () => {
                            setSettingsModalShowing('phone')
                        }],
                        ]} />
                        <SettingsGroup data={[['Education', education[userPreferencesData?.education as number], () => {
                            setSettingsModalShowing('education')
                        }],
                        ['Relationship Goals', preference[userPreferencesData?.preference as number], () => {
                            setSettingsModalShowing('relationship-preference')
                        }],
                        ['Love language', love_language[userPreferencesData?.love_language as number], () => {
                            setSettingsModalShowing('love-language')
                        }],
                        ['Zodiac', zodiac[userPreferencesData?.zodiac as number], () => {
                            setSettingsModalShowing('zodiac')
                        }],
                        ['Future family plans', family_goal[userPreferencesData?.family_goal as number], () => {
                            setSettingsModalShowing('future-family-plans')
                        }],
                        ['Height', userPreferencesData?.height ? `${(userPreferencesData?.height as number)?.toString()}cm (${cmToFeetAndInches(userPreferencesData?.height as number)})` : 'Choose', () => {
                            setSettingsModalShowing('height')
                        }],
                        ['Weight', userPreferencesData?.weight ? `${(userPreferencesData?.weight as number)?.toString()}kg (${kilogramsToPounds(userPreferencesData?.weight as number)}lbs)` : 'Choose', () => {
                            setSettingsModalShowing('weight')
                        }],
                        ['Religion', religion[userPreferencesData?.religion as number], () => {
                            setSettingsModalShowing('religion')
                        }],
                        ['Smoker', smoking[userPreferencesData?.smoke as number], () => {
                            setSettingsModalShowing('smoker')
                        }],
                        ['Drinking', drinking[userPreferencesData?.drink as number], () => {
                            setSettingsModalShowing('drinking')
                        }],
                        ['Workout', workout[userPreferencesData?.workout as number], () => {
                            setSettingsModalShowing('workout')
                        }],
                        ['Pet owner', pets[userPreferencesData?.pet_owner as number], () => {
                            setSettingsModalShowing('pet')
                        }],
                        ['Marital status', marital_status[userPreferencesData?.marital_status as number], () => {
                            setSettingsModalShowing('marital-status')
                        }]
                        ]} />
                        <SettingsGroup data={[['About me', userPreferencesData?.bio as string, () => { setSettingsModalShowing('bio') }],
                        ]} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default EditProfileMobile;