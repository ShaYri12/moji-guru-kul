'use client'
import React, { useEffect } from 'react'
import CustomInput from '@/components/common/CustomInput'
import { useErrorStore } from '@/store/errorStore'
import RegisterParentLayout from './RegisterParentLayout'
import { useParentStore } from '@/store/parentStore'

const VerificationScreen = () => {
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
          label="Email Verification Code"
          value={parent.emailOTP}
          onChange={(e) => {
            setParent({ ...parent, emailOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your email"
          error="Email verification code is required"
        />
        <CustomInput
          label="Phone Verification Code"
          value={parent.phoneOTP}
          onChange={(e) => {
            setParent({ ...parent, phoneOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your phone"
          error="Phone verification code is required"
        />
      </div>
    </RegisterParentLayout>
  )
}

export default VerificationScreen
