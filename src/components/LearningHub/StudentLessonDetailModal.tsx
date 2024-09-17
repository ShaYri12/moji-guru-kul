'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { betmRound } from '@/app/font'
import classNames from 'classnames'
import { networkService } from '@/network/NetworkService'
import { LiveLessonDetailsTypes } from '@/utils/types'
import { calculateLessonTimer, combineDateTime, convert12to24HrFormat } from '@/utils/helperFunctions'
import { Avatar } from '@/svg'
import { confirmLiveLessonByStudent } from '@/app/[locale]/actions/studentActions'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'

const StudentLessonDetailModal = () => {
  const [lessonDetails, setLessonDetails] = useState<LiveLessonDetailsTypes | null>()
  const [timeToAcceptAlreadyPassed, setTimeToAcceptAlreadyPassed] = useState(false)
  const [timeBetweenNowAndLessonStart, setTimeBetweenNowAndLessonStart] = useState(0)

  const studentLessonDetailModal = useModalStore((state) => state.studentLessonDetailModal)
  const setStudentLessonDetailModal = useModalStore((state) => state.setStudentLessonDetailModal)
  const setStudentLessonCancelModal = useModalStore((state) => state.setStudentLessonCancelModal)

  const pathanme = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activityId = searchParams.get('activityId')
  const activityTypeId = searchParams.get('activityTypeId')
  const activityToBePerformedId = searchParams.get('activityToBePerformedId')
  console.log(activityId, activityTypeId)

  useEffect(() => {
    if (studentLessonDetailModal && activityId && activityTypeId) {
      const getLiveLessonDetails = async () => {
        const liveLessonDetails: LiveLessonDetailsTypes = await networkService.get({ url: `/activities/${activityTypeId}/${activityId}/0` })
        liveLessonDetails.creationTime = convert12to24HrFormat(liveLessonDetails.creationTime)
        console.log(liveLessonDetails)
        const { isTimeToAcceptAlreadyPassed, timeBetweenNowAndLessonStart } = calculateLessonTimer({
          lessonDate: liveLessonDetails.lessonDate,
          creationDate: liveLessonDetails.creationDate,
          creationTime: liveLessonDetails.creationTime,
          startTime: liveLessonDetails.startTime,
          status: liveLessonDetails.status,
        })
        setTimeToAcceptAlreadyPassed(isTimeToAcceptAlreadyPassed)
        setTimeBetweenNowAndLessonStart(timeBetweenNowAndLessonStart)
        setLessonDetails(liveLessonDetails)
      }
      try {
        getLiveLessonDetails()
      } catch (e) {
        console.log(e)
      }
    }
  }, [studentLessonDetailModal, activityId, activityTypeId])

  const checkIfCancellable = () => {
    // if status is Pending, lesson can be cancelled until the last time of acceptance
    // if status is New, lesson can be cancelled 24 hours before the lesson start
    if (!timeToAcceptAlreadyPassed && lessonDetails?.status === 'Pending') return true
    else if (lessonDetails?.status === 'New') {
      // if status is nww, lesson can be cancelled 24 hours before the lesson start
      if (timeBetweenNowAndLessonStart > 24 * 60 * 60 * 1000) return true
      else return false
    } else return false
  }

  let btnText = 'Confirm Lesson'

  if (
    lessonDetails?.status === 'MissedDeadline' ||
    lessonDetails?.status === 'Cancelled by Student' ||
    lessonDetails?.status === 'Cancelled by Tutor'
  ) {
    btnText = 'Lesson Cancelled'
  } else if (lessonDetails?.status === 'AboutToStart' && timeBetweenNowAndLessonStart + 10 * 60 * 1000 < 0) {
    btnText = "Tutor hasn't arrived"
  } else if (lessonDetails?.status === 'AboutToStart' && timeBetweenNowAndLessonStart + 10 * 60 * 1000 > 0) {
    btnText = 'Start Lesson'
  } else if (!timeToAcceptAlreadyPassed && lessonDetails?.status === 'Pending') {
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
    <CustomModal
      open={studentLessonDetailModal}
      setOpen={(val) => {
        setStudentLessonDetailModal(val)
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
        <div className="p-8 rounded-[15px] w-[432px] border-indigo border">
          <h6 className="text-[28px] font-semibold mb-4 text-indigo text-center">Created a new lesson</h6>
          <div className="flex gap-5 justify-center mb-4">
            <Avatar />
            <div>
              <p className="text-[28px] text-[#7C7C7C] font-medium mb-0.5">Mentor Name</p>
              <div className="border-indigo border w-fit rounded-sm px-2 text-base text-indigo font-medium">Science</div>
            </div>
          </div>
          <div className="p-6 bg-[#F1ECF8]">
            <p className="text-[#8E8D91] text-lg">Learners are required to spend just 15 minutes each day, fitting seamlessly into </p>
          </div>
        </div>
        <p className="text-[#8E8D91] text-base">Short Message for tutor Before take Action</p>
        <div className="flex gap-8">
          <CustomButton
            variant="outlined"
            className="md:w-[304px] !bg-soft-peach !border-indigo border-[1.5px] text-indigo"
            onClick={() => {
              setStudentLessonDetailModal(false)
              setStudentLessonCancelModal(true)
            }}
          >
            {checkIfCancellable() ? 'Cancel This Lesson' : 'Chat with Tutor'}
          </CustomButton>
          <CustomButton
            variant="contained"
            className="md:w-[304px] !bg-indigo !text-white"
            onClick={() => {
              if (btnText === 'Start Lesson') {
                alert('Starting lesson')
              } else if (btnText === 'Confirm Lesson') {
                activityToBePerformedId && confirmLiveLesson({ lessonId: +activityToBePerformedId  })
              }
            }}
          >
            {btnText}
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  )
}

export default StudentLessonDetailModal
