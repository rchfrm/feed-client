import React from 'react'
import PropTypes from 'prop-types'

import ArrowLine from '@/icons/ArrowLine'

import { TournamentContext } from '@/app/contexts/TournamentContext'

const getLine = (
  isAdPair,
  nextIsAdPair,
  streakWinnerIndex,
  nextWinningAdIndex,
  itemWidth,
  isDesktopLayout,
) => {
  const fontSize = 16
  const columnWidth = 6 * fontSize
  const desktopAdjustment = fontSize * 1.5
  // Straight line
  if ((isAdPair && nextIsAdPair) || (!isAdPair && !nextIsAdPair)) {
    const length = isAdPair ? 180 : 135
    const lineLength = isDesktopLayout ? length - desktopAdjustment : length
    return (
      <ArrowLine
        className="absolute--center-x t-0"
        lineLength={lineLength}
      />
    )
  }
  // Elbow: |_ or _|
  if (isAdPair && !nextIsAdPair) {
    const lineWidth = (itemWidth / 2) - columnWidth - (fontSize * 1.5)
    const length = 250
    const lineLength = isDesktopLayout ? length - desktopAdjustment : length
    const left = columnWidth / 2
    const translateXMod = streakWinnerIndex === 0 ? 0 : -1
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={lineLength}
        />
        <div
          className="absolute bg-black"
          style={{
            height: 2,
            top: lineLength,
            width: lineWidth,
            left,
            transform: `translateX(${translateXMod * 100}%)`,
          }}
        />
      </>
    )
  }
  // Elbow:  __| or |__
  //        |          |
  if (!isAdPair) {
    const translateXMod = nextWinningAdIndex === 0 ? -1 : 0
    const lineLengthTop = 95
    const lengthBottom = 85
    const lineLengthBottom = isDesktopLayout ? lengthBottom - desktopAdjustment : lengthBottom
    const lineWidth = (itemWidth / 2) - (3 * fontSize)
    const leftMod = nextWinningAdIndex === 0 ? -1 : 1
    const left = (lineWidth * leftMod) - (1 * leftMod)
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={lineLengthTop}
        />
        <div
          className="absolute bg-black ml-12"
          style={{
            height: 2,
            top: lineLengthTop,
            width: lineWidth,
            transform: `translateX(${translateXMod * 100}%)`,
          }}
        />
        <ArrowLine
          className="absolute left-0 ml-10"
          style={{
            top: lineLengthTop,
            left,
          }}
          lineLength={lineLengthBottom}
          hideCap
        />
      </>
    )
  }
}

const TournamentItemStreakLine = ({
  isAdPair,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  streak,
}) => {
  // GET DESKTOP LAYOUT TEST
  const { isDesktopLayout, itemWidth } = React.useContext(TournamentContext)
  // GET LINE
  const line = React.useMemo(() => {
    if (!streak) return
    return getLine(isAdPair, nextIsAdPair, streakWinnerIndex, nextWinningAdIndex, itemWidth, isDesktopLayout)
  // eslint-disable-next-line
  }, [streak, itemWidth, isDesktopLayout])
  // STOP HERE IF NO STREAK
  if (!streak) return null
  return (
    <div className={['relative w-full h-24 mt-5'].join(' ')}>
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
