import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemAd from '@/app/TournamentsItemAd'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const TournamentsItem = ({ tournamentProps, artistCurrency, className }) => {
  // Format data
  const tournament = React.useMemo(() => {
    return tournamentHelpers.formatTournamentData(tournamentProps, artistCurrency)
  }, [tournamentProps, artistCurrency])
  const [adA, adB] = tournament.adPosts
  const { data: dataA } = adA
  const { data: dataB } = adB || {}
  // Is ad a pair?
  const isAdPair = React.useMemo(() => {
    return !!adB
  }, [adB])
  // Get streak results
  const streakResults = React.useMemo(() => {
    return tournamentHelpers.getStreakResults(adA, adB)
  }, [adA, adB])
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair, streakResults)
  }, [dataA, dataB, isAdPair, streakResults])
  // On resize
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <div
      className={[
        'md:grid grid-cols-12 gap-5',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'flex',
          isAdPair ? 'justify-between' : 'justify-start',
          'col-span-6',
          'mb-10',
          'text-center',
          className,
        ].join(' ')}
      >
        {/* FIRST AD */}
        <TournamentsItemAd
          adPost={adA}
          title="Ad A"
          winner
          streakWinner={streakResults[0]}
          className=""
        />
        {/* MIDDLE COLUMN */}
        <div className="w-24">
          {/* VS */}
          <p className="flex items-center justify-center h-24 mb-0">
            {isAdPair && <strong><em>vs</em></strong>}
          </p>
          {/* METRIC BUTTON */}
          <div className="flex items-center justify-center h-14 mt-8">
            <button
              className="rounded-full w-6 h-6 border border-black border-solid"
              aria-label="Show metrics"
            >
              i
            </button>
          </div>
        </div>
        {/* SECOND AD */}
        {isAdPair && (
          <>
            <TournamentsItemAd
              adPost={adB}
              title="Ad B"
              secondary
              streakWinner={streakResults[1]}
              className=""
            />
          </>
        )}
      </div>
    </div>
  )
}

TournamentsItem.propTypes = {
  tournamentProps: PropTypes.object.isRequired,
  artistCurrency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  artistCurrency: '',
  className: '',
}


export default TournamentsItem
