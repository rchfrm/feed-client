import React from 'react'
import PropTypes from 'prop-types'

import ArrowLine from '@/icons/ArrowLine'

const getLine = (isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex) => {
  // Straight line
  if ((isAdPair && nextIsAdPair) || (!isAdPair && !nextIsAdPair)) {
    const length = isAdPair ? 160 : 115
    return (
      <ArrowLine
        className="absolute--center-x t-0"
        lineLength={length}
      />
    )
  }
  // Elbow: |_ or _|
  if (isAdPair && !nextIsAdPair) {
    const rotation = streakWinnerIndex === 0 ? -90 : 90
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={230}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: 230,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center top',
          }}
          lineLength={95}
          hideCap
        />
      </>
    )
  }
  // Elbow:  __| or |__
  //        |          |
  if (!isAdPair) {
    const rotationDirection = nextWinningAdIndex === 0 ? 1 : -1
    const rotation = 90 * rotationDirection
    const leftMod = nextWinningAdIndex === 0 ? -1 : 1
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={95}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: 95,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center top',
          }}
          lineLength={170}
          hideCap
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: 95,
            left: 170 * leftMod,
          }}
          lineLength={65}
          hideCap
        />
      </>
    )
  }
}

// const getBadgeTop = (isAdPair, nextIsAdPair) => {
//   // Straight line
//   if ((isAdPair && nextIsAdPair) || (!isAdPair && !nextIsAdPair)) {
//     return '2.25rem'
//   }
//   // Elbow: |_ or _|
//   if (isAdPair && !nextIsAdPair) {
//     return '2.25rem'
//   }
//   // Elbow:  __| or |__
//   //        |          |
//   if (!isAdPair) {
//     return '2.25rem'
//   }
// }

const TournamentItemStreakLine = ({
  isAdPair,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  streak,
}) => {
  if (!streak) return null
  const line = getLine(isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex)
  return (
    <div className={['relative w-24 h-24 mt-5'].join(' ')}>
      {/* Streak line */}
      {line}
      {/* Streak badge */}
      <div
        className="absolute--center-x bg-green pl-3 pr-3 text-white rounded-pill"
        style={{ top: '2.25rem' }}
      >
        <span role="img" aria-label="streak" style={{ fontSize: '0.8em' }}>🚀</span>
        &nbsp;
        {streak}
      </div>
    </div>
  )
}

TournamentItemStreakLine.propTypes = {
  isAdPair: PropTypes.bool.isRequired,
  streakWinnerIndex: PropTypes.number,
  nextIsAdPair: PropTypes.bool.isRequired,
  nextWinningAdIndex: PropTypes.number,
  streak: PropTypes.number,
}

TournamentItemStreakLine.defaultProps = {
  streakWinnerIndex: 0,
  nextWinningAdIndex: 0,
  streak: 0,
}


export default TournamentItemStreakLine
