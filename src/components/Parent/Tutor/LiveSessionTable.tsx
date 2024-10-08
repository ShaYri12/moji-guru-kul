'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { IconsEnum } from '@/utils/enum'
import Image from 'next/image'
import React, { useState } from 'react'

// Mock data for each tab
const upcomingSessions = [
  {
    id: 1,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 2,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 5,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 8,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 9,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 11,
    taskName: 'Maths Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 6',
    duration: '9:00-10:00 > 1 Hour',
    status: 'In Progress',
    timeLeft: '12:44:28',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
]

const completedSessions = [
  {
    id: 3,
    taskName: 'Science Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 7',
    duration: '10:00-11:00 > 1 Hour',
    status: 'Done',
    timeLeft: '00:00:00',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 4,
    taskName: 'Science Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 7',
    duration: '10:00-11:00 > 1 Hour',
    status: 'Done',
    timeLeft: '00:00:00',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 6,
    taskName: 'Science Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 7',
    duration: '10:00-11:00 > 1 Hour',
    status: 'Done',
    timeLeft: '00:00:00',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 7,
    taskName: 'Science Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 7',
    duration: '10:00-11:00 > 1 Hour',
    status: 'Done',
    timeLeft: '00:00:00',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
  {
    id: 10,
    taskName: 'Science Basics',
    description: 'Learners are required to spend just 15 minutes each day, fitting',
    className: 'Class 7',
    duration: '10:00-11:00 > 1 Hour',
    status: 'Done',
    timeLeft: '00:00:00',
    groupName: 'Group Name',
    images: ['/assets/images/landing-page/avater-1.svg', '/assets/images/landing-page/avater-2.svg'],
  },
]

const tabs = [
  { label: 'Upcoming', count: upcomingSessions.length },
  { label: 'Completed', count: completedSessions.length },
]

const LiveSessionTable = ({ itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>('Upcoming')

  // Paginate data
  const getPaginatedData = (data: typeof upcomingSessions): typeof upcomingSessions => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Get data based on active tab
  const getTabData = () => {
    switch (activeTab) {
      case 'Upcoming':
        return upcomingSessions
      case 'Completed':
        return completedSessions
      default:
        return []
    }
  }

  const totalDataLength = getTabData().length
  const totalPages = Math.ceil(totalDataLength / itemsPerPage)
  const paginatedData = getPaginatedData(getTabData())

  return (
    <div className="rounded-[15px] my-[30px]" style={{ boxShadow: '0px 0px 16px 0px #00000014' }}>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-[15px] rounded-t-[15px]">
        <h1 className="text-[20px] sm:text-[28px] font-[500] tracking-[2%] leading-[33.6px] text-purple flex-grow mb-4 sm:mb-0">
          Live Session
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            <CustomButton
              variant="outlined"
              color={'white'}
              className="w-full sm:!w-[100px] flex  !h-10 px-4 sm:px-6 !border-[#B1AFB3] border text-sm sm:text-base text-[#B1AFB3] rounded-[8px]"
              iconName={IconsEnum.FilterIcon}
            >
              Filter
            </CustomButton>
          </div>
          <div className="w-full sm:w-auto">
            <CustomInput
              placeholder="Search here..."
              type="search"
              className="bg-white rounded-[8px] w-full sm:w-auto px-[12px] py-[11px] sm:py-0"
            />
          </div>
          <div className="w-10 h-10 border-[2px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
            <Image src="/assets/icons/plus.svg" alt="moji gurukul menu" width={24} height={24} />
          </div>
        </div>
      </div>

      <hr />

      <div className="max-w-6xl mx-auto rounded-lg p-6">
        {/* Tabs */}
        <div className="flex items-center gap-10 border-b border-[#F1ECF8] mb-4">
          {tabs.map((tab) => (
            <h3
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.label)
                setCurrentPage(1)
              }}
              className={`text-sm sm:text-lg font-medium cursor-pointer pb-2 ${
                activeTab === tab.label ? 'text-violet-600 font-bold border-b-4 border-violet-600' : 'text-[#B1AFB3]'
              }`}
            >
              {tab.label} {tab.count !== null && `(${tab.count})`}
            </h3>
          ))}
        </div>

        {/* Sessions */}
        {paginatedData.map((session, i) => (
          <div
            key={session.id}
            className="relative flex flex-col md:flex-row md:items-center justify-between p-4 mb-4 border border-[#F1ECF8] rounded-[15px] bg-white space-y-4 md:space-y-0 md:gap-4"
          >
            <div className="md:flex hidden absolute left-[-6.06px] top-1/2 rounded-full w-[10.35px] h-[10.29px] min-h-[10.29px] min-w-[10.29px] bg-[#22CC9B]"></div>
            <div className="relative flex items-center md:gap-[16px] gap-[8px] flex-wrap">
              <div className="md:hidden flex absolute left-[-16.06px] top-[21px] rounded-full w-[10.35px] h-[10.29px] min-h-[10.29px] min-w-[10.29px] bg-[#22CC9B]"></div>
              <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#753CBD] bg-opacity-[0.08]">
                <img src="/assets/icons/video-recording.png" alt="Profile" className="w-[24px] h-[24px]" />
              </div>
              <div>
                <h3 className="text-[18px] md:text-[20.57px] font-normal">{session.taskName}</h3>
                <p className="lg:w-[180px] text-[14px] font-normal text-[#B1AFB3]">{session.description}</p>
              </div>
            </div>

            <div className="text-left mt-2 md:mt-0">
              <p className="text-lg text-[#110F24] font-normal">Class</p>
              <p className="text-base font-normal text-[#B1AFB3]">{session.className}</p>
            </div>

            <div className="text-left mt-2 md:mt-0">
              <p className="text-lg text-[#110F24] font-normal">Duration</p>
              <p className="text-base font-normal text-[#B1AFB3]">{session.duration}</p>
            </div>

            <div className="mt-2 md:mt-0">
              <span className="px-4 py-2 text-base font-normal bg-[#E9FAF5] text-[#22CC9B] rounded-md flex items-center justify-center gap-[4px] min-w-[118px]">
                <div className="rounded-full w-[10.29px] h-[10.29px] min-h-[10.29px] min-w-[10.29px] bg-[#22CC9B]"></div> {session.status}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-[#753CBD] flex gap-2">
                {session.timeLeft.split(':').map((time, index) => (
                  <React.Fragment key={index}>
                    <span>{time}</span>
                    {index < 2 && <span>:</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-gray-500 text-xs gap-2">
                <span>HOUR</span>
                <span>MINUTES</span>
                <span>SECONDS</span>
              </div>
              <button
                className="w-full rounded-[8px] py-[6px] px-[20px] !text-[12px] !font-normal !text-[#fff] !bg-purple mt-[8px]"
                onClick={() => {}}
                style={{
                  boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
                }}
              >
                {session.status === 'Done' ? 'Review' : 'START'}
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex space-x-[-25px]">
                {session.images.map((src: string, index: number) => (
                  <img key={index} src={src} className="lg:w-[40px] lg:h-[40px] md:w-[30px] h-[30px] w-[40px] h-[40px]" alt="Mentor" />
                ))}
              </div>
              <div>
                <p className="text-sm lg:text-[16px] text-[#3D3842] font-[400]">{session.groupName}</p>
                <p className="text-xs lg:text-[14px] font-[400] text-[#B1AFB3]">Group</p>
              </div>
            </div>

            <div className="flex items-center min-w-[20px] w-[20px] mt-2 md:mt-0">
              <Image src="/assets/icons/threedots.svg" alt="moji gurukul menu" width={24} height={24} />
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mt-6 gap-2">
          <p className="text-gray-600 mb-4 md:mb-0">Total {totalDataLength} Sessions</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end md:gap-0 gap-2">
            <button
              className="mr-2 md:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-fit hover:opacity-80 flex items-center justify-center"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
              Previous
            </button>

            <div className="rounded-[15px] overflow-hidden w-fit h-fit bg-[#F1ECF8]">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 md:px-[20px] text-purple !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${index + 1 === currentPage ? '!bg-purple text-white rounded-[15px]' : '!bg-[#eeecfa] rounded-r-sm'}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="ml-2 md:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 flex items-center justify-center"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
              <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveSessionTable
