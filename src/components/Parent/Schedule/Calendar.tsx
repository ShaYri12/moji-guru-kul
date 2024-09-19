'use client'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1)

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
  }

  return (
    <div className="p-[16px] lg:p-[24px] w-[30%] border border-[#E0E0E0] bg-white rounded-[8px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[18px] font-[500] text-[#0A0B26] leading-[19.87px] tracking-[2%]">January 2024</h2>
        <div className="flex gap-[14px] text-purple-600">
          <button className="text-[#753CBD]">
            <IoIosArrowBack size={16} />
          </button>
          <button className="text-[#753CBD]">
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-[#0A0B26] text-opacity-[0.5] mb-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysInMonth.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`pt-[7.9px] pb-[6.2px] text-[11px] w-full rounded-full transition ${
              selectedDate === day ? 'bg-[#753CBD] text-white' : 'text-[#0A0B26] hover:bg-[#753CBD] hover:bg-opacity-[0.6] hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Upcoming Section */}
      <div className="mt-[60px]">
        <h3 className="text-[26px] font-[500] tracking-[2%] leading-[32.57px] text-[#753CBD]">Upcoming .</h3>
        <ul className="mt-[21px] space-y-[18px]">
          {/* Repeat event details */}
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="space-y-[7px]">
                <p className="font-[500] text-[20px] text-[#3D3842] leading-[22.08px] tracking-[2%]">Live Lesson</p>
                <p className="text-[#B1AFB3] text-[14px] font-[400] leading-[18.1px] tracking-[2%]">Carry out writing exams in school</p>
              </div>
              <div className="text-right space-y-[5px]">
                <p className="text-[#753CBD] text-[16px] leading-[18.1px] tracking-[2%] font-[500]">19 Jan</p>
                <p className="text-[#753CBD] text-[12px] leading-[14.48px] font-[400] w-max">06:30 AM - 11:30 AM</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Calendar
