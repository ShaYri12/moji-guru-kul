'use client'
import React from 'react'
import CustomButton from '../common/CustomButton'
import Image from 'next/image'

const OurStory = () => {
  return (
    <div className="bg-our-story bg-no-repeat bg-cover w-full min-h-[616px] flex flex-col justify-center my-10 md:my-[80px]">
      <div className="w-full max-w-[1320px] m-auto p-5">
        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* 1st col */}
          <div className="w-full md:w-1/2">
            <div className="border-l border-indigo rounded py-1 px-2 text-indigo bg-soft-peach text-base font-normal w-full max-w-[182px]">
              <p>Brand Story</p>
            </div>
            <h1 className="text-black text-3xl md:text-[56px] md:leading-[67px] mt-4 font-bold">The MojiGurukul Way</h1>
            <p className="text-mist text-lg md:text-xl leading-[22px] my-5 border-l-2 border-indigo px-4">
              What hapens when you blend ancient wisdom with the latest innovations in technology and education? You get MojiGurukul, a
              place where students enjoy learning. Our founder, Namit, has taken his worldwide teaching experience and turned it into a
              game-based learning system that improves academic performance and brings families together.
            </p>
            <CustomButton onClick={() => {}} color="#753CBD" textColor="#fff" className="!w-[156px]">
              More Details
            </CustomButton>
          </div>
          {/* 2nd col */}
          <div className="w-full md:w-1/2 border-2 border-dotted border-indigo rounded-[90px] md:rounded-[150px] h-[320px] md:h-[430px] p-4">
            <div className="bg-story-thumbnail bg-no-repeat bg-center bg-contain md:bg-cover rounded-[90px] md:rounded-[150px] w-full h-full flex justify-center items-center">
              <Image src="/assets/images/about-us/play.svg" alt="story" width={156} height={156} className="pt-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurStory
