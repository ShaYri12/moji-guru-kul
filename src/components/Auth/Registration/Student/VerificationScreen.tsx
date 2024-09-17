'use client'
import React, { useEffect } from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import CustomInput from '@/components/common/CustomInput'
import { useStudentStore } from '@/store/studentStore'
import { useErrorStore } from '@/store/errorStore'

const VerificationScreen = () => {
  const student = useStudentStore((state) => state.student)
  const setStudent = useStudentStore((state) => state.setStudent)
  const setRequired = useErrorStore((state) => state.setRequired)

  useEffect(() => {
    setRequired(false)
  }, [])

  return (
    <RegisterStudentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="Email Verification Code"
          value={student.emailOTP}
          onChange={(e) => {
            setStudent({ ...student, emailOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your email"
          error="Email verification code is required"
        />
        <CustomInput
          label="Phone Verification Code"
          value={student.phoneOTP}
          onChange={(e) => {
            setStudent({ ...student, phoneOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your phone"
          error="Phone verification code is required"
        />
      </div>
    </RegisterStudentLayout>
  )
}

export default VerificationScreen
