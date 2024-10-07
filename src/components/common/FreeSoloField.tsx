import * as React from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import classNames from 'classnames'
import { nordeco } from '@/app/font'
import { useErrorStore } from '@/store/errorStore'

type FreeSoloFieldProps = {
  label: string
  onChange: (e: React.ChangeEvent<{}>, value: string[]) => void
  options: string[]
  error?: string
}

const FreeSoloField = ({ label, onChange, options, error }: FreeSoloFieldProps) => {
  const isRequired = useErrorStore((state) => state.isRequired)
  return (
    <div>
      <label className={classNames(nordeco.className, 'text-lite-black text-sm font-bold')}>{label}</label>
      <Autocomplete
        multiple
        placeholder="Press enter to add"
        options={[]}
        value={options}
        defaultValue={options}
        getOptionLabel={(option) => option}
        onChange={(event, value) => {
          onChange(event, value)
        }}
        freeSolo={true}
        size="lg"
        sx={{
          minHeight: '50px',
        }}
      />
      {!options.length && isRequired && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default FreeSoloField
