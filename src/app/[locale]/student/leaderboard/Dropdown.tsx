"use client"
import { useState } from 'react';

interface DropdownProps {
    title: string;
    options: string[];
    isOpen: boolean; // Prop for open state
    onToggle: () => void; // Prop for toggling
    customClass?: string; // New prop for custom styles
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, isOpen, onToggle, customClass }) => {
    const [selectedOption, setSelectedOption] = useState<string>(title);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onToggle(); 
    };

    return (
        <div className="w-full relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={onToggle} 
                    className={`inline-flex justify-center rounded-md border border-[#753CBD] shadow-sm w-full sm:w-[158px] h-[48px] items-center 
                                ${customClass ? customClass : 'bg-white text-[#753CBD]'} 
                                text-[18px] leading-[21px] font-medium outline-none transition-all`}
                >
                    {selectedOption}
                    <svg
                        className="mt-0.5 h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06 0L10 10.5l3.71-3.29a.75.75 0 111.04 1.08l-4.25 3.75a.75.75 0 01-1.04 0l-4.25-3.75a.75.75 0 010-1.08z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
