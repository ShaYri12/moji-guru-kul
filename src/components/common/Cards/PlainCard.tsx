import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

type PlainCardProps = {
  title: string
  subTitle: string
  icon: string
  color?: 'green' | 'blue'
  className?: string
  variant?: 'primary' | 'secondary'
}

const PlainCard = ({ title, subTitle, icon, className, color }: PlainCardProps) => {
  return (
    <div className={classNames(className, 'h-[136px] rounded-[20px] border flex justify-between items-center px-6')}>
      <div>
        <p className="text-lite-black text-2.5xl leading-[120%] tracking-[0.64px]">{title}</p>
        <p className="text-lite-black text-xl">{subTitle}</p>
      </div>
      <div
        className={classNames('w-[72px] h-[72px] rounded-full flex justify-center items-center', {
          'bg-lime-green': color === 'green',
          'bg-soft-blue': color === 'blue',
        })}
      >
        <Image src={icon} alt={title} width={32} height={32} />
      </div>
    </div>
  )
}

export default PlainCard
