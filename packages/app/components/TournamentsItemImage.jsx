import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemImage = ({ thumbnailOptions, message, secondary, className }) => {
  const [isFallback, setIsFallback] = React.useState(false)
  return (
    <div
      className={[
        className,
        styles.adImage,
        isFallback && secondary && styles._broken,
      ].join(' ')}
    >
      <PostImage
        thumbnailOptions={thumbnailOptions}
        title={message}
        onUseFallback={() => setIsFallback(true)}
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
