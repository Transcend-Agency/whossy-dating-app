import { useEffect, useState } from "react";
// import { useOnboardingStore } from "../../store/useOnboardingStore";
import { useOnboardingStore } from "../../store/onboarding/useStore";

interface PetTagProps {
  text: string;
}

const PetTag: React.FC<PetTagProps> = ({ text }) => {
  const [selected, setSelected] = useState<string | null>();
  // const {interests,addInterests, removeInterests} = useOnboardingStore();

  const { removePets, addPets, "onboarding-data": data } = useOnboardingStore();

  const handleClick = () => {
    if (selected === text) {
      removePets(text);
      setSelected(null);
    } else {
      addPets(text);
      setSelected(text);
    }
  };
  useEffect(() => {
    data.pets?.forEach((interest) => {
      if (interest === text) setSelected(text);
    });
  }, []);
  return (
    <div
      className="text-[1.6rem] inline-block mr-[1rem] w-fit rounded-md px-[0.6rem] py-[0.8rem] cursor-pointer transition-all duration-150"
      style={{
        border: selected !== text ? "1px solid #8A8A8E" : "1px solid black",
        backgroundColor: selected !== text ? "white" : "black",
        color: selected !== text ? "#8A8A8E" : "white",
      }}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default PetTag;
