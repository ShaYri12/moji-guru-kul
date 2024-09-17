import { ReactNode, useState } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { CrossIcon } from '@/svg'
import { Box } from '@mui/material'

type CustomModalProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  open: boolean
  setOpen: (value: boolean) => void
  isCloseIcon?: boolean
}

const CustomModal = ({ children, open, setOpen, variant = 'primary', size = 'md', isCloseIcon = true }: CustomModalProps) => {
  const [maxWidth] = useState<DialogProps['maxWidth']>(size)
  return (
    <Dialog
      disablePortal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
      }}
      maxWidth={maxWidth}
      sx={
        isCloseIcon
          ? {
              '& .MuiPaper-rounded': {
                borderRadius: '10px',
                paddingTop: '40px',
                paddingBottom: '20px',
                minWidth: size === 'sm' ? 'auto' : '660px',
              },
            }
          : undefined
      }
    >
      {isCloseIcon && (
        <Box
          onClick={() => {
            setOpen(false)
          }}
          sx={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            cursor: 'pointer',
            zIndex: 20,
          }}
        >
          <CrossIcon />
        </Box>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default CustomModal
