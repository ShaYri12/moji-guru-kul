'use client'
import React, { useState } from 'react'
import Calendar from './Calendar'
import ScheduleGrid from './ScheduleGrid'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import CustomInput from '@/components/common/CustomInput'

const Schedule = () => {
  const [activeTab, setActiveTab] = useState<string>('Week')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="horizontal-spacing top-spacing mb-[50px] lg:mb-[100px]">
      <header className="bg-white">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <h1 className="text-purple text-[50px] lg:text-[56px] font-[700] leading-[67.2px] tracking-[2%]">Schedule</h1>
          {/* Ellipsis Menu */}
          <button className="flex items-center bg-[#F1ECF8] justify-center w-[58px] h-[58px] rounded-lg border-[1.6px] border-purple text-purple hover:bg-purple-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.3"
              className="w-[28px] h-[28px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center gap-2 mt-[24px]">
          {/* Month Selector */}
          <div className="flex items-center gap-[12px]">
            <p className="text-[#0A0B26] text-[32px] font-[500] leading-[35.9px] tracking-[2%]">January 2024</p>
            <div className="flex gap-[8px] text-black">
              <button>
                <MdKeyboardArrowLeft size={24} />
              </button>
              <button>
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="flex items-center">
            {['Day', 'Week', 'Month'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`cursor-pointer text-[16px] font-[500] leading-[16.41px] border-b ${activeTab === tab ? 'text-purple border-b-purple border-b-[4px]' : 'text-[#B1AFB3] border-b-[#D7D7D7]'} pb-[13px] px-[13px]`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-[16px]">
            {/* Search Bar */}
            <div className="w-full sm:w-auto">
              <CustomInput
                placeholder="Search here..."
                type="search"
                className="bg-white rounded-[8px] w-full sm:w-auto px-[12px] py-[11px] sm:py-0"
              />
            </div>

            {/* Create Schedule Button */}
            <button
              className="bg-purple text-white px-[18px] py-[10px] rounded-[8px] uppercase text-[13px] tracking-[2%] leading-[20px]"
              style={{
                boxShadow: `
      4px 4px 6px 0px #FFFFFF33 inset,
      -4px -4px 6px 0px #FFFFFF29 inset,
      4px 4px 6px 0px #00000029
    `,
              }}
            >
              CREATE SCHEDULE
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen flex mt-[30px] gap-[20px] lg:gap-[35px]">
        <Calendar />
        <ScheduleGrid />
      </div>
    </div>
  )
}

export default Schedule
