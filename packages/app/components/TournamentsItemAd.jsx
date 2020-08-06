import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemLink from '@/app/TournamentsItemLink'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({ adPost, title, winner, secondary, streakWinner }) => {
  const { postLink, thumbnailOptions, message, score, streak } = adPost
  const titleClass = 'inline-flex items-baseline whitespace-no-wrap'
  return (
    <div className={['text-center sm:text-left', secondary ? 'pt-14' : '', styles.itemAd].join(' ')}>
      <div className="inline-flex flex-no-wrap justify-start items-center relative">
        {/* "VS" text (if secondary) */}
        {secondary && (
          <p
            className={['absolute top-0 left-0 w-24 ml-20 -mt-10 text-center'].join(' ')}
            style={{ transform: 'translateX(0.2rem)' }}
          >
            <strong>vs</strong>
          </p>
        )}
        {/* Title & link */}
        <p className="flex-1 text-left sm:pr-12 mb-0 w-20 xxs:w-24">
          <TournamentsItemLink link={postLink} title={title} className={titleClass} />
        </p>
        {/* Post image */}
        <div className="w-24">
          <PostImage
            thumbnailOptions={thumbnailOptions}
            title={message}
          />
        </div>
        {/* Score */}
        <div
          className={[
            'flex-1 text-left pl-10 sm:pl-12 w-20 xxs:w-24',
            styles.postScore,
          ].join(' ')}
        >
          <div className="inline-block text-center">
            <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
            <p className={['mb-0', 'h3', styles.postScore_number, winner && styles._winner].join(' ')}>
              <span>{score}</span>
            </p>
          </div>
        </div>
        {/* Streak */}
        <div
          className={[
            'flex-1 text-left sm:pl-8 w-20 xxs:w-24',
            styles.postStreak,
          ].join(' ')}
        >
          <div className="inline-block text-center">
            <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>streak</p>
            <p className={['mb-0', 'h3', styles.postScore_number, streakWinner && styles._winner].join(' ')}>
              <span>{streak}</span>
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
