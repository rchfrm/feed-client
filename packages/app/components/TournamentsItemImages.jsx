import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemImage from '@/app/TournamentsItemImage'

const TournamentsItemImages = ({ thumbnailOptionsA, thumbnailOptionsB, messageA, messageB, isAdPair, className }) => {
  return (
    <div className={[className].join(' ')}>
      <TournamentsItemImage
        thumbnailOptions={thumbnailOptionsA}
        message={messageA}
        className={['w-20 lg:w-24'].join(' ')}
      />
      {isAdPair && (
        <TournamentsItemImage
          thumbnailOptions={thumbnailOptionsB}
          message={messageB}
          className={['w-20 lg:w-24 mt-10'].join(' ')}
          secondary
        />
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
