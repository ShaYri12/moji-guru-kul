import React from 'react'
import { FaClock } from 'react-icons/fa' // For clock icon

interface Meeting {
  type: string
  time: string
  color: string // Background color class for the meeting type
}

interface ScheduleDay {
  day: string
  date: string
  meetings: Meeting[]
}

const allDays: ScheduleDay[] = [
  { day: 'Sun', date: 'Jan 19', meetings: [] },
  { day: 'Mon', date: 'Jan 20', meetings: [] },
  { day: 'Tue', date: 'Jan 21', meetings: [] },
  { day: 'Wed', date: 'Jan 22', meetings: [] },
  { day: 'Thu', date: 'Jan 23', meetings: [] },
  { day: 'Fri', date: 'Jan 24', meetings: [] },
  { day: 'Sat', date: 'Jan 25', meetings: [] },
]

const sampleData: ScheduleDay[] = [
  {
    day: 'Sun',
    date: 'Jan 19',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Mon',
    date: 'Jan 20',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Tue',
    date: 'Jan 21',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Wed',
    date: 'Jan 22',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Thu',
    date: 'Jan 23',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Fri',
    date: 'Jan 24',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Sat',
    date: 'Jan 25',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
]

const ScheduleGrid = () => {
  // Merge sampleData into allDays, ensuring all days are present
  const mergedData = allDays.map((day) => {
    const existingDay = sampleData.find((d) => d.day === day.day)
    return existingDay || day
  })

  return (
    <div className="w-full overflow-x-auto">
      {/* Schedule grid container */}
      <div className="grid grid-cols-8 border-collapse border border-gray-200 border-b-0">
        {/* First row: GMT and Day labels */}
        <div className="text-center py-[10px]">
          <div className="text-gray-600 font-medium">GMT</div>
          <div className="text-gray-400 text-sm">+06</div>
        </div>
        {mergedData.map((day, dayIndex) => (
          <div key={dayIndex} className="text-center py-[10px] border border-b-0 border-gray-200">
            <div className="text-gray-600 font-medium">{day.day}</div>
            <div className="text-gray-400 text-sm">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Time and Meeting rows */}
      <div className="grid grid-cols-8 border-collapse border border-gray-200">
        {/* Time label */}
        <div className="flex items-center justify-center py-8 border border-gray-200">
          <div className="text-gray-500 font-medium text-center">1AM</div>
        </div>

        {/* Meeting columns */}
        {mergedData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col py-4 border border-gray-200">
            {/* Meetings */}
            <div className="flex flex-col space-y-2">
              {day.meetings.length > 0 ? (
                day.meetings.map((meeting, idx) => (
                  <div key={idx} className={`p-2 rounded-lg text-center w-fit mx-auto ${meeting.color}`}>
                    <div className="flex items-center justify-center space-x-1">
                      <FaClock className="w-4 h-4" />
                      <span className="text-sm font-semibold">{meeting.type}</span>
                    </div>
                    <div className="text-xs">{meeting.time}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm text-center">No Meeting</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleGrid
