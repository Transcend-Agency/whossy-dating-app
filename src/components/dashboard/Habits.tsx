import ProfileHeader from "./ProfileHeader";
// import HabitSearch from "./HabitSearch";
import { alphabet } from "@/constants";
import { useEffect, useState } from "react";
import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
import { UserFilters, UserPrefences } from "@/types/user";

interface HabitsProps {
  path: string;
}

const Habits: React.FC<HabitsProps> = ({ path }) => {
  const [initData, setInitData] = useState<string[]>([]);
  const [mutatedData, setMutatedData] = useState<string[]>([]);

  const fetchInterests = async () => {
    const userProfile = (await useGetUserProfile(path)) as
      | UserPrefences
      | UserFilters;

    if (userProfile) {
      const interests = userProfile.interests as string[];
      setInitData(interests);
      setMutatedData(interests);
    } else {
      console.log("No user profile data found.");
    }
  };

  useEffect(() => {
    fetchInterests();
  }, [path]);

  const hasChanged = JSON.stringify(initData) !== JSON.stringify(mutatedData);

  const handleUpdate = () => {
    useUpdateUserProfile(path, fetchInterests, {
      interests: mutatedData,
    });
  };

  const handleClick = (option: string) => {
    setMutatedData((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <>
      <ProfileHeader
        title="Interests"
        changed={hasChanged}
        save={handleUpdate}
      />
      <main className="px-6">
        {/* <HabitSearch /> */}
        {alphabet.map((item, _) => (
          <div className="mb-[0.8rem]" key={_}>
            <h1 className="text-[1.8rem]">{item.letter.toUpperCase()}</h1>
            <div className="space-y-[1rem]">
              {item.options?.map((option, i) => (
                <div
                  key={i}
                  className="text-[1.6rem] inline-block mr-[1rem] w-fit rounded-md px-[0.6rem] py-[0.8rem] cursor-pointer transition-all duration-150"
                  style={{
                    border: mutatedData.includes(option)
                      ? "1px solid black"
                      : "1px solid #8A8A8E",
                    backgroundColor: mutatedData.includes(option)
                      ? "black"
                      : "transparent",
                    color: mutatedData.includes(option) ? "white" : "black",
                  }}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <hr className="mt-[1.8rem]" />
          </div>
        ))}
      </main>
    </>
  );
};

export default Habits;
