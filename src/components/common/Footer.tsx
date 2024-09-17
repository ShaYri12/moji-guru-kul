'use client'
import { FOOTER_LINKS } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButton from './CustomButton'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import classNames from 'classnames'
import { FacebookRoundedIcon, InstagramIcon } from '@/svg'

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div
      className={classNames('bg-soft-peach min-h-[450px] flex flex-col justify-center items-center py-10', {
        hidden: pathname.startsWith('/game'),
        '!flex': pathname === '/games',
      })}
    >
      <div className="horizontal-spacing">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full sm:max-w-[265px]">
            <Image src="/logo.svg" alt="mojigurukul" width={183} height={44} />
            <p className="text-mist text-xl font-normal tracking-[2%] leading-[30px] mt-4">
              Learning is a life-long journey that in fact we never terminate stop
            </p>
            {/* <CustomButton
            onClick={() => {
              router.push('/')
              // clear cookies
              const cookies = document.cookie.split(';')

              for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i]
                const eqPos = cookie.indexOf('=')
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
              }
              useAuthStore.persist.clearStorage()
            }}
            color="transparent"
            variant="outlined"
            className="border-1 border-white text-indigo text-sm !font-normal tracking-[0.4px] !w-[147px] !h-10 mt-5"
          >
            Sign out
          </CustomButton> */}
          </div>
          <div className="flex gap-6 flex-wrap md:flex-nowrap lg:gap-14">
            <div className="flex gap-6 lg:gap-14">
              {FOOTER_LINKS.map((link) => (
                <div key={link.id} className="">
                  <h4 className="text-xl font-bold text-casal">{link.title}</h4>
                  <div className="flex flex-col mt-4">
                    {link.links.map((item) => (
                      <Link key={item.id} href={item.path} className="text-mist text-lg font-normal tracking-[2%] leading-[30px]">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-[352px]">
              <h4 className="text-xl font-bold text-casal mb-2">Subscribe</h4>
              <div className="flex bg-white rounded">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="text-lite-black text-sm w-[60%] px-4 bg-white !outline-none rounded"
                />
                <CustomButton variant="contained" color="#753CBD" textColor="#fff" className="!w-[40%] !rounded px-5" onClick={() => {}}>
                  Subscribe
                </CustomButton>
              </div>
              <p className="text-[#757575] text-sm px-2 py-1">For Newsletter</p>
            </div>
          </div>
        </div>
        <div className="bg-[#D4C3EB] h-[1px] w-full mb-6 mt-12 md:mt-20"></div>
        <div className="flex justify-center gap-4">
          <div
            onClick={() => {
              window.open('https://facebook.com/neithedu', '_blank')
            }}
            className="w-12 h-12 rounded bg-white hover:bg-indigo flex justify-center items-center shadow-smart-card cursor-pointer group"
          >
            <div className="hidden group-hover:block">
              <FacebookRoundedIcon fill="#fff" />
            </div>
            <div className="block group-hover:hidden">
              <FacebookRoundedIcon fill="#753CBD" />
            </div>
          </div>
          <div
            onClick={() => {
              window.open('https://instagram.com/mojigurukul', '_blank')
            }}
            className="w-12 h-12 rounded bg-white hover:bg-indigo flex justify-center items-center shadow-smart-card cursor-pointer group"
          >
            <div className="hidden group-hover:block">
              <InstagramIcon fill="#fff" />
            </div>
            <div className="block group-hover:hidden">
              <InstagramIcon fill="#753CBD" />
            </div>
          </div>
        </div>
        <div className="text-center my-6">
          <p className="text-[#343E4B]">MOJIGURUKUL 2024 - ALL rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
