'use client'
import React, { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import CustomCheckbox from '../common/CustomCheckbox'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useAuthStore } from '@/store/authStore'
import { MiniGameTypes, SubjectResponseTypes, TopicsResponseTypes, TutorsForStudentTypes } from '@/utils/types'
import { ChooseLevelEnum } from '@/utils/enum'
import { useRouter } from 'next/navigation'
import { useErrorStore } from '@/store/errorStore'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { LockIcon, TickIcon, TutorIcon } from '@/svg'
import Image from 'next/image'
import classNames from 'classnames'
import { useActivityStore } from '@/store/activityStore'
import CustomSwitch from '../common/CustomSwitch'

type SubjectListProps = {
  tutors: TutorsForStudentTypes[]
}

const SubjectList = ({ tutors }: SubjectListProps) => {
  const router = useRouter()
  const host = process.env.NEXT_PUBLIC_ENV

  const [activeTitle, setActiveTitle] = useState<string>('For Basic (Free)')

  const user = useAuthStore((state) => state.user)
  const allSubjects = useGameStore((state) => state.allSubjects)
  const setSelectedSubject = useGameStore((state) => state.setSelectedSubject)
  const setSelectedTopic = useGameStore((state) => state.setSelectedTopic)
  const miniGames = useGameStore((state) => state.miniGames)
  const selectedTopic = useGameStore((state) => state.selectedTopic)
  const gameCreator = useGameStore((state) => state.gameCreator)
  const setGameCreator = useGameStore((state) => state.setGameCreator)
  const unlockTopic = useGameStore((state) => state.unlockTopic)
  const setError = useErrorStore((state) => state.setAlert)
  const getAllSubjects = useGameStore((state) => state.getAllSubjects)
  const isBasic = useGameStore((state) => state.isBasic)
  const setIsBasic = useGameStore((state) => state.setIsBasic)
  const getMiniGames = useGameStore((state) => state.getMiniGames)
  const level = useGameStore((state) => state.level)
  const setLevel = useGameStore((state) => state.setLevel)
  const isHardLevelUnlocked = useGameStore((state) => state.isHardLevelUnlocked)
  const setIsHardLevelUnlocked = useGameStore((state) => state.setIsHardLevelUnlocked)
  const isTestMode = useGameStore((state) => state.isTestMode)
  const setIsTestMode = useGameStore((state) => state.setIsTestMode)
  const selectedSubject = useGameStore((state) => state.selectedSubject)
  const setFilteredMiniGames = useGameStore((state) => state.setFilteredMiniGames)
  const setFilteredGameFlows = useGameStore((state) => state.setFilteredGameFlows)
  const getActivities = useActivityStore((state) => state.getActivities)
  const activeActivity = useActivityStore((state) => state.activeActivity)
  const setActiveActivity = useActivityStore((state) => state.setActiveActivity)
  const setFilteredActivities = useActivityStore((state) => state.setFilteredActivities)
  const getActivitiesByGroup = useActivityStore((state) => state.getActivitiesByGroup)
  const completeTopic = useGameStore((state) => state.completeTopic)

  const setRefetchGames = useGameStore((state) => state.setRefetchGames)
  const unlockGame = useGameStore((state) => state.unlockGame)

  useEffect(() => {
    if (gameCreator.id !== 1) return
    if (user && !isTestMode && allSubjects.length) {
      isAllTopicsCompleted()
    }
    if (user) {
      if ((user.razorPlanIds && user.razorPlanIds.length) || isTestMode) {
        ;(async () => {
          if (level === ChooseLevelEnum.Easy) {
            const response = await getAllSubjects(user.syllabusId, true)
            setIsBasic(false)
            setActiveTitle('For Basic Paid')
            setRefetchGames(new Date().getTime())
            return
          }
          const response = await getAllSubjects(user.syllabusId, false)
          setIsBasic(false)
          setActiveTitle('For Basic Paid')
          setRefetchGames(new Date().getTime())
        })()
      } else {
        ;(async () => {
          const response = await getAllSubjects(user.syllabusId, true)
          setIsBasic(true)
          setActiveTitle('For Basic (Free)')
          setRefetchGames(new Date().getTime())
        })()
      }
    }
  }, [user, isTestMode])

  const getInCompleteTopic = (currentSubject: SubjectResponseTypes) => {
    const findActiveTopicBySubject = currentSubject.topics.find((topic) => {
      return topic.isUnlocked && !topic.isCompleted
    }) as TopicsResponseTypes
    return findActiveTopicBySubject
  }

  const isAllTopicsCompleted = () => {
    const isAllTopicsCompleted = allSubjects.every((subject) => {
      return subject.topics.every((topic) => topic.isCompleted)
    })
    setIsHardLevelUnlocked(isAllTopicsCompleted)
    return isAllTopicsCompleted
  }

  const getPreviousTopic = () => {
    if (!selectedTopic) return
    const topicIndex = selectedSubject?.topics.findIndex((topic) => topic.id === selectedTopic.id)
    if (topicIndex) {
      return selectedSubject?.topics[topicIndex - 1]
    }
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h4 className="text-indigo text-xl md:text-[32px] font-normal">All Games</h4>
        <p className="text-[#5C727D] text-sm md:text-base font-normal">About 9,620 results (0.62 seconds) </p>
        {host && (
          <CustomSwitch
            checked={isTestMode}
            setChecked={(checked: boolean) => {
              if (checked) {
                setIsTestMode(true)
                setLevel(ChooseLevelEnum.Easy)
                setIsHardLevelUnlocked(true)
              } else {
                setIsTestMode(false)
                setLevel(ChooseLevelEnum.Easy)
                setIsHardLevelUnlocked(true)
              }
              setSelectedSubject(null)
              setSelectedTopic(null)
            }}
          />
        )}
      </div>
      {gameCreator.id === 1 && (
        <SubjectCard
          title={activeTitle}
          className=""
          creatorTitle="Tutor"
          handleGameCreator={async () => {
            setGameCreator({ id: 2, name: 'Tutor' })
            setFilteredMiniGames([])
            setFilteredGameFlows([])
            setSelectedSubject(null)
            setSelectedTopic(null)
          }}
        >
          {!isBasic ? (
            <CustomAccordion subjectName="Difficulty">
              <Options
                isActive={true}
                isSelected={level === ChooseLevelEnum.Easy}
                title="Easy"
                onClick={async () => {
                  if (!user) return setError({ message: 'User not found', type: 'error' })
                  const response = await getAllSubjects(user.syllabusId, true)
                  // setFilterAllSubjects(response)

                  setLevel(ChooseLevelEnum.Easy)
                  setActiveTitle('Basic Paid')
                  let subject = response?.[0]
                  const topic = subject?.topics?.[0]
                  if (topic) {
                    const response = await getMiniGames({
                      categoryId: topic?.categoryId,
                      level: ChooseLevelEnum.Medium,
                      topicId: topic?.id,
                      userRole: gameCreator.id,
                      isBasic: true,
                    })
                  }
                  setSelectedSubject(subject)
                  setSelectedTopic(topic)
                }}
              />
              <Options
                isActive={true}
                isSelected={level === ChooseLevelEnum.Medium}
                title="Medium"
                onClick={async () => {
                  if (!user) return setError({ message: 'User not found', type: 'error' })
                  const response = await getAllSubjects(user.syllabusId, false)
                  // setFilterAllSubjects(response)
                  setLevel(ChooseLevelEnum.Medium)
                  setActiveTitle('Basic Paid')
                  let subject = response?.[0]
                  const topic = subject?.topics?.[0]
                  if (topic) {
                    // const response = await getMiniGames({
                    //   categoryId: topic?.categoryId,
                    //   level: ChooseLevelEnum.Medium,
                    //   topicId: topic?.id,
                    //   userRole: gameCreator.id,
                    //   isBasic: false,
                    // })
                    setRefetchGames(new Date().getTime())
                  }
                  setSelectedSubject(subject)
                  setSelectedTopic(topic)
                }}
              />
              <Options
                isActive={isHardLevelUnlocked || isTestMode}
                isSelected={level === ChooseLevelEnum.Hard}
                title="Hard"
                onClick={async () => {
                  if (!user) return setError({ message: 'User not found', type: 'error' })
                  if (isHardLevelUnlocked || isTestMode) {
                    const response = await getAllSubjects(user.syllabusId, false)
                    // setFilterAllSubjects(response)

                    setLevel(ChooseLevelEnum.Hard)
                    setActiveTitle('For Premium')
                    let subject = response?.[0]
                    const topic = subject?.topics?.[0]
                    if (topic) {
                      // const response = await getMiniGames({
                      //   categoryId: topic?.categoryId,
                      //   level: ChooseLevelEnum.Hard,
                      //   topicId: topic?.id,
                      //   userRole: gameCreator.id,
                      //   isBasic: false,
                      // })
                      setRefetchGames(new Date().getTime())
                    }
                    setSelectedSubject(subject)
                    setSelectedTopic(topic)
                  } else {
                    setError({ message: 'Please complete all the topics in easy level first', type: 'error' })
                  }
                }}
              />
            </CustomAccordion>
          ) : (
            ''
          )}

          {allSubjects.length
            ? allSubjects.map((subject) => (
                <CustomAccordion subjectName={subject.name} key={subject.id}>
                  {subject.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={classNames('flex gap-3 items-center mb-4 cursor-pointer group p-2', {
                        'border border-indigo rounded': selectedTopic?.id === topic.id,
                      })}
                      onClick={async (e) => {
                        if (!user) return setError({ message: 'User not found', type: 'error' })
                        if (topic.isUnlocked) {
                          setSelectedSubject(subject)
                          setSelectedTopic(topic)
                          const response = await getMiniGames({
                            // issue there it call multiple times
                            categoryId: topic?.categoryId,
                            level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
                            topicId: topic?.id,
                            userRole: gameCreator.id,
                            isBasic: level === ChooseLevelEnum.Easy ? true : false,
                          })
                        } else {
                          //! unlock topic for easy level
                          if (level === ChooseLevelEnum.Easy) {
                            if (!selectedTopic) return
                            // const topicIndex = selectedSubject?.topics.findIndex((topic) => topic.id === selectedTopic.id)
                            // const previousTopic = selectedSubject?.topics.findIndex((topic) => topic.id === selectedTopic.id)

                            // // const previousTopic = topicIndex ? selectedSubject?.topics[topicIndex] : null
                            const previousTopic = getInCompleteTopic(subject)

                            if (previousTopic && !isTestMode) {
                              return setError({ message: `Please complete "${previousTopic.topicName}" topic first`, type: 'error' })
                            }

                            // const games = await getMiniGames({
                            //   categoryId: previousTopic.categoryId,
                            //   level: 1,
                            //   topicId: previousTopic.id,
                            //   userRole: gameCreator.id,
                            //   isBasic: true,
                            // })
                            // if (!games?.miniGames?.length) {
                            //   setError({ message: 'No games found for this topic', type: 'error' })
                            //   return
                            // }
                            // check if every game is completed
                            // const isAllGamesCompleted = games?.miniGames.every((game) => game.isCompleted)
                            // if (!isAllGamesCompleted) {
                            //   setError({ message: 'Please complete all the games in the previous topic', type: 'error' })
                            //   return
                            // }
                            // unlock the topic
                            setSelectedTopic({ ...topic, isUnlocked: true })
                            await unlockTopic({
                              categoryId: topic.categoryId,
                              topicId: topic.id,
                              studentId: user?.id,
                              level: 1,
                              userRole: gameCreator.id,
                            })

                            await getMiniGames({
                              categoryId: topic.categoryId,
                              level: 1,
                              topicId: topic.id,
                              userRole: gameCreator.id,
                              isBasic: true,
                            })

                            // get all subjects
                            await getAllSubjects(user.syllabusId, true)

                            return setError({ message: 'Topic unlocked successfully', type: 'success' })

                            // return setError({
                            //   message: 'The topic will be automatically unlocked once the active topic is completed.',
                            //   type: 'error',
                            // })
                          }

                          const incompleteTopic = getInCompleteTopic(subject)
                          if (incompleteTopic && !isTestMode) {
                            return setError({ message: `Please complete "${incompleteTopic.topicName}" topic first`, type: 'error' })
                          }
                          const previousTopic = getPreviousTopic()
                          if (previousTopic && !isTestMode) {
                            await completeTopic({
                              studentId: user.id,
                              topicId: previousTopic.id,
                              isCompleted: true,
                            })
                          }
                          setSelectedTopic({ ...topic, isUnlocked: true })
                          await unlockTopic({
                            categoryId: topic.categoryId,
                            topicId: topic.id,
                            studentId: user?.id,
                            level: level === ChooseLevelEnum.Medium ? ChooseLevelEnum.Medium : ChooseLevelEnum.Hard,
                            userRole: gameCreator.id,
                          })
                          const games = await getMiniGames({
                            categoryId: topic.categoryId,
                            level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
                            topicId: topic.id,
                            userRole: gameCreator.id,
                            isBasic: false,
                          })
                          if (!games?.miniGames?.length) {
                            await getAllSubjects(user.syllabusId, isBasic)
                            setError({ message: 'No games found for this topic', type: 'error' })
                            return
                          }
                          await unlockGame({
                            categoryId: topic?.categoryId,
                            gameId: games?.miniGames[0]?.id,
                            topicId: topic?.id,
                          })
                          await getMiniGames({
                            categoryId: topic.categoryId,
                            level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
                            topicId: topic.id,
                            userRole: gameCreator.id,
                            isBasic: false,
                          })
                          await getAllSubjects(user.syllabusId, false)
                          const response =
                            // setFilterAllSubjects(response)
                            setError({ message: 'Topic unlocked successfully', type: 'success' })
                        }
                      }}
                    >
                      <div
                        className={classNames(
                          'w-8 h-8 border-[0.5px] border-[#D8C4C4] flex justify-center items-center bg-[#E9E9E9] rounded',
                          {
                            'bg-no-repeat bg-cover group-hover:w-10 group-hover:h-10 transition-all': topic.isUnlocked,
                          }
                        )}
                        style={{
                          backgroundImage: `url(${topic.isUnlocked ? topic.topicImage || '/assets/images/image.png' : ''})`,
                        }}
                      >
                        {topic.isUnlocked ? '' : <LockIcon fill="#A5A4A7" />}
                      </div>
                      <p className="text-lite-black text-base font-normal w-[78%]">{topic.topicName}</p>
                    </div>
                  ))}
                </CustomAccordion>
              ))
            : 'Loading subjects...'}
        </SubjectCard>
      )}
      {/* // Tutor List */}
      {gameCreator.id === 2 && (
        <SubjectCard
          title="Basic Paid"
          className=""
          creatorTitle="Admin"
          handleGameCreator={async () => {
            setGameCreator({ id: 1, name: 'Admin' })
            setFilteredActivities([])
            // await getMiniGames({
            //   // issue there it call multiple times
            //   categoryId: allSubjects[0]?.topics?.[0]?.categoryId,
            //   level: level === ChooseLevelEnum.Hard ? ChooseLevelEnum.Hard : ChooseLevelEnum.Medium,
            //   topicId: allSubjects[0]?.topics?.[0]?.id,
            //   userRole: 1,
            //   isBasic: level === ChooseLevelEnum.Easy ? true : false,
            // })
          }}
        >
          <CustomAccordion subjectName="Tutor">
            {tutors &&
              tutors.length &&
              tutors.map((tutor) => (
                <div
                  key={tutor.tutorId}
                  className={classNames('flex gap-3 items-center justify-between mb-4 py-2.5 px-3 cursor-pointer', {
                    'border border-indigo rounded': tutor.groupId
                      ? activeActivity?.groupId === tutor.groupId
                      : activeActivity?.tutorId === tutor.tutorId,
                  })}
                  onClick={async (e) => {
                    if (!user) return setError({ message: 'User not found', type: 'error' })
                    if (tutor.groupId) {
                      await getActivitiesByGroup({ assignedToId: tutor.groupId, assignedById: tutor.tutorId })
                      setActiveActivity(tutor)
                      return
                    }
                    debugger
                    await getActivities({ assignedToId: user?.id, assignedById: tutor.tutorId })
                    setActiveActivity(tutor)
                  }}
                >
                  <div className="flex gap-3 items-center capitalize">
                    <div className="w-8 h-8 border-[0.5px] border-[#D8C4C4] flex justify-center items-center bg-[#E9E9E9] rounded bg-[url('/assets/images/games/tutor-icon.svg')] bg-no-repeat bg-cover" />
                    <p className="text-lite-black text-base font-normal w-[78%] break-all">
                      {tutor.groupId ? tutor.groupName : tutor.tutorName}
                    </p>
                  </div>
                  <div className="bg-[#FCE8EA] rounded px-1 h-5 flex justify-center items-center text-lite-red text-xs">
                    <p>{tutor.groupId ? tutor.groupId : tutor.tutorId}</p>
                  </div>
                </div>
              ))}
          </CustomAccordion>
        </SubjectCard>
      )}
    </div>
  )
}

export default SubjectList

type SubjectCardProps = {
  title: string
  children: React.ReactNode
  className: string
  creatorTitle: string
  handleGameCreator?: () => void
}

const SubjectCard = ({ title, children, className, creatorTitle, handleGameCreator }: SubjectCardProps) => {
  return (
    <div className={classNames('subject-card-shadow w-full md:max-w-[300px] rounded-xl border border-mercury p-2', className)}>
      <div className="overflow-y-auto vertical-scroll h-[75vh]  py-4 px-8">
        <div className="flex items-center justify-between">
          <h4 className="text-lite-black text-lg md:text-xl font-medium tracking-[-3%]">{title}</h4>
          {!title.includes('Free') && (
            <span
              className="text-indigo text-base border bg-soft-peach border-indigo rounded-lg px-2 !pb-0.5 cursor-pointer inline-flex items-center gap-2"
              onClick={handleGameCreator}
            >
              <TutorIcon />
              <span className="inline-block pt-1.5">{creatorTitle}</span>
            </span>
          )}
        </div>
        <Divider />
        <div>{children}</div>
      </div>
    </div>
  )
}

const Divider = () => <div className="my-4 h-[1px] bg-mercury" />

type CustomAccordionProps = {
  subjectName: string
  children: React.ReactNode
}
const CustomAccordion = ({ subjectName, children }: CustomAccordionProps) => {
  return (
    <Accordion defaultExpanded={true} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          fontSize: '20px',
          color: '#3D3842',
          px: 0,
          fontWeight: '500',
          borderBottom: '1px solid #E0E5EB',
          minHeight: '36px',
          // remove margin
          '& .MuiAccordionSummary-content': {
            display: 'block',
            margin: '0px !important',
          },
        }}
      >
        {subjectName}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: 0,
          marginTop: '12px',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

type OptionsProps = {
  isActive: boolean
  title: string
  onClick?: () => void
  isSelected: boolean
}
const Options = ({ isActive, isSelected, title, onClick }: OptionsProps) => (
  <div
    className={classNames('flex gap-3 items-center mb-4 py-2.5 px-3 cursor-pointer', {
      'border border-indigo rounded': isSelected,
    })}
    onClick={onClick}
  >
    <div className="w-8 h-8 flex justify-center items-center">{isActive ? <TickIcon /> : <LockIcon fill="#753CBD" />}</div>
    <p className="text-lite-black text-base font-normal w-[78%]">{title}</p>
  </div>
)

const CREATORS = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'Tutor',
  },
]
