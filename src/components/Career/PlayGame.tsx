import { nordeco } from '@/app/font'
import classNames from 'classnames'
import React from 'react'

const PlayGame = () => {
  return (
    <div className="max-w-[1300px] m-auto px-5 mt-[10%]">
      <h1 className={classNames(nordeco.className, 'text-3xl font-bold')}>Play Game</h1>
    </div>
  )
}

export default PlayGame
