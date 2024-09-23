'use client'
import React, { useState } from 'react'
import Calendar from './Calendar'
import ScheduleGrid from './ScheduleGrid'

const Schedule = () => {
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
      </header>
      <div className="flex lg:flex-row flex-col-reverse mt-[30px] gap-[20px] lg:gap-[15px]">
        <Calendar />
        <ScheduleGrid />
      </div>
    </div>
  )
}

export default Schedule
