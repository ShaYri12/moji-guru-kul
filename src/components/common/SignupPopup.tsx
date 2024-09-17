import React from 'react'
import CustomModal from './CustomModal'
import { ROLES_DETAILS } from '@/utils/constants'
import { useUniversalStore } from '@/store/universalStore'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const SignupPopup = () => {
  const router = useRouter()

  const { isSignupPopupOpen, setIsSignupPopupOpen } = useUniversalStore()

  return (
    <CustomModal isCloseIcon={false} size="sm" open={isSignupPopupOpen} setOpen={(val: boolean) => setIsSignupPopupOpen(val)}>
      <div className="w-[180px]">
        {ROLES_DETAILS.map((role) => (
          <div
            key={role.title}
            className={classNames('flex items-center gap-8 mb-2 cursor-pointer', {
              'hover:border-2 border-primary rounded-lg py-2 px-3': role.title === 'Tutor',
              'hover:border-2 border-hot-pink rounded-lg py-2 px-3': role.title === 'Parent',
              'hover:border-2 border-lime-green rounded-lg py-2 px-3': role.title === 'Student',
            })}
            onClick={() => {
              setIsSignupPopupOpen(false)
              router.push(role.redirectUrl)
            }}
          >
            <div className="flex items-center">
              <div className="flex justify-center items-center w-[48px] h-[48px] rounded-full border-[2.718px] border-[#5189B1] bg-[#96A2CC] overflow-hidden">
                <Image src={role.image} alt="moji gurukul" width={41} height={70} className="object-contain relative top-2.5" />
              </div>
            </div>
            <h4 className="text-indigo text-xl font-normal">{role.title}</h4>
          </div>
        ))}
      </div>
    </CustomModal>
  )
}

export default SignupPopup
