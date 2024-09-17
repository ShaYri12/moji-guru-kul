import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { networkService } from '@/network/NetworkService'
import { LanguageResponseTypes } from '@/utils/types'

type LanguageStore = {
  languages: LanguageResponseTypes[]
  getLanguages: () => Promise<LanguageResponseTypes[]>
}

export const useProfileStore = create<LanguageStore>()(
  persist(
    (set) => ({
      languages: [],
      getLanguages: async () => {
        try {
          const response = await networkService.get({
            url: '/profile/languages-list',
          })
          set({ languages: response })
          return response.data
        } catch (error: any) {
          console.error(error)
          return []
        }
      },
    }),
    {
      name: 'languageStore',
      partialize: (state) => ({}),
    }
  )
)
