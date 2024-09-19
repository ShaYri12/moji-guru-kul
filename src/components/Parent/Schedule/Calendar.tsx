'use client'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1)

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
  }

  // Array containing live session data
  const liveSessions = [
    {
      title: 'Live Lesson',
      description: 'Carry out writing exams in school',
      date: '19 Jan',
      time: '06:30 AM - 11:30 AM',
    },
    {
      title: 'Live Workshop',
      description: 'Interactive Math Problem Solving',
      date: '21 Jan',
      time: '09:00 AM - 12:00 PM',
    },
    {
      title: 'Q&A Session',
      description: 'General Questions and Answers',
      date: '23 Jan',
      time: '03:00 PM - 05:00 PM',
    },
    {
      title: 'Q&A Session',
      description: 'General Questions and Answers',
      date: '28 Jan',
      time: '03:00 PM - 05:00 PM',
    },
  ]

  return (
    <div className="p-[16px] lg:p-[24px] w-[30%] border border-[#E0E0E0] bg-white rounded-[8px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[18px] font-[500] text-[#0A0B26] leading-[19.87px] tracking-[2%]">January 2024</h2>
        <div className="flex gap-[14px] text-purple-600">
          <button className="text-purple">
            <IoIosArrowBack size={16} />
          </button>
          <button className="text-purple">
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
            className={`pt-[5px] pb-[3px] text-[11px] w-full rounded-full transition ${
              selectedDate === day ? 'bg-purple text-white' : 'text-[#0A0B26] hover:bg-purple hover:bg-opacity-[0.6] hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Upcoming Section */}
      <div className="mt-[60px]">
        <h3 className="text-[26px] font-[500] tracking-[2%] leading-[32.57px] text-purple">Upcoming .</h3>
        <ul className="mt-[21px] space-y-[18px]">
          {/* Dynamically render each live session from the data array */}
          {liveSessions.map((session, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="space-y-[7px]">
                <p className="font-[500] text-[20px] text-[#3D3842] leading-[22.08px] tracking-[2%]">{session.title}</p>
                <p className="text-[#B1AFB3] text-[14px] font-[400] leading-[18.1px] tracking-[2%]">{session.description}</p>
              </div>
              <div className="text-right space-y-[5px]">
                <p className="text-purple text-[16px] leading-[18.1px] tracking-[2%] font-[500]">{session.date}</p>
                <p className="text-purple text-[12px] leading-[14.48px] font-[400] w-max">{session.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Calendar
