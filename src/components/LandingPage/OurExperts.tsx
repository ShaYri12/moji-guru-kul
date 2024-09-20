'use client'
import React from 'react'
import CustomButton from '../common/CustomButton'
import Image from 'next/image'
import { Start, WrappedStar } from '@/svg'
import classNames from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { LanguageEnum } from '@/utils/enum'

const OurExperts = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const locale = useLocale()

  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [selectedItem, setSelectedItem] = React.useState(TutorsData[selectedIndex])
  return (
    <div>
      <div className="flex lg:gap-4 flex-col xl:flex-row justify-between xl:items-center mb-4">
        <h2
          className={classNames(
            'text-indigo text-[30px] md:text-3xl lg:text-[56px] font-bold !leading-[120%] tracking-[1.12px] w-full xl:max-w-[247px]',
            {
              '!leading-[60px] lg:!leading-[75px]': locale === LanguageEnum.Te,
            }
          )}
        >
          {t('experts.title')}
        </h2>
        <div className="flex items-center justify-between flex-col sm:flex-row gap-8">
          <p className="text-mist text-base md:text-lg lg:text-2xl font-normal leading-[150%] tracking-[0.48px] w-full lg:max-w-[472px]">
            {t('experts.description')}
          </p>
          <CustomButton
            onClick={() => {}}
            variant="contained"
            color="#753CBD"
            className="!text-vista-white !text-base !font-normal !w-[160px] hidden md:block !capitalize"
          >
            {t('experts.exploreTutors')}
          </CustomButton>
        </div>
      </div>
      <div className="flex gap-8 items-center justify-between flex-col lg:flex-row min-h-[530px]">
        <div className="w-full mb-10 mt-6 xl:my-0 lg:w-2/5">
          <div className="tilted-card">
            <div className="shadow-info-card-shadow bg-white w-[190px] h-[260px] md:w-[270px] md:h-[340px] xl:w-[318px] xl:h-[392px] rounded-2xl relative left-6 bottom-[12px] rotate-[1.909deg]">
              <Image
                src={selectedItem.thumbnail}
                alt="Tilted Card"
                width={318}
                height={392}
                className="w-[190pƒx] h-[260px] md:w-[270px] md:h-[340px] xl:w-full xl:h-full object-cover object-top rounded-2xl "
              />
              <div className="text-xl font-normal leading-[150%] tracking-[0.4px] mt-5 flex flex-col items-center">
                <p className="text-black">{selectedItem.title}</p>
                <p className="text-mist text-lg">{selectedItem.role}</p>
              </div>
              <div className="shadow-info-card-shadow bg-white w-[98px] h-[104px] md:w-[140px] md:h-[153px] xl:w-[160px] xl:h-[173px] rounded-xl md:rounded-2xl absolute -right-[32%] bottom-[26%] flex flex-col justify-center items-center">
                <span className="hidden md:block">
                  <WrappedStar />
                </span>
                <span className="md:hidden">
                  <WrappedStar width="32" height="29" />
                </span>
                <div className="text-lite-black text-sm md:text-lg font-normal leading-[150%] tracking-[0.4px]">
                  <p>
                    {selectedItem.reviews} <br /> Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          {TutorsData.map((tutor, index) => (
            <div
              key={index}
              className={classNames('flex items-center justify-between gap-4 p-3 md:p-6 rounded-2xl hover:bg-[#F6F2FD] mb-4', {
                'bg-[#F6F2FD] border-[1.5px] border-indigo': selectedIndex === index,
              })}
              onClick={() => {
                setSelectedIndex(index)
                setSelectedItem(tutor)
              }}
            >
              <div className="flex gap-4 items-center">
                <Image src={tutor.image} alt={tutor.title} width={56} height={56} />
                <div>
                  <p className="text-lite-black text-lg md:text-2xl font-normal leading-[150%] tracking-[0.48px]">{tutor.title}</p>
                  <p className="text-slate text-sm md:text-xl font-normal leading-[150%] tracking-[0.4px]">{tutor.role}</p>
                </div>
              </div>

              <div>
                <div className="flex gap-1 items-baseline">
                  <Start />
                  <span className="text-grey text-sm md:text-base font-normal leading-[150%] tracking-[0.32px]">{tutor.rating}</span>
                  <span className="text-slate text-xs md:text-base font-normal leading-[150%] tracking-[0.32px]">
                    ({tutor.reviews} Review)
                  </span>
                </div>
                <p className="text-lite-black text-xs md:text-base font-normal leading-[150%] tracking-[0.32px]">
                  {tutor.totalStudent} Total Student
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-4">
        <CustomButton
          onClick={() => {}}
          variant="contained"
          color="#753CBD"
          className="!text-vista-white !text-base !font-normal !w-[160px] md:hidden"
        >
          Explore Tutors
        </CustomButton>
      </div>
    </div>
  )
}

export default OurExperts

const TutorsData = [
  {
    title: 'Nitin Kumar',
    role: 'Teacher',
    rating: 4.8,
    reviews: '380',
    totalStudent: '1k',
    image: '/assets/images/landing-page/teacher1.svg',
    thumbnail: '/assets/images/landing-page/female-tutor.jpg',
  },
  {
    title: 'Rohit Sharma',
    role: 'Teacher',
    rating: 4.9,
    reviews: '250',
    totalStudent: '2k',
    image: '/assets/images/landing-page/teacher2.svg',
    thumbnail: '/assets/images/landing-page/male-tutor.jpg',
  },
  {
    title: 'Abhishek Chaudhary',
    role: 'Teacher',
    rating: 4.8,
    reviews: '180',
    totalStudent: '1k',
    image: '/assets/images/landing-page/teacher3.svg',
    thumbnail: '/assets/images/landing-page/story1-thumbnail.png',
  },
]
