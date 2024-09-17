import * as React from 'react'
import Switch from '@mui/material/Switch'

type CustomSwitchProps = {
  checked: boolean
  setChecked: (checked: boolean) => void
}

export default function CustomSwitch({ checked, setChecked }: CustomSwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      color="error"
      inputProps={{ 'aria-label': 'controlled' }}
      sx={{
        padding: '0',
      }}
    />
  )
}
