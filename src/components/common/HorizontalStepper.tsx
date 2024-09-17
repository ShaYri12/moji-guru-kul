'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StreakTypes } from '@/utils/types'
import { getDayFromDate } from '@/utils/helperFunctions'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type HorizontalStepperProps = {
  streak: StreakTypes[]
}

export default function HorizontalStepper({ streak }: HorizontalStepperProps) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  //   const handleNext = () => {
  //     let newSkipped = skipped
  //     if (isStepSkipped(activeStep)) {
  //       newSkipped = new Set(newSkipped.values())
  //       newSkipped.delete(activeStep)
  //     }

  //     setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //     setSkipped(newSkipped)
  //   }

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1)
  //   }

  //   const handleSkip = () => {
  //     if (!isStepOptional(activeStep)) {
  //       // You probably want to guard against something like this,
  //       // it should never occur unless someone's actively trying to break something.
  //       throw new Error("You can't skip a step that isn't optional.")
  //     }

  //     setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //     setSkipped((prevSkipped) => {
  //       const newSkipped = new Set(prevSkipped.values())
  //       newSkipped.add(activeStep)
  //       return newSkipped
  //     })
  //   }

  //   const handleReset = () => {
  //     setActiveStep(0)
  //   }

  //   console.log('streak------------/', streak.length > 0 ? streak.findIndex((item, i) => days[i] == getDayFromDate(item.streakDate)) : 0)
  //   console.log(
  //     'streak1------------/',
  //     days.length > 0 ? days.find((item, i) => item.toLocaleLowerCase() == getDayFromDate(streak[0].streakDate)) : 'no'
  //   )
  //   const streak1 = streak.length ? getDayFromDate(streak[0].streakDate) : 0
  //   console.log('streak------------/*', streak1)
  React.useEffect(() => {
    if (!streak.length) return
    console.log('streak----------/*', getDayFromDate(streak?.[6]?.streakDate))
    console.log(
      'streak----------/',
      days.filter((item, i) => item === getDayFromDate(streak?.[i]?.streakDate))
    )
  }, [streak])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={streak.length > 0 ? streak.findIndex((item) => item.streakDate === getDayFromDate(new Date().toISOString())) : 0}
        alternativeLabel
      >
        {days.map((item, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={item} {...stepProps}>
              <StepLabel
                {...labelProps}
                // label position should be changed to top
              >
                {item}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Box>
        </React.Fragment>
      )} */}
    </Box>
  )
}
