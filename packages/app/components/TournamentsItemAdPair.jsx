import React from 'react'
import PropTypes from 'prop-types'

import { TournamentContext } from '@/app/contexts/TournamentContext'

import PlusCircleIcon from '@/icons/PlusCircleIcon'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemDetails from '@/app/TournamentsItemDetails'

import { animateTournamentItem, resetTournamentItem } from '@/app/helpers/animateTournamentItem'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAdPair = ({
  adPosts,
  isAdPair,
  winningAdId,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  lastTournament,
  switchViews,
  isDesktopLayout,
  tournamentView,
  className,
}) => {
  const [adA, adB] = adPosts
  const containerEl = React.useRef(null)
  React.useEffect(() => {
    if (isDesktopLayout) {
      resetTournamentItem(containerEl.current)
      switchViews('ads')
      return
    }
    animateTournamentItem(containerEl.current, tournamentView)
  }, [tournamentView, isDesktopLayout, switchViews])
  // GET SIZES
  const { sizes: { imageHeight } } = React.useContext(TournamentContext)
  return (
    <div
      className={[
        'relative',
        'flex',
        'justify-between xs:justify-center',
        'mb-10 xs:mb-16',
        'text-center',
        className,
      ].join(' ')}
      style={{ height: isDesktopLayout ? 'auto' : '18rem' }}
      ref={containerEl}
    >
      {/* FIRST AD */}
      <TournamentsItemAd
        adPost={adA}
        isAdPair={isAdPair}
        winningAdId={winningAdId}
        nextIsAdPair={nextIsAdPair}
        streakWinnerIndex={streakWinnerIndex}
        nextWinningAdIndex={nextWinningAdIndex}
        lastTournament={lastTournament}
        tournamentView={tournamentView}
        title="Ad A"
        className="TournamentsItemAd"
      />
      {/* MIDDLE COLUMN */}
      <div
        className={[
          'TournamentItemMiddleColumn',
          'w-auto xs:w-1/2 sm:w-96 lg:w-112',
          'mx-4 sm:mx-12 lg:mx-16',
        ].join(' ')}
      >
        {/* VS */}
        <p
          className={[
            'hidden',
            'xs:flex items-center justify-center',
            'mx-auto mb-0',
            'lg:text-lg',
            styles.tournamentItemWidth,
          ].join(' ')}
          style={{ height: imageHeight }}
        >
          {isAdPair && (<strong><em>vs</em></strong>)}
        </p>
        {/* METRIC BUTTON */}
        <div
          className={[
            'flex items-center justify-center',
            'mx-auto',
            'relative',
            'xs:hidden',
            'MetricsButtonContainer',
            'w-16 iphone8:w-10',
          ].join(' ')}
          style={{ height: imageHeight, zIndex: 2, willChange: 'transform' }}
        >
          <button
            className="w-10 h-10 p-2 button--information MetricsButton"
            aria-label="Show metrics"
            title="Tournament metrics"
            onClick={() => switchViews()}
          >
            <PlusCircleIcon className="w-full h-auto" />
          </button>
        </div>
        {/* METRICS AND LINKS */}
        <TournamentsItemDetails
          adPosts={adPosts}
          isAdPair={isAdPair}
          className={[
            'absolute xs:static',
            'left-0 top-0 w-full',
            '-mt-8 xs:mt-0',
            'px-10 xs:px-0',
            'hidden opacity-0 xs:block xs:opacity-1',
            'TournamentsItemDetails',
          ].join(' ')}
        />
      </div>
      {/* SECOND AD (will output empty if no ad) */}
      <TournamentsItemAd
        adPost={adB}
        isAdPair={isAdPair}
        winningAdId={winningAdId}
        nextIsAdPair={nextIsAdPair}
        streakWinnerIndex={streakWinnerIndex}
        nextWinningAdIndex={nextWinningAdIndex}
        lastTournament={lastTournament}
        tournamentView={tournamentView}
        title="Ad B"
        secondary
        className="TournamentsItemAd"
      />
    </div>
  )
}

TournamentsItemAdPair.propTypes = {
  adPosts: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  winningAdId: PropTypes.string,
  streakWinnerIndex: PropTypes.number,
  nextIsAdPair: PropTypes.bool,
  nextWinningAdIndex: PropTypes.number,
  lastTournament: PropTypes.bool.isRequired,
  switchViews: PropTypes.func.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  tournamentView: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TournamentsItemAdPair.defaultProps = {
  streakWinnerIndex: 0,
  nextIsAdPair: false,
  nextWinningAdIndex: 0,
  winningAdId: '',
  className: '',
}


export default TournamentsItemAdPair
