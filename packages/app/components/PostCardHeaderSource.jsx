import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'

const PostCardHeaderSource = ({
  platform,
  publishedDate,
  permalink,
  postType,
}) => {
  return (
    <p className="flex mb-0 text-sm bmw:text-base">
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline no--hover flex items-center justify-center"
      >
        Source: <span className="font-bold mx-1">{publishedDate}</span>
        <PlatformIcon platform={platform} className="w-4 h-4 inline" />
        {postType === 'story' && (
          <strong className="text-insta ml-1">Story</strong>
        )}
        {postType === 'reels' && (
          <strong className="text-insta ml-1">Reel</strong>
        )}
      </a>
    </p>
  )
}

PostCardHeaderSource.propTypes = {
  platform: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
}

PostCardHeaderSource.defaultProps = {
}

export default PostCardHeaderSource
