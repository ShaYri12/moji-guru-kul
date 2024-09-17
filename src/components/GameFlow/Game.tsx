'use client'
import React, { useEffect } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import { useSearchParams } from 'next/navigation'
import GameLoading from '../common/GameLoading'

const Game = () => {
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: 'buildUnity/WebGL-Crosswords.loader.js',
    dataUrl: 'buildUnity/WebGL-Crosswords.data.unityweb',
    frameworkUrl: 'buildUnity/WebGL-Crosswords.framework.js.unityweb',
    codeUrl: 'buildUnity/WebGL-Crosswords.wasm.unityweb',
  })

  // get query params
  const urlParams = useSearchParams()
  const isGame = urlParams.get('isGame')
  const gameType = urlParams.get('gameType')
  const flow = urlParams.get('flow')
  const role = urlParams.get('role')
  const activityDetails = urlParams.get('activityDetails')
  const userId = urlParams.get('userId')
  const token = urlParams.get('token')
  const language = urlParams.get('language')

  const jsonObjectString = JSON.stringify({
    isGame,
    gameType,
    flow,
    role,
    activityDetails,
    userId,
    token,
    language
  })

  console.log('jsonObjectString', jsonObjectString)
  // if game is loaded, send message to unity
  useEffect(() => {
    if (isLoaded) {
      sendMessage('GameSessionManager', 'HandleReactMessage', jsonObjectString)
    }
  }, [isLoaded])

  console.log('loadingProgression', loadingProgression)

  useEffect(() => {
    // get height of unity-wrapper, add 10% to it.
    // if new height is greater than 100vh, reduce width of unity-wrapper and adjust height accordingly
    // if new height is less than 100vh, increase height of unity-wrapper by 10%

    const unityWrapper = document.getElementById('unity-wrapper')
    if (!unityWrapper) return
    // get width and height of unity-wrapper
    const unityWrapperWidth = unityWrapper.offsetWidth
    const unityWrapperHeight = unityWrapper.offsetHeight
    // enforce 16:9 aspect ratio.
    // make sure height does not exceed 100vh, if it does, reduce width and adjust height accordingly
    const newHeight = unityWrapperWidth * (9 / 16)
    if (newHeight > window.innerHeight) {
      unityWrapper.style.width = 'calc(100vh * 16 / 9)'
      unityWrapper.style.height = '100vh'
    } else {
      unityWrapper.style.height = `${newHeight}px`
    }

    return () => {
      unityWrapper.style.width = '100%'
      unityWrapper.style.height = '100%'
    }
  }, [])

  return (
    <div className="bg-loading-screen bg-no-repeat bg-cover bg-center w-screen h-screen flex items-center justify-center">
      {loadingProgression !== 1 && (
        <div>
          <GameLoading progressValue={loadingProgression * 100} />
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        id="unity-wrapper"
        style={{
          width: '100%',
        }}
      />
    </div>
  )
}

export default Game