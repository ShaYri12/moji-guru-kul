'use client'
import { Start } from '@/svg'
import Image from 'next/image'
import React from 'react'
import CustomButton from '../common/CustomButton'

const LearningRevolution = () => {
  return (
    <div className="w-full max-w-[1320px] m-auto p-5">
      <div className="flex flex-col-reverse md:flex-row gap-10 lg:gap-[107px]">
        {/* 1st Col */}
        <div className="w-full block md:w-1/2">
          <Image src="/assets/images/about-us/revolution.png" alt="mojigurukul revolution" width={594} height={495} />
          {/* <div className="flex gap-[14px]">
            <div className="w-1/2 flex flex-col gap-[14px]">
              <div className="bg-off-blue rounded-xl border border-white-smoke h-[132px] w-full flex justify-center items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex w-[52px] md:w-[110px]">
                    <div className="w-9 h-9 bg-yellow-200 rounded-full flex justify-center items-center">
                      <Image src="/assets/images/landing-page/avater-1.svg" alt="moji gurukul" width={36} height={36} />
                    </div>
                    <div className="absolute right-[52px] w-9 h-9 bg-red-200 rounded-full flex justify-center items-center">
                      <Image src="/assets/images/landing-page/avater-2.svg" alt="moji gurukul" width={36} height={36} />
                    </div>
                    <div className="absolute right-[28px] w-9 h-9 bg-blue-200 rounded-full flex justify-center items-center">
                      <Image src="/assets/images/landing-page/avater-3.svg" alt="moji gurukul" width={36} height={36} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lite-black text-xs font-semibold leading-[20px] pt-2 ">Our Happy Parents</p>
                    <div className="flex gap-1 items-baseline">
                      <Start />
                      <p className="text-[#646464] text-xs font-normal leading-[150%] tracking-[0.148px] md:tracking-[0.32px] pt-0">
                        4.8 <span className="text-[#969696]">(1.380 Review)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <Image src="/assets/images/about-us/rev1.png" alt="" width={320} height={284} />
                <Image
                  src="/assets/images/about-us/dotted-box.svg"
                  alt=""
                  width={96}
                  height={84}
                  className="absolute -bottom-5 -left-[18px] -z-[1]"
                />
              </div>
            </div>
            <div className="relative w-1/2">
              <Image src="/assets/images/about-us/rev2.png" alt="" width={280} height={435} />
              <Image
                src="/assets/images/about-us/vector-purple.svg"
                alt=""
                width={92}
                height={82}
                className="absolute -top-[34px] -right-8 -z-[1]"
              />
              <Image
                src="/assets/images/about-us/star.svg"
                alt=""
                width={156}
                height={156}
                className="relative bottom-[92px] left-[200px] -z-[1]"
              />
            </div>
          </div> */}
        </div>
        {/* 2nd Col */}
        <div className="w-full md:w-1/2">
          <div className="border-l border-mango rounded py-1 px-2 text-vamp-grey bg-pale text-base font-normal w-full max-w-[182px]">
            <p>What Makes Us Different</p>
          </div>
          <h1 className="text-black text-3xl md:text-[56px] font-bold md:leading-[67px] mt-3 mb-4">Learning that&apos;s built around you.</h1>
          <div className="text-mist text-lg font-normal">
            <p>
              When things sound familiar, they&apos;re much easier to understand. That&apos;s why we&apos;ve built our platform to
              accommodate options for students who want to learn in their local language.
            </p>
            <p>
              With MojiGurukul, you don&apos;t have to spend several hours before seeing progress. Our system ensures that with just 15
              minutes of studies each day, you&apos;ll be on your way to academic excellence.
            </p>
          </div>
          <div className="mt-5 mb-8">
            {LEARNING_POINTS.map((point) => (
              <div key={point.id} className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-mango flex justify-center items-center">
                  <Image src="/assets/icons/double-arrow.svg" alt="play" width={14} height={13} />
                </div>
                <div className="w-[80%] text-black text-base font-normal leading-[18px]">{point.description}</div>
              </div>
            ))}
          </div>
          <CustomButton onClick={() => {}} color="#753CBD" textColor="#F8FAFC" className="!w-[174px]">
            Get a Free Trial
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default LearningRevolution

const LEARNING_POINTS = [
  {
    id: 1,
    description: 'We use a zero-pressure approach with 15-minute lessons that fit easily into your daily routine.',
  },
  {
    id: 2,
    description: 'We break down complex ideas in a language and context you understand best.',
  },
  {
    id: 3,
    description: "By teaching life skills in addition to academic skills, we're able to ensure that our students are well-rounded.",
  },
]
