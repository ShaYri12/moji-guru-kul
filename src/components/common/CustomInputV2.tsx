import { useErrorStore } from '@/store/errorStore'
import { HiddenEye } from '@/svg'
import classNames from 'classnames'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

type CustomInputProps = {
  value: string
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  className?: string
  error?: string
  size?: 'small' | 'medium' | 'large'
}

const icon = (type: string) => {
  switch (type) {
    case 'password':
      return <HiddenEye />
    case 'search':
      return <SearchIcon sx={{ color: '#8695A0' }} />
    default:
      return null
  }
}

const CustomInputV2 = ({ label, value, onChange, placeholder, className, type = 'text', error, size = 'medium' }: CustomInputProps) => {
  const isRequired = useErrorStore((state) => state.isRequired)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      {label ? <label className="text-sm font-bold">{label}</label> : null}
      <div
        className={classNames(
          'input-shadow bg-zircon w-full pl-[18px] pr-[14px] flex items-center justify-between mt-1 rounded',
          className,
          {
            '!border-red-500': !value && error && isRequired,
            'h-9': size === 'small',
            'h-11': size === 'medium',
            'h-14': size === 'large',
          }
        )}
      >
        <input
          value={value}
          onChange={(e) => {
            onChange(e)
          }}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          className="w-[85%] h-full border-none outline-none text-sm font-medium tracking-[-0.15px] leading-5 input-unset text-lite-black"
          placeholder={placeholder}
        />
        <span
          onClick={() => {
            if (type === 'password') {
              setShowPassword(!showPassword)
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

export default CustomInputV2
