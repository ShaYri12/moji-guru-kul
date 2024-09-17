import React, { useEffect } from 'react'
import CustomInput from '@/components/common/CustomInput'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import { useEducatorStore } from '@/store/educatorStore'
import { useErrorStore } from '@/store/errorStore'

const PasswordScreen = () => {
  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  const setRequired = useErrorStore((state) => state.setRequired)

  useEffect(() => {
    setRequired(false)
  }, [])

  return (
    <RegisterEducatorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="Type Password"
          value={educator.password}
          onChange={(e) => {
            setEducator({ ...educator, password: e.target.value })
          }}
          placeholder="Enter your password"
          type="password"
          error="Password is required"
        />
        <CustomInput
          label="Confirm Password"
          value={educator.confirmPassword}
          onChange={(e) => setEducator({ ...educator, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          type="password"
          error={educator.password !== educator.confirmPassword ? 'Password does not match' : 'Confirm Password is required'}
        />
      </div>
    </RegisterEducatorLayout>
  )
}

export default PasswordScreen
