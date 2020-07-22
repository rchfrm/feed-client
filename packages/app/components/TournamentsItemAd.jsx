import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({ adPost, title, winner, secondary, streakWinner }) => {
  const { postLink, thumbnailOptions, message, score, streak } = adPost
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  const titleClass = 'inline-flex items-baseline whitespace-no-wrap'
  return (
    <div className={['text-center sm:text-left', secondary ? 'pt-14' : ''].join(' ')}>
      <div className="inline-flex flex-no-wrap justify-start items-center relative">
        {/* VS text (if secondary) */}
        {secondary && (
          <p className={['absolute top-0 left-0 w-24 ml-24 sm:ml-25 -mt-10 text-center', styles.vs].join(' ')}>vs</p>
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
              <span style={{ visibility: 'hidden' }}>{linkIcon}</span>
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
        <div className={['flex-1 text-right sm:pl-12 w-20 xxs:w-24', winner && styles._winner].join(' ')}>
          <div className="inline-block text-center">
            <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
            <p className={['mb-0', 'h3', styles.postScore_number].join(' ')}>{score}</p>
          </div>
        </div>
        {/* Streak */}
        <div className={['flex-1 text-right sm:pl-8 w-20 xxs:w-24'].join(' ')}>
          <div className="inline-block text-center">
            <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>streak</p>
            <p className={['mb-0', 'h3', styles.postScore_number].join(' ')}>
              <span style={{ fontSize: '0.8em' }}>{(streak >= 1 && streakWinner) && '🚀 '}</span>
              {streak}
            </p>
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
  streakWinner: PropTypes.bool.isRequired,
}

TournamentsItemAd.defaultProps = {
  winner: false,
  secondary: false,
}


export default TournamentsItemAd
