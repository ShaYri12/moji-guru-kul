'use client'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'
import { useParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'
import { addLiveLessonAction } from '@/app/[locale]/actions/tutorActivitiesActions'


const LiveLessonModal = () => {
  const [lessonDetails, setLessonDetails] = useState({
    title: '',
    dateOfLesson: '',
    timeOfLesson: '',
  })

  const { studentId } = useParams<{ studentId: string }>()

  const addLessonModal = useModalStore((state) => state.addLessonModal)
  const setAddLessonModal = useModalStore((state) => state.setAddLessonModal)

  const { execute: editLiveLesson, status } = useAction(addLiveLessonAction, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setAddLessonModal(false)
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
      }
    },
  })

  const editLessonHandler = () => {
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
    editLiveLesson(data)
  }

  const isInvalid = lessonDetails.title.trim().length < 3 || !lessonDetails.dateOfLesson || !lessonDetails.timeOfLesson || status === 'executing'

  return (
    <CustomModal open={addLessonModal} setOpen={setAddLessonModal}>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 items-center w-full max-w-[400px]">
          <h4 className="text-indigo text-xl font-bold">Add a Live Lesson</h4>

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
          <CustomButton disabled={isInvalid} variant="contained" textColor="white" className="h-11" onClick={editLessonHandler}>
            Add Lesson
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  )
}

export default LiveLessonModal
