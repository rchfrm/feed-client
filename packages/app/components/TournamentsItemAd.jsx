import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemImage from '@/app/TournamentsItemImage'
import TournamentsItemScore from '@/app/TournamentsItemScore'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({
  adPost,
  title,
  winner,
  secondary,
  streakWinner,
  className,
}) => {
  const { postLink, thumbnailOptions, message, score, streak, id } = adPost
    scoreString,
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
        winner={winner}
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
  title: PropTypes.string.isRequired,
  winner: PropTypes.bool,
  secondary: PropTypes.bool,
  streakWinner: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemAd.defaultProps = {
  winner: false,
  secondary: false,
  streakWinner: false,
  className: '',
}


export default TournamentsItemAd
