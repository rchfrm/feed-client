import React from 'react'
import PropTypes from 'prop-types'

import ArrowLine from '@/icons/ArrowLine'

const getLine = (isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex, isDesktopLayout) => {
  // Straight line
  if ((isAdPair && nextIsAdPair) || (!isAdPair && !nextIsAdPair)) {
    const length = isAdPair ? 180 : 135
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
          lineLength={250}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: 250,
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
    const translateXMod = nextWinningAdIndex === 0 ? -1 : 0
    const leftMod = nextWinningAdIndex === 0 ? -1 : 1
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={95}
        />
        <div
          className="absolute bg-red ml-12"
          style={{
            height: 2,
            top: 95,
            width: 'calc(150% - 0.75rem)',
            transform: `translateX(${translateXMod * 100}%)`,
          }}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: 95,
            left: `calc(${leftMod * 150}% - ${leftMod * 0.75}rem)`,
          }}
          lineLength={85}
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
  isDesktopLayout,
}) => {
  if (!streak) return null
  const line = getLine(isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex, isDesktopLayout)
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
  isDesktopLayout: PropTypes.bool,
}

TournamentItemStreakLine.defaultProps = {
  streakWinnerIndex: 0,
  nextWinningAdIndex: 0,
  streak: 0,
  isDesktopLayout: false,
}


export default TournamentItemStreakLine
