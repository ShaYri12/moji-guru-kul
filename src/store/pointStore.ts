import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { networkService } from '@/network/NetworkService'

type PointStore = {
  points: number
  getPoints: () => Promise<number>
}

export const usePointStore = create<PointStore>()((set) => ({
  points: 0,

  getPoints: async () => {
    const response: any = await networkService.get({ url: '/points' })
    set({ points: response.totalPointsForLoggedInUser })
    return response.totalPointsForLoggedInUser
  },
}))
