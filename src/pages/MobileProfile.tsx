import toast from "react-hot-toast";
import Plans from "../components/dashboard/Plans";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/dashboard/MobileNavBar";

interface CardsProps {
  src: string;
  title: string;
  buttonText: string;
  txtColor: string;
  bgColor: string;
}
const Cards: React.FC<CardsProps> = ({
  src,
  title,
  buttonText,
  txtColor,
  bgColor,
}) => {
  return (
    <div
      className={`text-[1.6rem] flex items-center justify-center ${bgColor} py-4 w-full rounded-[12px]`}
    >
      <img src={src} alt="" />
      <div className="h-[4rem] justify-between flex flex-col items-start">
        <p className="font-medium">{title}</p>
        <button
          className={`${txtColor} underline`}
          onClick={() => toast.success("Clicked")}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const MobileProfile = () => {
  const percentage = 20;
  const navigate = useNavigate();
  return (
    <div className="lg:hidden">
      <NavBar>
        <div className="profile">
          <section className="profile__section-one">
            <figure className="profile__image-container">
              <img
                src="/assets/images/profile/profile-pic.png"
                alt="Profile Image"
                className="profile__image-container__image"
              />
              <img
                className="profile__image-container__icon"
                src="/assets/icons/profile.svg"
                alt="profile edit"
                onClick={() => {
                  navigate('/dashboard/profile/edit')
                }}
              />
            </figure>
            {/* <figure className="profile__image-container">
            <CircleProgressBar percentage={95} circleWidth={"100"} />
            <img
              className="profile__image-container__icon"
              src="/assets/icons/profile.svg"
              alt=""
            />
          </figure> */}
            <h1 className="text-[1.6rem] w-fit self-center">
              <span className="font-bold">Stephanie,</span> 21
            </h1>
            <h2 className="bg-black py-[0.8rem] px-[1.2rem] text-white text-[1.2rem] rounded-[8px] w-fit self-center">
              {percentage}% complete
            </h2>
            <article
              className="bg-white flex items-center justify-center w-full text-[1.4rem] py-[14px] px-[32px] space-x-[16px] rounded-[12px]"
              style={{ border: "1px solid #D9D9D9" }}
            >
              <img src="/assets/icons/announcement.svg" alt="" />
              <p>
                Add more info to your profile to stand out. Click on the edit button
                to get started.
              </p>
            </article>
            <article className="bg-[#F6F6F6] flex items-center justify-center w-full text-[1.4rem] py-[14px] px-[32px] space-x-[16px] rounded-[12px]">
              <img src="/assets/icons/announcement.svg" alt="" />
              <p>Whossy Safety Guide</p>
            </article>
            <div className="w-full flex gap-x-4">
              {cards.map(({ title, btnText, txtColor, bgColor, src }) => (
                <Cards
                  title={title}
                  buttonText={btnText}
                  txtColor={txtColor}
                  bgColor={bgColor}
                  src={src}
                />
              ))}
            </div>
            <Plans />
          </section>
        </div>
      </NavBar>
    </div>
  );
};

export default MobileProfile;

const cards = [
  {
    title: "Profile Boost",
    btnText: "Get Now",
    bgColor: "bg-[#FDFAE7]",
    txtColor: "text-[#EECA0C]",
    src: "/assets/icons/boost.svg",
  },
  {
    title: "10 Super Likes",
    btnText: "Add More",
    bgColor: "bg-[#F3F3FF]",
    txtColor: "text-[#8785FF]",
    src: "/assets/icons/star.svg",
  },
];
