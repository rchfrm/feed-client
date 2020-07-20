import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({ adPost, title, winner }) => {
  const { postLink, thumbnailOptions, message, score } = adPost
  return (
    <div className="flex justify-between items-center">
      {/* Title & link */}
      <p className="flex-1 text-right pr-12 mb-0">
        {postLink ? (
          <a className="inline-flex items-baseline" href={postLink} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="h-3 mr-2" />
            {title}
          </a>
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
      <div className={['flex-1 text-left pl-12', styles.postScore, winner && styles._winner].join(' ')}>
        <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
        <p className={['mb-0', 'h3', styles.postScore_number].join(' ')}>{score}</p>
      </div>
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  winner: PropTypes.bool,
}

TournamentsItemAd.defaultProps = {
  winner: false,
}


export default TournamentsItemAd
