'use client'
import React from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import classNames from 'classnames'
import { nordeco } from '@/app/font'
import { useStudentStore } from '@/store/studentStore'
import { GRADES } from '@/utils/constants'
import { GradeTypes } from '@/utils/types'

const GradeScreen = () => {
  const student = useStudentStore((state) => state.student)
  const setStudent = useStudentStore((state) => state.setStudent)
  return (
    <RegisterStudentLayout>
      <div className={classNames(nordeco.className, 'grid grid-cols-2 gap-10 justify-center w-full max-w-[660px]')}>
        {GRADES.map((grade: GradeTypes) => (
          <div
            key={grade.id}
            onClick={() => setStudent({ ...student, gradeId: grade.id, grade: grade.id })}
            className={classNames(
              'shadow-grade-box rounded-lg bg-white h-[70px] w-full flex justify-center items-center cursor-pointer font-bold text-base border',
              {
                '!bg-dark-purple text-white': student.gradeId === grade.id,
              }
            )}
          >
            {grade.name}
          </div>
        ))}
      </div>
    </RegisterStudentLayout>
  )
}

export default GradeScreen
