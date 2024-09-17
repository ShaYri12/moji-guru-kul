import CustomHeader from '@/components/common/CustomHeader'
import Link from 'next/link'
import React from 'react'

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <CustomHeader
        title="Resources"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
        ]}
      />
      <div className="horizontal-spacing my-20">
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <Link
            href="/resources/blog"
            className="bg-soft-peach p-2.5 min-w-[120px] text-indigo text-lg font-medium  inline-block text-center rounded"
          >
            Blog
          </Link>
          <Link
            href="/resources/blog"
            className="bg-soft-peach p-2.5 min-w-[120px] text-[#656467] text-lg font-medium  inline-block text-center rounded cursor-not-allowed"
          >
            Video Material
          </Link>
          <Link
            href="/resources/blog"
            className="bg-soft-peach p-2.5 min-w-[120px] text-[#656467] text-lg font-medium  inline-block text-center rounded cursor-not-allowed"
          >
            Guide
          </Link>
        </div>
        {children}
      </div>
    </main>
  )
}

export default Layout
