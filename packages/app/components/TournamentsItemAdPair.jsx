import React from 'react'
import PropTypes from 'prop-types'

import InformationIcon from '@/icons/InformationIcon'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemDetails from '@/app/TournamentsItemDetails'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

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
  const { data: dataA, postLink: linkA } = adA || {}
  const { data: dataB, postLink: linkB } = adB || {}
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair)
  }, [dataA, dataB, isAdPair])
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
        <TournamentsItemDetails
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          linkA={linkA}
          linkB={linkB}
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
  children: PropTypes.node,
}

TournamentsItemAdPair.defaultProps = {
  streakWinnerIndex: 0,
  nextIsAdPair: false,
  nextWinningAdIndex: 0,
  winningAdId: '',
  className: '',
  children: null,
}


export default TournamentsItemAdPair
