import React from 'react'
import Breadcrumb from './Breadcrumb'

type CustomHeaderProps = {
  title: string
  backgroundImage?: string
  breadcrumb: {
    label: string
    href: string
  }[]
}

const CustomHeader = ({ title, backgroundImage, breadcrumb }: CustomHeaderProps) => {
  return (
    <div className="bg-about-us-banner bg-no-repeat bg-cover bg-top w-full h-[294px] min-[1440px]:h-[310px] 2xl:h-[325px]">
      <div className="w-full max-w-[1120px] m-auto h-full flex flex-col justify-center">
        <div className="p-4">
          <h1 className="text-indigo text-5xl font-bold">{title}</h1>
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
      </div>
    </div>
  )
}

export default CustomHeader
