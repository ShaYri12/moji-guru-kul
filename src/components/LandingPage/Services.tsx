'use client'
import { VideoButtonCircular } from '@/svg'
import { LanguageEnum } from '@/utils/enum'
import classNames from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Services = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  // const locale = pathname.split('/')?.[1] || 'en'
  const locale = useLocale()

  const [selectedService, setSelectedService] = useState(2)
  return (
    <div className="my-16 md:my-[115px]">
      <div className="flex lg:gap-4 flex-col lg:flex-row justify-between items-center mb-4 md:mb-8 xl:mb-14">
        <h2
          className={classNames('text-indigo text-3xl lg:text-[56px] font-bold leading-[120%] tracking-[1.12px] w-full lg:max-w-[540px]', {
            '!leading-[40px] md:!leading-[75px] mb-3': locale === LanguageEnum.Te,
          })}
        >
          {t('services.title')}
        </h2>
        <p className="text-mist text-base lg:text-2xl font-normal leading-[150%] tracking-[0.48px] w-full lg:max-w-[448px]">
          {t('services.description')}
        </p>
      </div>
      <div className="grid grid-rows-1 md:grid-rows-3 md:grid-flow-col gap-5 md:gap-8">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.id}
            className="min-h-[142px] rounded-[15px] p-4 md:p-6 flex items-center gap-8 border-[1.5px] border-transparent shadow-tiles cursor-default"
            style={{
              borderColor: selectedService === feature.id ? colors[i] : 'transparent',
            }}
            onClick={() => setSelectedService(feature.id)}
          >
            <div
              className={classNames('w-16 h-16 rounded-lg border-[4px] flex justify-center items-center bg-lime-green')}
              style={{
                backgroundColor: colors[i],
                borderColor: borderColors[i],
              }}
            >
              <Image src={feature.icon} alt="moji" width={22} height={22} />
            </div>
            <div className="w-[72%]">
              <h5 className="text-[#35343B] text-xl md:text-[28px] font-normal leading-[33.6px]">
                {locale === LanguageEnum.Te ? feature['title-te'] : feature.title}
              </h5>
              <p className="text-[#6D6A71] text-base md:text-xl font-normal leading-[150%] tracking-[0.4px]">
                {locale === LanguageEnum.Te ? feature['description-te'] : feature.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

const colors = ['#22CC9B', '#EB4E59', '#4D9EFA', '#F29EEB', '#753CBD', '#FBCC58']
const borderColors = ['#C6F6E8', '#FAD1D4', '#CDE4FE', '#F9D2F6', '#C0A5E1', '#FEEFCB']

type FeatureType = {
  id: number
  title: string
  content: string
  icon: string
  'title-te': string
  'description-te': string
}
export const FEATURES: FeatureType[] = [
  {
    id: 1,
    title: 'Gamified Learning',
    content: 'We’ve created a world where learning feels like play, with interactive games.',
    icon: '/assets/images/landing-page/game-icon.svg',
    'title-te': 'గేమిఫైడ్ లెర్నింగ్',
    'description-te': 'లెర్నింగ్ అనేది ఇంటరాక్టివ్ గేమ్‌లతో ఆడుకుంటున్నట్లు ఉండేలా మేము ఒక ప్రపంచాన్ని సృష్టించాము.',
  },
  {
    id: 2,
    title: 'Personalised Learning Paths',
    content: 'We tailor our lessons to fit the career aspirations of our students',
    icon: '/assets/images/landing-page/path-icon.svg',
    'title-te': 'పర్సనలైజ్డ్ లెర్నింగ్ మార్గాలు',
    'description-te': 'ఏ రెండు కలలు ఒకేలా ఉండవు. అందుకే మా స్టూడెంట్స్ యొక్క కెరీర్ ఆశలకు అనుగుణంగా మా లెస్సన్ లను తీర్చిదిద్దుతాం.',
  },
  {
    id: 3,
    title: 'Actionable Insights and Reports',
    content: 'Our comprehensive reports simplify the learning process, providing precise, practical steps.',
    icon: '/assets/images/landing-page/report-icon.svg',
    'title-te': 'కార్యాచరణాత్మక ఇన్ సైట్ లు మరియు రిపోర్ట్ లు',
    'description-te': 'మా సమగ్ర రిపోర్ట్ లు లెర్నింగ్ ప్రాసెస్ ను సులభతరం చేస్తాయి, ఖచ్చితమైన, ఆచరణాత్మక దశలను అందిస్తాయి.',
  },
  {
    id: 4,
    title: 'Zero Pressure Approach',
    content: 'Our innovative 15-minute daily lessons are designed to maximise learning ',
    icon: '/assets/images/landing-page/game-icon.svg',
    'title-te': 'జీరో ప్రెషర్ అప్రోచ్',
    'description-te': 'మా వినూత్నమైన 15 నిమిషాల రోజువారీ పాఠాలు లెర్నింగ్ ను గరిష్టంగా పెంచడానికి రూపొందించబడ్డాయి.',
  },
  {
    id: 5,
    title: 'Localised Education',
    content: 'We make complex concepts simple and familiar in a language that resonates with you.',
    icon: '/assets/images/landing-page/path-icon.svg',
    'title-te': 'హోలిస్టిక్ గ్రోత్',
    'description-te': 'స్టూడెంట్స్ ను లైఫ్ కోసం సిద్ధం చేసే స్కిల్స్ మరియు విలువలను పెంపొందించడానికి మేము విద్యకు మించి వెళ్తాము.',
  },
  {
    id: 6,
    title: 'Shared Learning',
    content: "Be a part of your child's educational journey with activities and insights that bring you closer.",
    icon: '/assets/images/landing-page/report-icon.svg',
    'title-te': 'షేర్డ్ లెర్నింగ్',
    'description-te': 'మిమ్మల్ని వాళ్ళతో దగ్గర చేసే యాక్టివిటీ లు మరియు ఇన్ సైట్ లతో మీ పిల్లల విద్యా ప్రయాణంలో భాగం అవ్వండి.',
  },
]
