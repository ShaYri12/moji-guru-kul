import React from 'react'

const CommunityCard = () => {
  return (
    <div className='relative w-[250px] h-[300px] flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer'>
      <div className='relative group'>
        <img src="/img/communityImage.png" alt="" className='w-full h-[230px] object-cover rounded-2xl mt-[-1px]' />
        <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
          <button className='bg-purple-500 text-white p-2 rounded-lg'>Unlock</button>
        </div>
      </div>
      <div className='w-full flex items-center justify-center text-center h-[70px] text-purple'>
        <p className='text-[22px] font-bold'>+500 points</p>
      </div>
    </div>
  )
}

export default CommunityCard
