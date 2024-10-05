import React, { useState } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onSelect: (option: DropdownOption) => void;
}

const DropdownRating: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full sm:w-fit relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex justify-between w-full rounded-lg text-[#B1AFB3] leading-[21px] tracking-[2%] tex border border-[#B1AFB3] shadow-sm px-4 py-2 bg-white text-[18px] font-medium outline-none"
        >
          <span>Sort by: {selectedOption.label}</span>
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full border  rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${selectedOption.value === option.value ? 'font-bold' : ''}`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownRating;
