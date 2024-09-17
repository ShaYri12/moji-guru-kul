import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { networkService } from '@/network/NetworkService'
import {
  GameFlowDetailsTypes,
  GameRewards,
  GamesByUserTypes,
  GamesResponseTypes,
  MiniGameParams,
  MinigamesGameFlowsTypes,
  MiniGameTypes,
  SubjectResponseTypes,
  SuccessResponse,
  TopicsResponseTypes,
  UnlockGameFlowBodyParams,
} from '@/utils/types'
import { ChooseLevelEnum } from '@/utils/enum'

type GameStore = {
  allSubjects: SubjectResponseTypes[]
  selectedSubject: SubjectResponseTypes | null
  selectedTopic: TopicsResponseTypes | null
  miniGames: MinigamesGameFlowsTypes
  gameCreator: { id: number; name: string }
  gameRewards: GameRewards[]
  setGameCreator: (creator: { id: number; name: string }) => void
  setSelectedTopic: (topic: TopicsResponseTypes | null) => void
  setSelectedSubject: (subject: SubjectResponseTypes | null) => void
  getAllSubjects: (syllabusId: number, isbasic: boolean) => Promise<SubjectResponseTypes[]>
  getMiniGames: ({ categoryId, level, topicId, userRole }: MiniGameParams) => Promise<MinigamesGameFlowsTypes>
  unlockTopic: ({
    categoryId,
    topicId,
    studentId,
    level,
    userRole,
  }: {
    categoryId: number
    topicId: number
    studentId: number
    level: number
    userRole: number
  }) => Promise<SuccessResponse>
  getGameRewards: () => Promise<GameRewards[]>
  completeTopic: ({
    studentId,
    topicId,
    isCompleted,
  }: {
    studentId: number
    topicId: number
    isCompleted: boolean
  }) => Promise<SuccessResponse>
  isBasic: boolean
  setIsBasic: (isBasic: boolean) => void
  isScienceSubjectCompleted: boolean
  games: GamesResponseTypes
  getGames: ({ categoryId, topicId }: { categoryId: number; topicId: number }) => Promise<SuccessResponse>
  level: ChooseLevelEnum
  setLevel: (level: ChooseLevelEnum) => void
  isHardLevelUnlocked: boolean
  setIsHardLevelUnlocked: (isHardLevelUnlocked: boolean) => void
  unlockGame: ({ gameId, topicId, categoryId }: { gameId: number; topicId: number; categoryId: number }) => Promise<SuccessResponse>
  isTestMode: boolean
  setIsTestMode: (isTestMode: boolean) => void
  unlockGameFlow: (body: UnlockGameFlowBodyParams) => void
  getGameFlowById: (gameFlowId: number) => Promise<GameFlowDetailsTypes>
  search: string
  setSearch: (search: string) => void
  filteredMiniGames: MiniGameTypes[]
  setFilteredMiniGames: (games: MiniGameTypes[]) => void
  filteredGameFlows: MiniGameTypes[]
  setFilteredGameFlows: (games: MiniGameTypes[]) => void
  // filterAllSubjects: SubjectResponseTypes[]
  // setFilterAllSubjects: (subjects: SubjectResponseTypes[]) => void
  refetchGames: number
  setRefetchGames: (refetchGames: number) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      allSubjects: [],
      selectedSubject: null,
      selectedTopic: null,
      miniGames: {} as MinigamesGameFlowsTypes,
      gameCreator: { id: 1, name: 'Admin' },
      gameRewards: [],
      isBasic: true,
      isScienceSubjectCompleted: false,
      games: {} as GamesResponseTypes,
      level: ChooseLevelEnum.Easy,
      isHardLevelUnlocked: false,
      isTestMode: false,
      search: '',
      filteredMiniGames: [],
      filteredGameFlows: [],
      // filterAllSubjects: [],
      refetchGames: 0,

      setFilteredMiniGames: (games: MiniGameTypes[]) => {
        set({ filteredMiniGames: games })
      },
      setFilteredGameFlows: (games: MiniGameTypes[]) => {
        set({ filteredGameFlows: games })
      },

      setSearch: (search: string) => {
        set({ search })
      },

      setIsTestMode: (isTestMode: boolean) => {
        set({ isTestMode })
      },

      setSelectedSubject: (subject: SubjectResponseTypes | null) => {
        set({ selectedSubject: subject })
      },

      setSelectedTopic: (topic: TopicsResponseTypes | null) => {
        set({ selectedTopic: topic })
      },

      setIsBasic: (isBasic: boolean) => {
        set({ isBasic })
      },

      setLevel: (level: ChooseLevelEnum) => {
        set({ level })
      },

      setIsHardLevelUnlocked: (isHardLevelUnlocked: boolean) => {
        set({ isHardLevelUnlocked: isHardLevelUnlocked })
      },

      // setFilterAllSubjects: (subjects: SubjectResponseTypes[]) => {
      //   set({ filterAllSubjects: subjects })
      // },

      setRefetchGames: (refetchGames: number) => {
        set({ refetchGames })
      },

      //! API Calls
      getAllSubjects: async (syllabusId: number, isbasic: boolean) => {
        const response: any = await networkService.get({ url: `/student-categories/${syllabusId}?isbasic=${isbasic}` })
        let filteredResponse = response.map((subject: SubjectResponseTypes) => {
          const topics = subject.topics.filter((topic: TopicsResponseTypes) => topic.topicIsActive)
          return { ...subject, topics }
        })
        if (isbasic) {
          filteredResponse.forEach((subject: SubjectResponseTypes) => {
            subject.topics = subject.topics.sort((a, b) => a.topicOrder - b.topicOrder)
          })
        }
        set({
          allSubjects: filteredResponse,
          isScienceSubjectCompleted: filteredResponse.length
            ? filteredResponse
                .find((subject: SubjectResponseTypes) => subject.name.startsWith('Science'))
                ?.topics.every((topic: TopicsResponseTypes) => topic.isCompleted)
            : false,
        })
        return filteredResponse
      },

      getMiniGames: async ({ categoryId, level, topicId, userRole, isBasic }: MiniGameParams) => {
        let response = {} as MinigamesGameFlowsTypes
        try {
          response = await networkService.post({
            url: `/games/games-list-by-category/${categoryId}/${level}/${topicId}/${userRole}/${isBasic}`,
          })
          set({ miniGames: response, filteredMiniGames: response.miniGames, filteredGameFlows: response.gameFlows })
          return response as MinigamesGameFlowsTypes
        } catch (error) {
          console.log('Error in getMiniGames', error)
        }
        return response
      },

      setGameCreator: (creator) => {
        set({ gameCreator: creator })
      },

      unlockTopic: async ({ categoryId, topicId, studentId, level, userRole }) => {
        const response: any = await networkService.post({
          url: `/unlock-topic?category=${categoryId}&topicId=${topicId}&level=${level}&userRole=${userRole}&studentId=${studentId}`,
        })
        return response
      },

      getGameRewards: async () => {
        const response: any = await networkService.get({ url: '/rewards/get-user-cards' })
        set({ gameRewards: response })
        return response
      },

      completeTopic: async ({ studentId, topicId, isCompleted }) => {
        const response = await networkService.post({
          url: `/complete-incomplete-unlock-topic?topicId=${topicId}&studentId=${studentId}&isCompleted=${isCompleted}`,
        })
        return response
      },

      getGames: async ({ categoryId, topicId }) => {
        const response = await networkService.get({ url: `/games/get-all-game-user/${categoryId}/${topicId}/1` })
        set({ games: response.returnObject })
        return response
      },

      unlockGame: async ({ gameId, topicId, categoryId }) => {
        const response = await networkService.get({
          url: `/games/unlock-game-user/${gameId}/${topicId}/${categoryId}`,
        })
        return response
      },

      unlockGameFlow: async (body) => {
        const response = await networkService.post({
          url: `/gameflows/save-games-gameflows-progress`,
          data: body,
        })
        return response
      },

      getGameFlowById: async (gameFlowId) => {
        const response = await networkService.get({ url: `/gameflows/${gameFlowId}` })
        return response
      },
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        selectedSubject: state.selectedSubject,
        selectedTopic: state.selectedTopic,
        isBasic: state.isBasic,
        level: state.level,
        gameCreator: state.gameCreator,
        isTestMode: state.isTestMode,
      }),
    }
  )
)
