import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemDate from '@/app/TournamentsItemDate'
import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const TournamentsItem = ({ tournament, lastTournament, currency, className }) => {
  // Get streak data from tournaments
  const {
    dateCreated,
    winningAdId,
    winningAdIndex,
    streakWinnerIndex,
    streakWinnerId,
    nextStreakWinnerIndex,
    isAdPair,
    nextIsAdPair,
    nextWinningAdIndex,
  } = tournament
  // Get ad parirs
  const [adA, adB] = tournament.adPosts
  const { data: dataA } = adA
  const { data: dataB } = adB || {}
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair)
  }, [dataA, dataB, isAdPair])
  // On resize
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <div
      className={[
        'md:grid grid-cols-12 col-gap-5',
        className,
      ].join(' ')}
    >
      {/* DATE */}
      <TournamentsItemDate className="col-span-6 mb-5" date={dateCreated} />
      {/* AD PAIR */}
      <div
        className={[
          'flex',
          isAdPair ? 'justify-between' : 'justify-center',
          'col-span-6',
          'col-start-1',
          'mb-10',
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
          nextWinningAdIndex={nextWinningAdIndex}
          lastTournament={lastTournament}
          title="Ad A"
          className=""
        />
        {/* MIDDLE COLUMN */}
        {isAdPair && (
          <div className="w-24">
            {/* VS */}
            <p className="flex items-center justify-center h-24 mb-0">
              <strong><em>vs</em></strong>
            </p>
            {/* METRIC BUTTON */}
            <div className="hidden flex items-center justify-center h-14 mt-8">
              <button
                className="rounded-full w-6 h-6 border border-black border-solid"
                aria-label="Show metrics"
              >
                i
              </button>
            </div>
          </div>
        )}
        {/* SECOND AD */}
        {isAdPair && (
          <>
            <TournamentsItemAd
              adPost={adB}
              isAdPair={isAdPair}
              winningAdId={winningAdId}
              nextIsAdPair={nextIsAdPair}
              nextWinningAdIndex={nextWinningAdIndex}
              lastTournament={lastTournament}
              title="Ad B"
              secondary
              className=""
            />
          </>
        )}
      </div>
      {/* METRICS */}
      <TournamentsItemMetrics
        adMetrics={adMetrics}
        isAdPair={isAdPair}
        currency={currency}
        className="col-span-6 text-center"
      />
    </div>
  )
}

TournamentsItem.propTypes = {
  tournament: PropTypes.object.isRequired,
  lastTournament: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  className: '',
  currency: '',
}


export default TournamentsItem
