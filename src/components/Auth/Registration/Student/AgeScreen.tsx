'use client'
import RangeSlider from '@/components/common/RangeSlider'
import React from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import { useStudentStore } from '@/store/studentStore'

const AgeScreen = () => {
  const student = useStudentStore((state) => state.student)
  const setStudent = useStudentStore((state) => state.setStudent)
  return (
    <RegisterStudentLayout>
      <RangeSlider
        value={student.yearsOfBirth}
        setValue={(value: number) => setStudent({ ...student, yearsOfBirth: value })}
        min={9}
        max={25}
      />
    </RegisterStudentLayout>
  )
}

export default AgeScreen
