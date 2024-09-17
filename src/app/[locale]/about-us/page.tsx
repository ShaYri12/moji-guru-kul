import LearningRevolution from '@/components/AboutUs/LearningRevolution'
import LearningTips from '@/components/AboutUs/LearningTips'
import OurStory from '@/components/AboutUs/OurStory'
import OurTeam from '@/components/AboutUs/OurTeam'
import CustomHeader from '@/components/common/CustomHeader'
import { useTranslations } from 'next-intl'
import React from 'react'

function AboutUs() {
  const t = useTranslations('AboutUs')

  return (
    <div>
      <CustomHeader
        title={t('title')}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: `${t('title')}`, href: '/about-us' },
        ]}
      />
      <LearningTips />
      <OurStory />
      <LearningRevolution />
      <OurTeam />
    </div>
  )
}

export default AboutUs
