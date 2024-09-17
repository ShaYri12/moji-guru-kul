'use client'
import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Game from '@/components/GameFlow/Game'
import GameLoading from '@/components/common/GameLoading'

const GamePage = () => {
  return (
    <Suspense>
      <Game />
    </Suspense>
  )
}

export default GamePage
