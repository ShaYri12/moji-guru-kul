import React from 'react'
import Wrapper from '@/components/common/Wrapper'
import CommunityCard from '@/components/common/CommunityCard'

const index = () => {
  return (
    <div className="w-full bg-purple-70 py-20">
      <div className="horizontal-spacing">
        <div className="flex justify-between items-center pb-12">
          <p className="text-[24px] font-bold text-white">
            Community <br /> Reward
          </p>
          <p className="w-[400px] text-[14px] text-white">
            Its a system of rewards for the whole Illumiya comunity when students collect general number of points and receive new features
            in the website.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
        </div>
      </div>
    </div>
  )
}

export default index
