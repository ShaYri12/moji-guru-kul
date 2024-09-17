import Image from 'next/image'
import React from 'react'

type RewardCardProps = {
  name: string
  images?: string
}

const RewardCard = ({ name, images }: RewardCardProps) => {
  return (
    <div className="bg-white border border-dark-sky-blue rounded-lg p-4 w-[138px]">
      <Image src={images || '/assets/images/games/reward-img.png'} alt="medal" width={106} height={118} className="rounded-[15px]" />
      <p className="text-indigo text-base md:text-lg font-normal text-center mt-1 break-words">{name}</p>
    </div>
  )
}

export default RewardCard
