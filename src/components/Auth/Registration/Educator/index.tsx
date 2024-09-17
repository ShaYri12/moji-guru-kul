'use client'

import React, { Fragment, useEffect } from 'react'
import { useUniversalStore } from '@/store/universalStore'
import InitialInfoScreen from './InitialInfoScreen'
import { RegisterEducatorSteps } from '@/utils/enum'
import PasswordScreen from './PasswordScreen'
import AgeScreen from './AgeScreen'
import AddressScreen from './AddressScreen'
import VerificationScreen from './VerificationScreen'
import ExperienceScreen from './ExperienceScreen'

const RegisterEducator = () => {
  const currentStep = useUniversalStore((state) => state.currentStep)
  const setTotalSteps = useUniversalStore((state) => state.setSteps)

  useEffect(() => {
    setTotalSteps(6)
  }, [])

  const educator = (currentStep: number) => {
    switch (currentStep) {
      case RegisterEducatorSteps.InitialInfoScreen:
        return <InitialInfoScreen />
      case RegisterEducatorSteps.VerificationScreen:
        return <VerificationScreen />
      case RegisterEducatorSteps.PasswordScreen:
        return <PasswordScreen />
      case RegisterEducatorSteps.AgeScreen:
        return <AgeScreen />
      case RegisterEducatorSteps.AddressScreen:
        return <AddressScreen />
      case RegisterEducatorSteps.ExperienceScreen:
        return <ExperienceScreen />

      default:
        return <InitialInfoScreen />
    }
  }

  return <Fragment> {educator(currentStep)}</Fragment>
}

export default RegisterEducator
