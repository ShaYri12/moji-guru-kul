'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import CustomInput from '../common/CustomInput'
import { AuthModalEnum, IconsEnum, RolesEnum } from '@/utils/enum'
import { useModalStore } from '@/store/modalStore'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import classNames from 'classnames'
import { nordeco } from '@/app/font'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { setCookie } from '@/app/actions'
import { SuccessResponse, UserTypes } from '@/utils/types'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const locale = useLocale()

  const router = useRouter()
  const path = usePathname()

  const handleModal = useModalStore((state) => state.setOpen)
  const setActiveAuthModal = useModalStore((state) => state.setActiveAuthModal)
  const handleLogin = useAuthStore((state) => state.handleLogin)
  const googleLogin = useAuthStore((state) => state.googleLogin)
  const setError = useErrorStore((state) => state.setAlert)
  const loading = useAuthStore((state) => state.loading)
  const { invalidEmail, setRequired, setInvalidEmail } = useErrorStore()

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLogin(tokenResponse.access_token)
      if (path === `/`) {
        return router.push(`/games`)
      }
    },
  })

  const handleError = () => {
    if (!email) {
      setRequired(true)
      return true
    }
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailRegex.test(email)) {
        setRequired(true)
        setInvalidEmail(true)
        return true
      }
    }
    if (!password) {
      setRequired(true)
      return true
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full mt-6 flex flex-col gap-4 max-w-[350px]">
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => {
            const email = e.target.value
            if (email.split('@').length > 2) return
            if (email.split('@').length > 1 && email.split('@')[1].split('.').length > 2) return
            if (email.length > 50) return
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (emailRegex.test(email)) {
              setInvalidEmail(false)
              setRequired(false)
            }
            setEmail(e.target.value)
          }}
          error="Email is required"
          invalidEmail={invalidEmail ? 'Invalid Email Format' : ''}
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error="Password is required"
        />
        <div className="mt-3">
          <CustomButton
            loading={loading}
            onClick={async () => {
              const isError = handleError()
              if (isError) return
              const response: SuccessResponse = await handleLogin({ email, password })
              const userResponse: UserTypes = response.returnObject
              if (!response.isSuccess || !userResponse) return
              await setCookie('token', userResponse.token.value)
              await setCookie('userRole', userResponse.role.toLocaleLowerCase())
              await setCookie('userId', userResponse.id.toString())

              handleModal(false)
              if (path === `/`) {
                if (response.returnObject?.role?.toLowerCase() === RolesEnum.Student) return router.push(`/games`)
                if (response.returnObject?.role?.toLowerCase() === RolesEnum.Parent) return router.push(`/parent/games`)
              }
            }}
          >
            Login
          </CustomButton>
          <p className={classNames(nordeco.className, 'text-lite-gray text-sm font-normal text-center leading-5 mt-4')}>
            Forgot your password?{' '}
            <span className="text-purple font-bold cursor-pointer" onClick={() => setActiveAuthModal(AuthModalEnum.forgotPassword)}>
              Reset it
            </span>
          </p>

          <div className="flex items-center gap-9 my-8">
            <div className="bg-dark-lime-green opacity-[0.2] h-[1px] w-full" />
            <span className="text-lite-gray text-sm font-light leading-[32px] tracking-[-0.15px]">or</span>
            <div className="bg-dark-lime-green opacity-[0.2] h-[1px] w-full" />
          </div>

          <div className="flex flex-col gap-5">
            {/* <CustomButton
              loading={loading}
              onClick={() => {
                // handleModal(false)
              }}
              color="#3B5999"
              className="!font-semibold !text-white"
              iconName={IconsEnum.Facebook}
            >
              Sign in with Facebook
            </CustomButton> */}
            <CustomButton
              loading={loading}
              onClick={() => {
                login()
                handleModal(false)
                if (path === `/${locale}`) {
                  return router.push(`/${locale}/games`)
                }
              }}
              color="#4285F4"
              className="!font-semibold !text-white"
              iconName={IconsEnum.Google}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
