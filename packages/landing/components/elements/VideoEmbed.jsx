import React from 'react'
import PropTypes from 'prop-types'

import YouTube from 'react-youtube'
import Vimeo from '@u-wave/react-vimeo'

import ResponsiveEmbed from '@/landing/elements/ResponsiveEmbed'
import FacebookVideo from '@/landing/elements/FacebookVideo'

import styles from '@/landing/elements/VideoEmbed.module.css'

import { track } from '@/landing/helpers/trackingHelpers'

const VideoEmbed = ({
  video,
  onPlay,
  onReady,
  onEnd,
  videoLocation,
  className,
}) => {
  const { provider: videoProvider, providerUid: videoId, url: videoUrl } = video

  const readied = React.useCallback(() => {
    onReady()
  }, [onReady])

  const played = React.useCallback(() => {
    track({
      label: 'WatchVideo',
      location: videoLocation,
    })
    onPlay()
  }, [onPlay, videoLocation])

  const ended = React.useCallback(() => {
    track({
      label: 'EndVideo',
      location: videoLocation,
    })
    onEnd()
  }, [onEnd, videoLocation])

  return (
    <div
      className={[className].join(' ')}
    >
      <ResponsiveEmbed>
        <div>
          {videoProvider === 'youtube' && (
            <YouTube
              className="w-full h-full"
              containerClassName="w-full h-full"
              videoId={videoId}
              onReady={readied}
              onPlay={played}
              onEnd={ended}
            />
          )}
          {videoProvider === 'vimeo' && (
            <Vimeo
              className={[
                'flex justify-center',
                'absolute top-0 left-0 w-full h-full',
                styles.vimeoEmbed,
              ].join(' ')}
              video={videoId}
              onReady={readied}
              onPlay={played}
              onEnd={ended}
              showPortrait={false}
              showTitle={false}
              showByline={false}
            />
          )}
          {videoProvider === 'facebook' && (
            <FacebookVideo
              className={[
                'flex justify-center',
                'absolute top-0 left-0 w-full h-full',
              ].join(' ')}
              videoStyle={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              width="100%"
              height="100%"
              videoUrl={videoUrl}
              onReady={readied}
              onPlay={played}
              onEnd={ended}
              showControls
            />
          )}
        </div>
      </ResponsiveEmbed>
    </div>
  )
}

VideoEmbed.propTypes = {
  video: PropTypes.object.isRequired,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  onEnd: PropTypes.func,
  videoLocation: PropTypes.string,
  className: PropTypes.string,
}

VideoEmbed.defaultProps = {
  onPlay: () => {},
  onReady: () => {},
  onEnd: () => {},
  videoLocation: '',
  className: null,
}

export default VideoEmbed
