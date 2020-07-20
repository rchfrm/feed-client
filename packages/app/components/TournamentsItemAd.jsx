import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

const TournamentsItemAd = ({ adPost, title }) => {
  const { adLink, thumbnailOptions, message, score } = adPost
  return (
    <div className="flex justify-between items-center">
      {/* Title & link */}
      <p className="flex-1 text-center">
        {adLink ? (
          <a href={adLink} target="_blank" rel="noopener noreferrer">{title}</a>
        ) : title}
      </p>
      {/* Post image */}
      <div className="w-24">
        <PostImage
          thumbnailOptions={thumbnailOptions}
          title={message}
        />
      </div>
      {/* Score */}
      <p className="flex-1 text-center">{score}</p>
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default TournamentsItemAd
