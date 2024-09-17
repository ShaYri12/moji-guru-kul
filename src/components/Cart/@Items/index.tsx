'use client'
import React from 'react';
import ItemCard from './ItemCard';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { RolesEnum } from '@/utils/enum';

const Index = () => {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.updateItemQuantity);
  const decreaseQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const user = useAuthStore();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-full mx-auto border-2 border-gray w-full">
      <div className="bg-white rounded-xl max-w-4xl mx-auto">
        <h2 className="text-purple text-2xl font-bold mb-6">Items</h2>
        {items.map((item) => (
          <ItemCard
           isStudent={user.user?.role.toLocaleLowerCase() === RolesEnum.Student} 
            key={item.id} 
            item={item} 
            onIncrease={() =>increaseQuantity(item.id , item.quantity + 1)} 
            onDecrease={() => decreaseQuantity(item.id, item.quantity - 1)} 
            onRemove={removeItem} 
          />
        ))}
        {items.length === 0 && (
          <div>
            No items in the cart.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;