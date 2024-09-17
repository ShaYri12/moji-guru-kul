'use client'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'
import CustomInput from '../common/CustomInput'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const handleModal = useModalStore((state) => state.setOpen)
  const resetPasswordLink = useAuthStore((state) => state.resetPasswordLink)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[350px] flex flex-col mt-6 gap-4">
        <CustomInput label="Email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <CustomInput
          label="Phone"
          placeholder="Enter your phone number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="mt-3">
          <CustomButton
            onClick={async () => {
              await resetPasswordLink({ email, phoneNumber: phone })
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
