'use client'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

// Helper function to get the number of days in a given month and year
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const Calendar = () => {
  const [startDay, setStartDay] = useState<number | null>(16)
  const [endDay, setEndDay] = useState<number | null>(21)
  const [currentMonth, setCurrentMonth] = useState<number>(0) // 0 = January, 11 = December
  const [currentYear, setCurrentYear] = useState<number>(2024)

  const handleDateClick = (day: number) => {
    // If no start day is selected, set it as the start day
    if (!startDay) {
      setStartDay(day)
    } else if (!endDay && day > startDay) {
      // If start day is selected, but no end day, and the selected day is after the start day, set it as the end day
      setEndDay(day)
    } else {
      // Reset the selection
      setStartDay(day)
      setEndDay(null)
    }
  }

  // Handle month/year change
  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear((prevYear) => prevYear + 1)
      } else {
        setCurrentMonth((prevMonth) => prevMonth + 1)
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear((prevYear) => prevYear - 1)
      } else {
        setCurrentMonth((prevMonth) => prevMonth - 1)
      }
    }
    // Reset selected dates when month changes
    setStartDay(null)
    setEndDay(null)
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1)

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
    {
      title: 'Live Lesson',
      description: 'Carry out writing exams in school',
      date: '1 Jan',
      time: '06:30 AM - 11:30 AM',
    },
    {
      title: 'Live Workshop',
      description: 'Interactive Math Problem Solving',
      date: '6 Jan',
      time: '09:00 AM - 12:00 PM',
    },
    {
      title: 'Q&A Session',
      description: 'General Questions and Answers',
      date: '12 Jan',
      time: '03:00 PM - 05:00 PM',
    },
    {
      title: 'Q&A Session',
      description: 'General Questions and Answers',
      date: '15 Jan',
      time: '03:00 PM - 05:00 PM',
    },
  ]

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="flex flex-wrap gap-[24px] my-[50px] ">
      <div className="p-[16px] lg:p-[24px] flex-grow border border-[#F1ECF8] bg-white rounded-[8px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-[46px]">
          <h2 className="text-[24px] md:text-[32px] font-[500] text-[#0A0B26] tracking-[2%]">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-[14px] text-purple-600">
            <button className="text-purple" onClick={() => handleMonthChange('prev')}>
              <IoIosArrowBack className="md:w-[30px] md:h-[30px] w-[20px] h-[20px]" />
            </button>
            <button className="text-purple" onClick={() => handleMonthChange('next')}>
              <IoIosArrowForward className="md:w-[30px] md:h-[30px] w-[20px] h-[20px]" />
            </button>
          </div>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-2 text-center md:text-[19.43px] text-[#0A0B26] text-opacity-[0.5] mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2 text-center justify-items-center">
          {daysArray.map((day) => (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`md:min-w-[55px] md:w-[55px] flex md:h-[55px] md:min-h-[55px] min-w-[40px] w-[40px] flex h-[40px] min-h-[40px] md:text-[22px] flex items-center justify-center rounded-full transition ${
                startDay === day || endDay === day
                  ? 'bg-purple text-white'
                  : startDay && endDay && day > startDay && day < endDay
                    ? 'bg-purple bg-opacity-[0.1]' // Highlight dates between start and end
                    : 'text-[#0A0B26] hover:bg-purple hover:bg-opacity-[0.6] hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="p-[16px] lg:p-[24px] w-full lg:w-[29%] border border-[#F1ECF8] bg-white rounded-[8px]">
        {/* Upcoming Section */}
        <h3 className="text-[26px] md:text-[32px] font-[600] tracking-[2%] leading-[32.57px] text-purple">Upcoming .</h3>
        <ul className="mt-[21px] space-y-[18px]">
          {/* Dynamically render each live session that falls between the selected start and end dates */}
          {liveSessions
            .filter((session) => {
              const sessionDay = parseInt(session.date.split(' ')[0]) // Extract the day from session date
              return !startDay || !endDay || (sessionDay >= startDay && sessionDay <= endDay)
            })
            .map((session, index) => (
              <li key={index} className="flex justify-between items-center gap-2">
                <div className="space-y-[5px]">
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
