import React from 'react'
import PropTypes from 'prop-types'

import TournamentItemTopBar from '@/app/TournamentItemTopBar'
import TournamentsItemDesktop from '@/app/TournamentsItemDesktop'
import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemMetricsTable from '@/app/TournamentsItemMetricsTable'

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
  const [streakResultA, streakResultB] = streakResults
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair, streakResults)
  }, [dataA, dataB, isAdPair, streakResults])
  // On resize
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <div
      className={[
        'sm:grid sm:grid-cols-12 sm:col-gap-8',
        styles.tournamentItem,
        className,
      ].join(' ')}
    >
      {/* TOP BAR */}
      <TournamentItemTopBar
        dateCreated={tournament.dateCreated}
        status={tournament.status}
        className="mb-10 sm:mb-8"
      />
      {/* DATA */}
      {isDesktopLayout ? (
        <TournamentsItemDesktop
          adA={tournament.adPosts[0]}
          adB={tournament.adPosts[1]}
          adMetrics={adMetrics}
          isAdPair={isAdPair}
        />
      ) : (
        <>
          {/* ADS */}
          <div className={['sm:col-span-6'].join(' ')}>
            {/* FIRST AD */}
            <TournamentsItemAd title="Ad A" adPost={adA} winner isAdPair streakWinner={streakResultA} />
            {/* SECOND AD */}
            {isAdPair && (
              <TournamentsItemAd title="Ad B" adPost={adB} secondary isAdPair streakWinner={streakResultB} />
            )}
          </div>
          <TournamentsItemMetricsTable
            className="w-full"
            adMetrics={adMetrics}
            isAdPair={isAdPair}
          />
        </>
      )}
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
