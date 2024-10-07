'use client'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaCalendar, FaChevronDown, FaTimes } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import { IoTime } from 'react-icons/io5'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

interface Student {
  id: number
  name: string
  class: string
  avatarUrl: string
}

const students: Student[] = [
  { id: 1, name: 'John Doe', class: 'Class 6', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 2, name: 'Jane Doe', class: 'Class 7', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 3, name: 'John Doe', class: 'Class 8', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 4, name: 'Jane Doe', class: 'Class 6', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 5, name: 'John Doe', class: 'Class 8', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 6, name: 'Jane Doe', class: 'Class 6', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 7, name: 'John Doe', class: 'Class 7', avatarUrl: '/assets/images/progress-profile.png' },
  { id: 8, name: 'Jane Doe', class: 'Class 7', avatarUrl: '/assets/images/progress-profile.png' },
  // Add more students as needed
]

const CreateEventModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null
  const [activeTab, setActiveTab] = useState('event')
  const [search, setSearch] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState('Class All')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dateInput, setDateInput] = useState<string>('')
  const [timeInput1, setTimeInput1] = useState<string>('')
  const [timeInput2, setTimeInput2] = useState<string>('')

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value) // Update the state with the selected date
  }

  const handleTimeChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeInput1(e.target.value) // Update the state with the selected time
  }

  const handleTimeChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeInput2(e.target.value) // Update the state with the selected time
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter students based on search query and class
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase())
    const matchesClass = selectedClass === 'Class All' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  // Add student to the selected list
  const handleSelectStudent = (student: Student) => {
    if (!selectedStudents.find((s) => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student])
      setSearch('') // Clear search after selecting a student
    }
  }

  // Remove student from the selected list
  const handleRemoveStudent = (studentId: number) => {
    setSelectedStudents(selectedStudents.filter((s) => s.id !== studentId))
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg lg:max-w-[929px] w-full md:max-w-[600px] max-w-[90%] flex-grow rounded-[15px]">
        <div className="flex justify-between md:px-[24px] md:py-[24px] py-[15px] px-[18px] items-center border-b-[#EEEEEE] border-b overflow-hidden">
          <h1 className="text-[24px] lg:text-[36px] font-[500] text-purple leading-[48px] tracking-[2%] flex-grow">Add Student</h1>
          <button
            onClick={closeModal}
            className="md:w-[40px] w-[25px] md:h-[40px] h-[25px] rounded-full flex justify-center items-center transition hover:opacity-80 cursor-pointer"
          >
            <Image
              src="/assets/icons/cross-icon.svg"
              alt="close modal"
              width={30}
              height={30}
              className="md:w-[30px] md:h-[30px] w-[25px] h-[25px]"
            />
          </button>
        </div>

        <div className="max-w-6xl mx-auto py-[20px] px-[24px]">
          <div className="h-[60vh] overflow-y-auto modal-scrollbar">
            <div>
              <label className="block md:text-[24px] text-[17px] text-black tracking-[2%] font-medium mb-[4px]">Name</label>
              <input
                type="text"
                placeholder="Name of the event"
                className="w-full py-[11px] px-[12px] border border-[#F1ECF8] rounded-[8px] placeholder:text-[#B1AFB3] focus:outline-none bg-white"
              />
            </div>

            {/* Tabs for Event / Reminder */}
            <div className="w-full flex mt-[20px] mb-4">
              <h3
                onClick={() => setActiveTab('event')}
                className={`cursor-pointer text-base lg:text-[24px] font-medium border-b ${activeTab === 'event' ? 'text-purple border-b-purple border-b-[3px]' : 'text-[#B1AFB3] border-b-[#D7D7D7]'} pb-[8px] px-[15px]`}
              >
                Event
              </h3>
              <h3
                onClick={() => setActiveTab('reminder')}
                className={`cursor-pointer text-base lg:text-[24px] font-medium border-b ${activeTab === 'reminder' ? 'text-purple border-b-purple border-b-[3px]' : 'text-[#B1AFB3] border-b-[#D7D7D7]'} pb-[8px] px-[15px]`}
              >
                Reminder
              </h3>
            </div>

            {/* Color Selector */}
            <div className="flex items-center gap-[15px] my-[20px]">
              <label className="block md:text-[20px] text-[#3D3842] font-medium">Color</label>
              <div className="flex space-x-[8px]">
                {/* Use colored buttons for color selection */}
                <button className="w-[12px] h-[12px] bg-[#FFD51A] hover:border border-[#241F2B] rounded-full"></button>
                <button className="w-[12px] h-[12px] bg-[#22CC9B] hover:border border-[#241F2B] rounded-full"></button>
                <button className="w-[12px] h-[12px] bg-[#753CBD] hover:border border-[#241F2B] rounded-full"></button>
                <button className="w-[12px] h-[12px] bg-[#4D9EFA] hover:border border-[#241F2B] rounded-full"></button>
                <button className="w-[12px] h-[12px] bg-[#EB4E59] hover:border border-[#241F2B] rounded-full"></button>
                <button className="w-[12px] h-[12px] bg-[#F29EEB] hover:border border-[#241F2B] rounded-full"></button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block md:text-[24px] text-[17px] text-black tracking-[2%] font-medium mb-[4px]">Description</label>
              <textarea
                placeholder="Description"
                className="w-full py-[11px] px-[12px] border border-[#F1ECF8] text-[#B1AFB3] rounded-[8px] h-[139px]"
                rows={4}
              />
            </div>

            {/* Date Select */}
            <div>
              <label className="block md:text-[24px] text-[17px] text-black tracking-[2%] font-medium mb-[4px]">Date Select</label>
              <div className="flex flex-wrap items-center gap-[10px]">
                <div className="min-w-[155px] h-[40px]">
                  <div className="relative flex items-center">
                    {/* Calendar Icon on the left side */}
                    <FaCalendar
                      className={`w-[16px] h-[16px] absolute left-4 mt-[-1px] top-1/2 transform -translate-y-1/2 pointer-events-none text-purple`}
                    />
                    <input
                      type={dateInput ? 'date' : 'text'} // Switch to date type if date is selected
                      placeholder="Date" // Custom placeholder
                      className={`w-full py-[10px] pl-1 rounded-[8px] text-[16px] font-[400] leading-[19.6px] custom-date-input text-[#B1AFB3] bg-white border border-[#B1AFB3]`}
                      name="date"
                      value={dateInput}
                      onChange={handleDateChange}
                      onFocus={(e) => {
                        e.target.type = 'date'
                        e.target.showPicker()
                      }}
                      onBlur={(e) => !e.target.value && (e.target.type = 'text')} // Return to text if no date is selected
                    />
                  </div>
                </div>
                <span className="text-[#B1AFB3]">From</span>
                <div className="min-w-[120px] h-[40px]">
                  <div className="relative flex items-center">
                    <IoTime className="w-[16px] h-[16px] absolute left-4 mt-[-1px] top-1/2 transform -translate-y-1/2 pointer-events-none text-purple" />
                    <input
                      type="time"
                      className="w-full py-[10px] pl-1 rounded-[8px] text-[16px] font-[400] leading-[19.6px] custom-date-input text-[#B1AFB3] bg-white border border-[#B1AFB3]"
                      value={timeInput1}
                      onChange={handleTimeChange1}
                      onFocus={(e) => e.target.showPicker()} // Open the time picker modal
                    />
                  </div>
                </div>

                <span className="text-[#B1AFB3]">To</span>
                <div className="min-w-[120px] h-[40px]">
                  <div className="relative flex items-center">
                    <IoTime className="w-[16px] h-[16px] absolute left-4 mt-[-1px] top-1/2 transform -translate-y-1/2 pointer-events-none text-purple" />
                    <input
                      type="time"
                      className="w-full py-[10px] pl-1 rounded-[8px] text-[16px] font-[400] leading-[19.6px] custom-date-input text-[#B1AFB3] bg-white border border-[#B1AFB3]"
                      value={timeInput2}
                      onChange={handleTimeChange2}
                      onFocus={(e) => e.target.showPicker()} // Open the time picker modal
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Student Search and Selection */}
            <div>
              <label className="block md:text-[24px] text-[17px] text-black tracking-[2%] font-medium mb-[4px]">Add Student</label>
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center justify-between mb-[10px] relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-[19px] px-[12px] border border-[#F1ECF8] md:text-[20px] text-[#B1AFB3] rounded-[8px] focus:outline-none bg-white"
                  />
                  <div className="absolute right-[12px]">
                    <div className="relative">
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="p-[8px] pe-[40px] border border-[#B1AFB3] md:text-[18px] text-[#928F95] rounded-lg focus:outline-none appearance-none"
                      >
                        <option>Class All</option>
                        <option>Class 6</option>
                        <option>Class 7</option>
                        <option>Class 8</option>
                        {/* Add more options if needed */}
                      </select>
                      <div className="absolute right-[12px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <FaChevronDown className="text-[#928F95]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Display matching students */}
                {search && (
                  <ul className="absolute top-[-180px] left-0 z-10 bg-white border border-[#F1ECF8] shadow-lg rounded-lg mt-1 w-full max-h-40 overflow-y-auto">
                    {filteredStudents.map((student) => (
                      <li
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className="px-4 py-2 hover:bg-[#FAF9FA] cursor-pointer"
                      >
                        {student.name} ({student.class})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Selected Students */}
            {selectedStudents.length > 0 && (
              <div className="flex gap-[6px]" style={{ flexWrap: 'wrap' }}>
                {selectedStudents.map((student) => (
                  <div key={student.id} className="flex relative items-center justify-between bg-[#FAF9FA] p-[12px] rounded-lg gap-[6px]">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="md:w-[44px] w-[38px] md:h-[44px] h-[38px] rounded-full mr-[8px]"
                    />
                    <div>
                      <p className="md:text-[22px] pe-[9px] font-semibold">{student.name}</p>
                      <span className="md:text-[14px] text-[12px] px-[8.5px] w-max py-[4px] text-purple bg-[#F1ECF8] rounded-[4px]">
                        {student.class}
                      </span>
                    </div>
                    <IoIosCloseCircle
                      className="absolute top-[8px] right-[6px] text-[#6D6A71] cursor-pointer"
                      onClick={() => handleRemoveStudent(student.id)}
                      size={16}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lg:mt-[32px] mt-6 pb-[24px] px-[24px]">
          <button
            className="w-full rounded-[8px] p-[14px] !text-[18px] !font-normal !text-[#fff] !bg-purple uppercase tracking-[1px]"
            onClick={() => {}}
            style={{
              boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
            }}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateEventModal
