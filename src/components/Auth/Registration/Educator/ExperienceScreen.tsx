import React from 'react'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import RangeSlider from '@/components/common/RangeSlider'
import { useEducatorStore } from '@/store/educatorStore'

const ExperienceScreen = () => {
  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  return (
    <RegisterEducatorLayout>
      <RangeSlider
        value={educator.workExperience}
        setValue={(value: number) => setEducator({ ...educator, workExperience: value })}
        min={0}
        max={40}
      />
    </RegisterEducatorLayout>
  )
}

export default ExperienceScreen
