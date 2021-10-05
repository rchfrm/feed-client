import React from 'react'
import PropTypes from 'prop-types'

import ReactPlayer from 'react-player/facebook'

const FacebookVideo = ({
  videoUrl,
  showControls,
  onReady,
  onPlay,
  onEnd,
  width,
  height,
  className,
  videoStyle,
}) => {
  return (
    <div className={className}>
      <ReactPlayer
        url={videoUrl}
        controls={showControls}
        onReady={onReady}
        onPlay={onPlay}
        onEnded={onEnd}
        style={videoStyle}
        width={width}
        height={height}
        playsinline
      />
    </div>
  )
}

FacebookVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  showControls: PropTypes.bool,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onEnd: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  videoStyle: PropTypes.object,
}

FacebookVideo.defaultProps = {
  showControls: false,
  onReady: () => {},
  onPlay: () => {},
  onEnd: () => {},
  width: '100%',
  height: '100%',
  className: null,
  videoStyle: null,
}

export default FacebookVideo
