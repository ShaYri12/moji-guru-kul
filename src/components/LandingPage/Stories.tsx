'use client'
import React, { useState } from 'react'
import VideoCard from '../common/Cards/VideoCard'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { LanguageEnum } from '@/utils/enum'

const Stories = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const locale = useLocale()

  const videoRf = React.useRef<HTMLVideoElement>(null)
  const [selected, setSelected] = useState(0)
  return (
    <div className="mt-10 lg:mt-20 mb-8">
      <div className="flex lg:gap-4 flex-col lg:flex-row justify-between items-center mb-4 md:mb-8 xl:mb-14">
        <h2
          className={classNames('text-indigo text-3xl lg:text-[56px] font-bold leading-[120%] tracking-[1.12px] w-full lg:max-w-[378px]', {
            '!leading-[60px] lg:!leading-[92px]': locale === LanguageEnum.Te,
          })}
        >
          {t('stories.title')}
        </h2>
        <p className="text-mist text-base lg:text-2xl font-normal leading-[150%] tracking-[0.48px] w-full lg:max-w-[495px]">
          {t('stories.description')}
        </p>
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {Videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            role={video.role}
            thumbnail={video.thumbnail}
            videoPath={video.videoPath}
            selected={selected === index}
            onClick={() => {
              setSelected(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Stories

const Videos = [
  {
    title: 'Rajeev Shenoy',
    role: 'Students',
    thumbnail: '/assets/images/landing-page/student-one.jpg',
    videoPath: '/assets/videos/landing-page-demo.mp4',
  },
  {
    title: 'Mahita Kumari',
    role: 'Students',
    thumbnail: '/assets/images/landing-page/student-two.jpeg',
    videoPath: '/assets/videos/landing-page-demo.mp4',
  },
  {
    title: 'Pooja Rani',
    role: 'Students',
    thumbnail: '/assets/images/landing-page/student-three.jpg',
    videoPath: '/assets/videos/landing-page-demo.mp4',
  },
]
