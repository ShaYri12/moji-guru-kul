import Image from 'next/image'
import React from 'react'
import { GoDotFill } from 'react-icons/go'

const attachmentsData = [
  {
    id: 1,
    title: 'Task Brief',
    size: '1.5 Mb',
    iconSrc: '/assets/icons/file-icon.svg',
  },
  {
    id: 2,
    title: 'Project Plan',
    size: '2.3 Mb',
    iconSrc: '/assets/icons/file-icon.svg',
  },
]

const AttachmentTab = () => {
  return (
    <div className="flex flex-row flex-wrap gap-4 my-[32px]">
      {attachmentsData.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center cursor-pointer p-[16px] sm:gap-[12px] gap-[6px] border hover:border-gray-400 transition border-[#EEEEEE] rounded-[4px]"
        >
          <Image
            className="w-[40px] h-[40px]"
            src={attachment.iconSrc}
            alt={attachment.title}
            width={40}
            height={40}
            sizes="100vw"
            quality={80}
            loading="lazy"
          />
          <div>
            <h1 className="text-base md:text-[20px] font-[500] text-purple">{attachment.title}</h1>
            <p className="text-sm flex items-center md:text-[18px] sm:text-base font-normal text-[#B1AFB3]">
              {attachment.size} <GoDotFill color="#D9D9D9" size={12} /> Download
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AttachmentTab
