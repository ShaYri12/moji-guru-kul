import { betm } from '@/app/font'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import classNames from 'classnames'
import Image from 'next/image'

interface IProps {
  label?: string
  options: { label: string; value: string }[]
  value: string | undefined
  handleChange: ({ label, value }: { label: string; value: string }) => void
  width?: string
}

const CustomSelectV2 = ({ label, value, options, handleChange, width }: IProps) => {
  return (
    <FormControl
      sx={{
        height: '56px',
        width: width || '100%',
        '& .MuiInputBase-input': {
          color: '#928F95',
          display: 'flex',
        },
      }}
      size="small"
      className={classNames(betm.className)}
    >
      <Select
        value={value}
        IconComponent={KeyboardArrowDownIcon}
        onChange={(event: SelectChangeEvent) => {
          handleChange({ label: options.find((option) => option.value === event.target.value)?.label || '', value: event.target.value })
        }}
        renderValue={(selected) => (
          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-full bg-[#F1ECF8] flex justify-center items-center">
              <Image src="/assets/icons/analytics-indigo.svg" alt="search" width={20} height={20} />
            </div>
            <div className="flex flex-col">
              <b className="text-lite-black text-base font-normal leading-6">Categories</b>
              <span className="text-sm leading-3 capitalize">{selected}</span>
            </div>
          </div>
        )}
        sx={{
          backgroundColor: '#F9F6FD',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 400,
          height: '56px',
          '& .MuiSvgIcon-root': { color: '#753CBD' },
          '.MuiOutlinedInput-notchedOutline': { border: '1px solid var(--Gray_02-50, transparent)' },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid var(--Primary-Hover, transparent)',
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid var(--Primary-Hover, transparent)',
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
          // anchorOrigin: {
          //   vertical: 'bottom',
          //   horizontal: 'left'
          // },
          // transformOrigin: {
          //   vertical: 'top',
          //   horizontal: 'left'
          // },
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
              borderRadius: '10px',
            },
          },
        }}
        className={classNames(betm.className)}
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
              className={classNames(betm.className)}
            >
              {option.label}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CustomSelectV2
