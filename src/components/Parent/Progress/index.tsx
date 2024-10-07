'use client'
import CircularProgressBar from './CircularProgressBar'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import ProgressBar from '@/components/common/ProgressBar'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useMilestoneStore } from '@/store/milestoneStore'
import { IconsEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropup } from 'react-icons/io'
import { IoGameController } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import AddStudentModal from './AddStudentModal'
import CreateEventModal from './CreateEventModal'

const Progress = () => {
  const user = useAuthStore((state) => state.user)
  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [level, setLevel] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'student' | 'group'>('student')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 7
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle modal for 'Create Task'
  const handleAddStudent = () => {
    setIsDropdownOpen(false) // Close dropdown
    setIsModalOpen(true) // Open modal
  }

  const handleCreateEvent = () => {
    setIsDropdownOpen(false) // Close dropdown
    setIsEventModalOpen(true) // Open modal
  }

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false)
    setIsEventModalOpen(false)
  }

  const getStreak = useAuthStore((state) => state.getStreak)
  const setAlert = useErrorStore((state) => state.setAlert)
  const personalMilestones = useMilestoneStore((state) => state.personalMilestones)
  const getPersonalMilestones = useMilestoneStore((state) => state.getPersonalMilestones)
  const unlockMilestone = useMilestoneStore((state) => state.unlockMilestone)

  useEffect(() => {
    if (user) {
      getStreak(user.id)
      getPersonalMilestones(user.id)
    }
  }, [user])

  useEffect(() => {
    if (!personalMilestones.length) return
    const activeMilestone = personalMilestones.find(
      (personalMilestone) => personalMilestone.pointsCounter < personalMilestone.pointsThresholdValue && personalMilestone.isUnLocked
    )
    setActiveMilestone(activeMilestone)
    if (personalMilestones.length) {
      const firstMilestone = personalMilestones[0]
      if (!firstMilestone.isUnLocked && firstMilestone.pointsCounter >= firstMilestone.pointsThresholdValue) {
        unlockMilestone({
          id: firstMilestone.id,
          milestoneType: firstMilestone.milestoneType,
          totalPoints: 0,
        })
        user && getPersonalMilestones(user?.id)
      }
      const unlockedMilestones = personalMilestones.filter(
        (personalMilestones) => personalMilestones.isUnLocked && personalMilestones.pointsCounter >= personalMilestones.pointsThresholdValue
      )
      setLevel(unlockedMilestones.length)
    }
  }, [personalMilestones])

  useEffect(() => {
    if (activeMilestone && activeMilestone.pointsCounter >= activeMilestone.pointsThresholdValue) {
      const nextMilestone = personalMilestones.find(
        (personalMilestone) => !personalMilestone.isUnLocked && personalMilestone.id > activeMilestone.id
      )
      if (nextMilestone) {
        unlockMilestone({
          id: nextMilestone.id,
          milestoneType: nextMilestone.milestoneType,
          totalPoints: 0,
        })
        setAlert({ message: 'Congratulations! You have unlocked a new milestone', type: 'success' })
        user && getPersonalMilestones(user?.id)
      }
    }
  }, [activeMilestone])

  const handleTabChange = (tab: 'student' | 'group') => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  const sampleStudents = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    class: `Class ${(i % 6) + 1}`,
    progress: Math.floor(Math.random() * 200),
    totalPoints: (Math.random() * 5).toFixed(2),
  }))

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const sampleGroups = Array.from({ length: 20 }, (_, i) => {
    const randomDay = Math.floor(Math.random() * 28) + 1 // Random day between 1 and 28
    const randomMonth = Math.floor(Math.random() * 12) // Random month (0-11)

    return {
      id: i + 1,
      name: `Group ${i + 1}`,
      class: `${(i % 6) + 1}`,
      category: 'Category',
      createdDate: `${randomDay} ${months[randomMonth]}`, // Formatted date like '20 May'
      studentCount: Math.floor(Math.random() * 100) + 1, // Random number of students between 1 and 100
      mentorCount: Math.floor(Math.random() * 20) + 1, // Random number of mentors between 1 and 20
      status: Math.random() > 0.5 ? 'Active' : 'Inactive', // Random status
      images: [
        '/assets/images/landing-page/avater-1.svg',
        '/assets/images/landing-page/avater-2.svg',
        '/assets/images/landing-page/avater-3.svg',
      ],
    }
  })

  const getPaginatedData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil((activeTab === 'student' ? sampleStudents.length : sampleGroups.length) / itemsPerPage)

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-purple text-[38px] md:text-[50px] lg:text-[56px] font-[700] leading-[67.2px] tracking-[2%]">Progress</h1>
        </div>
        <button className="flex items-center bg-[#F1ECF8] justify-center md:min-w-[58px] md:min-h-[58px] min-h-[45px] min-w-[45px] md:w-[58px] w-[45px] md:h-[58px] h-[45px] rounded-lg border-[1.6px] border-purple text-purple hover:bg-purple-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.3"
            className="md:w-[28px] w-[24px] md:h-[28px] h-[24px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
          </svg>
        </button>
      </div>
      <div className="rounded-[15px] overflow-hidden my-12" style={{ boxShadow: '0px 0px 16px 0px #00000014' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-[15px] rounded-t-[15px]">
          <h1 className="text-[20px] sm:text-[28px] font-[500] tracking-[2%] leading-[33.6px] text-purple flex-grow mb-4 sm:mb-0">
            Student & Group
          </h1>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <CustomButton
                variant="outlined"
                color={'white'}
                className="w-full sm:!w-[100px] flex  !h-10 px-4 sm:px-6 !border-[#B1AFB3] border text-sm sm:text-base text-[#B1AFB3] rounded-[8px]"
                iconName={IconsEnum.FilterIcon}
              >
                Filter
              </CustomButton>
            </div>
            <div className="w-full sm:w-auto">
              <CustomInput
                placeholder="Search here..."
                type="search"
                className="bg-white rounded-[8px] w-full sm:w-auto px-[12px] py-[11px] sm:py-0"
              />
            </div>
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-10 h-10 border-[2px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer"
                onClick={toggleDropdown}
              >
                <Image src="/assets/icons/plus.svg" alt="moji gurukul menu" width={24} height={24} />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute mt-[20px] right-0 bg-white shadow-lg rounded-[8px] py-2 w-[240px] z-10"
                  style={{ boxShadow: '0px 0px 16px 0px #00000014' }}
                >
                  <IoMdArrowDropup className="absolute top-[-28px] right-[-1px]" color="white" size={40} />
                  <ul>
                    <li
                      onClick={handleAddStudent}
                      className="flex gap-[12px] items-center w-full px-[16px] py-[12px] hover:text-[#753CBD] text-[18px] font-[500] text-[#B1AFB3] leading-[20px] hover:bg-[#F1ECF8] hover:border hover:border-l-2 hover:border-l-[#753CBD] cursor-pointer"
                    >
                      <span className="min-w-[16px] min-h-[16px]">
                        <img className="w-[16px] h-[16px]" src="/assets/icons/task-icon.png" alt="Task Icon" />
                      </span>
                      Add Student
                    </li>
                    <li
                      onClick={handleCreateEvent}
                      className="flex gap-[12px] items-center w-full px-[16px] py-[12px] hover:text-[#753CBD] text-[18px] font-[500] text-[#B1AFB3] leading-[20px] hover:bg-[#F1ECF8] hover:border hover:border-l-2 hover:border-l-[#753CBD] cursor-pointer"
                    >
                      <span className="min-w-[16px] min-h-[16px]">
                        <IoGameController size={16} />
                      </span>
                      Create Event
                    </li>
                  </ul>
                </div>
              )}

              {/* Modal */}
              {isModalOpen && <AddStudentModal isOpen={isModalOpen} closeModal={closeModal} />}
              {isEventModalOpen && <CreateEventModal isOpen={isEventModalOpen} closeModal={closeModal} />}
            </div>
          </div>
        </div>

        <hr />

        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <div className="w-full flex flex-col md:flex-row md:space-x-6 mb-4">
            <h3
              onClick={() => handleTabChange('student')}
              className={`cursor-pointer text-base lg:text-lg font-medium border-b ${activeTab === 'student' ? 'text-purple border-b-purple border-b-[4px]' : 'text-[#B1AFB3] border-b-[#D7D7D7]'} pb-[13px] px-[23px]`}
            >
              Student
            </h3>
            <h3
              onClick={() => handleTabChange('group')}
              className={`cursor-pointer text-base lg:text-lg font-medium border-b ${activeTab === 'group' ? 'text-purple border-b-purple border-b-[4px]' : 'text-[#B1AFB3] border-b-[#D7D7D7]'} pb-[13px] px-[23px]`}
            >
              Group ({sampleGroups.length})
            </h3>
          </div>

          {activeTab === 'student' ? (
            <div>
              {getPaginatedData(sampleStudents).map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 border-2 border-off-green rounded-2xl bg-white space-y-4 md:space-y-0 md:space-x-4"
                >
                  <div className="flex items-center gap-[10px]">
                    <div className="mx-2 min-w-[48px] min-h-[48px] rounded-full">
                      <img
                        src="/assets/images/progress-profile.png"
                        alt="Profile"
                        className="w-[45px] h-[45px] md:w-[48px] md:h-[48px] rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-[18px] lg:text-[24px] font-[500] text-[#3D3842] tracking-[2%] leading-[28.8px]">
                        {student.name}
                      </h3>
                      <p className="text-xs lg:text-[14px] w-max font-normal">
                        <span className="px-[8.5px] w-max py-[4px] text-purple bg-[#F1ECF8] rounded-[4px]">{student.class}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Task Completed</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{student.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={student.progress} total={200} color="#22CC9B" bgColor="#BAEFE0" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Game Completed</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{student.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={student.progress} total={200} color="#4D9EFA" bgColor="#C8E1FD" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Join Live Lesson</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{student.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={student.progress} total={200} color="#FBCC58" bgColor="#FEEFCB" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                    <div>
                      <p className="text-sm lg:text-[16px] text-green-600 font-normal">Total Point</p>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <Image src="/assets/icons/star-icon.svg" className="mb-0" alt="moji gurukul menu" width={20} height={20} />
                      <p className="text-[18px] lg:text-[20px] lg:leading-[24px] tracking-[2%] text-[#110F24] font-normal">
                        {student.totalPoints}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex items-center gap-4">
                    <div className="flex items-center justify-center max-h-[56px]">
                      <CircularProgressBar progress={30} size={70} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm lg:text-[16px] text-[#3D3842] lg:leading-[17.66px] font-[400]">Total Progress</p>
                      <p className="text-xs lg:text-[14px] font-[400] lg:leading-[15.4px] text-[#B1AFB3]">30 days</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                <p className="text-gray-600 mb-4 md:mb-0">Total {sampleStudents.length} Students</p>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                  <button
                    className="mr-2 md:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-fit hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
                    Previous
                  </button>

                  <div className="rounded-[15px] overflow-hidden w-fit h-fit bg-[#F1ECF8]">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`px-3 md:px-[20px] text-purple !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${index + 1 === currentPage ? '!bg-purple text-white rounded-[15px]' : '!bg-[#eeecfa] rounded-r-sm'}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="ml-2 md:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                    <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {getPaginatedData(sampleGroups).map((group) => (
                <div
                  key={group.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 border border-[#F1ECF8] rounded-[15px] bg-white space-y-4 md:space-y-0 md:space-x-4"
                >
                  {/* Group Information */}
                  <div className="flex items-center gap-[10px]">
                    <div className="mx-2 min-w-[48px] min-h-[48px] rounded-full">
                      <img
                        src="/assets/images/progress-profile.png"
                        alt="Profile"
                        className="w-[45px] h-[45px] md:w-[48px] md:h-[48px] rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-[18px] lg:text-[24px] font-[500] text-[#3D3842] tracking-[2%] leading-[28.8px]">{group.name}</h3>
                      <p className="text-xs lg:text-[14px] w-max font-normal">
                        <span className="px-[8.5px] w-max py-[4px] text-purple bg-[#F1ECF8] rounded-[4px]">{group.category}</span>
                      </p>
                    </div>
                  </div>

                  {/* Class and Group Creation Date */}
                  <div className="flex flex-col items-start text-left gap-[4px]">
                    <p className="text-sm lg:text-[16px] text-[#3D3842] font-[500]">Class</p>
                    <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{group.class}</p>
                  </div>

                  <div className="flex flex-col items-start text-left gap-[4px]">
                    <p className="text-sm lg:text-[16px] text-[#3D3842] font-[500]">Group Created</p>
                    <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{group.createdDate}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center mb-[6px]">
                    <span className="px-3 py-[5px] flex items-center rounded-[4px] justify-center text-base tracking-[2%] font-normal bg-[#EDF5FF] text-[#4D9EFA]">
                      <span className=" mr-[-2px]">
                        <LuDot size={18} strokeWidth={5} />
                      </span>{' '}
                      Active
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex space-x-[-25px]">
                      {group.images.map((src: string, index: number) => (
                        <img key={index} src={src} className="w-[40px] h-[40px]" alt="Student" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm lg:text-[16px] text-[#3D3842] font-[400]">Total Student</p>
                      <p className="text-xs lg:text-[14px] font-[400] text-[#6C6060]">{group.studentCount}+ Student</p>
                    </div>
                  </div>

                  {/* Total Mentors */}
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-[-25px]">
                      {group.images.map((src: string, index: number) => (
                        <img key={index} src={src} className="w-[40px] h-[40px]" alt="Mentor" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm lg:text-[16px] text-[#3D3842] font-[400]">Total Mentor</p>
                      <p className="text-xs lg:text-[14px] font-[400] text-[#B1AFB3]">{group.mentorCount}+ Mentor</p>
                    </div>
                  </div>

                  {/* More Options */}
                  <div className="flex items-center w-[20px]">
                    <Image src="/assets/icons/threedots.svg" alt="moji gurukul menu" width={24} height={24} />
                  </div>
                </div>
              ))}

              <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                <p className="text-gray-600 mb-4 md:mb-0">Total {sampleGroups.length} Groups</p>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                  <button
                    className="mr-2 md:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-fit hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
                    Previous
                  </button>

                  <div className="rounded-[15px] overflow-hidden w-fit h-fit bg-[#F1ECF8]">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`px-3 md:px-[20px] text-purple !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${index + 1 === currentPage ? '!bg-purple text-white rounded-[15px]' : '!bg-[#eeecfa] rounded-r-sm'}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="ml-2 md:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                    <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Progress
