'use client'
import React from 'react'
import InfoCard from '../common/Cards/InfoCard'
import Image from 'next/image'
import { ABOUT_PARENTS, ABOUT_STUDENTS, ABOUT_TUTORS } from '@/utils/constants'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { LanguageEnum } from '@/utils/enum'
import classNames from 'classnames'

const About = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  // const locale = pathname.split('/')?.[1] || 'en'
  const locale = useLocale()

  return (
    <div className="my-5 md:my-14">
      <div className="flex lg:gap-4 flex-col lg:flex-row justify-between items-center mb-4 md:mb-20">
        <h2
          className={classNames('text-indigo text-3xl lg:text-[56px] font-bold leading-[120%] tracking-[1.12px] w-full lg:max-w-[352px]', {
            '!leading-[40px] md:!leading-[74px] mb-3 lg:!max-w-[430px]': locale === LanguageEnum.Te,
          })}
        >
          {t('discover.title')}
        </h2>
        <p className="text-mist text-lg lg:text-2xl font-normal leading-[150%] tracking-[0.48px] w-full lg:max-w-[450px]">
          {t('discover.description')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <InfoCard
          title={t('discover.forStudent')}
          className="!max-w-[352px]"
          link="/register-student"
          icon="/assets/images/landing-page/student-icon.svg"
        >
          {ABOUT_STUDENTS.map((item, index) => (
            <div key={item.id} className="flex items-center gap-1 mb-3">
              <Image src="/assets/icons/static-checkbox.svg" alt={item.description} width={24} height={24} />
              <p className="text-mist text-xl font-normal leading-[30px] ">
                {locale === LanguageEnum.Te ? item['description-te'] : item.description}
              </p>
            </div>
          ))}
        </InfoCard>
        <InfoCard
          title={t('discover.forParent')}
          variant="secondary"
          className="!max-w-[352px]"
          link="/register-parent"
          icon="/assets/images/landing-page/parent-icon.svg"
        >
          {ABOUT_PARENTS.map((item, index) => (
            <div key={item.id} className="flex items-center gap-1 mb-[14px]">
              <Image src="/assets/icons/static-checkbox.svg" alt={item.description} width={24} height={24} />
              <p className="text-mist text-xl font-normal leading-[30px] ">
                {locale === LanguageEnum.Te ? item['description-te'] : item.description}
              </p>
            </div>
          ))}
        </InfoCard>
        <InfoCard
          title={t('discover.forTutor')}
          variant="tertiary"
          className="!max-w-[352px]"
          link="/register-educator"
          icon="/assets/images/landing-page/teacher-icon.svg"
        >
          {ABOUT_TUTORS.map((item, index) => (
            <div key={item.id} className="flex items-center gap-1 mb-3">
              <Image src="/assets/icons/static-checkbox.svg" alt={item.description} width={24} height={24} />
              <p className="text-mist text-xl font-normal leading-[30px] ">
                {locale === LanguageEnum.Te ? item['description-te'] : item.description}
              </p>
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  )
}

export default About
