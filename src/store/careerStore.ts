import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { CareerResponseTypes, QuizResponseTypes, QuizTypes, SuccessResponse } from '@/utils/types'
import { useErrorStore } from './errorStore'
import { CareerSteps } from '@/utils/enum'
import { persist } from 'zustand/middleware'

type CareerStore = {
  careerStep: CareerSteps
  setCareerStep: (step: number) => void
  career: CareerResponseTypes[]
  loading: boolean
  getCareer: () => void
  saveCareer: ({ userId, careerId }: { userId: number; careerId: number }) => Promise<any>
  careerDetail: CareerResponseTypes
  setCareerDetail: (career: CareerResponseTypes) => void
  quizzes: QuizResponseTypes
  takeQuiz: ({ career, gameType }: { career: string; gameType: string }) => Promise<SuccessResponse>
  selectedAnswers: string[]
  setSelectedAnswers: (answers: string[]) => void
  submitQuiz: ({
    userId,
    careerId,
    isFlowCompleted,
  }: {
    userId: number
    careerId: number
    isFlowCompleted: boolean
  }) => Promise<SuccessResponse>
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set) => ({
      careerStep: CareerSteps.Welcome,
      career: [],
      quizzes: {} as QuizResponseTypes,
      loading: false,
      careerDetail: {
        id: 0,
        name: '',
        value: '',
      },
      selectedAnswers: [],

      setCareerStep: (step) => {
        set({ careerStep: step })
      },
      getCareer: async () => {
        set({ loading: true })
        const response = await networkService.get({ url: '/career/get-career-dropdown' })
        if (!response.isSuccess) {
          set({ loading: false })
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          return
        }
        set({ career: response.returnObject })
        set({ loading: false })
        return response
      },
      saveCareer: async ({ userId, careerId }) => {
        set({ loading: true })
        const response = await networkService.post({ url: `/career/save-user-to-career?userId=${userId}&careerId=${careerId}` })
        if (!response.isSuccess) {
          set({ loading: false })
          return response
        }
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: response.message, type: 'success' })
        return response
      },
      setCareerDetail: (career) => {
        set({ careerDetail: career })
      },
      takeQuiz: async ({ career, gameType }) => {
        set({ loading: true })
        const response = await networkService.post({ url: `/External/get-challenges-from-chatgpt?career=${career}&gameType=${gameType}` })
        if (!response.isSuccess) {
          set({ loading: false })
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          return
        }
        set({ quizzes: response.returnObject })
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: response.message, type: 'success' })
        return response
      },
      submitQuiz: async ({ userId, careerId, isFlowCompleted }) => {
        set({ loading: true })
        const response = await networkService.post({
          url: `/career/update-user-career-flow?userId=${userId}&careerId=${careerId}&isFlowCompleted=${isFlowCompleted}`,
        })
        if (!response.isSuccess) {
          set({ loading: false })
          useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
          return
        }
        set({ loading: false })
        useErrorStore.getState().setAlert({ message: response.message, type: 'success' })
        return response
      },
      setSelectedAnswers: (answers) => {
        set({ selectedAnswers: answers })
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({ quizzes: state.quizzes, selectedAnswers: state.selectedAnswers }),
    }
  )
)
