import { networkService } from '@/network/NetworkService'
import { useErrorStore } from './errorStore'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AmbassadorRegistrationPayload, CouponResponseType, CouponStatsResponseType, SuccessResponse } from '@/utils/types'

type AmbassadorStore = {
  loading: boolean
  selectedCoupon: CouponResponseType | undefined
  setSelectedCoupon: (coupon: CouponResponseType) => void
  coupons: CouponResponseType[]
  getCoupons: (userId: number) => Promise<SuccessResponse>
  createAmbassador: (payload: AmbassadorRegistrationPayload) => Promise<SuccessResponse>
  couponStats: CouponStatsResponseType
  getCouponStats: ({ userId, couponCode }: { userId: number; couponCode: string }) => Promise<SuccessResponse>
}

export const useAmbassadorStore = create<AmbassadorStore>()(
  persist(
    (set) => ({
      loading: false,
      coupons: [],
      selectedCoupon: undefined,
      couponStats: {} as CouponStatsResponseType,

      setSelectedCoupon: (coupon) => {
        set({ selectedCoupon: coupon })
      },

      getCoupons: async (userId) => {
        try {
          debugger
          set({ loading: true })
          const response = await networkService.get({ url: `/discount/get-coupon-by-user/${userId}` })
          if (!response.isSuccess) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            set({ loading: false })
            return
          }
          set({ coupons: response.returnObject })
          set({ loading: false })
          return response
        } catch (error: any) {
          console.log('error---!!', error)
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },

      getCouponStats: async ({ userId, couponCode }) => {
        try {
          set({ loading: true })
          const response = await networkService.get({ url: `/discount/get-ambassador-coupon-stats/${userId}/${couponCode}` })
          if (!response.isSuccess) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            set({ loading: false })
            return
          }
          set({ couponStats: response.returnObject })
          set({ loading: false })
          return response
        } catch (error: any) {
          console.log('error---!!', error)
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },

      createAmbassador: async (payload) => {
        try {
          set({ loading: true })
          const response = await networkService.post({ url: '/register/ambassador', data: payload })
          if (!response.isSuccess) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            set({ loading: false })
            return
          }
          set({ loading: false })
          useErrorStore.getState().setAlert({ message: 'You have successfully registered', type: 'success' })
          return response
        } catch (error: any) {
          console.log('error---!!', error)
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },
    }),
    {
      name: 'ambassador-store',
      partialize: (state) => ({
        selectedCoupon: state.selectedCoupon,
      }),
    }
  )
)
