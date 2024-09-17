import React from 'react';
import CustomButton from './CustomButton';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

interface PaymentCardProps {
  isStudent: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ isStudent }) => {
  const { items, getTotalPrice } = useCartStore();
    const { user } = useAuthStore();
  const subtotal = getTotalPrice();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;
  const totalPoints = getTotalPrice();
  const availablePoints =
    // user?.points
    // ||
    0;
  const currencySymbol = isStudent ? 'pts' : 'INR';
  if (!isStudent) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto border-2 border-gray">
        <h2 className="text-purple text-2xl font-bold mb-4">Payment</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Choose type of payment</label>
          <input type="text" className="w-full p-3 rounded-lg text-[14px] text-gray-400" placeholder="Bank Card" disabled />
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Subtotal:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Delivery:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{deliveryFee.toFixed(2)}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 font-bold">Total to pay:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{total.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Voucher Code</label>
          <input type="text" className="w-full p-3 rounded-lg text-[14px]" placeholder="Enter voucher number..." />
        </div>
        <p className="text-gray-600 text-sm mb-4">
          By paying, you accept the{' '}
          <a href="#" className="text-purple underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple underline">
            Privacy
          </a>
        </p>
        <CustomButton color="#753CBD" textColor="#fff" className="w-full p-4">
          Continue to Pay
        </CustomButton>
      </div>
    );
  }
  else {
    return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto">
      <div className="flex justify-start items-center mb-6 gap-8">
        <span className="text-black font-semibold text-2xl">Available Points:</span>
        <span className="text-purple font-semibold text-2xl">{availablePoints} Points</span>
      </div>
      
      <hr className="my-4" />
      
      <h2 className="text-purple text-3xl font-bold mb-4">Pay by Points</h2>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-700 font-semibold text-2xl">Total to pay:</span>
        <span className="text-purple font-bold text-2xl">{totalPoints} Points</span>
      </div>
          <CustomButton color="#753CBD" textColor="#fff" className="w-full p-4">
          Continue to Pay
        </CustomButton>
    </div>
  );
  }
};

export default PaymentCard;