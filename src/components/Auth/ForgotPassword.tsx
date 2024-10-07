'use client'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'
import CustomInput from '../common/CustomInput'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const handleModal = useModalStore((state) => state.setOpen)
  const resetPasswordLink = useAuthStore((state) => state.resetPasswordLink)
  const { setRequired } = useErrorStore()

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[350px] flex flex-col mt-6 gap-4">
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error="Email is required"
        />
        <div className="mt-3">
          <CustomButton
            onClick={async () => {
              if (!email) {
                setRequired(true)
              }
              await resetPasswordLink({ email })
              handleModal(false)
            }}
            className="text-lite-black"
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
