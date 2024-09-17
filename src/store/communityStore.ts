import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { persist } from 'zustand/middleware'
import { CommunityCategory, SuccessResponse } from '@/utils/types'

type CommunityStore = {
  loading: boolean
  communityList: CommunityCategory[]
  getCommunityList: () => Promise<SuccessResponse>
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set) => ({
      communityList: [],
      loading: false,

      getCommunityList: async (): Promise<SuccessResponse> => {
        set({ loading: true })
        const response: SuccessResponse = await networkService.get({ url: '/CommunityForum/get-community-category' })
        if (!response.isSuccess) {
          set({ loading: false })
          return response
        }
        set({ communityList: response.returnObject })
        set({ loading: false })
        return response
      },
    }),
    {
      name: 'community-storage',
      partialize: (state) => ({}),
    }
  )
)
