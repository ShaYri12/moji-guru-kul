'use client'
import { raleway } from '@/app/font'
import CustomButton from '@/components/common/CustomButton'
import Divider from '@/components/common/Divider'
import StepBar from '@/components/common/StepBar'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useTutorStore } from '@/store/tutorStore'
import { useUniversalStore } from '@/store/universalStore'
import { ArrowRoundBackIcon } from '@/svg'
import { RegisterTutorSteps, RolesEnum } from '@/utils/enum'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

type RegisterTutorLayoutProps = {
  children: ReactNode
}

const RegisterTutorLayout = ({ children }: RegisterTutorLayoutProps) => {
  const user = useAuthStore((state) => state.user)

  const steps = useUniversalStore((state) => state.steps)
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setCurrentStep = useUniversalStore((state) => state.setCurrentStep)
  const errorState = useErrorStore((state) => state)
  const setAlert = useErrorStore((state) => state.setAlert)
  const loading = useTutorStore((state) => state.loading)
  const tutor = useTutorStore((state) => state.tutor)
  const setTutor = useTutorStore((state) => state.setTutor)
  const registerTutor = useTutorStore((state) => state.registerTutor)
  const setErrorMessages = useTutorStore((state) => state.setErrorMessages)

  const userFirstLanguage = useTutorStore((state) => state.userFirstLanguage)
  const userSecondLanguage = useTutorStore((state) => state.userSecondLanguage)
  const userThirdLanguage = useTutorStore((state) => state.userThirdLanguage)

  //! Handle error
  const handleError = () => {
    if (currentStep === RegisterTutorSteps.BasicInfoScreen) {
      if (!tutor.agencyId) {
        errorState.setRequired(true)
        return false
      }
      if (!tutor.linkedInURL) {
        errorState.setRequired(true)
        return false
      }
      if (!tutor.tutorSubjects[0].subjectId) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterTutorSteps.LanguageScreen) {
      if (!tutor.tutorSubjects.length) {
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterTutorSteps.QuestionScreen) {
      // check if all questions are answered filled
      const isAnswered = tutor.userQuestionsAnswers.every((question) => question.answer)
      if (!isAnswered) {
        // setErrorMessages('Please answer all the questions')
        errorState.setRequired(true)
        return false
      }
    }
    if (currentStep === RegisterTutorSteps.DocumentScreen) {
      if (!tutor.highestEducationalDocumentURL || !tutor.teachingExperienceCertificate) {
        setErrorMessages('Please upload all the required documents')
        return false
      }
    }
    return true
  }

  //! Handle register tutor
  const handleRegisterTutor = async () => {
    if (!user) {
      setAlert({
        message: 'Please login to continue',
        type: 'error',
      })
      return
    }
    if (user.role.toLocaleLowerCase() == RolesEnum.Tutor) {
      setAlert({
        message: 'Your have already registered as a tutor',
        type: 'error',
      })
      return
    }
    if (user.role.toLocaleLowerCase() !== RolesEnum.Educator) {
      setAlert({
        message: 'Please login as educator to continue',
        type: 'error',
      })
      return
    }
    const userLanguages = [
      { languageId: userFirstLanguage.languageId, languageLevel: userFirstLanguage.languageLevel },
      { languageId: userSecondLanguage.languageId, languageLevel: userSecondLanguage.languageLevel },
      { languageId: userThirdLanguage.languageId, languageLevel: userThirdLanguage.languageLevel },
    ]
    await registerTutor({ ...tutor, educatorId: user?.id, userLanguages })
    setAlert({ message: 'Your account successfully created', type: 'success' })
    useTutorStore.persist.clearStorage()
  }

  //! Handle step next and done
  const handleStepNext = async (currentStep: number) => {
    const isError = handleError()
    if (!isError) return

    // go to next step
    if (currentStep <= steps - 1) {
      setCurrentStep(currentStep + 1)
    }
    // register student
    if (currentStep === RegisterTutorSteps.DocumentScreen) {
      handleRegisterTutor()
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
      case RegisterTutorSteps.BasicInfoScreen:
        return "Let's get acquainted"
      case RegisterTutorSteps.LanguageScreen:
        return 'Add your languages'
      case RegisterTutorSteps.QuestionScreen:
        return 'Add your questions'
      case RegisterTutorSteps.DocumentScreen:
        return 'Upload your documents'
      default:
        return "Let's get acquainted"
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-6 h-full">
      <div className="flex relative">
        <h5 className={classNames(raleway.className, 'heading pb-6 text-primary')}>{heading(currentStep)}</h5>
      </div>
      <div className="w-full md:w-[80%] relative">
        <div className="absolute left-2 -top-12 md:-top-14 cursor-pointer">
          <span className="hidden md:block">
            <ArrowRoundBackIcon onClick={() => handleStepBack(currentStep)} />
          </span>
          <span className="block md:hidden">
            <ArrowRoundBackIcon onClick={() => handleStepBack(currentStep)} width="26" height="26" />
          </span>
        </div>
        <Divider />
        <span className="mt-5 inline-block border border-lime-green px-3 rounded pt-1 cursor-pointer text-lite-gray">Skip</span>
      </div>
      <div className="flex flex-col gap-14 justify-between items-center h-full w-full min-h-[70vh]">
        <div className="mt-9 w-full max-w-[800px]">
          <StepBar />
        </div>
        <div className="w-full flex flex-col items-center">{children}</div>
        <CustomButton onClick={() => handleStepNext(currentStep)} className="!w-[200px]" loading={loading}>
          {RegisterTutorSteps.DocumentScreen === currentStep ? 'Done' : 'Next'}
        </CustomButton>
      </div>
    </div>
  )
}

export default RegisterTutorLayout
