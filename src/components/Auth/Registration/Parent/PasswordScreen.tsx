import React, { useEffect } from 'react'
import RegisterParentLayout from './RegisterParentLayout'
import CustomInput from '@/components/common/CustomInput'
import { useParentStore } from '@/store/parentStore'
import { useErrorStore } from '@/store/errorStore'

const PasswordScreen = () => {
  const parent = useParentStore((state) => state.parent)
  const setParent = useParentStore((state) => state.setParent)
  const setRequired = useErrorStore((state) => state.setRequired)

  useEffect(() => {
    setRequired(false)
  }, [])

  return (
    <RegisterParentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="Type Password"
          value={parent.password}
          onChange={(e) => {
            setParent({ ...parent, password: e.target.value })
          }}
          placeholder="Enter your password"
          type="password"
          error="Password is required"
        />
        <CustomInput
          label="Confirm Password"
          value={parent.confirmPassword}
          onChange={(e) => setParent({ ...parent, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          type="password"
          error={parent.password !== parent.confirmPassword ? 'Password does not match' : 'Confirm Password is required'}
        />
      </div>
    </RegisterParentLayout>
  )
}

export default PasswordScreen
