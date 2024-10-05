'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { IconsEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'
import Modal from './Modal'
import { IoGameController } from 'react-icons/io5'
import { IoMdArrowDropup } from 'react-icons/io'
import MaterialsModal from './MaterialsModal'

const sampleStudents = [
  {
    taskName: 'Game Name',
    personalTask: 'Science',
    imgSrc: '/assets/icons/game-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Done',
    rating: 4,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Game Name',
    personalTask: 'Science',
    imgSrc: '/assets/icons/game-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Pending',
    rating: 7,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Game Name',
    personalTask: 'Science',
    imgSrc: '/assets/icons/game-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 9,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Game Name',
    personalTask: 'Science',
    imgSrc: '/assets/icons/game-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'New',
    rating: 1,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
]

const samplePersonalTasks = [
  {
    taskName: 'Task Name',
    imgSrc: '/assets/icons/personal-tab-image.svg',
    personalTask: 'Personal Task',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'New',
    rating: 2,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Task Name',
    personalTask: 'Personal Task',
    imgSrc: '/assets/icons/personal-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 6,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Task Name',
    personalTask: 'Personal Task',
    imgSrc: '/assets/icons/personal-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Pending',
    rating: 10,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
]

const sampleMaterials = [
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'New',
    rating: 1,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    personalTask: 'Topic',
    imgSrc: '/assets/icons/material-tab-image.svg',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Pending',
    rating: 3,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 5,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 7,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 4,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 9,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 8,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 4,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 3,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 0,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 1,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 10,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 8,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 4,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
  {
    taskName: 'Materials Name',
    imgSrc: '/assets/icons/material-tab-image.svg',
    personalTask: 'Topic',
    className: '6',
    sendDate: '10 May, 24',
    deadline: '12 May, 24',
    submittedDate: '14 May, 24',
    status: 'Submited',
    rating: 5,
    studentName: 'Student Name',
    studentRole: 'Student',
  },
]

const itemsPerPage = 7

const tabs = [
  { label: 'Games', count: sampleStudents.length },
  { label: 'Personal Task', count: samplePersonalTasks.length },
  { label: 'Material', count: sampleMaterials.length },
]

const Management = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>('Personal Task')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
  const handleCreateTask = () => {
    setIsDropdownOpen(false) // Close dropdown
    setIsModalOpen(true) // Open modal
  }

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Function to get paginated data
  const getPaginatedData = (data: typeof sampleStudents): typeof sampleStudents => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Function to get data based on active tab
  const getTabData = () => {
    switch (activeTab) {
      case 'Games':
        return sampleStudents
      case 'Personal Task':
        return samplePersonalTasks
      case 'Material':
        return sampleMaterials
      default:
        return []
    }
  }

  // Calculate total pages based on tab data length
  const totalDataLength = getTabData().length
  const totalPages = Math.ceil(totalDataLength / itemsPerPage)

  // Get data for the current page
  const paginatedData = getPaginatedData(getTabData())

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return {
          bgColor: 'bg-[#E9FAF5]',
          textColor: 'text-[#22CC9B]',
          dotColor: 'bg-[#22CC9B]',
        }
      case 'pending':
        return {
          bgColor: 'bg-[#F1ECF8]',
          textColor: 'text-[#753CBD]',
          dotColor: 'bg-[#753CBD]',
        }
      case 'submitted':
        return {
          bgColor: 'bg-[#FFFAEE]',
          textColor: 'text-[#FBCC58]',
          dotColor: 'bg-[#FBCC58]',
        }
      case 'new':
        return {
          bgColor: 'bg-[#EDF5FF]',
          textColor: 'text-[#4D9EFA]',
          dotColor: 'bg-[#4D9EFA]',
        }
      default:
        return {
          bgColor: 'bg-[#FFFAEE]',
          textColor: 'text-[#FBCC58]',
          dotColor: 'bg-[#FBCC58]',
        }
    }
  }

  //
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false)

  // Step 3: Function to toggle modal visibility
  const handleOpenModal = () => {
    setIsMaterialsOpen(true)
  }

  const handleCloseModal = () => {
    setIsMaterialsOpen(false)
  }

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#753CBD] text-[40px] sm:text-[56px] font-bold sm:leading-[67px] tracking-[2%]">Management</h1>
        </div>
        <div className="bg-[#F1ECF8] w-[64px] h-[64px] border-[1.5px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
          <Image src="/assets/icons/dots.svg" alt="moji gurukul menu" width={24} height={24} />
        </div>
      </div>

      <div className="shadow-lg rounded-lg my-12 border border-[#F1ECF8]">
        <div className="flex flex-wrap gap-4 justify-between items-center px-4 sm:px-6 py-4 rounded-t-lg">
          <h1 className="text-xl sm:text-[28px] tracking-[2%] font-medium text-[#753CBD]">Tasks Management</h1>
          <div className="flex flex-wrap justify-center items-center gap-3 ">
            <CustomButton
              variant="outlined"
              color={'white'}
              className="w-full sm:!w-[100px] !h-10 px-4 sm:px-6 !border-[#B1AFB3] border text-sm sm:text-base text-sliver rounded-lg"
              iconName={IconsEnum.FilterIcon}
            >
              Filter
            </CustomButton>

            <div className="w-full sm:w-auto -mt-1">
              <CustomInput placeholder="Search here..." type="search" className="bg-white w-full sm:w-auto px-3" />
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
                  className="absolute mt-[20px] -right-16 sm:right-0 bg-white shadow-lg rounded-[8px] py-2 w-[240px] z-10"
                  style={{ boxShadow: '0px 0px 16px 0px #00000014' }}
                >
                  <IoMdArrowDropup className="absolute top-[-25px] right-[3.75rem] sm:right-[-1px]" color="white" size={40} />
                  <ul>
                    <li
                      onClick={handleCreateTask}
                      className="flex gap-[12px] items-center w-full px-[16px] py-[12px] hover:text-[#753CBD] text-[18px] font-[500] text-[#B1AFB3] leading-[20px] hover:bg-[#F1ECF8] hover:border hover:border-l-2 hover:border-l-[#753CBD] cursor-pointer"
                    >
                      <span className="min-w-[16px] min-h-[16px]">
                        <img className="w-[16px] h-[16px]" src="/assets/icons/task-icons.svg" alt="Task Icon" />
                      </span>
                      Create Task
                    </li>

                    <li
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex gap-[12px] items-center w-full px-[16px] py-[12px] hover:text-[#753CBD] text-[18px] font-[500] text-[#B1AFB3] leading-[20px] hover:bg-[#F1ECF8] hover:border hover:border-l-2 hover:border-l-[#753CBD] cursor-pointer"
                    >
                      <span className="min-w-[16px] min-h-[16px]">
                        <IoGameController size={16} />
                      </span>
                      Create Game
                    </li>

                    <li
                      onClick={handleOpenModal}
                      className="flex gap-[12px] items-center w-full px-[16px] py-[12px] hover:text-[#753CBD] text-[18px] font-[500] text-[#B1AFB3] leading-[20px] hover:bg-[#F1ECF8] hover:border hover:border-l-2 hover:border-l-[#753CBD] cursor-pointer"
                    >
                      <span className="min-w-[16px] min-h-[16px]">
                        <img className="w-[16px] h-[16px]" src="/assets/icons/material-icon.png" alt="Materials Icon" />
                      </span>
                      Create Materials
                    </li>
                    {isMaterialsOpen && (
                      <div className="pt-[600px] py-5 hide-scrollbar overflow-y-scroll w-full px-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 ">
                        <div className="mx-auto w-full hide-scrollbar overflow-y-scroll max-w-[929px] bg-white rounded-[15px]">
                          <div className="flex justify-between items-center py-4 p-5 border-b-[#EEEEEE] border-b">
                            <h1 id="modal-title" className="text-[36px] font-[500] text-purple leading-[48px] tracking-[2%] flex-grow">
                              Materials
                            </h1>
                            <button
                              onClick={handleCloseModal}
                              className="w-[40px] h-[40px] rounded-xl flex justify-center items-center transition hover:opacity-80 cursor-pointer"
                              aria-label="Close Modal"
                            >
                              <Image src="/assets/icons/cross-icon.svg" alt="close modal" width={30} height={30} />
                            </button>
                          </div>

                          <div className="py-8">
                            <MaterialsModal />
                          </div>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              )}

              {/* Modal */}
              {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} />}
            </div>
          </div>
        </div>
        <hr />
        <div className="max-w-7xl mx-auto rounded-lg px-2.5 py-6 sm:p-6">
          {/* Tabs */}
          <div className="w-full flex flex-col md:flex-row md:space-x-6 mb-4">
            <div className="flex items-center gap-10 border-b border-gray-300">
              {tabs.map((tab) => (
                <h3
                  key={tab.label}
                  onClick={() => {
                    setActiveTab(tab.label)
                    setCurrentPage(1)
                  }}
                  className={`text-sm sm:text-lg font-medium cursor-pointer pb-2 ${
                    activeTab === tab.label ? 'text-violet-600 font-bold border-b-4 border-violet-600' : 'text-gray-400'
                  }`}
                >
                  {tab.label} {tab.count !== null && `(${tab.count})`}
                </h3>
              ))}
            </div>
          </div>

          {paginatedData.map((task, i) => (
            <div
              key={i}
              className="w-full mb-5 px-5 sm:px-3.5 py-5 sm:py-3.5 sm:flex-row flex-col lg:flex-nowrap flex-wrap  flex gap-5 items-center justify-between text-nowrap border border-[#F1ECF8] hover:border-[#753CBD] rounded-xl"
            >
              <div className="sm:w-fit w-full flex items-center justify-center gap-1.5 sm:gap-3">
                <img src={task.imgSrc} alt="Profile" className="w-[35px] h-[35px] sm:w-[48px] sm:h-[48px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-normal">{task.taskName}</h3>
                  <div className="text-base font-normal text-[#B1AFB3] -mt-1 flex items-center gap-1">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#753CBD] -mt-0.5"></div>
                    {task.personalTask}
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-fit flex items-center sm:gap-10 justify-between">
                <div className="text-left md:text-center">
                  <p className="text-base sm:text-lg text-green-600 font-normal">Class</p>
                  <p className="text-sm sm:text-base font-normal text-gray-400 -mt-1">{task.className}</p>
                </div>

                <div className="text-left md:text-center">
                  <p className="text-base sm:text-lg text-green-600 font-normal">Assigned Date</p>
                  <p className="text-sm sm:text-base font-normal text-gray-400 -mt-1">{task.sendDate}</p>
                </div>

                <div className="text-left md:text-center">
                  <p className="text-base sm:text-lg text-green-600 font-normal">Deadline</p>
                  <p className="text-sm sm:text-base font-normal text-gray-400 -mt-1">{task.deadline}</p>
                </div>

                <div className="text-left md:text-center">
                  <p className="text-base sm:text-lg text-green-600 font-normal">Submitted</p>
                  <p className="text-sm sm:text-base font-normal text-gray-400 -mt-1">{task.submittedDate}</p>
                </div>
              </div>

              <div className="w-full sm:w-fit flex items-center sm:gap-10 justify-between">
                <div className="flex items-center ">
                  <div
                    className={`w-[90px] py-2 flex items-center justify-center gap-1.5 text-base tracking-[2%] font-medium ${getStatusStyles(task.status).textColor} ${getStatusStyles(task.status).bgColor} rounded-md`}
                  >
                    <div className={`w-[6px] h-[6px] rounded-full ${getStatusStyles(task.status).dotColor} -mt-0.5`}></div>
                    {task.status}
                  </div>
                </div>

                <div className="md:w-auto flex flex-col items-center text-center">
                  {/* Label for the points column */}
                  <p className="text-lg text-green-600 font-normal">Points</p>

                  <div className="flex flex-col items-center">
                    <div className="-mt-1.5 flex items-center gap-0.5">
                      <Image src="/assets/icons/star-icon.svg" alt="moji gurukul menu" width={24} height={24} />
                      <p
                        className={`text-sm md:text-base font-normal ${
                          task.rating < 5 ? 'text-red-500' : task.rating < 8 ? 'text-yellow-500' : 'text-green'
                        }`}
                      >
                        {task.rating}/10
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-fit flex items-center gap-10 justify-between">
                <div className="flex items-center gap-1.5 sm:gap-4">
                  <Image
                    src="/assets/icons/profile-icons.svg"
                    alt="moji gurukul menu"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base sm:text-lg font-normal">{task.studentName}</h3>
                    <div className="text-base font-normal text-[#B1AFB3] -mt-1">{task.studentRole}</div>
                  </div>
                </div>

                <div className="flex items-center lg:border-none justify-center mb-2 py-3 cursor-pointer rounded-lg md:mt-0 border w-[30px]">
                  <button className="text-gray-500 text-[20px] hover:opacity-80  min-w-[15px]">
                    <Image src="/assets/icons/more-v.svg" alt="icon" width={13} height={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex w-full flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-[#B1AFB3] text-xl mb-4 md:mb-0 lg:text-nowrap">Total {totalDataLength} Assignments</p>

            <div className="w-full flex sm:flex-row gap-5 sm:gap-1 lg:gap-5 flex-col items-center justify-center md:justify-end">
              {currentPage > 1 && (
                <button
                  className="sm:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-full sm:w-[150px] hover:opacity-80 flex items-center justify-center"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
                  Previous
                </button>
              )}

              <div className="w-full rounded-[15px] overflow-hidden flex items-center sm:w-fit h-fit bg-[#F1ECF8]">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 md:px-[20px] text-purple w-full flex text-nowrap items-center justify-center  md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${
                      index + 1 === currentPage ? '!bg-purple text-white rounded-[15px]' : '!bg-[#eeecfa] rounded-r-sm'
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {currentPage < totalPages && (
                <button
                  className="sm:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 w-full sm:w-[150px] flex items-center justify-center"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                  <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Management
