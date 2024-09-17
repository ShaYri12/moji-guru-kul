import { networkService } from '@/network/NetworkService'
import { ConnectedChildrenTypes, ParentTypes, SearchStudentTypes, SuccessResponse, VerifiedChildEmail } from '@/utils/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'

type ParentStore = {
  parent: ParentTypes
  setParent: (parent: ParentTypes) => void
  sendEmailOtp: (email: string) => Promise<SuccessResponse>
  sendPhoneOtp: (phone: string) => Promise<SuccessResponse>
  registerParent: (parent: ParentTypes) => Promise<SuccessResponse>
  loading: boolean
  verifiedChildEmails: VerifiedChildEmail[]
  verifyChild: (emails: string[]) => Promise<{ response: VerifiedChildEmail[]; filteredUnverifiedEmails: string[] }>
  invalidChildEmails: string[]
  updateChildEmail: (email: string) => void
  connectedChildrenList: ConnectedChildrenTypes[]
  getConnectedChildren: () => Promise<ConnectedChildrenTypes[]>
  searchStudentList: SearchStudentTypes[]
  setSearchStudentList: (students: SearchStudentTypes[]) => void
  searchStudents: (param: string) => Promise<SearchStudentTypes[]>
  addChildToParent: (studentIds: Array<number>) => void
}

const initialParentState: ParentTypes = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  genderId: 0,
  yearsOfBirth: 30,
  // inviteToken: '',
  childEmails: [],
  emailOTP: '',
  emailOTPId: 0,
  phoneOTP: '',
  phoneOTPId: 0,
}

export const useParentStore = create<ParentStore>()(
  persist(
    (set) => ({
      loading: false,
      parent: initialParentState,
      verifiedChildEmails: [],
      invalidChildEmails: [],
      setParent: (parent) => set({ parent }),
      connectedChildrenList: [],
      searchStudentList: [],

      setSearchStudentList: (students) => set({ searchStudentList: students }),

      // This function sends an OTP to the user's email
      sendEmailOtp: async (email) => {
        set({ loading: true })
        const response: SuccessResponse = await networkService.post({ url: `/auth/send-email-otp?email=${email}` })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }

        set({
          parent: {
            ...useParentStore.getState().parent,
            emailOTPId: response.returnObject.userId,
          },
        }),
          useErrorStore
            .getState()
            .setAlert({ message: 'OTP sent successfully to your email. Please check your email for the OTP.', type: 'success' })
        set({ loading: false })
        return response
      },

      // This function sends an OTP to the user's phone
      sendPhoneOtp: async (phone) => {
        set({ loading: true })
        const response: SuccessResponse = await networkService.post({ url: `/auth/send-phone-otp?phonenumber=${`91${phone}`}` })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }
        set({
          parent: {
            ...useParentStore.getState().parent,
            phoneOTPId: response.returnObject.userId,
          },
        }),
          useErrorStore
            .getState()
            .setAlert({ message: 'OTP sent successfully to your phone number. Please check your phone for the OTP.', type: 'success' })
        set({ loading: false })
        return response
      },

      // This function registers the parent
      registerParent: async (parent) => {
        set({ loading: true })
        const response: SuccessResponse = await networkService.post({
          url: '/register/parent-new',
          data: parent,
        })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return response
        }
        set({ parent: { ...initialParentState, phoneNumber: `91${initialParentState.phoneNumber}` } })
        set({ loading: false })
        return response
      },

      // verify child
      verifyChild: async (emails) => {
        set({ loading: true })
        const response = await networkService.post({
          url: '/users/child-email',
          data: { childEmail: emails },
        })
        if (!response.length) {
          useErrorStore
            .getState()
            .setAlert({ message: 'No child found with the provided email. Please check the email and try again.', type: 'error' })
          set({ loading: false })
          return response
        }
        // filter emails that are not verified with response and parent.childEmails
        const filteredUnverifiedEmails: string[] = useParentStore
          .getState()
          .parent.childEmails.filter(
            (email) =>
              !response.some((verifiedEmail: VerifiedChildEmail) => verifiedEmail.email.toLocaleLowerCase() === email.toLocaleLowerCase())
          )
        set({ verifiedChildEmails: response, invalidChildEmails: filteredUnverifiedEmails, loading: false })
        return { response, filteredUnverifiedEmails }
      },

      // update child email
      updateChildEmail: (email) => {
        const updatedEmails = useParentStore.getState().parent.childEmails.filter((childEmail) => childEmail !== email)
        set({ parent: { ...useParentStore.getState().parent, childEmails: updatedEmails } })
        set({ invalidChildEmails: useParentStore.getState().invalidChildEmails.filter((childEmail) => childEmail !== email) })
      },

      // get children for parent
      getConnectedChildren: async () => {
        set({ loading: true })
        const response = await networkService.get({ url: '/educators/parent-students' })
        if (!response) {
          useErrorStore.getState().setAlert({ message: 'No children found', type: 'error' })
          set({ loading: false })
          return
        }
        set({ connectedChildrenList: response })
        set({ loading: false })
        return response
      },
      // find student if exists in the database
      searchStudents: async (param) => {
        set({ loading: true })
        const response = await networkService.get({ url: `/educators/search-students-by-name-email/${param}` })
        if (!response || !response.length) {
          useErrorStore.getState().setAlert({ message: 'No student found', type: 'error' })
          set({ loading: false })
          return
        }
        set({ searchStudentList: response })
        set({ loading: false })
        return response
      },
      // add new child to parent
      addChildToParent: async (studentIds) => {
        set({ loading: true })
        const response = await networkService.post({ url: '/parents/add-child-to-parent', data: studentIds })
        if (!response) {
          useErrorStore.getState().setAlert({ message: 'Failed to add child', type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        return response
      },
    }),
    {
      name: 'parent-store',
      partialize: (state) => ({ parent: state.parent }),
    }
  )
)
