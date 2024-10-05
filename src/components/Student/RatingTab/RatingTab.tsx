import Image from 'next/image'
import React, { useState } from 'react'
import Rating from './Rating'
import DropdownRating from './DropdownRating'

interface Review {
    name: string;
    date: string;
    rating: number;
    comment: string;
    img: string;
  }
  
const reviewsData: Review[] = [
  {
    img: '/assets/icons/review-profile.svg',
    name: 'John Doe',
    date: '19 May 24',
    rating: 5,
    comment:
      'Son was nervous about having online lessons, but Harpreet put him at ease right away, and he enjoys the sessions they have together.',
  },
  {
    img: '/assets/icons/review-profile.svg',
    name: 'Jane Smith',
    date: '18 May 24',
    rating: 5,
    comment: 'Great lessons! Highly recommend.',
  },
  {
    img: '/assets/icons/review-profile.svg',
    name: 'Alice Johnson',
    date: '17 May 24',
    rating: 5,
    comment: 'My child loves learning with Harpreet!',
  },
]

const RatingTab: React.FC = () => {
    const ratings = [
        { stars: 5, count: 300 },
        { stars: 4, count: 50 },
        { stars: 3, count: 50 },
        { stars: 2, count: 20 },
        { stars: 1, count: 10 },
      ];
      
      const options = [
        { label: 'Newest Review', value: 'newest' },
        { label: 'Oldest Review', value: 'oldest' },
        { label: 'Highest Rating', value: 'highest' },
        { label: 'Lowest Rating', value: 'lowest' },
      ];
    
      const [selectedOption, setSelectedOption] = useState(options[0]);
    
      const handleSelect = (option: { label: string; value: string }) => {
        setSelectedOption(option);
      };
  return (
    <>
        <div className='mt-4 border border-[#F1ECF8] rounded-[16px] px-4 py-6 sm:px-8'>
            <div className="w-full flex sm:flex-row flex-col sm:items-center gap-5 justify-between">
                <div className="w-fit">
                    <h2 className="mb-4 text-[#3D3842] text-[24px] leading-[28.8px] tracking-[2%] font-medium">Reviews</h2>
                    <h1 className="mb-4 text-[#753CBD] text-[64px] leading-[76px] tracking-[2%] font-medium">4.7</h1>
                    <Image src="/assets/icons/rating-icons.svg" alt="rating-icons" width={237} height={31} />
                    <h3 className="mt-6 text-[#B1AFB3] text-[20px] leading-[24px] tracking-[2%] ">(578 Reviews)</h3>
                </div>
                <div className='flex items-center justify-end flex-col gap-5 w-full'>
                    <Rating ratings={ratings} />
                </div>
            </div>
        </div>
        <div className='mt-10 mb-8 flex items-center sm:flex-row flex-col gap-4 justify-between w-full'>
            <h1 className='w-full sm:w-[174px] h-[36px] rounded-lg bg-[#F1ECF8] text-[#753CBD] text-[16px] leading-[21px] font-medium flex items-center justify-center'>Total 578 Revies</h1>
            
            {/* Dropdown */}
            <DropdownRating options={options} selectedOption={selectedOption} onSelect={handleSelect} />
        </div>

        {/* Rating people */}
        <div className='flex flex-col gap-8'>
            {reviewsData.map((review, index) => (
                <div key={index} className="border-2 border-[#F1ECF8] px-4 py-6 sm:p-6 rounded-[16px] shadow-sm flex-wrap flex items-center justify-between gap-5">
                    <div className='flex items-center gap-4 sm:flex-row flex-col'>
                        <Image src={review.img} alt="review-profile" width={80} height={80}/>
                        <div className="flex flex-col">
                            <h3 className="text-[#3D3842] text-[24px] tracking-[2%] font-medium">{review.name}</h3>
                            <p className="text-[#6D6A71] text-[16px] font-normal">{review.date}</p>
                            <p className="text-[#B1AFB3] text-[20px] leading-[24px] max-w-[700px]">{review.comment}</p>
                        </div>
                    </div>
                    <div className='w-full sm:w-fit flex items-center justify-center gap-3'>
                        <Image src='/assets/icons/review-img.svg' alt='review' width={140} height={28} className='-mt-1.5' />
                        <h3 className="text-[#000000] text-[40px] leading-[40px] font-medium flex items-center gap-2">{review.rating} <span className='text-[16px] leading-[30px]'>Rating</span></h3>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default RatingTab
