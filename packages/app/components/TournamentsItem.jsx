import React from 'react'
import PropTypes from 'prop-types'

import TournamentItemTopBar from '@/app/TournamentItemTopBar'
import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemData from '@/app/TournamentsItemData'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const TournamentsItem = ({ tournamentProps, artistCurrency, className }) => {
  // Format data
  const tournament = React.useMemo(() => {
    if (!tournamentProps) return null
    return tournamentHelpers.formatTournamentData(tournamentProps, artistCurrency)
  }, [tournamentProps, artistCurrency])
  // Count Ads
  const totalAds = tournament ? tournament.adPosts.length : 0
  // Is ad a pair?
  const isAdPair = !!(totalAds > 1)

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
      <div className={['sm:col-span-5', isAdPair ? 'sm:mt-3' : ''].join(' ')}>
        {/* FIRST AD */}
        <TournamentsItemAd title="Ad A" adPost={tournament.adPosts[0]} winner />
        {/* SECOND AD */}
        {isAdPair && (
          <TournamentsItemAd title="Ad B" adPost={tournament.adPosts[1]} secondary />
        )}
      </div>
      {/* DATA */}
      <TournamentsItemData
        className="w-full sm:col-span-7"
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
