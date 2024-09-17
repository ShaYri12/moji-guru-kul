import { BlogTypes } from '@/utils/types'
import Image from 'next/image'
import React from 'react'

type BlogProps = {
  blog: BlogTypes
}

const BlogCard = ({ blog }: BlogProps) => {
  return (
    <div className="w-full shadow-tiles rounded-[15px]">
      <div
        className="w-full h-[260px] bg-cover bg-no-repeat bg-center rounded-t-[15px] flex justify-center items-center"
        style={{
          backgroundImage: blog.image || 'url(/assets/images/resources/blog-thumbnail.svg)',
        }}
      >
        {/* <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center relative">
          <Image src={'/assets/icons/play-indigo.svg'} width={36} height={36} alt="play" className="absolute top-4" />
        </div> */}
      </div>
      <div className="p-4">
        <div className="border border-indigo rounded  px-2 inline-block mb-2.5">
          <p className="text-indigo text-xl text-center font-normal pt-1">
            {blog.title.substring(0, 30) + (blog.title.length > 30 ? '...' : '')}
          </p>
        </div>
        <div
          className="hidden md:block text-lite-black text-xl md:text-[28px] font-medium leading-[34px] mb-1 h-[72px] overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: blog.description.substring(0, 50) + (blog.description.length > 50 ? '...' : ''),
          }}
        ></div>
        <div
          className="block md:hidden text-lite-black text-xl md:text-[28px] font-medium leading-[34px] mb-1 h-[72px] overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: blog.description.substring(0, 70) + (blog.description.length > 70 ? '...' : ''),
          }}
        ></div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/calendar-indigo.svg" width={14} height={14} alt="calendar" />
            {/* <p className="text-mist text-lg">20 Jan, 2025</p> */}
            <p className="text-mist text-lg">
              {new Date(blog.createdDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/chat-indigo.svg" width={14} height={14} alt="calendar" />
            <p className="text-mist text-lg">Com 20</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
