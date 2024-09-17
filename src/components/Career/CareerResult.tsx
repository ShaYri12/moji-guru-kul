import { nordeco } from '@/app/font'
import classNames from 'classnames'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'

const CareerResult = () => {
  const [selectedReward, setSelectedReward] = useState('')
  return (
    <div className="max-w-[1300px] m-auto px-5 mt-[10%]">
      <div className="flex flex-col items-center gap-7 w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="size-28 rounded border shadow-grade-box" />
          <h3 className={classNames(nordeco.className, 'text-2xl text-lite-black')}>Congratulation!</h3>
        </div>
        <div className={classNames(nordeco.className, 'flex flex-col items-center gap-5')}>
          <h3 className="text-2xl text-lite-black font-bold tracking-wide">You&apos;ve received a reward</h3>
          <p className="text-xl tracking-wide">Points earned: 13456</p>
          <div className="border shadow-grade-box p-5 w-full flex flex-wrap gap-4">
            {['x1', 'x2', 'x3', 'x4'].map((item) => (
              <div
                key={item}
                onClick={() => setSelectedReward(item.toLocaleLowerCase())}
                className={classNames('size-16 border flex justify-center items-center cursor-pointer', {
                  'border-2 border-lime-green': selectedReward === item,
                })}
              >
                <p className="text-lg text-lite-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <CustomButton onClick={() => {}} height="36px" className="!w-[170px]">
          Claim
        </CustomButton>
      </div>
    </div>
  )
}

export default CareerResult
