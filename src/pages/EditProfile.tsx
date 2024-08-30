import { useState } from "react";
import ProfileHeader from "../components/dashboard/ProfileHeader";
import Interests from "../components/onboarding/Interests";
import Card from "../components/dashboard/Card";
import BottomModal from "@/components/dashboard/BottomModal";

const Section = ({
  items,
  navigate,
  setShow,
}: {
  items: { title: string; value: string; page?: number; options?: string[] }[];
  navigate?: (i: number | undefined) => void;
  setShow: (s) => void;
}) => {
  return (
    <section
      className="bg-[#F6F6F6] px-[1.6rem] my-5"
      style={{
        borderTop: "1px solid #D9D9D980",
        borderBottom: "1px solid #D9D9D980",
      }}
    >
      {items.map((item, i) => (
        <div
          className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer"
          style={{
            borderBottom: i !== items.length - 1 ? "1px solid #D9D9D9" : "",
          }}
          key={i}
          onClick={() => {
            if (navigate && item.page) {
              navigate(item.page);
            } else {
              console.log("pressed");
              setShow({ title: item.title, options: item.options });
            }
          }}
        >
          <p>{item.title}</p>
          <div className="flex text-[#8A8A8E] gap-[0.8rem]">
            <p>{item.value}</p>
            <img src="/assets/icons/right-arrow.svg" alt="" />
          </div>
        </div>
      ))}
    </section>
  );
};

const Name = () => {
  const [name, setName] = useState({
    "First Name": "Temidire",
    "Last Name": "Owoeye",
  });
  return (
    <>
      <ProfileHeader title="Edit Profile" />
      <section
        className="bg-[#F6F6F6] px-[1.6rem]"
        style={{
          borderTop: "1px solid #D9D9D980",
          borderBottom: "1px solid #D9D9D980",
        }}
      >
        {Object.keys(name).map((item, i) => (
          <div
            className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer"
            style={{
              borderBottom:
                i !== Object.keys(name).length - 1 ? "1px solid #D9D9D9" : "",
            }}
            key={i}
          >
            <p>{item}</p>
            <div className="flex text-[#8A8A8E] gap-[0.8rem]">
              <input
                value={
                  name[
                    item as keyof { "First Name": string; "Last Name": string }
                  ]
                }
                onChange={(e) => {
                  setName((prev) => ({ ...prev, [item]: e.target.value }));
                }}
                className="w-[7rem] bg-inherit outline-none text-end"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

const Email = () => {
  const [email, setEmail] = useState("temidireowoeye@gmail.com");
  return (
    <>
      <ProfileHeader title="Edit Profile" />
      <section
        className="bg-[#F6F6F6] px-[1.6rem]"
        style={{
          borderTop: "1px solid #D9D9D980",
          borderBottom: "1px solid #D9D9D980",
        }}
      >
        <div className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer">
          <header className="flex gap-2 items-center">
            <p>Email</p>
            <div className="text-[1.2rem] bg-[#0CB25A] text-white px-[0.8rem] py-[0.4rem] rounded-full">
              Verified
            </div>
          </header>
          <div className="flex text-[#8A8A8E] gap-[0.8rem]">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-[15rem] bg-inherit outline-none text-end"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const PhoneNumber = () => {
  const [phone, setPhone] = useState("+2349073210998");
  return (
    <>
      <ProfileHeader title="Edit Profile" />
      <section
        className="bg-[#F6F6F6] px-[1.6rem]"
        style={{
          borderTop: "1px solid #D9D9D980",
          borderBottom: "1px solid #D9D9D980",
        }}
      >
        <div className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer">
          <header className="flex gap-2 items-center">
            <p>Phone Number</p>
            <div className="text-[1.2rem] bg-[#0CB25A] text-white px-[0.8rem] py-[0.4rem] rounded-full">
              Verified
            </div>
          </header>
          <div className="flex text-[#8A8A8E] gap-[0.8rem]">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="w-[15rem] bg-inherit outline-none text-end"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const PersonalInterests = () => {
  return (
    <>
      <ProfileHeader title="Interests" />
      <main className="p-[1.6rem]">
        <Interests />
      </main>
    </>
  );
};

const PreviewProfile = () => {
  return (
    <>
      <ProfileHeader title="Preview Profile" />
      <Card />
    </>
  );
};

const EditProfile = () => {
  const pages = [
    "view",
    "name",
    "email",
    "phoneNumber",
    "interests",
    "preview",
  ];
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [show, setShow] = useState<{ title: string; options: string[] } | null>(
    null
  );
  return (
    <>
      {pages[currentPage] === "view" && (
        <main>
          <ProfileHeader title="Edit profile" />
          <button
            className="profile__preview"
            onClick={() => setCurrentPage(5)}
          >
            Preview Profile
          </button>
          <section className="bg-[#F6F6F6] py-[1.2rem] px-[1.6rem]">
            <div className="grid grid-cols-4 grid-rows-2 sm:grid-rows-6 gap-4">
              <div className="row-span-2 col-span-2 h-[184px] bg-black rounded-2xl" />
              <div className="sm:row-span-2 col-span-2 sm:h-full h-[88px] bg-yellow-400 rounded-2xl" />
              <div className="sm:row-span-2 col-span-2 sm:h-full h-[88px] bg-red-500 rounded-2xl" />
              {/* <div className="sm:row-span-2 sm:col-span-2 sm:h-full h-[108px] bg-blue-500 rounded-2xl" />
              <div className="sm:row-span-2 sm:col-span-2 sm:h-full h-[108px] bg-green-500 rounded-2xl" />
              <div className="sm:row-span-2 sm:col-span-2 sm:h-full h-[108px] bg-amber-500 rounded-2xl" /> */}
            </div>
          </section>
          <Section
            items={items}
            navigate={(c) => setCurrentPage(c as number)}
            setShow={(c) => setShow(c)}
          />
          <Section
            items={items_two}
            navigate={(c) => setCurrentPage(c as number)}
            setShow={(c) => setShow(c)}
          />
          <Section items={items_three} setShow={(c) => setShow(c)} />
          {show && (
            <div
              className="fixed inset-0 bg-black opacity-50"
              style={{ zIndex: 10 }}
            />
          )}
          {show && <BottomModal item={show} close={() => setShow(null)} />}
        </main>
      )}
      {pages[currentPage] === "name" && <Name />}
      {pages[currentPage] === "email" && <Email />}
      {pages[currentPage] === "phoneNumber" && <PhoneNumber />}
      {pages[currentPage] === "interests" && <PersonalInterests />}
      {pages[currentPage] === "preview" && <PreviewProfile />}
    </>
  );
};

export default EditProfile;

const items = [
  { title: "Name", value: "Temidire", page: 1 },
  { title: "Birthday", value: "August 6, 2018" },
  { title: "Gender", value: "Male", options: ["Male", "Female"] },
  { title: "Email", value: "temidireowoeye@gmail.com", page: 2 },
  { title: "Phone Number", value: "+2349073210998", page: 3 },
];

const items_two = [
  {
    title: "Relationship Preference",
    value: "Temidire",
    options: [
      "Looking to date",
      "Chatting and connecting",
      "Just for fun",
      "Ready for commitment",
      "Undecided or exploring",
    ],
  },
  { title: "interests", value: "August 6, 2018", page: 4 },
];

const items_three = [
  { title: "Education", value: "Current Schooling" },
  {
    title: "Love Language",
    value: "Giving and receiving gifts",
    options: [
      "Giving and receiving gifts",
      "Touch and Hugs",
      "Heartfelt compliments",
      "Doing things for others",
      "Spending time together",
    ],
  },
  {
    title: "Zodiac",
    value: "Cancer",
    options: [
      "Cancer",
      "Leo",
      "Taurus",
      "Virgo",
      "Aquaris",
      "Capricorn",
      "Pisces",
      "Gemini",
      "Libra",
      "Aries",
      "Scorpio",
      "Sagittarius",
    ],
  },
  {
    title: "Future family goals",
    value: "I want children",
    options: [
      "I want children",
      "Not sure yet",
      "Not interested for now",
      "I don't want children",
      "I have children",
      "I want more",
    ],
  },
  { title: "Height", value: "140cm" },
  { title: "Weight", value: "6lbs" },
  { title: "Religion", value: "Christian" },
  {
    title: "Smoker",
    value: "Working on quitting",
    options: [
      "Working on quitting",
      "Drinks and Smoke",
      "Occassional smoker ",
      "Frequent Smoker",
      "Doesn't smoke",
    ],
  },
  {
    title: "Drinking",
    value: "Mindful drinking",
    options: [
      "Mindful drinking",
      "100% sober",
      "Special moments only",
      "Regular nights out",
      "Not my thing",
    ],
  },
  {
    title: "Workout",
    value: "Yes, regularly",
    options: [
      "Yes, regularly",
      "Occasionally",
      "Only on weekends",
      "Rarely",
      "Not at all",
    ],
  },
  {
    title: "Pet owner",
    value: "🐕 Dog",
    options: [
      "🐕 Dog",
      "🐈 Cat",
      "🐍 Reptile",
      "🐸 Amphibian",
      "🦜 Bird",
      "🐟 Fish",
      "😩 Don’t like pets",
      "🐇 Rabbits",
      "🐀 Mouse",
      "😉 Planning on getting",
      "🤮 Allergic",
      "🐎 Other",
      "🙃 Want a pet",
    ],
  },
  { title: "Marital status", value: "single" },
];
