'use client'
import React, { useEffect, useState } from 'react'
import { PlanResponseTypes, UserLinkedCouponsResponseType } from '@/utils/types'
import Image from 'next/image'
import CustomButton from '../common/CustomButton'
import { useSubscription } from '@/store/subscriptionStore'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'

type SubscriptionProps = {
  plans: PlanResponseTypes[]
}

const Subscription = ({ plans }: SubscriptionProps) => {
  const [couponCode, setCouponCode] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanResponseTypes | null>(null)
  const [discountedCoupon, setDiscountedCoupon] = useState<UserLinkedCouponsResponseType | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { userLinkedCoupons, loading, validationLoading, createSubscription, addCouponToUser, validateCoupon, getUserLinkedCoupon } =
    useSubscription()
  const { user } = useAuthStore()
  const setAlert = useErrorStore((state) => state.setAlert)

  useEffect(() => {
    if (userLinkedCoupons && userLinkedCoupons.length && couponCode) {
      debugger
      const findCouponByCouponCode = userLinkedCoupons.find((x) => x.code.toLocaleLowerCase() === couponCode.toLocaleLowerCase())
      setDiscountedCoupon(findCouponByCouponCode)
    }
  }, [userLinkedCoupons, couponCode])

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 min-[1380px]:grid-cols-4 gap-6">
      {plans.map((plan: PlanResponseTypes, i) => (
        <div key={plan.id} className="shadow-tiles rounded-md p-6">
          <div className="flex justify-center">
            <Image src="/assets/images/image.png" alt="" width={80} height={80} className="rounded" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-indigo text-2xl">{plan.name}</h1>
              <p>Trial Days: {plan.trialDays}</p>
            </div>
            <p>{plan.description}</p>
            <div className="flex justify-end">
              <span
                className="inline-block text-dark-sky-blue underline cursor-pointer"
                onClick={() => {
                  setModalOpen(true)
                  setSelectedPlan(plan)
                }}
              >
                Use Coupon
              </span>
            </div>

            <CustomButton
              color="#753CBD"
              textColor="#fff"
              onClick={async () => {
                if (!user?.id) {
                  return setAlert({ message: 'Please login to buy subscription', type: 'error' })
                }
                setActiveIndex(i)
                const response = await createSubscription({
                  razorPlanId: plan.razorPlanId,
                  customerId: user?.id.toString(),
                })
                if (response.short_url) {
                  //  open new tab with response.short_url
                  window.open(response.short_url, '_blank')
                } else {
                  setAlert({ message: 'Subscription creation failed. Please try again later', type: 'error' })
                }
              }}
              loading={loading && i === activeIndex}
              className="mt-3"
            >
              <span className="w-full flex justify-between items-center gap-2">
                Buy
                <span className="bg-white rounded p-0.5 px-2 text-indigo text-sm">
                  {plan.currency} {discountedCoupon ? (plan.amount * discountedCoupon?.percentage) / 100 : plan.amount}/{plan.period}
                </span>
              </span>
            </CustomButton>
          </div>
        </div>
      ))}
      <CustomModal open={isModalOpen} setOpen={(val) => setModalOpen(val)}>
        <h3 className="text-indigo text-2xl sm:text-4xl font-semibold text-center mb-5">Add Coupon</h3>
        <CustomInput value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        <div className="flex justify-center mt-5">
          <CustomButton
            className="!w-[140px] !h-11 !px-3 !text-sm"
            onClick={async () => {
              if (!user?.id) {
                return setAlert({ message: 'Please login to buy subscription', type: 'error' })
              }
              if (couponCode && selectedPlan) {
                const validationResponse = await validateCoupon({
                  userId: user.id,
                  couponCode,
                })
                if (!validationResponse.isSuccess) return setAlert({ message: validationResponse.message, type: 'error' })
                await addCouponToUser({
                  userId: user?.id,
                  code: couponCode,
                  discountedAmount: 0,
                  totalAmount: selectedPlan.amount,
                  Type: 0,
                })
                await getUserLinkedCoupon({ userId: user.id })
              }
            }}
            loading={validationLoading}
          >
            Validate Coupon
          </CustomButton>
        </div>
      </CustomModal>
    </div>
  )
}

export default Subscription
