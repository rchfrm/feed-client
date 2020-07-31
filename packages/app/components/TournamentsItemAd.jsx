import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemImage from '@/app/TournamentsItemImage'
import TournamentsItemScore from '@/app/TournamentsItemScore'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({
  adPost,
  winningAdId,
  title,
  secondary,
  className,
}) => {
  const {
    id,
    postLink,
    thumbnailOptions,
    message,
    scoreString,
    scoreWinner,
    streak,
    streakWinner,
  } = adPost
  const isWinner = winningAdId ? id === winningAdId : scoreWinner
  // const isOnStreak = streak && streak > 0
  return (
    <div className={['w-24'].join(' ')}>
      <p className="text-sm">{id}</p>
      {/* IMAGE */}
      <TournamentsItemImage
        thumbnailOptions={thumbnailOptions}
        message={message}
      />
      {/* SCORE */}
      <TournamentsItemScore
        score={scoreString}
        winner={isWinner}
        className="mt-4"
      />
      {/* Line & Streak */}
      {streakWinner && (
        <div className="relative h-24">
          <div className="absolute--center bg-green pl-3 pr-3 text-white rounded-pill">
            <span role="img" aria-label="streak" style={{ fontSize: '0.8em' }}>🚀</span>
              &nbsp;
            {streak}
          </div>
          <div className="h-full mx-auto mt-8 bg-black" style={{ width: 2 }} />
        </div>
      )}
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object.isRequired,
  winningAdId: PropTypes.string,
  title: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemAd.defaultProps = {
  secondary: false,
  winningAdId: '',
  className: '',
}


export default TournamentsItemAd
