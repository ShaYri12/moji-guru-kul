import React, { Fragment, ReactNode } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { FacebookIcon, FilterIcon, GoogleIcon, LeftIcon, RightIcon } from '@/svg'
import classNames from 'classnames'
import { IconsEnum } from '@/utils/enum'

type CustomButtonProps = {
  variant?: 'contained' | 'outlined' | 'text'
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingPosition?: 'start' | 'center' | 'end'
  iconName?:
    | IconsEnum.Facebook
    | IconsEnum.Google
    | IconsEnum.password
    | IconsEnum.email
    | IconsEnum.LeftIcon
    | IconsEnum.RightIcon
    | IconsEnum.FilterIcon
  color?: string
  className?: string
  height?: string
  textColor?: string
  iconPosition?: 'start' | 'end' // Add this prop to control icon position
}

const CustomButton = ({
  variant = 'contained' || 'outlined' || 'text',
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  loadingPosition = 'start',
  iconName,
  color = '#753CBD',
  className,
  height,
  textColor,
  iconPosition = 'start', // Default to 'start'
}: CustomButtonProps) => {
  const icon = (iconName?: string) => {
    switch (iconName) {
      case IconsEnum.Facebook:
        return <FacebookIcon />
      case IconsEnum.Google:
        return <GoogleIcon />
      case IconsEnum.LeftIcon:
        return <LeftIcon />
      case IconsEnum.RightIcon:
        return <RightIcon />
      case IconsEnum.FilterIcon:
        return <FilterIcon />
      default:
        return undefined
    }
  }

  return (
    <Fragment>
      <LoadingButton
        size="small"
        type={type}
        onClick={(e) => {
          e.stopPropagation()
          onClick && onClick()
        }}
        // startIcon={icon(loading ? undefined : iconName) as ReactNode}
        startIcon={iconPosition === 'start' ? icon(loading ? undefined : iconName) : undefined}
        endIcon={iconPosition === 'end' ? icon(loading ? undefined : iconName) : undefined}
        loading={loading}
        // loadingPosition={loadingPosition}
        variant={variant}
        disabled={disabled}
        color="inherit"
        sx={{
          backgroundColor: color,
          color: textColor || '#fff',
          fontWeight: 400,
          borderRadius: '4px',
          fontSize: '20px',
          lineHeight: '28px',
          height: height || '56px',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: '#753CBD',
          },
          '& .MuiCircularProgress-root': {
            color: textColor || '#fff',
          },
        }}
        style={{ backgroundColor: color }}
        className={classNames(className, 'w-full')}
      >
        {children}
      </LoadingButton>
    </Fragment>
  )
}

export default CustomButton
