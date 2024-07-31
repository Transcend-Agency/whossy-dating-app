import { useEffect, useState } from "react";
import { useOnboardingStore } from "../../store/useStore";

interface SchoolNameProps {
  getSchool: (s: any) => void;
}

const EnterSchoolNameInput: React.FC<SchoolNameProps> = ({ getSchool }) => {
  const [value, setValue] = useState("");
  const { "onboarding-data": data } = useOnboardingStore();
  useEffect(() => {
    if (data.education !== undefined) {
      setValue(data.education);
    }
  }, []);
  return (
    <input
      className="rounded-lg py-[2.4rem] px-[1.6rem] w-full text-[1.8rem] my-[3.2rem] bg-[#F6F6F6] outline-none"
      type="text"
      placeholder="enter school name"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        getSchool(e.target.value);
      }}
    />
  );
};

export default EnterSchoolNameInput;
