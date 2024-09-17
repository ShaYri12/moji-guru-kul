import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CustomButton from '../CustomButton'
import { calculateLessonTimer, convert12to24HrFormat, getFormattedDate } from '@/utils/helperFunctions'
import { LessonCardBottomShape, LessonCardTopShape } from '@/svg'
import { usePathname, useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'
import { LearningActivityTypes } from '@/utils/types'
import { confirmLiveLessonByStudent } from '@/app/[locale]/actions/studentActions'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'

type LessonCardProps = {
  activity: LearningActivityTypes
}

const LessonCard = ({ activity }: LessonCardProps) => {
  const [timeToAcceptAlreadyPassed, setTimeToAcceptAlreadyPassed] = useState(false)
  const [timeBetweenNowAndLessonStart, setTimeBetweenNowAndLessonStart] = useState(0)

  const pathname = usePathname()
  const router = useRouter()
  
  const setStudentLessonCancelModal = useModalStore((state) => state.setStudentLessonCancelModal)
  const setStudentLessonDetailModal = useModalStore((state) => state.setStudentLessonDetailModal)

  const checkIfCancellable = () => {
    // if status is Pending, lesson can be cancelled until the last time of acceptance
    // if status is New, lesson can be cancelled 24 hours before the lesson start
    try {
      const creationTime = convert12to24HrFormat(activity.creationTime)

      const { timeBetweenNowAndLessonStart, isTimeToAcceptAlreadyPassed } = calculateLessonTimer({
        lessonDate: activity.lessonDate,
        creationDate: activity.creationDate,
        creationTime: creationTime,
        startTime: activity.startTime,
        status: activity.status,
      })
      setTimeToAcceptAlreadyPassed(isTimeToAcceptAlreadyPassed)
      // setTimeBetweenNowAndLessonStart(timeBetweenNowAndLessonStart)
      if (!isTimeToAcceptAlreadyPassed && activity?.status === 'Pending') return true
      else if (activity?.status === 'New') {
        // if status is nww, lesson can be cancelled 24 hours before the lesson start
        if (timeBetweenNowAndLessonStart > 24 * 60 * 60 * 1000) return true
        else return false
      } else return false
    } catch (e) {
      console.log(e)
      return false
    }
  }
  let btnText = 'Confirm Lesson'

  if (activity?.status === 'MissedDeadline' || activity?.status === 'Cancelled by Student' || activity?.status === 'Cancelled by Tutor') {
    btnText = 'Lesson Cancelled'
  } else if (activity?.status === 'AboutToStart' && timeBetweenNowAndLessonStart + 10 * 60 * 1000 < 0) {
    btnText = "Tutor hasn't arrived"
  } else if (activity?.status === 'AboutToStart' && timeBetweenNowAndLessonStart + 10 * 60 * 1000 > 0) {
    btnText = 'Start Lesson'
  } else if (!timeToAcceptAlreadyPassed && activity?.status === 'Pending') {
    btnText = 'Confirm Lesson'
  }

  const { execute: confirmLiveLesson, status } = useAction(confirmLiveLessonByStudent, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setStudentLessonDetailModal(false)
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
      }
    },
  })

  return (
    <div
      className="rounded-[15px] relative rounded-tr-[15px]"
      onClick={() => {
        if (activity.activityTypeId === 8) {
          router.push(`${pathname}?activityId=${activity?.id || ''}&activityTypeId=${activity.activityTypeId}&activityToBePerformedId=${activity.activityToBePerformedId}`)
          setStudentLessonDetailModal(true)
        }
      }}
    >
      <div className="absolute top-0 right-0 rounded-tr-[15px]">
        <LessonCardTopShape className="rounded-tr-[15px]" />
      </div>
      <div className="absolute bottom-0 left-0">
        <LessonCardBottomShape />
      </div>
      <div className="w-full rounded-t-[15px]" />
      <div className="p-4 md:p-6 rounded-[15px] hover:shadow-lesson-card hover:cursor-pointer">
        <div className="my-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/assets/icons/user-round.svg" width={40} height={40} alt="lesson" />
            <div>
              <h4 className="text-vamp-grey text-xl font-medium">Stave Jorge</h4>
              <b className="text-[#818084] text-base font-normal">Tutor</b>
            </div>
          </div>
          <div className="bg-indigo w-10 h-10 rounded-full flex justify-center items-center relative">
            <Image src="/assets/icons/bell-white.svg" width={16} height={18} alt="bell" />
        
          </div>
        </div>
        <h4 className="text-lite-black text-xl md:text-[28px] font-medium my-4">{activity?.title}</h4>
        <p className="text-mist text-lg font-normal min-h-8">
          {activity?.description || 'Learners are required to spend just 15 minutes each day, fitting seamlessly into '}
        </p>

        <div className="flex gap-6 items-center mb-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/calendar-indigo.svg" width={14} height={14} alt="calendar" />
            <p className="text-mist text-lg">
              {activity?.startTime?.substring(0, activity?.startTime?.length - 6)}
              {activity?.startTime?.substring(activity?.startTime?.length - 2)} {activity?.lessonDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/time-indigo-icon.svg" width={14} height={14} alt="calendar" />
            <p className="text-mist text-lg">2Hr 30m</p>
          </div>
        </div>

        <div className="flex gap-4">
          <CustomButton
            onClick={() => {
              if(checkIfCancellable()) {
              router.push(`${pathname}?activityId=${activity?.id}`)
              setStudentLessonCancelModal(true)
              }
            }}
            color="#F1ECF8"
            variant="outlined"
            textColor="#753CBD"
            className=""
          >
            {checkIfCancellable() ? 'Cancel This Lesson' : 'Chat with Tutor'}
          </CustomButton>
          <CustomButton
            onClick={() => {
              if (btnText === 'Start Lesson') {
                alert('Starting lesson')
              } else if (btnText === 'Confirm Lesson') {
                confirmLiveLesson({ lessonId:activity.activityToBePerformedId })
              }
            }}
            color="#753CBD"
            variant="contained"
            textColor="#F8FAFC"
            className=""
          >
            {btnText}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
