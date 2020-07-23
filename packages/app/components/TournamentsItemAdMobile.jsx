import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemLink from '@/app/TournamentsItemLink'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const STREAK_SCORE = ({ title, value, winner, className }) => {
  return (
    <div
      className={[
        'text-left',
        'pl-10 xs:pl-10 sm:pl-4',
        'xxs:pr-10 sm:pr-4',
        className,
      ].join(' ')}
    >
      <div className="inline-block text-center">
        <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>{title}</p>
        <p className={['mb-0', 'h3', styles.postScore_number, winner && styles._winner].join(' ')}>
          <span>{value}</span>
        </p>
      </div>
    </div>
  )
}

const TournamentsItemAdMobile = ({ adPost, title, winner, secondary, streakWinner, className }) => {
  const { postLink, thumbnailOptions, message, score, streak } = adPost
  return (
    <div className={['flex items-centre xs:justify-start', className].join(' ')}>
      {/* IMAGE & TITLE */}
      <div
        className={[
          'flex items-center',
          secondary ? 'flex-col-reverse' : 'flex-col',
          'xs:mr-4',
        ].join(' ')}
      >
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
          'xs:flex-none',
          'flex flex-no-wrap justify-center xs:justify-end',
          'xs:pr-10',
          'items-center',
          secondary ? '-mt-14' : 'mt-2',
        ].join(' ')}
      >
        {/* Score */}
        <STREAK_SCORE title="score" value={score} winner={winner} className={styles.postScore} />
        {/* Streak */}
        <STREAK_SCORE title="streak" value={streak} winner={streakWinner} className={styles.postStreak} />
      </div>
    </div>
  )
}

TournamentsItemAdMobile.propTypes = {
  adPost: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  winner: PropTypes.bool,
  secondary: PropTypes.bool,
  streakWinner: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TournamentsItemAdMobile.defaultProps = {
  winner: false,
  secondary: false,
  className: '',
}


export default TournamentsItemAdMobile
