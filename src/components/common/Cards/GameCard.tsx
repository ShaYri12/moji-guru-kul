import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import CustomButton from '../CustomButton'

type ImageCardProps = {
  name: string
  image: string
  className?: string
  imageBgColor?: string
}

const GameCard = ({ name, image, className, imageBgColor }: ImageCardProps) => {
  return (
    <div className={classNames('w-full rounded-2xl flex flex-col gap-3 items-center pb-6', className)}>
      <div className={classNames('rounded-2xl flex justify-center items-center h-44 w-full', imageBgColor)}>
        <Image src={image} alt={name} width={107} height={102} className="object-contain" />
      </div>
      <h4 className="text-nile-blue text-lg md:text-[28px] font-normal leading-[120%] tracking-[0.56px] text-center">{name}</h4>
      <CustomButton
        onClick={() => {}}
        color="#753CBD"
        className="!w-28 md:!w-[124px] !h-9 mg:!h-12 !text-vista-white !text-sm md:!text-base !font-normal"
      >
        Play Games
      </CustomButton>
    </div>
  )
}

export default GameCard
