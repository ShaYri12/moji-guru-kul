import { nordeco } from '@/app/font'
import { useAuthStore } from '@/store/authStore'
import classNames from 'classnames'
import React from 'react'
import CustomButton from './CustomButton'
import { useCareerStore } from '@/store/careerStore'
import { CareerSteps } from '@/utils/enum'

const WelcomeScreen = () => {
  const user = useAuthStore((state) => state.user)
  const setCareerStep = useCareerStore((state) => state.setCareerStep)

  return (
    <div className="max-w-[1300px] m-auto px-5 mt-[10%]">
      <div className="grid md:grid-cols-2 gap-6 place-items-center h-[50vh]">
        <div className="border rounded h-full w-full"></div>
        <div className="w-[70%] flex flex-col gap-6">
          <h1 className={classNames(nordeco.className, 'text-3xl font-bold')}>Welcome {user?.firstName || 'User'}!</h1>
          <div className={classNames(nordeco.className, 'flex flex-col gap-2')}>
            <h3 className="text-xl font-bold">Feature name</h3>
            <p>We are glad to have you here. Let&apos;s start by choosing your dream career to personalize your learning.</p>
          </div>
          <div className="flex gap-4">
            <CustomButton
              onClick={() => {
                setCareerStep(CareerSteps.CareerList)
              }}
              height="36px"
              className="w-[130px]"
            >
              Next
            </CustomButton>
            <CustomButton onClick={() => {}} height="36px" color="transparent" className="w-[100px]">
              Skip
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
