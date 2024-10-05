'use client'
import React, { useState } from 'react'
import Dropdown from './Dropdown'
import Image from 'next/image'

interface Student {
  name: string
  className: string
  rank: number
  points: number
  isYou?: boolean
}

const students: Student[] = [
  { name: 'John Doe', className: 'Class 6', rank: 1, points: 400 },
  { name: 'Jane Smith', className: 'Class 6', rank: 2, points: 400 },
  { name: 'Sam Wilson', className: 'Class 6', rank: 3, points: 400 },
  { name: 'You', className: 'Class 6', rank: 4, points: 400, isYou: true },
  { name: 'Alex Johnson', className: 'Class 6', rank: 5, points: 400 },
  { name: 'Alex Johnson', className: 'Class 6', rank: 6, points: 400 },
  { name: 'Alex Johnson', className: 'Class 6', rank: 7, points: 400 },
  { name: 'Alex Johnson', className: 'Class 6', rank: 8, points: 400 },
  { name: 'Alex Johnson', className: 'Class 6', rank: 9, points: 400 },
  { name: 'Alex Johnson', className: 'Class 6', rank: 10, points: 400 },
]

// Dropdown
const options1 = ['Region', 'Group']
const options2 = ['Game Points', 'Total Points']
const options3 = ['Month', 'Week', 'All time']

const LeaderBoard = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }
  return (
    <div className="w-full horizontal-spacing top-spacing mb-[50px] lg:mb-[100px]">
      {/* Drop-downs */}
      <div className="flex sm:flex-row flex-col gap-5 items-center justify-between w-full">
        <div className="sm:w-fit w-full flex sm:flex-row flex-col items-center gap-5">
          <Dropdown
            title="Region"
            options={options1}
            isOpen={openDropdown === 'region'}
            customClass="bg-[#753CBD] text-white"
            onToggle={() => toggleDropdown('region')}
          />
          <Dropdown
            title="By Game Point"
            options={options2}
            isOpen={openDropdown === 'gamePoint'}
            onToggle={() => toggleDropdown('gamePoint')}
          />
        </div>
        <div className='w-full sm:w-fit'>
          <Dropdown title="Month" options={options3} isOpen={openDropdown === 'month'} onToggle={() => toggleDropdown('month')} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {/* Mapping through students */}
        {students.map((student) => (
          <div
            key={student.rank}
            className={`relative overflow-hidden flex items-center justify-between px-4 py-4 w-full rounded-[15px] ${
              student.rank === 1
                ? 'bg-[#F1FDF9] border-[0.5px] hover:border-[#22CC9B] border-[#F1ECF8] duration-300 transition cursor-pointer'
                : student.rank === 2
                  ? 'bg-[#FFFAEE] border-[0.5px] hover:border-[#FBCC58] border-[#F1ECF8] duration-300 transition cursor-pointer'
                  : student.rank === 3
                    ? 'bg-[#EDF5FF] border-[0.5px] hover:border-[#4D9EFA] border-[#F1ECF8] duration-300 transition cursor-pointer'
                    : 'bg-[#FFFFFF] border-[0.5px] border-[#F1ECF8] duration-300 transition cursor-pointer hover:border-[#EB4E59]'
                }`}
                >
            <div className="flex items-center gap-2">
            {student.rank > 3 && (
                <h2 className="text-[#3D3842] text-[20px] font-medium">{student.isYou ? '4th' : `${student.rank}th`}</h2>
            )}
              {student.rank <= 3 && (
                <Image
                  src={`/assets/icons/${student.rank === 1 ? 'first-rank' : student.rank === 2 ? 'sec-rank' : 'thi-rank'}.svg`}
                  alt={`${student.rank} rank`}
                  width={32}
                  height={40}
                />
              )}
              <Image src="/assets/icons/student-rank-profile.svg" alt="student-rank-profile" width={50} height={50} />
              <div>
                <h2 className="text-[#3D3842] text-[20px] font-medium tracking-[2%] leading-[24px]">{student.name}</h2>
                <div className="w-[57px] h-[23px] bg-[#E9E6F1] rounded flex items-center justify-center">
                  <h4 className="text-[#753CBD] text-sm font-medium">{student.className}</h4>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/assets/icons/rank-star.svg" alt="rank-star" width={14} height={14} />
              <h2 className="text-[#3D3842] mt-[3px] text-[20px] font-normal tracking-[2%]">{student.points}</h2>
            </div>
            {student.isYou && (
              <div className="flex items-center justify-center text-white text-xs w-[60px] h-[14px] -rotate-45 bg-[#753CBD] absolute top-2 -left-4">
                You
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderBoard
