'use client'

import * as React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{}}>
      <Box sx={{ minWidth: 35, mb: '8px', display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: '#DFD3F5',
            fontSize: '32px',
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: '30px',
            borderRadius: '15px',
            backgroundColor: '#250673',
            '& .MuiLinearProgress-bar': {
              borderRadius: '15px',
              backgroundColor: '#BEDCFC',
            },
            // for small screens height: 20px
            '@media (max-width: 900px)': {
              height: '15px',
              borderRadius: '10px',
              '& .MuiLinearProgress-bar': {
                borderRadius: '10px',
              },
            },
          }}
        />
      </Box>
    </Box>
  )
}

type IProps = {
  progressValue: number
}

export default function GameLoading({ progressValue }: IProps) {
  return (
    <div
      className="bg-loading-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between py-10 px-5 md:px-20 w-screen h-screen overflow-hidden max-w-screen max-h-screen"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '100vh',
        backgroundColor: '#250673',
      }}
    >
      <div className='mt-[20%]'>
        <Image src="/assets/images/loading-screen/loading-img.svg" alt="logo" width={251} height={242} />
      </div>
      <div className="w-full">
        <div className="lg:px-6">
          <p className="text-[#250673] text-4xl font-bold uppercase mb-2">TIPS:</p>
          <p className="text-[#C2DBDC] text-base sm:text-xl lg:text-[30px] font-bold uppercase mb-2 ">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
            aliquam erat volutpat.
          </p>
        </div>
        <LinearProgressWithLabel value={progressValue} />
      </div>
    </div>
  )
}
