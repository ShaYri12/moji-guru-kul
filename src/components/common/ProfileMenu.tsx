'use client'
import * as React from 'react'
import Image from 'next/image'
import { LogoutIcon, SettingIcon, SupportIcon, UserProfileIcon } from '@/svg'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { clearStore } from '@/utils/helperFunctions'
import { deleteCookies } from '@/app/actions'
import { MenuItemData, NestedDropdown } from 'mui-nested-menu'
import { RolesEnum } from '@/utils/enum'

type CustomMenuProps = {
  closeSidebar?: () => void
}

export default function ProfileMenu({ closeSidebar }: CustomMenuProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { user, handleLogout } = useAuthStore()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItemsData: MenuItemData = {
    label: '',
    items: [
      {
        label: 'View profile',
        uid: 'view-profile',

        leftIcon: <UserProfileIcon fill="#753CBD" />,

        callback: (event, item) => {
          router.push('/account-settings')
        },
        sx: {
          borderTop: '0.5px solid #DEDEDE',
          padding: '1rem 1.5rem',
          width: '256px',
          '&:hover': {
            color: '#753CBD',
            borderLeft: '1px solid #753CBD',
          },
          '@media (max-width: 768px)': {
            width: '200px',
          },
        },
      },

      {
        label: 'Your Child',
        uid: 'your-child',
        leftIcon: <SettingIcon fill="#753CBD" />,
        delay: 300,
        sx: {
          borderTop: '0.5px solid #DEDEDE',
          padding: '1rem 1.5rem',
        },
        items: [
          {
            label: 'Child 2 Name',
            leftIcon: <SettingIcon fill="#753CBD" />,
            callback: (event, item) => {
              // router.push('/settings')
            },
            sx: {
              padding: '1rem 1.5rem',
              '&:hover': {
                color: '#753CBD',
                borderLeft: '1px solid #753CBD',
              },
            },
          },
          {
            label: 'Child 1 Name',
            leftIcon: <SettingIcon fill="#753CBD" />,
            // callback: (event, item) => router.push('/settings'),
            sx: {
              borderTop: '0.5px solid #DEDEDE',
              padding: '1rem 1.5rem',
              '&:hover': {
                color: '#753CBD',
                borderLeft: '1px solid #753CBD',
              },
            },
          },
        ],
      },

      {
        label: 'Settings',
        uid: 'settings',
        leftIcon: <SettingIcon fill="#753CBD" />,
        delay: 300,
        sx: {
          borderTop: '0.5px solid #DEDEDE',
          padding: '1rem 1.5rem',
        },
        items: [
          {
            label: 'Setting',
            uid: 'setting',
            leftIcon: <SettingIcon fill="#753CBD" />,
            callback: (event, item) => {
              // router.push('/settings')
            },
            sx: {
              padding: '1rem 1.5rem',
              '&:hover': {
                color: '#753CBD',
                borderLeft: '1px solid #753CBD',
              },
            },
          },
          {
            label: 'Setting',
            uid: 'setting',
            leftIcon: <SettingIcon fill="#753CBD" />,
            // callback: (event, item) => router.push('/settings'),
            sx: {
              borderTop: '0.5px solid #DEDEDE',
              padding: '1rem 1.5rem',
              '&:hover': {
                color: '#753CBD',
                borderLeft: '1px solid #753CBD',
              },
            },
          },
        ],
      },
      {
        label: 'Support',
        uid: 'support',
        leftIcon: <SupportIcon fill="#753CBD" />,
        callback: (event, item) => router.push('/contact-us'),
        sx: {
          borderTop: '0.5px solid #DEDEDE',
          padding: '1rem 1.5rem',
          '&:hover': {
            color: '#753CBD',
            borderLeft: '1px solid #753CBD',
          },
        },
      },
      {
        label: 'Log out',
        uid: 'log-out',
        leftIcon: <LogoutIcon fill="#753CBD" />,
        callback: async (event, item) => {
          handleClose()
          clearStore()
          await deleteCookies()
          handleLogout()
          closeSidebar && closeSidebar()
          router.push('/')
          // delay for 1 second to reload the page
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        },
        sx: {
          borderTop: '0.5px solid #DEDEDE',
          padding: '1rem 1.5rem',
          '&:hover': {
            color: '#753CBD',
            borderLeft: '2px solid #753CBD',
          },
        },
      },
    ],
  }

  // if role is not parent then remove You child menu from menuItemsData.items
  let newMenuItemsData = menuItemsData
  if (user?.role != RolesEnum.Parent && menuItemsData.items) {
    newMenuItemsData = {
      ...menuItemsData,
      items: menuItemsData.items.filter((item) => item.uid !== 'your-child'),
    }
  }

  return (
    <div>
      <NestedDropdown
        menuItemsData={{
          ...newMenuItemsData,
          items: [
            {
              label: `${user?.firstName || 'Student Name'}`,
              callback: (event, item) => console.log('New clicked', event, item),
            },
            ...(newMenuItemsData.items as MenuItemData[]),
          ],
        }}
        MenuProps={{ elevation: 1 }}
        ButtonProps={{
          startIcon: (
            <Image
              src="/assets/images/user-profile-icon.svg"
              alt="mojigurukul user"
              width={44}
              height={44}
              className="w-10 h-10 lg:w-11 lg:h-11 object-contain"
            />
          ),
          size: 'large',
        }}
        onClick={() => {}}
      />
    </div>
  )
}
