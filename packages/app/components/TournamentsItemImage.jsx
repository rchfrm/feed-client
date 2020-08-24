import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

import brandColors from '@/constants/brandColors'

const TournamentsItemImage = ({ thumbnailOptions, message, secondary, className }) => {
  return (
    <div
      className={[
        className,
        'TournamentsItemImage',
      ].join(' ')}
    >
      <PostImage
        thumbnailOptions={thumbnailOptions}
        title={message}
        brokenImageColor={secondary ? brandColors.purple : brandColors.green}
      />
    </div>
  )
}

TournamentsItemImage.propTypes = {
  thumbnailOptions: PropTypes.array,
  message: PropTypes.string,
  secondary: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemImage.defaultProps = {
  thumbnailOptions: [],
  message: '',
  secondary: false,
  className: '',
}


export default TournamentsItemImage
