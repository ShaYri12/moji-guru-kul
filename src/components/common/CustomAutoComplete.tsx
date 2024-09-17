import * as React from 'react'
import FormControl from '@mui/joy/FormControl'
import Autocomplete from '@mui/joy/Autocomplete'
import classNames from 'classnames'
import { betm, nordeco } from '@/app/font'
import { useErrorStore } from '@/store/errorStore'
import { CircularProgress } from '@mui/joy'

type OptionTypes = {
  id: number | string
  name: string
}

type AutoCompleteProps = {
  label: string
  options: OptionTypes[]
  value?: string | number | null
  onChange?: (event: React.ChangeEvent<{}>, value: string | number | undefined | null) => void
  inputValue?: string
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void
  placeholder?: string
  error?: string
  isLoading?: boolean
}

const CustomAutoComplete = ({
  value,
  label,
  options,
  placeholder,
  inputValue,
  onChange,
  onInputChange,
  error,
  isLoading,
}: AutoCompleteProps) => {
  const isRequired = useErrorStore((state) => state.isRequired)

  return (
    <div>
      <FormControl id="controllable-states-demo">
        <label className={classNames(betm.className, 'text-lite-black text-sm font-bold')}>{label}</label>
        <Autocomplete
          placeholder={placeholder || 'Select an option'}
          value={
            options?.find((option) => {
              return option.id === value
            }) || null
          }
          onChange={(event, newValue) => {
            if (newValue) {
              onChange && onChange(event, newValue?.id)
            }
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            onInputChange && onInputChange(event, newInputValue)
          }}
          options={options}
          sx={{
            width: '100%',
            height: '50px',
            borderColor: !value && error && isRequired ? 'red' : 'sliver',
          }}
          getOptionLabel={(option) => option.name}
          endDecorator={isLoading ? <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} /> : null}
        />
        {!value && isRequired && error && <p className={classNames(nordeco.className, 'text-xs text-red-500 mt-1')}>{error}</p>}
      </FormControl>
    </div>
  )
}

export default CustomAutoComplete
