'use client'

import React, { Fragment, useEffect } from 'react'
import { useUniversalStore } from '@/store/universalStore'
import InitialStudentInfo from './InitialInfoScreen'
import VerificationScreen from './VerificationScreen'
import PasswordScreen from './PasswordScreen'
import GradeScreen from './GradeScreen'
import AddressScreen from './AddressScreen'
import AgeScreen from './AgeScreen'
import { RegisterStudentSteps } from '@/utils/enum'

const RegisterStudent = () => {
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setTotalSteps = useUniversalStore((state) => state.setSteps)

  useEffect(() => {
    setTotalSteps(6)
  }, [])

  const children = (currentStep: number) => {
    switch (currentStep) {
      case RegisterStudentSteps.InitialInfoScreen:
        return <InitialStudentInfo />
      case RegisterStudentSteps.VerificationScreen:
        return <VerificationScreen />
      case RegisterStudentSteps.PasswordScreen:
        return <PasswordScreen />
      case RegisterStudentSteps.GradeScreen:
        return <GradeScreen />
      case RegisterStudentSteps.AgeScreen:
        return <AgeScreen />
      case RegisterStudentSteps.AddressScreen:
        return <AddressScreen />
      default:
        return <InitialStudentInfo />
    }
  }

  return <Fragment> {children(currentStep)}</Fragment>
}

export default RegisterStudent
