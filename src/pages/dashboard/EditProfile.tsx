import { motion } from "framer-motion";
import { useState } from "react";
import { DrinkingSettingsModal, EducationSettingsModal, EmailSettingsModal, FutureFamilyPlansSettingsModal, GenderSettingsModal, HeightSettingsModal, LoveLanguageSettingsModal, MaritalStatusSettingsModal, NameSettingsModal, PetsSettingsModal, PhoneNumberSettingsModal, RelationshipPreferenceSettingsModal, ReligionSettingsModal, SmokerStatusSettingsModal, WeightSettingsModal, WorkoutSettingsModal, ZodiacSignSettingsModal } from "../../components/dashboard/EditProfileModals";
import SettingsGroup from "../../components/dashboard/SettingsGroup";
import UserProfileImage from "../../components/dashboard/UserProfileImage";

interface EditProfileProps {
    activePage: string;
    closePage: () => void;
    onPreviewProfile: () => void;
}

type SettingsModal = 'hidden' | 'name' | 'gender' | 'email' | 'phone' | 'relationship-preference' | 'love-language' | 'zodiac' | 'future-family-plans' | 'smoker' | 'religion' | 'drinking' | 'workout' | 'pet' | 'marital-status' | 'height' | 'weight' | 'education'

const EditProfile: React.FC<EditProfileProps> = ({ activePage, closePage, onPreviewProfile }) => {
    const [settingsModalShowing, setSettingsModalShowing] = useState<SettingsModal>('hidden')
    const hideModal = () => setSettingsModalShowing('hidden')
    return (
        <>
            <NameSettingsModal showing={settingsModalShowing === 'name'} hideModal={hideModal} />
            <GenderSettingsModal showing={settingsModalShowing === 'gender'} hideModal={hideModal} />
            <EmailSettingsModal showing={settingsModalShowing === 'email'} hideModal={hideModal} />
            <PhoneNumberSettingsModal showing={settingsModalShowing === 'phone'} hideModal={hideModal} />
            <RelationshipPreferenceSettingsModal showing={settingsModalShowing === 'relationship-preference'} hideModal={hideModal} />
            <LoveLanguageSettingsModal showing={settingsModalShowing === 'love-language'} hideModal={hideModal} />
            <ZodiacSignSettingsModal showing={settingsModalShowing === 'zodiac'} hideModal={hideModal} />
            <FutureFamilyPlansSettingsModal showing={settingsModalShowing === 'future-family-plans'} hideModal={hideModal} />
            <SmokerStatusSettingsModal showing={settingsModalShowing === 'smoker'} hideModal={hideModal} />
            <ReligionSettingsModal showing={settingsModalShowing === 'religion'} hideModal={hideModal} />
            <DrinkingSettingsModal showing={settingsModalShowing === 'drinking'} hideModal={hideModal} />
            <WorkoutSettingsModal showing={settingsModalShowing === 'workout'} hideModal={hideModal} />
            <PetsSettingsModal showing={settingsModalShowing === 'pet'} hideModal={hideModal} />
            <MaritalStatusSettingsModal showing={settingsModalShowing === 'marital-status'} hideModal={hideModal} />
            <HeightSettingsModal showing={settingsModalShowing === 'height'} hideModal={hideModal} />
            <WeightSettingsModal showing={settingsModalShowing === 'weight'} hideModal={hideModal} />
            <EducationSettingsModal showing={settingsModalShowing === 'education'} hideModal={hideModal} />

            <motion.div animate={activePage == 'preview-profile' ? { scale: 0.9, opacity: 0.3, x: "-100%" } : (activePage !== 'user-profile' ? { x: "-100%", opacity: 1 } : { x: 0 })} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page edit-profile settings-page">
                <div className="settings-page__container">
                    <div className="settings-page__title">
                        <button onClick={closePage} className="settings-page__title__left">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            <p>Edit Profile</p>
                        </button>
                        <button className="settings-page__title__save-button">Save</button>
                    </div>
                    <button onClick={onPreviewProfile} className="settings-page__preview">Preview Profile</button>
                    <div className="settings-page__profile-images">
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

                    </div>
                    <SettingsGroup data={[['Name', 'Stephen', () => {
                        setSettingsModalShowing('name')
                    }],
                    ['Birthday', 'August 6, 2018', () => { }],
                    ['Gender', 'Male', () => {
                        setSettingsModalShowing('gender')
                    }],
                    ['Email', 'Stevedami1@gmail.com', () => {
                        setSettingsModalShowing('email')
                    }],
                    ['Phone number', '+2348140697549', () => {
                        setSettingsModalShowing('phone')
                    }],
                    ]} />
                    <SettingsGroup data={[['Education', 'Currently Schooling', () => {
                        setSettingsModalShowing('education')
                    }],
                    ['Relationship Goals', 'Looking to Date', () => {
                        setSettingsModalShowing('relationship-preference')
                    }],
                    ['Love language', 'Giving and receiving gifts', () => {
                        setSettingsModalShowing('love-language')
                    }],
                    ['Zodiac', 'Cancer', () => {
                        setSettingsModalShowing('zodiac')
                    }],
                    ['Future family plans', 'I want children', () => {
                        setSettingsModalShowing('future-family-plans')
                    }],
                    ['Height', '182cm (6’3ft)', () => {
                        setSettingsModalShowing('height')
                    }],
                    ['Weight', '6lbs', () => {
                        setSettingsModalShowing('weight')
                    }],
                    ['Religion', 'Christian', () => {
                        setSettingsModalShowing('religion')
                    }],
                    ['Smoker', 'Working on quitting', () => {
                        setSettingsModalShowing('smoker')
                    }],
                    ['Drinking', 'Mindful drinking', () => {
                        setSettingsModalShowing('drinking')
                    }],
                    ['Workout', 'Yes, regularly', () => {
                        setSettingsModalShowing('workout')
                    }],
                    ['Pet owner', '🐕 Dog', () => {
                        setSettingsModalShowing('pet')
                    }],
                    ['Marital status', 'Single', () => {
                        setSettingsModalShowing('marital-status')
                    }]
                    ]} />
                    <SettingsGroup data={[['About me', '2+ Prompts', () => { }],
                    ]} />
                </div>
            </motion.div>
        </>
    )
}

export default EditProfile;