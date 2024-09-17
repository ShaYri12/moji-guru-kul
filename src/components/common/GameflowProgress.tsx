import { LockIcon } from '@/svg'
import { GameFlowGamesTypes } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import RewardCard from './Cards/RewardCard'
import CustomTooltip from './CustomTooltip'

type GameflowProgressProps = {
  gameflows?: GameFlowGamesTypes[]
}

const GameflowProgress = ({ gameflows }: GameflowProgressProps) => {
  const [isGameflowTooltipOpen, setIsGameflowTooltipOpen] = React.useState(false)
  const [activeGame, setActiveGame] = React.useState<GameFlowGamesTypes | null>(null)

  return (
    <div className="flex flex-row md:flex-col">
      <CustomTooltip
        open={isGameflowTooltipOpen}
        setOpen={() => {
          setIsGameflowTooltipOpen(!isGameflowTooltipOpen)
        }}
      >
        <div className="bg-white border border-dark-sky-blue rounded-lg w-[74px] flex flex-col justify-center items-center p-2">
          <Image src={'/assets/images/games/reward-img.png'} alt="medal" width={57} height={63} className="rounded-[15px]" />
          <p className="text-indigo text-[10px] font-normal text-center mt-1 break-words">{activeGame?.title}</p>
        </div>
      </CustomTooltip>
      {(gameflows &&
        gameflows.map((game, i) => {
          return (
            <div key={game.gameId} className="flex flex-row md:flex-col items-center">
              {game.isCompleted ? (
                <div
                  className="w-[42px] h-[42px] rounded-full bg-indigo border border-indigo flex justify-center items-center"
                  onMouseEnter={(e) => {
                    e.stopPropagation()
                    setIsGameflowTooltipOpen(true)
                    setActiveGame(game)
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation()
                    setIsGameflowTooltipOpen(false)
                    setActiveGame(null)
                  }}
                >
                  <Image src="/assets/images/games/gameflow-default-img.svg" alt={game.title} width={42} height={42} />
                </div>
              ) : (
                <div className="w-[42px] h-[42px] rounded-full bg-indigo border border-indigo flex justify-center items-center">
                  <LockIcon />
                </div>
              )}

              {i !== gameflows.length - 1 && <div className="block md:hidden bg-indigo w-6 h-[3px]" />}
              {i !== gameflows.length - 1 && <div className="hidden md:block bg-indigo h-6 w-[3px]" />}
            </div>
          )
        })) ||
        ''}
    </div>
  )
}

export default GameflowProgress
