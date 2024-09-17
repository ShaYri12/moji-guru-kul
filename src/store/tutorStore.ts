import { networkService } from '@/network/NetworkService'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'
import { FileTypes, TutorBodyParams, UserLanguagesTypes } from '@/utils/types'

type TutorStore = {
  tutor: TutorBodyParams
  setTutor: (tutor: TutorBodyParams) => void
  registerTutor: (tutor: TutorBodyParams) => void
  loading: boolean
  errorMessages: string
  setErrorMessages: (errorMessages: string) => void
  highestEducationalDocument: Partial<FileTypes>
  teachingExperienceCertificate: Partial<FileTypes>
  setHighestEducationalDocument: (highestEducationalDocument: Partial<FileTypes>) => void
  setTeachingExperienceCertificate: (teachingExperienceCertificate: Partial<FileTypes>) => void
  userFirstLanguage: UserLanguagesTypes
  setUserFirstLanguage: (userFirstLanguage: UserLanguagesTypes) => void
  userSecondLanguage: UserLanguagesTypes
  setUserSecondLanguage: (userSecondLanguage: UserLanguagesTypes) => void
  userThirdLanguage: UserLanguagesTypes
  setUserThirdLanguage: (userThirdLanguage: UserLanguagesTypes) => void
}

const initialTutorState: TutorBodyParams = {
  educatorId: 0,
  userLanguages: [
    {
      languageId: 0,
      languageLevel: 0,
    },
  ],
  userQuestionsAnswers: [
    {
      question: '',
      answer: '',
    },
  ],
  agencyId: 0,
  isCoach: true,
  agreeWithTutorPolicy: true,
  inviteToken: '',
  linkedInURL: '',
  criminalCertificateURL: '',
  highestEducationalDocumentURL: '',
  teachingExperienceCertificate: '',
  tutorSubjects: [
    {
      tutorId: 0,
      subjectId: 0,
    },
  ],
}

export const useTutorStore = create<TutorStore>()(
  persist(
    (set) => ({
      tutor: initialTutorState,
      loading: false,
      errorMessages: '',
      highestEducationalDocument: {} as FileTypes,
      teachingExperienceCertificate: {} as FileTypes,

      userFirstLanguage: {
        languageId: 0,
        languageLevel: 0,
      },
      userSecondLanguage: {
        languageId: 0,
        languageLevel: 0,
      },
      userThirdLanguage: {
        languageId: 0,
        languageLevel: 0,
      },

      setTutor: (tutor) => set({ tutor }),
      setErrorMessages: (errorMessages) => set({ errorMessages }),
      setHighestEducationalDocument: (highestEducationalDocument) => set({ highestEducationalDocument }),
      setTeachingExperienceCertificate: (teachingExperienceCertificate) => set({ teachingExperienceCertificate }),
      setUserFirstLanguage: (userFirstLanguage) => set({ userFirstLanguage }),
      setUserSecondLanguage: (userSecondLanguage) => set({ userSecondLanguage }),
      setUserThirdLanguage: (userThirdLanguage) => set({ userThirdLanguage }),

      // register tutor
      registerTutor: async (tutor) => {
        try {
          set({ loading: true })
          const response = await networkService.post({ url: '/register/tutor', data: tutor })
          if (!response.isSuccess) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            set({ loading: false })
            return
          }
          useErrorStore.getState().setAlert({ message: 'Your account successfully created', type: 'success' })
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.message || 'Something went wrong', type: 'error' })
        } finally {
          set({ loading: false })
          set({ tutor: initialTutorState })
          set({ highestEducationalDocument: {} as FileTypes })
          set({ teachingExperienceCertificate: {} as FileTypes })
          set({ userFirstLanguage: { languageId: 0, languageLevel: 0 } })
          set({ userSecondLanguage: { languageId: 0, languageLevel: 0 } })
          set({ userThirdLanguage: { languageId: 0, languageLevel: 0 } })
        }
      },
    }),
    {
      name: 'tutor-store',
      partialize: (state) => ({
        tutor: state.tutor,
        userFirstLanguage: state.userFirstLanguage,
        userSecondLanguage: state.userSecondLanguage,
        userThirdLanguage: state.userThirdLanguage,
      }),
    }
  )
)
