'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { IconsEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'
import Image from 'next/image'
import { useState } from 'react'

const Management = () => {
  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#753CBD] text-[56px] font-bold leading-[67px] tracking-[2%]">Management</h1>
        </div>
        <div className="bg-[#F1ECF8] w-[64px] h-[64px] border-[1.5px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
          <Image src="/assets/icons/dots.svg" alt="moji gurukul menu" width={24} height={24} />
        </div>
      </div>

      <div className="shadow-lg rounded-lg my-12 border border-[#F1ECF8]">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 rounded-t-lg">
          <h1 className="text-xl sm:text-[28px] tracking-[2%] font-medium text-[#753CBD]">Task Manage</h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 h-[40px]">
            <CustomButton
              variant="outlined"
              color={'white'}
              className="w-full sm:!w-[100px] !h-10 px-4 sm:px-6 !border-[#B1AFB3] border text-sm sm:text-base text-sliver rounded-lg"
              iconName={IconsEnum.FilterIcon}
            >
              Filter
            </CustomButton>

            <div className="w-full sm:w-auto h-[40px]">
              <CustomInput placeholder="Search here..." type="search" className="bg-white w-full sm:w-auto px-3" />
            </div>

            <div className="w-10 h-10 border-[2px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
              <Image src="/assets/icons/plus.svg" alt="moji gurukul menu" width={24} height={24} />
            </div>
          </div>
        </div>

        <hr />

        <div className="max-w-7xl mx-auto rounded-lg p-6">
          <div className="w-full flex flex-col md:flex-row md:space-x-6 mb-4">
            <div className="flex items-center space-x-8">
              <h3 className="text-base md:text-lg font-medium text-violet-600 border-b-4 border-violet-600 pb-2">All</h3>
              <h3 className="text-base md:text-lg font-medium text-gray-400 pb-2">Games (2)</h3>
              <h3 className="text-base md:text-lg font-medium text-gray-400 pb-2">Personal Task (2)</h3>
              <h3 className="text-base md:text-lg font-medium text-gray-400 pb-2">Material (2)</h3>
            </div>
          </div>
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="h-[80px] overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 mb-4 border border-[#F1ECF8] hover:border-[#753CBD] rounded-xl space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="flex items-center gap-3">
                <img src="/img/profile.png" alt="Profile" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] md:text-[20px] font-normal">Task Name</h3>
                  <div className="text-sm font-normal text-[#B1AFB3] -mt-1 flex items-center gap-1">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#753CBD] -mt-0.5"></div>Personal task
                  </div>
                </div>
              </div>

              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Class</p>
                <p className="text-base font-normal text-gray-400 -mt-1">6</p>
              </div>

              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Send</p>
                <p className="text-base font-normal text-gray-400 -mt-1">May 20</p>
              </div>

              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Deadline</p>
                <p className="text-base font-normal text-gray-400 -mt-1">May 20</p>
              </div>

              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Submitted</p>
                <p className="text-base font-normal text-gray-400 -mt-1">May 20</p>
              </div>
              <div className="mt-2 md:mt-0">
                <div className={'px-4 py-2 flex items-center gap-1.5 text-base font-medium text-[#22CC9B] bg-[#E9FAF5] rounded-md'}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#22CC9B] -mt-0.5"></div>
                  Done
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div className="flex items-center gap-1">
                  <Image src="/assets/icons/star-icon.svg" alt="moji gurukul menu" width={24} height={24} />
                  <p className="text-sm md:text-lg font-normal">2.55</p>
                </div>
              </div>

              <div className="w-full md:w-auto flex items-center gap-4">
                <Image src="/img/profile.png" alt="moji gurukul menu" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] md:text-[20px] font-normal">Student Name</h3>
                  <div className="text-sm font-normal text-[#B1AFB3] -mt-1">Student</div>
                </div>
              </div>

              <div className="flex items-center mt-2 md:mt-0">
                <button className="text-gray-500 text-[20px] hover:opacity-80">
                  <Image src="/assets/icons/more-v.svg" alt="icon" width={13} height={3} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-[#B1AFB3] text-xl mb-4 md:mb-0">Total 5 Assignment</p>
            <div className="flex flex-wrap items-center justify-center md:justify-end">
              <CustomButton
                variant="outlined"
                color="white"
                className="mr-2 md:mr-4  px-4 md:px-6 !border-[#753CBD] border-[1.5px] text-sm md:text-base text-violet-700 rounded-lg !w-[90px] md:!w-[100px] !h-8 md:!h-10 hover:opacity-80"
                iconName={IconsEnum.LeftIcon}
              >
                Previous
              </CustomButton>


              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`px-3 md:px-4 text-violet-500 !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${page === 1 ? '!bg-violet-600 text-white rounded-l-lg' : '!bg-[#eeecfa] rounded-r-sm'}`}
                >
                  {page}
                </button>
              ))}

              <CustomButton
                variant="outlined"
                color="white"
                className="ml-2 md:ml-4 px-4 md:px-6 !border-violet-700 border-[1.5px] text-sm md:text-base text-violet-700 rounded-lg !w-[70px] md:!w-[100px] !h-8 md:!h-10 hover:opacity-80"
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

export default Management

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
