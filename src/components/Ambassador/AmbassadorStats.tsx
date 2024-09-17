'use client'
import React, { useState } from 'react'
import { CouponResponseType } from '@/utils/types'
import classNames from 'classnames'
import { useAmbassadorStore } from '@/store/ambassadorStore'
import CustomTooltip from '../common/CustomTooltip'
import { useErrorStore } from '@/store/errorStore'

type AmbassadorStatsProps = {
  coupons: CouponResponseType[]
}

const AmbassadorStats = ({ coupons }: AmbassadorStatsProps) => {
  const [isCouponTooltipOpen, setIsCouponTooltipOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const { couponStats, setSelectedCoupon } = useAmbassadorStore()
  const setAlert = useErrorStore((state) => state.setAlert)

  return (
    <div>
      <h3 className="text-indigo text-xl font-bold mb-1">Select Coupon</h3>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full my-6">
        {coupons &&
          coupons?.map((coupon: CouponResponseType, i) => (
            <div
              key={coupon.id}
              onClick={() => {
                setSelectedCoupon(coupon)
                navigator.clipboard.writeText(coupon.code)
                setAlert({ message: 'Coupon code copied to clipboard', type: 'success' })
              }}
              onMouseEnter={() => {
                setIsCouponTooltipOpen(true)
                setActiveIndex(i)
              }}
              onMouseLeave={() => {
                setIsCouponTooltipOpen(false)
                setActiveIndex(0)
              }}
              className={classNames(
                'click-effect shadow-grade-box rounded-lg bg-white h-[70px] w-full flex justify-center items-center cursor-pointer font-bold text-base border tracking-wider hover:bg-indigo hover:text-white',
                {
                  '!bg-sliver-sand text-white hover:!cursor-not-allowed': coupon.availedCount <= 0,
                }
              )}
            >
              {coupon.code}
              <CustomTooltip
                placement="top"
                open={isCouponTooltipOpen && i === activeIndex}
                setOpen={() => {
                  setIsCouponTooltipOpen(!isCouponTooltipOpen)
                }}
              >
                <div className="p-2 text-indigo text-sm shadow-grade-box">
                  <p className="pt-0">{coupon.name}</p>
                  <p className="pt-0 text-lite-black">Availed Count: {coupon.availedCount}</p>
                </div>
              </CustomTooltip>
            </div>
          ))}
      </div>
      <div className="my-10">
        <h3 className="text-indigo text-xl font-bold mb-1">Ambassador Stats</h3>
        <div className="shadow-tiles my-5 p-4">
          <div className="flex gap-4 items-center mb-4">
            <h4 className="text-indigo font-medium min-w-[170px]">Total Commission Earned:</h4>
            <p>{couponStats.totalCommisionEarned || 0}</p>
          </div>
          <div className="flex gap-4 items-center mb-4">
            <h4 className="text-indigo font-medium min-w-[170px]">Referred User Count:</h4>
            <p>{couponStats.referredUserCount || 0}</p>
          </div>
          <div>
            <h4 className="text-indigo font-medium min-w-[170px]">User Commission Details:</h4>
            <div>
              {couponStats.userCommisionDetails?.map((userCommissionDetail, i) => (
                <div key={i} className="flex gap-4 items-center mb-4 p-3 shadow-grade-box">
                  <p>{userCommissionDetail.userName}</p>
                  <p>{userCommissionDetail.comissionFromUser}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmbassadorStats
