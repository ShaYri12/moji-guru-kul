import { useErrorStore } from '@/store/errorStore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import classNames from 'classnames'

interface IProps {
  label: string
  options: { name: string; value: string }[]
  value: string | undefined
  handleChange: (value: string | undefined) => void
  width?: string
  variant?: 'box' | 'outlined' | 'filled' | 'standard'
  error?: string
  placeholder?: string
}

const SelectOption = ({ label, value, options, handleChange, width, placeholder, error, variant = 'outlined' }: IProps) => {
  const isRequired = useErrorStore((state) => state.isRequired)
  return (
    <FormControl
      sx={{
        width: width || '100%',
        '& .MuiInputBase-input': {
          color: '#3d3842',
        },
      }}
      size="small"
    >
      {label && <label className="text-sm font-bold">{label}</label>}
      <Select
        value={value}
        IconComponent={KeyboardArrowDownIcon}
        onChange={(event: SelectChangeEvent) => {
          handleChange(event.target.value)
        }}
        placeholder={placeholder}
        sx={{
          backgroundColor: '#FFFFFF4D',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 400,
          height: '44px',
          '& .MuiSvgIcon-root': { color: '#757575' },
          '.MuiOutlinedInput-notchedOutline': {
            border: `1px solid var(--Gray_02-50, ${!Number(value) && isRequired && error ? 'red' : '#cbcdcd'})`,
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: `1px solid var(--Primary-Hover, ${!Number(value) && isRequired && error ? 'red' : '#cbcdcd'})`,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid var(--Primary-Hover, ${!Number(value) && isRequired && error ? 'red' : '#cbcdcd'})`,
          },
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
          '& .MuiSelect-select .notranslate::after': {
            content: `"${placeholder || 'Select'}"`,
            opacity: 1,
            color: '#9ca3af',
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
      {!Number(value) && isRequired && error && <p className={classNames('text-xs text-red-500 mt-1')}>{error}</p>}
    </FormControl>
  )
}

export default SelectOption
