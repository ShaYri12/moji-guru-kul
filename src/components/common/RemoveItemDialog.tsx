import React from 'react';
import { FaTrash } from "react-icons/fa";
import { Typography } from '@mui/material';

interface RemoveItemDialogProps {
  open: boolean;
  onClose: (removed: boolean) => void;
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };
  isStudent: boolean;
}

const RemoveItemDialog: React.FC<RemoveItemDialogProps> = ({ open, onClose, item, isStudent }) => {
  const handleRemove = () => {
    onClose(true);
  };

  const handleCancel = () => {
    onClose(false);
  };

  const currencySymbol = isStudent ? 'pts' : '$';

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-red-50 rounded-full p-2">
            <FaTrash className="text-red-500 h-8 w-8" />
          </div>
        </div>
        <Typography variant="h5" color="text.secondary" className="mb-4 font-bold text-neutral-800">
          Remove Item
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className="mb-4">
          Are you sure you want to remove {item.quantity} {item.quantity > 1 ? 'items' : 'item'} of &quot;{item.name}&quot; 
          (Total: {currencySymbol}{(item.price * item.quantity).toFixed(2)}) from your cart?
        </Typography>
        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 w-1/2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            className="px-6 py-2 bg-red-500 text-white w-1/2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItemDialog;