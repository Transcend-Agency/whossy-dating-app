import { useEffect, useState } from "react";
// import { useOnboardingStore } from "../../store/useOnboardingStore";
import { useOnboardingStore as useStore } from "../../store/useStore";

interface TagSelectorProps {
  text: string;
  key: number;
}

const TagSelector: React.FC<TagSelectorProps> = ({ text, key }) => {
  const [selected, setSelected] = useState<string | null>();
  // const {interests,addInterests, removeInterests} = useOnboardingStore();

  const {removeInterests, addInterests, "onboarding-data": data} = useStore();
  
  const handleClick = () => {
    if (selected === text) {
      removeInterests(text);
      setSelected(null);
    } else {
      addInterests(text);
      setSelected(text);
    }
  };
  useEffect(() => {
     data.interests?.forEach((interest) => {
      if (interest === text) setSelected(text);
    });
  }, [])
  return (
    <div
      key={key}
      className="text-[1.6rem] inline-block mr-[1rem] w-fit rounded-md px-[0.6rem] py-[0.8rem] cursor-pointer"
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

export default TagSelector;
