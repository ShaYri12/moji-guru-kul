'use client'
import React, { useState } from 'react'
import Calendar from './Calendar'
import ScheduleGrid from './ScheduleGrid'

const Schedule = () => {
  // Lift the state to the parent component
  const [selectedDay, setSelectedDay] = useState<number | null>(1)
  console.log('selectedDay:', selectedDay)

  return (
    <div className="horizontal-spacing top-spacing mb-[50px] lg:mb-[100px]">
      <header className="bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-purple text-[38px] md:text-[50px] lg:text-[56px] font-[700] leading-[67.2px] tracking-[2%]">Schedule</h1>
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
      </header>
      <div className="flex lg:flex-row flex-col-reverse mt-[30px] gap-[20px] lg:gap-[15px]">
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <ScheduleGrid selectedDay={selectedDay} />
      </div>
    </div>
  )
}

export default Schedule
