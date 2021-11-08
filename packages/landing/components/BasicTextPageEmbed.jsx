import React from 'react'
import PropTypes from 'prop-types'

import VideoEmbed from '@/elements/VideoEmbed'

const BasicTextPageEmbed = ({
  externalVideo,
  otherEmbed,
  className,
}) => {
  if (!externalVideo && !otherEmbed) return null
  return (
    <div
      className={[
        'mb-10 xs:mb-12 sm:mb-16',
        className,
      ].join(' ')}
      data-el-type="embed"
    >
      {otherEmbed ? (
        // GENERIC EMBED
        <div
          className="flex justify-center"
          dangerouslySetInnerHTML={{ __html: otherEmbed }}
        />
      ) : (
        // VIDEO EMBED (supports YouTube and Vimeo)
        <VideoEmbed
          video={externalVideo}
          videoLocation="Desktop Landing"
        />
      )}
    </div>
  )
}

BasicTextPageEmbed.propTypes = {
  externalVideo: PropTypes.object,
  otherEmbed: PropTypes.string,
  className: PropTypes.string,
}

BasicTextPageEmbed.defaultProps = {
  externalVideo: null,
  otherEmbed: '',
  className: null,
}

export default BasicTextPageEmbed
