'use client'
import { raleway } from '@/app/font'
import CustomButton from '@/components/common/CustomButton'
import Divider from '@/components/common/Divider'
import StepBar from '@/components/common/StepBar'
import { useEducatorStore } from '@/store/educatorStore'
import { useErrorStore } from '@/store/errorStore'
import { useUniversalStore } from '@/store/universalStore'
import { ArrowRoundBackIcon } from '@/svg'
import { RegisterEducatorSteps } from '@/utils/enum'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

type RegisterEducatorLayoutProps = {
  children: ReactNode
}

const RegisterEducatorLayout = ({ children }: RegisterEducatorLayoutProps) => {
  const router = useRouter()

  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  const steps = useUniversalStore((state) => state.steps)
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setCurrentStep = useUniversalStore((state) => state.setCurrentStep)
  const sendEmailOtp = useEducatorStore((state) => state.sendEmailOtp)
  const sendPhoneOtp = useEducatorStore((state) => state.sendPhoneOtp)
  const registerEducator = useEducatorStore((state) => state.registerEducator)
  const errorState = useErrorStore((state) => state)
  const setAlert = useErrorStore((state) => state.setAlert)
  const loading = useEducatorStore((state) => state.loading)

  //! Handle error
  const handleError = () => {
    if (currentStep === RegisterEducatorSteps.InitialInfoScreen) {
      if (!educator.firstName) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.email) {
        errorState.setRequired(true)
        return false
      }
      if (educator.phoneNumber.length < 10) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.phoneNumber) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.genderId) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterEducatorSteps.VerificationScreen) {
      if (!educator.emailOTP) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.phoneOTP) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterEducatorSteps.PasswordScreen) {
      if (!educator.password) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.confirmPassword) {
        errorState.setRequired(true)
        return false
      }
      if (educator.password !== educator.confirmPassword) {
        errorState.setRequired(true)
        setEducator({ ...educator, confirmPassword: '' })
        return false
      }
    }
    if (currentStep === RegisterEducatorSteps.AddressScreen) {
      if (!educator.countryId) {
        errorState.setRequired(true)
        return false
      }
      if (!educator.cityId) {
        errorState.setRequired(true)
        return false
      }
    }
    return true
  }

  //! Handle register educator
  const handleRegisterEducator = async () => {
    await registerEducator({ ...educator })
    setAlert({ message: 'Your account successfully created', type: 'success' })
    router.push('/register-tutor')
  }

  //! Handle step next and done
  const handleStepNext = async (currentStep: number) => {
    const isError = handleError()
    if (!isError) return

    //! send otp to email and phone
    if (currentStep === RegisterEducatorSteps.InitialInfoScreen) {
      const emailResponse = await sendEmailOtp(educator.email)
      if (!emailResponse.isSuccess) return
      const phoneResponse = await sendPhoneOtp(educator.phoneNumber)
      if (!phoneResponse.isSuccess) return
    }

    // go to next step
    if (currentStep <= steps - 1) {
      setCurrentStep(currentStep + 1)
    }
    // register educator
    if (currentStep === RegisterEducatorSteps.ExperienceScreen) {
      handleRegisterEducator()
      // useEducatorStore.persist.clearStorage()
    }
  }

  //! Handle step back
  const handleStepBack = (currentStep: number) => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const heading = (currentStep: number) => {
    switch (currentStep) {
      case RegisterEducatorSteps.InitialInfoScreen:
        return "Let's get acquainted"
      case RegisterEducatorSteps.VerificationScreen:
        return 'Verify your account'
      case RegisterEducatorSteps.PasswordScreen:
        return "Set your account's password"
      case RegisterEducatorSteps.AgeScreen:
        return 'Set Your Age'
      case RegisterEducatorSteps.AddressScreen:
        return 'Set Your Address'
      case RegisterEducatorSteps.ExperienceScreen:
        return 'Set Your Experience'
      default:
        return "Let's get acquainted"
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-6 h-full">
      <div className="flex relative">
        <h5 className={classNames(raleway.className, 'heading pb-6 text-primary')}>{heading(currentStep)}</h5>
      </div>
      <div className="w-[80%] relative">
        <div className="absolute left-2 -top-14 cursor-pointer">
          <ArrowRoundBackIcon onClick={() => handleStepBack(currentStep)} />
        </div>
        <Divider />
      </div>
      <div className="flex flex-col gap-14 justify-between items-center h-full w-full min-h-[80vh]">
        <div className="mt-9 w-full max-w-[800px]">
          <StepBar />
        </div>
        <div className="w-full flex flex-col items-center">{children}</div>
        <CustomButton onClick={() => handleStepNext(currentStep)} className="!w-[200px]" loading={loading}>
          {RegisterEducatorSteps.ExperienceScreen === currentStep ? 'Done' : 'Next'}
        </CustomButton>
      </div>
    </div>
  )
}

export default RegisterEducatorLayout
