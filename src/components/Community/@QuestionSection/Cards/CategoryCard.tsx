'use client'
import React, { useState } from 'react';
import { FaCog, FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const categories = [
  { name: 'Technical', active: true },
  { name: 'Technical', active: false },
  { name: 'Technical', active: false },
  { name: 'Technical', active: false },
  { name: 'Technical', active: false },
];

const CategoryCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-full mx-auto border-2 border-gray-200 w-full">
      <h2 className="text-xl font-semibold mb-4 text-black flex justify-between items-center">
        Category
        <button className="block lg:hidden" onClick={toggleDropdown}>
          <FaBars />
        </button>
      </h2>
      <hr className="mb-4" />
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        {categories.map((category, index) => (
          <div key={index} className={`flex items-center mb-3 p-2 rounded-lg ${category.active ? 'bg-purple-40 text-purple' : ''}`}>
            <FaCog className={`mr-2 ${category.active ? 'text-purple-500' : 'text-gray-400'}`} />
            <span className={`${category.active ? 'text-purple-500' : 'text-[#A5A4A7]'} font-medium`}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
