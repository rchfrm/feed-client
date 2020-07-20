import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import Error from '@/elements/Error'

import * as server from '@/helpers/sharedServer'
import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const fetcher = (artistId, campaignId, adsetId, tournamentId) => {
  return server.getTournament(artistId, campaignId, adsetId, tournamentId, true)
}

const TournamentsItem = ({ tournamentProps, className }) => {
  const { artist_id, campaign_id, adset_id, id: tournament_id } = tournamentProps
  // LOAD TOURNAMENT
  const { data: tournamentRaw, error } = useSWR(
    [artist_id, campaign_id, adset_id, tournament_id],
    fetcher,
  )
  // Format data
  const tournament = React.useMemo(() => {
    if (!tournamentRaw) return null
    return tournamentHelpers.formatTournamentData(tournamentRaw)
  }, [tournamentRaw])
  // Count Ads
  const totalAds = tournament ? tournament.adPosts.length : 0
  // Is ad a pair?
  const isAdPair = !!(totalAds > 1)

  console.log('tournament', tournament)

  if (error) return <Error error={error} />
  if (!tournament) return null

  return (
    <div className={[className].join(' ')} data-name="tournament-item">
      {/* TOP BAR */}
      <header className="flex justify-between">
        <p className="date">
          <span>{tournament.dateCreated}</span>
          <span> at </span>
          <span>{tournament.timeCreated}</span>
        </p>
        <p className="capitalize">{tournament.status}</p>
      </header>
      {/* ADS */}
      <div>
        {/* FIRST AD */}
        <TournamentsItemAd title="Ad A" adPost={tournament.adPosts[0]} winner={isAdPair} />
        {/* SECOND AD */}
        {isAdPair && (
          <>
            <p className={['mt-5 mb-5 text-center', styles.vs].join(' ')}>vs</p>
            <TournamentsItemAd title="Ad B" adPost={tournament.adPosts[1]} />
          </>
        )}
      </div>
    </div>
  )
}

TournamentsItem.propTypes = {
  tournamentProps: PropTypes.object.isRequired,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  className: '',
}


export default TournamentsItem
