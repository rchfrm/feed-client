import React from 'react'
import PropTypes from 'prop-types'

import ArrowLine from '@/icons/ArrowLine'

import { TournamentContext } from '@/app/contexts/TournamentContext'

const getLine = (
  isAdPair,
  nextIsAdPair,
  streakWinnerIndex,
  nextWinningAdIndex,
  sizes,
) => {
  const { itemWidth, itemHeight, imageHeight } = sizes
  const imageWidth = imageHeight
  const straightLineHeight = itemHeight - (imageHeight * 1.35)
  // Elbow:  __| or |__
  //        |          |
  if (
    (isAdPair && !nextIsAdPair && streakWinnerIndex === 1)
    || (!isAdPair && nextWinningAdIndex === 1)
  ) {
    const translateXMod = nextWinningAdIndex === 0 ? -1 : 0
    const lineHeightTotal = straightLineHeight - 2
    const lineSectionHeight = lineHeightTotal / 2
    const lineWidth = itemWidth - imageWidth
    const leftMod = nextWinningAdIndex === 0 ? -1 : 1
    const left = (lineWidth * leftMod) - (1 * leftMod)
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={lineSectionHeight}
        />
        <div
          className="absolute bg-black ml-12"
          style={{
            height: 2,
            top: lineSectionHeight,
            width: lineWidth,
            transform: translateXMod ? `translateX(${translateXMod * 100}%)` : null,
          }}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: lineSectionHeight,
            left,
          }}
          lineLength={lineSectionHeight}
          hideCap
        />
      </>
    )
  }
  // Straight line
  return (
    <ArrowLine
      className="absolute--center-x t-0"
      lineLength={straightLineHeight}
    />
  )
}

const TournamentItemStreakLine = ({
  isAdPair,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  streak,
  className,
}) => {
  const { sizes } = React.useContext(TournamentContext)
  // GET DESKTOP LAYOUT TEST
  // GET LINE
  const line = React.useMemo(() => {
    if (!streak) return
    return getLine(isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex, sizes)
  }, [streak, sizes, nextIsAdPair, nextWinningAdIndex, isAdPair, streakWinnerIndex])
  // STOP HERE IF NO STREAK
  if (!streak) return null
  return (
    <div className={['relative w-full h-24 mt-5', className].join(' ')}>
      {/* Streak line */}
      {line}
      {/* Streak badge */}
      <div
        className="absolute--center-x bg-green pl-3 pr-3 text-white rounded-pill"
        style={{ top: '2.25rem', paddingBottom: '0.1rem' }}
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
  className: PropTypes.string,
}

TournamentItemStreakLine.defaultProps = {
  streakWinnerIndex: 0,
  nextWinningAdIndex: 0,
  streak: 0,
  className: null,
}


export default TournamentItemStreakLine
