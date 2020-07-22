import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

const IMAGE = ({ thumbnailOptions, message, secondary }) => {
  return (
    <div className={['w-24', secondary && 'mt-10'].join(' ')}>
      <PostImage
        thumbnailOptions={thumbnailOptions}
        title={message}
      />
    </div>
  )
}

const TournamentsItemImages = ({ thumbnailOptionsA, thumbnailOptionsB, messageA, messageB, isAdPair, className }) => {
  return (
    <div className={[className].join(' ')}>
      <IMAGE thumbnailOptions={thumbnailOptionsA} message={messageA} />
      {isAdPair && (
        <IMAGE thumbnailOptions={thumbnailOptionsB} message={messageB} secondary />
      )}
    </div>
  )
}

TournamentsItemImages.propTypes = {
  thumbnailOptionsA: PropTypes.array,
  thumbnailOptionsB: PropTypes.array,
  messageA: PropTypes.string,
  messageB: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItemImages.defaultProps = {
  thumbnailOptionsA: [],
  thumbnailOptionsB: [],
  messageA: '',
  messageB: '',
  className: '',
}


export default TournamentsItemImages
