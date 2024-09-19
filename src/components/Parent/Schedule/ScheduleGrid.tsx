import React from 'react'
import { TbClockHour3Filled } from 'react-icons/tb'

interface Meeting {
  type: string
  time: string
  color: string
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
      { type: 'Meeting', time: '10.00-11.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Mon',
    date: 'Jan 20',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '10.00-11.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Tue',
    date: 'Jan 21',
    meetings: [
      { type: 'Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Meeting', time: '10.00-11.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
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

const timeSlots = ['1.00-2.00', '2.00-3.00', '3.00-4.00'] // Time slots in GMT+06

const convertToGMTPlus6 = (timeSlot: string): string => {
  const [start, end] = timeSlot.split('-')
  const [startHour, startMinute] = start.split('.').map(Number)
  const [endHour, endMinute] = end.split('.').map(Number)

  // Adjust the hours to GMT+06
  const adjustHour = (hour: number) => (hour + 6) % 24

  return `${adjustHour(startHour).toString().padStart(2, '0')}.${startMinute.toString().padStart(2, '0')}-${adjustHour(endHour).toString().padStart(2, '0')}.${endMinute.toString().padStart(2, '0')}`
}

const ScheduleGrid: React.FC = () => {
  // Merge sampleData into allDays, ensuring all days are present
  const mergedData = allDays.map((day) => {
    const existingDay = sampleData.find((d) => d.day === day.day)
    return existingDay || day
  })

  return (
    <div className="w-full overflow-x-auto">
      {/* Schedule grid container */}
      <div className="grid grid-cols-8 border-collapse border border-[#F1ECF8] border-b-0">
        {/* First row: GMT and Day labels */}
        <div className="text-center py-[10px]">
          <div className="text-gray-600 font-medium">GMT</div>
          <div className="text-gray-400 text-sm">+06</div>
        </div>
        {mergedData.map((day, dayIndex) => (
          <div key={dayIndex} className="text-center py-[10px] border border-b-0 border-[#F1ECF8]">
            <div className="text-gray-600 font-medium">{day.day}</div>
            <div className="text-gray-400 text-sm">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Time and Meeting rows */}
      {timeSlots.map((timeSlot) => (
        <div key={timeSlot} className="grid grid-cols-8 border-collapse border border-[#F1ECF8]">
          {/* Time label */}
          <div className="flex items-center justify-center py-8 border border-[#F1ECF8]">
            <div className="text-gray-500 font-medium text-center">{convertToGMTPlus6(timeSlot)}</div>
          </div>

          {/* Meeting columns */}
          {mergedData.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col py-4 border border-[#F1ECF8]">
              {/* Meetings */}
              <div className="flex flex-col space-y-2">
                {day.meetings.length > 0 ? (
                  day.meetings.map((meeting, idx) => (
                    <div key={idx} className={`p-[4px] rounded-[4px] text-left w-fit mx-auto ${meeting.color}`}>
                      <span className="text-sm font-semibold">{meeting.type}</span>

                      <div className="flex items-center justify-center gap-[4px]">
                        <span className="min-w-[14px] min-h-[14px] h-[14px] w-[14px]">
                          <TbClockHour3Filled size={14} />
                        </span>
                        <div className="text-xs font-[500] text-black">{meeting.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm text-center">No Meeting</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default React.memo(ScheduleGrid)
