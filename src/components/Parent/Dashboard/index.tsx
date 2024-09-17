'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import CustomSelect from '@/components/common/CustomSelect'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useMilestoneStore } from '@/store/milestoneStore'
import { IconsEnum, LanguageEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  const [selectedOption, setSelectedOption] = useState<string | undefined>('7')

  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [level, setLevel] = useState<number>(0)
  const [selectedService, setSelectedService] = useState(2)

  const getStreak = useAuthStore((state) => state.getStreak)
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

  const locale = useLocale()

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-nile-blue text-4xl font-bold">Hey, {user?.firstName || 'Dustin'}!</h1>
          <p className="text-regent-gray text-2xl leading-[120%] tracking-[0.45px]">Welcome back, nice to see you again!</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-titan-white w-14 h-14 border-[1.5px] border-violet-700 rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
            <Image src="/assets/icons/bell-icon.svg" alt="moji gurukul menu" width={24} height={24} />
          </div>
          <Image
            className="hover:opacity-80 cursor-pointer"
            src="/assets/icons/eye-icon.svg"
            alt="moji gurukul menu"
            width={24}
            height={24}
          />
          <Image
            className="hover:opacity-80 cursor-pointer"
            src="/assets/icons/tooltip-icon.svg"
            alt="moji gurukul menu"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="flex justify-between items-center my-6">
        <div className="flex gap-6 items-center">
          <h4 className="text-nile-blue text-xl md:text-2.5xl font-medium tracking-[0.64px] leading-[120%]">Your Child Progress</h4>
        </div>
        <CustomSelect
          label="Select"
          options={options}
          value={selectedOption}
          handleChange={(val) => setSelectedOption(val)}
          width="140px"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.id}
            className="min-h-[142px] rounded-[15px] p-4 md:p-6 flex items-center gap-8 border-[1.5px] border-transparent shadow-tiles cursor-default"
            style={{
              borderColor: selectedService === feature.id ? colors[i] : 'transparent',
            }}
            onClick={() => setSelectedService(feature.id)}
          >
            <div className="w-[72%]">
              <h5 className="text-[#35343B] text-xl md:text-[20px] font-medium leading-[33.6px]">
                {locale === LanguageEnum.Te ? feature['title-te'] : feature.title}
              </h5>
              <p className="text-[#6D6A71] text-base md:text-lg font-normal leading-[150%] tracking-[0.4px]">
                {locale === LanguageEnum.Te ? feature['description-te'] : feature.content}
              </p>
            </div>
            <div>
              <Image src={feature.icon} alt="moji" width={80} height={80} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 my-6">
        {/*//! 1st col */}
        <div className="w-full lg:w-[50%]">
          <div className="w-full border-[0.5px] border-dusty-gray rounded-2xl py-8 px-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <h4 className="text-nile-blue text-xl md:text-2.5xl font-normal tracking-[0.64px] leading-[120%]">Certificates</h4>
              </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                  <Image src={certificate.icon} alt="moji" width={50} height={50} />
                  <p className="text-gray-500 text-xs">CERTIFICATE {certificate.year}</p>
                  <h3 className="text-violet-800 text-xl font-medium mt-2">{certificate.title}</h3>
                  <p className="text-sm text-gray-400 font-medium mt-1">ISSUED TO</p>
                  <p className="text-sm text-gray-900 font-medium">{certificate.issuedTo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*//! 2nd col */}
        <div className="w-full lg:w-[50%]">
          <div className="w-full border-[0.5px] border-dusty-gray rounded-2xl py-8 px-4 md:px-6 mb-8">
            {/* Games from Tutor */}
            <div>
              <div className="flex justify-between items-center gap-3 flex-wrap mb-4">
                <h4 className="text-nile-blue text-xl md:text-2.5xl font-normal">Student Rewards</h4>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {reward.map((feature, i) => (
                  <div
                    key={feature.id}
                    className="flex justify-center min-h-[134px] rounded-[15px] flex items-center gap-4 border-[1.5px] bg-off-green"
                  >
                    <div>
                      <Image src={feature.icon} alt="moji" width={80} height={80} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-6">
        <div className="my-6">
          <h5 className="text-xl md:text-2xl font-normal">Strength of Child Name</h5>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6">
          {StudentStrength.map((game) => (
            <div key={game.id} className="flex flex-col items-center justify-center w-24 h-28 md:w-36 md:h-40 bg-off-green rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-lime-green rounded-full">
                <Image src="/assets/icons/critical-thinking.svg" alt="moji gurukul menu" width={24} height={24} />
              </div>
              <p className="mt-2 md:mt-4 text-sm md:text-lg font-medium text-gray-700">Critical thinking</p>
            </div>
          ))}
        </div>
      </div>

      <div className="shadow-lg rounded-lg my-12">
        <div className="flex justify-between items-center px-6 py-2 bg-lime-green rounded-t-lg">
          <h1 className="text-2xl text-white font-normal flex-grow">Parent Tasks</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <CustomInput placeholder="Search here..." type="search" className="bg-white" />
            </div>
            <div className="bg-lime-green w-10 h-10 border-[2px] border-white rounded-xl flex justify-center items-center hover:opacity-80 cursor-pointer">
              <Image src="/assets/icons/plus-icon.svg" alt="moji gurukul menu" width={24} height={24} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <div className="w-full flex space-x-6 mb-4">
            <h3 className="text-lg font-semibold hover:opacity-80">All Task(2)</h3>
            <h3 className="text-lg font-medium text-gray-400 hover:opacity-80">Active Task(2)</h3>
            <h3 className="text-lg font-medium text-gray-400 hover:opacity-80">Completed(2)</h3>
            <h3 className="text-lg font-medium text-gray-400 hover:opacity-80">Due(2)</h3>
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between p-4 mb-4 border-2 border-off-green rounded-2xl bg-[#FBFEFD]"
            >
              <div className="flex items-center relative">
                <span
                  className="w-3 h-3 rounded-full absolute -left-6"
                  style={{ backgroundColor: ['#4ade80', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa'][i] }}
                ></span>
                <div className="mx-2">
                  <img src="/img/profile.png" alt="Profile" className="w-[60px] h-[60px]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-normal">Pack the bag</h3>
                  <p className="text-sm md:text-lg font-normal text-gray-500">Lorem Ipsum is simply dummy text printing</p>
                </div>
              </div>
              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Deadline:</p>
                <p className="text-base font-normal text-gray-500">May 20</p>
              </div>
              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Completed</p>
                <p className="text-base font-normal text-gray-500">May 20</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span
                  className={`px-4 py-2 text-base font-normal ${['bg-off-green text-lime-green', 'bg-violet-100 text-violet-700', 'bg-yellow-100 text-yellow-600', 'bg-blue-100 text-blue-600', 'bg-red-100 text-red-600'][i]}`}
                >
                  {['Done', 'Pending', 'Submitted', 'Active', 'Due'][i]}
                </span>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <span>2.55</span>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <button className="text-green-500 hover:opacity-80">✅</button>
                <button className="text-red-500 hover:opacity-80">❌</button>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <button className="text-gray-500 hover:opacity-80">•••</button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-gray-600 mb-4 md:mb-0 text-xs sm:text-sm md:text-base lg:text-lg">Total 5 Assignments</p>
            <div className="flex flex-wrap items-center justify-center md:justify-end">
              <CustomButton
                variant="outlined"
                color="white"
                className="mr-1 md:mr-4 px-3 sm:px-4 md:px-6 lg:px-8 !border-lime-green border-[1.5px] text-xs sm:text-xs md:text-base lg:text-lg text-lime-green rounded-lg !w-[60px] sm:!w-[90px] md:!w-[100px] lg:!w-[120px] !h-7 sm:!h-8 md:!h-10 hover:opacity-80"
                iconName={IconsEnum.LeftIcon}
              >
                Previous
              </CustomButton>

              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`px-2 sm:px-3 md:px-4 text-lime-green !w-[20px] sm:!w-[20px] md:!w-[50px] lg:!w-[60px] !h-7 sm:!h-8 md:!h-10 hover:opacity-80 ${
                    page === 1 ? '!bg-lime-green text-white rounded-l-lg' : '!bg-[#eeecfa] rounded-r-sm'
                  }`}
                >
                  {page}
                </button>
              ))}

              <CustomButton
                variant="outlined"
                color="white"
                className="ml-1 md:ml-4 px-3 sm:px-4 md:px-6 lg:px-8 !border-lime-green border-[1.5px] text-xs sm:text-xs md:text-base lg:text-lg text-lime-green rounded-lg !w-[70px] sm:!w-[80px] md:!w-[100px] lg:!w-[120px] !h-7 sm:!h-8 md:!h-10 hover:opacity-80"
                iconName={IconsEnum.RightIcon}
                iconPosition="end"
              >
                Next
              </CustomButton>
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

const StudentStrength = [
  {
    id: '1',
    name: 'Game 1',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    id: '2',
    name: 'Game 2',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    id: '3',
    name: 'Game 3',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    id: '4',
    name: 'Game 4',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    id: '5',
    name: 'Game 5',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    id: '6',
    name: 'Game 6',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    id: '7',
    name: 'Game 7',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
]

const colors = ['#22CC9B', '#EB4E59', '#4D9EFA', '#F29EEB', '#753CBD', '#FBCC58']
const borderColors = ['#C6F6E8', '#FAD1D4', '#CDE4FE', '#F9D2F6', '#C0A5E1', '#FEEFCB']

type FeatureType = {
  id: number
  title: string
  content: string
  icon: string
  'title-te': string
  'description-te': string
}

export const FEATURES: FeatureType[] = [
  {
    id: 1,
    title: 'Assignments On Time',
    content: 'Completed',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'గేమిఫైడ్ లెర్నింగ్',
    'description-te': 'లెర్నింగ్ అనేది ఇంటరాక్టివ్ గేమ్‌లతో ఆడుకుంటున్నట్లు ఉండేలా మేము ఒక ప్రపంచాన్ని సృష్టించాము.',
  },
  {
    id: 2,
    title: 'Topics Completed',
    content: 'Out of 50 Topic',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'పర్సనలైజ్డ్ లెర్నింగ్ మార్గాలు',
    'description-te': 'ఏ రెండు కలలు ఒకేలా ఉండవు. అందుకే మా స్టూడెంట్స్ యొక్క కెరీర్ ఆశలకు అనుగుణంగా మా లెస్సన్ లను తీర్చిదిద్దుతాం.',
  },
  {
    id: 3,
    title: 'Improved  Numeracy',
    content: 'Total',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'కార్యాచరణాత్మక ఇన్ సైట్ లు మరియు రిపోర్ట్ లు',
    'description-te': 'మా సమగ్ర రిపోర్ట్ లు లెర్నింగ్ ప్రాసెస్ ను సులభతరం చేస్తాయి, ఖచ్చితమైన, ఆచరణాత్మక దశలను అందిస్తాయి.',
  },
  {
    id: 4,
    title: 'Improved Literacy',
    content: 'Total',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'జీరో ప్రెషర్ అప్రోచ్',
    'description-te': 'మా వినూత్నమైన 15 నిమిషాల రోజువారీ పాఠాలు లెర్నింగ్ ను గరిష్టంగా పెంచడానికి రూపొందించబడ్డాయి.',
  },
  {
    id: 5,
    title: 'Total Games Time',
    content: '2 hour over the Limit',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'హోలిస్టిక్ గ్రోత్',
    'description-te': 'స్టూడెంట్స్ ను లైఫ్ కోసం సిద్ధం చేసే స్కిల్స్ మరియు విలువలను పెంపొందించడానికి మేము విద్యకు మించి వెళ్తాము.',
  },
  {
    id: 6,
    title: 'Total Platform Time',
    content: '1 Hour Bellow the Limit',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'షేర్డ్ లెర్నింగ్',
    'description-te': 'మిమ్మల్ని వాళ్ళతో దగ్గర చేసే యాక్టివిటీ లు మరియు ఇన్ సైట్ లతో మీ పిల్లల విద్యా ప్రయాణంలో భాగం అవ్వండి.',
  },
]

const certificates = [
  { id: 1, title: 'SCIENCE GRADE', year: 2024, issuedTo: 'TUTOR NAME', icon: '/assets/icons/certificate.svg' },
  { id: 2, title: 'SCIENCE GRADE', year: 2024, issuedTo: 'TUTOR NAME', icon: '/assets/icons/certificate.svg' },
  { id: 3, title: 'SCIENCE GRADE', year: 2024, issuedTo: 'TUTOR NAME', icon: '/assets/icons/certificate.svg' },
  { id: 4, title: 'SCIENCE GRADE', year: 2024, issuedTo: 'TUTOR NAME', icon: '/assets/icons/certificate.svg' },
]

const reward = [
  { id: 1, icon: '/assets/icons/reward.svg' },
  { id: 2, icon: '/assets/icons/reward.svg' },
  { id: 3, icon: '/assets/icons/reward.svg' },
  { id: 4, icon: '/assets/icons/reward.svg' },
  { id: 5, icon: '/assets/icons/reward.svg' },
  { id: 6, icon: '/assets/icons/reward.svg' },
  { id: 7, icon: '/assets/icons/reward.svg' },
  { id: 8, icon: '/assets/icons/reward.svg' },
  { id: 9, icon: '/assets/icons/reward.svg' },
  { id: 10, icon: '/assets/icons/reward.svg' },
  { id: 11, icon: '/assets/icons/reward.svg' },
  { id: 12, icon: '/assets/icons/reward.svg' },
]
