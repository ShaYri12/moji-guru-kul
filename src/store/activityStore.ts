import { networkService } from '@/network/NetworkService'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'
import {
  ActivityDetailResponseTypes,
  GameflowActivitiesTypes,
  LearningActivityTypes,
  SuccessResponse,
  TutorsForStudentTypes,
} from '@/utils/types'

type ActivityStore = {
  loading: boolean
  activeActivity: TutorsForStudentTypes
  activities: LearningActivityTypes[]
  activityDetails: ActivityDetailResponseTypes
  gameflowActivityDetails: GameflowActivitiesTypes
  activitiesByGameflow: LearningActivityTypes[]

  filteredActivities: LearningActivityTypes[]
  filteredGameflowActivities: LearningActivityTypes[]

  setActiveActivity: (tutor: TutorsForStudentTypes) => void
  setFilteredActivities: (activities: LearningActivityTypes[]) => void
  getActivities: ({ assignedToId, assignedById }: { assignedToId: number; assignedById: number }) => void
  setFilteredActivitiesByGameflow: (activities: LearningActivityTypes[]) => void
  getActivityDetails: ({
    activityTypeId,
    activityId,
    gameflowGameId,
  }: {
    activityTypeId: number
    activityId: number
    gameflowGameId: number
  }) => Promise<ActivityDetailResponseTypes>
  getActivityDetailsByGameflow: ({
    activityTypeId,
    activityId,
    gameflowGameId,
  }: {
    activityTypeId: number
    activityId: number
    gameflowGameId: number
  }) => Promise<GameflowActivitiesTypes>
  getActivitiesByGroup: ({ assignedToId, assignedById }: { assignedToId: number; assignedById: number }) => void
}

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      activities: [],
      activityDetails: {} as ActivityDetailResponseTypes,
      gameflowActivityDetails: {} as GameflowActivitiesTypes,
      activeActivity: {} as TutorsForStudentTypes,
      activitiesByGameflow: [],
      filteredActivities: [],
      filteredGameflowActivities: [],
      loading: false,

      setActiveActivity: (tutor: TutorsForStudentTypes) => {
        set({ activeActivity: tutor })
      },
      setFilteredActivities: (activities: LearningActivityTypes[]) => {
        set({ filteredActivities: activities })
      },
      setFilteredActivitiesByGameflow: (gameFlowActivities: LearningActivityTypes[]) => {
        set({ filteredGameflowActivities: gameFlowActivities })
      },

      // Call this function to get activities
      getActivities: async ({ assignedToId, assignedById }) => {
        try {
          set({ loading: true })
          const response = await networkService.get({ url: `/activities?assignedToId=${assignedToId}&assignedById=${assignedById}` })
          if (!response) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            return
          }
          // filter response if activity has 7 or 8 id then remove it
          const filteredActivities = response.filter(
            (activity: LearningActivityTypes) =>
              activity.activityTypeId !== 7 && activity.activityTypeId !== 8 && activity.activityTypeId !== 3
          )
          // filter where activityTypeId is 3
          const filteredGameflowActivities = response.filter((activity: LearningActivityTypes) => activity.activityTypeId === 3)
          // set({ activities: filteredActivities, activitiesByGameflow: filteredGameflowActivities })
          set({
            activities: filteredActivities,
            activitiesByGameflow: filteredGameflowActivities,
            filteredActivities: filteredActivities,
            filteredGameflowActivities: filteredGameflowActivities,
          })
          return [...filteredActivities, ...filteredGameflowActivities]
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },

      // Call this function to get activity details
      getActivityDetails: async ({ activityTypeId, activityId, gameflowGameId }) => {
        try {
          set({ loading: true })
          const response = await networkService.get({ url: `/activities/${activityTypeId}/${activityId}/${gameflowGameId}` })
          if (!response) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            return
          }
          set({ activityDetails: response })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },

      getActivityDetailsByGameflow: async ({ activityTypeId, activityId, gameflowGameId }) => {
        try {
          set({ loading: true })
          const response = await networkService.get({ url: `/activities/${activityTypeId}/${activityId}/${gameflowGameId}` })
          if (!response) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            return
          }
          set({ activityDetails: response })
          return response
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },

      getActivitiesByGroup: async ({ assignedToId, assignedById }) => {
        try {
          set({ loading: true })
          const response = await networkService.get({
            url: `/activities/get-group-activities-notifications?assignedToId=${assignedToId}&assignedBy=${assignedById}`,
          })
          if (!response) {
            useErrorStore.getState().setAlert({ message: response.message, type: 'error' })
            return
          }
          const filteredActivities = response.filter(
            (activity: LearningActivityTypes) =>
              activity.activityTypeId !== 7 && activity.activityTypeId !== 8 && activity.activityTypeId !== 3
          )
          const filteredGameflowActivities = response.filter((activity: LearningActivityTypes) => activity.activityTypeId === 3)
          // set({ activities: filteredActivities, activitiesByGameflow: filteredGameflowActivities })
          set({
            activities: filteredActivities,
            activitiesByGameflow: filteredGameflowActivities,
            filteredActivities: filteredActivities,
            filteredGameflowActivities: filteredGameflowActivities,
          })
          return [...filteredActivities, ...filteredGameflowActivities]
        } catch (error: any) {
          useErrorStore.getState().setAlert({ message: error.message, type: 'error' })
          set({ loading: false })
        }
      },
    }),
    {
      name: 'activity-storage',
      partialize: (state) => ({}),
    }
  )
)
