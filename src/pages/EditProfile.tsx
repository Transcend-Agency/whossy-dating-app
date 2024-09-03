import { useEffect, useState } from "react";
import ProfileHeader from "../components/dashboard/ProfileHeader";
import Card from "../components/dashboard/Card";
import BottomModal from "@/components/dashboard/BottomModal";
import Name from "@/components/dashboard/Name";
import PhoneNumber from "@/components/dashboard/PhoneNumber";
import Email from "@/components/dashboard/Email";
import { useGetUserProfile } from "@/hooks/useUser";
import { UserPrefences, UserProfile } from "@/types/user";
import {
  drinking,
  education,
  family_goal,
  love_language,
  marital_status,
  pets,
  preference,
  relationship_preferences,
  religion,
  smoking,
  workout,
  zodiac,
} from "@/constants";
import Habits from "@/components/dashboard/Habits";

const Section = ({
  items,
  navigate,
  setShow,
}: {
  items: {
    title: string;
    value: string;
    page?: number;
    options?: string[];
    notChange?: boolean;
    id?: string;
    placeholder?: string;
    range?: number;
    arrayNumber?: number;
  }[];
  navigate?: (i: number | undefined) => void;
  setShow: (s: any) => void;
}) => {
  const [fetchedUserProfile, setFetchedUserProfile] = useState<UserProfile>({});
  const [fetchedUserPreferences, setFetchedUserPreferences] =
    useState<UserPrefences>({});

  const fetchUserProfile = async () => {
    const userProfile = await useGetUserProfile("users");

    if (userProfile) {
      setFetchedUserProfile(userProfile);
    } else {
      console.log("No user profile data found.");
    }
  };
  const fetchUserPreferences = async () => {
    const userPrefences = await useGetUserProfile("preferences");

    if (userPrefences) {
      setFetchedUserPreferences(userPrefences as UserPrefences);
    } else {
      console.log("No user preferences data found.");
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchUserPreferences();
  }, []);
  const getValue = (id: string | undefined): string | null => {
    switch (id) {
      case "preference":
        return (
          relationship_preferences[fetchedUserPreferences.preference as number]
            ?.title ?? "choose"
        );
      case "drink":
        return drinking[fetchedUserPreferences.drink as number] ?? "choose";
      case "smoke":
        return smoking[fetchedUserPreferences.smoke as number] ?? "choose";
      case "workout":
        return workout[fetchedUserPreferences.workout as number] ?? "choose";
      case "pet_owner":
        return pets[fetchedUserPreferences.pet_owner as number] ?? "choose";
      case "education":
        return education[fetchedUserPreferences.education as number] ?? "choose";
      case "love_language":
        return (
          love_language[fetchedUserPreferences.love_language as number] ??
          "choose"
        );
      case "zodiac":
        return zodiac[fetchedUserPreferences.zodiac as number] ?? "choose";
      case "family_goal":
        return (
          family_goal[fetchedUserPreferences.family_goal as number] ??
          "choose"
        );
      case "marital_status":
        return (
          marital_status[fetchedUserPreferences.marital_status as number] ??
          "choose"
        );
      case "interests":
        return fetchedUserPreferences.interests?.[0] ?? "choose";
      case "religion":
        return religion[fetchedUserPreferences.religion as number] ?? null;
      default:
        return "chooose";
    }
  };
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
              if (!item.notChange) {
                setShow({
                  title: item.title,
                  options: item.options,
                  placeholder: item.placeholder,
                  range: item.range,
                  value: getValue(item.id),
                  id: item.id,
                  // arrayNumber: typeof(fetchedUserPreferences[item.id] ?? 5) === 'number'
                });
              }
            }
          }}
        >
          <p>{item.title}</p>
          <div className="flex text-[#8A8A8E] gap-[0.8rem]">
            {item.value === "user_profile" && (
              <p>{fetchedUserProfile[item.id as keyof UserProfile]}</p>
            )}

            {/* {item.value === "user_preferences" && (
              <p>
                {fetchedUserPreferences[ item.id as keyof UserPrefences
                ]?.toString()}
              </p>
            )} */}
            {item.id && <p>{getValue(item.id)}</p>}
            {!item.notChange && (
              <img src="/assets/icons/right-arrow.svg" alt="" />
            )}
          </div>
        </div>
      ))}
    </section>
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
  const [show, setShow] = useState<{
    title: string;
    options: string[];
    placeholder?: string;
    range?: number;
    value?: string;
    id?: string;
    arrayNumber?: number;
  } | null>(null);

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
          {show && (
            <BottomModal
              path="preferences"
              item={show}
              close={() => setShow(null)}
            />
          )}
        </main>
      )}
      {pages[currentPage] === "name" && <Name />}
      {pages[currentPage] === "email" && <Email />}
      {pages[currentPage] === "phoneNumber" && <PhoneNumber />}
      {pages[currentPage] === "interests" && <Habits path="preferences" />}
      {pages[currentPage] === "preview" && <PreviewProfile />}
    </>
  );
};

export default EditProfile;

const items = [
  { title: "Name", value: "user_profile", page: 1, id: "first_name" },
  {
    title: "Birthday",
    value: "user_preferences",
    notChange: true,
    id: "date_of_birth",
  },
  {
    title: "Gender",
    value: "user_profile",
    options: ["Male", "Female"],
    id: "gender",
  },
  { title: "Email", value: "user_profile", page: 2, id: "email" },
  { title: "Phone Number", value: "user_profile", page: 3, id: "phone_number" },
];

const items_two = [
  {
    title: "Relationship Preference",
    value: "user_preferences",
    options: preference,
    id: "preference",
  },
  { title: "Interests", value: "August 6, 2018", page: 4, id: "interests" },
];

const items_three = [
  {
    title: "Education",
    value: "user_preferences",
    options: education,
    id: "education",
  },
  {
    title: "Love Language",
    value: "Giving and receiving gifts",
    options: love_language,
    id: "love_language",
  },
  {
    title: "Zodiac",
    value: "user_preferences",
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
    id: "zodiac",
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
    id: "family_goal",
  },
  { title: "Height", value: "140cm", range: 140 },
  { title: "Weight", value: "6lbs", range: 170 },
  {
    title: "Religion",
    value: "user_preferences",
    options: religion,
    id: "religion",
  },
  {
    title: "Smoker",
    value: "user_preferences",
    options: smoking,
    id: "smoke",
  },
  {
    title: "Drinking",
    value: "user_preferences",
    options: drinking,
    id: "drink",
  },
  {
    title: "Workout",
    value: "user_preferences",
    options: workout,
    id: "workout",
  },
  {
    title: "Pet owner",
    value: "user_preferences",
    options: pets,
    id: "pet_owner",
  },
  {
    title: "Marital status",
    value: "user_preferences",
    options: marital_status,
    id: "marital_status",
  },
];
