import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { networkService } from '@/network/NetworkService'
import { SubscriptionResponseTypes, SubscriptionParams, SuccessResponse, UserLinkedCouponsResponseType } from '@/utils/types'
import { useErrorStore } from './errorStore'

type SubscriptionStore = {
  loading: boolean
  subscriptions: SubscriptionResponseTypes[]
  getSubscriptions: () => Promise<SubscriptionResponseTypes[]>
  createSubscription: ({ razorPlanId, customerId }: SubscriptionParams) => Promise<SubscriptionResponseTypes>
  validateCoupon: ({ userId, couponCode }: { userId: number; couponCode: string }) => Promise<SuccessResponse>
  addCouponToUser: ({
    userId,
    code,
    discountedAmount,
    totalAmount,
    Type,
  }: {
    userId: number
    code: string
    discountedAmount: number
    totalAmount: number
    Type: 0 | 1 // Type 0 = subscription, Type 1 = shop
  }) => Promise<SuccessResponse>
  validationLoading: boolean
  getDiscountedAmount: ({ couponId }: { couponId: number }) => Promise<SuccessResponse>
  userLinkedCoupons: UserLinkedCouponsResponseType[]
  getUserLinkedCoupon: ({ userId }: { userId: number }) => Promise<SuccessResponse>
}

export const useSubscription = create<SubscriptionStore>()(
  persist(
    (set) => ({
      loading: false,
      subscriptions: [],
      validationLoading: false,
      userLinkedCoupons: [],

      getSubscriptions: async () => {
        set({ loading: true })
        try {
          const response = await networkService.get({
            url: '/Subscriptions/users',
          })
          set({ subscriptions: response.data })
          set({ loading: false })
          return response.data
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ loading: false })
        }
      },

      createSubscription: async ({ razorPlanId, customerId }) => {
        set({ loading: true })
        try {
          const response = await networkService.post({
            url: '/Subscriptions',
            data: {
              plan_id: razorPlanId,
              // customer_id: customerId,
              total_count: 1,
              notes: [],
              quantity: 1,
              customer_notify: true,
              start_at: 0,
              expire_by: 0,
              addons: [],
            },
          })
          set({ loading: false })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ loading: false })
        }
      },

      addCouponToUser: async ({ userId, code, discountedAmount, totalAmount, Type }) => {
        set({ validationLoading: true })
        try {
          const response = await networkService.post({
            url: `/discount/add-coupon-to-user/${userId}/${code}/${discountedAmount}/${totalAmount}/${Type}`,
          })
          set({ validationLoading: false })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ validationLoading: false })
        }
      },

      validateCoupon: async ({ userId, couponCode }) => {
        set({ validationLoading: true })
        try {
          const response = await networkService.get({
            url: `/discount/validate-coupon/${userId}/${couponCode}`,
          })
          set({ validationLoading: false })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ validationLoading: false })
        }
      },

      getDiscountedAmount: async ({ couponId }) => {
        set({ validationLoading: true })
        try {
          const response = await networkService.get({
            url: `/discount/get-coupon-by-id/${couponId}`,
          })
          set({ validationLoading: false })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ validationLoading: false })
        }
      },

      getUserLinkedCoupon: async ({ userId }) => {
        set({ validationLoading: true })
        try {
          const response = await networkService.get({
            url: `/discount/get-coupon-by-user/${userId}`,
          })
          set({ userLinkedCoupons: response.returnObject })
          set({ validationLoading: false })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.response.data.message, type: 'error' })
          set({ validationLoading: false })
        }
      },
    }),

    {
      name: 'subscription-store',
      partialize: (state) => ({}),
    }
  )
)
