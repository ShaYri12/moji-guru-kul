import React, { useState } from 'react';
import { FaCartArrowDown, FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from '@/store/cartStore';
import { Typography } from '@mui/material';

interface AddToCartDialogProps {
  open: boolean;
  onClose: (added: boolean) => void;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    categoryId:number;
  };
}

const AddToCartDialog: React.FC<AddToCartDialogProps> = ({ open, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      maxQuantity: product.quantity,  
      categoryId:product.categoryId
    });
    onClose(true);
  };

  const handleClose = () => {
    onClose(false);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-emerald-50 rounded-full p-2">
            <FaCartArrowDown className="text-emerald-500 h-8 w-8" />
          </div>
        </div>
        <Typography variant="h5" color="text.secondary" className="mb-4 font-bold text-neutral-800">
          Add to Cart
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className="mb-4">
          How many &quot;{product.name}&quot; do you want to add to your cart?
        </Typography>
        <div className="flex items-center justify-center mb-6">
          <button onClick={decreaseQuantity} className="bg-purple text-white rounded-full p-2 shadow-md">
            <FaMinus />
          </button>
          <span className="mx-4 text-2xl font-bold">{quantity}</span>
          <button onClick={increaseQuantity} className="bg-purple text-white rounded-full p-2 shadow-md">
            <FaPlus />
          </button>
        </div>
        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-red-300 w-1/2 rounded-md text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-emerald-500 text-white w-1/2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartDialog;