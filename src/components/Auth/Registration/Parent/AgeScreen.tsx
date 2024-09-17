import React from 'react'
import RegisterParentLayout from './RegisterParentLayout'
import RangeSlider from '@/components/common/RangeSlider'
import { useParentStore } from '@/store/parentStore'

const AgeScreen = () => {
  const parent = useParentStore((state) => state.parent)
  const setParent = useParentStore((state) => state.setParent)
  return (
    <RegisterParentLayout>
      <RangeSlider
        value={parent.yearsOfBirth}
        setValue={(value: number) => setParent({ ...parent, yearsOfBirth: value })}
        min={18}
        max={99}
      />
    </RegisterParentLayout>
  )
}

export default AgeScreen
