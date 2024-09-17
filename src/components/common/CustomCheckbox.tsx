import React from 'react'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'

type CustomCheckboxProps = {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  variant?: 'solid' | 'soft' | 'outlined' | 'plain'
  size?: 'sm' | 'md' | 'lg'
}

const CustomCheckbox = ({
  label,
  checked = false,
  disabled = false,
  onChange,
  variant = 'outlined',
  size = 'sm',
}: CustomCheckboxProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox label={label} variant={variant} size={size} checked={checked} disabled={disabled} onChange={onChange} />
    </Box>
  )
}

export default CustomCheckbox
