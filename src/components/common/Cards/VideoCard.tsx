'use client'
import React, { Suspense, useState } from 'react'

import VideoModal from '../VideoModal'
import { PauseIcon, PlayIcon } from '@/svg'
import classNames from 'classnames'

type VideoCardProps = {
  title: string
  role: string
  thumbnail: string
  videoPath: string
  selected?: boolean
  onClick: () => void
}

const VideoCard = ({ title, role, thumbnail, videoPath, selected, onClick }: VideoCardProps) => {
  const [isPlaying, setPlaying] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
        setPlaying(false)
      } else {
        video.play()
        setPlaying(true)
      }
    }
  }
  return (
    <Suspense>
      <div
        className={classNames(
          'relative h-[380px] md:h-[430px] w-[320px] xl:h-[633px] xl:w-[352px] rounded-2xl flex items-end bg-cover bg-center bg-no-repeat shadow-grade-box',
          {
            'border-indigo border-[4px]': selected,
          }
        )}
      >
        <video
          width="100%"
          height="100%"
          autoPlay={false}
          className="h-full w-full rounded-xl absolute top-0 left-0 right-0 bottom-0 object-cover"
          ref={videoRef}
          poster={thumbnail}
        >
          <source src={videoPath} type="video/ogg" className="h-full w-full" />
          Your browser does not support the video tag.
        </video>
        <div className="video-card-overly" />
        <div className="flex justify-between items-center relative z-10 px-8 pb-9 w-full">
          <div>
            <p className="text-vista-white text-2xl font-normal leading-[150%] tracking-[0.48px]">{title}</p>
            <p className="text-vista-white text-xl font-normal leading-[150%] tracking-[0.4px]">{role}</p>
          </div>
          <button
            className="shadow-play-button hidden bg-white rounded w-14 h-14 backdrop-blur-md flex justify-center items-center"
            onClick={() => {
              handlePlay()
              onClick()
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
    </Suspense>
  )
}

export default VideoCard
