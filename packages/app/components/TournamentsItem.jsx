import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemTopBar from '@/app/TournamentsItemTopBar'
import TournamentsItemDesktop from '@/app/TournamentsItemDesktop'
import TournamentsItemMobile from '@/app/TournamentsItemMobile'

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
        styles.tournamentItem,
        className,
      ].join(' ')}
    >
      {/* TOP BAR */}
      <TournamentsItemTopBar
        dateCreated={tournament.dateCreated}
        status={tournament.status}
        className="mb-10 sm:mb-8"
      />
      {/* DESKTOP LAYOUT */}
      {isDesktopLayout ? (
        <TournamentsItemDesktop
          adA={tournament.adPosts[0]}
          adB={tournament.adPosts[1]}
          adMetrics={adMetrics}
          isAdPair={isAdPair}
        />
      // MOBILE LAYOUT
      ) : (
        <TournamentsItemMobile
          adA={tournament.adPosts[0]}
          adB={tournament.adPosts[1]}
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          streakResults={streakResults}
        />
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
