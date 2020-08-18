import React from 'react'
import PropTypes from 'prop-types'

import ArrowLine from '@/icons/ArrowLine'

import { TournamentContext } from '@/app/contexts/TournamentContext'

const calcLineHeight = ({ adsHeight, lineOffset, sizes, rem, isDesktopLayout }) => {
  const { imageHeight, scoreHeight, dateHeight, itemHeight } = sizes
  // Calc for mobile
  if (!isDesktopLayout) {
    return itemHeight - (imageHeight + scoreHeight) + dateHeight + (4 * rem) - (0.5 * rem)
  }
  // Calc for desktop
  const baseHeight = dateHeight + rem + (4 * rem) - rem
  return baseHeight + (adsHeight - lineOffset)
}

const getLine = ({
  isAdPair,
  nextIsAdPair,
  streakWinnerIndex,
  nextWinningAdIndex,
  sizes,
  tournamentsItemEl,
  lineContainerEl,
  isDesktopLayout,
}) => {
  const rem = 16
  const { itemWidth, imageHeight, centralColumnWidth, scoreHeight } = sizes
  const imageWidth = imageHeight
  const detailsHeight = tournamentsItemEl.querySelector('.TournamentsItemDetails').offsetHeight
  const lineOffset = lineContainerEl.offsetTop
  const adsHeight = imageHeight + Math.max(detailsHeight, scoreHeight)
  const lineHeight = calcLineHeight({ adsHeight, lineOffset, sizes, rem, isDesktopLayout })
  // Elbow:  __| or |__
  //        |          |
  if (
    (isAdPair && !nextIsAdPair && streakWinnerIndex === 1)
    || (!isAdPair && nextWinningAdIndex === 1)
  ) {
    // Vertical bits
    const lineHeightTotal = lineHeight - 2
    const lineSectionHeight = lineHeightTotal / 2
    const firstVerticalHeight = isDesktopLayout
      ? adsHeight - (imageHeight + scoreHeight) + (2 * rem)
      : lineSectionHeight
    const secondVerticalHeight = isDesktopLayout
      ? (3.5 * rem)
      : lineSectionHeight
    // Horizontal bits
    const lineWidth = isDesktopLayout ? centralColumnWidth + imageWidth : itemWidth - imageWidth
    const leftMod = nextWinningAdIndex === 0 ? -1 : 1
    const left = (lineWidth * leftMod) - (1 * leftMod)
    const translateXMod = nextWinningAdIndex === 0 ? -1 : 0
    return (
      <>
        <ArrowLine
          className="absolute--center-x t-0"
          lineLength={firstVerticalHeight}
        />
        <div
          className="absolute bg-black"
          style={{
            height: 2,
            top: firstVerticalHeight,
            width: lineWidth,
            transform: translateXMod ? `translateX(${translateXMod * 100}%)` : null,
            marginLeft: imageWidth / 2,
          }}
        />
        <ArrowLine
          className="absolute left-0"
          style={{
            top: firstVerticalHeight,
            left,
            marginLeft: (imageWidth / 2) + (9 * leftMod),
          }}
          lineLength={secondVerticalHeight}
          hideCap
        />
      </>
    )
  }
  // Straight line
  return (
    <ArrowLine
      className="absolute--center-x t-0"
      lineLength={lineHeight}
    />
  )
}

const TournamentItemStreakLine = ({
  isAdPair,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  streak,
  tournamentsItemEl,
  className,
}) => {
  // GET DESKTOP LAYOUT TEST
  const { sizes, isDesktopLayout } = React.useContext(TournamentContext)
  // GET LINE
  const lineContainerEl = React.useRef(null)
  const line = React.useMemo(() => {
    if (!streak || !sizes.itemHeight || !lineContainerEl.current) return
    return getLine({
      isAdPair,
      nextIsAdPair,
      streakWinnerIndex,
      nextWinningAdIndex,
      sizes,
      tournamentsItemEl,
      lineContainerEl: lineContainerEl.current,
      isDesktopLayout,
    })
  }, [sizes, lineContainerEl.current])
  // STOP HERE IF NO STREAK
  if (!streak) return null
  return (
    <div className={['relative w-full bg-green', className].join(' ')} ref={lineContainerEl}>
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
  tournamentsItemEl: PropTypes.object,
  className: PropTypes.string,
}

TournamentItemStreakLine.defaultProps = {
  streakWinnerIndex: 0,
  nextWinningAdIndex: 0,
  streak: 0,
  tournamentsItemEl: null,
  className: null,
}


export default TournamentItemStreakLine
