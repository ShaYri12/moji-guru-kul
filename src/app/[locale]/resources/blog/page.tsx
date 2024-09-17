import Blog from '@/components/Resources/Blog'
import { fetchRequest } from '@/network/FetchRequest'
import React from 'react'

async function BlogPage() {
  const blogs: any = await fetchRequest({ url: 'blogs', method: 'GET' })
  

  return (
    <div>
      <Blog blogs={blogs} />
    </div>
  )
}

export default BlogPage
