// Modal.tsx
import Image from 'next/image'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { IoMdCheckmark } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

interface student {
  id: number
  name: string
  class: string
  avatarUrl: string
}

const students: student[] = [
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

const AddStudentModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('Class All')

  // Filter students based on both search and selected class
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase())
    const matchesClass = selectedClass === 'Class All' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

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

        <div className="max-w-6xl mx-auto rounded-lg lg:py-[32px] py-[26px] lg:px-[40px] px-[20px]">
          <div className="flex items-center justify-between xl:mb-[32px] mb-[20px] relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-[19px] px-[12px] border border-[#F1ECF8] md:text-[20px] text-[#B1AFB3] rounded-[8px] focus:outline-none"
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

          {/* student List */}
          <div className="space-y-4 max-h-[52vh] overflow-y-auto modal-scrollbar">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between bg-[#FAF8FC] p-[16px] rounded-[8px]">
                <div className="flex items-center">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="md:w-[48px] w-[38px] md:h-[48px] h-[38px] rounded-full mr-[16px]"
                  />
                  <div>
                    <p className="md:text-[24px] font-semibold text-gray-800">{student.name}</p>
                    <span className="md:text-[14px] text-[12px] px-[8.5px] w-max py-[4px] text-purple bg-[#F1ECF8] rounded-[4px]">
                      {student.class}
                    </span>
                  </div>
                </div>
                <button className="bg-[#A37CD3] md:text-[16px] text-[15px] md:py-[7px] py-[3px] md:px-[12px] px-[7px] rounded-[4px] focus:outline-none hover:bg-purple transition flex items-center gap-[1px] text-[#FFFFFF]">
                  Add{' '}
                  <span className="ml-1">
                    <IoMdCheckmark className="md:w-[13px] w-[12px] md:h-[13px] h-[12px]" />
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Send Button */}
          <div className="lg:mt-[32px] mt-6">
            <button
              className="w-full rounded-[8px] p-[14px] !text-[18px] !font-normal !text-[#fff] !bg-purple"
              onClick={() => {}}
              style={{
                boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
              }}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudentModal
