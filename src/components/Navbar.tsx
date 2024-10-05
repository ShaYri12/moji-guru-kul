'use client'

import React, { useState, useTransition } from 'react'
import Divider from './common/Divider'
import Image from 'next/image'
import { useModalStore } from '@/store/modalStore'
import { AuthModalEnum, RolesEnum } from '@/utils/enum'
import AuthModalLayout from './Auth/AuthModalLayout'
import Link from 'next/link'
import { ROUTES } from '@/utils/constants'
import CustomButton from './common/CustomButton'
import { useRouter, usePathname } from 'next/navigation'
import { CartIcon, HamburgerIcon, MessageIcon, NotificationIcon } from '@/svg'
import Sidebar from './common/Sidebar'
import classNames from 'classnames'
import { useAuthStore } from '@/store/authStore'
import LanguageSwitch from './common/LanguageSwitch'
import { useLocale } from 'next-intl'
import { useCartStore } from '@/store/cartStore'
import { useUniversalStore } from '@/store/universalStore'
import SignupPopup from './common/SignupPopup'
import ProfileMenu from './common/ProfileMenu'
import { betm } from '@/app/font'

const Navbar = () => {
  const locale = useLocale()

  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const useModal = useModalStore((state) => state)
  const setActiveAuthModal = useModalStore((state) => state.setActiveAuthModal)
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const { setIsSignupPopupOpen } = useUniversalStore()

  const cartItems = useCartStore((state) => state.items)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div
      className={classNames('block w-full bg-indigo', {
        hidden: pathname.startsWith('/game'),
        '!block': pathname === '/games',
      })}
    >
      <div className={classNames('horizontal-spacing h-12 md:h-[80px] flex items-center', betm.className)}>
        <div className="flex justify-between items-center w-full">
          <Image
            src="/logo-white.svg"
            alt="moji gurukul"
            width={183}
            height={44}
            className={classNames('w-24 h-7 md:w-auto md:h-auto cursor-pointer', {
              '!cursor-default': token,
            })}
            onClick={() => {
              if (token) return
              router.push('/')
            }}
          />
          <div className="hidden cursor-pointer lg:flex gap-12 items-center">
            <>
              {ROUTES.filter((route) => route.isProtected === !!token && user?.role.toLocaleLowerCase() !== RolesEnum.Ambassador).map(
                (route) => (
                  <Link
                    key={route.id}
                    href={`${route.path}`}
                    className="relative text-white text-xl font-normal leading-[120%] after:absolute after:w-3/5 after:left-3 after:block after:h-1 hover:after:bg-white after:-bottom-1 after:rounded-full text-center"
                  >
                    {route.name}
                  </Link>
                )
              )}
              {user && user.role.toLocaleLowerCase() === RolesEnum.Ambassador && (
                <Link
                  href="/ambassador"
                  className="relative text-white text-xl font-normal leading-[120%] after:absolute after:w-3/5 after:left-3 after:block after:h-1 hover:after:bg-white after:-bottom-1 after:rounded-full text-center"
                >
                  Stats
                </Link>
              )}
            </>
          </div>
          <div className="flex gap-6 items-center">
            <div>
              <LanguageSwitch />
            </div>
            <div className="flex gap-4 items-center">
              {token ? (
                <div className="flex items-center gap-5 md:gap-6">
                  <Link href="/cart" className="relative">
                    <CartIcon className="hidden md:block" />
                    <CartIcon width="12" height="16" className="block md:hidden" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-lite-red text-white rounded-full px-[5px] inline-flex items-center justify-center text-[10px] pt-0.5">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <div>
                    <MessageIcon className="hidden md:block" />
                    <MessageIcon width="14" height="18" className="block md:hidden" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-[5px] flex items-center justify-center text-[10px] pt-0.5">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <NotificationIcon className="hidden md:block" />
                    <NotificationIcon width="14" height="16" className="block md:hidden" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-[5px] flex items-center justify-center text-[10px] pt-0.5">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-5">
                  <div className="min-w-[117px]">
                    <CustomButton
                      onClick={() => {
                        if (pathname.startsWith('/ambassador')) {
                          router.push('/ambassador/register')
                          return
                        }
                        setIsSignupPopupOpen(true)
                      }}
                      variant="outlined"
                      color="transparent"
                      className=" !py-[14px] !border-[1.5px] !border-white !text-white text-xl !font-normal !tracking-[0.4px] !hover:border-[1.5px] !hover:border-white"
                    >
                      Signup
                    </CustomButton>
                  </div>
                  <div className="min-w-[117px]">
                    <CustomButton
                      onClick={() => {
                        if (pathname.startsWith('/ambassador')) {
                          router.push('/ambassador/login')
                          return
                        }
                        useModal.setOpen(true)
                        setActiveAuthModal(AuthModalEnum.login)
                      }}
                      color="#EFEDF7"
                      textColor="#753CBD"
                      variant="contained"
                      className="min-w-[117px] !py-[14px] !border-[1.5px] !border-white !text-xl !font-normal !tracking-[0.4px] !hover:border-[1.5px] !hover:border-white"
                    >
                      Sign in
                    </CustomButton>
                  </div>
                </div>
              )}
            </div>
          </div>
          {token && (
            <div className="hidden lg:block">
              <ProfileMenu />
            </div>
          )}
          <div className="lg:hidden">
            <HamburgerIcon
              onClick={() => {
                setIsDrawerOpen(true)
              }}
            />
          </div>
        </div>
      </div>
      <Divider />
      <AuthModalLayout />
      <SignupPopup />
      <Sidebar open={isDrawerOpen} setOpen={(val) => setIsDrawerOpen(val)} authToken={token ? token : ''} />
    </div>
  )
}

export default Navbar
