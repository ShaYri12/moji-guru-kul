'use client'
import { InfoCardEclipseShape } from '@/svg'
import classNames from 'classnames'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import CustomButton from '../CustomButton'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

type InfoCardProps = {
  title: string
  // content: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  className?: string
  link: string
  icon: string
  children: ReactNode
}

const InfoCard = ({ title, children, className, icon, link, variant = 'primary' }: InfoCardProps) => {
  const t = useTranslations('Home')

  const { push } = useRouter()
  return (
    <div
      className={classNames('bg-no-repeat bg-right-bottom shadow-info-card-shadow bg-white rounded-[15px] w-full pb-8', className, {
        'bg-info-card-shape1': variant === 'primary',
        'bg-info-card-shape2': variant === 'secondary',
        'bg-info-card-shape3': variant === 'tertiary',
      })}
    >
      <div className="relative">
        <InfoCardEclipseShape
          color={variant === 'primary' ? '#B0D1E9' : variant === 'secondary' ? '#6027CC' : '#E982CB'}
          opacity={variant === 'primary' ? '0.3' : variant === 'secondary' ? '0.18' : '0.22'}
        />
        <div className="absolute top-7 left-7 flex items-center gap-4">
          <div className="flex justify-center items-center  w-[72px] h-[72px] rounded-full border-[2.718px] border-[#5189B1] bg-[#96A2CC] overflow-hidden">
            <Image src={icon} alt="moji gurukul" width={41} height={70} className="object-contain relative top-2.5" />
          </div>
          <p className="text-casal text-xl lg:text-[28px] font-medium tracking-[0.56px]">{title}</p>
        </div>
      </div>
      <div className="px-8 mt-2 flex flex-col gap-6 md:gap-10">
        <div className="min-h-[200px]">{children}</div>
        <CustomButton
          color="#F3F8FC"
          variant="outlined"
          className={classNames(
            '!text-lg md:!text-xl !capitalize !font-normal !tracking-[0.52px] md:border-2 !rounded hover:!text-white !h-12 !text-indigo !border-indigo hover:!bg-indigo',
            {
              // '!text-[#61A3D4] !border-[#61A3D4] hover:!bg-[#61A3D4]': variant === 'primary',
              // '!text-[#6027CC] !border-[#6027CC] hover:!bg-[#6027CC]': variant === 'secondary',
              // '!text-[#E982CB] !border-[#E982CB] hover:!bg-[#E982CB]': variant === 'tertiary',
            }
          )}
          onClick={() => {
            push(link)
          }}
        >
          {t('joinNow')}
        </CustomButton>
      </div>
    </div>
  )
}

export default InfoCard
