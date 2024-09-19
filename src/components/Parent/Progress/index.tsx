'use client'
import CircularProgressBar from '@/components/CircularProgressBar'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import ProgressBar from '@/components/common/ProgressBar'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useMilestoneStore } from '@/store/milestoneStore'
import { IconsEnum } from '@/utils/enum'
import { MilestoneResponseTypes } from '@/utils/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Progress = () => {
  const user = useAuthStore((state) => state.user)
  const [activeMilestone, setActiveMilestone] = useState<MilestoneResponseTypes>()
  const [level, setLevel] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'student' | 'group'>('student')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 7

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

  const sampleGroups = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`,
    class: `Class ${(i % 6) + 1}`,
    progress: Math.floor(Math.random() * 200),
    totalPoints: (Math.random() * 5).toFixed(2),
  }))

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
          <h1 className="text-purple text-[50px] lg:text-[56px] font-[700] leading-[67.2px] tracking-[2%]">Progress</h1>
        </div>
        <button className="flex items-center bg-[#F1ECF8] justify-center w-[58px] h-[58px] rounded-lg border-[1.6px] border-purple text-purple hover:bg-purple-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.3"
            className="w-[28px] h-[28px]"
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
            <div className="w-[40px] h-[40px] border-[2px] border-purple rounded-[8px] flex justify-center items-center hover:opacity-80 cursor-pointer">
              <Image src="/assets/icons/plus-icon.svg" alt="moji gurukul menu" width={15} height={15} />
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
                      <p className="text-xs lg:text-lg w-max font-normal">
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
                    className="mr-2 md:mr-4 px-[16px] py-[12px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-fit hover:opacity-80 flex items-center justify-center"
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
                    className="ml-2 md:ml-4 px-[16px] py-[12px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 flex items-center justify-center"
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
                      <h3 className="text-[18px] lg:text-[24px] font-[500] text-[#3D3842] tracking-[2%] leading-[28.8px]">{group.name}</h3>
                      <p className="text-xs lg:text-lg w-max font-normal">
                        <span className="px-[8.5px] w-max py-[4px] text-purple bg-[#F1ECF8] rounded-[4px]">{group.class}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Task Completed</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{group.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={group.progress} total={200} color="#22CC9B" bgColor="#BAEFE0" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Game Completed</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{group.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={group.progress} total={200} color="#4D9EFA" bgColor="#C8E1FD" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto items-start md:items-center">
                    <div className="flex lg:flex-row md:flex-col flex-row md:flex-nowrap flex-wrap lg:items-center md:items-start items-center lg:gap-2 md:gap-0 gap-2 mb-[8px]">
                      <p className="text-xs lg:text-[14px] text-[#3D3842] font-[500]">Join Live Lesson</p>
                      <p className="text-xs lg:text-[14px] font-[500] text-[#B1AFB3]">{group.progress} / 200</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={group.progress} total={200} color="#FBCC58" bgColor="#FEEFCB" />
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                    <div>
                      <p className="text-sm lg:text-[16px] text-green-600 font-normal">Total Point</p>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <Image src="/assets/icons/star-icon.svg" className="mb-0" alt="moji gurukul menu" width={20} height={20} />
                      <p className="text-[18px] lg:text-[20px] lg:leading-[24px] tracking-[2%] text-[#110F24] font-normal">
                        {group.totalPoints}
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
                <p className="text-gray-600 mb-4 md:mb-0">Total {sampleGroups.length} Groups</p>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                  <CustomButton
                    variant="outlined"
                    color="white"
                    className="mr-2 md:mr-4 px-4 md:px-[16px] !border-purple border-[1.5px] text-sm lg:text-base text-purple rounded-lg !w-[90px] md:!w-[100px] !h-8 md:!h-10 hover:opacity-80"
                    iconName={IconsEnum.LeftIcon}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </CustomButton>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`px-3 md:px-[20px] text-purple !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${index + 1 === currentPage ? '!bg-purple text-white rounded-l-lg' : '!bg-[#eeecfa] rounded-r-sm'}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <CustomButton
                    variant="outlined"
                    color="white"
                    className="ml-2 md:ml-4 px-4 md:px-6 !border-purple border-[1.5px] text-sm lg:text-base text-purple rounded-lg !w-[70px] md:!w-[100px] !h-8 md:!h-10 hover:opacity-80"
                    iconName={IconsEnum.RightIcon}
                    iconPosition="end"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </CustomButton>
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
