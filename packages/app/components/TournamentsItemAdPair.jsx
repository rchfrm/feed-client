import React from 'react'
import PropTypes from 'prop-types'

import InformationIcon from '@/icons/InformationIcon'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemDetails from '@/app/TournamentsItemDetails'

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
  className,
}) => {
  const [adA, adB] = adPosts
  return (
    <div
      className={[
        'relative',
        'flex',
        'justify-center',
        'mb-10',
        'text-center',
        'bg-purple',
        className,
      ].join(' ')}
      style={{ height: '25rem' }}
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
        title="Ad A"
      />
      {/* MIDDLE COLUMN */}
      <div
        className={[
          'TournamentItemMiddleColumn',
          'w-auto xs:w-1/2 sm:w-96 lg:w-112',
          'mx-8 sm:mx-12 lg:mx-16',
          'bg-red',
        ].join(' ')}
      >
        {/* VS */}
        <p className="flex items-center justify-center w-24 h-24 mx-auto mb-4">
          {isAdPair && (<strong><em>vs</em></strong>)}
        </p>
        {/* METRIC BUTTON */}
        <div
          className={[
            'flex items-center justify-center',
            'w-24 h-24 mx-auto bg-white -mt-2',
            'relative',
            'xs:hidden',
          ].join(' ')}
          style={{ zIndex: 2 }}
        >
          <button
            className="w-6 h-6 p-1 button--information"
            aria-label="Show metrics"
            title="Tournament metrics"
            onClick={switchViews}
          >
            <InformationIcon className="w-full h-auto" />
          </button>
        </div>
        {/* METRICS AND LINKS */}
        <TournamentsItemDetails
          adPosts={adPosts}
          isAdPair={isAdPair}
          switchViews={switchViews}
          className={[
            'absolute xs:static',
            'left-0 top-0 mt-4 w-full',
            'hidden opacity-0',
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
        title="Ad B"
        secondary
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
