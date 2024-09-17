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

const ProgressBar = ({ progress, total, color, bgColor, thickness = 8 }: ProgressBarProps) => {
  // calculate the percentage of the progress
  const calculatePercentage = (progress: number, total: number) => {
    return (progress / total) * 100
  }

  return (
    <LinearProgress
      determinate
      value={calculatePercentage(progress, total || 1)}
      thickness={thickness}
      sx={{
        '--LinearProgress-thickness': `${thickness}px`,
        backgroundColor: bgColor || '#E0E0E0', // Set the background color for the track
        color: color || '#763BBC',
      }}
    />
  )
}

export default ProgressBar
