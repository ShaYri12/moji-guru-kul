'use client'
import React, { useEffect } from 'react'
import CustomInput from '@/components/common/CustomInput'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import { useEducatorStore } from '@/store/educatorStore'
import { useErrorStore } from '@/store/errorStore'

const VerificationScreen = () => {
  const setRequired = useErrorStore((state) => state.setRequired)
  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)

  useEffect(() => {
    setRequired(false)
  }, [])

  return (
    <RegisterEducatorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="Email Verification Code"
          value={educator.emailOTP}
          onChange={(e) => {
            setEducator({ ...educator, emailOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your email"
          error="Email verification code is required"
        />
        <CustomInput
          label="Phone Verification Code"
          value={educator.phoneOTP}
          onChange={(e) => {
            setEducator({ ...educator, phoneOTP: e.target.value })
          }}
          placeholder="Enter the code sent to your phone"
          error="Phone verification code is required"
        />
      </div>
    </RegisterEducatorLayout>
  )
}

export default VerificationScreen
