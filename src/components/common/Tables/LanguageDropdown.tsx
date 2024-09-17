import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface IProps {
  label?: string
  options: { name: string; value: string }[]
  value: string | undefined
  handleChange: (value: string | undefined) => void
  width?: string
}
const LanguageDropdown = ({ label, value, options, handleChange, width }: IProps) => {
  return (
    <FormControl
      sx={{
        width: width || '100%',
        '& .MuiInputBase-input': {
          color: '#fff',
        },
      }}
      size="small"
    >
      <Select
        value={value}
        IconComponent={KeyboardArrowDownIcon}
        onChange={(event: SelectChangeEvent) => {
          handleChange(event.target.value)
        }}
        sx={{
          backgroundColor: '#9163CA',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 400,
          height: '40px',
          '& .MuiSvgIcon-root': { color: '#fff' },
          '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--Gray_02-50, #753CBD)' },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid var(--Primary-Hover, #753CBD)',
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid var(--Primary-Hover, #753CBD)',
          },
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
          '& .MuiSelect-select .notranslate::after': {
            content: `"${label || 'Select'}"`,
            opacity: 1,
            color: '#fff',
            fontWeight: 400,
            fontSize: '16px',
          },
        }}
        // changed menu item color
        MenuProps={{
          sx: {
            marginTop: '4px',
            '& .MuiMenuItem-root': {
              left: '0 !important',
              width: '100%',
              color: '#545454',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: '#FFFFFF4D',
              padding: '5px 0',
            },
            // remove background color from hover state
            '& .MuiMenuItem-root:hover': {
              backgroundColor: 'transparent',
            },
            // remove background color from selected state
            '& .Mui-selected': {
              backgroundColor: 'transparent',
            },
            '& .MuiMenu-paper': {
              padding: '0 1rem',
              borderRadius: '4px',
            },
          },
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                '&.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              {option.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default LanguageDropdown
