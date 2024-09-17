'use client'

import React, { Fragment } from 'react'
import CareerList from './CareerList'
import { useCareerStore } from '@/store/careerStore'
import WelcomeScreen from '../common/WelcomeScreen'
import CareerDetail from './CareerDetail'
import { CareerSteps } from '@/utils/enum'
import PlayGame from './PlayGame'
import TakeQuiz from './TakeQuiz'
import CareerResult from './CareerResult'

const Career = () => {
  const careerStep = useCareerStore((state) => state.careerStep)

  const activeScreen = () => {
    switch (careerStep) {
      case CareerSteps.Welcome:
        return <WelcomeScreen />
      case CareerSteps.CareerList:
        return <CareerList />
      case CareerSteps.CareerDetail:
        return <CareerDetail />
      case CareerSteps.TakeQuiz:
        return <TakeQuiz />
      case CareerSteps.PlayGame:
        return <PlayGame />
      case CareerSteps.CareerResult:
        return <CareerResult />
      default:
        return <WelcomeScreen />
    }
  }

  return <Fragment>{activeScreen()}</Fragment>
}

export default Career
