import React from 'react'
import RangeSlider from '@/components/common/RangeSlider'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import { useEducatorStore } from '@/store/educatorStore'

const AgeScreen = () => {
  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  return (
    <RegisterEducatorLayout>
      <RangeSlider
        value={educator.yearsOfBirth}
        setValue={(value: number) => setEducator({ ...educator, yearsOfBirth: value })}
        min={18}
        max={65}
      />
    </RegisterEducatorLayout>
  )
}

export default AgeScreen
