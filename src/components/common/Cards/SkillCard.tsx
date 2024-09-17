import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

type ImageCardProps = {
  name: string
  image: string
  className?: string
}

const SkillCard = ({ name, image, className }: ImageCardProps) => {
  return (
    <div className={classNames('w-full', className)}>
      <div className="rounded-2xl flex justify-center items-center">
        <Image src={image} alt={name} width={85} height={85} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-nile-blue text-lg font-normal leading-[150%] tracking-[0.36px] text-center">{name}</h4>
    </div>
  )
}

export default SkillCard
