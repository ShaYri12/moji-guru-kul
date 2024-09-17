import AddPupilOrGroup from '@/components/Tutor/AddPupilOrGroup'
import StudentList from '@/components/Tutor/StudentList'
import AddPupilModal from '@/components/Tutor/AddPupil'
import { fetchRequest } from '@/network/FetchRequest'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const studentsGroups: any = await fetchRequest({
    url: `educators/educator-students-group/${0}/${0}`,
    method: 'GET',
    tags: ['educator-student-group'],
  })
  if (studentsGroups?.isError) {
    throw new Error(JSON.stringify(studentsGroups.error))
  }

  return (
    <main>
      <div className="horizontal-spacing my-20">
        <div className="flex gap-5">
          <div className="border border-indigo rounded w-[350px] p-4 flex flex-col max-h-[80vh]">
            <div className="mb-6 flex gap-5 items-center">
              <AddPupilOrGroup />
            </div>
            <StudentList studentsGroups={studentsGroups} />
          </div>
          <div className="border border-indigo rounded h-[40vh] md:h-[80vh] md:w-3/4 p-4 flex flex-col flex-1">{children}</div>
        </div>
      </div>
      <AddPupilModal />
    </main>
  )
}
