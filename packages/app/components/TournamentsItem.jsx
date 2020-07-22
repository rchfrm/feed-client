import React from 'react'
import PropTypes from 'prop-types'

import TournamentItemTopBar from '@/app/TournamentItemTopBar'
import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const getStreakResults = (adA = {}, adB = {}) => {
  const { streak: streakA } = adA
  const { streak: streakB } = adB
  if (!streakB) {
    if (streakA) return [true, false]
    return [false, false]
  }
  if (streakA === streakB) return [true, true]
  if (streakA > streakB) return [true, false]
  return [false, true]
}

const TournamentsItem = ({ tournamentProps, artistCurrency, className }) => {
  // Format data
  const tournament = React.useMemo(() => {
    if (!tournamentProps) return null
    return tournamentHelpers.formatTournamentData(tournamentProps, artistCurrency)
  }, [tournamentProps, artistCurrency])
  const [adA, adB] = tournament.adPosts
  // Is ad a pair?
  const isAdPair = !!adB
  // Get streak results
  const [streakResultA, streakResultB] = getStreakResults(adA, adB)

  if (!tournament) return null

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
      />
      {/* ADS */}
      <div className={['sm:col-span-6', isAdPair ? 'sm:mt-3' : ''].join(' ')}>
        {/* FIRST AD */}
        <TournamentsItemAd title="Ad A" adPost={adA} winner isAdPair streakWinner={streakResultA} />
        {/* SECOND AD */}
        {isAdPair && (
          <TournamentsItemAd title="Ad B" adPost={adB} secondary isAdPair streakWinner={streakResultB} />
        )}
      </div>
      {/* DATA */}
      <TournamentsItemMetrics
        className="w-full sm:col-span-6"
        dataA={tournament.adPosts[0].data}
        dataB={tournament.adPosts[1] && tournament.adPosts[1].data}
      />
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
