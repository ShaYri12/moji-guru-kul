'use client'
import { poppins } from '@/app/font'
import SkillCard from '@/components/common/Cards/SkillCard'
import PlainCard from '@/components/common/Cards/PlainCard'
import CustomSelect from '@/components/common/CustomSelect'
import ProgressBar from '@/components/common/ProgressBar'
import { useAuthStore } from '@/store/authStore'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CustomInput from '@/components/common/CustomInput'
import Link from 'next/link'
import GameCard from '@/components/common/Cards/GameCard'
import BasicTable from '@/components/common/Tables/BasicTable'
import { useGameStore } from '@/store/gameStore'
import { MilestoneResponseTypes, SubjectResponseTypes, TopicsResponseTypes } from '@/utils/types'
import HorizontalStepper from '@/components/common/HorizontalStepper'
import { useMilestoneStore } from '@/store/milestoneStore'
import { useErrorStore } from '@/store/errorStore'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  const [selectedOption, setSelectedOption] = useState<string | undefined>('7')
  const [searchValue, setSearchValue] = useState<string>('')
  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [level, setLevel] = useState<number>(0)

  const getStreak = useAuthStore((state) => state.getStreak)
  const streakList = useAuthStore((state) => state.streakList)
  const setAlert = useErrorStore((state) => state.setAlert)
  const personalMilestones = useMilestoneStore((state) => state.personalMilestones)
  const getPersonalMilestones = useMilestoneStore((state) => state.getPersonalMilestones)
  const unlockMilestone = useMilestoneStore((state) => state.unlockMilestone)

  useEffect(() => {
    if (user) {
      getStreak(user.id)
      getPersonalMilestones(user.id)
    }
  }, [user])

  useEffect(() => {
    // get milestone from milestones where pointsCounter is less then pointsThresholdValue and isUnLocked is true
    if (!personalMilestones.length) return
    const activeMilestone = personalMilestones.find(
      (personalMilestone) => personalMilestone.pointsCounter < personalMilestone.pointsThresholdValue && personalMilestone.isUnLocked
    )
    setActiveMilestone(activeMilestone)
    if (personalMilestones.length) {
      const firstMilestone = personalMilestones[0]
      if (!firstMilestone.isUnLocked && firstMilestone.pointsCounter >= firstMilestone.pointsThresholdValue) {
        unlockMilestone({
          id: firstMilestone.id,
          milestoneType: firstMilestone.milestoneType,
          totalPoints: 0,
        })
        user && getPersonalMilestones(user?.id)
      }
      // find how many milestones are unlocked and pointsCounter is greater then pointsThresholdValue
      const unlockedMilestones = personalMilestones.filter(
        (personalMilestones) => personalMilestones.isUnLocked && personalMilestones.pointsCounter >= personalMilestones.pointsThresholdValue
      )
      setLevel(unlockedMilestones.length)
    }
  }, [personalMilestones])

  useEffect(() => {
    // if pointsCounter is greater then pointsThresholdValue then unlock next milestone
    if (activeMilestone && activeMilestone.pointsCounter >= activeMilestone.pointsThresholdValue) {
      const nextMilestone = personalMilestones.find(
        (personalMilestone) => !personalMilestone.isUnLocked && personalMilestone.id > activeMilestone.id
      )
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

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-nile-blue text-4xl font-bold">Hey, {user?.firstName || 'Dustin'}!</h1>
          <p className="text-regent-gray text-2xl leading-[120%] tracking-[0.45px]">Welcome back, nice to see you again!</p>
        </div>
        <div className="bg-titan-white w-14 h-14 border-[1.5px] border-soft-blue rounded-lg flex justify-center items-center">
          <Image src="/assets/icons/kebab-icon.svg" alt="moji gurukul menu" width={24} height={24} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 py-5">
        {/*//! 1st col */}
        <div className="w-full lg:w-[62%]">
          <div className="w-full border-[0.5px] border-dusty-gray rounded-2xl py-8 px-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <h4 className="text-nile-blue text-xl md:text-2.5xl font-normal tracking-[0.64px] leading-[120%]">Your Progress</h4>
                <CustomSelect
                  label="Select"
                  options={options}
                  value={selectedOption}
                  handleChange={(val) => setSelectedOption(val)}
                  width="160px"
                />
              </div>
              <p className="hidden md:block text-nile-blue text-lg font-normal tracking-[0.36px]">Level {level + 1}</p>
            </div>
            <div className="bg-indigo bg-student-dashboard-progress-bg bg-no-repeat bg-right bg-contain w-full h-32 rounded-[20px] flex gap-5 items-center px-6 my-8">
              <div className="bg-white w-[62px] h-16 rounded-lg flex justify-center items-center">
                <Image
                  src="/assets/icons/analytics-icon.svg"
                  alt="moji gurukul progress"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="w-[87%]">
                <p className="text-white text-xl font-normal leading-normal">Progress</p>
                <ProgressBar
                  progress={
                    // pointsCounter is current points
                    activeMilestone?.pointsCounter || 0
                  }
                  total={
                    // pointsThresholdValue is total points
                    activeMilestone?.pointsThresholdValue || 100
                  }
                  color="#22CC9B"
                />
                <div className="flex justify-between items-center">
                  <p className={classNames(poppins.className, 'text-white text-xs font-normal')}>{activeMilestone?.pointsCounter}</p>
                  <p className={classNames(poppins.className, 'text-white text-xs font-normal')}>{activeMilestone?.pointsThresholdValue}</p>
                </div>
                <p className={classNames(poppins.className, 'text-white text-xs font-normal mt-1')}>Reach your next level</p>
              </div>
            </div>
            {/* cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <PlainCard
                title="12"
                subTitle="Completed Lessons"
                icon="/assets/images/student/dashboard/lesson-activity.svg"
                color="green"
                className="bg-off-green border-lime-green"
              />
              <PlainCard
                title="12"
                subTitle="Completed Lessons"
                icon="/assets/images/student/dashboard/assignment-icon.svg"
                color="blue"
                className="bg-off-blue border-soft-blue"
              />
            </div>
            {/* Daily Streak */}
            <div className="border border-hot-pink rounded-2xl p-6 min-h-[215px] mt-8">
              <HorizontalStepper streak={streakList} />
            </div>
            {/* Skill Gained */}
            <div className="mt-8">
              <h5 className="text-nile-blue text-[28px] font-normal leading-[120%] tracking-[0.56px]">Skill Gained</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <SkillCard name={skill.name} image={skill.image} key={skill.name} className="max-w-[144px]" />
                ))}
              </div>
            </div>
          </div>
          {/* Assignments */}
          <div className="py-8">
            <BasicTable tableHeader={assignmentsTableHeader} tableData={assignmentsTableData} />
          </div>
        </div>
        {/*//! 2nd col */}
        <div className="w-full lg:w-[38%]">
          <div className="w-full border-[0.5px] border-dusty-gray rounded-2xl py-8 px-4 md:px-6 mb-8">
            {/* Games from Tutor */}
            <div>
              <div className="flex justify-between items-center gap-3 flex-wrap mb-4">
                <h5 className="text-nile-blue text-2xl font-normal leading-[120%] tracking-[0.56px]">Games from Tutor</h5>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {tutorGames.map((game, i) => (
                  <GameCard
                    name={game.name}
                    image={game.image}
                    key={game.name}
                    className="bg-soft-peach"
                    imageBgColor={i % 2 === 0 ? 'bg-hot-pink' : 'bg-dark-purple'}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Suggested Games */}
          <div className="w-full border-[0.5px] border-dusty-gray rounded-2xl py-8 px-4 md:px-6">
            <div className="flex justify-between items-center gap-3 flex-wrap mb-4">
              <h5 className="text-nile-blue text-2xl font-normal leading-[120%] tracking-[0.56px]">Suggested Games</h5>
              <Link href={'#'} className="hidden md:block text-nile-blue text-base font-normal tracking-[0.36px] underline">
                View all
              </Link>
            </div>
            <CustomInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} label="" size="small" type="search" />
            <div className="grid grid-cols-2 gap-4 mt-7">
              {suggestedGames.map((game, i) => (
                <GameCard
                  name={game.name}
                  image={game.image}
                  key={game.name}
                  className="bg-soft-peach"
                  imageBgColor={i % 2 === 0 ? 'bg-hot-pink' : 'bg-dark-purple'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

const options = [
  {
    name: 'Past 7 days',
    value: '7',
  },
  {
    name: 'Past 30 days',
    value: '30',
  },
]

const skills = [
  {
    name: 'Skill Name',
    image: '/assets/images/student/dashboard/skills/1.png',
  },
  {
    name: 'Skill Name',
    image: '/assets/images/student/dashboard/skills/2.png',
  },
  {
    name: 'Skill Name',
    image: '/assets/images/student/dashboard/skills/3.png',
  },
  {
    name: 'Skill Name',
    image: '/assets/images/student/dashboard/skills/4.png',
  },
]

const tutorGames = [
  {
    name: 'Game 1',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    name: 'Game 2',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    name: 'Game 3',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    name: 'Game 4',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
]

const suggestedGames = [
  {
    name: 'Game 1',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    name: 'Game 2',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
]

const assignmentsTableHeader = ['Name', 'Created', 'Deadline', 'Status']

const assignmentsTableData = [
  {
    Name: 'Algebra property assignments',
    Created: 'May 19',
    Deadline: 'May 20',
    Status: 'Open',
  },
  {
    Name: 'Algebra property assignments',
    Created: 'May 21',
    Deadline: 'May 22',
    Status: 'Done',
  },
  {
    Name: 'Algebra property assignments',
    Created: 'May 19',
    Deadline: 'May 20',
    Status: 'Done',
  },
]
