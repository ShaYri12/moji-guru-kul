'use client'

import { useModalStore } from '@/store/modalStore'
import { StudentsAndGroupsResponseTypes } from '@/utils/types'
import CustomButton from '../common/CustomButton'

const ActivitiesHeader = ({ selectedStudentGroups }: { selectedStudentGroups: StudentsAndGroupsResponseTypes }) => {
  const setAddLessonModal = useModalStore((state) => state.setAddLessonModal)
  return (
    <>
      <div className="flex p-4 rounded shadow-tiles mb-6 bg-[#753cbd26] gap-4">
        <div>
          <p className="capitalize text-indigo text-xl">Name: {selectedStudentGroups.name}</p>
          <p>Activities: {selectedStudentGroups.numberOfActivities}</p>
        </div>
        <CustomButton
          variant="contained"
          color="#753CBD"
          textColor="white"
          className="!w-[130px] !normal-case !h-11"
          onClick={() => setAddLessonModal(true)}
        >
          Add Lesson
        </CustomButton>
      </div>
    </>
  )
}
export default ActivitiesHeader
