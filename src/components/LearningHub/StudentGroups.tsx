'use client'
import React from 'react'
import { StudentTutorGroupsTypes } from '@/utils/types'
import Link from 'next/link'
import GroupCard from '../common/Cards/GroupCard'
import Slider from 'react-slick'
import { learningSliderSettings } from './LearningActivities'

const StudentGroups = ({ groups }: { groups: StudentTutorGroupsTypes[] }) => {
  return (
    <div className="my-12">
      <div className="flex justify-between items-center mt-10 mb-11">
        <h3 className="text-indigo text-3xl md:text-[40px] font-medium">Your Groups</h3>
        <Link href="/" className="text-black text-xl md:text-[28px] underline underline-offset-2">
          View All
        </Link>
      </div>
      <div>
        {groups && groups.length ? (
          <div className="px-5">
            <Slider {...learningSliderSettings}>
              {groups.map((group: StudentTutorGroupsTypes, i) => (
                <div key={group.id} className="px-3 lg:px-4">
                  <GroupCard id={group.id} groupName={group.name} />
                </div>
              ))}
              <div />
            </Slider>
          </div>
        ) : (
          <p>No group found</p>
        )}
      </div>
    </div>
  )
}

export default StudentGroups
