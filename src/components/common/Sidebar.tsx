import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/image'
import { CrossIcon, DividerIcon } from '@/svg'
import classNames from 'classnames'
import { betmRound } from '@/app/font'
import CustomButton from './CustomButton'
import { useModalStore } from '@/store/modalStore'
import { usePathname, useRouter } from 'next/navigation'
import { AuthModalEnum, RolesEnum } from '@/utils/enum'
import { ROUTES } from '@/utils/constants'
import { useAuthStore } from '@/store/authStore'
import SignupPopup from './SignupPopup'
import { useUniversalStore } from '@/store/universalStore'
import ProfileMenu from './ProfileMenu'

type SidebarProps = {
  open: boolean
  setOpen: (value: boolean) => void
  authToken: string
}

const Sidebar = ({ open, setOpen, authToken }: SidebarProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const token = useAuthStore((state) => state.token)
  const useModal = useModalStore((state) => state)
  const setActiveAuthModal = useModalStore((state) => state.setActiveAuthModal)
  const user = useAuthStore((state) => state.user)
  const { setIsSignupPopupOpen } = useUniversalStore()

  const handleCloseSidebar = () => {
    setOpen(false)
  }

  const DrawerList = (
    <Box sx={{ marginY: '24px', marginLeft: '40px', marginRight: '8px' }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginRight={2} marginBottom={3}>
        <div>{token && <ProfileMenu closeSidebar={handleCloseSidebar} />}</div>
        <CrossIcon onClick={() => setOpen(false)} />
      </Box>
      <Box marginBottom="40px">
        <Image src="/logo.svg" alt="moji gurukul" width={163} height={32} />
      </Box>
      <DividerIcon />
      <List
        sx={{
          padding: '0px',
        }}
      >
        {ROUTES.filter((route) => route.isProtected === !!token && user?.role.toLocaleLowerCase() !== RolesEnum.Ambassador).map((route) => (
          <React.Fragment key={route.id}>
            <ListItem
              disablePadding
              disableGutters
              onClick={() => {
                router.push(route.path)
                setOpen(false)
              }}
            >
              <ListItemButton
                disableGutters
                sx={{
                  paddingY: '12px',
                }}
              >
                <ListItemText
                  color="#3D3842"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontFamily: 'inherit !important',
                      fontSize: '20px',
                      letterSpacing: '0.48px',
                    },
                  }}
                  primary={route.name}
                  className={classNames(betmRound.className)}
                />
              </ListItemButton>
            </ListItem>
            <DividerIcon />
          </React.Fragment>
        ))}
        {/* //! Ambassador routes */}
        {user && user.role.toLocaleLowerCase() === RolesEnum.Ambassador && (
          <ListItem
            disablePadding
            disableGutters
            onClick={() => {
              router.push('/ambassador')
              setOpen(false)
            }}
          >
            <ListItemButton
              disableGutters
              sx={{
                paddingY: '12px',
              }}
            >
              <ListItemText
                color="#3D3842"
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: 'inherit !important',
                    fontSize: '20px',
                    letterSpacing: '0.48px',
                  },
                }}
                primary={'Stats'}
                className={classNames(betmRound.className)}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {!token && (
        <div className="flex flex-col gap-4 mt-5">
          <CustomButton
            onClick={() => {
              if (pathname.startsWith('/ambassador')) {
                router.push('/ambassador/login')
                return
              }
              useModal.setOpen(true)
              setActiveAuthModal(AuthModalEnum.login)
              setOpen(false)
            }}
            color="transparent"
            variant="outlined"
            className="!border-2 !border-indigo !text-indigo !text-lg !font-normal !tracking-[0.4px] !w-[147px] !hover:border-[1.5px] !hover:border-white"
          >
            Sign in
          </CustomButton>

          <CustomButton
            onClick={() => {
              if (pathname.startsWith('/ambassador')) {
                router.push('/ambassador/register')
                return
              }
              setIsSignupPopupOpen(true)
              setOpen(false)
            }}
            color="#753CBD"
            variant="contained"
            className="!border-[1.5px] !border-white !text-white !text-lg !font-normal !tracking-[0.4px] !w-[147px] !hover:border-[1.5px] !hover:border-white"
          >
            Signup
          </CustomButton>
        </div>
      )}

      <SignupPopup />
    </Box>
  )

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: '0px 0px 16px 0px rgba(16, 24, 40, 0.08)',
            width: 300,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default Sidebar
