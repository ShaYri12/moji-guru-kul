import { nordeco } from '@/app/font'
import { useUniversalStore } from '@/store/universalStore'
import LinearProgress from '@mui/joy/LinearProgress'
import classNames from 'classnames'

const StepBar = () => {
  const steps = useUniversalStore((state) => state)

  const calculatePercentage = (totalSteps: number, currentStep: number) => {
    return (currentStep / totalSteps) * 100
  }

  return (
    <div>
      <p className={classNames(nordeco.className, 'text-end text-sm font-bold leading-5 mb-1.5')}>
        Step {steps.currentStep}/{steps.steps}
      </p>
      <LinearProgress
        determinate
        value={calculatePercentage(steps.steps, steps.currentStep)}
        thickness={10}
        sx={{
          color: '#763BBC',
        }}
      />
    </div>
  )
}

export default StepBar
