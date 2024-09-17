import { nordeco } from '@/app/font'
import { useAuthStore } from '@/store/authStore'
import classNames from 'classnames'
import React from 'react'
import { useCareerStore } from '@/store/careerStore'
import { CareerSteps } from '@/utils/enum'
import CustomButton from '../common/CustomButton'

const CareerDetail = () => {
  const careerDetail = useCareerStore((state) => state.careerDetail)
  const setCareerStep = useCareerStore((state) => state.setCareerStep)
  const takeQuiz = useCareerStore((state) => state.takeQuiz)
  const loading = useCareerStore((state) => state.loading)

  const startQuiz = async () => {
    const response = await takeQuiz({ career: careerDetail.name, gameType: 'Quiz' })
    if (!response.isSuccess) return
    setCareerStep(CareerSteps.TakeQuiz)
  }

  return (
    <div className="max-w-[1300px] m-auto px-5 mt-[10%]">
      <div className="grid md:grid-cols-2 gap-6 place-items-center h-[50vh]">
        <div className="border rounded h-full w-full"></div>
        <div className="w-[70%] flex flex-col gap-6">
          <h1 className={classNames(nordeco.className, 'text-3xl font-bold')}>{careerDetail.name}</h1>
          <div className={classNames(nordeco.className, 'flex flex-col gap-2')}>
            <h3 className="text-xl font-bold">Great choice!</h3>
            <p>Let&apos;s take a short quiz to know you career path better :)</p>
          </div>
          <div className="flex gap-4">
            <CustomButton onClick={startQuiz} height="36px" className="w-[130px]" loading={loading}>
              Start
            </CustomButton>
            <CustomButton onClick={() => {}} height="36px" color="transparent" className="w-[100px]">
              Skip
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetail
