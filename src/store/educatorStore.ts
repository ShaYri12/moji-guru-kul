import { networkService } from '@/network/NetworkService'
import { ActivityResponseTypes, EducatorTypes, StudentsAndGroupsResponseTypes, SuccessResponse } from '@/utils/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'

type EducatorStore = {
  educator: EducatorTypes
  setEducator: (educator: EducatorTypes) => void
  sendEmailOtp: (email: string) => Promise<SuccessResponse>
  sendPhoneOtp: (phone: string) => Promise<SuccessResponse>
  registerEducator: (educator: EducatorTypes) => void
  loading: boolean
}

const initialEducatorState: EducatorTypes = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  genderId: 0,
  yearsOfBirth: 0,
  inviteToken: '',
  countryId: 0,
  cityId: 0,
  workExperience: 2,
  agreeWithEducatorPolicy: false,
  emailOTP: '',
  emailOTPId: 0,
  phoneOTP: '',
  phoneOTPId: 0,
}

export const useEducatorStore = create<EducatorStore>()(
  persist(
    (set) => ({
      educator: initialEducatorState,
      setEducator: (educator) => set({ educator }),
      loading: false,

      // This function sends an OTP to the user's email
      sendEmailOtp: async (email) => {
        set({ loading: true })
        const response = await networkService.post({ url: `/auth/send-email-otp?email=${email}` })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }
        set({
          educator: {
            ...useEducatorStore.getState().educator,
            emailOTPId: response.returnObject.userId,
          },
        })
        useErrorStore
          .getState()
          .setAlert({ message: 'OTP sent successfully to your email. Please check your email for the OTP.', type: 'success' })
        set({ loading: false })
        return response
      },

      // This function sends an OTP to the user's phone
      sendPhoneOtp: async (phone) => {
        set({ loading: true })
        const response = await networkService.post({ url: `/auth/send-phone-otp?phonenumber=${`91${phone}`}` })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }
        set({
          educator: {
            ...useEducatorStore.getState().educator,
            phoneOTPId: response.returnObject.userId,
          },
        })
        useErrorStore
          .getState()
          .setAlert({ message: 'OTP sent successfully to your phone number. Please check your phone for the OTP.', type: 'success' })
        set({ loading: false })
        return response
      },

      // This function registers the educator
      registerEducator: async (educator) => {
        const response = await networkService.post({
          url: '/register/educator',
          data: educator,
        })
        if (response.returnObject) {
          set({ educator: { ...initialEducatorState, phoneNumber: `91${initialEducatorState.phoneNumber}` } })
        }
      },
    }),
    {
      name: 'educator-store',
      partialize: (state) => ({ educator: state.educator }),
    }
  )
)
