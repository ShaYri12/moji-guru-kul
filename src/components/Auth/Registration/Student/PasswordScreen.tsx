'use client'
import React, { useEffect } from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import CustomInput from '@/components/common/CustomInput'
import { useStudentStore } from '@/store/studentStore'
import { useErrorStore } from '@/store/errorStore'

const PasswordScreen = () => {
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
          label="Type Password"
          value={student.password}
          onChange={(e) => {
            setStudent({ ...student, password: e.target.value })
          }}
          placeholder="Enter your password"
          type="password"
          error="Password is required"
        />
        <CustomInput
          label="Confirm Password"
          value={student.confirmPassword}
          onChange={(e) => setStudent({ ...student, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          type="password"
          error={student.password !== student.confirmPassword ? 'Password does not match' : 'Confirm Password is required'}
        />
      </div>
    </RegisterStudentLayout>
  )
}

export default PasswordScreen
