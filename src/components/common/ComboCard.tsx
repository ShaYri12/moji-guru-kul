// ComboCard.tsx
import React from 'react';
import Link from 'next/link';

interface CardProps {
  points: number;
  price: number;
  title: string; 
  desc: string;
}

const ComboCard: React.FC<CardProps> = ({ points, price, title, desc }) => {
  return (
    <div className="bg-gray-300 rounded-lg p-3 flex flex-col items-center justify-between">
      <div className="w-full mb-4 flex flex-col items-center">
        <span className="text-black text-center w-full">
          <p className='text-center mt-6 text-[22px]'>{title}</p>
          <p className='text-[14px] font-normal leading-5'>{desc}</p>
        </span>
      </div>
      <div className="w-full mt-auto">
        <Link href="/cart">
          <button className="text-white w-full py-2 rounded-lg text-[14px] flex justify-between items-center px-4 bg-purple shadow-lg">
            Add to cart <span>$5</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComboCard;