'use client'

import ProgressBar from '@/components/common/ProgressBar'
import { MilestoneResponseTypes } from '@/utils/types'
import Image from 'next/image'
import { useState } from 'react'
import Progress from '../Progress'
import Management from '../Management'
import LiveSessionTable from './LiveSessionTable'
import Calendar from './Calendar'

const Tutor = () => {
  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [selectedOption, setSelectedOption] = useState<string | undefined>('7')

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#753CBD] text-4xl font-bold">Tutor Dashboard</h1>

          <p className="text-regent-gray text-2xl leading-[120%] tracking-[0.45px]">Welcome back, nice to see you again!</p>
        </div>
        <button className="flex items-center bg-[#F1ECF8] justify-center md:min-w-[58px] md:min-h-[58px] min-h-[45px] min-w-[45px] md:w-[58px] w-[45px] md:h-[58px] h-[45px] rounded-lg border-[1.6px] border-purple text-purple hover:bg-purple-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.3"
            className="md:w-[28px] w-[24px] md:h-[28px] h-[24px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
          </svg>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-white shadow-lg flex items-center justify-between w-full ">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md w-full md:w-80">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="/img/profile.png" alt="Profile" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full object-cover" />
              <div className="absolute inset-0 border-2 border-green-400 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tutor Name</h3>
              <p className="text-xl font-semibold text-violet-600">$500</p>
              <div className="flex items-center gap-2">
                <p className="text-base text-[#22CC9B]">-$100</p>
                <p className="text-base text-red-500">-10%</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm md:text-lg text-green-600 font-normal">Task Completed</p>
              <p className="text-xs md:text-base font-normal text-green-600">70%</p>
            </div>
            <div className="w-full md:w-auto">
              <ProgressBar
                progress={activeMilestone?.pointsCounter || 70}
                total={activeMilestone?.pointsThresholdValue || 100}
                color="#22CC9B"
              />
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="flex items-center space-x-6">
          {StudentStrength.map((game: any) => (
            <div key={game.id} className="flex flex-col items-center justify-center ">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-lime-green rounded-full">
                <Image src="/assets/icons/critical-thinking.svg" alt="moji gurukul menu" width={24} height={24} />
              </div>
              <p className="mt-2 md:mt-4 text-sm md:text-lg font-medium text-gray-700">{game.name}</p>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="text-center w-40">
          <h4 className="text-xl font-normal">Progress Tracker</h4>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="w-4 h-4 rounded-full bg-[#22CC9B]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
            <div className="w-4 h-4 rounded-full bg-[#22CC9B]"></div>
            <div className="w-4 h-4 rounded-full bg-[#22CC9B]"></div>
            <div className="w-4 h-4 rounded-full bg-[#22CC9B]"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Lorem Ipsum is simply dummy text of the printing.</p>
        </div>
      </div>

      <Progress reduce={true} itemsPerPage={4} />

      <Management reduce={true} itemsPerPage={4} />

      <LiveSessionTable />

      <Calendar />
    </div>
  )
}

export default Tutor

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

const options = [
  {
    name: 'Group',
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
    name: 'Level 1',
    image: '/assets/level-icon.svg',
  },
  {
    id: '2',
    name: 'Level 2',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    id: '3',
    name: 'Level 3',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
  {
    id: '4',
    name: 'Level 4',
    image: '/assets/images/student/dashboard/game-2.svg',
  },
  {
    id: '5',
    name: 'Level 5',
    image: '/assets/images/student/dashboard/game-1.svg',
  },
]
