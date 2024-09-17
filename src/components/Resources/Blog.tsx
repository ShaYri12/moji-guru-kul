'use client'
import React, { useEffect, useState } from 'react'
import CustomInputV2 from '../common/CustomInputV2'
import CustomButton from '../common/CustomButton'
import Image from 'next/image'
import BlogCard from '../common/Cards/BlogCard'
import CustomSelectV2 from '../common/CustomSelectV2'
import Pagination from '../common/Pagination'
import { useBlogStore } from '@/store/blogStore'
import { BlogResponseType } from '@/utils/types'
import { useRouter } from 'next/navigation'

const Blog = ({ blogs }: { blogs: BlogResponseType }) => {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; value: string }>({ label: 'All', value: '-1' })
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(6)
  const [total, setTotal] = useState(blogs.total)
  const [sort, setSort] = useState('new' as 'new' | 'old')

  // const blogs = useBlogStore((state) => state.blogs)
  const filterBlogs = useBlogStore((state) => state.filterBlogs)
  const setFilterBlogs = useBlogStore((state) => state.setFilterBlogs)

  useEffect(() => {
    const filteredBlogs = blogs.rows.slice(0, take)
    setFilterBlogs({ skip, take, blogs: { total: filteredBlogs.length, rows: filteredBlogs } })
  }, [blogs])

  // filter blogs based on category
  useEffect(() => {
    if (selectedCategory.value === '-1') {
      setFilterBlogs({ skip, take, blogs })
      return
    }
    const filteredBlogs = blogs.rows.filter((blog) => {
      return blog.title.toLowerCase().includes(search.toLowerCase()) && blog.category === Number(selectedCategory.value)
    })
    setFilterBlogs({ skip, take, blogs: { total: filteredBlogs.length, rows: filteredBlogs } })
    setTotal(filteredBlogs.length)
  }, [selectedCategory, skip])

  // if search is empty then show all blogs
  useEffect(() => {
    if (search.length === 0) {
      // filter blogs based on category
      if (selectedCategory.value === '-1') {
        setFilterBlogs({ skip, take, blogs })
        setTotal(blogs.total)
        return
      }
      const filteredBlogs = blogs.rows.filter((blog) => {
        return blog.category === Number(selectedCategory.value)
      })
      setFilterBlogs({ skip, take, blogs: { total: filteredBlogs.length, rows: filteredBlogs } })
      setTotal(filteredBlogs.length)
      return
    }
  }, [search])

  // search blogs based on search
  const handleSearch = () => {
    if (search.length < 3) return
    if (selectedCategory.value === '-1') {
      const filteredBlogs = blogs.rows.filter((blog) => {
        return blog.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilterBlogs({ skip, take, blogs: { total: filteredBlogs.length, rows: filteredBlogs } })
      setTotal(filteredBlogs.length)
      return
    }
    const filteredBlogs = blogs.rows.filter((blog) => {
      return blog.title.toLowerCase().includes(search.toLowerCase()) && blog.category === Number(selectedCategory.value)
    })
    setFilterBlogs({ skip, take, blogs: { total: filteredBlogs.length, rows: filteredBlogs } })
    setTotal(filteredBlogs.length)
  }

  return (
    <div className="mb-[75px]">
      <div className="flex flex-col lg:flex-row gap-3 items-center">
        <div className="w-full lg:w-[356px]">
          <CustomSelectV2
            width="100%"
            options={options}
            value={selectedCategory.label}
            handleChange={({ label, value }: { label: string; value: string }) => {
              if (value) setSelectedCategory({ label, value })
            }}
          />
        </div>
        <div className="w-full flex gap-5">
          <CustomInputV2
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            placeholder="Search here any topic"
            className="!h-14"
          />
          <CustomButton
            color="#753CBD"
            textColor="#FFFFFF"
            onClick={() => {
              handleSearch()
            }}
            className="!w-[150px] lg:!w-[256px] !rounded !bg-indigo flex items-center gap-3"
          >
            <Image src="/assets/icons/search-white.svg" width={14} height={14} alt="search" />
            Search
          </CustomButton>
        </div>
      </div>
      <div className="mt-8 mb-12 flex items-center justify-between gap-3">
        <p className="text-mist text-base font-normal">
          Search Results For <b className="font-medium">“Science”</b>
        </p>
        <div className="flex gap-6  items-center">
          <b className="text-lite-black text-base font-medium">Sort By:</b>
          {/* <select defaultValue="new" className="border border-mist rounded py-2 px-3 !outline-none"> */}
          <select
            defaultValue="new"
            className="form-select appearance-none pr-8 pl-2 bg-no-repeat border border-mist rounded pb-0.5 pt-1 px-3 !outline-none"
            onChange={(e) => setSort(e.target.value as 'new' | 'old')}
          >
            <option
              value="new"
              onClick={() => {
                const sortedBlogs = filterBlogs.rows.sort((a, b) => {
                  return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
                })
                setFilterBlogs({ skip, take, blogs: { total: sortedBlogs.length, rows: sortedBlogs } })
              }}
            >
              New
            </option>
            <option
              value="Old"
              onClick={() => {
                const sortedBlogs = filterBlogs.rows.sort((a, b) => {
                  return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
                })
                setFilterBlogs({ skip, take, blogs: { total: sortedBlogs.length, rows: sortedBlogs } })
              }}
            >
              Old
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {filterBlogs.rows.map((blog, index) => {
          if (!blog.isActive) return
          return (
            <div
              key={index}
              onClick={() => {
                router.push(`/resources/blog/${blog.id}`)
              }}
            >
              <BlogCard blog={blog} />
            </div>
          )
        })}
      </div>
      <Pagination
        total={total}
        skip={skip}
        take={take}
        getValue={(skip) => {
          setSkip(skip)
        }}
      />
    </div>
  )
}

export default Blog

const options = [
  { value: '-1', label: 'All' },
  {
    value: '0',
    label: 'Learning',
  },
  {
    value: '1',
    label: 'Gamification',
  },
  {
    value: '2',
    label: 'Parenting',
  },
  {
    value: '3',
    label: 'Health',
  },
  {
    value: '4',
    label: 'Tutoring',
  },
]
