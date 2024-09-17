'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const initialSate = {
  password: '',
  confirmPassword: '',
  email: '',
  token: '',
}

function RestPasswordToken({ params }: { params: { token: string } }) {
  const [state, setState] = useState(initialSate)
  const resetPassword = useAuthStore((state) => state.resetPassword)
  const loading = useAuthStore((state) => state.loading)
  const setRequired = useErrorStore((state) => state.setRequired)
  const router = useRouter()


  const handleResetPassword = async () => {
    if (!state.password) {
      setRequired(true)
      return
    }
    if (!state.confirmPassword) {
      setRequired(true)
      return
    }
    if (!state.email) {
      setRequired(true)
      return
    }
    if (state.password !== state.confirmPassword) {
      setRequired(true)
      return
    }
    if(!params.token) return;
    await resetPassword({ password: state.password, email: state.email, confirmPassword: state.confirmPassword, token: params.token })
    router.push('/')
  }

  return (
    <div className="horizontal-spacing my-10 flex flex-col items-center">
      <h1 className="text-primary heading mb-2.5 text-center">Reset Password</h1>
      <div className="w-full max-w-[350px] flex flex-col mt-6 gap-4">
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          error="Email required"
          value={state.email}
          onChange={(e) => {
            setState({ ...state, email: e.target.value })
          }}
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={state.password}
          error="Password required"
          onChange={(e) => {
            setState({ ...state, password: e.target.value })
          }}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Enter your password again"
          type="password"
          error="Confirm password required"
          value={state.confirmPassword}
          onChange={(e) => {
            setState({ ...state, confirmPassword: e.target.value })
          }}
        />

        <div className="mt-3 flex justify-center">
          <CustomButton onClick={handleResetPassword} className="text-white !w-[100px]"
          loading={
             loading
          }
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default RestPasswordToken
