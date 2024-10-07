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
  const { notify, setNotify } = useErrorStore()
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)

  useEffect(() => {
    setRequired(false)
    setNotify(false)
    setConfirmPasswordError(false)
  }, [])

  return (
    <RegisterStudentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="Type Password"
          value={student.password}
          onChange={(e) => {
            // password should be at least 6 characters and contain at least one number and one letter
            setStudent({ ...student, password: e.target.value })
            // password have validation success then set notify to false
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
            if (student.password.length >= 6 && passwordRegex.test(e.target.value)) {
              setNotify(false)
              setConfirmPasswordError(true)
            }
          }}
          placeholder="Enter your password"
          type="password"
          error="Password is required"
          notify={notify && !confirmPasswordError ? 'Password should be at least 6 characters and contain at least one number' : ''}
        />
        <CustomInput
          label="Confirm Password"
          value={student.confirmPassword}
          onChange={(e) => {
            setStudent({ ...student, confirmPassword: e.target.value })
            if (student.password == e.target.value) {
              setNotify(false)
              setConfirmPasswordError(false)
            } else {
              setNotify(true)
              setConfirmPasswordError(true)
            }
          }}
          placeholder="Confirm your password"
          type="password"
          error="Confirm Password is required"
          notify={notify && confirmPasswordError ? 'Password does not match' : ''}
        />
      </div>
    </RegisterStudentLayout>
  )
}

export default PasswordScreen
