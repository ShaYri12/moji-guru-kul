'use client' // Ensure this directive is at the very top

import { useCommunityStore } from '@/store/communityStore'
import React, { useEffect } from 'react'

const CommunityMemberCard: React.FC = () => {
  const communityList = useCommunityStore((state) => state.communityList)
  const getCommunityList = useCommunityStore((state) => state.getCommunityList)

  useEffect(() => {
    getCommunityList()
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-full mx-auto border-2 border-gray-200 w-full">
      <h2 className="text-xl font-semibold mb-4 text-black">Student of Community</h2>
      <hr className="mb-4" />
      {communityList.map((member, index) => (
        <div key={member.id} className="flex items-center mb-4">
          <div className={`w-[50px] h-[50px] rounded-full bg-blue-400 flex items-center justify-center`}>
            <span className="text-white text-xl font-bold">{member.name.charAt(0)}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-md font-semibold text-black">{member.name}</h3>
            <p className="text-gray-500 text-md ">{member.roleName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommunityMemberCard
