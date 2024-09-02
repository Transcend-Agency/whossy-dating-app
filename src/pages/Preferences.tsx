import BottomModal from "@/components/dashboard/BottomModal";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import DoubleSliderBar from "@/components/ui/DoubleSliderBar";
import SliderBar from "@/components/ui/SliderBar";
import Switch from "@/components/ui/Switch";
import Tag from "@/components/ui/Tag";
import {
  communication_style,
  drinking,
  family_goals,
  love_language,
  pets,
  preference,
  smoking,
  workout,
  zodiac,
} from "@/constants";
import React, { useState } from "react";

interface SectionProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

interface HeaderProps {
  title: string;
  value: string;
}

interface OtherProps {
  text: string;
  getValue: (s: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between items-center">
      <p>{title}</p>
      <p className="bg-white py-2 px-3 text-[1.2rem] rounded-[4px]">{value}</p>
    </div>
  );
};

const Sections: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-[#F6F6F6] text-[1.4rem] py-[1.2rem] px-[1.6rem] ${className}`}
      style={{ border: "1px solid #D9D9D980" }}
    >
      {children}
    </div>
  );
};

const Others: React.FC<OtherProps> = ({ text, getValue }) => {
  return (
    <div
      className="flex justify-between items-center pb-3 cursor-pointer"
      style={{ borderBottom: "1px solid #D9D9D9" }}
      onClick={() => getValue(text)}
    >
      <p>{text}</p>
      <div className="flex gap-2 ">
        <p>chooose</p>
        <img src="/assets/icons/right-arrow.svg" alt="" />
      </div>
    </div>
  );
};

const getOptionsByTitle = (title: string) => {
  const item = others.find((o) => o.title === title);
  return item ? item.options : [];
};
const getOptionsByType = (title: string) => {
  const item = others.find((o) => o.title === title);
  return item ? item.type : "";
};

const Preferences = () => {
  const [distance, setDistance] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number[]>([20, 50]);
  const [show, setShow] = useState<string>("");

  return (
    <main className="space-y-3">
      <ProfileHeader title="Preferences" />
      <Sections>
        <Header title="Distance Search" value={distance + " " + "mi"} />
        <SliderBar
          getValue={(val) => setDistance(val)}
          rangeColor="#C5C5C7"
          trackColor="#ffffff"
          thumbColor="white"
        />
        <Switch text="Show people outside my distance radius and country for better reach" />
        <hr className="my-4" />
        <Header title="Age range" value={`${ageRange[0]} - ${ageRange[1]}`} />
        <DoubleSliderBar
          thumbColor="white"
          rangeColor="#C5C5C7"
          trackColor="#fff"
          getValue={(range) => setAgeRange(range)}
        />
      </Sections>
      <Sections className="space-y-4">
        <h1 className="text-[1.4rem[">I want to meet</h1>
        <div className="flex space-x-2">
          {gender.map((item, i) => (
            <Tag key={i} image={item.image} text={item.text} />
          ))}
        </div>
      </Sections>
      <Sections className="space-y-4">
        <Switch text="Have similar interests" textColor="black" />
        <hr />
        <div className="flex justify-between cursor-pointer">
          <p>Add personalized interests</p>
          <img src="/assets/icons/add.svg" alt="Add interests" />
        </div>
        <hr />
        <Switch text="Has a bio" textColor="black" />
        <hr />
      </Sections>
      <Sections className="space-y-[1.6rem]">
        {others.map((item, i) => (
          <Others key={i} text={item.title} getValue={(val) => setShow(val)} />
        ))}
      </Sections>
      {show !== "" && (
        <BottomModal
          item={{ title: show, options: getOptionsByTitle(show) }}
          // type: getOptionsByType(show)
          close={() => setShow("")}
        />
      )}
    </main>
  );
};

export default Preferences;

const gender = [
  { image: "/assets/images/onboarding/men.svg", text: "Men" },
  { image: "/assets/images/onboarding/women.svg", text: "Women" },
  { image: "/assets/images/onboarding/everyone.svg", text: "Everyone" },
];

const others = [
  {
    title: "Relationship Preference",
    options: preference,
  },
  {
    title: "Education",
    options: ["Not in school", "Currently schooling"],
  },
  {
    title: "Love language",
    options: love_language,
  },
  {
    title: "Zodiac",
    options: zodiac,
  },
  {
    title: "Future family plans",
    options: family_goals,
  },
  {
    title: "How you communicate",
    options: communication_style,
  },
  {
    title: "Smoker",
    options: smoking,
  },
  {
    title: "Drinking",
    options: drinking,
  },
  {
    title: "Workout",
    options: workout,
  },
  {
    title: "Pet owner",
    options: pets,
  },
  {
    title: "City of residence",
    type: "input",
  },
  {
    title: "Height",
    type: "range",
  },
  {
    title: "Weight",
    type: "range",
  },
];
