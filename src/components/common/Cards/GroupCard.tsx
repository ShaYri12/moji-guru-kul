import Image from 'next/image'
import React from 'react'
import CustomButton from '../CustomButton'
import { useRouter } from 'next/navigation'

type GroupCardProps = {
  id: number
  groupName: string
}

const GroupCard = ({ id, groupName }: GroupCardProps) => {
  const router = useRouter()

  return (
    <div className="bg-lime-green w-full min-h-[196px] rounded-[15px] p-6">
      <div className="flex gap-2 md:gap-4 mb-8">
        <div className="relative flex w-[110px] md:w-[132px] justify-end">
          <div className="absolute right-12 md:right-[62px] z-10 1 w-12 h-12 md:w-[68px] md:h-[68px] rounded-full flex justify-center items-center border-[2.75px] border-white">
            <Image src="/assets/images/learning-hub/tutor.icon.svg" alt="moji gurukul" width={68} height={68} />
          </div>
          <div className="absolute right-6 md:right-[31px] w-12 h-12 md:w-[68px] md:h-[68px] rounded-full flex justify-center items-center border-[2.75px] border-white">
            <Image src="/assets/images/learning-hub/tutor.icon.svg" alt="moji gurukul" width={68} height={68} />
          </div>
          <div className="w-12 h-12 md:w-[68px] md:h-[68px] rounded-full flex justify-end items-center border-[2.75px] border-white">
            <Image src="/assets/images/learning-hub/tutor.icon.svg" alt="moji gurukul" width={68} height={68} />
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-white text-xl lg:text-[28px] font-normal capitalize overflow-hidden break-words">{groupName || 'Group name'}</p>
          <div className="flex gap-1 items-baseline">
            <p className="text-white text-base md:text-lg font-normal tracking-[0.148px] md:tracking-[0.32px] pt-0">13 Students</p>
          </div>
        </div>
      </div>
      <CustomButton
        color="#753CBD"
        textColor="#fff"
        className="!h-12"
        onClick={() => {
          router.push(`/learning-hub/${id}`)
        }}
      >
        View All Students
      </CustomButton>
    </div>
  )
}

export default GroupCard
