'use client'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { RoundedRightArrow } from '@/svg'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import classNames from 'classnames'
import { LanguageEnum } from '@/utils/enum'
import CustomModal from '../common/CustomModal'
import { ROLES_DETAILS } from '@/utils/constants'
import SignupPopup from '../common/SignupPopup'
import { useUniversalStore } from '@/store/universalStore'

const Contact = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  const { setIsSignupPopupOpen } = useUniversalStore()

  return (
    <Fragment>
      <div className="relative bg-[#9F7AE6] min-h-[452px] rounded-2xl mb-[76px]">
        <Image
          src="/assets/images/landing-page/contact-top-shape.svg"
          alt="contact mojigurukul"
          width={460}
          height={460}
          className="absolute top-0 right-0"
        />
        <Image
          src="/assets/images/landing-page/contact-bottom-shape.svg"
          alt="contact mojigurukul"
          width={160}
          height={160}
          className="absolute bottom-0 left-0"
        />
        <div className="transform-center w-full lg:w-[62%] flex flex-col items-center p-4">
          <h1
            className={classNames(
              'text-vista-white text-3xl md:text-[56px] text-center font-medium leading-[120%] tracking-[1.12px] w-full max-w-[744px] mb-4',
              {
                '!text-[28px]': locale === LanguageEnum.Te,
              }
            )}
          >
            {t('contact.title')}
          </h1>
          <p className="text-vista-white text-lg md:text-2xl text-center leading-[150%] tracking-[0.48px] font-normal w-full max-w-[628px] mb-8">
            {t('contact.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CustomButton
              onClick={() => {
                setIsSignupPopupOpen(true)
              }}
              variant="contained"
              color="#fff"
              className="flex gap-1 items-center !text-indigo !text-lg !font-normal sm:!w-[185px]"
            >
              {t('contact.joinForFree')}
              <RoundedRightArrow />
            </CustomButton>

            <CustomButton
              onClick={() => {
                router.push('/contact-us')
              }}
              variant="outlined"
              color="transparent"
              className="border-2 border-vista-white !text-white !text-lg !font-normal sm:!w-[144px] hover:border-vista-white"
            >
              {t('contactUs')}
            </CustomButton>
          </div>
        </div>
      </div>
      <SignupPopup />
    </Fragment>
  )
}

export default Contact
