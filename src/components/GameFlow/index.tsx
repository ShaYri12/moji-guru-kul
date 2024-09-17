'use client'
import React, { useEffect, useState } from 'react'
import SubjectList from './SubjectList'
import { useGameStore } from '@/store/gameStore'
import { useAuthStore } from '@/store/authStore'
import GameList from './GameList'
import classNames from 'classnames'
import { usePointStore } from '@/store/pointStore'
import { useMilestoneStore } from '@/store/milestoneStore'
import { ChooseLevelEnum, GameCreator, RolesEnum } from '@/utils/enum'
import { useRouter } from 'next/navigation'
import ProgressBar from '../common/ProgressBar'
import Image from 'next/image'
import Link from 'next/link'
import RewardCard from '../common/Cards/RewardCard'
import { GameRewards, LearningActivityTypes, MilestoneResponseTypes, TutorsForStudentTypes } from '@/utils/types'
import TutorGame from './TutorGame'
import { useErrorStore } from '@/store/errorStore'
import { useSubscription } from '@/store/subscriptionStore'
import { AccordionDetails } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'

type GameFlowProps = {
  tutors: TutorsForStudentTypes[]
  tutorGames: LearningActivityTypes[]
}

const GameFlow = ({ tutors, tutorGames }: GameFlowProps) => {
  const router = useRouter()

  const user = useAuthStore((state) => state.user)

  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [expandedRewards, setExpandedRewards] = useState<boolean>(false)

  const getAllSubjects = useGameStore((state) => state.getAllSubjects)
  const getGameRewards = useGameStore((state) => state.getGameRewards)
  const gameRewards = useGameStore((state) => state.gameRewards)
  const isScienceSubjectCompleted = useGameStore((state) => state.isScienceSubjectCompleted)
  const points = usePointStore((state) => state.points)
  const getPoints = usePointStore((state) => state.getPoints)
  const milestones = useMilestoneStore((state) => state.milestones)
  const getMilestones = useMilestoneStore((state) => state.getMilestones)
  const setIsBasic = useGameStore((state) => state.setIsBasic)
  const unlockMilestone = useMilestoneStore((state) => state.unlockMilestone)
  // const activeMilestone = useMilestoneStore((state) => state.activeMilestone)
  const isTestMode = useGameStore((state) => state.isTestMode)
  const gameCreator = useGameStore((state) => state.gameCreator)
  const isBasic = useGameStore((state) => state.isBasic)
  const personalMilestones = useMilestoneStore((state) => state.personalMilestones)
  const getPersonalMilestones = useMilestoneStore((state) => state.getPersonalMilestones)
  const level = useGameStore((state) => state.level)
  const setAlert = useErrorStore((state) => state.setAlert)
  const { subscriptions, getSubscriptions } = useSubscription()

  useEffect(() => {
    if (!user || !user?.syllabusId || gameCreator.id !== 1) return
    // getAllSubjects(user.syllabusId, isBasic)
    // setIsBasic(true)
    getSubscriptions()
    getPoints()
    getGameRewards()
    getMilestones()
    getPersonalMilestones(user.id)
  }, [user])

  useEffect(() => {
    // get milestone from milestones where pointsCounter is less then pointsThresholdValue and isUnLocked is true
    if (!personalMilestones.length || gameCreator.id !== 1) return
    const activeMilestone = personalMilestones.find(
      (personalMilestone) => personalMilestone.pointsCounter < personalMilestone.pointsThresholdValue && personalMilestone.isUnLocked
    )
    setActiveMilestone(activeMilestone)

    if (personalMilestones.length) {
      let firstMilestone = null
      if (!subscriptions.length) {
        // find first milestone where isUnLocked is false and isBasic is true and level is 1
        firstMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && personalMilestone.isBasic && Number(personalMilestone.level) == 1
        )
      }
      if (subscriptions.length === 1) {
        // find first milestone where isUnLocked is false and isBasic is false and level is 1
        firstMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && !personalMilestone.isBasic && Number(personalMilestone.level) == 1
        )
      }
      if (subscriptions.length === 2) {
        // find first milestone where isUnLocked is false and isBasic is false and level is 2
        firstMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && !personalMilestone.isBasic && Number(personalMilestone.level) == 2
        )
      }
      // const firstMilestone = personalMilestones[0]
      if (firstMilestone && !firstMilestone.isUnLocked) {
        unlockMilestone({
          id: firstMilestone.id,
          milestoneType: firstMilestone.milestoneType,
          totalPoints: 0,
        })
        user && getPersonalMilestones(user?.id)
      }
      // find how many milestones are unlocked and pointsCounter is greater then pointsThresholdValue
      // const unlockedMilestones = personalMilestones.filter(
      //   (personalMilestones) => personalMilestones.isUnLocked && personalMilestones.pointsCounter >= personalMilestones.pointsThresholdValue
      // )
    }
  }, [personalMilestones])

  useEffect(() => {
    // if pointsCounter is greater then pointsThresholdValue then unlock next milestone
    if (activeMilestone && activeMilestone.pointsCounter >= activeMilestone.pointsThresholdValue) {
      let nextMilestone = null
      if (!subscriptions.length) {
        // find next milestone where isUnLocked is false and isBasic is true and level is 1
        nextMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && personalMilestone.isBasic && Number(personalMilestone.level) == 1
        )
      }
      if (subscriptions.length === 1) {
        // find next milestone where isUnLocked is false and isBasic is false and level is 1
        nextMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && !personalMilestone.isBasic && Number(personalMilestone.level) == 1
        )
      }
      if (subscriptions.length === 2) {
        // find next milestone where isUnLocked is false and isBasic is false and level is 2
        nextMilestone = personalMilestones.find(
          (personalMilestone) => !personalMilestone.isUnLocked && !personalMilestone.isBasic && Number(personalMilestone.level) == 2
        )
      }
      // const nextMilestone = personalMilestones.find(
      //   (personalMilestone) => !personalMilestone.isUnLocked && personalMilestone.id > activeMilestone.id
      // )
      if (nextMilestone) {
        unlockMilestone({
          id: nextMilestone.id,
          milestoneType: nextMilestone.milestoneType,
          totalPoints: 0,
        })
        setAlert({ message: 'Congratulations! You have unlocked a new milestone', type: 'success' })
        user && getPersonalMilestones(user?.id)
      }
    }
  }, [activeMilestone])

  // const currentMilestoneValue = milestones.reduce((acc, milestone) => {
  //   return acc + milestone.pointsCounter
  // }, 0)

  // const totalThresholdValue = milestones.reduce((acc, milestone) => {
  //   return acc + milestone.pointsThresholdValue
  // }, 0)

  const calculateThresholdValue = ({ level, milestone }: { level: ChooseLevelEnum; milestone: MilestoneResponseTypes[] }) => {
    if (level === ChooseLevelEnum.Easy) {
      // accumulate threshold if milestone is unlocked and isBasic is true and level is 1
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && milestone.isBasic && Number(milestone.level) == 1)
      const total = filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsThresholdValue
      }, 0)
      return total
    }
    if (level === ChooseLevelEnum.Medium) {
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && !milestone.isBasic && Number(milestone.level) == 1)
      return filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsThresholdValue
      }, 0)
    }
    if (level === ChooseLevelEnum.Hard) {
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && !milestone.isBasic && Number(milestone.level) == 2)
      return filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsThresholdValue
      }, 0)
    }
  }

  const calculatePointCounter = ({ level, milestone }: { level: ChooseLevelEnum; milestone: MilestoneResponseTypes[] }) => {
    if (level === ChooseLevelEnum.Easy) {
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && milestone.isBasic)
      return filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsCounter
      }, 0)
    }
    if (level === ChooseLevelEnum.Medium) {
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && !milestone.isBasic)
      return filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsCounter
      }, 0)
    }
    if (level === ChooseLevelEnum.Hard) {
      const filteredMilestones = milestone.filter((milestone) => milestone.isUnLocked && !milestone.isBasic)
      return filteredMilestones.reduce((acc, milestone) => {
        return acc + milestone.pointsCounter
      }, 0)
    }
  }

  return (
    <div>
      <div className="shadow-tiles rounded-2xl py-8 px-6">
        <div className="flex gap-6 items-center">
          <div className="bg-indigo w-14 h-14 lg:w-[72px] lg:h-[72px] rounded-full flex justify-center items-center">
            <Image src="/assets/icons/analytic-white.svg" alt="Learning Hub" width={32} height={28} />
          </div>
          <div className="w-[75%] md:w-[80%] lg:w-[90%]">
            <div className="flex items-center justify-between">
              <p className="text-lite-black text-base md:text-xl font-normal">Progress of Lesson</p>
              <p className="text-indigo text-base md:text-xl font-normal">
                Total Point :{' '}
                {calculateThresholdValue({
                  level:
                    level === ChooseLevelEnum.Easy
                      ? ChooseLevelEnum.Easy
                      : level === ChooseLevelEnum.Medium
                        ? ChooseLevelEnum.Medium
                        : ChooseLevelEnum.Hard,

                  milestone: personalMilestones,
                })}
              </p>
            </div>
            <ProgressBar
              progress={
                calculatePointCounter({
                  level:
                    level === ChooseLevelEnum.Easy
                      ? ChooseLevelEnum.Easy
                      : level === ChooseLevelEnum.Medium
                        ? ChooseLevelEnum.Medium
                        : ChooseLevelEnum.Hard,

                  milestone: personalMilestones,
                }) || 0
              }
              total={
                calculateThresholdValue({
                  level:
                    level === ChooseLevelEnum.Easy
                      ? ChooseLevelEnum.Easy
                      : level === ChooseLevelEnum.Medium
                        ? ChooseLevelEnum.Medium
                        : ChooseLevelEnum.Hard,

                  milestone: personalMilestones,
                }) || 100
              }
              color="#753CBD"
            />
            <p className="text-indigo">
              Current Points:{' '}
              {calculatePointCounter({
                level:
                  level === ChooseLevelEnum.Easy
                    ? ChooseLevelEnum.Easy
                    : level === ChooseLevelEnum.Medium
                      ? ChooseLevelEnum.Medium
                      : ChooseLevelEnum.Hard,

                milestone: personalMilestones,
              })}
            </p>
          </div>
        </div>
        {/* Rewards */}
        <div className="my-10">
          <Rewards
            title="Progress of Medium Level"
            expanded={expandedRewards}
            rewards={gameRewards}
            level={level}
            setExpanded={setExpandedRewards}
          />
        </div>
      </div>
      {/* <h5>Your game rewards</h5>
      <div className="flex gap-6 mt-2 overflow-auto">
        {gameRewards.map((reward, index) => (
          <div key={index}>
            <div className="flex flex-col items-center size-40 border border-grey rounded">
              {reward.fragments.map((fragment, index) => (
                <div
                  key={fragment.id}
                  className={classNames('w-full h-2/6', {
                    'bg-yellow-400': fragment.cardPortion === 3,
                    'bg-yellow-300': fragment.cardPortion === 2,
                    'bg-yellow-100': fragment.cardPortion === 1,
                  })}
                >
                  <p className="text-grey">Game Id: {fragment.gameId}</p>
                  <p className="text-grey">Portion: {fragment.cardPortion}</p>
                </div>
              ))}
            </div>
            <p className="text-sm">{reward.title}</p>
          </div>
        ))}
      </div> */}
      <div className="mt-20 lg:flex gap-7">
        <div className="w-full max-w-[300px]">
          <SubjectList tutors={tutors} />
        </div>
        <div className="w-full max-w-[808px]">
          {gameCreator.id === GameCreator.Admin ? <GameList tutorGames={tutorGames} /> : <TutorGame tutors={tutors} />}
        </div>
      </div>
    </div>
  )
}

export default GameFlow

type RewardsProps = {
  title: string
  rewards: GameRewards[]
  expanded: boolean
  setExpanded: (value: boolean) => void
  level: ChooseLevelEnum
}

const Rewards = ({ title, rewards, expanded, level, setExpanded }: RewardsProps) => (
  <Accordion
    expanded={expanded}
    // onChange={handleChange(title)}
    defaultExpanded={true}
    square={true}
    sx={{
      backgroundColor: 'white',
      color: '#3D3842',
      borderRadius: '15px',
      boxShadow: 'none',
      border: 'none',
    }}
  >
    <AccordionSummary
      sx={{
        padding: '0',
        minHeight: '36px',
        margin: '0',

        '& .MuiAccordionSummary-content': {
          display: 'block',
          margin: '0px !important',
        },
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-indigo text-lg md:text-[32px] font-normal">
          Progress of {level === ChooseLevelEnum.Easy ? 'Easy' : level === ChooseLevelEnum.Medium ? 'Medium' : 'Hard'} Level
        </h4>
        <span
          className="block text-dark-sky-blue text-base md:text-xl font-normal underline underline-offset-2"
          onClick={() => setExpanded(!expanded)}
        >
          All Reward
        </span>
      </div>
    </AccordionSummary>
    <AccordionDetails sx={{ padding: '0' }}>
      <div className="flex gap-8 flex-wrap mt-10">
        {!rewards.length && <p>No rewards available</p>}
        {rewards.map((reward) => (
          <RewardCard key={reward.id} name={reward.title} />
        ))}
      </div>
    </AccordionDetails>
  </Accordion>
)
