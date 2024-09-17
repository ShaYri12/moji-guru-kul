"use client"; // Add this directive at the top

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon

interface BreadCrumbProps {
  text: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ text }) => {
  const handleBackClick = () => {
    window.history.back(); // Move one step back in window history
  };

  return (
    <div className="flex items-center cursor-pointer p-2" onClick={handleBackClick}>
      <FaArrowLeft className="mr-2 text-purple" /> {/* Left arrow icon */}
      <span className='text-purple font-semibold text-[24px]'>{text}</span>
    </div>
  );
};

export default BreadCrumb;
