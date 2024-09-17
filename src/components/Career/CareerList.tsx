'use client'

import { nordeco } from '@/app/font'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useCareerStore } from '@/store/careerStore'
import { useAuthStore } from '@/store/authStore'
import { CareerSteps } from '@/utils/enum'
import { useErrorStore } from '@/store/errorStore'

const CareerList = () => {
  // state
  const [selectedIndex, setSelectedIndex] = useState(0)
  // store
  const careers = useCareerStore((state) => state.career)
  const getCareer = useCareerStore((state) => state.getCareer)
  const saveCareer = useCareerStore((state) => state.saveCareer)
  const user = useAuthStore((state) => state.user)
  const setCareerDetail = useCareerStore((state) => state.setCareerDetail)
  const setCareerStep = useCareerStore((state) => state.setCareerStep)
  const loading = useCareerStore((state) => state.loading)
  const setError = useErrorStore((state) => state.setAlert)

  useEffect(() => {
    getCareer()
  }, [])

  const handleSaveCareer = async ({ careerId, name, index }: { careerId: number; name: string; index: number }) => {
    if (!user || !user?.id) return setError({ message: 'User not found', type: 'error' })
    setSelectedIndex(index)
    const response = await saveCareer({ userId: user.id, careerId })
    if (!response.isSuccess) return setError({ message: response.message, type: 'error' })
    const career = careers.find((career) => career.id === careerId)
    if (!career) return setError({ message: 'Career not found', type: 'error' })
    setCareerDetail(career)
    if (!loading && response.isSuccess) setCareerStep(CareerSteps.CareerDetail)
  }

  return (
    <div className="m-auto max-w-[1300px] px-5 mt-10">
      <h1 className={classNames(nordeco.className, 'text-3xl font-bold text-left')}>Personal career path</h1>
      <p className={classNames(nordeco.className)}>Choose your dream career to personalize learning</p>
      <div className="flex gap-5 flex-wrap mt-6">
        {CATEGORIES.map((category) => (
          <CustomButton key={category} onClick={() => {}} className="!w-[150px] text-lite-black" color="#CBCDCD" height="40px">
            {category}
          </CustomButton>
        ))}
      </div>
      <div className="mt-10">
        {careers.length ? (
          <div className="flex gap-4 flex-wrap">
            {careers.map((career, i) => (
              <div
                key={career.id}
                className="shadow-grade-box h-[150px] w-[200px] rounded-xl flex flex-col gap-5 justify-center items-center cursor-default"
              >
                <div>
                  <h1 className={classNames(nordeco.className, 'text-3xl font-bold text-primary')}>{career.name}</h1>
                  <p>{career.value}</p>
                </div>
                <CustomButton
                  onClick={() => {
                    handleSaveCareer({ careerId: career.id, name: career.name, index: i })
                  }}
                  loading={loading && selectedIndex === i}
                  className="!w-[120px] capitalize rounded"
                  height="30px"
                  color="#20cc9b6c"
                >
                  Choose
                </CustomButton>
              </div>
            ))}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default CareerList

const CATEGORIES = ['Tech', 'Creative', 'Traditional', 'Modern']
