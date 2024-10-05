"use client"
import React, { useEffect } from 'react'
import Wrapper from '@/components/common/Wrapper'
import Footer from '@/components/common/Footer'
import BreadCrumb from '@/components/common/BreadCrumbV2'
import PaymentCard from '@/components/common/PaymentCard'
import ItemsList from '@/components/Cart/@Items'
import DeliveryAddress from './@DeliveryAddress'
import { useAuthStore } from '@/store/authStore'
import { RolesEnum } from '@/utils/enum'
import { useCartStore } from '@/store/cartStore'
import AddressList from './@AddressList/page'

const IndexPage = () => {
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const cartUserId = useCartStore((state) => state.userId);
  const setUserId = useCartStore((state) => state.setUserId);

  useEffect(() => {
    if (user && cartUserId !== user.id) {
      setUserId(user.id);
    }
  }, [user, cartUserId, setUserId]);

  if (!user || (cartUserId !== null && cartUserId !== user.id)) {
    return (
      <div className="py-12">
        <BreadCrumb text="Cart" />
        <div className="mt-8 text-center">
          <p>Please log in to view your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <BreadCrumb text="Cart" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8">
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
          <ItemsList />
          {user.role.toLowerCase() !== RolesEnum.Student && items.length > 0 && (
            <>
              <DeliveryAddress />
              <AddressList />
            </>
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          {items.length > 0 && (
            <PaymentCard isStudent={user.role.toLowerCase() === RolesEnum.Student} />
          )}
        </div>
      </div>
    </div>
  )
}

export default IndexPage