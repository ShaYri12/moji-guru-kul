'use client'
import { useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { IconsEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'

// Sample Data (Replace with your actual data source)
const sampleStudents = new Array(24).fill({
  taskName: 'Task Name',
  className: 'Class 6',
  sendDate: 'May 20',
  deadline: 'May 20',
  submittedDate: 'May 20',
  status: 'Done',
  rating: 2.55,
  studentName: 'Student Name',
  studentRole: 'Student',
})

const itemsPerPage = 7

const tabs = [
  { label: 'Games', count: 2 },
  { label: 'Personal Task', count: 2 },
  { label: 'Material', count: 2 },
]

const Management = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>('Games')

  // Function to get paginated data
  const getPaginatedData = (data: typeof sampleStudents): typeof sampleStudents => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Calculate total pages
  const totalDataLength = activeTab === 'All' ? sampleStudents.length : 0 // Adjust this logic as per your requirement
  const totalPages = Math.ceil(totalDataLength / itemsPerPage)

  // Get data for the current page
  const paginatedData = getPaginatedData(sampleStudents)

  return (
    <div className="horizontal-spacing top-spacing">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#753CBD] text-[56px] font-bold leading-[67px] tracking-[2%]">Management</h1>
        </div>
        <div className="bg-[#F1ECF8] w-[64px] h-[64px] border-[1.5px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
          <Image src="/assets/icons/dots.svg" alt="moji gurukul menu" width={24} height={24} />
        </div>
      </div>

      <div className="shadow-lg rounded-lg my-12 border border-[#F1ECF8]">
        <div className="flex flex-wrap gap-4 justify-between items-center px-4 sm:px-6 py-4 rounded-t-lg">
          <h1 className="text-xl sm:text-[28px] tracking-[2%] font-medium text-[#753CBD]">Task Manage</h1>
          <div className="flex flex-wrap items-center gap-3 ">
            <CustomButton
              variant="outlined"
              color={'white'}
              className="w-full sm:!w-[100px] !h-10 px-4 sm:px-6 !border-[#B1AFB3] border text-sm sm:text-base text-sliver rounded-lg"
              iconName={IconsEnum.FilterIcon}
            >
              Filter
            </CustomButton>

            <div className="w-full sm:w-auto h-[40px]">
              <CustomInput placeholder="Search here..." type="search" className="bg-white w-full sm:w-auto px-3" />
            </div>

            <div className="w-10 h-10 border-[2px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
              <Image src="/assets/icons/plus.svg" alt="moji gurukul menu" width={24} height={24} />
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
                  onClick={() => setActiveTab(tab.label)}
                  className={`text-sm sm:text-lg font-medium cursor-pointer pb-2 ${
                    activeTab === tab.label ? 'text-violet-600 font-bold border-b-4 rounded border-violet-600' : 'text-gray-400'
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
              className="hide-scrollbar mb-5 overflow-x-scroll flex text-nowrap gap-16 items-center justify-between p-4 border border-[#F1ECF8] hover:border-[#753CBD] rounded-xl  "
            >
              <div className="flex items-center gap-3 mt-1 sm:mt-2">
                <img src="/img/profile.png" alt="Profile" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-normal">{task.taskName}</h3>
                  <div className="text-base font-normal text-[#B1AFB3] -mt-1 flex items-center gap-1">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#753CBD] -mt-0.5"></div>
                    {task.className}
                  </div>
                </div>
              </div>

              <div className="text-left md:text-center ">
                <p className="text-lg text-green-600 font-normal">{task.className}</p>
                <p className="text-base font-normal text-gray-400 -mt-1">{task.sendDate}</p>
              </div>

              <div className="text-left md:text-center ">
                <p className="text-lg text-green-600 font-normal">Deadline</p>
                <p className="text-base font-normal text-gray-400 -mt-1">{task.deadline}</p>
              </div>

              <div className="text-left md:text-center ">
                <p className="text-lg text-green-600 font-normal">Submitted</p>
                <p className="text-base font-normal text-gray-400 -mt-1">{task.submittedDate}</p>
              </div>
              <div className=" ">
                <div className={'px-4 py-2 flex items-center gap-1.5 text-base font-medium text-[#22CC9B] bg-[#E9FAF5] rounded-md'}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#22CC9B] -mt-0.5"></div>
                  {task.status}
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div className="flex items-center gap-1">
                  <Image src="/assets/icons/star-icon.svg" alt="moji gurukul menu" width={24} height={24} />
                  <p className="text-sm md:text-lg font-normal">{task.rating}</p>
                </div>
              </div>

              <div className="w-full md:w-auto flex items-center gap-4">
                <Image
                  src="/img/profile.png"
                  alt="moji gurukul menu"
                  width={40}
                  height={40}
                  className="min-w-[40px] min-h-[40px] md:w-[50px] md:h-[50px]"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-normal">{task.studentName}</h3>
                  <div className="text-base font-normal text-[#B1AFB3] -mt-1">{task.studentRole}</div>
                </div>
              </div>

              <div className="flex items-center mt-2 md:mt-0">
                <button className="text-gray-500 text-[20px] hover:opacity-80">
                  <Image src="/assets/icons/more-v.svg" alt="icon" width={13} height={3} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex w-full flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-[#B1AFB3] text-xl mb-4 md:mb-0 text-nowrap">Total {totalDataLength} Assignments</p>

            <div className="w-full flex sm:flex-row gap-5 flex-col items-center justify-center md:justify-end">
              <button
                className="mr-2 md:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-full sm:w-[150px] hover:opacity-80 flex items-center justify-center"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
                Previous
              </button>

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

              <button
                className="ml-2 md:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 w-full sm:w-[150px] flex items-center justify-center"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Management
