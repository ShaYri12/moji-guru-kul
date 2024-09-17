'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'
import { useParams, useSearchParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'
import { addLiveLessonAction } from '@/app/[locale]/actions/tutorActivitiesActions'
import { LiveLessonDetailsTypes } from '@/utils/types'
import { networkService } from '@/network/NetworkService'

const EditLiveLessonModal = () => {
  const [lessonDetails, setLessonDetails] = useState({
    title: '',
    dateOfLesson: '',
    timeOfLesson: '',
  })

  const { studentId } = useParams<{ studentId: string }>()

  const searchParams = useSearchParams()
  const activityId = searchParams.get('activityId')
  const activityTypeId = searchParams.get('activityTypeId')
  console.log(activityId, activityTypeId)

  const editLessonModal = useModalStore((state) => state.editLessonModal)
  const setEditLessonModal = useModalStore((state) => state.setEditLessonModal)

  const { execute: addLiveLesson, status } = useAction(addLiveLessonAction, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setEditLessonModal(false)
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
      }
    },
  })

  useEffect(() => {
    if (editLessonModal && activityId && activityTypeId) {
      const getLiveLessonDetails = async () => {
        const liveLessonDetails: LiveLessonDetailsTypes = await networkService.get({ url: `/activities/${activityTypeId}/${activityId}/0` })

        // "03:05:00 PM"

        let lessonTime
        if (liveLessonDetails.startTime.includes('AM')) {
          lessonTime = liveLessonDetails.startTime.replace('AM', '').trim()
        } else {
          lessonTime = liveLessonDetails.startTime.replace('PM', '').trim()
          // add 12 hours to the time
          let time = lessonTime.split(':')
          let hour = parseInt(time[0]) + 12
          lessonTime = `${hour}:${time[1]}`
        }
        setLessonDetails({
          title: liveLessonDetails.title,
          dateOfLesson: liveLessonDetails.lessonDate.split('-').reverse().join('-'),
          timeOfLesson: lessonTime,
        })
      }
      getLiveLessonDetails()
    }
  }, [editLessonModal, activityId, activityTypeId])

  console.log('lessonDetails', lessonDetails)

  const createLessonHandler = () => {
    if (lessonDetails.title.trim().length < 3) {
      useErrorStore.getState().setAlert({ message: 'Title should be atleast 3 characters', type: 'error' })
      return
    }
    if (!lessonDetails.dateOfLesson) {
      useErrorStore.getState().setAlert({ message: 'Please select date', type: 'error' })
      return
    }
    if (!lessonDetails.timeOfLesson) {
      useErrorStore.getState().setAlert({ message: 'Please select time', type: 'error' })
      return
    }
    console.log(lessonDetails)

    const data = {
      title: lessonDetails.title,
      startTime: lessonDetails.timeOfLesson,
      lessonDate: lessonDetails.dateOfLesson.split('-').reverse().join('-'),
      lessonMode: 2,
      placeId: 2,
      assignedTo: studentId,
    }

    console.log(data)
    addLiveLesson(data)
  }

  const isInvalid = lessonDetails.title.trim().length < 3 || !lessonDetails.dateOfLesson || !lessonDetails.timeOfLesson || status === 'executing'

  return (
    <CustomModal open={editLessonModal} setOpen={setEditLessonModal}>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 items-center w-full max-w-[400px]">
          <h4 className="text-indigo text-xl font-bold">Edit a Live Lesson</h4>

          <CustomInput
            placeholder="Enter title of the lesson"
            value={lessonDetails.title}
            onChange={(e) => setLessonDetails({ ...lessonDetails, title: e.target.value })}
          />

          <CustomInput
            type="date"
            onChange={(e) => {
              setLessonDetails((state: any) => ({
                ...state,
                dateOfLesson: e.target.value,
              }))
            }}
            value={lessonDetails.dateOfLesson}
          />
          <CustomInput
            type="time"
            onChange={(e) => {
              setLessonDetails((state: any) => ({
                ...state,
                timeOfLesson: e.target.value,
              }))
            }}
            value={lessonDetails.timeOfLesson}
            step="300"
          />
          <CustomButton disabled={isInvalid} variant="contained" textColor="white" className="h-11" onClick={createLessonHandler}>
            Add Lesson
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  )
}

export default EditLiveLessonModal
