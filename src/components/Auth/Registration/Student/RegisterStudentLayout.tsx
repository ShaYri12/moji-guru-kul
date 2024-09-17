'use client'
import { raleway } from '@/app/font'
import CustomButton from '@/components/common/CustomButton'
import Divider from '@/components/common/Divider'
import StepBar from '@/components/common/StepBar'
import { useErrorStore } from '@/store/errorStore'
import { useStudentStore } from '@/store/studentStore'
import { useUniversalStore } from '@/store/universalStore'
import { ArrowRoundBackIcon } from '@/svg'
import { RegisterStudentSteps } from '@/utils/enum'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type RegisterStudentLayoutProps = {
  children: ReactNode
}

const RegisterStudentLayout = ({ children }: RegisterStudentLayoutProps) => {
  const router = useRouter()
  const student = useStudentStore((state) => state.student)
  const setStudent = useStudentStore((state) => state.setStudent)
  const steps = useUniversalStore((state) => state.steps)
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setCurrentStep = useUniversalStore((state) => state.setCurrentStep)
  const sendEmailOtp = useStudentStore((state) => state.sendEmailOtp)
  const sendPhoneOtp = useStudentStore((state) => state.sendPhoneOtp)
  const registerStudent = useStudentStore((state) => state.registerStudent)
  const errorState = useErrorStore((state) => state)
  const loading = useStudentStore((state) => state.loading)
  const setAlert = useErrorStore((state) => state.setAlert)

  //! Handle error
  const handleError = () => {
    if (currentStep === RegisterStudentSteps.InitialInfoScreen) {
      if (!student.firstName) {
        errorState.setRequired(true)
        return false
      }
      if (!student.lastName) {
        errorState.setRequired(false)
        return true
      }
      if (!student.email) {
        errorState.setRequired(true)
        return false
      }
      if (student.phoneNumber.length < 10) {
        errorState.setRequired(true)
        return false
      }
      if (!student.phoneNumber) {
        errorState.setRequired(true)
        return false
      }
      if (!student.genderId) {
        errorState.setRequired(true)
        return false
      }
      if (!student.syllabusId) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterStudentSteps.VerificationScreen) {
      if (!student.emailOTP) {
        errorState.setRequired(true)
        return false
      }
      if (!student.phoneOTP) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterStudentSteps.PasswordScreen) {
      if (!student.password) {
        errorState.setRequired(true)
        return false
      }
      if (!student.confirmPassword) {
        errorState.setRequired(true)
        return false
      }
      if (student.password !== student.confirmPassword) {
        errorState.setRequired(true)
        setStudent({ ...student, confirmPassword: '' })
        return false
      }
    }
    if (currentStep === RegisterStudentSteps.GradeScreen) {
      if (!student.gradeId) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterStudentSteps.AddressScreen) {
      if (!student.cityId) {
        errorState.setRequired(true)
        return false
      }
      if (!student.countryId) {
        errorState.setRequired(true)
        return false
      }
    }
    return true
  }

  //! Handle register student
  const handleRegisterStudent = async () => {
    const response = await registerStudent({ ...student })
    if (!response.isSuccess) return
    setAlert({ type: 'success', message: 'Your account successfully created' })
    // router.push('/career', { scroll: false })
    router.push('/games')
  }

  //! Handle step next and done
  const handleStepNext = async (currentStep: number) => {
    const isError = handleError()
    if (!isError) return
    // send otp to email and phone
    if (currentStep === RegisterStudentSteps.InitialInfoScreen) {
      const emailResponse: any = await sendEmailOtp(student.email)
      if (!emailResponse.isSuccess) return
      const phoneResponse: any = await sendPhoneOtp(student.phoneNumber)
      if (!phoneResponse.isSuccess) return
    }
    // register student
    if (currentStep === RegisterStudentSteps.AddressScreen) {
      handleRegisterStudent()
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
      case RegisterStudentSteps.InitialInfoScreen:
        return "Let's get acquainted"
      case RegisterStudentSteps.VerificationScreen:
        return 'Verify your account'
      case RegisterStudentSteps.PasswordScreen:
        return "Set your account's password"
      case RegisterStudentSteps.GradeScreen:
        return 'What grade are you in?'
      case RegisterStudentSteps.AgeScreen:
        return 'Set Your Age'
      case RegisterStudentSteps.AddressScreen:
        return 'What’s your current destination?'
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
        <CustomButton onClick={() => handleStepNext(currentStep)} className="!w-[200px]" loading={loading}>
          {RegisterStudentSteps.AddressScreen === currentStep ? 'Done' : 'Next'}
        </CustomButton>
        {/* <SuccessModal open={useModel.open} setOpen={useModel.setOpen} /> */}
      </div>
    </div>
  )
}

export default RegisterStudentLayout
