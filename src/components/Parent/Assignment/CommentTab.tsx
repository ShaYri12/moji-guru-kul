import CustomButton from '@/components/common/CustomButton'
import Image from 'next/image'
import React from 'react'

const commentsData = [
  {
    id: 1,
    name: 'Courtney Henry',
    timeAgo: '20h Ago',
    profileImage: '/assets/images/landing-page/avater-1.svg',
    content:
      'Ultricies ultricies interdum dolor sodales. Vitae feugiat vitae vitae quis id consectetur. Aenean urna, lectus enim suscipit eget. Tristique bibendum nibh enim dui.',
  },
  {
    id: 2,
    name: 'Theresa Webb',
    timeAgo: '15h Ago',
    profileImage: '/assets/images/landing-page/avater-2.svg',
    content:
      'Ultricies ultricies interdum dolor sodales. Vitae feugiat vitae vitae quis id consectetur. Aenean urna, lectus enim suscipit eget. Tristique bibendum nibh enim dui.',
  },
]

const CommentTab = () => {
  return (
    <div className="mt-[32px]">
      {/* Textarea for posting a new comment */}
      <textarea
        id="description"
        rows={5}
        className="w-full py-[10px] px-[14px] md:text-[18px] h-[128px] text-[16px] outline-none rounded-lg border-[#D0D5DD] border rounded-[8px] text-black placeholder:text-[#C2C1C4] bg-white"
        placeholder="Comment is Here"
      ></textarea>
      <div className="flex justify-end mr-0 mt-[24px]">
        <CustomButton
          variant="contained"
          color="#753CBD"
          textColor="#fff"
          className="w-[94px] h-[36px] rounded-[8px] text-[13px] leading-[20px] tracking-[2%] shadow-lg uppercase"
          onClick={() => {}}
        >
          Post
        </CustomButton>
      </div>

      {/* Mapping through commentsData */}
      {commentsData.map((comment) => (
        <div key={comment.id} className="mt-[24px] mb-[32px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center sm:gap-[12px] gap-[6px]">
              <Image
                className="w-[48px] h-[48px] rounded-full"
                src={comment.profileImage}
                alt="Profile"
                width={48}
                height={48}
                sizes="100vw"
                quality={80}
                loading="lazy"
                objectFit="cover"
              />
              <div>
                <h1 className="text-[18px] md:text-[20px] font-[500] text-[#241F2B]">{comment.name}</h1>
                <p className="text-sm md:text-[18px] sm:text-base font-normal text-gray-400">{comment.timeAgo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-[23px]">
              <Image src="/assets/icons/threedots.svg" alt="moji gurukul menu" width={24} height={24} />
            </div>
          </div>

          <div className="w-full md:text-[18px] rounded-[15px] text-[16px] lg:p-[24px] p-[20px] text-[#928F95] bg-[#FAF8FC] mt-[16px]">
            {comment.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentTab
