'use client'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Box } from '@mui/system'
import classNames from 'classnames'
import { betm } from '@/app/font'
import { useErrorStore } from '@/store/errorStore'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

type MultiSelectFieldProps = {
  label: string
  options: { name: string; id: number }[]
  onChange: (e: React.ChangeEvent<{}>, value: number[]) => void
  placeholder?: string
  error?: string
  selectedOptions: number[]
}

export default function MultiSelectField({ label, placeholder, options, onChange, error, selectedOptions }: MultiSelectFieldProps) {
  const isRequired = useErrorStore((state) => state.isRequired)

  return (
    <Box>
      <label className={classNames(betm.className, 'text-lite-black text-base font-bold')}>{label}</label>
      <Autocomplete
        multiple
        options={options}
        disableCloseOnSelect
        value={options.filter((option) => selectedOptions.includes(option.id))}
        getOptionLabel={(option) => option.name}
        onChange={(e, value) => {
          onChange(
            e,
            value.map((v) => v.id)
          )
        }}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props
          return (
            <li key={key} {...optionProps}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.name}
            </li>
          )
        }}
        style={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                border: !selectedOptions.length && isRequired && error ? '1px solid red' : '',
              },
            }}
            {...params}
            placeholder={placeholder}
          />
        )}
      />
      {!selectedOptions.length && isRequired && error && <p className={classNames(betm.className, 'text-xs text-red-500 mt-1')}>{error}</p>}
    </Box>
  )
}
