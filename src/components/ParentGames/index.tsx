'use client'

import { useParentGameStore } from '@/store/parentGameStore'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { normalizeGameUrl } from '@/utils/helperFunctions'

const ParentGames = () => {
  const user = useAuthStore((state) => state.user)
  const { parentGames, getParentGames } = useParentGameStore()
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    ;(async () => {
      await getParentGames()
    })()
  }, [])

  return (
    <div>
      <div className="h-full">
        <div className="flex justify-between items-center py-4">
          <p className="text-primary font-bold mb-2">Mini Games</p>
        </div>

        <div>
          {parentGames && parentGames.miniGames && parentGames.miniGames.length ? (
            <div>
              {parentGames.miniGames.map((game) => (
                <div key={game.id} className="border border-grey rounded-md mb-4 p-4 flex items-center gap-5">
                  <div>
                    {game?.imageURL ? (
                      <img src={game.imageURL} alt={game.description} width={100} height={100} className="rounded-md" />
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p>Description: {game.description}</p>
                      <p>Game Type: {game.gameType}</p>
                      {/* <p>Status: {game.isUnlock ? 'Unlocked' : 'Locked'}</p> */}
                      <p>Game Level: {game.gameLevel}</p>
                    </div>
                    <a
                      className={classNames('bg-lime-green text-white text-sm font-bold px-4 py-2 rounded-md cursor-pointer')}
                      onClick={() => {
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                    >
                      Game Url
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No games flows found</p>
          )}
        </div>
      </div>

      {/* //! Game Flows */}
      <div className="h-full lg:max-h-[50vh] overflow-auto mt-10">
        <p className="text-primary font-bold mb-2">Game Flows</p>
        <div>
          {parentGames && parentGames.gamesFlows && parentGames.gamesFlows.length ? (
            <div>
              {parentGames.gamesFlows.map((game) => (
                <div key={game.id} className="border border-grey rounded-md mb-4 p-4 flex items-center gap-5">
                  <div>
                    {game?.imageURL ? (
                      <img src={game.imageURL} alt={game.description} width={100} height={100} className="rounded-md" />
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p>Description: {game.description}</p>
                      <p>Game Type: {game.gameType}</p>
                      <p>Level: {game.crossWord}</p>
                      <p>Status: {game.isUnlock ? 'Unlocked' : 'Locked'}</p>
                      <p>Game Level: {game.gameLevel}</p>
                    </div>
                    <a
                      className={classNames('bg-lime-green text-white text-sm font-bold px-4 py-2 rounded-md cursor-pointer')}
                      onClick={() => {
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }}
                    >
                      Game Url
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No games found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ParentGames
