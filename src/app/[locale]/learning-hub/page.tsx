import LearningHub from '@/components/LearningHub'
import CancelLessonModal from '@/components/LearningHub/CancelLessonModal'
import StudentLessonDetailModal from '@/components/LearningHub/StudentLessonDetailModal'
import { fetchRequest } from '@/network/FetchRequest'
import { LearningActivityTypes, StudentTutorGroupsTypes, TutorsForStudentTypes } from '@/utils/types'

export default async function LearningHubPage() {
  const tutors: TutorsForStudentTypes[] | any = await fetchRequest({ url: 'educators/current-user-tutors', method: 'GET' })
  if (tutors && !tutors.length) return <div>No tutors found</div>
  const tutorIds = tutors?.map((tutor: TutorsForStudentTypes) => tutor.tutorId)
  const activities: LearningActivityTypes[] | any = await fetchRequest({
    url: 'activities',
    method: 'POST',
    body: { assignedToId: tutors?.[0].studentId, assignedByIds: tutorIds },
    tags: ['lessons'],
    //  cache the response for 1 minute
  })
  const groups: StudentTutorGroupsTypes[] | any = await fetchRequest({ url: 'educators/get-student-tutor-groups', method: 'GET' })

  return (
    <div className="horizontal-spacing my-10 md:my-16">
      <LearningHub activities={activities} tutors={tutors} groups={groups} />
      <CancelLessonModal />
      <StudentLessonDetailModal />
    </div>
  )
}
