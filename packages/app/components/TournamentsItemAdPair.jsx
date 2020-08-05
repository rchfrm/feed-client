import React from 'react'
import PropTypes from 'prop-types'

import InformationIcon from '@/icons/InformationIcon'
import TournamentsItemAd from '@/app/TournamentsItemAd'

const TournamentsItemAdPair = ({
  adPosts,
  isAdPair,
  winningAdId,
  streakWinnerIndex,
  nextIsAdPair,
  nextWinningAdIndex,
  lastTournament,
  switchViews,
  className,
}) => {
  const [adA, adB] = adPosts
  return (
    <div
      className={[
        'flex',
        !isAdPair ? 'flex-col' : null,
        !isAdPair ? 'items-center' : 'justify-between',
        'mb-10',
        'pb-32 md:pb-0',
        'text-center',
        className,
      ].join(' ')}
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
        className=""
      />
      {/* MIDDLE COLUMN */}
      <div className="w-24">
        {/* VS */}
        {isAdPair && (
          <p className="flex items-center justify-center h-24 mb-0">
            <strong><em>vs</em></strong>
          </p>
        )}
        {/* METRIC BUTTON */}
        <div
          className={[
            'flex items-center justify-center mt-10',
            isAdPair ? 'mt-10' : '-mt-36',
            'md:hidden',
          ].join(' ')}
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
      </div>
      {/* SECOND AD */}
      {isAdPair && (
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
          className=""
        />
      )}
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
