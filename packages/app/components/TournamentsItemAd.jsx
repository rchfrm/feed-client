import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({ adPost, title, winner, secondary }) => {
  const { postLink, thumbnailOptions, message, score } = adPost
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  const titleClass = 'inline-flex items-baseline whitespace-no-wrap'
  return (
    <div className={['text-center sm:text-left', secondary ? 'pt-14' : ''].join(' ')}>
      <div className="inline-flex flex-no-wrap justify-start items-center relative">
        {/* VS text (if secondary) */}
        {secondary && (
          <p className={['absolute w-full top-0 left-0 -mt-10 text-center', styles.vs].join(' ')}>vs</p>
        )}
        {/* Title & link */}
        <p className="flex-1 text-left sm:pr-12 mb-0 w-20 xxs:w-24">
          {postLink ? (
            <a className={titleClass} href={postLink} target="_blank" rel="noopener noreferrer">
              {linkIcon}
              {title}
            </a>
          ) : (
            <span className={titleClass}>
              <div style={{ visibility: 'hidden' }}>{linkIcon}</div>
              {title}
            </span>
          )}
        </p>
        {/* Post image */}
        <div className="w-24">
          <PostImage
            thumbnailOptions={thumbnailOptions}
            title={message}
          />
        </div>
        {/* Score */}
        <div className={['flex-1 text-right sm:pl-12 w-20 xxs:w-24', styles.postScore, winner && styles._winner].join(' ')}>
          <div className="inline-block text-center">
            <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
            <p className={['mb-0', 'h3', styles.postScore_number].join(' ')}>{score}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  winner: PropTypes.bool,
  secondary: PropTypes.bool,
}

TournamentsItemAd.defaultProps = {
  winner: false,
  secondary: false,
}


export default TournamentsItemAd
