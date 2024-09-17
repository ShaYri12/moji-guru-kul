import TutorCard from '@/components/common/Cards/TutorCard'
import { fetchRequest } from '@/network/FetchRequest'
import { GroupDetailTypes } from '@/utils/types'

export default async function GroupDetails({ params }: { params: { groupId: string } }) {
  const groupsDetails: GroupDetailTypes | any = await fetchRequest({
    url: `educators/get-students-in-groups?groupId=${params.groupId}`,
    method: 'GET',
  })

  return (
    <div className="horizontal-spacing my-12">
      <h3 className="text-indigo text-3xl md:text-[40px] font-medium mb-6">Groups Details</h3>
      <div>
        {groupsDetails && groupsDetails.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {groupsDetails.map((group: GroupDetailTypes) => (
              <TutorCard key={group.id} tutorName={group.studentName} />
            ))}
          </div>
        ) : (
          <p>No detail found</p>
        )}
      </div>
    </div>
  )
}
