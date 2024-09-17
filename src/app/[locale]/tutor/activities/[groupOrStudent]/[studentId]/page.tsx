import ActivitiesHeader from '@/components/Tutor/ActivitiesHeader'
import ActivityBar from '@/components/Tutor/ActivityBar'
import CancelLiveLessonModal from '@/components/Tutor/CancelLiveLessonModal'
import EditLiveLessonModal from '@/components/Tutor/EditLiveLessonModal'
import LiveLessonModal from '@/components/Tutor/LiveLessonModal'
import TutorLessonDetailModal from '@/components/Tutor/TutorLessonDetailModal'
import { fetchRequest } from '@/network/FetchRequest'
import { ActivityResponseTypes, StudentsAndGroupsResponseTypes } from '@/utils/types'
import { cookies } from 'next/headers'

export default async function StudentOrGroupActivitiesPage({
  params,
}: {
  params: { groupOrStudent: 'student' | 'group'; studentId: string }
}) {
  const userId = cookies().get('userId')?.value

  let activities: ActivityResponseTypes[] | any = []
  if (params.groupOrStudent === 'student') {
    activities = await fetchRequest({
      url: `activities?assignedToId=${params?.studentId}&assignedById=${userId}`,
      method: 'GET',
      tags: ['activities'],
    })
  } else {
    activities = await fetchRequest({
      url: `activities/get-group-activities-notifications?assignedToId=${params?.studentId}&assignedBy=${userId}`,
      method: 'GET',
      tags: ['activities'],
    })
  }

  const studentsGroups: StudentsAndGroupsResponseTypes[] | any = await fetchRequest({
    url: `educators/educator-students-group/${0}/${0}`,
    method: 'GET',
    tags: ['educator-student-group'],
  })

  if (studentsGroups?.isError) {
    throw new Error(JSON.stringify(studentsGroups.error))
  }

  if (activities?.isError) {
    throw new Error(JSON.stringify(activities?.error))
  }

  const selectedStudentGroup: StudentsAndGroupsResponseTypes = studentsGroups?.find(
    (studentGroup: StudentsAndGroupsResponseTypes) => studentGroup.id === Number(params.studentId)
  )

  return (
    <div className="flex flex-col overflow-hidden">
      <ActivitiesHeader selectedStudentGroups={selectedStudentGroup} />
      <div className="flex flex-col vertical-scroll overflow-y-scroll flex-1">
        {activities?.map((activity: ActivityResponseTypes) => <ActivityBar key={activity.id} activity={activity} />)}
      </div>
      <LiveLessonModal />
      <TutorLessonDetailModal />
      <EditLiveLessonModal />
      <CancelLiveLessonModal />
  
    </div>
  )
}
