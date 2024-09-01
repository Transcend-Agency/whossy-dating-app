import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";

const PhoneNumber = () => {
  const [initialData, setInitialData] = useState("");
  const [phone, setPhone] = useState("");
  const fetchUserProfile = async () => {
    const userProfile = await useGetUserProfile("LhM2885SizfxstEBL0YJbEF8kIM2");

    if (userProfile) {
      setPhone(userProfile.phone_number as string);
      setInitialData(userProfile.phone_number as string);
    } else {
      console.log("No user profile data found.");
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUpdate = () => {
    useUpdateUserProfile("LhM2885SizfxstEBL0YJbEF8kIM2", fetchUserProfile, {
      phone_number: phone,
    });
  };
  return (
    <>
      <ProfileHeader
        title="Edit Profile"
        changed={phone !== initialData}
        save={handleUpdate}
      />
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

export default PhoneNumber;
