'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'
import { useParams, useSearchParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'
import { addLiveLessonAction, deleteLiveLessonAction } from '@/app/[locale]/actions/tutorActivitiesActions'
import { LiveLessonDetailsTypes } from '@/utils/types'
import { networkService } from '@/network/NetworkService'
import { CircularCloseIcon, WarningIcon } from '@/svg'
import { Dialog, DialogContent, Modal } from '@mui/material'
import { maxWidth } from '@mui/system'

const CancelLiveLessonModal = () => {
  const searchParams = useSearchParams()
  const activityId = searchParams.get('activityId')
  const activityTypeId = searchParams.get('activityTypeId')
  const activityToBePerformedId = searchParams.get('activityToBePerformedId')
  console.log(activityId, activityTypeId)

  const cancelLessonModal = useModalStore((state) => state.cancelLessonModal)
  const setCancelLessonModal = useModalStore((state) => state.setCancelLessonModal)
  const setTutorLessonDetailModal = useModalStore((state) => state.setTutorLessonDetailModal)

  const { execute: deleteLiveLesson, status } = useAction(deleteLiveLessonAction, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setCancelLessonModal(false)
        setTutorLessonDetailModal(false)
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
      }
    },
  })

  return (
    <Dialog open={cancelLessonModal} onClose={() => setCancelLessonModal(false)} maxWidth="sm">
      <DialogContent sx={{ padding: '32px' }}>
        <div className="absolute top-8 right-8 cursor-pointer" onClick={() => setCancelLessonModal(false)}>
          <CircularCloseIcon />
        </div>
        <div className="w-[384px]">
          <div className="w-12 h-12 bg-[#FDEDEE] flex items-center justify-center rounded-full mb-4">
            <WarningIcon />
          </div>
          <p className="text-2xl font-medium mb-4">Are you sure?</p>
          <p className="text-[#8E8D91] text-lg mb-6">
            Are you sure you would like to delete this Lesson from the database ?This action cannot be undone.
          </p>
          <div className="flex gap-4">
            <CustomButton
              onClick={() => setCancelLessonModal(false)}
              className="w-full !bg-[#F4F4F4] border-[#A5A4A7] !border-[1.5px] !text-xl leading-7"
              variant="outlined"
              textColor="#8E8D91"
            >
              Keep It
            </CustomButton>
            <CustomButton
              onClick={() => activityToBePerformedId && deleteLiveLesson({ lessonId: parseInt(activityToBePerformedId) })}
              className="w-full !bg-[#EB4E59] text-xl leading-7"
              variant="contained"
              textColor="white"
            >
              Delete
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CancelLiveLessonModal
