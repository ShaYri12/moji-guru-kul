'use client'

import React, { useState } from 'react'
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useRouter } from 'next/navigation'
import { AuthModalEnum, RolesEnum } from '@/utils/enum'
import { useModalStore } from '@/store/modalStore'
import { SuccessResponse, UserTypes } from '@/utils/types'
import { setCookie } from '@/app/actions'

const AmbassadorLogin = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, handleLogin } = useAuthStore()
  const errorState = useErrorStore((state) => state)
  const { setOpen, setActiveAuthModal } = useModalStore((state) => state)

  //! Handle error
  const handleError = () => {
    if (!email) {
      errorState.setRequired(true)
      return false
    }
    if (!password) {
      errorState.setRequired(true)
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    const isError = handleError()
    if (!isError) return
    const response: SuccessResponse = await handleLogin({ email, password })
    const userResponse: UserTypes = response.returnObject
    if (!response.isSuccess || !userResponse) return
    if (userResponse.role.toLocaleLowerCase() !== RolesEnum.Ambassador) {
      errorState.setAlert({ message: 'You are not an ambassador', type: 'error' })
      router.push('/')
      setOpen(true)
      setActiveAuthModal(AuthModalEnum.login)
      return
    }
    await setCookie('token', userResponse.token.value)
    await setCookie('userRole', userResponse.role.toLocaleLowerCase())
    await setCookie('userId', userResponse.id.toString())
    if (userResponse.role.toLocaleLowerCase() === RolesEnum.Ambassador) router.push('/ambassador')
    else router.push('/games')
  }

  return (
    <div className="px-5 w-full max-w-[500px] m-auto flex flex-col gap-7 mt-10">
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error="Email is required"
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error="Password is required"
      />
      <CustomButton onClick={handleSubmit}>Login</CustomButton>
    </div>
  )
}

export default AmbassadorLogin
