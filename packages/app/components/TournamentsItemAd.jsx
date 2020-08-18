import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemImage from '@/app/TournamentsItemImage'
import TournamentsItemScore from '@/app/TournamentsItemScore'
import TournamentsItemStreakLine from '@/app/TournamentsItemStreakLine'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAd = ({
  adPost,
  isAdPair,
  winningAdId,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  lastTournament,
  secondary,
  tournamentView,
  tournamentsItemEl,
  className,
}) => {
  const {
    id,
    thumbnailOptions,
    message,
    scoreString,
    scoreWinner,
    streak,
    streakWinner,
  } = adPost || {}
  const isWinner = winningAdId ? id === winningAdId : scoreWinner
  // const isOnStreak = streak && streak > 0
  return (
    <div
      className={[styles.tournamentItemWidth, className].join(' ')}
      style={{ willChange: 'transform' }}
    >
      {adPost ? (
        <>
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
          />
          {/* Line & Streak */}
          {streakWinner && !lastTournament && (
            <TournamentsItemStreakLine
              isAdPair={isAdPair}
              streakWinnerIndex={streakWinnerIndex}
              nextIsAdPair={nextIsAdPair}
              nextWinningAdIndex={nextWinningAdIndex}
              streak={streak}
              tournamentsItemEl={tournamentsItemEl}
              className={tournamentView === 'metrics' ? 'hidden' : null}
            />
          )}
        </>
      ) : null}
    </div>
  )
}

TournamentsItemAd.propTypes = {
  adPost: PropTypes.object,
  isAdPair: PropTypes.bool.isRequired,
  winningAdId: PropTypes.string,
  streakWinnerIndex: PropTypes.number,
  nextIsAdPair: PropTypes.bool,
  nextWinningAdIndex: PropTypes.number,
  lastTournament: PropTypes.bool.isRequired,
  secondary: PropTypes.bool,
  tournamentView: PropTypes.string.isRequired,
  tournamentsItemEl: PropTypes.object,
  className: PropTypes.string,
}

TournamentsItemAd.defaultProps = {
  adPost: null,
  streakWinnerIndex: 0,
  nextIsAdPair: false,
  nextWinningAdIndex: 0,
  secondary: false,
  winningAdId: '',
  tournamentsItemEl: null,
  className: '',
}


export default TournamentsItemAd
