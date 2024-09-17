'use client'
import { useModalStore } from '@/store/modalStore'
import { ActivityResponseTypes } from '@/utils/types'
import TutorLessonDetailModal from './TutorLessonDetailModal'
import { usePathname, useRouter } from 'next/navigation'

const ActivityBar = ({ activity }: { activity: ActivityResponseTypes }) => {
  const tutorLessonDetailModal = useModalStore((state) => state.tutorLessonDetailModal)
  const setTutorLessonDetailModal = useModalStore((state) => state.setTutorLessonDetailModal)
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <div
        key={activity.id}
        className="shadow-tiles p-3 mb-4 rounded border"
        onClick={() => {
          // add query params to the url
          if (activity.activityTypeId === 8) {
            router.push(`${pathname}?activityId=${activity.id}&activityTypeId=${activity.activityTypeId}&activityToBePerformedId=${activity.activityToBePerformedId}`)
            setTutorLessonDetailModal(true)
          }
        }}
      >
        <div className="text-indigo">
          {activity?.activityTypeName}
          {activity?.activityTypeName !== 'My Gameflows' && activity?.activityTypeName !== 'Personal Task' && <span> : </span>}

          {activity?.activityTypeName === 'My Materials' && (
            <>
              {activity?.noOfAudios > 0 && (
                <span>
                  {activity?.noOfAudios} audio
                  {activity?.noOfAudios > 1 ? 's' : ''},{' '}
                </span>
              )}
              {activity?.noOfImages > 0 && (
                <span>
                  {activity?.noOfImages} image
                  {activity?.noOfImages > 1 ? 's' : ''},{' '}
                </span>
              )}
              {activity?.noOfPdf > 0 && (
                <span>
                  {activity?.noOfPdf} pdf
                  {activity?.noOfPdf > 1 ? 's' : ''},{' '}
                </span>
              )}
              {activity?.noOfVideos > 0 && (
                <span>
                  {activity?.noOfVideos} video
                  {activity?.noOfVideos > 1 ? 's' : ''},{' '}
                </span>
              )}
            </>
          )}
          {activity?.activityTypeName === 'My Materials' &&
            activity?.noOfAudios === 0 &&
            activity?.noOfImages === 0 &&
            activity?.noOfPdf === 0 &&
            activity?.noOfVideos === 0 &&
            'No Material'}
          {activity.activityTypeName === 'Neithedu Games' && <span>{activity.gameTypeName} </span>}
          {activity.activityTypeName === 'My Games' && <span>{activity.gameTypeName} </span>}
          {activity.activityTypeName === 'My Gameflows' && <span>{activity.gameTypeName} </span>}
        </div>
        <p className="text-lg font-medium">{activity.title}</p>
        <p>Due: {activity.dueDate}</p>
        <p className="text-lime-green"> Status: {ActivityStatus[activity.status as number]}</p>
        <p>Completion: {activity.completionDate}</p>
        <p>Created: {activity.creationDate}</p>
      </div>
    </>
  )
}

export default ActivityBar

const ActivityStatus = [
  'Testing',
  'New',
  'InProgress',
  'Done',
  'Checking',
  'Checked',
  'InRevision',
  'Completed',
  'Cancelled',
  'MissedDeadline',
  'CancelledByStudent',
  'CancelledByTutor',
  'AboutToStart',
  'Pending',
  'Late',
]
