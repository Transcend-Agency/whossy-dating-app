import React, { useState } from 'react';
import { Add } from "iconsax-react"

interface SectionProps {
  placeholder: string;
}

const ExpandableSection: React.FC<SectionProps> = ({ placeholder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const toggleExpand = () => {
    setIsExpanded(true); 
  };

  return (
    <div className="flex justify-center items-center">
  <div className="my-[1.6rem] w-full max-w-[80rem]">
    <div className="flex justify-between items-center bg-lightgray px-12 h-[5.1rem]">
      <p className="text-gray">{!isExpanded ? placeholder : ''}</p>
      <button onClick={toggleExpand} className="text-gray">
        <Add size="18" color="#8A8A8E" />
      </button>
    </div>

    {isExpanded && (
      <div className="mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Type your message"
        />
      </div>
    )}
  </div>
</div>
  );
};

export default ExpandableSection