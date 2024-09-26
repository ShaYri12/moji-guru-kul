import CustomInput from '@/components/common/CustomInput'
import React, { useState, useEffect } from 'react'
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

const sampleData: ScheduleDay[] = [
  {
    day: 'Mon',
    date: 'Jan 1',
    meetings: [
      { type: 'Project Review', time: '7.00-8.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
      { type: 'Client Call', time: '9.00-10.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' },
    ],
  },
  {
    day: 'Tue',
    date: 'Jan 2',
    meetings: [],
  },
  {
    day: 'Wed',
    date: 'Jan 3',
    meetings: [{ type: 'Design Review', time: '7.00-8.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' }],
  },
  {
    day: 'Thu',
    date: 'Jan 4',
    meetings: [],
  },
  {
    day: 'Fri',
    date: 'Jan 5',
    meetings: [{ type: 'Client Call', time: '3.00-4.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Sat',
    date: 'Jan 6',
    meetings: [],
  },
  {
    day: 'Sun',
    date: 'Jan 7',
    meetings: [
      { type: 'Team Meeting', time: '9.00-10.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' },
      { type: 'Project Review', time: '10.00-11.00', color: 'bg-[#EDF5FF] text-[#4D9EFA]' },
    ],
  },
  {
    day: 'Mon',
    date: 'Jan 8',
    meetings: [{ type: 'Client Call', time: '3.00-4.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Tue',
    date: 'Jan 9',
    meetings: [],
  },
  {
    day: 'Wed',
    date: 'Jan 10',
    meetings: [],
  },
  {
    day: 'Thu',
    date: 'Jan 11',
    meetings: [{ type: 'Team Sync', time: '10.00-11.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Fri',
    date: 'Jan 12',
    meetings: [{ type: 'Client Meeting', time: '3.00-4.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Sat',
    date: 'Jan 13',
    meetings: [],
  },
  {
    day: 'Sun',
    date: 'Jan 14',
    meetings: [{ type: 'Planning Session', time: '10.00-11.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Mon',
    date: 'Jan 15',
    meetings: [],
  },
  {
    day: 'Tue',
    date: 'Jan 16',
    meetings: [{ type: 'Client Call', time: '11.00-12.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Wed',
    date: 'Jan 17',
    meetings: [],
  },
  {
    day: 'Thu',
    date: 'Jan 18',
    meetings: [],
  },
  {
    day: 'Fri',
    date: 'Jan 19',
    meetings: [{ type: 'Meating', time: '3.00-4.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Sat',
    date: 'Jan 20',
    meetings: [],
  },
  {
    day: 'Sun',
    date: 'Jan 21',
    meetings: [{ type: 'Review Session', time: '10.00-11.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Mon',
    date: 'Jan 22',
    meetings: [],
  },
  {
    day: 'Tue',
    date: 'Jan 23',
    meetings: [],
  },
  {
    day: 'Wed',
    date: 'Jan 24',
    meetings: [{ type: 'Planning Meeting', time: '10.00-11.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Thu',
    date: 'Jan 25',
    meetings: [],
  },
  {
    day: 'Fri',
    date: 'Jan 26',
    meetings: [{ type: 'Client Call', time: '3.00-4.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Sat',
    date: 'Jan 27',
    meetings: [],
  },
  {
    day: 'Sun',
    date: 'Jan 28',
    meetings: [{ type: 'Weekly Sync', time: '10.00-11.00', color: 'bg-[#E9FAF5] text-[#22CC9B]' }],
  },
  {
    day: 'Mon',
    date: 'Jan 29',
    meetings: [{ type: 'Final Review', time: '3.00-4.00', color: 'bg-[#FFE1E1] text-[#FF4D4D]' }],
  },
  {
    day: 'Tue',
    date: 'Jan 30',
    meetings: [],
  },
  {
    day: 'Wed',
    date: 'Jan 31',
    meetings: [],
  },
  {
    day: '',
    date: '',
    meetings: [],
  },
]

const ScheduleGrid: React.FC<{
  selectedDay: number | null
}> = ({ selectedDay }) => {
  const [activeTab, setActiveTab] = useState<string>('Week')

  // Update activeTab to 'Day' when selectedDay changes
  useEffect(() => {
    if (selectedDay !== null) {
      setActiveTab('Day')
    }
  }, [selectedDay])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const getDisplayedData = () => {
    switch (activeTab) {
      case 'Day':
        // Ensure selectedDay is a valid index for the sampleData array
        if (selectedDay !== null && selectedDay >= 0 && selectedDay < sampleData.length) {
          return [sampleData[selectedDay - 1]] // Return the specific day data
        }
        return [] // Return an empty array if no valid day is selected
      case 'Week':
        return sampleData.slice(0, 7) // Show the first week
      case 'Month':
        return sampleData // Show all days for the month
      default:
        return []
    }
  }

  const displayedData = getDisplayedData()

  const timeSlots = ['7.00-8.00', '8.00-9.00', '9.00-10.00', '10.00-11.00', '11.00-12.00', '3.00-4.00']

  const groupedData = []
  for (let i = 0; i < displayedData.length; i += 7) {
    groupedData.push(displayedData.slice(i, i + 7))
  }

  const filledGroupedData = groupedData.map((week) => {
    while (week.length < 7) {
      week.push({ day: '', date: '', meetings: [] }) // Placeholder for empty cells
    }
    return week
  })

  // Define the convertToGMTPlus6 function
  const convertToGMTPlus6 = (timeSlot: string): string => {
    const [start, end] = timeSlot.split('-')
    const [startHour, startMinute] = start.split('.').map(Number)
    const [endHour, endMinute] = end.split('.').map(Number)

    const adjustHour = (hour: number) => (hour + 6) % 24

    return `${adjustHour(startHour).toString().padStart(2, '0')}.${startMinute.toString().padStart(2, '0')}-${adjustHour(endHour).toString().padStart(2, '0')}.${endMinute.toString().padStart(2, '0')}`
  }

  return (
    <div className={`w-full ${activeTab === 'Month' ? 'overflow-x-auto' : ''}`}>
      <div className="w-full flex justify-between flex-wrap lg:items-center gap-4 pb-[24px]">
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
        <div className="w-full flex sm:w-fit items-center flex-wrap gap-[16px]">
          <div className="w-full sm:w-auto">
            <CustomInput
              placeholder="Search here..."
              type="search"
              className="bg-white rounded-[8px] w-full sm:w-auto px-[12px] py-[11px] sm:py-0"
            />
          </div>
          <button
            className="bg-purple text-white px-[18px] py-[10px] rounded-[8px] uppercase w-full sm:w-fit text-[13px] tracking-[2%] leading-[20px]"
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

      <div className={`w-full flex ${activeTab === 'Month' ? 'overflow-x-auto' : ''}`}>
        <div className={`w-full ${activeTab !== 'Week' ? (activeTab === 'Day' ? 'overflow-x-hidden' : 'overflow-x-auto') : ''}`}>
          <table
            className={`${activeTab === 'Day' || activeTab === 'Week' ? 'min-w-[320px]' : 'min-w-[130px]'} w-full border-collapse border border-[#F1ECF8]`}
          >
            <thead>
              <tr>
                {activeTab !== 'Month' && (
                  <th className={`py-[10px] ${activeTab === 'Week' ? 'min-w-[10px]' : 'min-w-[65px]'} border border-[#F1ECF8]`}>
                    <div
                      className={`${activeTab === 'Week' ? 'xl:text-[16px] lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw]' : ''} text-gray-600 font-medium`}
                    >
                      GMT
                    </div>
                    <div
                      className={`${activeTab === 'Week' ? 'xl:text-sm lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw]' : 'text-sm'} text-gray-400`}
                    >
                      +06
                    </div>
                  </th>
                )}
                {filledGroupedData[0].map((day, index) => (
                  <th
                    key={index}
                    className={`${activeTab === 'Week' ? 'min-w-[10px]' : 'min-w-[120px]'} py-[10px] border border-[#F1ECF8] text-center`}
                  >
                    <div
                      className={`${activeTab === 'Week' ? 'xl:text-[16px] lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw]' : ''} text-gray-600 font-medium`}
                    >
                      {day.day}
                    </div>
                    <div
                      className={`${activeTab === 'Week' ? 'xl:text-sm lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw]' : 'text-sm'} text-gray-400`}
                    >
                      {day.date}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Render for Day or Week tabs */}
              {['Day', 'Week'].includes(activeTab)
                ? timeSlots.map((timeSlot, slotIndex) => (
                    <tr key={slotIndex} className="border border-t-0 border-[#F1ECF8]">
                      <td
                        className={`${activeTab === 'Week' ? 'min-w-[10px] md:py-8 py-4' : 'min-w-[65px] py-8'} border border-[#F1ECF8] text-center`}
                      >
                        <div
                          className={`${activeTab === 'Week' ? 'xl:text-[16px] lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw]' : ''} text-gray-500 font-medium`}
                        >
                          {convertToGMTPlus6(timeSlot)}
                        </div>
                      </td>
                      {filledGroupedData[0].map((day, dayIndex) => (
                        <td
                          key={dayIndex}
                          className={`${activeTab === 'Week' ? 'min-w-[20px] sm:py-4 sm:px-2 py-0 px-0 min-h-[10px]' : 'min-w-[120px] py-4 px-2'} border border-[#F1ECF8] text-center`}
                        >
                          {day.meetings.some((meeting) => meeting.time === timeSlot) ? (
                            day.meetings
                              .filter((meeting) => meeting.time === timeSlot)
                              .map((meeting, idx) => (
                                <div
                                  key={idx}
                                  className={`${activeTab === 'Week' ? 'sm:p-2 p-1' : 'p-2'} rounded-md w-fit mx-auto ${meeting.color}`}
                                >
                                  <span
                                    className={`block ${activeTab === 'Week' ? 'xl:text-sm lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw] min-w-[20px]' : ''} font-semibold`}
                                  >
                                    {meeting.type}
                                  </span>
                                  <div
                                    className={`flex items-center justify-center ${activeTab === 'Week' ? 'xl:text-xs lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw] min-w-[20px] sm:gap-[4px]' : 'gap-[4px]'}`}
                                  >
                                    <TbClockHour3Filled
                                      className={`${activeTab === 'Week' ? 'xl:text-xs lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw] xl:mt-[-1px] sm:mt-[-2px] mt-[-1px]' : ''}`}
                                    />
                                    <span className="font-[500] text-black">{meeting.time}</span>
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div
                              className={`text-gray-400 ${activeTab === 'Week' ? 'xl:text-sm lg:text-[1.2vw] md:text-[1.6vw] sm:text-[1.4vw] text-[1.8vw] min-w-[20px]' : ''}`}
                            >
                              {day.date ? 'No Meeting' : ''}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                : /* Render for Month tab */
                  filledGroupedData.map((week, weekIndex) => (
                    <tr key={weekIndex} className="border border-t-0 border-[#F1ECF8]">
                      {week.map((day, dayIndex) => (
                        <td key={dayIndex} className="min-w-[120px] border border-[#F1ECF8] py-4 px-2 text-center">
                          <div className="text-gray-400 text-sm">{day.date || ''}</div>
                          {day.meetings.length > 0 ? (
                            day.meetings.map((meeting, idx) => (
                              <div key={idx} className={`p-2 rounded-md w-fit mx-auto ${meeting.color}`}>
                                <span className="block text-sm font-semibold">{meeting.type}</span>
                                <div className="flex items-center justify-center gap-[4px]">
                                  <TbClockHour3Filled size={14} />
                                  <span className="text-xs font-[500] text-black">{meeting.time}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-400 text-sm">{day.date ? 'No Meeting' : ''}</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGrid
