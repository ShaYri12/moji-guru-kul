'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'
import { addLiveLessonAction } from '@/app/[locale]/actions/tutorActivitiesActions'
import Image from 'next/image'
import { betmRound } from '@/app/font'
import classNames from 'classnames'
import { networkService } from '@/network/NetworkService'
import { LiveLessonDetailsTypes } from '@/utils/types'
import {
  addOffsetToTime,
  calculateLessonTimer,
  combineDateTime,
  convert12to24HrFormat,
  convertDateToObject,
  convertmsToDHMS,
} from '@/utils/helperFunctions'

const TutorLessonDetailModal = () => {
  const [lessonDetails, setLessonDetails] = useState<LiveLessonDetailsTypes | null>()
  const [timerValues, setTimerValues] = useState({
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  })
  const [timeToTheLesson, setTimeToTheLesson] = useState(0)
  const [timeToAcceptAlreadyPassed, setTimeToAcceptAlreadyPassed] = useState(true)

  const tutorLessonDetailModal = useModalStore((state) => state.tutorLessonDetailModal)
  const setTutorLessonDetailModal = useModalStore((state) => state.setTutorLessonDetailModal)
  const setEditLessonModal = useModalStore((state) => state.setEditLessonModal)
  const setCancelLessonModal = useModalStore((state) => state.setCancelLessonModal)

  const pathanme = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activityId = searchParams.get('activityId')
  const activityTypeId = searchParams.get('activityTypeId')
  console.log(activityId, activityTypeId)

  useEffect(() => {
    if (tutorLessonDetailModal && activityId && activityTypeId) {
      const getLiveLessonDetails = async () => {
        const liveLessonDetails: LiveLessonDetailsTypes = await networkService.get({ url: `/activities/${activityTypeId}/${activityId}/0` })
        liveLessonDetails.creationTime = convert12to24HrFormat(liveLessonDetails.creationTime)
        setLessonDetails(liveLessonDetails)
      }
      getLiveLessonDetails()
    }
  }, [tutorLessonDetailModal, activityId, activityTypeId])

  const updateTimerHandler = () => {
    if (!lessonDetails || !tutorLessonDetailModal) return
    try {
      const { isTimeToAcceptAlreadyPassed, timeBetweenNowAndLessonStart, timerValues } = calculateLessonTimer({
        creationDate: lessonDetails.creationDate,
        creationTime: lessonDetails.creationTime,
        lessonDate: lessonDetails.lessonDate,
        startTime: lessonDetails.startTime,
        status: lessonDetails.status,
      })
      setTimeToAcceptAlreadyPassed(isTimeToAcceptAlreadyPassed)
      setTimerValues(timerValues)
      setTimeToTheLesson(timeBetweenNowAndLessonStart)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!lessonDetails || !tutorLessonDetailModal) return
    updateTimerHandler()

    const timeout = setInterval(() => {
      updateTimerHandler()
    }, 1000)

    return () => clearInterval(timeout)
  }, [lessonDetails, tutorLessonDetailModal])
  console.log(timerValues)

  return (
    <CustomModal
      open={tutorLessonDetailModal}
      setOpen={(val) => {
        setTutorLessonDetailModal(val)
        router.push(pathanme)
      }}
      size="xl"
    >
      <Image
        src="/assets/images/learning-hub/lesson-modal-top-vector.svg"
        alt="top-vector"
        width={1100}
        height={175}
        className="absolute top-0 left-0 right-0 z-10"
      />
      <Image
        src="/assets/images/learning-hub/lesson-modal-bottom-vector.svg"
        alt="top-vector"
        width={1100}
        height={175}
        className="absolute bottom-0 left-0 right-0"
      />
      <div className={classNames('flex flex-col items-center gap-8 relative z-20', betmRound.className)}>
        <div className="w-[182px] h-[51px] bg-[#F7F4FB] flex items-center justify-center">
          <p className="text-2xl text-indigo text-center font-medium">{lessonDetails?.lessonMode}</p>
        </div>
        <h5 className="text-[40px] text-indigo font-medium">{lessonDetails?.title}</h5>
        <div className="flex gap-6">
          <p className="text-xl text-indigo">
            <span className="text-[#656467]">Date : </span> {lessonDetails?.startTime?.substring(0, lessonDetails?.startTime?.length - 6)}
            {lessonDetails?.startTime?.substring(lessonDetails?.startTime?.length - 2)} {lessonDetails?.lessonDate}
          </p>
          <p className="text-xl text-indigo">
            <span className="text-[#656467]">Status : </span> {lessonDetails?.status}
          </p>
          <p className="text-xl text-indigo">
            <span className="text-[#656467]">Subject : </span> Science
          </p>
        </div>
        <div className="bg-[#F7F4FB] p-8 rounded-[15px] w-[400px]">
          <p className="text-[28px] text-indigo font-medium mb-4 text-center">TIME TO THE LESSON</p>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base">Days</p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">
                {!timeToAcceptAlreadyPassed ? timerValues.remainingDays : 0}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base h-5"></p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">:</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base">Hour</p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">
                {!timeToAcceptAlreadyPassed ? timerValues.remainingHours : 0}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base h-5"></p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">:</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base">Minutes</p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">
                {!timeToAcceptAlreadyPassed ? timerValues.remainingMinutes : 0}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base h-5"></p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">:</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base">Seconds</p>
              <p className="text-[72px] text-vamp-grey font-medium leading-[80px] pt-0">
                {!timeToAcceptAlreadyPassed ? timerValues.remainingSeconds : 0}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[#8E8D91] text-base h-5"></p>
            </div>
          </div>
        </div>
        <p className="text-[#8E8D91] text-base">Short Message for tutor Before take Action</p>
        <div className="flex gap-8">
          <CustomButton
            variant="outlined"
            className="md:w-[304px] !bg-soft-peach !border-indigo border-[1.5px] text-indigo"
            onClick={() => setCancelLessonModal(true)}
          >
            Cancel This Lesson
          </CustomButton>
          <CustomButton variant="contained" className="md:w-[304px] !bg-indigo text-white" onClick={() => setEditLessonModal(true)}>
            Edit This Lesson
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  )
}

export default TutorLessonDetailModal
