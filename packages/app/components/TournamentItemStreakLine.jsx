import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'

const getLineTransform = (isAdPair, nextIsAdPair, nextWinningAdIndex) => {
  if (isAdPair && nextIsAdPair) return 'none'
  if (!isAdPair && !nextIsAdPair) return 'none'
  if (isAdPair && !nextIsAdPair) {
    return 'rotate(45deg)'
  }
  if (nextWinningAdIndex === 1) {
    return 'rotate(45deg)'
  }
  return 'rotate(-45deg)'
}

const TournamentItemStreakLine = ({
  isAdPair,
  nextIsAdPair,
  nextWinningAdIndex,
  streak,
}) => {
  if (!streak) return null
  const lineTransform = getLineTransform(isAdPair, nextIsAdPair, nextWinningAdIndex)
  return (
    <div className="relative h-24">
      {/* Streak link */}
      <div
        className="h-full mx-auto mt-8 bg-black"
        style={{
          width: 2,
          transformOrigin: 'center top',
          transform: lineTransform,
        }}
      />
      {/* Streak badge */}
      <div className="absolute--center bg-green pl-3 pr-3 text-white rounded-pill">
        <span role="img" aria-label="streak" style={{ fontSize: '0.8em' }}>🚀</span>
        &nbsp;
        {streak}
      </div>
    </div>
  )
}

TournamentItemStreakLine.propTypes = {
  isAdPair: PropTypes.bool.isRequired,
  nextIsAdPair: PropTypes.bool.isRequired,
  nextWinningAdIndex: PropTypes.number,
  streak: PropTypes.number,
}

TournamentItemStreakLine.defaultProps = {
  nextWinningAdIndex: 0,
  streak: 0,
}


export default TournamentItemStreakLine
