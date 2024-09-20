'use client'
import { useErrorStore } from '@/store/errorStore'
import { HiddenEye } from '@/svg'
import classNames from 'classnames'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

type CustomInputProps = {
  value?: string | number
  label?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  className?: string
  error?: string
  size?: 'small' | 'medium' | 'large'
  step?: string
  name?: string
  onClick?: () => void
}

const icon = (type: string) => {
  switch (type) {
    case 'password':
      return <HiddenEye />
    case 'search':
      return <SearchIcon sx={{ color: '#B1AFB3' }} />
    default:
      return null
  }
}

const CustomInput = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  className,
  type = 'text',
  error,
  size = 'medium',
  step,
  onClick,
}: CustomInputProps) => {
  const isRequired = useErrorStore((state) => state.isRequired)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      {label && <label className="text-sm font-bold">{label}</label>}
      <div
        className={classNames('border border-[#B1AFB3] w-full pl-[18px] pr-[14px] flex items-center justify-between', className, {
          '!border-red-500': !value && error && isRequired,
          'h-9 rounded-lg': size === 'small',
          'h-10  rounded-lg': size === 'medium',
          'h-14 rounded-lg': size === 'large',
        })}
      >
        <input
          value={value}
          onChange={(e) => {
            onChange && onChange(e)
          }}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          className="w-[85%] h-full border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black"
          placeholder={placeholder}
          step={step}
          name={name}
        />
        <span
          onClick={() => {
            if (type === 'password') {
              setShowPassword(!showPassword)
            }
            if (type === 'search') {
              onClick && onClick()
            }
          }}
          className={classNames('cursor-pointer', {
            'text-sliver': type === 'password',
          })}
        >
          {icon(type)}
        </span>
      </div>
      {!value && isRequired && error && <p className={classNames('text-xs text-red-500 mt-1')}>{error}</p>}
    </div>
  )
}

export default CustomInput
