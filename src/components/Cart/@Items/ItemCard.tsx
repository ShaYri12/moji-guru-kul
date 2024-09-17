import RemoveItemDialog from '@/components/common/RemoveItemDialog';
import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import StarsIcon from '@mui/icons-material/Stars';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ItemCardProps {
  item: Item;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  isStudent: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onIncrease, onDecrease, onRemove, isStudent }) => {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleRemoveClick = () => {
    setIsRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = (removed: boolean) => {
    setIsRemoveDialogOpen(false);
    if (removed) {
      onRemove(item.id);
    }
  };

  const formatPrice = (price: number) => {
    if (isStudent) {
      return (
        <span className="flex items-center">
          <StarsIcon className="!text-[#fe9400] mr-2" />
          {price.toFixed(0)}
        </span>
      );
    }
    return `INR${price.toFixed(2)}`;
  };

  return (
    <>
      <div className=' hidden md:block'>
      <div className="flex flex-col md:flex-row items-center bg-white p-4 border-b-2 mb-4">
        <img src={item.image || '/img/item.png'} alt={item.name} className="w-16 h-16 rounded-lg mb-4 md:mb-0 md:mr-4" />
        <h3 className="text-gray-700 font-semibold w-full md:w-[300px] text-center md:text-left">{item.name}</h3>
        <div className="flex w-full flex-col md:flex-row items-center justify-between mt-2">
          <span className="text-gray-700 mb-2 md:mb-0 min-w-20">{formatPrice(item.price)}</span>
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <button className="bg-purple text-white rounded-full p-2 shadow-md" onClick={() => onDecrease(item.id)}>
              <FaMinus />
            </button>
            <span className="text-black rounded-full shadow-md border-2 border-purple-70 w-8 h-8 flex justify-center items-center">{item.quantity}</span>
            <button className="bg-purple text-white rounded-full p-2 shadow-md" onClick={() => onIncrease(item.id)}>
              <FaPlus />
            </button>
          </div>
          <span className="text-gray-700 mb-2 md:mb-0">{formatPrice(item.price * item.quantity)}</span>
          <button className="text-red-500 bg-[#FEE2E2] p-2 shadow-md rounded-full" onClick={handleRemoveClick}>
            <FaTimes />
          </button>
        </div>
      </div>
      <RemoveItemDialog
        open={isRemoveDialogOpen}
        onClose={handleRemoveDialogClose}
        item={item}
        isStudent={isStudent}
      />

      </div>

      <div className=' block md:hidden'>
          <div className="bg-white p-4 border-b-2 mb-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <img src={item.image || '/img/item.png'} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
        <h3 className="text-gray-700 font-semibold flex-grow">{item.name}</h3>
        <button className="text-red-500 bg-[#FEE2E2] p-2 rounded-full" onClick={handleRemoveClick}>
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-gray-700 font-medium">{formatPrice(item.price)}</span>
        <div className="flex items-center gap-2">
          <button className="bg-purple text-white rounded-full p-2 shadow-md" onClick={() => onDecrease(item.id)}>
            <FaMinus />
          </button>
          <span className="text-black rounded-full shadow-md border-2 border-purple-500 w-8 h-8 flex justify-center items-center">
            {item.quantity}
          </span>
          <button className="bg-purple text-white rounded-full p-2 shadow-md" onClick={() => onIncrease(item.id)}>
            <FaPlus />
          </button>
        </div>
        <span className="text-gray-700 font-bold">{formatPrice(item.price * item.quantity)}</span>
      </div>
      <RemoveItemDialog
        open={isRemoveDialogOpen}
        onClose={handleRemoveDialogClose}
        item={item}
        isStudent={isStudent}
      />
    </div>
      </div>
    </>
  );
};

export default ItemCard;