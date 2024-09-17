'use client'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import { useEffect, useState } from 'react'
import { networkService } from '@/network/NetworkService'
import { CancelLessonReasonsType } from '@/utils/types'
import Checkbox from '@mui/material/Checkbox'
import CustomButton from '../common/CustomButton'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'
import { cancelLiveLessonByStudent } from '@/app/[locale]/actions/studentActions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const CancelLessonModal = () => {
  const studentLessonCancelModal = useModalStore((state) => state.studentLessonCancelModal)
  const setStudentLessonCancelModal = useModalStore((state) => state.setStudentLessonCancelModal)

  const [cancelReasons, setCancelReasons] = useState<CancelLessonReasonsType[]>([])
  const [customReason, setCustomReason] = useState<string>('')
  const [selectedReason, setSelectedReason] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const activityId = searchParams.get('activityId')
  const activityToBePerformedId = searchParams.get('activityToBePerformedId')
  const pathname= usePathname()
  const router = useRouter()

  const { execute: cancelLiveLesson, status } = useAction(cancelLiveLessonByStudent, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        router.push(pathname)
        setStudentLessonCancelModal(false)
        setCustomReason('')
        setSelectedReason(null)

      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
      }
    },
  })

  useEffect(() => {
    if (!studentLessonCancelModal) return
    const getCancelReasons = async () => {
      const cancelReasons: CancelLessonReasonsType[] = await networkService.get({ url: '/lessons/CancelReason' })
      let updatedReasonsList: CancelLessonReasonsType[] = []
      cancelReasons.forEach((element) => {
        if (element.cancelReasonId >= 41 && element.cancelReasonId <= 45) {
        } else {
          updatedReasonsList.push(element)
        }
        setCancelReasons(updatedReasonsList)
      })
    }
    getCancelReasons()
  }, [studentLessonCancelModal])

  return (
    <CustomModal open={studentLessonCancelModal} setOpen={(val)=>{
      router.push(pathname)
        setStudentLessonCancelModal(val)
        setCustomReason('')
        setSelectedReason(null)
    }}>
      <p className="text-indigo text-3xl pb-3 font-semibold text-center">Choose a reason of cancellation</p>

      {cancelReasons.map((reason, idx) => (
        <div key={idx} className="shadow-tiles mb-2 py-1 px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg text-lite-black">{reason.cancelReasonName}</p>
            </div>
            <Checkbox
              checked={selectedReason === reason.cancelReasonId}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedReason(reason.cancelReasonId)
                } else {
                  setSelectedReason(null)
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
      ))}
      <div className="shadow-tiles mb-2 py-1 px-4">
        <div className="flex justify-between items-center">
          <p className="text-lg text-lite-black">Other</p>

          <Checkbox
            checked={selectedReason === 41}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedReason(41)
              } else {
                setSelectedReason(null)
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        {selectedReason === 41 && (
          <textarea
            rows={3}
            className="w-full h-20 p-2 mt-2 border rounded"
            placeholder="Enter your reason here"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
      </div>
      <CustomButton
        onClick={() => {
          // cancelFn(selectedReason, customReason)
          cancelLiveLesson({
            lessonId: parseInt(activityToBePerformedId as string),
            reasonId: selectedReason as number,
            otherCancelReason: customReason,
          })
        }}
        className="w-full !h-12 mt-2"
        disabled={!selectedReason}
      >
        Cancel Lesson
      </CustomButton>
    </CustomModal>
  )
}

export default CancelLessonModal
