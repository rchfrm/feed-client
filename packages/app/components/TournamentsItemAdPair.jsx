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
  className,
}) => {
  const [adA, adB] = adPosts
  return (
    <div
      className={[
        'flex',
        'justify-center',
        // 'justify-between',
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
      />
      {/* MIDDLE COLUMN */}
      <div className="w-96 bg-red mx-12 TournamentItemMiddleColumn">
        {/* VS */}
        <p className="flex items-center justify-center h-24 mb-4">
          {isAdPair && (<strong><em>vs</em></strong>)}
        </p>
        <TournamentsItemDetails
          adPosts={adPosts}
          isAdPair={isAdPair}
          switchViews={switchViews}
          className=""
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
