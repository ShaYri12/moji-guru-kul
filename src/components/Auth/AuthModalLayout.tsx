'use client'
import React from 'react'
import CustomModal from '../common/CustomModal'
import Image from 'next/image'
import classNames from 'classnames'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import { AuthModalEnum } from '@/utils/enum'
import { useModalStore } from '@/store/modalStore'
import { ActiveAuthModal } from '@/utils/types'
import Link from 'next/link'

const AuthModalLayout = () => {
  const activeModal = useModalStore((state) => state.activeAuthModal)
  const open = useModalStore((state) => state.open)
  const setOpen = useModalStore((state) => state.setOpen)

  const handleModal = (activeModal: ActiveAuthModal) => {
    switch (activeModal) {
      case AuthModalEnum.login:
        return <Login />
      case AuthModalEnum.forgotPassword:
        return <ForgotPassword />
      default:
        return null
    }
  }

  const handleTitle = (id: ActiveAuthModal) => {
    switch (id) {
      case AuthModalEnum.login:
        return 'Login'
      case AuthModalEnum.forgotPassword:
        return 'Forgot your password?'
      default:
        return null
    }
  }

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.svg" alt="moji gurukul" width={183} height={44} />
        {handleTitle(activeModal) && <h5 className={classNames('text-primary heading mt-4 mb-2.5')}>{handleTitle(activeModal)}</h5>}
        {activeModal === AuthModalEnum.login && (
          <p className={classNames('text-lite-gray text-sm font-normal text-center leading-5')}>
            Don&apos;t have an account?{' '}
            <Link href="/register-student" className="text-purple font-bold cursor-pointer" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </p>
        )}
        {handleModal(activeModal)}
      </div>
    </CustomModal>
  )
}

export default AuthModalLayout
