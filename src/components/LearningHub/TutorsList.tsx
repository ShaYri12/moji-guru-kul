'use client'
import { TutorsForStudentTypes } from '@/utils/types'
import Link from 'next/link'
import TutorCard from '../common/Cards/TutorCard'
import Slider from 'react-slick'
import classNames from 'classnames'
import { learningSliderSettings } from './LearningActivities'

const TutorsList = ({ tutors }: { tutors: TutorsForStudentTypes[] }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mt-10 mb-11">
        <h3 className="text-indigo text-3xl md:text-[40px] font-medium">Your Tutors</h3>
        <Link href="/" className="text-black text-xl md:text-[28px] underline underline-offset-2">
          View All
        </Link>
      </div>
      {tutors && tutors.length ? (
        <div className="px-5">
          <Slider {...learningSliderSettings}>
            {tutors &&
              tutors.length &&
              tutors.map((tutor: TutorsForStudentTypes, i) => (
                <div key={tutor.tutorId} className={classNames('px-3 lg:px-4')}>
                  <TutorCard tutorName={tutor.tutorName} />
                </div>
              ))}
            <div />
          </Slider>
        </div>
      ) : (
        <p>No tutors found</p>
      )}
    </div>
  )
}

export default TutorsList
