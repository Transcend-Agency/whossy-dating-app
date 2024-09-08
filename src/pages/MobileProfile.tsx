// import toast from "react-hot-toast";
import { User, UserPrefences } from "@/types/user";
import {motion} from "framer-motion"
import ProfileCreditButtton from "@/components/dashboard/ProfileCreditButtton";
import ProfilePlan from "@/components/dashboard/ProfilePlan";
import TopNav from "@/components/dashboard/TopNav";
import BottomNav from "@/components/dashboard/BottomNav";

// interface CardsProps {
//   src: string;
//   title: string;
//   buttonText: string;
//   txtColor: string;
//   bgColor: string;
// }

interface MobileProfileProps {
  activePage: string
  onEditProfilePage: () => void
  onSettingsPage: () => void
  onFiltersPage: () => void
  userData: User | undefined;
  userPrefencesData: UserPrefences | undefined;
}

// const Cards: React.FC<CardsProps> = ({
//   src,
//   title,
//   buttonText,
//   txtColor,
//   bgColor,
// }) => {
//   return (
//     <div
//       className={`text-[1.6rem] flex items-center justify-center ${bgColor} py-4 w-full rounded-[12px]`}
//     >
//       <img src={src} alt="" />
//       <div className="h-[4rem] justify-between flex flex-col items-start">
//         <p className="font-medium">{title}</p>
//         <button
//           className={`${txtColor} underline`}
//           onClick={() => toast.success("Clicked")}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };

const MobileProfile: React.FC<MobileProfileProps> = ({activePage, onEditProfilePage, onSettingsPage, onFiltersPage, userData, userPrefencesData}) => {

  const getYearFromFirebaseDate = (firebaseDate: {nanoseconds: number, seconds: number} | undefined) => {
    if (!firebaseDate || typeof firebaseDate.seconds !== 'number') {
      throw new Error('Invalid Firebase date object');
    }
  
    // Convert seconds to milliseconds
    const milliseconds = firebaseDate.seconds * 1000;
  
    // Create a Date object
    const date = new Date(milliseconds);
  
    // Get the year
    return date.getFullYear();
  };


  return (
    <motion.div animate={activePage == 'user-profile' ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }} transition={{ duration: 0.25 }} className='user-profile dashboard-layout__main-app__body__main-page lg:hidden'>
    <div className='user-profile__container'>
        {/* <div className='flex justify-end'>
            <button onClick={() => setActivePage('profile-settings')} className='user-profile__settings-button'><img src="/assets/images/dashboard/settings.svg" /></button>
        </div> */}
        <TopNav onSettings={onSettingsPage} onPreferences={onFiltersPage}/>
        <section className='user-profile__profile-picture-container'>
            <figure className='user-profile__profile-picture'>
                <img src="/assets/images/auth-bg/1.webp" />
            </figure>
            <button onClick={onEditProfilePage} className='user-profile__update-profile-button'>
                <img src="/assets/icons/update-profile.svg" />
            </button>
        </section>
        <section className='user-profile__profile-details'>
            <div className='user-profile__profile-details'>
                <p>{userData?.first_name}, <span className='user-profile__profile-details__age'>{ userPrefencesData?.date_of_birth ?(new Date()).getFullYear() - getYearFromFirebaseDate(userPrefencesData.date_of_birth) : 'NIL'}</span>
                    <img src="/assets/icons/verified-badge.svg" />
                </p>
            </div>
            <div className='user-profile__profile-details__completion-status'>
                20% Complete
            </div>
        </section>
        <div className='user-profile__banner user-profile__banner--info'>
            <img src="/assets/icons/notification-alert.svg" />
            <p>Add more info to your profile to stand out. Click on the edit button to get started.</p>
        </div>
        <div className='user-profile__banner user-profile__banner--safety-guide'>
            <img src="/assets/icons/notification-alert.svg" />
            <p>Whossy Safety Guide</p>
        </div>
        <section className='user-profile__credit-buttons'>
            <ProfileCreditButtton description='Profile Boost' linkText='Get Now' imgSrc='/assets/images/dashboard/rocket.png' onLinkClick={() => { }} />
            <ProfileCreditButtton description='Add Credits' linkText='Add More' imgSrc='/assets/images/dashboard/coin.png' onLinkClick={() => { }} />
        </section>
        <BottomNav />
    </div>
    <section className='user-profile__plans'>
        <ProfilePlan planTitle='Whossy Free Plan' pricePerMonth='0' benefits={['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4']} type='free' gradientSrc='/assets/images/dashboard/free.svg' />
        <ProfilePlan planTitle='Whossy Premium Plan' pricePerMonth='12.99' benefits={['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4']} type='premium' gradientSrc='/assets/images/dashboard/premium.svg' />
    </section>

</motion.div>
  );
};

export default MobileProfile;

// const cards = [
//   {
//     title: "Profile Boost",
//     btnText: "Get Now",
//     bgColor: "bg-[#FDFAE7]",
//     txtColor: "text-[#EECA0C]",
//     src: "/assets/icons/boost.svg",
//   },
//   {
//     title: "10 Super Likes",
//     btnText: "Add More",
//     bgColor: "bg-[#F3F3FF]",
//     txtColor: "text-[#8785FF]",
//     src: "/assets/icons/star.svg",
//   },
// ];
