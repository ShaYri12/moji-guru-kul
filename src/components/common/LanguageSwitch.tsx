import * as React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Select as BaseSelect, SelectProps, selectClasses, SelectRootSlotProps } from '@mui/base/Select'
import { Option as BaseOption, optionClasses } from '@mui/base/Option'
import { styled } from '@mui/system'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div>
      <Select
        value={locale}
        onChange={(_, newValue) => {
          React.startTransition(() => {
            router.push(`/${newValue}${pathname.replace(`/${locale}`, '')}`)
          })
        }}
        defaultValue={'en'}
      >
        <Option value={'en'} className="cursor-pointer">
          English
        </Option>
        <Option value={'te'} className="cursor-pointer">
          Telugu
        </Option>
      </Select>
    </div>
  )
}

function Select(props: SelectProps<string, false>) {
  const slots: SelectProps<string, false>['slots'] = {
    root: StyledButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  }

  return <BaseSelect {...props} slots={slots} />
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
}

const CustomButton = React.forwardRef<HTMLButtonElement, SelectRootSlotProps<number, false>>((props, ref) => {
  const { ownerState, ...otherProps } = props

  return (
    <button
      type="button"
      {...otherProps}
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{ownerState?.value?.toString() === 'en' ? 'En' : 'Te'}</span>
      <KeyboardArrowDownIcon />
    </button>
  )
})

CustomButton.displayName = 'CustomButton'

const StyledButton = styled(CustomButton, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 80px;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : 'transparent'};
  color: ${theme.palette.mode === 'dark' ? grey[300] : '#fff'};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : 'transparent'};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : 'transparent'};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    vertical-align: middle;
  }
  `
)

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 80px;
  border-radius: 4px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
  `
)

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 4px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
)

const Popup = styled('div')`
  z-index: 1;
`
