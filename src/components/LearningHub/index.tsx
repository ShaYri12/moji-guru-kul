'use client'

import { LearningActivityTypes, StudentTutorGroupsTypes, TutorsForStudentTypes } from '@/utils/types'
import LearningActivities from './LearningActivities'
import TutorsList from './TutorsList'
import StudentGroups from './StudentGroups'
import Image from 'next/image'
import ProgressBar from '../common/ProgressBar'

const LearningHub = ({
  activities,
  tutors,
  groups,
}: {
  activities: LearningActivityTypes[]
  tutors: TutorsForStudentTypes[]
  groups: StudentTutorGroupsTypes[]
}) => {
  return (
    <div>
      <h1 className="text-indigo text-3xl md:text-[40px] font-medium mb-5 md:mb-10">Learning Hub</h1>
      <div className="shadow-tiles rounded-2xl min-h-[136px] flex gap-6 items-center py-8 px-6">
        <div className="bg-indigo w-14 h-14 lg:w-[72px] lg:h-[72px] rounded-full flex justify-center items-center">
          <Image src="/assets/icons/analytic-white.svg" alt="Learning Hub" width={32} height={28} />
        </div>
        <div className="w-[75%] md:w-[80%] lg:w-[90%]">
          <p className="text-lite-black text-base md:text-xl">Progress of Lesson</p>
          <ProgressBar progress={90} total={100} color="#753CBD" />
        </div>
      </div>
      <LearningActivities activities={activities} />
      <TutorsList tutors={tutors} />
      <StudentGroups groups={groups} />
    </div>
  )
}

export default LearningHub
