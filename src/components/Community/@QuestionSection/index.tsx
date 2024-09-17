import React from 'react'
import Wrapper from '@/components/common/Wrapper'
import CategoryCard from './Cards/CategoryCard'
import ProfileCard from './Cards/ProfileCard'
import CommunityMemberCard from './Cards/CommunityMemberCard'
import AllQuestion from './AllQuestion'

const Index = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 mt-8 md:mt-[100px]">
        <div className="order-2 lg:order-1 col-span-1 md:col-span-1 lg:col-span-3 p-4">
          <CategoryCard />
        </div>
        <div className="order-3 lg:order-2 col-span-1 md:col-span-2 lg:col-span-6 p-4">
          <AllQuestion />
        </div>
        <div className="order-1 lg:order-3 col-span-1 md:col-span-1 lg:col-span-3 p-4 flex flex-col gap-4">
          <ProfileCard />
          <div className="hidden lg:block">
            <CommunityMemberCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
