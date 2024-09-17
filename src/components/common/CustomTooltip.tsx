import React from 'react'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

type CustomTooltipProps = {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    // maxWidth: 210,
    // width: 210,
    padding: '0',
    backgroundColor: '#FFFFFF',
  },
})

const CustomTooltip = ({ placement, open, setOpen, children }: CustomTooltipProps) => {
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <CustomWidthTooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={<div className="">{children}</div>}
      arrow
      placement={placement || 'right'}
      componentsProps={{
        arrow: {
          sx: {
            color: '#fff',
          },
        },
        tooltip: { sx: { backgroundColor: '#fff', color: '#000' } },
      }}
    >
      <p></p>
    </CustomWidthTooltip>
  )
}

export default CustomTooltip
