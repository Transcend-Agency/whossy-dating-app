import React, { useState } from 'react';
import { Add, Minus } from "iconsax-react";

interface SectionProps {
  placeholder: string;
  answer: string;
}

const ExpandableSection: React.FC<SectionProps> = ({ placeholder, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="my-[1.6rem] w-full max-w-[80rem]">
        <div className="flex justify-between items-center bg-lightgray px-12 h-[5.1rem]">
          <p className="text-gray">{placeholder}</p>
          <button onClick={toggleExpand} className="text-gray">
            {isExpanded ? <Minus size="18" color="#8A8A8E" /> : <Add size="18" color="#8A8A8E" />}
          </button>
        </div>

        
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-5 rounded-full p-7" style={{ border: "1px solid #FF5C00" }}>
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableSection;
