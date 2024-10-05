'use client'
import React from 'react'
import CustomButton from '@/components/common/CustomButton'
import { useRouter } from 'next/navigation'

function Success() {
  const router = useRouter()
  return (
    <div className="horizontal-spacing h-[50vh]">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-lime-green text-2xl md:text-5xl font-bold mb-4 text-center w-full max-w-[600px]">
          Subscription has been completed successfully
        </h1>
        <CustomButton color="#4D9EF9" className="!w-[180px]" onClick={() => router.push('/games')}>
          Games
        </CustomButton>
      </div>
    </div>
  )
}

export default Success
