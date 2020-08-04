import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemDate from '@/app/TournamentsItemDate'
import TournamentsItemAdPair from '@/app/TournamentsItemAdPair'
import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'
import TournamentsItemLinks from '@/app/TournamentsItemLinks'

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
  // Get ad pairs
  const [adA, adB] = tournament.adPosts
  const { data: dataA, postLink: linkA } = adA
  const { data: dataB, postLink: linkB } = adB || {}
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
      <TournamentsItemDate className="col-span-6 col-start-4 mb-5" date={dateCreated} />
      {/* AD PAIR */}
      <TournamentsItemAdPair
        adPosts={tournament.adPosts}
        isAdPair={isAdPair}
        winningAdId={winningAdId}
        streakWinnerIndex={streakWinnerIndex}
        nextIsAdPair={nextIsAdPair}
        nextWinningAdIndex={nextWinningAdIndex}
        lastTournament={lastTournament}
        className="col-span-6 col-start-4"
      />
      {/* METRICS */}
      <div className="hidden col-span-6 pl-10">
        <TournamentsItemMetrics
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          currency={currency}
          className="text-center mb-4"
        />
        <TournamentsItemLinks
          linkA={linkA}
          linkB={linkB}
        />
      </div>
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
