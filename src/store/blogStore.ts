import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { BlogResponseType } from '@/utils/types'

type BlogStore = {
  blogs: BlogResponseType
  filterBlogs: BlogResponseType
  setFilterBlogs: ({ skip, take, blogs }: { skip: number; take: number; blogs: BlogResponseType }) => void
  // getBlogs: () => Promise<BlogResponseType>
  loading: boolean
}

export const useBlogStore = create<BlogStore>((set) => ({
  loading: false,
  blogs: { total: 0, rows: [] },
  filterBlogs: { total: 0, rows: [] },

  // Set filtered blogs
  setFilterBlogs: ({ skip, take, blogs }) => {
    const filteredBlogs = blogs.rows.slice(skip, skip + take)
    set({ filterBlogs: { total: filteredBlogs.length, rows: filteredBlogs } })
  },

  // Get all blogs
  // getBlogs: async () => {
  //   const response = await networkService.get({ url: '/blogs' })
  //   // get blogs based on skip and take
  //   const filteredBlogs = response.rows.slice(0, 6)
  //   set({ filterBlogs: { total: filteredBlogs.length, rows: filteredBlogs } })
  //   set({ blogs: response })

  //   // set({ blogs: response, filterBlogs: response })
  //   return response
  // },
}))
