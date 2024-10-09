'use client'
import EarningTab from '@/components/Student/RatingTab/EarningTab';
import RatingTab from '@/components/Student/RatingTab/RatingTab';
import Image from 'next/image'
import React, { useState } from 'react'

const starData = [
    { stars: 5, count: 488 },
    { stars: 4, count: 74 },
    { stars: 3, count: 14 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

const Profile = () => {
    const [activeTab, setActiveTab] = useState<string>('About');
    const totalCount = starData.reduce((acc, item) => acc + item.count, 0);
    return (
        <div className="w-full horizontal-spacing mt-10 mb-[50px] lg:mb-[100px]">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h1 className="text-[#753CBD] text-[56px] leading-[67px] tracking-[2%] font-medium">Profile</h1>
                <div className="bg-[#F1ECF8] w-[60px] h-[60px] border-[1.5px] border-[#753CBD] rounded-lg flex justify-center items-center hover:opacity-80 cursor-pointer">
                <Image src="/assets/icons/dots.svg" alt="moji gurukul menu" width={24} height={24} />
                </div>
            </div>

            {/* Tutor Detail */}
            <div className='mt-10 border border-[#F1ECF8] rounded-[16px] px-4 py-6 sm:p-6 flex lg:items-center justify-between lg:flex-row flex-col lg:gap-4 gap-10 w-full'>
                <div className='flex items-center sm:flex-row flex-col gap-8'>
                    <Image src='/assets/icons/tutor-name.svg' alt='Profile' width={160} height={160} />
                    <div className='lg:max-w-[502px] w-full'>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-[#49444E] text-[40px] leading-[44px] font-medium'>Tutor Name</h2>
                            <Image src='/assets/icons/tutor-name-icons.svg' alt='icons' width={18} height={22} />
                        </div>
                        <div className='mt-4 flex items-center gap-3'>
                            <h2 className='bg-[#F1ECF8] py-1 px-2.5 rounded w-fit text-[#753CBD] text-[24px] leading-[26px] font-medium'>Science</h2>
                            <div className='h-[22px] w-[0.5px] bg-[#B1AFB3]'></div>
                            <div className='flex items-center gap-1 mt-1'>
                                <Image src='/assets/icons/star-icons.svg' alt='icons' width={18} height={18} className='-mt-1' />
                                <h3 className='text-[#3D3842] text-[18px] font-medium leading-[19px]'>4.9 <span className='text-[#B1AFB3]'>(110)</span></h3>
                            </div>
                            <div className='h-[22px] w-[0.5px] bg-[#B1AFB3]'></div>
                            <h2 className='mt-1 text-[#3D3842] text-[18px] leading-[20px] font-medium'>Level 2</h2>
                        </div>
                        <p className='mt-4 text-[#928F95] text-[20px] leading-[24px] tracking-[2%]'>We&lsquo;re Here to Support Your Child&lsquo;s Educational Journey</p>
                        <div className='mt-4 flex items-center flex-wrap gap-2 sm:gap-3.5'>
                            <div className='flex items-center gap-1'>
                                <Image src='/assets/icons/profile-location.svg' alt='profile-location' width={16} height={16} />
                                <h2 className='text-[#3D3842] mt-0.5 text-[18px] leading-[19.87px] font-medium'>Location</h2>
                            </div>
                            <div className='flex items-center gap-1'>
                                <Image src='/assets/icons/profile-location.svg' alt='profile-location' width={16} height={16} />
                                <h2 className='text-[#3D3842] mt-0.5 text-[18px] leading-[19.87px] font-medium'>43 Lesson</h2>
                            </div>
                            <div className='flex items-center gap-1'>
                                <Image src='/assets/icons/profile-location.svg' alt='profile-location' width={16} height={16} />
                                <h2 className='text-[#3D3842] mt-0.5 text-[18px] leading-[19.87px] font-medium'>7 Year+ Experience</h2>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex items-center justify-between w-full'>
                                <h3 className='text-[#22CC9B] text-[14px] leading-[10px] tracking-[2%] font-normal underline underline-offset-4'>Profile Completed</h3>
                                <h3 className='text-[#22CC9B] text-[14px] leading-[10px] tracking-[2%] font-normal'>100%</h3>
                            </div>
                            <div className='mt-4 w-full bg-[#22CC9B] h-[8px] rounded'></div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center lg:flex-col flex-row justify-center gap-5 text-white'>
                    <button className='w-[249px] h-[40px] sm:h-[56px] rounded-lg bg-[#753CBD] text-[18px] leading-[28px] tracking-[2%] font-medium uppercase'>Send</button>
                    <button className='w-[249px] h-[40px] sm:h-[56px] rounded-lg bg-[#753CBD] text-[18px] leading-[28px] tracking-[2%] font-medium uppercase'>Send</button>
                </div>
            </div>

            {/* Tabs */}
            <div className='mt-[56px]'>
                 <div className="flex border-b-2 w-fit border-gray-300">
                    <button className={`py-2 -mb-[2.7px] px-4 text-[24px] leading-[28px] tracking-[2%] font-medium ${
                        activeTab === 'About'
                        ? 'text-[#753CBD]  border-b-4 border-[#753CBD]'
                        : 'text-[#B1AFB3]'}`} onClick={() => setActiveTab('About')}>
                        About
                    </button>
                    <button
                    className={`py-2 -mb-[2.7px] px-4 text-[24px] leading-[28px] tracking-[2%] font-medium ${
                        activeTab === 'Earning'
                            ? 'text-[#753CBD] border-b-4 border-[#753CBD]'
                        : 'text-[#B1AFB3]'}`} onClick={() => setActiveTab('Earning')}>
                        Earning
                    </button>
                    <button className={`py-2 -mb-[2.7px] px-4 text-[24px] leading-[28px] tracking-[2%] font-medium ${
                        activeTab === 'Reviews'
                        ? 'text-[#753CBD] border-b-4 border-[#753CBD]'
                        : 'text-[#B1AFB3]'}`} onClick={() => setActiveTab('Reviews')}>
                        Reviews
                    </button>
                </div>
                <div className="py-6">
                    {activeTab === 'About' && (
                    <div>
                        <p className='text-[#8E8D91] text-[20px] leading-[24px] tracking-[2%]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&lsquo;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h2 className='mt-6 text-[#753CBD] text-[24px] leading-[28.8px] tracking-[2%] font-medium'>Resume</h2>
                        <div className="bg-[#FAF9FA] space-y-[40px] mt-8">
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="h-[40px] bg-[#D9D9D9]"/>
                            ))}
                        </div>
                    </div>
                    )}
                    {activeTab === 'Earning' && (
                    <div className='w-full'>
                        <EarningTab/>
                    </div>
                    )}
                    {activeTab === 'Reviews' && (
                    <div className='w-full'>
                        <RatingTab/>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
