/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { fetchRequest } from '@/network/FetchRequest'
import { BlogTypes, SuccessResponse } from '@/utils/types'
import Image from 'next/image'

async function BlogDetails({ params }: { params: { id: string } }) {
  let blogDetails: BlogTypes
  const blog: SuccessResponse = await fetchRequest({ url: `blogs/${params.id}`, method: 'GET' })
  blogDetails = blog.returnObject

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="h-[350px] md:h-[500px] w-ful">
        <img
          src={blogDetails.image || '/assets/images/resources/blog-thumbnail.svg'}
          alt={blogDetails.title}
          className="shadow-tiles rounded-lg h-full w-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl text-indigo font-bold">{blogDetails.title}</h1>
        <div
          className="text-lg text-mist mt-2"
          dangerouslySetInnerHTML={{
            __html: blogDetails.description,
          }}
        ></div>
        <div className="flex gap-4 items-center mt-4">
          <h2 className="text-xl text-indigo font-bold pt-1">Author:</h2>
          <p className="text-lg text-mist font-bold">{blogDetails.createdByUser}</p>
        </div>
        <div className="flex gap-6 items-center mt-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/calendar-indigo.svg" width={14} height={14} alt="calendar" />
            <p className="text-mist text-lg">
              {new Date(blogDetails.createdDate).toLocaleDateString('en-US', {
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

export default BlogDetails
