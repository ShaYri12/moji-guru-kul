'use client'

import React, { Fragment, useEffect } from 'react'
import { useUniversalStore } from '@/store/universalStore'
import { RegisterTutorSteps } from '@/utils/enum'
import InitialScreen from './InitialScreen'
import DocumentsScreen from './DocumentsScreen'
import { AgencyTypes, LanguageResponseTypes, TutorQuestionTypes, TutorSubjectTypes } from '@/utils/types'
import LanguageScreen from './LanguageScreen'
import QuestionScreen from './QuestionScreen'

type RegisterTutorProps = {
  agencies: AgencyTypes[]
  languages: LanguageResponseTypes[]
  subjects: TutorSubjectTypes[]
  questions: TutorQuestionTypes[]
}

const RegisterTutor = ({ agencies, languages, subjects, questions }: RegisterTutorProps) => {
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setTotalSteps = useUniversalStore((state) => state.setSteps)

  useEffect(() => {
    setTotalSteps(Object.keys(RegisterTutorSteps).length / 2)
  }, [])

  const tutor = (currentStep: number) => {
    switch (currentStep) {
      case RegisterTutorSteps.BasicInfoScreen:
        return <InitialScreen agencies={agencies} subjects={subjects} />
      case RegisterTutorSteps.LanguageScreen:
        return <LanguageScreen languages={languages} />
      case RegisterTutorSteps.QuestionScreen:
        return <QuestionScreen questions={questions} />
      case RegisterTutorSteps.DocumentScreen:
        return <DocumentsScreen />
      default:
        return <InitialScreen agencies={agencies} subjects={subjects} />
    }
  }

  return <Fragment> {tutor(currentStep)}</Fragment>
}

export default RegisterTutor
