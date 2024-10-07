import { useGameStore } from '@/store/gameStore'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { normalizeGameUrl } from '@/utils/helperFunctions'
import classNames from 'classnames'
import { ChooseLevelEnum, GameTypeNumber } from '@/utils/enum'
import { GameFlowDetailsTypes, LearningActivityTypes, TopicsResponseTypes } from '@/utils/types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import LanguageDropdown from '../common/Tables/LanguageDropdown'
import CustomSelect from '../common/CustomSelect'
import GameTile from '../common/Cards/GameTile'
import CustomInput from '../common/CustomInput'
import { useActivityStore } from '@/store/activityStore'
import { useProfileStore } from '@/store/profileStore'
import { useAccountStore } from '@/store/accountStore'

type GameListProps = {
  tutorGames: LearningActivityTypes[]
}

const GameList = ({ tutorGames }: GameListProps) => {
  const user = useAuthStore((state) => state.user)
  const miniGames = useGameStore((state) => state.miniGames)
  const getMiniGames = useGameStore((state) => state.getMiniGames)
  const token = useAuthStore((state) => state.token)
  const setError = useErrorStore((state) => state.setAlert)
  const selectedTopic = useGameStore((state) => state.selectedTopic)
  const completeTopic = useGameStore((state) => state.completeTopic)
  const getAllSubjects = useGameStore((state) => state.getAllSubjects)
  const setSelectedTopic = useGameStore((state) => state.setSelectedTopic)
  const allSubjects = useGameStore((state) => state.allSubjects)
  const gameCreator = useGameStore((state) => state.gameCreator)
  const selectedSubject = useGameStore((state) => state.selectedSubject)
  const setSelectedSubject = useGameStore((state) => state.setSelectedSubject)
  const isBasic = useGameStore((state) => state.isBasic)
  const level = useGameStore((state) => state.level)
  const isHardLevelUnlocked = useGameStore((state) => state.isHardLevelUnlocked)
  const unlockGame = useGameStore((state) => state.unlockGame)
  const isTestMode = useGameStore((state) => state.isTestMode)
  const unlockGameFlow = useGameStore((state) => state.unlockGameFlow)
  const getGameFlowById = useGameStore((state) => state.getGameFlowById)
  const search = useGameStore((state) => state.search)
  const setSearch = useGameStore((state) => state.setSearch)
  const filteredMiniGames = useGameStore((state) => state.filteredMiniGames)
  const setFilteredMiniGames = useGameStore((state) => state.setFilteredMiniGames)
  const filteredGameFlows = useGameStore((state) => state.filteredGameFlows)
  const setFilteredGameFlows = useGameStore((state) => state.setFilteredGameFlows)
  const refetchGames = useGameStore((state) => state.refetchGames)
  const unlockTopic = useGameStore((state) => state.unlockTopic)
  const { languages, getLanguages } = useProfileStore()
  const { profileDetails, getProfileDetails } = useAccountStore()

  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    ;(async () => {
      await getLanguages()
      await getProfileDetails()
    })()
  }, [])

  // useEffect(() => {
  //   document.addEventListener('', () => {
  //     debugger
  //     if (document.hidden) {
  //       // tab is changed
  //     } else {
  //       // tab is active
  //     }
  //   })
  // }, [])

  useEffect(() => {
    if (!user || !allSubjects?.length) return
    ;(async () => {
      let subject = selectedSubject || allSubjects?.[0]
      const topic = selectedTopic || subject?.topics?.[0]
      let games

      if (topic) {
        games = await getMiniGames({
          categoryId: topic?.categoryId,
          level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
          topicId: topic?.id,
          userRole: gameCreator.id,
          isBasic: level === ChooseLevelEnum.Easy ? true : false,
        })
        if (!games?.miniGames?.length && !games?.gameFlows.length) {
          return
          // return setError({ message: 'No games and gameflows found for this topic', type: 'error' })
        }
        // unlock first game for easy level
        // if (level === ChooseLevelEnum.Easy) {
        if (!games.miniGames[0].isUnlock) {
          // debugger
          const firstSubject = allSubjects[0]
          const firstTopic: TopicsResponseTypes = firstSubject.topics[0]
          await unlockTopic({
            categoryId: firstTopic.categoryId,
            topicId: firstTopic.id,
            studentId: user?.id,
            level: level === ChooseLevelEnum.Easy || level === ChooseLevelEnum.Medium ? ChooseLevelEnum.Medium : ChooseLevelEnum.Hard,
            userRole: gameCreator.id,
          })
          await unlockGame({
            categoryId: firstTopic?.categoryId,
            gameId: games?.miniGames[0]?.id,
            topicId: firstTopic?.id,
          })
          await getAllSubjects(user.syllabusId, level === ChooseLevelEnum.Easy ? true : false)
          await getMiniGames({
            categoryId: selectedTopic?.categoryId || firstTopic?.categoryId,
            level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
            topicId: selectedTopic?.id || firstTopic.id,
            userRole: gameCreator.id,
            isBasic: level === ChooseLevelEnum.Easy ? true : false,
          })
        } else {
          if (level === ChooseLevelEnum.Easy) unlockEasyLevelTopic()
        }
        // }
      }
      selectedSubject ? setSelectedSubject(selectedSubject) : setSelectedSubject(subject)
      selectedTopic ? setSelectedTopic(selectedTopic) : setSelectedTopic(topic)
    })()

    // unlock the first topic and game if user is new
    // if (level === ChooseLevelEnum.Easy && allSubjects && allSubjects.length && allSubjects[0].topics[0].isUnlocked === false) {
    //   ;(async () => {
    //     const firstSubject = allSubjects[0]
    //     const firstTopic: TopicsResponseTypes = firstSubject.topics[0]
    //     debugger
    //     await unlockTopic({
    //       categoryId: firstTopic.categoryId,
    //       topicId: firstTopic.id,
    //       studentId: user?.id,
    //       level: 1,
    //       userRole: gameCreator.id,
    //     })
    //     await getAllSubjects(user.syllabusId, true)
    //   })()
    // }
  }, [user, refetchGames])

  const unlockEasyLevelTopic = async () => {
    // debugger
    if (!allSubjects.length) return
    const lastInCompletedTopic = allSubjects[0].topics.find((topic) => !topic.isCompleted)
    if (!lastInCompletedTopic) return
    const lastSubject = allSubjects[allSubjects.length - 1]
    const lastTopic = lastSubject.topics[lastSubject.topics.length - 1]
    if (lastTopic.isUnlocked) return
    const games = await getMiniGames({
      categoryId: lastInCompletedTopic?.categoryId,
      level: 1,
      topicId: lastInCompletedTopic?.id,
      userRole: gameCreator.id,
      isBasic: true,
    })
    // check all  minigames are completed or not
    const isMiniGamesCompleted = games?.miniGames.every((game) => game.isCompleted)
    const isGameFlowsCompleted = games?.gameFlows.every((game) => game.isCompleted)
    if (isMiniGamesCompleted && isGameFlowsCompleted && user) {
      await completeTopic({
        studentId: user.id,
        topicId: lastInCompletedTopic.id,
        isCompleted: true,
      })
      // find next unlocked topic
      const nextTopic = allSubjects[0].topics.find((topic) => !topic.isUnlocked)
      if (!nextTopic) return setError({ message: 'No topic found', type: 'error' })
      await unlockTopic({
        categoryId: nextTopic?.categoryId,
        topicId: nextTopic?.id,
        studentId: user.id,
        level: 1,
        userRole: gameCreator.id,
      })
      await getAllSubjects(user.syllabusId, true)
      await getMiniGames({
        categoryId: nextTopic?.categoryId,
        level: 1,
        topicId: nextTopic?.id,
        userRole: gameCreator.id,
        isBasic: true,
      })
      // setSelectedSubject(allSubjects[0])
      setSelectedTopic(nextTopic)
    }
  }

  const userProfileLanguage = languages.find((language) => {
    return language.id === profileDetails.languageOfAccountId
  })

  return (
    <div>
      {/* <CustomButton
        onClick={async () => {
          if (!user || !selectedTopic) {
            setError({ message: 'User or Topic not found', type: 'error' })
            return
          }
          completeTopic({
            studentId: user?.id,
            topicId: selectedTopic?.id,
            isCompleted: true,
          })
        }}
        variant="outlined"
        color="transparent"
        className="!w-40 text-sm h-11 mb-4"
      >
        Complete Topic
      </CustomButton> */}
      <Box sx={{ width: '100%', mb: 6 }}>
        <Box
          sx={{
            border: '1px solid #EBE9E9',
            borderRadius: '4px',
            minHeight: '63px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 4,
            // for mobile screen display flex column
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '10px',
              height: 'auto',
              alignItems: 'center',
              pr: 0,
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{}}
            TabIndicatorProps={{
              sx: {
                backgroundColor: '#753CBD',
              },
            }}
          >
            <Tab
              sx={{
                height: '63px',
                width: '148px',
                '&.Mui-selected': {
                  color: '#753CBD',
                },
                // bottom border color
                '&.Mui-selected::after': {
                  backgroundColor: '#753CBD',
                },
              }}
              label="Single"
              {...a11yProps(0)}
            />
            {miniGames && miniGames.gameFlows && miniGames.gameFlows.length && (
              <Tab
                label="Multi"
                {...a11yProps(1)}
                sx={{
                  height: '63px',
                  width: '148px',
                  '&.Mui-selected': {
                    color: '#753CBD',
                  },
                }}
              />
            )}
          </Tabs>

          <div className="flex items-center gap-4">
            <CustomSelect
              label="Sort By"
              options={[
                {
                  name: 'Best Match',
                  value: 'bestMatch',
                },
                {
                  name: 'Newest',
                  value: 'newest',
                },
                {
                  name: 'Oldest',
                  value: 'oldest',
                },
              ]}
              value="bestMatch"
              handleChange={() => {}}
              width="140px"
            />
            {userProfileLanguage && (
              <div className="bg-purple-70 px-3 py-1 rounded-md text-white">
                <p>{userProfileLanguage.language || ''}</p>
              </div>
            )}

            {/* <LanguageDropdown
              options={[
                { name: 'Hindi', value: 'hindi' },
                { name: 'English', value: 'english' },
              ]}
              value="hindi"
              handleChange={() => {}}
              width="100px"
            /> */}
          </div>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <CustomInput
            value={search}
            onChange={(e) => {
              if (tabValue === 0) {
                setSearch(e.target.value)
                if (!e.target.value) {
                  setFilteredMiniGames(miniGames.miniGames)
                }
              }
              if (tabValue === 1) {
                setSearch(e.target.value)
                if (!e.target.value) {
                  setFilteredGameFlows(miniGames.gameFlows)
                }
              }
            }}
            onClick={() => {
              if (tabValue === 0) {
                const filteredGames = miniGames.miniGames.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()))
                setFilteredMiniGames(filteredGames)
              }
              if (tabValue === 1) {
                const filteredGames = miniGames.gameFlows.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()))
                setFilteredGameFlows(filteredGames)
              }
            }}
            placeholder="Search more games"
            type="search"
            size="large"
            className="!rounded bg-fantasy !border-none"
          />
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {isBasic ? (
            //! is Basic TRUE
            <div>
              {filteredMiniGames.length ? (
                <div className="flex flex-col gap-10">
                  {filteredMiniGames.map((game, i) => (
                    <GameTile
                      key={i}
                      title={game.title}
                      description={game.description}
                      // playCount={game.playingCount}
                      points={game.points}
                      isLocked={!game.isUnlock}
                      playedCount={game.userPlayingCount}
                      gameType={game.gameType}
                      gameScore={game.gameScore}
                      status={game.isCompleted ? 'completed' : game.userPlayingCount > 0 ? 'replay' : 'new'}
                      onClick={() => {
                        if (!game.isUnlock && !isTestMode) return
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                    />
                  ))}
                </div>
              ) : (
                'No games found'
              )}
            </div>
          ) : (
            //! isBasic FALSE
            <div>
              {filteredMiniGames.length ? (
                <div className="flex flex-col gap-10">
                  {filteredMiniGames.map((game, i) => (
                    <GameTile
                      key={i}
                      title={game.title}
                      description={game.description}
                      isLocked={!game.isUnlock}
                      playedCount={game.userPlayingCount}
                      status={game.isCompleted ? 'completed' : game.userPlayingCount > 0 ? 'replay' : 'new'}
                      gameType={game.gameType}
                      gameScore={game.gameScore}
                      points={game.points}
                      isMultiplayer={
                        level !== ChooseLevelEnum.Easy &&
                        (game.gameType === GameTypeNumber.Crossword || game.gameType === GameTypeNumber.WordSearch)
                          ? true
                          : false
                      }
                      onClick={() => {
                        if (!game.isUnlock) return
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                      unlockGame={async () => {
                        if (!user) return setError({ message: 'User not found', type: 'error' })
                        if (game.isUnlock) return
                        if (!selectedTopic) return setError({ message: 'Topic not found', type: 'error' })
                        await unlockGame({
                          categoryId: selectedTopic?.categoryId,
                          gameId: game.id,
                          topicId: selectedTopic?.id,
                        })
                        await getMiniGames({
                          categoryId: selectedTopic?.categoryId,
                          level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
                          topicId: selectedTopic?.id,
                          userRole: gameCreator.id,
                          isBasic,
                        })
                      }}
                    />
                  ))}
                </div>
              ) : (
                'No games found'
              )}
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {isBasic ? (
            //! is Basic TRUE (Game Flows)
            <div>
              {miniGames && miniGames.gameFlows && miniGames.gameFlows.length ? (
                <div className="flex flex-col gap-10">
                  {filteredGameFlows.map((game, i) => (
                    <GameTile
                      key={i}
                      title={game.title}
                      description={game.description}
                      isLocked={!game.isUnlock}
                      points={game.points}
                      playedCount={game.userPlayingCount}
                      status={game.isCompleted ? 'completed' : game.userPlayingCount > 0 ? 'replay' : 'new'}
                      gameScore={game.gameScore}
                      gameType={game.gameType}
                      onClick={() => {
                        if (!game.isUnlock && !isTestMode) return
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                    />
                  ))}
                </div>
              ) : (
                'No game flow found'
              )}
            </div>
          ) : (
            //! is Basic FALSE (Game Flows)
            <div>
              {filteredGameFlows && filteredGameFlows.length ? (
                <div className="flex flex-col gap-10">
                  {filteredGameFlows.map((game, i) => (
                    <GameTile
                      key={i}
                      title={game.title}
                      description={game.description}
                      isLocked={!game.isUnlock}
                      isGameFlow={true}
                      points={game.points}
                      playedCount={game.userPlayingCount}
                      status={game.isCompleted ? 'completed' : game.userPlayingCount > 0 ? 'replay' : 'new'}
                      gameType={game.gameType}
                      gameScore={game.gameScore}
                      gameflows={game.gameFlowDetails?.games}
                      onClick={() => {
                        if (!game.isUnlock) return
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                      unlockGame={async () => {
                        if (!user) return setError({ message: 'User not found', type: 'error' })
                        if (game.isUnlock) return
                        if (!selectedTopic) return setError({ message: 'Topic not found', type: 'error' })
                        const gameFlowDetails: GameFlowDetailsTypes = await getGameFlowById(game.id)
                        if (!gameFlowDetails) {
                          setError({ message: 'Game Flow not found', type: 'error' })
                          return
                        }
                        await unlockGameFlow({
                          studentId: user.id,
                          gameFlowId: game.id,
                          // Todo: Check about inProgressGameScore and timeSpentInSeconds
                          inProgressGameScore: 1,
                          timeSpentInSeconds: 0,
                          gameId: gameFlowDetails.games[0].gameId,
                          gameStatus: 1,
                          isCompleted: false,
                          gameLevel: '',
                        })
                        await getMiniGames({
                          categoryId: selectedTopic?.categoryId,
                          level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
                          topicId: selectedTopic?.id,
                          userRole: gameCreator.id,
                          isBasic,
                        })
                      }}
                    />
                  ))}
                </div>
              ) : (
                'No game flow found'
              )}
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default GameList

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="text-indigo"
    >
      {value === index && <Box sx={{ my: 6 }}>{children}</Box>}
    </div>
  )
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
