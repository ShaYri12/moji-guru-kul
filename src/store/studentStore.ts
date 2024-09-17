import { networkService } from '@/network/NetworkService'
import { RegisterStudentTypes, SuccessResponse, SyllabusTypes } from '@/utils/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'

type StudentStore = {
  student: RegisterStudentTypes
  syllabuses: SyllabusTypes[]
  setStudent: (student: RegisterStudentTypes) => void
  sendEmailOtp: (email: string) => void
  sendPhoneOtp: (phone: string) => void
  registerStudent: (student: RegisterStudentTypes) => Promise<SuccessResponse>
  getSyllabuses: () => void
  loading: boolean
}

const initialStudentState: RegisterStudentTypes = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  genderId: 0,
  yearsOfBirth: 14,
  inviteToken: '',
  countryId: 0,
  stateId: 0, // only for frontend, not in the backend
  cityId: 0,
  gradeId: 1,
  grade: 0,
  syllabusId: 0,
  emailOTP: '',
  emailOTPId: 0,
  phoneOTP: '',
  phoneOTPId: 0,
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      student: initialStudentState,
      syllabuses: [],
      setStudent: (student) => set({ student }),
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
        if (response.returnObject) {
          set({
            student: {
              ...useStudentStore.getState().student,
              emailOTPId: response.returnObject.userId,
            },
          })
          useErrorStore
            .getState()
            .setAlert({ message: 'OTP sent successfully to your email. Please check your email for the OTP.', type: 'success' })
          set({ loading: false })
        }
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

        if (response.returnObject) {
          set({
            student: {
              ...useStudentStore.getState().student,
              phoneOTPId: response.returnObject.userId,
            },
          })
          useErrorStore
            .getState()
            .setAlert({ message: 'OTP sent successfully to your phone number. Please check your phone for the OTP.', type: 'success' })
          set({ loading: false })
        }
        set({ loading: false })
        return response
      },

      // This function registers the student
      registerStudent: async (student) => {
        set({ loading: true })
        let data = { ...student }
        delete data.stateId
        const response = await networkService.post({
          url: '/register/studentRegister',
          data: data,
        })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }
        set({ student: { ...initialStudentState, phoneNumber: `91${student.phoneNumber}` } })
        set({ loading: false })
        return response
      },

      // This function get the syllabuses
      getSyllabuses: async () => {
        const response: any = await networkService.get({ url: '/syllabuses' })
        if (!response) return useErrorStore.getState().setAlert({ message: 'Error in fetching syllabuses', type: 'error' })
        set({ syllabuses: response })
        return response
      },
    }),
    {
      name: 'student-store',
      partialize: (state) => ({ student: state.student }),
    }
  )
)
