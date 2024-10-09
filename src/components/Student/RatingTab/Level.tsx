import React, { useState } from 'react'
import Image from 'next/image'

interface LevelInfo {
  level: number
  image: string
  requirements: string[]
  benefits: string[]
}

interface LevelHoverProps {
  levelInfo: LevelInfo
}

const Level: React.FC<LevelHoverProps> = ({ levelInfo }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex items-center flex-col gap-1.5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={levelInfo.image} alt={`level-${levelInfo.level}`} width={100} height={93} />
      <h1 className="text-[#3D3842] text-[24px] leading-[26px] font-medium">Level {levelInfo.level}</h1>

      {isHovered && (
        <div className="absolute bg-white shadow-lg rounded-[16px] shadow-tab left-8 py-6 px-4 w-64 top-[100px] z-10">
          <div className="flex items-center gap-4">
            <Image src={levelInfo.image} alt={`level-${levelInfo.level}`} width={53} height={50} />
            <h2 className="text-[#3D3842] text-[20px] leading-[15px] font-medium">Level {levelInfo.level}</h2>
          </div>
          {/* Requirements */}
          <div className="mt-4">
            <h3 className="text-[#3D3842] text-[16px] leading-[17.66px] font-medium">Minimum Requirements</h3>
            <div className="mt-3 flex flex-col gap-2.5">
              {levelInfo.requirements.map((req, index) => (
                <div className="flex items-center gap-1.5 w-full">
                  <Image src="/assets/icons/requirement-checkbox.svg" alt="requirement-checkbox" width={14} height={14} />
                  <h2 key={index} className="text-[#B1AFB3] text-[14px] leading-[15.46px] font-normal mt-0.5">
                    {req}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <h3 className="mt-4 text-[#3D3842] text-[16px] leading-[17.66px] font-medium">Benefits</h3>
          <div className="mt-3 flex flex-col gap-2.5">
            {levelInfo.benefits.map((benefit, index) => (
              <div className="flex items-center gap-1.5 w-full">
                <Image src="/assets/icons/benefits-checkbox.svg" alt="benefits-checkbox" width={14} height={14} />
                <h2 key={index} className="text-[#B1AFB3] text-[14px] leading-[15.46px] font-normal mt-0.5">
                  {benefit}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Level
