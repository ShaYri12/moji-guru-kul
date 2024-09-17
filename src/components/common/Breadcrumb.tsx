import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'
import { betm } from '@/app/font'
import classNames from 'classnames'

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

type BreadcrumbProps = {
  breadcrumb: {
    label: string
    href: string
  }[]
}

export default function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  const breadcrumbs = breadcrumb.map((item, index) => {
    return (
      <Link
        key={index}
        color="inherit"
        href={item.href}
        className={classNames(betm.className, 'text-2xl font-normal')}
        style={{
          color: index === breadcrumb.length - 1 ? '#753CBD' : '#8E8D91',
        }}
      >
        {item.label}
      </Link>
    )
  })

  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  )
}
