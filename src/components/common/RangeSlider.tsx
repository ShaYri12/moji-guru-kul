'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { DecrementRoundIcon, IncrementRoundIcon } from '@/svg'

type RangeSliderProps = {
  value: number
  setValue: (value: number) => void
  min: number
  max: number
}

const RangeSlider = ({ value, setValue, min, max }: RangeSliderProps) => {
  function valuetext(value: number) {
    return `${value}`
  }
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '804px',
        padding: '0 32px',
        mt: 1,
        '@media (max-width: 600px)': {
          flex: 1,
        },
      }}
    >
      <Box position="relative">
        <Box
          position="absolute"
          left={-32.5}
          top={-2}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (value > min) setValue(value - 1)
          }}
        >
          <DecrementRoundIcon />
        </Box>
        <Box
          position="absolute"
          right={-31.5}
          top={-2}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (value < max) setValue(value + 1)
          }}
        >
          <IncrementRoundIcon />
        </Box>
        <Slider
          value={value}
          aria-label="Age"
          defaultValue={14}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          shiftStep={1}
          step={1}
          marks
          min={min - 1}
          max={max + 1}
          // change in value when click on increment or decrement
          onChange={(event, value) => {
            if (Number(value) < min || Number(value) > max) return
            setValue(value as number)
          }}
          sx={{
            '& .MuiSlider-mark': {
              width: '1px',
              height: '20px',
              borderRadius: 0,
              backgroundColor: '#D7EDE9',
            },
            // change the color of the thumb
            '& .MuiSlider-thumb': {
              backgroundColor: '#229A87',
              width: 20,
              height: 20,
              boxShadow: '0px 0px 0px 10px #D7EDE9',
              '&:hover': {
                boxShadow: '0px 0px 0px 8px #D7EDE9',
              },
              '@media (max-width: 600px)': {
                width: 12,
                height: 12,
                boxShadow: '0px 0px 0px 5px #D7EDE9',
                '&:hover': {
                  boxShadow: '0px 0px 0px 5px #D7EDE9',
                },
              },
            },
            // display thumb on always
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'transparent',
              color: '#282929',
              fontSize: '18px',
              fontWeight: 700,
              top: -20,
              '&:before': {
                content: 'none',
              },
            },
            // change the background color of the track
            '& .MuiSlider-track': {
              backgroundColor: '#D7EDE9',
              borderRadius: 0,
              border: '1px solid #D7EDE9',
            },
            // change the color of unselected part of the track
            '& .MuiSlider-rail': {
              backgroundColor: '#D7EDE9',
              borderRadius: 0,
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default RangeSlider
