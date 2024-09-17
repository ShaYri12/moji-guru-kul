// Card.tsx
import React from 'react';
import Link from 'next/link';

interface CardProps {
  points: number;
  price: number;
}

const Card: React.FC<CardProps> = ({ points, price }) => {
  return (
    <div className="bg-gray-300 rounded-lg p-3 flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <span className="text-white rounded-lg w-8 h-8 flex items-center justify-center bg-purple text-[14px] font-medium shadow-lg">{points}</span>
        <span className="text-white rounded-lg w-8 h-8 flex items-center justify-center bg-purple text-[14px] font-medium shadow-lg">{price}</span>
      </div>
      <div className="w-20 h-20 mb-4 flex items-center justify-center">
        <span className="text-black">
            <img src="img/item.png" alt="Item" />
        </span>
      </div>
      <Link href="/cart" className='w-full'>
        <button className="text-white w-full py-2 rounded-lg text-[14px] flex justify-between items-center px-4 bg-purple shadow-lg">
          Add to cart <span>${price}</span>
        </button>
      </Link>
    </div>
  );
};

export default Card;