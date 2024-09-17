import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { networkService } from '@/network/NetworkService'
import { ParentGameResponseTypes, SuccessResponse } from '@/utils/types'

type ParentGameStore = {
  parentGames: ParentGameResponseTypes
  getParentGames: () => Promise<SuccessResponse>
}

export const useParentGameStore = create<ParentGameStore>()(
  persist(
    (set) => ({
      parentGames: {} as ParentGameResponseTypes,

      getParentGames: async () => {
        const response = await networkService.get({ url: '/games/get-all-parent-game' })
        set({ parentGames: response.returnObject })
        return response
      },
    }),
    {
      name: 'parent-game-store',
      partialize: (state) => ({}),
    }
  )
)
