import Image from 'next/image'
import React, { useState } from 'react'
import Level from './Level'
import Link from 'next/link'
import DateRangePicker from './DateRangePicker'
import Chart from './Chart'

// Levels
const levels = [
  {
    level: 1,
    image: '/assets/icons/level-one.svg',
    requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
    benefits: ['Benefit 1', 'Benefit 2'],
  },
  {
    level: 2,
    image: '/assets/icons/level-two.svg',
    requirements: ['Requirement 4', 'Requirement 5'],
    benefits: ['Benefit 3', 'Benefit 4'],
  },
  {
    level: 3,
    image: '/assets/icons/level-two.svg',
    requirements: ['Requirement 6', 'Requirement 7'],
    benefits: ['Benefit 5', 'Benefit 6'],
  },
  {
    level: 4,
    image: '/assets/icons/level-two.svg',
    requirements: ['Requirement 8', 'Requirement 9'],
    benefits: ['Benefit 7', 'Benefit 8'],
  },
  {
    level: 5,
    image: '/assets/icons/level-two.svg',
    requirements: ['Requirement 10', 'Requirement 11'],
    benefits: ['Benefit 9', 'Benefit 10'],
  },
]

//  Earning
const earningsData = [
  {
    title: 'Total Earning',
    amount: '$200',
    subtitle: 'Ready For Withdraw',
    predicted: '$200',
    buttonText: 'Withdraw',
    linkText: 'See report',
    linkIcon: '/assets/icons/see-report-arrow.svg',
    linkUrl: '/see-report',
  },
  {
    title: 'Payment Being Cleared',
    amount: '$200',
    subtitle: 'Predicted To This Month',
    predicted: '$200',
    predictedYear: '$200',
    extraSubtitle: 'Predicted To This Year',
  },
  {
    title: 'Earning This Month',
    amount: '$200',
    subtitle: 'Earning This Week',
    predicted: '$200',
    extraSubtitle: 'Earning Today',
    predictedYear: '$200',
  },
]

const EarningTab = () => {
  // Sample data representing monthly values
  const [data, setData] = useState<number[]>([40, 80, 60, 120, 160, 70, 50, 200, 90, 130, 110, 80])

  const handleApply = (startDate: Date, endDate: Date) => {
    // Example logic for filtering data based on date range
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)
    // Here, you can implement your data filtering logic
  }
  return (
    <div className="w-full">
      {/* Progress Tracker */}
      <div className="mt-10 shadow-tab w-full bg-white rounded-[16px] p-6 border border-[#EDF5FF] ">
        <div className="w-full flex gap-10 md:gap-4 justify-center md:justify-between items-center flex-wrap">
          {/* Tutor Name */}
          <div className="border border-[#EDF5FF] rounded-lg py-8 px-4 w-full md:min-w-[220px] flex justify-center items-center gap-3">
            <Image src="/assets/icons/earning-tab-profile.svg" alt="profile" width={60} height={60} />
            <div className="text-nowrap flex gap-1 flex-col">
              <h2 className="text-[#49444E] text-[20px] leading-[22px] font-normal">Tutor Name</h2>
              <h2 className="text-[#753CBD] text-[18px] leading-[20px] font-medium">$500</h2>
              <h2 className="text-[#22CC9B] text-[14px] leading-[16px] font-normal">
                -$100 <span className="text-[#EB4E59] ml-2"> -10%</span>
              </h2>
            </div>
          </div>

          {/* Levels */}
          <div className="w-full md:w-fit relative flex items-center flex-wrap justify-center gap-3">
            {levels.map((levelInfo) => (
              <Level key={levelInfo.level} levelInfo={levelInfo} />
            ))}
          </div>

          {/* Progress Tracker */}
          <div className="w-full md:w-[220px] flex flex-col items-center justify-center">
            <h1 className="text-[#3D3842] text-[30px] leading-[35px] font-medium text-center">Progress Tracker</h1>
            <div className="flex items-center justify-center gap-[15.54px] my-4">
              <Image src="/assets/icons/fill-checkbox.svg" alt="checkbox" width={20} height={20} />
              <Image src="/assets/icons/blank-checkbox.svg" alt="checkbox" width={20} height={20} />
              <Image src="/assets/icons/fill-checkbox.svg" alt="checkbox" width={20} height={20} />
              <Image src="/assets/icons/fill-checkbox.svg" alt="checkbox" width={20} height={20} />
              <Image src="/assets/icons/fill-checkbox.svg" alt="checkbox" width={20} height={20} />
            </div>
            <p className="text-center text-[#928F95] text-[20.31px] leading-[22.42px] font-normal line-clamp-2">
              Lorem Ipsum is simply dummy text of the printing{' '}
            </p>
          </div>
        </div>
      </div>

      {/* Earning */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {earningsData.map((item, index) => (
          <div key={index} className="flex flex-col shadow-tab w-full min-w-[274.73px] rounded-[13.74px] bg-white p-6">
            <h2 className="text-[#3D3842] text-[24px] leading-[26px] font-medium tracking-[2%] pb-5">{item.title}</h2>
            <h1 className="text-[#753CBD] text-[48px] leading-[55px] tracking-[2%] font-semibold pb-4 border-b border-[#E7E6E7]">
              {item.amount}
            </h1>
            <h3 className="my-4 text-[#B1AFB3] text-[20px] leading-[22px] tracking-[2%]">{item.subtitle}</h3>
            <h2 className="text-[#753CBD] text-[24px] leading-[27px] tracking-[2%] font-semibold">{item.predicted}</h2>
            {item.buttonText && (
              <button className="mt-4 bg-[#753CBD] rounded-lg w-[136px] h-[40px] uppercase text-[14px] leading-[20px] tracking-[2%] text-white">
                {item.buttonText}
              </button>
            )}
            {item.linkText && (
              <Link
                href={item.linkUrl}
                className="text-[#753CBD] text-[20px] leading-[23px] tracking-[2%] mt-[13px] font-bold flex items-center gap-2"
              >
                {item.linkText}
                <Image src={item.linkIcon} alt="see-report-arrow" width={20} height={20} />
              </Link>
            )}
            {item.extraSubtitle && (
              <div className="">
                <h3 className="mt-4 border-t py-4 text-[#B1AFB3] text-[20px] leading-[22px] tracking-[2%]">{item.extraSubtitle}</h3>
                <h2 className="text-[#753CBD] text-[24px] leading-[27px] tracking-[2%] font-semibold">{item.predictedYear}</h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-10">
        <div className='mb-10 flex items-center flex-col md:flex-row justify-between gap-5'>
            <div className='flex items-center flex-wrap gap-4'>
                <button className='text-[#B1AFB3] text-[14px] font-medium tracking-[2%] uppercase bg-[#F8F8F8] border-[1.5px] border-[#B1AFB3] rounded w-[91px] h-[40px] shadow-btn'>Weekly</button>
                <button className='text-[#B1AFB3] text-[14px] font-medium tracking-[2%] uppercase bg-[#F8F8F8] border-[1.5px] border-[#B1AFB3] rounded w-[91px] h-[40px] shadow-btn'>Monthly</button>
                <button className='text-[#B1AFB3] text-[14px] font-medium tracking-[2%] uppercase bg-[#F8F8F8] border-[1.5px] border-[#B1AFB3] rounded w-[91px] h-[40px] shadow-btn'>YEARLY</button>
            </div>
            <DateRangePicker onApply={handleApply} />
        </div>
        <Chart data={data} />
      </div>
    </div>
  )
}

export default EarningTab
