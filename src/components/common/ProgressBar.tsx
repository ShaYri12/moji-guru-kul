'use client'
import React from 'react'
import LinearProgress from '@mui/joy/LinearProgress'

type ProgressBarProps = {
  progress: number
  total: number
  color: string
  bgColor?: string
  thickness?: number
}

const ProgressBar = ({ progress, total, color, bgColor, thickness = 10 }: ProgressBarProps) => {
  // calculate the percentage of the progress
  const calculatePercentage = (progress: number, total: number) => {
    return (progress / total) * 100
  }

  return (
    <div>
      <LinearProgress
        determinate
        value={calculatePercentage(progress, total || 1)}
        thickness={thickness}
        sx={{
          color: color || '#763BBC',
        }}
      />
    </div>
  )
}

export default ProgressBar
