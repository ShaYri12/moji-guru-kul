import { networkService } from '@/network/NetworkService'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'
import { StreakTypes, SuccessResponse, UserTypes } from '@/utils/types'
import { RolesEnum } from '@/utils/enum'
import { deleteCookies, setCookie } from '@/app/actions'

type AuthStore = {
  user: UserTypes | null
  loading: boolean
  token: string
  handleLogin: ({ email, password }: { email: string; password: string }) => Promise<SuccessResponse>
  googleLogin: (idToken: string) => void
  handleLogout: () => void
  resetPasswordLink: ({ email, phoneNumber }: { email: string; phoneNumber: string }) => void
  getStreak: (userId: number) => Promise<SuccessResponse>
  addStreak: ({ id, userId, points }: { id: number; userId: number; points: number }) => Promise<SuccessResponse>
  streakList: StreakTypes[]
  resetPassword: ({
    password,
    confirmPassword,
    email,
    token,
  }: {
    password: string
    email: string
    confirmPassword: string
    token: string
  }) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: '',
      loading: false,
      streakList: [],

      handleLogin: async ({ email, password }) => {
        set({ loading: true })

        const response = await networkService.post({ url: '/auth/login', data: { email, password } })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return
        }
        const pathname = window.location.pathname
        if (
          response.isSuccess &&
          response.returnObject?.role?.toLowerCase() !== RolesEnum.Ambassador &&
          pathname.startsWith('/ambassador')
        ) {
          set({ loading: false })
          return response
        }
        if (
          response.isSuccess &&
          response.returnObject?.role?.toLowerCase() === RolesEnum.Ambassador &&
          !pathname.startsWith('/ambassador')
        ) {
          useErrorStore.getState().setAlert({ message: 'You are not an student/parent/tutor', type: 'error' })
          set({ loading: false })
          window.location.href = '/ambassador/login'
          return
        }
        networkService.setAccessToken(response.returnObject.token.value)
        set({ user: response.returnObject, token: response.returnObject.token.value })
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: 'You have successfully logged in', type: 'success' })
        return response
      },
      googleLogin: async (idToken) => {
        set({ loading: true })
        const response = await networkService.post({ url: '/signin-google', data: { token: idToken } })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return
        }
        set({ user: response.returnObject, token: response.returnObject.token.value })
        set({ loading: false })
        // document.cookie = `token=${response.returnObject.token.value}`
        // document.cookie = `userRole=${response?.returnObject?.role?.toLowerCase()}`
        // document.cookie = `userId=${response.returnObject.id}
        await setCookie('token', response.returnObject.token.value)
        await setCookie('userRole', response?.returnObject?.role?.toLowerCase())
        await setCookie('userId', response.returnObject.id)
        useErrorStore.getState().setAlert({ message: 'You have successfully logged in', type: 'success' })
        return response
      },
      //  get reset password link
      resetPasswordLink: async ({ email, phoneNumber }) => {
        set({ loading: true })
        const response = await networkService.post({ url: '/auth/reset-link', data: { email, phoneNumber } })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: 'Reset link sent to your email and phone number', type: 'success' })
        return response
      },
      handleLogout: async () => {
        set({ user: null, token: '' })
      },
      getStreak: async (userId) => {
        const response: SuccessResponse = await networkService.post({ url: `/auth/get-streak/${userId}` })
        set({ streakList: response.returnObject })
        return response
      },
      addStreak: async ({ id, userId, points }) => {
        const response: SuccessResponse = await networkService.post({
          url: '/auth/add-user-streak',
          data: { id, userId, points },
        })
        return response
      },

      // reset password
      resetPassword: async ({ password, confirmPassword, email, token }) => {
        set({ loading: true })
        const response = await networkService.post({ url: '/auth/reset-password', data: { password, confirmPassword, email, token } })
        if (!response.isSuccess) {
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: 'Password reset successfully', type: 'success' })
        return response
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)
