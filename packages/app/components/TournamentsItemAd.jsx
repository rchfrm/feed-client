import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemLink from '@/app/TournamentsItemLink'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({ adPost, title, winner, secondary, streakWinner }) => {
  const { postLink, thumbnailOptions, message, score, streak } = adPost
  return (
    <div className={['flex items-centre'].join(' ')}>
      {/* IMAGE & TITLE */}
      <div className={['flex items-center', secondary ? 'flex-col-reverse' : 'flex-col'].join(' ')}>
        {/* TITLE */}
        <p className={[secondary ? 'mt-4 mb-0' : 'mb-4'].join(' ')}>
          <TournamentsItemLink
            link={postLink}
            title={title}
            className={['inline-flex items-baseline whitespace-no-wrap'].join(' ')}
          />
        </p>
        {/* IMAGE */}
        <div className="w-24">
          <PostImage
            thumbnailOptions={thumbnailOptions}
            title={message}
          />
        </div>
      </div>
      {/* SCORE AND STREAK */}
      <div
        className={[
          'flex-grow',
          'flex flex-no-wrap justify-center',
          'pl-0 items-center',
          secondary ? '-mt-14' : 'mt-2',
        ].join(' ')}
      >
        {/* Score */}
        <div
          className={[
            'text-left pl-10',
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
            'text-left pl-10',
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
