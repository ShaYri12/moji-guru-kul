'use client'

import React, { Fragment, useEffect } from 'react'
import { useUniversalStore } from '@/store/universalStore'
import InitialInfoScreen from './InitialInfoScreen'
import { RegisterParentSteps } from '@/utils/enum'
import PasswordScreen from './PasswordScreen'
import AgeScreen from './AgeScreen'
import InvitationScreen from './InvitationScreen'
import VerificationScreen from './VerificationScreen'

const RegisterParent = () => {
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setTotalSteps = useUniversalStore((state) => state.setSteps)

  useEffect(() => {
    setTotalSteps(4)
  }, [])

  const parent = (currentStep: number) => {
    switch (currentStep) {
      case RegisterParentSteps.InitialInfoScreen:
        return <InitialInfoScreen />
      case RegisterParentSteps.VerificationScreen:
        return <VerificationScreen />
      case RegisterParentSteps.PasswordScreen:
        return <PasswordScreen />
      case RegisterParentSteps.AgeScreen:
        return <AgeScreen />
      // case RegisterParentSteps.InvitationScreen:
      //   return <InvitationScreen />
      default:
        return <InitialInfoScreen />
    }
  }

  return <Fragment> {parent(currentStep)}</Fragment>
}

export default RegisterParent
