import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { persist } from 'zustand/middleware'
import { Card, SuccessResponse } from '@/utils/types'

type CardStore = {
  loading: boolean
  cardList: Card[]
  getCardList: (roleId: string) => Promise<SuccessResponse>
}

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      cardList: [],
      loading: false,

      getCardList: async (roleId: string): Promise<SuccessResponse> => {
        set({ loading: true })
        const response: SuccessResponse = await networkService.get({ url: `/shop/get-items-and-categories/${roleId}` })
        if (!response.isSuccess) {
          set({ loading: false })
          return response
        }
        set({ cardList: response.returnObject })
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
