import AmbassadorStats from '@/components/Ambassador/AmbassadorStats'
import { fetchRequest } from '@/network/FetchRequest'
import { CouponResponseType, SuccessResponse } from '@/utils/types'
import { cookies } from 'next/headers'
import React from 'react'

async function Ambassador() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value
  const coupons: SuccessResponse = await fetchRequest({ url: `discount/get-coupon-by-user/${userId}`, method: 'GET' })
  console.log('coupons----------', coupons)

  return (
    <div className="horizontal-spacing py-10">
      <div className="w-full max-w-[500px] m-auto">
        <AmbassadorStats coupons={coupons.returnObject as CouponResponseType[]} />
      </div>
    </div>
  )
}

export default Ambassador
