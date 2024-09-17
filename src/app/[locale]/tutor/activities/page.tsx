import { fetchRequest } from '@/network/FetchRequest'
import { StudentsAndGroupsResponseTypes } from '@/utils/types'
import { redirect } from 'next/navigation'

async function TutorPage() {
  const studentsGroups: StudentsAndGroupsResponseTypes[] | any = await fetchRequest({
    url: `educators/educator-students-group/${0}/${0}`,
    method: 'GET',
    tags: ['educator-student-group'],
  })
  if (studentsGroups?.isError) {
    throw new Error(JSON.stringify(studentsGroups.error))
  }

  const isGroup = studentsGroups?.[0]?.isGroup
  const id = studentsGroups?.[0]?.id

  return redirect(`/tutor/activities/${isGroup ? 'group' : 'student'}/${id}`)
}

export default TutorPage
