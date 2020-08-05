import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemImage from '@/app/TournamentsItemImage'
import TournamentsItemScore from '@/app/TournamentsItemScore'
import TournamentItemStreakLine from '@/app/TournamentItemStreakLine'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({
  adPost,
  isAdPair,
  winningAdId,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  lastTournament,
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
      {/* <p className="text-sm">{id}</p> */}
      {/* IMAGE */}
      <TournamentsItemImage
        thumbnailOptions={thumbnailOptions}
        message={message}
        secondary={secondary}
      />
      {/* SCORE */}
      <TournamentsItemScore
        score={scoreString}
        winner={isWinner}
        className={['mt-4', !isAdPair ? 'pb-10 md:pb-0' : null].join(' ')}
      />
      {/* Line & Streak */}
      {streakWinner && !lastTournament && (
        <TournamentItemStreakLine
          isAdPair={isAdPair}
          streakWinnerIndex={streakWinnerIndex}
          nextIsAdPair={nextIsAdPair}
          nextWinningAdIndex={nextWinningAdIndex}
          streak={streak}
        />
      )}
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  winningAdId: PropTypes.string,
  streakWinnerIndex: PropTypes.number,
  nextIsAdPair: PropTypes.bool,
  nextWinningAdIndex: PropTypes.number,
  lastTournament: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemAd.defaultProps = {
  streakWinnerIndex: 0,
  nextIsAdPair: false,
  nextWinningAdIndex: 0,
  secondary: false,
  winningAdId: '',
  className: '',
}


export default TournamentsItemAd
