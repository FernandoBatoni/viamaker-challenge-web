import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { useState } from 'react'

interface IYoutubePlayer extends React.HTMLProps<HTMLIFrameElement> {
  embedId?: string
  title?: string
  autoplay?: boolean
  onClick?: () => void
}

export function extractEmbedId (url?: string) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/
  const match = url?.match(regex)
  if (match) {
    return match[1]
  }
}

function YoutubeVideoPlayer({ embedId, title, autoplay, onClick, ...rest }: IYoutubePlayer) {
  const { md: isScreenMediumOrBigger } = useBreakpoint()
  const [loading, setLoading] = useState(true)

  const minHeight = isScreenMediumOrBigger ? '55vh' : '30vh'

  const videoSrc = `https://www.youtube-nocookie.com/embed/${extractEmbedId(embedId) || embedId}${autoplay ? '?autoplay=1&' : '?'}modestbranding=1&showinfo=0`

  return (
    <div className='video-responsive' onClick={onClick}>
      {loading && <div className='is-skeleton video-responsive' style={{ minHeight }} />}
      <iframe
        {...rest}
        width='100%'
        style={{ minHeight, display: loading ? 'none' : 'block' }}
        src={videoSrc}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={title}
        onLoad={() => setLoading(false)}
      />
      {onClick && <div className='video-responsive__overlay'></div>}
    </div>
  )
}


export default YoutubeVideoPlayer
