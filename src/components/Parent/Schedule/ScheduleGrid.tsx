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

interface ScheduleGridProps {
  activeTab: string
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

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ activeTab }) => {
  // Filter the data based on the activeTab
  let filteredData = sampleData
  if (activeTab === 'Day') {
    // Show today's data only (for example, day 'Sun')
    filteredData = sampleData.slice(0, 1)
  } else if (activeTab === 'Month') {
    // Show data for the entire month (no filtering)
    filteredData = sampleData
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-8 border-collapse border border-[#F1ECF8] border-b-0">
        <div className="text-center py-[10px]">
          <div className="text-gray-600 font-medium">GMT</div>
          <div className="text-gray-400 text-sm">+06</div>
        </div>
        {filteredData.map((day, dayIndex) => (
          <div key={dayIndex} className="text-center py-[10px] border border-b-0 border-[#F1ECF8]">
            <div className="text-gray-600 font-medium">{day.day}</div>
            <div className="text-gray-400 text-sm">{day.date}</div>
          </div>
        ))}
      </div>

      {timeSlots.map((timeSlot) => (
        <div key={timeSlot} className="grid grid-cols-8 border-collapse border border-[#F1ECF8]">
          <div className="flex items-center justify-center py-8 border border-[#F1ECF8]">
            <div className="text-gray-500 font-medium text-center">{convertToGMTPlus6(timeSlot)}</div>
          </div>
          {filteredData.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col py-4 border border-[#F1ECF8]">
              <div className="flex flex-col space-y-2">
                {day.meetings.length ? (
                  day.meetings.map((meeting, meetingIndex) => (
                    <div key={meetingIndex} className={`rounded-md p-[10px] px-[12px] flex items-center gap-2 w-fit ${meeting.color}`}>
                      <TbClockHour3Filled size={20} />
                      <div>
                        <p className="text-[12px] leading-[15px] tracking-[2%] font-medium">{meeting.type}</p>
                        <p className="text-[10px] leading-[12px] tracking-[2%]">{meeting.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-center text-sm">No Meetings</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ScheduleGrid
