'use client'
import {
  CalendarIcon,
  GameEllipse,
  GameStartFirst,
  GameStartSecond,
  GameStartThird,
  LockIcon,
  TickIcon,
  TimeAlarmIcon,
  UserGroup,
} from '@/svg'
import React from 'react'
import GameflowProgress from '../GameflowProgress'
import classNames from 'classnames'
import { ActivityDetailResponseTypes, GameFlowGamesTypes } from '@/utils/types'
import CustomTooltip from '../CustomTooltip'
import { GameTypeNumber } from '@/utils/enum'
import { calculateDeadlineTimer, getFormattedDate, getFormattedDateShort } from '@/utils/helperFunctions'
import Image from 'next/image'

type GameTileProps = {
  title: string
  onClick?: () => void
  isLocked: boolean
  unlockGame?: () => void
  description: string | null
  isGameFlow?: boolean
  points: number
  activityTypeName?: string
  tutorGameflows?: ActivityDetailResponseTypes[]
  status: 'new' | 'completed' | 'replay' | string
  playedCount?: number
  creationDate?: string
  endDate?: string | null
  gameType?: string
  gameflows?: GameFlowGamesTypes[]
  gameScore: number
  groupName?: string
  isMultiplayer?: boolean
  isTutor?: boolean
  deadlineDate?: string | null
}

const GameTile = ({
  title,
  onClick,
  isLocked,
  description,
  unlockGame,
  points,
  activityTypeName,
  playedCount,
  creationDate,
  endDate,
  gameType,
  gameflows,
  gameScore,
  groupName,
  isMultiplayer,
  isTutor,
  deadlineDate,
  isGameFlow = false,
  status = 'new',
}: GameTileProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)
  return (
    <div className="relative flex justify-end cursor-pointer" onClick={onClick}>
      <div className="absolute top-3 md:top-2 left-[20%] md:left-[15%] z-10">
        <GameStartFirst />
      </div>
      <div className="relative w-full md:w-[90%] bg-pearl rounded-2xl min-h-[396px] flex flex-col md:flex-row items-center py-2">
        <div
          className={classNames(
            'relative md:right-[11%] w-full md:w-[300px] h-[200px] md:h-[300px] rounded-2xl bg-indigo bg-cover bg-no-repeat bg-center p-6',
            {
              '!bg-crossword': gameType == GameTypeNumber.Crossword,
              '!bg-wordsearch': gameType == GameTypeNumber.WordSearch,
            }
          )}
        >
          <div className="flex justify-between items-center">
            {isLocked ? (
              <div
                className="lock-box w-[42px] h-[42px] rounded bg-indigo border border-indigo flex justify-center items-center"
                onClick={unlockGame}
              >
                <LockIcon />
              </div>
            ) : (
              <div
                className={classNames('bg-dark-sky-blue rounded min-h-8 flex justify-center items-center gap-2 px-3 relative z-20', {
                  '!bg-dark-sky-blue': status == 'new',
                  '!bg-lime-green': status == 'completed',
                  '!bg-mango': status == 'replay',
                })}
              >
                <div className="bg-white w-1.5 h-1.5 rounded-full" />
                <p className="text-white text-base font-normal capitalize">
                  {status === 'new' ? 'New' : status === 'completed' ? 'Completed' : status === 'replay' ? 'Replayed' : status}
                </p>
              </div>
            )}
            {isTutor && deadlineDate && (
              <div className="border border-white rounded w-[95px] min-h-8 flex items-center justify-center gap-1.5">
                <CalendarIcon />
                <p
                  className="text-white text-base font-normal text-center"
                  onMouseEnter={(e) => {
                    e.stopPropagation()
                    setIsTooltipOpen(true)
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation()
                    setIsTooltipOpen(false)
                  }}
                >
                  {getFormattedDateShort(deadlineDate)}
                </p>

                <CustomTooltip
                  open={isTooltipOpen}
                  setOpen={() => {
                    setIsTooltipOpen(!isTooltipOpen)
                  }}
                >
                  <div className="p-4">
                    <div className="bg-[#FFEDEF] rounded inline-flex gap-1 items-center py-1 px-2 mb-2">
                      <TimeAlarmIcon />
                      <p className="text-lite-red text-xs">{calculateDeadlineTimer(deadlineDate)}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="bg-sliver-sand w-2 h-2 rounded-full" />
                        <div className="h-10 w-[1px] bg-sliver-sand" />
                        <TickIcon fill="#D9D9D9" />
                      </div>
                      <div>
                        <div className="mb-2">
                          {creationDate && <p className="text-base text-lite-black font-normal pt-0">{getFormattedDate(creationDate)} </p>}
                          <p className="text-sm text-sliver-sand font-normal pt-0">Started Date</p>
                        </div>
                        <div>
                          {endDate && <p className="text-base text-lite-black font-normal pt-0">{getFormattedDate(endDate)}</p>}
                          <p className="text-sm text-sliver-sand font-normal pt-0">End Date</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTooltip>
              </div>
            )}
          </div>
        </div>
        <div className="relative md:right-[9%] lg:right-[6%] w-full md:max-w-[336px] p-5 xl:p-0">
          <div className="absolute left-[3%] md:left-[50%] md:top-[-10%]">
            <GameStartSecond />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              {groupName && (
                <div
                  className={classNames(
                    'border border-indigo bg-soft-peach rounded h-8 flex items-center justify-center gap-1.5 bg-transparent md:mb-6 relative z-10 px-2',
                    {}
                  )}
                >
                  <UserGroup />
                  <p className={classNames('text-indigo text-base font-normal text-center uppercase', {})}>{groupName}</p>
                </div>
              )}

              <div
                className={classNames(
                  'border border-indigo bg-soft-peach rounded w-[95px] h-8 flex items-center justify-center gap-1.5 bg-transparent md:mb-6 relative z-10',
                  {
                    '!border-lite-red !bg-[#FDEDEE]': isGameFlow,
                    '!border-pink-pearl !bg-rose-white': groupName && !isGameFlow,
                  }
                )}
              >
                <p
                  className={classNames('text-indigo text-base font-normal text-center uppercase', {
                    'text-lite-red': isGameFlow,
                    'text-pink-pearl': groupName && !isGameFlow,
                  })}
                >
                  {isGameFlow ? 'MULTI' : 'SINGLE'}
                </p>
              </div>
            </div>
            <div className="md:hidden bg-indigo rounded-[10px] border border-indigo flex flex-col justify-center items-center p-2">
              <span className="text-white text-xl font-medium leading-4 inline-block">{playedCount || 0}</span>
              <span className="text-white text-sm font-medium uppercase leading-4 inline-block">TIMES</span>
            </div>
          </div>
          <h4 className="text-indigo text-[28px] font-medium mb-2">{title}</h4>
          <p className="text-santa-grey text-lg pt-0 mb-5">{description}</p>
          <p className="text-dark-sky-blue text-lg pt-0 mb-5">{activityTypeName}</p>
          <div className="flex gap-2 items-center">
            <div className="border-[2px] border-lime-green min-h-[44px] rounded flex flex-col justify-center px-[14px]">
              <p className="text-lite-black text-sm uppercase">POINT</p>
              <p className="text-lime-green text-xl font-medium pt-0">{points ? `+${points}` : 0}</p>
            </div>
            <div className="border-[2px] border-dark-sky-blue min-h-[44px] rounded flex flex-col justify-center px-[14px]">
              <p className="text-lite-black text-sm uppercase">High Score</p>
              <p className="text-dark-sky-blue text-xl font-medium pt-0">{gameScore ? `+${gameScore}` : 0}</p>
            </div>
            {isTutor && (
              <div className="border-[2px] border-dark-sky-blue min-h-[44px] rounded flex flex-col justify-center px-[14px]">
                <p className="text-lite-black text-sm uppercase">Result</p>
                <p className="text-dark-sky-blue text-xl font-medium pt-0">06/12</p>
              </div>
            )}
            {isMultiplayer && (
              <div className="relative flex">
                <Image src="/assets/images/games/multi-img.svg" alt="" width={32} height={32} />
                <Image src="/assets/images/games/multi-img.svg" alt="" width={32} height={32} className="absolute left-[18px]" />
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block h-full mt-[9%] relative right-[5%]">
          <div className="h-[75%] flex justify-between items-center flex-col">
            <div className="flex flex-col justify-between items-center h-1/3">
              <div
                className={classNames('bg-indigo rounded-[10px] border border-indigo flex flex-col justify-center items-center p-2', {
                  'bg-transparent border-none': isGameFlow,
                })}
              >
                <span
                  className={classNames('text-white text-xl font-medium leading-4 inline-block', {
                    hidden: isGameFlow,
                  })}
                >
                  {playedCount || 0}
                </span>
                <span
                  className={classNames('text-white text-sm font-medium uppercase leading-4 inline-block', {
                    hidden: isGameFlow,
                  })}
                >
                  TIMES
                </span>
              </div>
              <div className="">
                <GameStartThird />
              </div>
            </div>

            <div>
              <GameEllipse />
            </div>
          </div>
        </div>

        {isGameFlow && (
          <div className="w-full md:w-auto h-full mb-5 md:mb-0 px-4 md:px-0 relative right-[2%] flex items-center">
            <GameflowProgress gameflows={gameflows} />
          </div>
        )}
      </div>
    </div>
  )
}

export default GameTile
