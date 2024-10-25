import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SettingsToggleItem from "../../components/dashboard/SettingsToggleItem";
import ProfileSettingsGroup from "@/components/dashboard/ProfileSettingsGroup";
import SettingsModal from "@/components/dashboard/SettingsModal";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { useAuthStore } from "@/store/UserId";
import { updateUserProfile } from "@/hooks/useUser";
import { User } from "@/types/user";
import HelpModal from "@/components/dashboard/HelpModal";

interface ProfileSettingsProps {
    activePage: boolean;
    closePage: () => void;
    userSettings: {
        incoming_messages?: boolean;
        hide_verification_badge?: boolean;
        public_search?: boolean;
        read_receipts?: boolean;
        online_status?: boolean;
    }
    refetchUserData: () => void;
}

// type SettingsModal = 'hidden' | 'name' | 'gender' | 'email' | 'phone' | 'relationship-preference' | 'love-language' | 'zodiac' | 'future-family-plans' | 'smoker' | 'religion' | 'drinking' | 'workout' | 'pet' | 'marital-status' | 'height' | 'weight' | 'education'

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ activePage, closePage, userSettings, refetchUserData}) => {
    const [profileSettings, setProfileSettings] = useState(userSettings)
    const [showModal, setShowModal] = useState<'hidden' | 'logout'>('hidden');
    const [openModal, setOpenModal] = useState(false);
    const {reset, auth: user} = useAuthStore();
    const navigate = useNavigate()

    const updateUser =  (s: User) => {updateUserProfile("users", user?.uid as string, refetchUserData, s)}

    useEffect(() => {   
        setProfileSettings(
            {
                incoming_messages: userSettings.incoming_messages ?? false,
                hide_verification_badge: userSettings.hide_verification_badge ?? false,
                public_search: userSettings.public_search ?? false,
                read_receipts: userSettings.read_receipts ?? false,
                online_status: userSettings.online_status ?? false
            } as User
        )
    }   
    , [userSettings])

    return (
        <>

            <SettingsModal show={showModal == 'logout'} onCloseModal={() => setShowModal('hidden')} onLogout={() => auth.signOut().then(() => {console.log('signed out'); reset(); navigate('/')}).catch((err) => console.log('error signing out,', err)) }/>
            <HelpModal show={openModal} onCloseModal={() => setOpenModal(false)} />
            

            <motion.div animate={activePage ? { x: "-100%", opacity: 1 } : { x: 0 }} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page edit-profile settings-page z-20">
                <div className="settings-page__container">
                    <div className="settings-page__title">
                        <button onClick={closePage} className="settings-page__title__left">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            <p>Profile Settings</p>
                        </button>
                        {/* <button className="settings-page__title__save-button">Save</button> */}
                    </div>
                    <div className="settings-page__settings-group">
                        <SettingsToggleItem title="Incoming messages" subtext="This will allow only verified users to message you." isActive={profileSettings.incoming_messages ?? false} onButtonToggle={() => {setProfileSettings({ ...profileSettings, incoming_messages: !profileSettings.incoming_messages }); updateUser({incoming_messages: !profileSettings.incoming_messages})}} isPremium/>

                        <SettingsToggleItem title="Hide verification badge" subtext="This will hide the verification badge on your profile." isActive={profileSettings.hide_verification_badge ?? false} onButtonToggle={() => {setProfileSettings({ ...profileSettings, hide_verification_badge: !profileSettings.hide_verification_badge }); updateUser({hide_verification_badge: !profileSettings.hide_verification_badge})}} />

                        <SettingsToggleItem title="Public search" subtext="Other users will be able to find your profile online when they search the internet." isActive={profileSettings.public_search ?? false} onButtonToggle={() => {setProfileSettings({ ...profileSettings, public_search: !profileSettings.public_search }); updateUser({public_search: !profileSettings.public_search})}} />

                        <SettingsToggleItem title="Read receipts" subtext="Matches won’t be able to see when you have read their messages and you won’t be able to see theirs." isActive={profileSettings.read_receipts ?? false} onButtonToggle={() => {setProfileSettings({ ...profileSettings, read_receipts: !profileSettings.read_receipts }); updateUser({read_receipts: !profileSettings.read_receipts})}} />

                        <SettingsToggleItem title="Online status" subtext="Users won’t be able to see when you’re online." isActive={profileSettings.online_status ?? false} onButtonToggle={() => {setProfileSettings({ ...profileSettings, online_status: !profileSettings.online_status }); updateUser({online_status: !profileSettings.online_status})}} isPremium />
                    </div>
                    <section className="mt-2 space-y-2 flex flex-col">

                        {/* WANDE'S MODAL  */}
                       <ProfileSettingsGroup title="Blocked contacts" />
                       <button onClick={() => setOpenModal(true)} >
                           <ProfileSettingsGroup title="Help and Support"/>
                       </button>

                    </section>
                    <div className="flex mt-8 justify-center px-[2.8rem] gap-x-2 py-[1.6rem] cursor-pointer bg-[#F6F6F6] hover:bg-[#ececec]" onClick={() => setShowModal('logout')}>
                        <img src="/assets/icons/logout.svg" alt="" />
                        <p>Logout</p>
                    </div>
                    <div className="flex mt-8 justify-center px-[2.8rem] py-[1.6rem] bg-[#F6F6F6] text-[#F2243E] hover:bg-[#ececec]">Delete Account</div>
                </div>
            </motion.div>
        </>
    )
}

export default ProfileSettings;