import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { MilestoneResponseTypes, SuccessResponse } from '@/utils/types'
import { persist } from 'zustand/middleware'

type MilestoneStore = {
  milestones: MilestoneResponseTypes[]
  personalMilestones: MilestoneResponseTypes[]
  activeMilestone: MilestoneResponseTypes | null
  getMilestones: () => Promise<MilestoneResponseTypes[]>
  unlockMilestone: ({
    id,
    milestoneType,
    totalPoints,
  }: {
    id: number
    milestoneType: number
    totalPoints: number
  }) => Promise<SuccessResponse>
  getPersonalMilestones: (userId: number) => Promise<SuccessResponse>
}

export const useMilestoneStore = create<MilestoneStore>()(
  persist(
    (set) => ({
      milestones: [],
      activeMilestone: null,
      personalMilestones: [],

      getMilestones: async () => {
        const response: any = await networkService.get({ url: '/milestones' })
        // sort milestones by id in ascending order
        const milestones = response?.sort((a: MilestoneResponseTypes, b: MilestoneResponseTypes) => a.id - b.id)
        set({
          milestones: milestones,
          activeMilestone: milestones.find((milestone: MilestoneResponseTypes) => milestone.isUnLocked === false),
        })
        return milestones
      },

      unlockMilestone: async ({ id, milestoneType, totalPoints }) => {
        const response = await networkService.get({ url: `/milestones/unlock-milestone-new/${id}/${milestoneType}/${totalPoints}` })
        return response
      },

      getPersonalMilestones: async (userId) => {
        const response: SuccessResponse = await networkService.get({ url: `/milestones/get-user-personal-milestones?userId=${userId}` })
        // const sortedMilestones = response.returnObject.sort((a: MilestoneResponseTypes, b: MilestoneResponseTypes) => a.id - b.id)
        // sort milestones by order in ascending order
        const sortedMilestones = response.returnObject.sort((a: MilestoneResponseTypes, b: MilestoneResponseTypes) => a.orders - b.orders)
        set({ personalMilestones: sortedMilestones })
        return response
      },
    }),
    {
      name: 'milestone-store',
      partialize: (state) => ({ activeMilestone: state.activeMilestone }),
    }
  )
)
