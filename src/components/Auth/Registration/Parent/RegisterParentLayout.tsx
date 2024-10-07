'use client'
import { raleway } from '@/app/font'
import CustomButton from '@/components/common/CustomButton'
import Divider from '@/components/common/Divider'
import StepBar from '@/components/common/StepBar'
import SuccessModal from '@/components/common/SuccessModal'
import { useErrorStore } from '@/store/errorStore'
import { useModalStore } from '@/store/modalStore'
import { useParentStore } from '@/store/parentStore'
import { useUniversalStore } from '@/store/universalStore'
import { ArrowRoundBackIcon } from '@/svg'
import { RegisterParentSteps } from '@/utils/enum'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

type RegisterParentLayoutProps = {
  children: ReactNode
}

const RegisterParentLayout = ({ children }: RegisterParentLayoutProps) => {
  const parent = useParentStore((state) => state.parent)
  const setParent = useParentStore((state) => state.setParent)
  const steps = useUniversalStore((state) => state.steps)
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setCurrentStep = useUniversalStore((state) => state.setCurrentStep)
  const openModal = useModalStore((state) => state.setOpen)
  const setSuccessModal = useModalStore((state) => state.setSuccessModal)
  const sendEmailOtp = useParentStore((state) => state.sendEmailOtp)
  const sendPhoneOtp = useParentStore((state) => state.sendPhoneOtp)
  const registerParent = useParentStore((state) => state.registerParent)
  const errorState = useErrorStore((state) => state)
  const loading = useParentStore((state) => state.loading)
  const verifyChild = useParentStore((state) => state.verifyChild)
  const { setInvalidEmail } = useErrorStore()

  //! Handle error
  const handleError = () => {
    if (currentStep === RegisterParentSteps.InitialInfoScreen) {
      if (!parent.firstName) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.lastName) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.email) {
        errorState.setRequired(true)
        return false
      }
      if (parent.email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!emailRegex.test(parent.email)) {
          errorState.setRequired(true)
          setInvalidEmail(true)
          return false
        }
      }
      if (parent.phoneNumber.length < 10) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.phoneNumber) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.genderId) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.childEmails.length) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterParentSteps.PasswordScreen) {
      if (!parent.password) {
        errorState.setRequired(true)
        return false
      }
      if (!parent.confirmPassword) {
        errorState.setRequired(true)
        return false
      }
      if (parent.password !== parent.confirmPassword) {
        errorState.setRequired(true)
        setParent({ ...parent, confirmPassword: '' })
        return false
      }
    }
    return true
  }

  //! Handle register parent
  const handleRegisterParent = async () => {
    const response = await registerParent({ ...parent })
    if (!response.isSuccess) return
    errorState.setAlert({ message: response.message, type: 'success' })
  }

  //! Handle step next and done
  const handleStepNext = async (currentStep: number) => {
    const isError = handleError()
    if (!isError) return

    //! send otp to email and phone
    if (currentStep === RegisterParentSteps.InitialInfoScreen) {
      const response = await verifyChild(parent.childEmails)
      if (!response.response.length) return
      if (response.response.length && response.filteredUnverifiedEmails.length) return openModal(true)

      await sendEmailOtp(parent.email)
      await sendPhoneOtp(parent.phoneNumber)
    }
    // register parent
    if (currentStep === RegisterParentSteps.AgeScreen) {
      handleRegisterParent()
    }
    // go to next step
    if (currentStep <= steps - 1) {
      setCurrentStep(currentStep + 1)
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
      case RegisterParentSteps.InitialInfoScreen:
        return "Let's get acquainted"
      case RegisterParentSteps.VerificationScreen:
        return 'Verify your account'
      case RegisterParentSteps.PasswordScreen:
        return "Set your account's password"
      case RegisterParentSteps.AgeScreen:
        return ''
      // case RegisterParentSteps.InvitationScreen:
      //   return 'Invitation'
      default:
        return "Let's get acquainted"
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-6 h-full">
      <div className="flex relative h-14">
        <h5 className={classNames(raleway.className, 'heading pb-6 text-primary')}>{heading(currentStep)}</h5>
      </div>
      <div className="w-[80%] relative">
        <div className="absolute -left-11 md:left-2 -top-14 cursor-pointer">
          <ArrowRoundBackIcon onClick={() => handleStepBack(currentStep)} />
        </div>
        <Divider />
      </div>
      <div className="flex flex-col gap-14 justify-between items-center h-full w-full min-h-[80vh]">
        <div className="mt-9 w-full max-w-[800px]">
          <StepBar />
        </div>
        <div className="w-full flex flex-col items-center">{children}</div>
        {currentStep === RegisterParentSteps.AgeScreen && <h5 className="heading pb-6 text-primary text-center">Set Your Age</h5>}
        <CustomButton onClick={() => handleStepNext(currentStep)} loading={loading} className="!w-[200px]">
          {RegisterParentSteps.AgeScreen === currentStep ? 'Done' : 'Next'}
        </CustomButton>
      </div>
    </div>
  )
}

export default RegisterParentLayout
