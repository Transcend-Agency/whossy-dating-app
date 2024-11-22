import { motion } from "framer-motion";
import {FC, useEffect, useState} from "react";
import SettingsToggleItem from "../../components/dashboard/SettingsToggleItem";
import ProfileSettingsGroup from "@/components/dashboard/ProfileSettingsGroup";
import SettingsModal from "@/components/dashboard/SettingsModal";
import { useNavigate } from "react-router-dom";
import {auth, db} from "@/firebase";
import { useAuthStore } from "@/store/UserId";
import { updateUserProfile } from "@/hooks/useUser";
import { User } from "@/types/user";
import HelpModal from "@/components/dashboard/HelpModal";
import BlockedContacts from "@/pages/dashboard/BlockedContacts.tsx";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";
import toast from "react-hot-toast";

interface ProfileSettingsProps {
    activePage: boolean;
    closePage: () => void;
    userSettings: {
        incoming_messages?: boolean;
        public_search?: boolean;
        read_receipts?: boolean;
        online_status?: boolean;
    }
    prefetchUserData: () => void;
}

const ProfileSettings: FC<ProfileSettingsProps> = ({ activePage, closePage, userSettings, prefetchUserData}) => {
    const [profileSettings, setProfileSettings] = useState(userSettings)
    const [showBlockedContacts, setShowBlockedContacts] = useState(false); // To toggle Blocked Contacts page
    const [showModal, setShowModal] = useState<'hidden' | 'logout'>('hidden');
    const [openModal, setOpenModal] = useState(false);
    const {reset, auth: user, user: currentUser} = useAuthStore();
    const navigate = useNavigate()

    const updateUserSetting = (settingName: string, value: boolean) => {
        updateUserProfile("users", user?.uid as string, prefetchUserData, {
            ...currentUser,
            [settingName]: value  // This will update just the specific field
        }).then(() => {
            // toast.success(`Setting ${settingName} updated`);
            console.log(`Setting ${settingName} updated`) })
            .catch((err) => {
                toast.error("Error Updating Setting");
                console.error("Error updating setting:", err);
            });
    };

    useEffect(() => {
        setProfileSettings({
            incoming_messages: currentUser?.incoming_messages,
            public_search: currentUser?.public_search,
            read_receipts: currentUser?.read_receipts,
            online_status: currentUser?.online_status,
        } as User);
    }, [currentUser]);


    const logout = () => {
        auth.signOut().then(
            () => { console.log('signed out'); reset(); navigate('/')}
        ).catch((err) =>{
            console.log("An error occurred while trying to logout", err); toast.error("Error Logging out")
        })
    }

    const deleteAccount = async  () => {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
            console.error("No user is signed in!");
            toast.error("Error deleting account")
            return
        }

        try {
            await deleteDoc(doc(db, "users", user.uid));
            console.log("User data deleted from Firestore!");

            await deleteUser(user);
            console.log("User account deleted successfully!");
            toast.success("User account deleted successfully!")
            logout()
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    }

    return (
        <>
            <SettingsModal show={showModal == 'logout'} onCloseModal={() => setShowModal('hidden')} onLogout={logout}/>
            <HelpModal show={openModal} onCloseModal={() => setOpenModal(false)} />


            <motion.div animate={activePage ? { x: "-100%", opacity: 1 } : { x: 0 }} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page edit-profile settings-page z-20">
                <div className="settings-page__container">
                    <div className="settings-page__title">
                        <button onClick={closePage} className="settings-page__title__left">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" alt={''} />
                            <p>Profile Settings</p>
                        </button>
                    </div>
                    <div className="settings-page__settings-group">
                        <SettingsToggleItem
                            title="Incoming messages"
                            subtext="This will allow only verified users to message you."
                            isActive={profileSettings.incoming_messages as boolean}
                            onButtonToggle={() => {
                                const updatedSettings = { ...profileSettings, incoming_messages: !profileSettings.incoming_messages };
                                setProfileSettings(updatedSettings);
                                updateUserSetting('incoming_messages', !profileSettings.incoming_messages)
                            }}
                            isPremium={currentUser?.is_premium as boolean} />

                        <SettingsToggleItem title="Public search" subtext="Other users will be able to find your profile online when they search the internet." isActive={profileSettings.public_search as boolean} onButtonToggle={() => {
                            const updatedSettings = { ...profileSettings, public_search: !profileSettings.public_search };
                            setProfileSettings(updatedSettings);
                            updateUserSetting('public_search', !profileSettings.public_search)
                        }} />

                        <SettingsToggleItem title="Read receipts" subtext="Matches won’t be able to see when you have read their messages and you won’t be able to see theirs." isActive={profileSettings.read_receipts as boolean} onButtonToggle={() => {
                            const updatedSettings = { ...profileSettings, read_receipts : !profileSettings.read_receipts };
                            setProfileSettings(updatedSettings);
                            updateUserSetting('read_receipts', !profileSettings.read_receipts)
                        }} />

                        <SettingsToggleItem title="Online status" subtext="Users won’t be able to see when you’re online." isActive={profileSettings.online_status as boolean} onButtonToggle={() => {
                            const updatedSettings = { ...profileSettings, online_status: !profileSettings.online_status };
                            setProfileSettings(updatedSettings);
                            updateUserSetting('online_status', !profileSettings.online_status)
                        }} isPremium={currentUser?.is_premium as boolean} />
                    </div>
                    <section className="mt-2 space-y-2 flex flex-col">

                   <button onClick={() => setShowBlockedContacts(true)}>
                       <ProfileSettingsGroup title="Blocked contacts" />
                   </button>
                   <button onClick={() => setOpenModal(true)} >
                       <ProfileSettingsGroup title="Help and Support"/>
                   </button>
                    </section>
                    <div className="flex mt-8 justify-center px-[2.8rem] gap-x-2 py-[1.6rem] cursor-pointer bg-[#F6F6F6] hover:bg-[#ececec]" onClick={() => setShowModal('logout')}>
                        <img src="/assets/icons/logout.svg" alt="" />
                        <p>Logout</p>
                    </div>
                    <div onClick={deleteAccount} className="flex mt-8 justify-center cursor-pointer px-[2.8rem] py-[1.6rem] bg-[#F6F6F6] text-[#F2243E] hover:bg-[#ececec]">Delete Account</div>
                </div>
            </motion.div>

            <BlockedContacts
                activePage={showBlockedContacts}
                closePage={() => setShowBlockedContacts(false)}
            />
        </>
    )
}

export default ProfileSettings;