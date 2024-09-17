import * as React from 'react'
import usePagination from '@mui/material/usePagination'
import { styled } from '@mui/material/styles'
import classNames from 'classnames'
import Image from 'next/image'

type PaginationProps = {
  total: number
  skip: number
  take: number
  getValue: (skip: number) => void
}

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
})

export default function Pagination({ total, skip, take, getValue }: PaginationProps) {
  const { items } = usePagination({
    count: Math.ceil(total / take),
    page: Math.ceil(skip / take) + 1,
    onChange: (event, page) => {
      getValue((page - 1) * take)
    },
  })

  return (
    <nav className="flex justify-center">
      <List className="p-2 rounded-[15px] flex items-center">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…'
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className={classNames('py-1.5 px-4 md:py-3 md:px-6 pt-2 md:pt-4 rounded-[15px] text-xl', {
                  'bg-indigo text-white': selected,
                  'text-indigo': !selected,
                })}
                {...item}
              >
                {page}
              </button>
            )
          } else {
            children = (
              <button
                type="button"
                {...item}
                className="text-indigo border border-indigo text-xl py-1.5 px-2 md:py-3 md:px-4 rounded-[15px] flex gap-1.5 items-center mx-3"
              >
                {/* add icon with previous and next */}
                {type === 'next' ? (
                  <>
                    <span className="pt-1 hidden md:block">Next</span>
                    <Image src="/assets/icons/next-double-arrow.svg" alt="next" width={24} height={24} className="pt-0.5" />
                  </>
                ) : (
                  <>
                    <Image src="/assets/icons/prev-double-arrow.svg" alt="next" width={24} height={24} className="pt-0.5" />
                    <span className="pt-1 hidden md:block">Previous</span>
                  </>
                )}
              </button>
            )
          }
          return <li key={index}>{children}</li>
        })}
      </List>
    </nav>
  )
}
