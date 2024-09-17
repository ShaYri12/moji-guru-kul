import { useEffect, useRef, useState } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { CrossIcon } from '@/svg'
import { Box } from '@mui/material'
import ModalVideo from 'react-modal-video'

type VideoModalProps = {
  size?: 'sm' | 'md' | 'lg'
  open: boolean
  setOpen: (value: boolean) => void
  videoPath: string
}

const VideoModal = ({ open, setOpen, videoPath, size = 'md' }: VideoModalProps) => {
  const [maxWidth] = useState<DialogProps['maxWidth']>(size)
  const [isPlaying, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    if (open) {
      handlePlay()
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        handlePlay()
      }}
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '& .MuiPaper-rounded': {
          borderRadius: '12px',
          width: '660px',
          paddingTop: '0px',
          paddingBottom: '0px',
          position: 'relative',
        },
      }}
    >
      <Box
        onClick={() => {
          setOpen(false)
          handlePlay()
        }}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <CrossIcon />
      </Box>
      <DialogContent
        sx={{
          padding: '0px',
          height: '372px',

          // media query
          '@media (max-width: 650px)': {
            height: '268px',
          },
          '@media (max-width: 450px)': {
            height: '197px',
          },
          '@media (max-width: 400px)': {
            height: '186px',
          },
          '@media (max-width: 365px)': {
            height: '168px',
          },
        }}
      >
        <video
          width="100%"
          height="100%"
          autoPlay={true}
          className="h-full w-full rounded-xl absolute top-0 left-0 right-0 bottom-0 object-contain"
          ref={videoRef}
          // poster={thumbnail}
        >
          <source src={videoPath} type="video/ogg" className="h-full w-full" />
          Your browser does not support the video tag.
        </video>

        {/* <ModalVideo
          channel="custom"
          allowFullScreen
          url={videoPath}
          isOpen={open}
          onClose={() => setOpen(false)}
          // controls={false}
          classNames={{
            modalVideo: 'modal-video',
            modalVideoEffect: 'modal-video-effect',
            modalVideoClose: 'modal-video-close',
            modalVideoBody: 'modal-video-body',
            modalVideoInner: 'modal-video-inner',
            modalVideoIframeWrap: 'modal-video-iframe-wrap',
            modalVideoCloseBtn: 'modal-video-close-btn',
          }}
        /> */}
      </DialogContent>
    </Dialog>
  )
}

export default VideoModal
