'use client'
import { Start } from '@/svg'
import Image from 'next/image'
import React from 'react'
import CustomButton from '../CustomButton'

type TutorCardProps = {
  tutorName: string
}

const TutorCard = ({ tutorName }: TutorCardProps) => {
  return (
    <div className="tutor-card relative rounded-[15px] shadow-input-shadow p-6">
      <div className="absolute top-0 right-0">
        <Image src="/assets/images/learning-hub/tutor-card-rectangle.svg" alt="Tutor Card Image" width={120} height={155} className="" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-5">
          <div className="border-[2.75px] border-soft-peach w-[68px] h-[68px] rounded-full flex justify-center items-center">
            <Image src="/assets/images/learning-hub/tutor.icon.svg" alt="Tutor Card Image" width={68} height={68} className="" />
          </div>
          <div>
            <h4 className="text-[#EFF9FF] text-xl md:text-[28px] font-normal">{tutorName}</h4>
            <div className="border border-white rounded px-2 py-0.5 text-white text-center inline-block pt-1">Science</div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 my-[30px]">
          <div className="relative flex w-[110px]">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex justify-center items-center">
              <Image src="/assets/images/landing-page/avater-1.svg" alt="moji gurukul" width={48} height={48} />
            </div>
            <div className="absolute right-[26px] md:right-6 w-12 h-12 bg-red-200 rounded-full flex justify-center items-center">
              <Image src="/assets/images/landing-page/avater-2.svg" alt="moji gurukul" width={48} height={48} />
            </div>
            <div className="absolute -right-1 w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center">
              <Image src="/assets/images/landing-page/avater-3.svg" alt="moji gurukul" width={48} height={48} />
            </div>
          </div>
          <div className="w-2/3">
            <p className="text-white text-base lg:text-lg font-normal">13 Total Students</p>
            <div className="flex gap-1 items-baseline">
              <Start />
              <p className="text-white text-sm md:text-base font-normal tracking-[0.148px] md:tracking-[0.32px] pt-0">
                4.8 <span className="text-white">(1.380 Review)</span>
              </p>
            </div>
          </div>
        </div>
        <CustomButton color="#fff" textColor="#753CBD" className="!h-12" onClick={() => {}}>
          View Profile
        </CustomButton>
      </div>
    </div>
  )
}

export default TutorCard
